import { useState } from "react";
import {
  Calendar,
  Download,
  BarChart2,
  MousePointerClick,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export default function Reports() {
  type Range = "30" | "90" | "custom";
  const [range, setRange] = useState<Range>("30");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight">Reports</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="card flex items-center gap-2 !p-2">
            <Calendar className="h-4 w-4 text-brand-600" />
            <select
              className="input !h-9 !py-1 !px-2 w-40"
              value={range}
              onChange={(e) => setRange(e.target.value as Range)}
            >
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="custom">Custom…</option>
            </select>
          </div>
          <button className="btn-outline">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI tiles */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Sessions" value="68,420" delta="+4.1%" icon={BarChart2} />
        <Tile label="Users" value="51,903" delta="+3.2%" icon={TrendingUp} />
        <Tile label="Avg. Position" value="#12.1" delta="+0.5" icon={Target} />
        <Tile
          label="Organic Clicks"
          value="24,308"
          delta="+6.3%"
          icon={MousePointerClick}
        />
      </section>

      {/* GA4 section */}
      <section className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">GA4 — Traffic & Engagement</h2>
          <div className="flex gap-2">
            <button className="btn-outline">Customize</button>
            <button className="btn-outline">Email Schedule</button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ChartPlaceholder title="Sessions" />
          <ChartPlaceholder title="Conversions" />
          <ChartPlaceholder title="Avg. Session Duration" />
          <ChartPlaceholder title="Bounce Rate" />
        </div>
      </section>

      {/* GSC section */}
      <section className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">GSC — Search Performance</h2>
          <div className="flex gap-2">
            <button className="btn-outline">Customize</button>
            <button className="btn-outline">Email Schedule</button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ChartPlaceholder title="Total Clicks" />
          <ChartPlaceholder title="Total Impressions" />
          <ChartPlaceholder title="Average CTR" />
          <ChartPlaceholder title="Average Position" />
        </div>
      </section>
    </div>
  );
}

function Tile({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
        </div>
        <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-brand-600" />
        </div>
      </div>
      <p className="mt-3 text-sm">
        <span className="text-emerald-600 font-medium">{delta}</span> vs
        previous
      </p>
    </div>
  );
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/50">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-neutral-500">mock</span>
      </div>
      <div className="h-48 rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 grid place-items-center text-neutral-500">
        Chart coming soon
      </div>
    </div>
  );
}
