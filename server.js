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
    socket.on("display_unified_ticket", (data) => {
      console.log(data);
      console.log("display unified ticket");
      async function updateTicket(name, department) {
        const ticket = await prisma.department.update({
          where: {
            id: Number(department),
          },
          data: {
            now_serving: `${name}`,
          },
        });
        console.log(ticket);
        if (name === "") {
          io.emit("refreshRemove");
        } else {
          io.emit("refresh");
        }
      }
      updateTicket(data.name, data.department);
      console.log("Ticket Updated");
    });
    socket.on("remove_ticket", (information) => {
      async function removeTicket(id) {
        const ticket = await prisma.tickets.delete({
          where: {
            id: Number(id),
          },
        });
        console.log(ticket);
      }
      removeTicket(information.id);
      console.log(`#${information.id} removed`);
      io.emit("receive_ticket");
    });
    socket.on("remove_unified_ticket", (information) => {
      async function removeNowServing(department) {
        const ticket = await prisma.department.update({
          where: {
            id: Number(department),
          },
          data: {
            now_serving: "",
          },
        });
        console.log(ticket);
      }
      removeNowServing(information.department);
      io.emit("refreshRemove");
    });
    socket.on("add_time", (information) => {
      async function createTime(time, department) {
        const service = await prisma.service.create({
          data: {
            service_time: Number(time),
            departmentId: Number(department),
          },
        });
        console.log(service);
      }
      createTime(information.time, information.department);
      console.log(`New Time created`);
    });

    socket.on("disconnect", (error) => {
      if (error && error.code === "ECONNRESET") {
        // Handle ECONNRESET error specifically
        console.error(`${socket.id} disconnected due to ECONNRESET`);
        // Perform any necessary cleanup or logging
      } else {
        // Handle other disconnection errors or scenarios
        console.error(`${socket.id} disconnected with error:`, error);
        // Perform appropriate error handling or cleanup
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
