"use client";
import { useState, useEffect } from "react";
import OfficeCard from "./OfficeCard";
import { useSocket } from "@hooks/useSocket";
interface Department {
  id: number;
  name: string;
  now_serving: string;
  description: string;
  officeId: number;
}

interface Office {
  id: number;
  name: string; // Changed this to string to match the expected data type for names
  department: Department[];
}

const NowServingContainer = () => {
  const { socket, isConnected } = useSocket();
  const [offices, setOffices] = useState<Office[]>([]);

  async function getOffices() {
    const data = await fetch(`/api/serving`);
    const response = await data.json();
    setOffices(response.offices);
    // playSound()
  }
  const getWinRemove = async () => {
    const response = await fetch(`/api/serving`);
    const windowApi = await response.json();
    setOffices(windowApi.offices);
  };
  useEffect(() => {
    try {
      getOffices();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("refresh", () => {
        getOffices();
        // Clean up on unmount
        return () => {
          socket.off("refresh");
        };
      });
      socket.on("refreshRemove", () => {
        getWinRemove();
        // Clean up on unmount
        return () => {
          socket.off("refreshRemove");
        };
      });
    }
  }, [socket]);
  return (
    <div className="text-3xl grid grid-cols-3 w-auto gap-x-7 gap-y-5 text-center">
      {offices.map((office) => (
        <OfficeCard key={office.id} data={office} />
      ))}
    </div>
  );
};

export default NowServingContainer;
