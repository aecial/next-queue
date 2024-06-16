import { department } from "@prisma/client";
import React from "react";
import ServingCard from "./ServingCard";
interface Department {
  id: number;
  name: string;
  now_serving: string;
  description: string;
  officeId: number;
}
interface data {
  id: number;
  name: string;
  department: Department[];
}
const OfficeCard = ({ data }: { data: data }) => {
  return (
    <div
      key={data.id}
      className="border border-yellow-500 p-2 w-[450px] mx-auto"
    >
      <h1 className="text-4xl">{data.name}</h1>
      <div className="divider"></div>
      {data.department.map((window: department) => {
        return (
          <ServingCard
            key={window.id}
            winNum={window.name}
            ticket={window.now_serving}
          />
        );
      })}
    </div>
  );
};

export default OfficeCard;
