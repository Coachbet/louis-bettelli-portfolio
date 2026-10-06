import { readJson, writeJson, generateId } from "@/lib/json-store";

export type WeightEntry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  weightKg: number;
  note?: string;
};

const FILE = "poids.json";

export async function listWeightEntries(): Promise<WeightEntry[]> {
  const entries = await readJson<WeightEntry[]>(FILE, []);
  return [...entries].sort((a, b) => a.date.localeCompare(b.date));
}

export async function addWeightEntry(input: {
  date: string;
  weightKg: number;
  note?: string;
}): Promise<void> {
  const entries = await readJson<WeightEntry[]>(FILE, []);
  entries.push({ id: generateId(), ...input });
  await writeJson(FILE, entries);
}

export async function deleteWeightEntry(id: string): Promise<void> {
  const entries = await readJson<WeightEntry[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}

export function weightStats(entries: WeightEntry[]) {
  if (entries.length === 0) return null;
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const change = latest.weightKg - first.weightKg;
  const min = Math.min(...sorted.map((e) => e.weightKg));
  const max = Math.max(...sorted.map((e) => e.weightKg));
  return { latest, first, change, min, max, count: sorted.length };
}
