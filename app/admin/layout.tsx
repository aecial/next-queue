// components/AdminLayout.tsx

import { session } from "@utils/session";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const isSessionValid = session;
  if (!isSessionValid) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default AdminLayout;
