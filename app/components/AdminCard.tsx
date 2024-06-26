"use client";
import { useRouter } from "next/navigation";
interface AdminCardProps {
  title: string;
  link: string;
  imageLink: string;
}
const AdminCard: React.FC<AdminCardProps> = ({ title, link, imageLink }) => {
  const router = useRouter();
  return (
    <div className="card w-96 bg-base-100 shadow-md shadow-white">
      <figure className="w-[300px] h-[300px] mx-auto">
        <img src={`/admin${imageLink}`} alt={`${imageLink}`} />
        {/* <img src={"/adminImages/" + src} alt="pic" /> */}
      </figure>
      <div className="card-body">
        <div className="card-actions justify-center">
          <button
            onClick={() => router.push(`/admin/${link}`)}
            className="btn btn-primary text-white text-xl w-56"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
