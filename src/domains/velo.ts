import { readJson, writeJson, generateId } from "@/lib/json-store";

export type RideEntry = {
  id: string;
  date: string;
  distanceKm: number;
  durationMin: number;
  elevationM?: number;
  note?: string;
};

const FILE = "velo.json";

export async function listRides(): Promise<RideEntry[]> {
  const entries = await readJson<RideEntry[]>(FILE, []);
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

export async function addRide(input: Omit<RideEntry, "id">): Promise<void> {
  const entries = await readJson<RideEntry[]>(FILE, []);
  entries.push({ id: generateId(), ...input });
  await writeJson(FILE, entries);
}

export async function deleteRide(id: string): Promise<void> {
  const entries = await readJson<RideEntry[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}

export function rideStats(entries: RideEntry[]) {
  const totalKm = entries.reduce((s, e) => s + e.distanceKm, 0);
  const totalMin = entries.reduce((s, e) => s + e.durationMin, 0);
  const totalElevation = entries.reduce((s, e) => s + (e.elevationM ?? 0), 0);
  return { totalKm, totalMin, totalElevation, count: entries.length };
}
