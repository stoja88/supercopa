import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: {
    plan?: {
      id: string;
      name: string;
      price: number;
      features: string[];
    };
    status?: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' | 'UNPAID';
    currentPeriodEnd?: Date;
  } | null;
  isLoading: boolean;
  hasActiveSubscription: boolean;
  onManageSubscription?: () => void;
  onUpgrade?: () => void;
  className?: string;
}

export function SubscriptionCard({
  subscription,
  isLoading,
  hasActiveSubscription,
  onManageSubscription,
  onUpgrade,
  className
}: SubscriptionCardProps) {
  // Función para formatear fecha
  const formatDate = (date?: Date) => {
    if (!date) return 'No disponible';
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date instanceof Date ? date : new Date(date));
  };
  
  // Función para obtener el color del estado
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'CANCELED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'PAST_DUE':
      case 'UNPAID':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'TRIALING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };
  
  // Función para obtener el texto del estado
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Activa';
      case 'CANCELED':
        return 'Cancelada';
      case 'PAST_DUE':
        return 'Pago pendiente';
      case 'UNPAID':
        return 'No pagada';
      case 'TRIALING':
        return 'Periodo de prueba';
      default:
        return 'Desconocido';
    }
  };
  
  // Calcular días restantes
  const getDaysRemaining = (endDate?: Date) => {
    if (!endDate) return 0;
    const end = endDate instanceof Date ? endDate : new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysRemaining = subscription?.currentPeriodEnd 
    ? getDaysRemaining(subscription.currentPeriodEnd)
    : 0;
  
  const progressPercentage = subscription?.currentPeriodEnd 
    ? Math.max(0, Math.min(100, (30 - daysRemaining) / 30 * 100))
    : 0;
  
  return (
    <Card className={cn(
      "overflow-hidden",
      hasActiveSubscription ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800" : "",
      className
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" /> 
            Suscripción
          </CardTitle>
          {!isLoading && hasActiveSubscription && subscription?.status && (
            <Badge className={cn("ml-2", getStatusColor(subscription.status))}>
              {getStatusText(subscription.status)}
            </Badge>
          )}
        </div>
        <CardDescription>
          {isLoading ? 'Cargando información...' : hasActiveSubscription 
            ? `Tu suscripción se renovará el ${formatDate(subscription?.currentPeriodEnd)}`
            : 'No tienes una suscripción activa actualmente'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : hasActiveSubscription ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {subscription?.plan?.name || 'Plan Activo'}
                </h3>
                {subscription?.plan?.price && (
                  <p className="text-sm text-muted-foreground">
                    {subscription.plan.price.toFixed(2)}€/mes
                  </p>
                )}
              </div>
              {daysRemaining > 0 && (
                <div className="text-right">
                  <p className="text-sm font-medium">Tiempo restante</p>
                  <p className="text-2xl font-bold">{daysRemaining} días</p>
                </div>
              )}
            </div>
            
            {daysRemaining > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Ciclo de facturación</span>
                  <span>{progressPercentage.toFixed(0)}% completado</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
            
            {subscription?.plan?.features && subscription.plan.features.length > 0 && (
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Características incluidas:</p>
                <ul className="space-y-1">
                  {subscription.plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <h3 className="font-medium">Sin suscripción activa</h3>
                <p className="text-sm text-muted-foreground">
                  Actualiza a un plan premium para acceder a todas las funcionalidades.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        {hasActiveSubscription ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onManageSubscription}
          >
            Gestionar suscripción
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={onUpgrade}
          >
            Actualizar plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 