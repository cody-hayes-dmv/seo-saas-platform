import { useEffect, useState } from "react";
export function useAuth() {
  const [isAuthenticated] = useState(true);
  const [role] = useState<"ADMIN" | "AGENCY" | "WORKER" | "CLIENT">("ADMIN");
  const [agencyId, setAgencyIdState] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("agencyId") || "";
    setAgencyIdState(id);
    localStorage.setItem("token", "dev-token");
  }, []);

  const setAgencyId = (id: string) => {
    setAgencyIdState(id);
    localStorage.setItem("agencyId", id);
  };

  return { isAuthenticated, role, agencyId, setAgencyId };
}
