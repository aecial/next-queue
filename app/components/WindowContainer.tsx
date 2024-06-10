"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@hooks/useSocket";
interface WindowContainerProps {
  id: number;
}
type tickets = {
  id: number;
  name: string;
  departmentId: number;
};
const WindowContainer: React.FC<WindowContainerProps> = ({ id }) => {
  const { socket, isConnected } = useSocket();
  const [tickets, setTickets] = useState<tickets[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function getTickets() {
    const data = await fetch(`/api/tickets/${id}`);
    const response = await data.json();
    setTickets(response.tickets);
  }
  useEffect(() => {
    if (socket) {
      socket.on("receive_ticket", () => {
        getTickets();
        // Clean up on unmount
        return () => {
          socket.off("message");
        };
      });
    }
  }, [socket]);
  useEffect(() => {
    try {
      getTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl">Window {id}</h1>
      <div>
        {tickets.map((ticket) => (
          <p className="text-lg" key={ticket.id}>
            {ticket.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WindowContainer;
