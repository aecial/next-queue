"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Department {
  id: number;
  name: string;
  officeId: number;
}
const DepartmentsList = ({ officeId }: { officeId: number }) => {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const getDepartments = async () => {
    try {
      const departments = await fetch(`/api/departments/${officeId}`);
      const response = await departments.json();
      setDepartments(response.departments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="h-screen w-screen p-4 flex flex-col gap-10 justify-center items-center">
      <h1 className="text-3xl">Select your Window:</h1>
      <div className="w-[60%] mx-auto grid grid-cols-4 gap-10 gap-x-0 place-items-center">
        {loading === false ? (
          departments.map((department) => (
            <button
              key={department.id}
              className="btn btn-primary w-32 h-16"
              onClick={() => router.push(`/window/${department.id}`)}
            >
              {department.name}
            </button>
          ))
        ) : (
          <>
            <div className="w-32 h-16 skeleton"></div>
            <div className="w-32 h-16 skeleton"></div>
            <div className="w-32 h-16 skeleton"></div>
            <div className="w-32 h-16 skeleton"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentsList;
