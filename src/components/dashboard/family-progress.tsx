import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, Users, Calendar, MessageSquare, FileText } from "lucide-react";

interface ProgressItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export function FamilyProgress() {
  // En una implementación real, estos datos vendrían de la API
  const progressItems: ProgressItem[] = [
    {
      label: "Comunicación",
      value: 85,
      icon: <MessageSquare className="h-4 w-4" />,
      color: "bg-blue-500",
    },
    {
      label: "Planificación",
      value: 70,
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-green-500",
    },
    {
      label: "Documentación",
      value: 60,
      icon: <FileText className="h-4 w-4" />,
      color: "bg-amber-500",
    },
    {
      label: "Colaboración",
      value: 75,
      icon: <Users className="h-4 w-4" />,
      color: "bg-purple-500",
    },
  ];

  // Calcular el progreso general
  const overallProgress = Math.round(
    progressItems.reduce((sum, item) => sum + item.value, 0) / progressItems.length
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Progreso familiar</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <TrendingUp className="h-3 w-3 mr-1" /> +12% este mes
          </Badge>
        </div>
        <CardDescription>
          Seguimiento de la colaboración en co-parentalidad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Progreso general</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Nivel</p>
            <p className="font-medium">
              {overallProgress >= 80 ? "Excelente" : 
               overallProgress >= 60 ? "Bueno" : 
               overallProgress >= 40 ? "Regular" : "Necesita mejorar"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {progressItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className={`p-1 rounded-full ${item.color} text-white mr-2`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
          <p>
            Basado en la actividad de los últimos 30 días. Mejora tu puntuación completando tareas pendientes y manteniendo una comunicación regular.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 