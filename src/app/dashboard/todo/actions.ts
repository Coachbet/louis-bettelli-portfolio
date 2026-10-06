"use server";

import { revalidatePath } from "next/cache";
import { addTodo, toggleTodo, deleteTodo } from "@/domains/todo";

export async function addTodoAction(formData: FormData) {
  const text = String(formData.get("text") || "").trim();
  const category = String(formData.get("category") || "").trim() || undefined;
  const dueDate = String(formData.get("dueDate") || "").trim() || undefined;
  if (!text) return;
  await addTodo({ text, category, dueDate });
  revalidatePath("/dashboard/todo");
  revalidatePath("/dashboard");
}

export async function toggleTodoAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await toggleTodo(id);
  revalidatePath("/dashboard/todo");
  revalidatePath("/dashboard");
}

export async function deleteTodoAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteTodo(id);
  revalidatePath("/dashboard/todo");
  revalidatePath("/dashboard");
}
