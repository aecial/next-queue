"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@hooks/useSocket";

const Page = () => {
  const { socket, isConnected } = useSocket();
  const [mess, setMess] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        console.log("New message: ", msg);
        setMessages((currentMessages) => [msg, ...currentMessages]);
        // Clean up on unmount
        return () => {
          socket.off("message");
        };
      });
    }
  }, [socket]);
  const sendMessage = () => {
    if (socket && isConnected) {
      socket.emit("message", mess);
      console.log(`${mess} sent`);
      setMess("");
    } else {
      console.log("emrror");
    }
  };

  return (
    <div>
      <h1>Hello Socket.io</h1>
      <input
        type="text"
        value={mess}
        className="text-white"
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
