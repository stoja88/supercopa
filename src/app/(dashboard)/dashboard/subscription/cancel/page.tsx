"use client";

import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscriptionCancelPage() {
  const router = useRouter();

  return (
    <div className="container py-12 max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Suscripción cancelada</CardTitle>
          <CardDescription>
            Has cancelado el proceso de suscripción.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            No te preocupes, no se ha realizado ningún cargo a tu cuenta.
          </p>
          <p>
            Si has cancelado por error o tienes alguna pregunta sobre nuestros planes,
            puedes volver a la página de suscripciones en cualquier momento.
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
            Ver planes de suscripción
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 