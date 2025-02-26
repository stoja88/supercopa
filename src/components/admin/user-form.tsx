"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

// Definir una interfaz que coincida con la estructura del modelo User de Prisma
interface UserFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    // Estos campos son opcionales en el formulario
    createdAt?: Date;
    emailVerified?: Date | null;
    password?: string | null;
    updatedAt?: Date;
  };
  onSave: (id: string, data: Partial<UserFormProps['user']>) => Promise<void>;
  onCancel: () => void;
  isCreating?: boolean;
}

export function UserForm({ user, onSave, onCancel, isCreating = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "PARENT",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Si no estamos creando un nuevo usuario y el campo de contraseña está vacío,
      // no lo incluimos en los datos a enviar
      const dataToSave = isCreating || formData.password
        ? formData
        : { name: formData.name, email: formData.email, role: formData.role };
      
      await onSave(user.id, dataToSave);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      {(isCreating || formData.password) && (
        <div className="space-y-2">
          <Label htmlFor="password">
            {isCreating ? "Contraseña" : "Nueva contraseña"}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={isCreating}
            placeholder={isCreating ? "Contraseña para el nuevo usuario" : "Dejar en blanco para mantener la actual"}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="PARENT">Padre/Madre</option>
          <option value="ADMIN">Administrador</option>
        </Select>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
} 