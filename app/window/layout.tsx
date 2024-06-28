import { redirect } from "next/navigation";
import { session } from "@/utils/session";
interface windowProps {
  children: React.ReactNode;
}
const windowLayout: React.FC<windowProps> = ({ children }) => {
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
};
export default windowLayout;
