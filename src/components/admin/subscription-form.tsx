"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { X, Plus } from "lucide-react";

interface Subscription {
  id?: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  isActive: boolean;
}

interface SubscriptionFormProps {
  subscription: Subscription;
  onSave: (subscription: Subscription) => void;
  onCancel: () => void;
  isCreating?: boolean;
}

export function SubscriptionForm({ subscription, onSave, onCancel, isCreating = false }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<Subscription>(subscription || {
    name: "",
    description: "",
    price: 0,
    interval: "monthly",
    features: [],
    isActive: true
  });

  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "price") {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, interval: value as "monthly" | "yearly" }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validación básica
      if (!formData.name || !formData.description || formData.price <= 0) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos requeridos y asegúrate de que el precio sea mayor que cero",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      onSave(formData);
    } catch (error) {
      console.error("Error al guardar plan de suscripción:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el plan de suscripción",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del plan</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Plan Básico"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción detallada del plan"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interval">Intervalo de facturación</Label>
          <Select 
            value={formData.interval} 
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar intervalo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Características</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Añadir característica"
          />
          <Button 
            type="button" 
            onClick={handleAddFeature}
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFeature(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {formData.features.length === 0 && (
            <p className="text-sm text-gray-500 italic">No hay características añadidas</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
        />
        <Label htmlFor="isActive">Plan activo</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Guardando...
            </>
          ) : (
            isCreating ? "Crear Plan" : "Actualizar Plan"
          )}
        </Button>
      </div>
    </form>
  );
} 