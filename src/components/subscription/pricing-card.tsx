"use client";

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/toast';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    stripePriceId: string;
    features: string[];
    includesLegalAssistant: boolean;
  };
  isCurrentPlan?: boolean;
  onSelectPlan: (planId: string, priceId: string) => Promise<void>;
}

export function PricingCard({ plan, isCurrentPlan = false, onSelectPlan }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async () => {
    try {
      setIsLoading(true);
      await onSelectPlan(plan.id, plan.stripePriceId);
    } catch (error) {
      console.error('Error al seleccionar el plan:', error);
      toast({
        title: 'Error',
        description: 'No se pudo procesar la suscripción. Inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col h-full ${isCurrentPlan ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription className="mt-1">{plan.description}</CardDescription>
          </div>
          {isCurrentPlan && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              Plan actual
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{plan.price.toFixed(2)}€</span>
          <span className="text-muted-foreground ml-1">/mes</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSelectPlan}
          disabled={isLoading || isCurrentPlan}
          className="w-full"
          variant={isCurrentPlan ? "outline" : "default"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : isCurrentPlan ? (
            'Tu plan actual'
          ) : (
            'Seleccionar plan'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 