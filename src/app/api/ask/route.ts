import { profile } from "@/domains/profil";
import { profileFr } from "@/domains/profil-fr";

export const runtime = "nodejs";
export const maxDuration = 30;

class GroqRequestError extends Error {
  constructor(public readonly status: number) {
    super(`Groq request failed with status ${status}`);
  }
}

function buildContext(language: "en" | "fr") {
  const content = language === "fr" ? profileFr : profile;
  const instruction = language === "fr"
    ? `Tu es l’assistant du portfolio de ${content.name}. Réponds en français et à la première personne, comme si tu présentais Louis, avec un ton naturel et concis (150 mots maximum). Utilise EXCLUSIVEMENT les faits ci-dessous. N’ajoute aucune date, aucun âge, chiffre, expérience ou motivation absent de ce contexte. Si l’information n’y figure pas, dis simplement qu’elle n’est pas disponible dans le portfolio.`
    : `You are the portfolio assistant for ${content.name}. Answer in English and in the first person, as if you were introducing Louis, using a natural and concise tone (150 words maximum). Use EXCLUSIVELY the facts below. Do not add any date, age, number, experience or motivation that is not present in this context. If the answer is not in the context, simply say that this information is not available in the portfolio.`;
  return `${instruction}
Profile: ${content.bio}
Education: ${content.education.map((item) => `${item.degree}, ${item.school}, ${item.period}`).join("; ")}
Experience: ${content.experiences.map((item) => `${item.role} at ${item.company} (${item.period}): ${item.bullets.join(" ")}`).join("; ")}
Skills: ${content.skills.flatMap((group) => group.items).join(", ")}
Sports and activities: ${content.activities.map((item) => `${item.title}, ${item.org}: ${item.bullets.join(" ")}`).join("; ")}
Sports journey: ${content.sports.map((item) => `${item.name}${item.duration ? ` (${item.duration})` : ""}: ${item.details.join(" ")}`).join("; ")}
Projects: DevXAI is the most complete internship project. Other projects include the Digital360 full-stack portal, a class-based chess game built as the NSI final project in Première four years ago, Space Invader in the first year of higher education, Advance AI, and smaller course projects.`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { message?: unknown; language?: unknown } | null;
  const language = body?.language === "fr" ? "fr" : "en";
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 500) : "";
  if (!message) return Response.json({ error: language === "fr" ? "Une question est requise." : "A question is required." }, { status: 400 });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), process.env.GROQ_API_KEY ? 25000 : 90000);
  try {
    const messages = [
      { role: "system", content: buildContext(language) },
      { role: "user", content: message },
    ];

    if (process.env.GROQ_API_KEY) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL ?? "openai/gpt-oss-20b",
          messages,
          temperature: 0.1,
          reasoning_effort: "low",
          max_completion_tokens: 600,
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new GroqRequestError(response.status);
      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const answer = data.choices?.[0]?.message?.content?.trim();
      if (!answer) throw new Error("Groq returned an empty answer");
      return Response.json({ answer });
    }

    if (process.env.VERCEL) {
      return Response.json({
        error: language === "fr"
          ? "Le chatbot n’est pas encore configuré. Ajoutez la clé gratuite GROQ_API_KEY dans Vercel."
          : "The chatbot is not configured yet. Add the free GROQ_API_KEY in Vercel.",
      }, { status: 503 });
    }

    const response = await fetch(`${process.env.OLLAMA_URL ?? "http://localhost:11434"}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL ?? "llama3.1:8b",
        stream: false,
        messages,
        options: { temperature: 0.1, num_ctx: 2048, num_predict: 160 },
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Ollama unavailable");
    const data = await response.json() as { message?: { content?: string } };
    return Response.json({ answer: data.message?.content?.trim() ?? (language === "fr" ? "Je n’ai pas trouvé de réponse." : "I could not find an answer.") });
  } catch (error) {
    if (error instanceof GroqRequestError) {
      const detail = error.status === 401
        ? (language === "fr" ? "La clé Groq configurée dans Vercel est refusée (401)." : "The Groq key configured in Vercel was rejected (401).")
        : error.status === 429
          ? (language === "fr" ? "Le quota gratuit Groq est temporairement atteint (429)." : "The free Groq quota is temporarily exhausted (429).")
          : error.status === 400
            ? (language === "fr" ? "Groq refuse la configuration du modèle (400)." : "Groq rejected the model configuration (400).")
            : (language === "fr" ? `Groq est temporairement indisponible (${error.status}).` : `Groq is temporarily unavailable (${error.status}).`);
      return Response.json({ error: detail }, { status: 503 });
    }
    return Response.json({
      error: language === "fr"
        ? "L’assistant est temporairement indisponible. Réessayez dans un instant."
        : "The assistant is temporarily unavailable. Please try again shortly.",
    }, { status: 503 });
  }
  finally { clearTimeout(timeout); }
}
