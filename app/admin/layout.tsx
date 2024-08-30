import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminNavigation from "../components/AdminNavigation";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  if (!cookies().get("userId")) {
    redirect("/login");
  }
  const usernameCookie = cookies().get("username");
  const username = usernameCookie ? String(usernameCookie.value) : "";
  return (
    <>
      <AdminNavigation username={JSON.parse(decodeURIComponent(username))} />
      {children}
    </>
  );
};

export default AdminLayout;
