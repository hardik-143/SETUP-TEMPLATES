"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus(null);

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      startTransition(() => {
        router.refresh();
        setTitle("");
        setStatus("Task created!");
      });
    } else {
      const data = await response.json();
      setStatus(data.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="block text-sm font-medium" htmlFor="title">
        New Task Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="w-full rounded border p-2"
        placeholder="e.g. Publish my Next.js MongoDB blog"
      />
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-60"
        disabled={isPending || title.trim() === ""}
      >
        {isPending ? "Adding..." : "Add Task"}
      </button>
      {status && <p className="text-sm text-muted-foreground">{status}</p>}
    </form>
  );
}
