"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Check, X, Mail, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Tipos
type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

type Family = {
  id: string;
  name: string;
};

type Invitation = {
  id: string;
  familyId: string;
  email: string;
  role: string;
  status: string;
  invitedById: string;
  expiresAt: string | null;
  createdAt: string;
  family: Family;
  invitedBy: User;
};

export default function InvitacionesPage() {
  const { data: session } = useSession();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar invitaciones al iniciar
  useEffect(() => {
    loadInvitations();
  }, []);

  // Función para cargar invitaciones
  const loadInvitations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families/invitations");
      
      if (!response.ok) {
        throw new Error("Error al cargar invitaciones");
      }
      
      const data = await response.json();
      setInvitations(data);
    } catch (error) {
      console.error("Error al cargar invitaciones:", error);
      setError("No se pudieron cargar las invitaciones. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Aceptar invitación
  const handleAcceptInvitation = async (invitationId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families/invitations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId,
          action: "ACCEPT",
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al aceptar invitación");
      }
      
      // Actualizar la lista de invitaciones
      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
      
      // Recargar la página para mostrar la nueva familia
      window.location.href = "/dashboard/familia";
    } catch (error) {
      console.error("Error al aceptar invitación:", error);
      setError("No se pudo aceptar la invitación. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Rechazar invitación
  const handleRejectInvitation = async (invitationId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families/invitations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId,
          action: "REJECT",
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al rechazar invitación");
      }
      
      // Actualizar la lista de invitaciones
      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
    } catch (error) {
      console.error("Error al rechazar invitación:", error);
      setError("No se pudo rechazar la invitación. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener el rol en español
  const getRoleInSpanish = (role: string) => {
    switch (role) {
      case "PARENT":
        return "Padre/Madre";
      case "LEGAL_GUARDIAN":
        return "Tutor Legal";
      case "ADMIN":
        return "Administrador";
      default:
        return role;
    }
  };

  // Calcular días restantes para expiración
  const getDaysRemaining = (expiresAt: string | null) => {
    if (!expiresAt) return null;
    
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invitaciones Pendientes</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : invitations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">
              No tienes invitaciones pendientes
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Cuando alguien te invite a unirte a una familia, las invitaciones aparecerán aquí.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>Invitación a {invitation.family.name}</CardTitle>
                <CardDescription>
                  {invitation.invitedBy.name || invitation.invitedBy.email} te ha invitado a unirte como {getRoleInSpanish(invitation.role)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Invitación recibida el {formatDate(invitation.createdAt)}
                    </p>
                    {invitation.expiresAt && (
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-amber-500" />
                        <span>
                          {getDaysRemaining(invitation.expiresAt) === 0
                            ? "La invitación expira hoy"
                            : `Expira en ${getDaysRemaining(invitation.expiresAt)} días`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-900/20"
                      onClick={() => handleRejectInvitation(invitation.id)}
                      disabled={isLoading}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      disabled={isLoading}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Aceptar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 