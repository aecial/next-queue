"use client";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const Page = () => {
  // Define socket state with the correct type
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  const [mess, setMess] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    // Establish socket connection
    const socketInstance: Socket<DefaultEventsMap, DefaultEventsMap> = io();
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("connected to server");
    });

    socketInstance.on("message", (msg) => {
      console.log("New message: ", msg);
      setMessages((currentMessages) => [msg, ...currentMessages]);
    });

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", mess);
      setMess("");
    }
  };

  return (
    <div>
      <h1>Hello Socket.io</h1>
      <input
        type="text"
        value={mess}
        className="text-black"
        onChange={(e) => setMess(e.target.value)}
      />
      <button onClick={sendMessage}>SEND MESSAGE</button>
      <div className="text-white">
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
        <h1>romr</h1>
      </div>
    </div>
  );
};

export default Page;
