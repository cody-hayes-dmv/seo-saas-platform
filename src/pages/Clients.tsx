import { useMemo, useState } from "react";
import { Plus, Search, Globe, Building2 } from "lucide-react";

type Client = {
  id: string;
  name: string;
  websiteUrl?: string;
  industry?: string;
  targetLocations?: string[];
};

const MOCK: Client[] = [
  {
    id: "c1",
    name: "Acme Co",
    websiteUrl: "https://acme.example",
    industry: "E-commerce",
    targetLocations: ["US / Chicago"],
  },
  {
    id: "c2",
    name: "Beta Soft",
    websiteUrl: "https://beta.example",
    industry: "SaaS",
    targetLocations: ["US / Remote"],
  },
  {
    id: "c3",
    name: "Nimbus Health",
    websiteUrl: "https://nimbus.example",
    industry: "Healthcare",
    targetLocations: ["US / NY", "US / NJ"],
  },
];

export default function Clients() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK;
    return MOCK.filter((c) =>
      [c.name, c.websiteUrl, c.industry, ...(c.targetLocations || [])]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Clients</h1>
        <button className="btn">
          <Plus className="h-4 w-4" />
          New Client
        </button>
      </div>

      <div className="card">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex w-full items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
            <Search className="h-4 w-4 text-neutral-400" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              placeholder="Search name, domain, industry, location…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button className="btn-outline">Export CSV</button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table className="table">
            <thead className="sticky top-0 z-10">
              <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Industry</th>
                <th>Targets</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-neutral-50/60 dark:hover:bg-white/5"
                >
                  <td className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-brand-600" />
                      {c.name}
                    </div>
                  </td>
                  <td>
                    {c.websiteUrl ? (
                      <a
                        className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                        href={c.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Globe className="h-4 w-4" />
                        {new URL(c.websiteUrl).host}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{c.industry || "—"}</td>
                  <td>
                    {c.targetLocations?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {c.targetLocations.map((t) => (
                          <span key={t} className="badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="btn-outline">Open</button>
                      <button className="btn-outline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-neutral-500"
                  >
                    No clients match “{q}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
