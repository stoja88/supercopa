import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Plus, Calendar, User } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: "alta" | "media" | "baja";
  assignedTo: string | null;
  completed: boolean;
  category: "escuela" | "salud" | "actividades" | "documentos" | "otros";
}

export function TasksList() {
  // En una implementación real, estos datos vendrían de la API
  const initialTasks: Task[] = [
    {
      id: "1",
      title: "Pagar matrícula escolar",
      description: "Realizar el pago de la matrícula para el próximo semestre",
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 días después
      priority: "alta",
      assignedTo: "Ana García",
      completed: false,
      category: "escuela",
    },
    {
      id: "2",
      title: "Programar revisión médica anual",
      description: "Llamar al pediatra para programar la revisión anual",
      dueDate: new Date(Date.now() + 86400000 * 7), // 7 días después
      priority: "media",
      assignedTo: "Carlos Rodríguez",
      completed: false,
      category: "salud",
    },
    {
      id: "3",
      title: "Renovar pasaporte",
      description: "Renovar el pasaporte antes del viaje familiar",
      dueDate: new Date(Date.now() + 86400000 * 14), // 14 días después
      priority: "alta",
      assignedTo: null,
      completed: false,
      category: "documentos",
    },
    {
      id: "4",
      title: "Inscripción en actividades de verano",
      description: "Inscribir a los niños en el campamento de verano",
      dueDate: new Date(Date.now() + 86400000 * 10), // 10 días después
      priority: "media",
      assignedTo: "Ana García",
      completed: true,
      category: "actividades",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Función para formatear la fecha de vencimiento
  const formatDueDate = (date: Date | null) => {
    if (!date) return "Sin fecha";
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Vencida";
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays < 7) return `En ${diffDays} días`;
    
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  // Función para obtener el color de la prioridad
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "alta":
        return "text-red-500 dark:text-red-400";
      case "media":
        return "text-amber-500 dark:text-amber-400";
      case "baja":
        return "text-green-500 dark:text-green-400";
    }
  };

  // Función para obtener el color de la categoría
  const getCategoryBadge = (category: Task["category"]) => {
    switch (category) {
      case "escuela":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "salud":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "actividades":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "documentos":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "otros":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Función para traducir la categoría
  const getCategoryName = (category: Task["category"]) => {
    switch (category) {
      case "escuela":
        return "Escuela";
      case "salud":
        return "Salud";
      case "actividades":
        return "Actividades";
      case "documentos":
        return "Documentos";
      case "otros":
        return "Otros";
    }
  };

  // Función para marcar una tarea como completada
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrar tareas pendientes y completadas
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Tareas pendientes</CardTitle>
            <CardDescription>
              {pendingTasks.length} tareas pendientes, {completedTasks.length} completadas
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-4 w-4 mr-2" />
            Nueva tarea
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No hay tareas pendientes</p>
            </div>
          ) : (
            pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5 mr-3 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{task.title}</p>
                    <Badge
                      variant="outline"
                      className={getCategoryBadge(task.category)}
                    >
                      {getCategoryName(task.category)}
                    </Badge>
                    <span
                      className={`text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    {task.dueDate && (
                      <div className="flex items-center mr-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDueDate(task.dueDate)}</span>
                      </div>
                    )}
                    {task.assignedTo && (
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{task.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {completedTasks.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Completadas recientemente
              </h4>
              {completedTasks.slice(0, 2).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-0.5 mr-3 flex-shrink-0"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-through text-muted-foreground">
                      {task.title}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Badge
                        variant="outline"
                        className={getCategoryBadge(task.category)}
                      >
                        {getCategoryName(task.category)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="link" className="ml-auto text-xs">
          Ver todas las tareas
        </Button>
      </CardFooter>
    </Card>
  );
} 