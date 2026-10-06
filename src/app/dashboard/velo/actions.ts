"use server";

import { revalidatePath } from "next/cache";
import { addRide, deleteRide } from "@/domains/velo";

export async function addRideAction(formData: FormData) {
  const date = String(formData.get("date") || "");
  const distanceKm = Number(formData.get("distanceKm"));
  const durationMin = Number(formData.get("durationMin"));
  const elevationRaw = formData.get("elevationM");
  const elevationM = elevationRaw ? Number(elevationRaw) : undefined;
  const note = String(formData.get("note") || "").trim() || undefined;
  if (!date || !distanceKm || !durationMin) return;
  await addRide({ date, distanceKm, durationMin, elevationM, note });
  revalidatePath("/dashboard/velo");
  revalidatePath("/dashboard");
}

export async function deleteRideAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteRide(id);
  revalidatePath("/dashboard/velo");
  revalidatePath("/dashboard");
}
