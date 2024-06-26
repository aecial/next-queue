"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@hooks/useSocket";
import TransferModal from "./TransferModal";

interface WindowContainerProps {
  id: number;
}

type Ticket = {
  id: number;
  name: string;
  departmentId: number;
};

type Department = {
  id: number;
  name: string;
  now_serving: string;
};

const WindowContainer: React.FC<WindowContainerProps> = ({ id }) => {
  const { socket, isConnected } = useSocket();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [now, setNow] = useState<string>("");
  const [departmentProperties, setDepartmentProperties] = useState<string>("");
  const [transferOpen, setTransferOpen] = useState(false);

  async function getTickets() {
    const data = await fetch(`/api/tickets/${id}`);
    const response = await data.json();
    setTickets(response.tickets);
  }

  async function getDepartment() {
    const data = await fetch(`/api/department/${id}`);
    const response = await data.json();
    setDepartmentProperties(response.department.name);
    if (response) {
      setNow(response.department.now_serving);
    }
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
      getDepartment();
      getTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClick = () => {
    if (tickets.length === 0) {
      logTime(); // Log time before reset
      setNow("");
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: "",
          number: "",
          department: id,
        });
        socket.emit("remove_unified_ticket", { department: id });
      }
      setElapsedTime(0);
      return;
    } else {
      setNow(tickets[0].name);
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: tickets[0].name,
          number: tickets[0].id,
          department: id,
        });
        socket.emit("remove_ticket", { id: tickets[0].id });
      }
      setTickets((prevItems) => prevItems.slice(1));
      logTime();
      startTimer();
    }
  };

  const startTimer = () => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setElapsedTime(parseFloat(elapsedTime.toFixed(2)));
    }, 10);
    setTimer(interval as NodeJS.Timeout);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const logTime = () => {
    if (elapsedTime === 0) {
      return;
    }
    console.log("Elapsed Time:", elapsedTime, "seconds");
    addTime(elapsedTime);
    stopTimer();
  };

  const addTime = (time: number) => {
    console.log(time);
    if (socket) {
      socket.emit("add_time", { time, department: id });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-screen p-2">
      <h1 className="text-4xl text-center">Window {departmentProperties}</h1>
      <div className="flex justify-center items-center gap-10 ">
        <div className="stats shadow w-64 h-32 ml-[130px]">
          <div className="stat">
            <div className="stat-title text-secondary">Now Serving:</div>
            <div className="stat-value text-success text-center">{now}</div>
          </div>
        </div>
        {now === "" ? (
          <button className="invisible btn btn-primary w-20 ">Transfer</button>
        ) : (
          <button
            className="btn btn-primary w-20 "
            onClick={() => setTransferOpen(true)}
          >
            Transfer
          </button>
        )}
      </div>
      {transferOpen && (
        <TransferModal
          windowId={id}
          closeTransfer={() => setTransferOpen(false)}
          handleClick={handleClick}
          now={now}
        />
      )}
      <div className="border border-white h-96 overflow-y-scroll">
        {tickets.map((ticket) => (
          <div key={ticket.id}>
            <p className="text-lg text-center">{ticket.name}</p>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary w-[40%] mx-auto"
        disabled={tickets.length === 0 && now === ""}
        onClick={handleClick}
      >
        {now === "" ? "Start" : tickets.length === 0 ? "Done" : "Next"}
      </button>
    </div>
  );
};

export default WindowContainer;
