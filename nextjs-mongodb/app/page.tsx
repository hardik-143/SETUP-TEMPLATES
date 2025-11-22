import { getDb } from "@/lib/mongodb";
import Link from "next/link";
import { AddTaskForm } from "./add-task-form";

async function getTasks() {
  const db = await getDb();
  const tasks = await db
    .collection("tasks")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return tasks.map((task) => ({
    id: task._id.toString(),
    title: task.title,
    completed: task.completed,
    createdAt: task.createdAt,
  }));
}

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Next.js + MongoDB Demo</h1>
        <p className="text-muted-foreground">
          Server-rendered data fetched directly from MongoDB.
        </p>
      </header>

      <section className="space-y-4">
        <AddTaskForm />
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tasks yet. Add one via POST /api/tasks.
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="rounded border p-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">{task.title}</h2>
                  <span className="text-xs uppercase tracking-wide">
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <time className="text-xs text-muted-foreground">
                  {new Date(task.createdAt).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="text-sm text-muted-foreground">
        <Link href="/api/tasks" className="underline">
          View API response
        </Link>
      </footer>
    </main>
  );
}
