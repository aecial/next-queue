"use client";
import { useEffect, useState } from "react";
import OfficesSkeleton from "./OfficesSkeleton";

type Department = {
  id: number;
  name: string;
  description: string;
  officeId: number;
};

type DepartmentsDivProps = {
  onClick: () => void;
  selectedOfficeId: number;
};

const DepartmentsDiv: React.FC<DepartmentsDivProps> = ({
  onClick,
  selectedOfficeId,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <OfficesSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(departments)) {
    return <div>Error: Data format is incorrect.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {departments.map((department) => (
          <button
            className="btn btn-primary w-44"
            key={department.id}
            // onClick={() => onClick(department.id)}
          >
            {department.name}
          </button>
        ))}
      </div>
      <div className="divider"></div>
      <button className="btn btn-primary" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        Back
      </button>
    </>
  );
};

export default DepartmentsDiv;
