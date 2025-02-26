"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/utils";

// Estilos personalizados para react-calendar
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // Crearemos este archivo después

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Datos de ejemplo para eventos
const mockEvents = [
  {
    id: "1",
    title: "Visita al pediatra",
    description: "Revisión anual con Dr. Martínez",
    startDate: new Date(2023, 5, 15, 10, 0),
    endDate: new Date(2023, 5, 15, 11, 0),
    location: "Centro Médico Avenida",
  },
  {
    id: "2",
    title: "Clase de natación",
    description: "Llevar bañador y toalla",
    startDate: new Date(2023, 5, 18, 17, 0),
    endDate: new Date(2023, 5, 18, 18, 0),
    location: "Piscina Municipal",
  },
  {
    id: "3",
    title: "Recogida del colegio",
    description: "Semana con papá",
    startDate: new Date(2023, 5, 20, 16, 0),
    endDate: new Date(2023, 5, 20, 16, 30),
    location: "Colegio San José",
  },
];

export default function CalendarioPage() {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "day">("month");

  // Filtrar eventos para la fecha seleccionada
  const eventsForSelectedDate = mockEvents.filter((event) => {
    if (selectedDate instanceof Date) {
      return (
        event.startDate.getDate() === selectedDate.getDate() &&
        event.startDate.getMonth() === selectedDate.getMonth() &&
        event.startDate.getFullYear() === selectedDate.getFullYear()
      );
    }
    return false;
  });

  const handleDateChange = (value: Value) => {
    setDate(value);
    if (value instanceof Date) {
      setSelectedDate(value);
      setView("day");
    }
  };

  const handleBackToMonth = () => {
    setView("month");
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calendario</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario */}
        <div className="lg:col-span-2">
          {view === "month" ? (
            <Card>
              <CardContent className="p-6">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  locale="es-ES"
                  className="w-full border-none"
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Button variant="ghost" onClick={handleBackToMonth}>
                    Volver al mes
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handlePrevDay}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                      {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                    </h2>
                    <Button variant="outline" size="icon" onClick={handleNextDay}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map((event) => (
                      <Card key={event.id} className="card-hover">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {formatTime(event.startDate)} - {formatTime(event.endDate)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{event.description}</p>
                          {event.location && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Ubicación: {event.location}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No hay eventos para este día</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Añadir evento
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Próximos eventos */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos eventos</CardTitle>
              <CardDescription>Eventos en los próximos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-l-4 border-primary pl-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-r"
                    onClick={() => {
                      setSelectedDate(event.startDate);
                      setView("day");
                    }}
                  >
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver todos los eventos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 