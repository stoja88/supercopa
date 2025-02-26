"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(familyId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Inicializar el servidor de Socket.IO
    fetch("/api/socket")
      .then(() => {
        // Crear la conexión del cliente
        const socketInstance = io({
          path: "/api/socket",
        });

        socketInstance.on("connect", () => {
          console.log("Conectado a Socket.IO");
          setIsConnected(true);

          // Unirse a la sala de la familia
          if (familyId) {
            socketInstance.emit("join-family", familyId);
          }
        });

        socketInstance.on("disconnect", () => {
          console.log("Desconectado de Socket.IO");
          setIsConnected(false);
        });

        setSocket(socketInstance);

        // Limpiar al desmontar
        return () => {
          socketInstance.disconnect();
        };
      })
      .catch((error) => {
        console.error("Error al inicializar Socket.IO:", error);
      });
  }, [familyId]);

  // Función para enviar un mensaje
  const sendMessage = (message: any) => {
    if (socket && isConnected && familyId) {
      socket.emit("send-message", { familyId, message });
    }
  };

  // Función para notificar que el usuario está escribiendo
  const sendTyping = (user: any) => {
    if (socket && isConnected && familyId) {
      socket.emit("typing", { familyId, user });
    }
  };

  return {
    socket,
    isConnected,
    sendMessage,
    sendTyping,
  };
} 