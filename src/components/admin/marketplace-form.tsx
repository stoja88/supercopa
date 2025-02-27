"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  featured: boolean;
}

interface MarketplaceFormProps {
  item: MarketplaceItem;
  onSave: (id: string, data: any) => void;
  onCancel: () => void;
  isCreating?: boolean;
}

const categoryOptions = [
  { value: "legal", label: "Servicios Legales" },
  { value: "mediation", label: "Mediación" },
  { value: "coaching", label: "Coaching Familiar" },
  { value: "therapy", label: "Terapia" },
  { value: "education", label: "Educación" },
  { value: "other", label: "Otros Servicios" }
];

export function MarketplaceForm({ item, onSave, onCancel, isCreating = false }: MarketplaceFormProps) {
  const [formData, setFormData] = useState<MarketplaceItem>({
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    price: item.price || 0,
    category: item.category || "legal",
    image: item.image || null,
    featured: item.featured || false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al cambiar el valor
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor que 0";
    }
    
    if (!formData.category) {
      newErrors.category = "La categoría es obligatoria";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Enviar datos
    onSave(formData.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título del producto o servicio"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción detallada"
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      
      <div>
        <Label htmlFor="price">Precio (€)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          className={errors.price ? "border-red-500" : ""}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      
      <div>
        <Label htmlFor="category">Categoría</Label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full rounded-md border p-2 ${errors.category ? "border-red-500" : "border-gray-300"}`}
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
      
      <div>
        <Label htmlFor="image">URL de la imagen</Label>
        <Input
          id="image"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <p className="text-xs text-gray-500 mt-1">Deja vacío para usar una imagen predeterminada</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="featured" 
          checked={formData.featured} 
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="featured">Destacado</Label>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isCreating ? "Crear" : "Actualizar"}
        </Button>
      </div>
    </form>
  );
} 