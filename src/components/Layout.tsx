import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutGrid,
  Users2,
  ListChecks,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { useBranding } from "../store/branding";
import { useAuth } from "../auth/useAuth";
import { motion } from "framer-motion";

const NavItem = ({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: LucideIcon;
}) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition
        ${
          active
            ? "bg-brand-500/10 text-brand-700 dark:text-brand-200"
            : "hover:bg-white/50 dark:hover:bg-white/5"
        }`}
    >
      <Icon
        className={`h-5 w-5 ${
          active
            ? "text-brand-600 dark:text-brand-300"
            : "text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
        }`}
      />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { agencyId, setAgencyId } = useAuth();
  const { branding } = useBranding();
  const [open, setOpen] = useState(true);

  // 👉 Mock tenant data (no prompt, no fetch)
  const mockAgency = {
    id: "mock-agency-123",
    name: "Acme SEO Agency",
    logoUrl: "https://placehold.co/64x64/png?text=A",
  };

  useEffect(() => {
    // If there's no agency set yet, seed a mock one (no prompt)
    if (!agencyId) {
      setAgencyId(mockAgency.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefer real branding from store if present; otherwise use mock
  const displayName = branding?.name || mockAgency.name;
  const displayLogo = branding?.logoUrl || mockAgency.logoUrl;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed ambient background (no scrolling artifacts) */}
      <div className="ambient"></div>

      <header className="sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="btn-outline !px-3 !py-2"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {displayLogo ? (
                <img
                  src={displayLogo}
                  alt="logo"
                  className="h-8 w-8 rounded-md object-cover"
                />
              ) : (
                <div className="text-xl font-extrabold tracking-tight">
                  <span className="text-brand-600">SEO</span>{" "}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    SaaS
                  </span>
                </div>
              )}
              {displayName && <span className="badge">{displayName}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-outline">Docs</button>
            <button className="btn">New Report</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className={`card lg:sticky lg:top-4 h-max ${
            open ? "block" : "hidden lg:block"
          }`}
        >
          <nav className="grid gap-1">
            <NavItem to="/dashboard" label="Dashboard" icon={LayoutGrid} />
            <NavItem to="/clients" label="Clients" icon={Users2} />
            <NavItem to="/keyword-lab" label="Keyword Lab" icon={LineChart} />
            <NavItem to="/tasks" label="Tasks" icon={ListChecks} />
            <NavItem to="/reports" label="Reports" icon={LineChart} />
          </nav>
          <div className="mt-4 text-xs text-neutral-500">
            <p>
              Agency ID:{" "}
              <span className="font-mono">{agencyId || mockAgency.id}</span>
            </p>
          </div>
        </motion.aside>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
