"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingCard } from '@/components/subscription/pricing-card';
import { toast } from '@/components/ui/toast';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: string[];
  includesLegalAssistant: boolean;
}

interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: string;
  currentPeriodEnd: Date;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: Date;
  updatedAt: Date;
  plan: Plan;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/subscription');
        
        if (!response.ok) {
          throw new Error('Error al cargar los datos de suscripción');
        }
        
        const data = await response.json();
        setPlans(data.plans);
        setSubscription(data.subscription);
        setHasActiveSubscription(data.hasActiveSubscription);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los planes de suscripción. Inténtalo de nuevo más tarde.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handleSelectPlan = async (planId: string, priceId: string) => {
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, priceId }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la suscripción');
      }

      const data = await response.json();
      
      // Redirigir al usuario a la página de checkout de Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'No se pudo procesar la suscripción. Inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/subscription', {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Error al gestionar la suscripción');
      }

      const data = await response.json();
      
      // Redirigir al usuario al portal de facturación de Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'No se pudo acceder al portal de gestión de suscripciones. Inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando planes de suscripción...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Planes de suscripción</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Elige el plan que mejor se adapte a las necesidades de tu familia para gestionar la coparentalidad de manera efectiva.
        </p>
        
        {hasActiveSubscription && (
          <div className="mt-6">
            <Button onClick={handleManageSubscription} variant="outline" className="mx-auto">
              Gestionar suscripción actual
            </Button>
          </div>
        )}
      </div>

      {subscription && (
        <div className="bg-muted p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-medium">Tu suscripción actual</h3>
              <p className="text-muted-foreground">
                {subscription.status === 'ACTIVE' 
                  ? `Activa hasta el ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                  : `Estado: ${subscription.status}`}
              </p>
            </div>
            <Button onClick={handleManageSubscription} variant="outline">
              Gestionar suscripción
            </Button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={subscription?.planId === plan.id && hasActiveSubscription}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
    </div>
  );
} 