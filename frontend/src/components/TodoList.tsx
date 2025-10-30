"use client";

import { useEffect, useMemo, useState } from "react";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  storageKey?: string;
  title?: string;
  showHeader?: boolean;
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const TodoList = ({
  storageKey = "todo-list",
  title = "Tareas",
  showHeader = true,
}: TodoListProps) => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as TodoItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (_) {
      // Ignorar errores de parseo
    }
  }, [storageKey]);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (_) {
      // Ignorar storage full
    }
  }, [items, storageKey]);

  const remaining = useMemo(
    () => items.filter((i) => !i.completed).length,
    [items]
  );

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    const next: TodoItem = {
      id: generateId(),
      text: trimmed,
      completed: false,
    };
    setItems([next, ...items]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCompleted = () => {
    setItems((prev) => prev.filter((i) => !i.completed));
  };

  return (
    <section className="w-full">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <span className="text-sm text-gray-500">{remaining} por hacer</span>
        </div>
      )}

      <div
        className="flex gap-2 mb-4"
        role="group"
        aria-label="Agregar pendiente"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una tarea y presiona Enter"
          aria-label="Nueva tarea"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:border-[#FF277E]"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-md bg-[#FF277E] text-white font-medium hover:scale-105 transition-transform"
          aria-label="Agregar tarea"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md border border-gray-200 p-3"
          >
            <label className="flex items-center gap-3 cursor-pointer w-full">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item.id)}
                aria-label={`Marcar ${item.text}`}
                className="h-4 w-4 accent-[#FF277E]"
              />
              <span
                className={`text-black ${
                  item.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {item.text}
              </span>
            </label>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-gray-500 hover:text-[#FF277E] text-sm"
              aria-label={`Eliminar ${item.text}`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {items.some((i) => i.completed) && (
        <div className="mt-4">
          <button
            onClick={handleClearCompleted}
            className="text-sm text-gray-600 hover:text-[#FF277E]"
          >
            Limpiar completadas
          </button>
        </div>
      )}
    </section>
  );
};

export default TodoList;
