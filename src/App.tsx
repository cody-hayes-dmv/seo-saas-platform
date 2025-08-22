import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import KeywordLab from "./pages/KeywordLab";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { RoleGuard } from "./components/RoleGuard";
import { useAuth } from "./auth/useAuth";

export default function App() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Login />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/clients"
          element={
            <RoleGuard roles={["ADMIN", "AGENCY"]}>
              <Clients />
            </RoleGuard>
          }
        />
        <Route path="/keyword-lab" element={<KeywordLab />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  );
}
