"use client";
import { FormEvent, useState } from "react";
const copy = {
  en: {
    suggestions: ["Your AI experience?", "Tell me about DevXAI", "Your technical skills?", "Your education?", "Your English level?", "Your sports journey?", "Why rugby?", "How can I contact you?"],
    intro: "Ask me about my background, skills or projects.", noAnswer: "No answer is available.", unavailable: "The local assistant is temporarily unavailable.", thinking: "Thinking…", placeholder: "Type your question…", send: "Send", label: "Louis's AI assistant",
  },
  fr: {
    suggestions: ["Ton expérience en IA ?", "Parle-moi de DevXAI", "Tes compétences techniques ?", "Ta formation ?", "Ton niveau d’anglais ?", "Ton parcours sportif ?", "Pourquoi le rugby ?", "Comment te contacter ?"],
    intro: "Posez-moi une question sur mon parcours, mes compétences ou mes projets.", noAnswer: "Aucune réponse n’est disponible.", unavailable: "L’assistant local est temporairement indisponible.", thinking: "Réflexion…", placeholder: "Écrivez votre question…", send: "Envoyer", label: "Assistant IA de Louis",
  },
} as const;

export function AIChat({ language = "en" }: { language?: "en" | "fr" }) {
  const t = copy[language];
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>(t.intro);
  const [loading, setLoading] = useState(false);
  async function ask(message: string) {
    if (!message.trim() || loading) return;
    setQuestion(message); setLoading(true); setAnswer("");
    try { const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, language }) }); const data = await response.json() as { answer?: string; error?: string }; setAnswer(data.answer ?? data.error ?? t.noAnswer); }
    catch { setAnswer(t.unavailable); }
    finally { setLoading(false); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void ask(question); }
  return <section className="simple-ai" aria-label={t.label}>
    <div className="simple-windowbar"><i className="red"/><i className="yellow"/><i className="green"/><span>~/louis/ask-me-anything</span><b>OLLAMA · LOCAL</b></div>
    <div className="simple-ai-body"><p className="simple-prompt"><span>louis@portfolio</span> ~ % ask</p><p className={loading ? "simple-answer loading" : "simple-answer"}>{loading ? t.thinking : answer}</p><form onSubmit={submit}><span>›</span><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} aria-label={t.label}/><button disabled={loading}>{t.send}</button></form></div>
    <div className="simple-suggestions">{t.suggestions.map((item) => <button key={item} onClick={() => void ask(item)}>{item}</button>)}</div>
  </section>;
}
