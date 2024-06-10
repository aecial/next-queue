// server.js

const express = require("express");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");
const dev = process.env.NODE_ENV !== "development";
const app = next({ dev });
const handle = app.getRequestHandler();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = socketIo(httpServer);

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    // Listen for custom events
    socket.on("message", (msg) => {
      console.log("message: " + msg);
      // Broadcast the message to all clients
      io.emit("message", msg);
    });
    socket.on("create_ticket", (information) => {
      try {
        async function createTicket(name, department) {
          const ticket = await prisma.tickets.create({
            data: {
              name: name,
              department: {
                connect: { id: department },
              },
            },
            include: {
              department: {
                include: {
                  office: true,
                },
              },
            },
          });
          console.log(ticket);
          socket.emit("response", {
            name: ticket.name,
            departmentId: ticket.department.name,
            departmentDescription: ticket.department.description,
            office: ticket.department.office.name,
          });
        }
        createTicket(information.name, information.department);

        console.log(`New ticket created created`);
        io.emit("receive_ticket");
      } catch (error) {
        console.error("Error handling create_ticket", error);
      }
    });
  });

  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
