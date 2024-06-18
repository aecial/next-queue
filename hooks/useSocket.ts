import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (!socket) {
      socket = io(process.env.LOCALHOST_URL || "", {
        transports: ["websocket"],
        reconnection: true,
      });

      socket.on("connect", () => {
        console.log("connected to server");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("disconnected from server");
        setIsConnected(false);
        return () => {
          socket?.disconnect();
        };
      });

      socket.on("connect_error", (err) => {
        console.error("Connection error: ", err);
      });
    }
  }, []);

  return { socket, isConnected };
};
