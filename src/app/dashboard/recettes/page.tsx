import Link from "next/link";
import { listRecipes } from "@/domains/recettes";
import { Card, SectionTitle, Badge } from "@/components/ui";
import { addRecipeAction } from "./actions";

export default async function RecettesPage() {
  const recipes = await listRecipes();

  return (
    <div>
      <SectionTitle
        eyebrow="Cuisine"
        title="Mes recettes"
        description="Toutes tes recettes, prêtes à être retrouvées facilement."
      />

      <details className="card p-5 mb-6">
        <summary className="text-sm font-medium cursor-pointer">
          + Ajouter une recette
        </summary>
        <form action={addRecipeAction} className="space-y-3 mt-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="title">Titre</label>
              <input className="input" type="text" id="title" name="title" placeholder="Curry de légumes" required />
            </div>
            <div>
              <label className="label" htmlFor="category">Catégorie</label>
              <input className="input" type="text" id="category" name="category" placeholder="Plat, dessert..." />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="ingredients">Ingrédients (un par ligne)</label>
            <textarea className="input" id="ingredients" name="ingredients" rows={4} placeholder={"200g de riz\n1 oignon\n..."} required />
          </div>
          <div>
            <label className="label" htmlFor="steps">Étapes (une par ligne)</label>
            <textarea className="input" id="steps" name="steps" rows={4} placeholder={"Couper les légumes\nFaire revenir...\n..."} required />
          </div>
          <div>
            <label className="label" htmlFor="note">Note (optionnel)</label>
            <input className="input" type="text" id="note" name="note" placeholder="Astuce, variante..." />
          </div>
          <button type="submit" className="btn btn-primary">
            Enregistrer la recette
          </button>
        </form>
      </details>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((r) => (
          <Link key={r.id} href={`/dashboard/recettes/${r.id}`}>
            <Card className="p-4 card-hover h-full">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-sm">{r.title}</div>
                {r.category && <Badge>{r.category}</Badge>}
              </div>
              <div className="text-xs text-muted mt-2">
                {r.ingredients.length} ingrédients · {r.steps.length} étapes
              </div>
            </Card>
          </Link>
        ))}
        {recipes.length === 0 && (
          <p className="text-sm text-muted">Aucune recette pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
