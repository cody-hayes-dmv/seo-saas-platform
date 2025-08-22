import { useState } from "react";
import { Plus, Link as LinkIcon, User } from "lucide-react";

type Task = {
  id: string;
  title: string;
  client: string;
  type: "On-page" | "Content" | "Link building";
  assignee?: string;
  proofCount?: number;
};

const MOCK: Record<string, Task[]> = {
  TODO: [
    {
      id: "t1",
      title: "Fix title tags on category pages",
      client: "Acme Co",
      type: "On-page",
    },
    {
      id: "t2",
      title: "Write ‘Local SEO Guide’ blog",
      client: "Beta Soft",
      type: "Content",
      assignee: "Sam",
    },
  ],
  IN_PROGRESS: [
    {
      id: "t3",
      title: "Acquire 3 local citations",
      client: "Acme Co",
      type: "Link building",
      assignee: "Alex",
      proofCount: 1,
    },
  ],
  DONE: [
    {
      id: "t4",
      title: "Compress hero images",
      client: "Nimbus Health",
      type: "On-page",
      assignee: "Jamie",
      proofCount: 2,
    },
  ],
};

function Column({ name, tasks }: { name: string; tasks: Task[] }) {
  return (
    <div className="card min-h-[360px]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <button className="btn-outline !px-3 !py-1.5">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {/* Ensure children never overflow the column */}
      <div className="flex flex-col gap-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="w-full overflow-hidden break-words rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 p-4 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{t.title}</div>
                <div className="mt-1 text-xs text-neutral-500">{t.client}</div>
              </div>
              <span className="badge">{t.type}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <User className="h-4 w-4" />
                <span className="truncate">{t.assignee || "Unassigned"}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-500">
                <LinkIcon className="h-4 w-4" />
                <span>{t.proofCount || 0} proofs</span>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button className="btn-outline">View</button>
              <button className="btn-outline">Mark Done</button>
            </div>
          </div>
        ))}
        {!tasks.length && (
          <div className="text-sm text-neutral-500">No tasks.</div>
        )}
      </div>
    </div>
  );
}

export default function Tasks() {
  const [data] = useState(MOCK);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Tasks</h1>
        <button className="btn">
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Column name="To Do" tasks={data.TODO} />
        <Column name="In Progress" tasks={data.IN_PROGRESS} />
        <Column name="Done" tasks={data.DONE} />
      </div>
    </div>
  );
}
