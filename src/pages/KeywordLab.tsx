import { useMemo, useState } from "react";
import { Sparkles, Filter, Save } from "lucide-react";

type Suggest = {
  keyword: string;
  volume?: number;
  cpc?: number;
  difficulty?: number;
  intent?: "informational" | "transactional" | "navigational" | "commercial";
};

const MOCK: Suggest[] = [
  {
    keyword: "seo software",
    volume: 18100,
    cpc: 4.2,
    difficulty: 56,
    intent: "commercial",
  },
  {
    keyword: "keyword tracking tool",
    volume: 6600,
    cpc: 5.0,
    difficulty: 49,
    intent: "commercial",
  },
  {
    keyword: "rank tracker",
    volume: 9900,
    cpc: 3.1,
    difficulty: 51,
    intent: "navigational",
  },
  {
    keyword: "local seo reporting",
    volume: 2400,
    cpc: 6.4,
    difficulty: 45,
    intent: "informational",
  },
  {
    keyword: "google my business rank",
    volume: 4400,
    cpc: 2.2,
    difficulty: 39,
    intent: "informational",
  },
];

export default function KeywordLab() {
  const [seed, setSeed] = useState("seo software");
  const [geo, setGeo] = useState("US");
  type Volume = number | "";
  const [minVol, setMinVol] = useState<Volume>("");
  const [maxVol, setMaxVol] = useState<Volume>("");
  const [intent, setIntent] = useState<string>("");
  const [showSave, setShowSave] = useState(false);

  const results = useMemo(() => {
    let r = [...MOCK];
    if (minVol !== "") r = r.filter((k) => (k.volume || 0) >= Number(minVol));
    if (maxVol !== "") r = r.filter((k) => (k.volume || 0) <= Number(maxVol));
    if (intent) r = r.filter((k) => k.intent === intent);
    return r;
  }, [minVol, maxVol, intent]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Keyword Lab</h1>
        <button className="btn" onClick={() => setShowSave(true)}>
          <Save className="h-4 w-4" />
          Save Selected
        </button>
      </div>

      <section className="card">
        <div className="grid gap-3 md:grid-cols-[1fr_200px_160px_160px]">
          <input
            className="input"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Seed keyword (e.g., seo software)"
          />
          <input
            className="input"
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
            placeholder="Geo (US, city, zip)"
          />
          <button className="btn">
            <Sparkles className="h-4 w-4" />
            Suggest
          </button>
          <button className="btn-outline">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            className="input"
            inputMode="numeric"
            placeholder="Min volume"
            value={minVol}
            onChange={(e) => setMinVol(e.target.value as Volume)}
          />
          <input
            className="input"
            inputMode="numeric"
            placeholder="Max volume"
            value={maxVol}
            onChange={(e) => setMaxVol(e.target.value as Volume)}
          />
          <select
            className="input"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
          >
            <option value="">Any intent</option>
            <option value="informational">Informational</option>
            <option value="transactional">Transactional</option>
            <option value="navigational">Navigational</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </section>

      <section className="card">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            {results.length} keywords
          </div>
          <div className="flex gap-2">
            <button className="btn-outline">Export CSV</button>
            <button className="btn" onClick={() => setShowSave(true)}>
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>

        <div className="max-h-[480px] overflow-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table className="table">
            <thead className="sticky top-0 z-10">
              <tr>
                <th>Keyword</th>
                <th>Volume</th>
                <th>CPC</th>
                <th>Difficulty</th>
                <th>Intent</th>
              </tr>
            </thead>
            <tbody>
              {results.map((k) => (
                <tr
                  key={k.keyword}
                  className="hover:bg-neutral-50/60 dark:hover:bg-white/5"
                >
                  <td className="font-medium">{k.keyword}</td>
                  <td>{k.volume?.toLocaleString() ?? "—"}</td>
                  <td>{k.cpc ? `$${k.cpc.toFixed(2)}` : "—"}</td>
                  <td>{k.difficulty ?? "—"}</td>
                  <td>
                    {k.intent ? (
                      <span className="badge capitalize">{k.intent}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {!results.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-neutral-500"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* mock save dialog */}
      {showSave && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="card max-w-lg w-full">
            <h3 className="text-lg font-semibold">Save to list</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Create a list in the Lab or attach to a client for tracking.
            </p>
            <div className="mt-3 grid gap-2">
              <input
                className="input"
                placeholder="List name (e.g., Local SEO — Chicago)"
              />
              <select className="input">
                <option>— attach to client (optional) —</option>
                <option>Acme Co</option>
                <option>Beta Soft</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn-outline"
                onClick={() => setShowSave(false)}
              >
                Cancel
              </button>
              <button className="btn" onClick={() => setShowSave(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
