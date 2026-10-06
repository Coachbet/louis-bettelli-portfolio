import { readJson, writeJson, generateId } from "@/lib/json-store";

export type Recipe = {
  id: string;
  title: string;
  category?: string;
  ingredients: string[];
  steps: string[];
  note?: string;
  createdAt: string;
};

const FILE = "recettes.json";

export async function listRecipes(): Promise<Recipe[]> {
  const entries = await readJson<Recipe[]>(FILE, []);
  return [...entries].sort((a, b) => a.title.localeCompare(b.title, "fr"));
}

export async function getRecipe(id: string): Promise<Recipe | undefined> {
  const entries = await readJson<Recipe[]>(FILE, []);
  return entries.find((r) => r.id === id);
}

export async function addRecipe(input: {
  title: string;
  category?: string;
  ingredients: string[];
  steps: string[];
  note?: string;
}): Promise<void> {
  const entries = await readJson<Recipe[]>(FILE, []);
  entries.push({
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...input,
  });
  await writeJson(FILE, entries);
}

export async function deleteRecipe(id: string): Promise<void> {
  const entries = await readJson<Recipe[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}
