import { useAuth } from "../auth/useAuth";
export function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const { role } = useAuth();
  if (!roles.includes(role)) return <div>Forbidden</div>;
  return <>{children}</>;
}
