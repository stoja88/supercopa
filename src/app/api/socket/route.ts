import { NextRequest, NextResponse } from "next/server";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

// Tipo para extender el objeto de solicitud
type SocketIONextApiResponse = NextResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export async function GET(req: NextRequest, res: SocketIONextApiResponse) {
  try {
    if (!res.socket.server.io) {
      console.log("Inicializando Socket.io");
      const io = new SocketIOServer(res.socket.server);
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al inicializar Socket.io:", error);
    return NextResponse.json({ success: false, error: "Error al inicializar Socket.io" }, { status: 500 });
  }
} 