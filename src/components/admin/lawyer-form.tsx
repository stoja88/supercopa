"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface Lawyer {
  id?: string;
  userId?: string;
  specialties: string[];
  bio: string;
  isVerified: boolean;
  rating?: number;
  education: string;
  experience: string;
  languages: string[];
  areas: string[];
  availability: string;
  location: string;
  website?: string;
  services?: any[];
}

interface LawyerFormProps {
  lawyer: Lawyer;
  onSave: (lawyer: Lawyer) => void;
  onCancel: () => void;
  isCreating?: boolean;
}

export function LawyerForm({ lawyer, onSave, onCancel, isCreating = false }: LawyerFormProps) {
  const [formData, setFormData] = useState<Lawyer>(lawyer || {
    specialties: [],
    bio: "",
    isVerified: false,
    education: "",
    experience: "",
    languages: [],
    areas: [],
    availability: "",
    location: "",
    website: "",
    services: []
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    const values = value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleCheckboxChange = (checked: boolean, field: string) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validación básica
      if (!formData.bio || !formData.education || !formData.experience || !formData.location) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos requeridos",
          variant: "destructive"
        });
        return;
      }

      onSave(formData);
    } catch (error) {
      console.error("Error al guardar abogado:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la información del abogado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio">Biografía</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Biografía profesional"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialties">Especialidades</Label>
          <Input
            id="specialties"
            name="specialties"
            value={formData.specialties.join(', ')}
            onChange={(e) => handleArrayChange(e, 'specialties')}
            placeholder="Derecho familiar, Mediación, etc. (separados por comas)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Educación</Label>
          <Input
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Formación académica"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience">Experiencia</Label>
          <Input
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Años de experiencia y detalles"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Idiomas</Label>
          <Input
            id="languages"
            name="languages"
            value={formData.languages.join(', ')}
            onChange={(e) => handleArrayChange(e, 'languages')}
            placeholder="Español, Inglés, etc. (separados por comas)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="areas">Áreas de práctica</Label>
          <Input
            id="areas"
            name="areas"
            value={formData.areas.join(', ')}
            onChange={(e) => handleArrayChange(e, 'areas')}
            placeholder="Divorcio, Custodia, etc. (separados por comas)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Disponibilidad</Label>
          <Input
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Lunes a Viernes, 9:00 - 18:00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ciudad, Provincia"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Sitio web</Label>
          <Input
            id="website"
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder="https://ejemplo.com"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isVerified"
          checked={formData.isVerified}
          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'isVerified')}
        />
        <Label htmlFor="isVerified">Verificado</Label>
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
            isCreating ? "Crear Abogado" : "Actualizar Abogado"
          )}
        </Button>
      </div>
    </form>
  );
} 