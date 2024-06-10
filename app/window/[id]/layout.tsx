import Link from "next/link";

export default function WindowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center">
      <div className=" bg-slate-800 h-14 w-full flex justify-between items-center p-1">
        <Link href={"/window"} className="btn btn-primary text-white">
          Back
        </Link>
        <button className="btn btn-primary text-white">Logout</button>
      </div>
      {children}
    </div>
  );
}
