import { listLearningItems } from "@/domains/apprentissage";
import { Card, SectionTitle, Badge } from "@/components/ui";
import { addLearningAction, toggleLearningAction, deleteLearningAction } from "./actions";

function youtubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function ApprentissagePage() {
  const items = await listLearningItems();
  const open = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);

  return (
    <div>
      <SectionTitle
        eyebrow="Croissance"
        title="Choses à apprendre"
        description="Toutes les compétences, sujets et vidéos que tu veux explorer."
      />

      <Card className="p-5 mb-6">
        <form action={addLearningAction} className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="title">Sujet</label>
            <input className="input" type="text" id="title" name="title" placeholder="Ex : apprendre le piano" required />
          </div>
          <div>
            <label className="label" htmlFor="url">Lien vidéo (optionnel)</label>
            <input className="input" type="url" id="url" name="url" placeholder="https://youtube.com/..." />
          </div>
          <div>
            <label className="label" htmlFor="category">Catégorie</label>
            <input className="input" type="text" id="category" name="category" placeholder="Musique" />
          </div>
          <div>
            <label className="label" htmlFor="note">Note</label>
            <input className="input" type="text" id="note" name="note" placeholder="Pourquoi c'est important" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {open.length === 0 && (
          <p className="text-sm text-muted px-1 sm:col-span-2">Rien pour l&apos;instant, ajoute un sujet !</p>
        )}
        {open.map((item) => {
          const embed = youtubeEmbed(item.url);
          return (
            <Card key={item.id} className="p-4">
              {embed && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-border">
                  <iframe
                    src={embed}
                    className="w-full h-full"
                    allowFullScreen
                    title={item.title}
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-sm">{item.title}</div>
                {item.category && <Badge>{item.category}</Badge>}
              </div>
              {item.note && <p className="text-xs text-muted mt-1">{item.note}</p>}
              {item.url && !embed && (
                <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline mt-2 inline-block">
                  Voir le lien →
                </a>
              )}
              <div className="flex gap-3 mt-3">
                <form action={toggleLearningAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-xs text-accent hover:underline">
                    Marquer comme appris
                  </button>
                </form>
                <form action={deleteLearningAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-xs text-muted hover:text-red-400">
                    Supprimer
                  </button>
                </form>
              </div>
            </Card>
          );
        })}
      </div>

      {done.length > 0 && (
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
            Appris ({done.length})
          </div>
          <div className="space-y-2">
            {done.map((item) => (
              <Card key={item.id} className="p-3 flex items-center justify-between opacity-60">
                <span className="text-sm">{item.title}</span>
                <form action={deleteLearningAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-xs text-muted hover:text-red-400">
                    ✕
                  </button>
                </form>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
