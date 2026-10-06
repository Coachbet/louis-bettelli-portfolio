"use server";

import { revalidatePath } from "next/cache";
import { addLearningItem, toggleLearningItem, deleteLearningItem } from "@/domains/apprentissage";

export async function addLearningAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const url = String(formData.get("url") || "").trim() || undefined;
  const category = String(formData.get("category") || "").trim() || undefined;
  const note = String(formData.get("note") || "").trim() || undefined;
  if (!title) return;
  await addLearningItem({ title, url, category, note });
  revalidatePath("/dashboard/apprentissage");
  revalidatePath("/dashboard");
}

export async function toggleLearningAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await toggleLearningItem(id);
  revalidatePath("/dashboard/apprentissage");
  revalidatePath("/dashboard");
}

export async function deleteLearningAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteLearningItem(id);
  revalidatePath("/dashboard/apprentissage");
  revalidatePath("/dashboard");
}
