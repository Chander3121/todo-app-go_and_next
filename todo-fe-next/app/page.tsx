// pages/index.tsx
'use client';
import { useEffect, useState } from "react";
import {
  Todo,
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../lib/api";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setError(null);
      if (editingId) {
        await updateTodo(editingId, { title, content });
      } else {
        await createTodo({ title, content });
      }
      resetForm();
      await loadTodos();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id!);
    setTitle(todo.title);
    setContent(todo.content);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      setError(null);
      await deleteTodo(id);
      await loadTodos();
    } catch (err: any) {
      setError(err.message || "Failed to delete todo");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>Go + Gin + Next.js Todo</h1>
      <p>Backend: Go (Gin) · DB: PostgreSQL · Frontend: Next.js</p>

      {error && (
        <div style={{ background: "#ffe0e0", padding: "0.5rem", marginTop: "1rem" }}>
          {error}
        </div>
      )}

      <section style={{ marginTop: "2rem" }}>
        <h2>{editingId ? "Edit Todo" : "Create New Todo"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ padding: "0.5rem" }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" style={{ padding: "0.5rem 1rem" }}>
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{ padding: "0.5rem 1rem" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>All Todos</h2>
        {loading && <p>Loading...</p>}
        {!loading && todos.length === 0 && <p>No todos yet. Create one!</p>}

        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "0.75rem",
                borderRadius: 4,
              }}
            >
              <h3>{todo.title}</h3>
              <p>{todo.content}</p>
              {todo.created_at && (
                <small>
                  Created at:{" "}
                  {new Date(todo.created_at).toLocaleString()}
                </small>
              )}
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
