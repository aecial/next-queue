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
  );
};

export default OfficesDiv;
