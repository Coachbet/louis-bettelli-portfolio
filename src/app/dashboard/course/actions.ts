"use server";

import { revalidatePath } from "next/cache";
import { addRun, deleteRun } from "@/domains/course";

export async function addRunAction(formData: FormData) {
  const date = String(formData.get("date") || "");
  const distanceKm = Number(formData.get("distanceKm"));
  const durationMin = Number(formData.get("durationMin"));
  const note = String(formData.get("note") || "").trim() || undefined;
  if (!date || !distanceKm || !durationMin) return;
  await addRun({ date, distanceKm, durationMin, note });
  revalidatePath("/dashboard/course");
  revalidatePath("/dashboard");
}

export async function deleteRunAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteRun(id);
  revalidatePath("/dashboard/course");
  revalidatePath("/dashboard");
}
