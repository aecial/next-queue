import { redirect } from "next/navigation";
import { cookies } from "next/headers";
interface windowProps {
  children: React.ReactNode;
}
const windowLayout: React.FC<windowProps> = ({ children }) => {
  if (!cookies().get("userId")) {
    redirect("/login");
  }
  return <>{children}</>;
};
export default windowLayout;
