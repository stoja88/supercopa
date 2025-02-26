"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscriptionSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Podríamos verificar el estado de la suscripción aquí si es necesario
  }, []);

  return (
    <div className="container py-12 max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">¡Suscripción completada!</CardTitle>
          <CardDescription>
            Tu suscripción ha sido procesada correctamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Gracias por suscribirte a nuestra plataforma. Ahora tienes acceso a todas las funcionalidades
            incluidas en tu plan.
          </p>
          <p>
            Puedes gestionar tu suscripción en cualquier momento desde la sección de suscripciones
            en tu panel de control.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Ir al panel de control
          </Button>
          <Button 
            onClick={() => router.push('/dashboard/subscription')}
            variant="outline"
            className="w-full"
          >
            Ver detalles de suscripción
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 