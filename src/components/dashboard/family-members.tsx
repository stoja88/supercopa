import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Phone } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string | null;
  isOnline: boolean;
  lastActive: Date;
}

export function FamilyMembers() {
  // En una implementación real, estos datos vendrían de la API
  const members: FamilyMember[] = [
    {
      id: "1",
      name: "Ana García",
      role: "Madre",
      email: "ana.garcia@ejemplo.com",
      phone: "+34 612 345 678",
      image: null,
      isOnline: true,
      lastActive: new Date(),
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      role: "Padre",
      email: "carlos.rodriguez@ejemplo.com",
      phone: "+34 623 456 789",
      image: null,
      isOnline: false,
      lastActive: new Date(Date.now() - 3600000 * 2), // 2 horas atrás
    },
    {
      id: "3",
      name: "María López",
      role: "Abuela materna",
      email: "maria.lopez@ejemplo.com",
      phone: "+34 634 567 890",
      image: null,
      isOnline: false,
      lastActive: new Date(Date.now() - 86400000), // 1 día atrás
    },
  ];

  // Función para formatear la última actividad
  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    return `Hace ${diffDays} días`;
  };

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Miembros de la familia</CardTitle>
            <CardDescription>
              Personas con acceso a la información familiar
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" className="h-8">
            <UserPlus className="h-4 w-4 mr-2" />
            Invitar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 bg-primary text-primary-foreground">
                  <span>{getInitials(member.name)}</span>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{member.name}</p>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${member.isOnline ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                    >
                      {member.isOnline ? "En línea" : "Desconectado"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {!member.isOnline && (
                    <p className="text-xs text-muted-foreground">
                      Última actividad: {formatLastActive(member.lastActive)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" title="Enviar email">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" title="Llamar">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <p>
          Los miembros de la familia pueden ver y editar la información compartida según sus permisos.
        </p>
      </CardFooter>
    </Card>
  );
} 