import Link from "next/link";

export default function NotFound({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">Not found – 404!</h1>
      <div className="divider"></div>
      <div>
        <Link
          className="btn btn-primary text-white text-2xl font-normal"
          href={link}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>{" "}
          Go back to {title}
        </Link>
      </div>
    </div>
  );
}
