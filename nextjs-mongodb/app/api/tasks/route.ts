import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const tasks = await db
      .collection("tasks")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks error", error);
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const newTask = {
      title: payload.title,
      completed: false,
      createdAt: new Date(),
    };

    const { insertedId } = await db.collection("tasks").insertOne(newTask);
    return NextResponse.json({ ...newTask, _id: insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error", error);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}
