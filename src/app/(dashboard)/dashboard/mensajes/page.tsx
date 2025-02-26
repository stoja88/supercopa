"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Send, Paperclip, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useSocket } from "@/hooks/useSocket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tipo para los mensajes
type Message = {
  id: string;
  content: string;
  senderId: string;
  familyId: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

// Datos de ejemplo para familias
const mockFamilies = [
  {
    id: "1",
    name: "Familia García",
  },
  {
    id: "2",
    name: "Familia Martínez",
  },
];

export default function MensajesPage() {
  const { data: session } = useSession();
  const [selectedFamily, setSelectedFamily] = useState(mockFamilies[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userTyping, setUserTyping] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Usar el hook de Socket.IO
  const { socket, isConnected, sendMessage, sendTyping } = useSocket(selectedFamily.id);

  // Cargar mensajes
  useEffect(() => {
    if (session && selectedFamily) {
      setIsLoading(true);
      fetch(`/api/messages?familyId=${selectedFamily.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
            // Marcar mensajes como leídos
            const unreadMessages = data
              .filter((msg) => !msg.isRead && msg.senderId !== session.user.id)
              .map((msg) => msg.id);
            
            if (unreadMessages.length > 0) {
              fetch("/api/messages", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ messageIds: unreadMessages }),
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error al cargar mensajes:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session, selectedFamily]);

  // Escuchar nuevos mensajes
  useEffect(() => {
    if (socket) {
      socket.on("new-message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        // Marcar como leído si es de otro usuario
        if (message.senderId !== session?.user.id) {
          fetch("/api/messages", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ messageIds: [message.id] }),
          });
        }
      });

      socket.on("user-typing", (user: string) => {
        setUserTyping(user);
        // Limpiar después de 3 segundos
        setTimeout(() => {
          setUserTyping(null);
        }, 3000);
      });

      return () => {
        socket.off("new-message");
        socket.off("user-typing");
      };
    }
  }, [socket, session]);

  // Desplazarse al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar un mensaje
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !session) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          familyId: selectedFamily.id,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        // Enviar a través de Socket.IO
        sendMessage(message);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  // Manejar escritura
  const handleTyping = () => {
    if (session) {
      sendTyping(session.user.name);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mensajes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Lista de familias */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Familias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFamilies.map((family) => (
                  <div
                    key={family.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedFamily.id === family.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedFamily(family)}
                  >
                    <p className="font-medium">{family.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat */}
        <div className="md:col-span-3">
          <Card className="flex flex-col h-[calc(100vh-12rem)]">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">{selectedFamily.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <p className="text-muted-foreground mb-2">No hay mensajes aún</p>
                  <p className="text-sm">Envía el primer mensaje para comenzar la conversación</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === session?.user.id ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === session?.user.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {message.senderId !== session?.user.id && (
                          <p className="text-xs font-medium mb-1">{message.sender.name}</p>
                        )}
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatDate(new Date(message.createdAt))}
                        </p>
                      </div>
                    </div>
                  ))}
                  {userTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-sm">
                        {userTyping} está escribiendo...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" title="Adjuntar archivo">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  onKeyUp={handleTyping}
                  disabled={isLoading || !isConnected}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !isConnected}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!isConnected && (
                <p className="text-xs text-red-500 mt-2">
                  Conectando al servidor de mensajes...
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 