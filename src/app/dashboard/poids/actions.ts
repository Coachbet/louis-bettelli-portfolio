"use server";

import { revalidatePath } from "next/cache";
import { addWeightEntry, deleteWeightEntry } from "@/domains/poids";

export async function addWeightAction(formData: FormData) {
  const date = String(formData.get("date") || "");
  const weightKg = Number(formData.get("weightKg"));
  const note = String(formData.get("note") || "").trim() || undefined;
  if (!date || !weightKg) return;
  await addWeightEntry({ date, weightKg, note });
  revalidatePath("/dashboard/poids");
  revalidatePath("/dashboard");
}

export async function deleteWeightAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteWeightEntry(id);
  revalidatePath("/dashboard/poids");
  revalidatePath("/dashboard");
}
