import { readJson, writeJson, generateId } from "@/lib/json-store";

export type LearningItem = {
  id: string;
  title: string;
  url?: string;
  category?: string;
  done: boolean;
  note?: string;
  createdAt: string;
};

const FILE = "apprentissage.json";

export async function listLearningItems(): Promise<LearningItem[]> {
  const entries = await readJson<LearningItem[]>(FILE, []);
  return [...entries].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export async function addLearningItem(input: {
  title: string;
  url?: string;
  category?: string;
  note?: string;
}): Promise<void> {
  const entries = await readJson<LearningItem[]>(FILE, []);
  entries.push({
    id: generateId(),
    done: false,
    createdAt: new Date().toISOString(),
    ...input,
  });
  await writeJson(FILE, entries);
}

export async function toggleLearningItem(id: string): Promise<void> {
  const entries = await readJson<LearningItem[]>(FILE, []);
  const updated = entries.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  await writeJson(FILE, updated);
}

export async function deleteLearningItem(id: string): Promise<void> {
  const entries = await readJson<LearningItem[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}
