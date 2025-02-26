"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Send, Scale, Info, Sparkles, MessageSquare, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Tipos
type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

// Temas comunes para sugerir
const commonTopics = [
  "¿Cómo funciona la custodia compartida?",
  "¿Cómo se calcula la pensión alimenticia?",
  "¿Qué es un régimen de visitas?",
  "¿Cómo modificar medidas de un convenio?",
  "¿Qué hacer ante incumplimientos?",
  "¿En qué consiste la mediación familiar?",
];

export default function AsistenteLegalPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hola, soy tu asistente legal para temas de co-parentalidad. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Desplazarse al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar consulta al asistente legal
  const handleSendQuery = async () => {
    if (!query.trim()) return;

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/legal-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error("Error al procesar la consulta");
      }
      
      const data = await response.json();
      
      // Añadir respuesta del asistente
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Añadir disclaimer si es la primera consulta
      if (messages.length === 1) {
        const disclaimerMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: data.disclaimer,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, disclaimerMessage]);
      }
    } catch (error) {
      console.error("Error al consultar al asistente legal:", error);
      
      // Mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  // Usar una sugerencia
  const handleUseSuggestion = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Scale className="mr-2 h-6 w-6" /> Asistente Legal
          </h1>
          <p className="text-muted-foreground">
            Consulta información legal sobre co-parentalidad
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Panel de información */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Info className="mr-2 h-4 w-4" /> Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Este asistente proporciona información general sobre temas legales relacionados con la co-parentalidad.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Importante:</strong> Esta información es orientativa y no constituye asesoramiento legal profesional. Para casos específicos, consulta con un abogado especializado.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Temas populares:</h3>
                  <div className="space-y-2">
                    {commonTopics.map((topic, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleUseSuggestion(topic)}
                      >
                        <MessageSquare className="mr-2 h-3 w-3" />
                        <span className="truncate">{topic}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat con el asistente */}
        <div className="md:col-span-3">
          <Card className="flex flex-col h-[calc(100vh-12rem)]">
            <CardHeader className="border-b">
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" /> Asistente Legal IA
              </CardTitle>
              <CardDescription>
                Haz preguntas sobre aspectos legales de la co-parentalidad
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 whitespace-pre-wrap ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Escribe tu consulta legal aquí..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendQuery();
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSendQuery} disabled={isLoading || !query.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {messages.length > 1 && (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <ArrowDown className="h-3 w-3 mr-1" /> Ir al final
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 