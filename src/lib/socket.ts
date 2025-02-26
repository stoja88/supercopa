import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function initSocketServer(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const io = new ServerIO(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      // Unirse a una sala (familia)
      socket.on("join-family", (familyId: string) => {
        socket.join(familyId);
        console.log(`Usuario ${socket.id} se unió a la familia ${familyId}`);
      });

      // Enviar mensaje
      socket.on("send-message", (data) => {
        const { familyId, message } = data;
        io.to(familyId).emit("new-message", message);
      });

      // Notificar cuando un usuario está escribiendo
      socket.on("typing", (data) => {
        const { familyId, user } = data;
        socket.to(familyId).emit("user-typing", user);
      });

      // Desconexión
      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });
  }

  res.end();
} 