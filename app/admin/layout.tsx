import { redirect } from "next/navigation";
import { cookies } from "next/headers";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  if (!cookies().get("userId")) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default AdminLayout;
