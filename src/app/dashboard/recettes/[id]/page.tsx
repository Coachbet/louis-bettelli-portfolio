import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipe } from "@/domains/recettes";
import { Card, Badge } from "@/components/ui";
import { deleteRecipeAction } from "../actions";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) notFound();

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/recettes" className="text-xs text-muted hover:text-foreground">
        ← Toutes les recettes
      </Link>

      <div className="flex items-start justify-between gap-3 mt-4 mb-6">
        <h1 className="text-2xl font-semibold">{recipe.title}</h1>
        {recipe.category && <Badge>{recipe.category}</Badge>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="text-sm font-medium mb-3">Ingrédients</div>
          <ul className="space-y-1.5 text-sm text-foreground/90 list-disc list-inside">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-medium mb-3">Étapes</div>
          <ol className="space-y-2 text-sm text-foreground/90 list-decimal list-inside">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Card>
      </div>

      {recipe.note && (
        <Card className="p-5 mt-4">
          <div className="text-sm font-medium mb-1">Note</div>
          <p className="text-sm text-muted">{recipe.note}</p>
        </Card>
      )}

      <form action={deleteRecipeAction} className="mt-6">
        <input type="hidden" name="id" value={recipe.id} />
        <button type="submit" className="text-xs text-muted hover:text-red-400">
          Supprimer cette recette
        </button>
      </form>
    </div>
  );
}
