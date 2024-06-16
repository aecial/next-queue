"use client";
import { useEffect, useState } from "react";
import OfficesSkeleton from "./OfficesSkeleton";
import { useSocket } from "@hooks/useSocket";
type Department = {
  id: number;
  name: string;
  description: string;
  officeId: number;
};
type response = {
  name: string;
  departmentId: string;
  departmentDescription: string;
  office: string;
};
type DepartmentsDivProps = {
  onClick: () => void;
  selectedOfficeId: number;
};

const DepartmentsDiv: React.FC<DepartmentsDivProps> = ({
  onClick,
  selectedOfficeId,
}) => {
  const { socket, isConnected } = useSocket();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reponseName, setResponseName] = useState<string>("");
  const [reponseDept, setResponseDept] = useState<string>("");
  const [reponseDesc, setResponseDesc] = useState<string>("");
  const [reponseOffice, setResponseOffice] = useState<string>("");
  const [randomName, setRandomName] = useState(generateRandomName());
  function generateRandomName(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 5;
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    let randomName = "";
    for (let i = 0; i < length; i++) {
      randomName += characters.charAt(randomValues[i] % characters.length);
    }
    return randomName;
  }
  useEffect(() => {
    if (socket) {
      socket.on("response", (res: response) => {
        console.log("Response: ", res);
        setResponseName(res.name);
        setResponseDept(res.departmentId);
        setResponseDesc(res.departmentDescription);
        setResponseOffice(res.office);
        return () => {
          socket.off("response");
        };
      });
    }
  }, [socket]);
  useEffect(() => {
    setRandomName(generateRandomName());
  }, []);
  useEffect(() => {
    async function getDepartments() {
      try {
        const response = await fetch(`/api/departments/${selectedOfficeId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setDepartments(data.departments);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getDepartments();
  }, [selectedOfficeId]);
  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      onClick();
    }, 100);
  };
  const closeModal = () => {
    setResponseName("");
    setResponseDesc("");
    setResponseDept("");
    setResponseOffice("");
    onClick();
  };
  const createTicket = async (id: number) => {
    socket?.emit("create_ticket", { name: randomName, department: id });
    setIsModalOpen(true);
  };
  if (loading) {
    return <OfficesSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-y-10">
        <ul className="steps">
          <li className="step step-primary">Select desired Office</li>
          <li className="step step-primary">Select a Window</li>
        </ul>

        <div>
          <div className="grid grid-cols-3 gap-4">
            {departments.map((department) => (
              <button
                className="btn btn-primary w-44"
                key={department.id}
                onClick={() => createTicket(department.id)}
              >
                {department.name}
              </button>
            ))}
          </div>
          <div className="divider"></div>
          <button className="btn btn-primary" onClick={goBack}>
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
            </svg>
            Back
          </button>
          {isModalOpen && (
            <dialog
              id="my_modal_5"
              className={"modal modal-open modal-bottom sm:modal-middle"}
            >
              <div className="modal-box bg-slate-100 text-black">
                <h3 className="font-bold text-4xl text-center">
                  {reponseOffice} OFFICE
                </h3>
                <div className="divider"></div>
                <h3 className="font-bold text-center mt-10 text-2xl text-red-500">
                  Window: {reponseDept}
                </h3>
                <h2 className="py-4 mt-4 text-[50px] border-2 border-black text-center">
                  {reponseName}
                </h2>
                <h3 className="font-bold text-center mt-4 text-xl">
                  Purpose: {reponseDesc}
                </h3>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn btn-success text-white"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentsDiv;
