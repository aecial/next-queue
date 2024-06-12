"use client";
type office = {
  id: number;
  name: string;
};
type OfficesDivProps = {
  onClick: (id: number) => void;
};
import { useEffect, useState } from "react";
import OfficesSkeleton from "./OfficesSkeleton";
const OfficesDiv: React.FC<OfficesDivProps> = ({ onClick }) => {
  const [offices, setOffices] = useState<office[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function getOffices() {
      const data = await fetch("/api/offices");
      const response = await data.json();
      setOffices(response.offices);
    }
    try {
      getOffices();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <OfficesSkeleton />;
  }
  return (
    <div className="flex flex-col justify-center gap-y-10">
      <ul className="steps">
        <li className="step step-primary">Select desired Office</li>
        <li className="step ">Select a Window</li>
      </ul>
      <div className="grid grid-cols-3 gap-4">
        {offices.map((office) => (
          <button
            className="btn btn-primary w-44"
            key={office.id}
            onClick={() => onClick(office.id)}
          >
            {office.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OfficesDiv;
