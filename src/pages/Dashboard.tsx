import {
  TrendingUp,
  Target,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";

const Stat = ({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
}) => (
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
      <span className="text-emerald-600 font-medium">{delta}</span> vs last 30
      days
    </p>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-hero-gradient opacity-30"></div>
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back 👋
          </h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-300">
            Monitor rankings, traffic, and conversions across clients—at a
            glance.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn">Create Report</button>
            <button className="btn-outline">Add Client</button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label="Avg. Position"
          value="#12.4"
          delta="+0.8"
          icon={TrendingUp}
        />
        <Stat
          label="Organic Clicks"
          value="45,210"
          delta="+5.1%"
          icon={MousePointerClick}
        />
        <Stat label="Conversions" value="732" delta="+2.4%" icon={Target} />
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Positions over time</h2>
          <div className="flex gap-2">
            <button className="btn-outline">Last 30 days</button>
            <button className="btn-outline">Last 90 days</button>
          </div>
        </div>
        <div className="mt-4 h-56 rounded-xl bg-white/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500">
          <span className="text-sm">Chart coming soon</span>
        </div>
      </section>
    </div>
  );
}
