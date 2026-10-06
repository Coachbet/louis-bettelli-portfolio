import { readJson, writeJson, generateId } from "@/lib/json-store";

export type RunEntry = {
  id: string;
  date: string;
  distanceKm: number;
  durationMin: number;
  note?: string;
};

const FILE = "course.json";

export async function listRuns(): Promise<RunEntry[]> {
  const entries = await readJson<RunEntry[]>(FILE, []);
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

export async function addRun(input: Omit<RunEntry, "id">): Promise<void> {
  const entries = await readJson<RunEntry[]>(FILE, []);
  entries.push({ id: generateId(), ...input });
  await writeJson(FILE, entries);
}

export async function deleteRun(id: string): Promise<void> {
  const entries = await readJson<RunEntry[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}

export function runStats(entries: RunEntry[]) {
  const totalKm = entries.reduce((s, e) => s + e.distanceKm, 0);
  const totalMin = entries.reduce((s, e) => s + e.durationMin, 0);
  return { totalKm, totalMin, count: entries.length };
}
