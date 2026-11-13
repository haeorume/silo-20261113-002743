"use client";

import { useState, useEffect } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Simulate loading tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dailylist-tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      // Default demo tasks
      setTasks([
        { id: "1", text: "Review project requirements", completed: true },
        { id: "2", text: "Implement core SaaS features", completed: false },
        { id: "3", text: "Design task list UI", completed: false },
      ]);
    }
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    localStorage.setItem("dailylist-tasks", JSON.stringify([...tasks, newTask]));
    setInputValue("");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    localStorage.setItem("dailylist-tasks", JSON.stringify(tasks));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
    localStorage.setItem("dailylist-tasks", JSON.stringify(tasks.filter((t) => !t.completed)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      {/* Header */}
      <header className="mb-12 md:mb-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">할</h1>
            <p className="mt-3 text-lg md:text-xl text-neutral-700">
              오늘 해야 할 일, 한 줄로 정리하고 끝내세요.
            </p>
          </div>
          <a href="#start" className="inline-block mt-6 md:mt-0">
            <button className="px-8 py-3.5 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-colors">
              시작하기
            </button>
          </a>
        </div>
      </header>

      {/* Add Task Form */}
      <section id="start" className="mb-10 md:mb-12">
        <form onSubmit={addTask} className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="할 일을 입력하세요..."
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`px-8 py-3.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              inputValue.trim()
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            추가하기
          </button>
        </form>
      </section>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="empty-state mb-12 md:mb-16">
          <h2 className="text-xl font-semibold mb-3 text-neutral-900">아직 할 일이 없습니다</h2>
          <p className="text-neutral-700 mb-4">
            첫 번째 할 일을 추가하여 오늘 하루 집중하세요.
          </p>
        </div>
      ) : (
        <section className="mb-12 md:mb-16">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-lg bg-neutral-100 transition-all ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-primary border-primary"
                      : "border-neutral-400 hover:border-primary"
                  }`}
                >
                  {task.completed && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? "line-through" : ""}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="w-full mt-4 text-sm text-neutral-500 hover:text-error-500 py-2"
            >
              완료된 작업 삭제 ({completedCount})
            </button>
          )}
        </section>
      )}

      {/* Benefits Section */}
      <section className="mt-16 md:mt-20">
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <div className="feature-card p-6 rounded-lg bg-neutral-50">
            <h3 className="font-semibold mb-2 text-neutral-900">빠른 추가</h3>
            <p className="text-sm text-neutral-700">
              할 일을 빠르게 추가하고, 완료 표시로 즉시 정리하세요.
            </p>
          </div>
          <div className="feature-card p-6 rounded-lg bg-neutral-50">
            <h3 className="font-semibold mb-2 text-neutral-900">집중 모드</h3>
            <p className="text-sm text-neutral-700">
              오늘 하루 동안 할 일만 보여서, 집중이 끊기지 않습니다.
            </p>
          </div>
          <div className="feature-card p-6 rounded-lg bg-neutral-50">
            <h3 className="font-semibold mb-2 text-neutral-900">간단한 인터페이스</h3>
            <p className="text-sm text-neutral-700">
              부담 없는 디자인으로 매일 쉽게 사용하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 md:mt-20 text-center text-sm text-neutral-500">
        <p>
          Built with Next.js • Inspired by{" "}
          <a href="https://www.todoist.com" className="text-primary hover:underline">
            Todoist
          </a>{" "}
          and{" "}
          <a href="https://www.any.do" className="text-primary hover:underline">
            Any.do
          </a>
          {" · "}
          <a href="todoist-com/" className="text-primary hover:underline">
            Todoist 클론
          </a>
          {" · "}
          <a href="any-do/" className="text-primary hover:underline">
            Any.do 클론
          </a>
        </p>
      </footer>
    </main>
  );
}
