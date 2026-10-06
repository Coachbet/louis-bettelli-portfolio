"use server";

import { revalidatePath } from "next/cache";
import { addRecipe, deleteRecipe } from "@/domains/recettes";

function splitLines(raw: FormDataEntryValue | null): string[] {
  return String(raw || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function addRecipeAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim() || undefined;
  const note = String(formData.get("note") || "").trim() || undefined;
  const ingredients = splitLines(formData.get("ingredients"));
  const steps = splitLines(formData.get("steps"));
  if (!title || ingredients.length === 0 || steps.length === 0) return;
  await addRecipe({ title, category, ingredients, steps, note });
  revalidatePath("/dashboard/recettes");
}

export async function deleteRecipeAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteRecipe(id);
  revalidatePath("/dashboard/recettes");
}
