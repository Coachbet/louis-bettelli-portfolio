import { readJson, writeJson, generateId } from "@/lib/json-store";

export type TodoItem = {
  id: string;
  text: string;
  category?: string;
  done: boolean;
  dueDate?: string;
  createdAt: string;
};

const FILE = "todo.json";

export async function listTodos(): Promise<TodoItem[]> {
  const entries = await readJson<TodoItem[]>(FILE, []);
  return [...entries].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999");
  });
}

export async function addTodo(input: {
  text: string;
  category?: string;
  dueDate?: string;
}): Promise<void> {
  const entries = await readJson<TodoItem[]>(FILE, []);
  entries.push({
    id: generateId(),
    done: false,
    createdAt: new Date().toISOString(),
    ...input,
  });
  await writeJson(FILE, entries);
}

export async function toggleTodo(id: string): Promise<void> {
  const entries = await readJson<TodoItem[]>(FILE, []);
  const updated = entries.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  await writeJson(FILE, updated);
}

export async function deleteTodo(id: string): Promise<void> {
  const entries = await readJson<TodoItem[]>(FILE, []);
  await writeJson(
    FILE,
    entries.filter((e) => e.id !== id)
  );
}
