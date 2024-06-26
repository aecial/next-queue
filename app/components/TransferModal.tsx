"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@hooks/useSocket";
type Department = {
  id: number;
  name: string;
};
type Office = {
  id: number;
  name: string;
  department: Department[];
};
interface TransferModalProps {
  windowId: number;
  closeTransfer: () => void;
  handleClick: () => void;
  now: string;
}
const TransferModal: React.FC<TransferModalProps> = ({
  windowId,
  closeTransfer,
  handleClick,
  now,
}) => {
  useEffect(() => {
    async function fetchOffices() {
      const offices = await fetch("/api/offices");
      const response = await offices.json();
      setOffices(response.offices);
    }
    fetchOffices();
  }, []);
  const transferTicket = async (windowId: number) => {
    socket?.emit("create_ticket", { name: now, department: windowId });
    handleClick();
    closeTransfer();
  };
  const [offices, setOffices] = useState<Office[]>([]);
  const { socket, isConnected } = useSocket();
  return (
    <dialog id="transfer_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Transfer Ticket</h3>
        <div className="divider"></div>
        <p className="py-4 text-xl">
          Which window would you like to transfer the ticket?
        </p>
        <div className="flex flex-col">
          {offices.map((office) => {
            return (
              <div key={office.id}>
                <h1 className="text-xl text-center">{office.name}</h1>
                <div className="grid grid-cols-3 gap-3">
                  {office.department.map((win) => {
                    return win.id === windowId ? (
                      ""
                    ) : (
                      <button
                        key={win.id}
                        className="btn btn-primary"
                        onClick={() => transferTicket(win.id)}
                      >
                        {win.name}
                      </button>
                    );
                  })}
                </div>
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
        <div className="modal-action">
          <button className="btn text-white" onClick={closeTransfer}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TransferModal;
