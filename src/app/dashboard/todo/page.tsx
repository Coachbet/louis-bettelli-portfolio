import { listTodos } from "@/domains/todo";
import { Card, SectionTitle, Badge } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { addTodoAction, toggleTodoAction, deleteTodoAction } from "./actions";

export default async function TodoPage() {
  const todos = await listTodos();
  const open = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div>
      <SectionTitle
        eyebrow="Organisation"
        title="Todo"
        description="Tout ce que tu as à faire, perso ou projets."
      />

      <Card className="p-5 mb-6">
        <form action={addTodoAction} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="label" htmlFor="text">Tâche</label>
            <input className="input" type="text" id="text" name="text" placeholder="Ex : réserver le vol" required />
          </div>
          <div className="w-40">
            <label className="label" htmlFor="category">Catégorie</label>
            <input className="input" type="text" id="category" name="category" placeholder="Perso" />
          </div>
          <div className="w-40">
            <label className="label" htmlFor="dueDate">Échéance</label>
            <input className="input" type="date" id="dueDate" name="dueDate" />
          </div>
          <button type="submit" className="btn btn-primary h-[38px]">
            Ajouter
          </button>
        </form>
      </Card>

      <div className="space-y-2 mb-8">
        {open.length === 0 && (
          <p className="text-sm text-muted px-1">Rien en attente, bien joué 🎉</p>
        )}
        {open.map((t) => (
          <Card key={t.id} className="p-3 flex items-center gap-3">
            <form action={toggleTodoAction}>
              <input type="hidden" name="id" value={t.id} />
              <button
                type="submit"
                aria-label="Marquer comme fait"
                className="w-5 h-5 rounded-full border border-border hover:border-accent flex items-center justify-center shrink-0"
              />
            </form>
            <span className="flex-1 text-sm">{t.text}</span>
            {t.category && <Badge>{t.category}</Badge>}
            {t.dueDate && <span className="text-xs text-muted whitespace-nowrap">{formatDate(t.dueDate)}</span>}
            <form action={deleteTodoAction}>
              <input type="hidden" name="id" value={t.id} />
              <button type="submit" className="text-xs text-muted hover:text-red-400">
                ✕
              </button>
            </form>
          </Card>
        ))}
      </div>

      {done.length > 0 && (
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
            Terminé ({done.length})
          </div>
          <div className="space-y-2">
            {done.map((t) => (
              <Card key={t.id} className="p-3 flex items-center gap-3 opacity-50">
                <form action={toggleTodoAction}>
                  <input type="hidden" name="id" value={t.id} />
                  <button
                    type="submit"
                    aria-label="Marquer comme non fait"
                    className="w-5 h-5 rounded-full bg-accent border border-accent flex items-center justify-center shrink-0 text-[10px]"
                  >
                    ✓
                  </button>
                </form>
                <span className="flex-1 text-sm line-through">{t.text}</span>
                <form action={deleteTodoAction}>
                  <input type="hidden" name="id" value={t.id} />
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
