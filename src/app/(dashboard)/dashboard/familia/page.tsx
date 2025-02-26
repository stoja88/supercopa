"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Users, 
  UserPlus, 
  Mail, 
  UserMinus,
  Check,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials, stringToColor } from "@/lib/utils";

// Tipos
type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

type FamilyMember = {
  id: string;
  userId: string;
  familyId: string;
  role: string;
  user: User;
};

type Family = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: FamilyMember[];
  _count: {
    events: number;
    expenses: number;
    documents: number;
    messages: number;
  };
};

export default function FamiliaPage() {
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showEditFamily, setShowEditFamily] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  
  // Estados para formularios
  const [newFamilyName, setNewFamilyName] = useState("");
  const [editFamilyName, setEditFamilyName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("PARENT");
  const [error, setError] = useState<string | null>(null);

  // Cargar familias al iniciar
  useEffect(() => {
    loadFamilies();
  }, []);

  // Función para cargar familias
  const loadFamilies = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families");
      
      if (!response.ok) {
        throw new Error("Error al cargar familias");
      }
      
      const data = await response.json();
      setFamilies(data);
      
      // Si hay familias y no hay una seleccionada, seleccionar la primera
      if (data.length > 0 && !selectedFamily) {
        setSelectedFamily(data[0]);
      }
    } catch (error) {
      console.error("Error al cargar familias:", error);
      setError("No se pudieron cargar las familias. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Crear una nueva familia
  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFamilyName,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear familia");
      }
      
      const newFamily = await response.json();
      
      // Actualizar la lista de familias
      setFamilies((prev) => [...prev, newFamily]);
      setSelectedFamily(newFamily);
      setNewFamilyName("");
      setShowAddFamily(false);
    } catch (error) {
      console.error("Error al crear familia:", error);
      setError("No se pudo crear la familia. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar una familia
  const handleUpdateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFamily) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedFamily.id,
          name: editFamilyName,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar familia");
      }
      
      const updatedFamily = await response.json();
      
      // Actualizar la lista de familias
      setFamilies((prev) =>
        prev.map((family) =>
          family.id === updatedFamily.id ? updatedFamily : family
        )
      );
      setSelectedFamily(updatedFamily);
      setShowEditFamily(false);
    } catch (error) {
      console.error("Error al actualizar familia:", error);
      setError("No se pudo actualizar la familia. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar una familia
  const handleDeleteFamily = async (familyId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta familia? Esta acción no se puede deshacer.")) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/families?id=${familyId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar familia");
      }
      
      // Actualizar la lista de familias
      const updatedFamilies = families.filter((family) => family.id !== familyId);
      setFamilies(updatedFamilies);
      
      // Si la familia eliminada era la seleccionada, seleccionar otra
      if (selectedFamily && selectedFamily.id === familyId) {
        setSelectedFamily(updatedFamilies.length > 0 ? updatedFamilies[0] : null);
      }
    } catch (error) {
      console.error("Error al eliminar familia:", error);
      setError("No se pudo eliminar la familia. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Añadir un miembro a la familia
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFamily) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/families/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: selectedFamily.id,
          email: newMemberEmail,
          role: newMemberRole,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al añadir miembro");
      }
      
      const newMember = await response.json();
      
      // Actualizar la familia seleccionada
      const updatedFamily = {
        ...selectedFamily,
        members: [...selectedFamily.members, newMember],
      };
      
      setSelectedFamily(updatedFamily);
      
      // Actualizar la lista de familias
      setFamilies((prev) =>
        prev.map((family) =>
          family.id === updatedFamily.id ? updatedFamily : family
        )
      );
      
      setNewMemberEmail("");
      setNewMemberRole("PARENT");
      setShowAddMember(false);
    } catch (error) {
      console.error("Error al añadir miembro:", error);
      setError("No se pudo añadir el miembro. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un miembro de la familia
  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este miembro de la familia?")) {
      return;
    }
    
    if (!selectedFamily) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/families/members?id=${memberId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar miembro");
      }
      
      // Actualizar la familia seleccionada
      const updatedFamily = {
        ...selectedFamily,
        members: selectedFamily.members.filter((member) => member.id !== memberId),
      };
      
      setSelectedFamily(updatedFamily);
      
      // Actualizar la lista de familias
      setFamilies((prev) =>
        prev.map((family) =>
          family.id === updatedFamily.id ? updatedFamily : family
        )
      );
    } catch (error) {
      console.error("Error al eliminar miembro:", error);
      setError("No se pudo eliminar el miembro. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar avatar de usuario
  const renderUserAvatar = (user: User) => {
    if (user.image) {
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={user.image} alt={user.name || "Usuario"} className="w-full h-full object-cover" />
        </div>
      );
    }
    
    const initials = getInitials(user.name || user.email);
    const bgColor = stringToColor(user.email);
    
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </div>
    );
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

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Familias</h1>
        <Button onClick={() => setShowAddFamily(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Familia
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Formulario para añadir familia */}
      {showAddFamily && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Crear Nueva Familia</CardTitle>
            <CardDescription>
              Crea una nueva familia para gestionar la co-parentalidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateFamily} className="space-y-4">
              <div className="form-group">
                <label htmlFor="familyName" className="form-label">
                  Nombre de la Familia
                </label>
                <Input
                  id="familyName"
                  value={newFamilyName}
                  onChange={(e) => setNewFamilyName(e.target.value)}
                  placeholder="Ej: Familia García"
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddFamily(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateFamily}
              disabled={isLoading || !newFamilyName.trim()}
            >
              {isLoading ? "Creando..." : "Crear Familia"}
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Lista de familias */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mis Familias</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && families.length === 0 ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : families.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No tienes familias</p>
                  <Button
                    variant="link"
                    onClick={() => setShowAddFamily(true)}
                    className="mt-2"
                  >
                    Crear una familia
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {families.map((family) => (
                    <div
                      key={family.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedFamily?.id === family.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedFamily(family)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{family.name}</p>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {family.members.length} miembros
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalles de la familia seleccionada */}
        <div className="md:col-span-3">
          {selectedFamily ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">{selectedFamily.name}</CardTitle>
                    <CardDescription>
                      {selectedFamily.members.length} miembros
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditFamilyName(selectedFamily.name);
                        setShowEditFamily(true);
                      }}
                      title="Editar familia"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteFamily(selectedFamily.id)}
                      title="Eliminar familia"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Eventos</span>
                      <span className="font-medium">{selectedFamily._count.events}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Gastos</span>
                      <span className="font-medium">{selectedFamily._count.expenses}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Documentos</span>
                      <span className="font-medium">{selectedFamily._count.documents}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Mensajes</span>
                      <span className="font-medium">{selectedFamily._count.messages}</span>
                    </div>
                  </div>

                  {/* Formulario para editar familia */}
                  {showEditFamily && (
                    <div className="border rounded-md p-4 mb-6">
                      <h3 className="text-lg font-medium mb-4">Editar Familia</h3>
                      <form onSubmit={handleUpdateFamily} className="space-y-4">
                        <div className="form-group">
                          <label htmlFor="editFamilyName" className="form-label">
                            Nombre de la Familia
                          </label>
                          <Input
                            id="editFamilyName"
                            value={editFamilyName}
                            onChange={(e) => setEditFamilyName(e.target.value)}
                            placeholder="Ej: Familia García"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowEditFamily(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            disabled={isLoading || !editFamilyName.trim()}
                          >
                            {isLoading ? "Guardando..." : "Guardar Cambios"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Miembros de la familia */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Miembros</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddMember(true)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" /> Añadir Miembro
                      </Button>
                    </div>

                    {/* Formulario para añadir miembro */}
                    {showAddMember && (
                      <div className="border rounded-md p-4 mb-4">
                        <h4 className="text-sm font-medium mb-3">Añadir Nuevo Miembro</h4>
                        <form onSubmit={handleAddMember} className="space-y-4">
                          <div className="form-group">
                            <label htmlFor="memberEmail" className="form-label">
                              Email del Usuario
                            </label>
                            <Input
                              id="memberEmail"
                              type="email"
                              value={newMemberEmail}
                              onChange={(e) => setNewMemberEmail(e.target.value)}
                              placeholder="email@ejemplo.com"
                              required
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              El usuario debe estar registrado en la plataforma
                            </p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="memberRole" className="form-label">
                              Rol en la Familia
                            </label>
                            <select
                              id="memberRole"
                              value={newMemberRole}
                              onChange={(e) => setNewMemberRole(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              required
                            >
                              <option value="PARENT">Padre/Madre</option>
                              <option value="LEGAL_GUARDIAN">Tutor Legal</option>
                              <option value="ADMIN">Administrador</option>
                            </select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowAddMember(false)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              disabled={isLoading || !newMemberEmail.trim()}
                            >
                              {isLoading ? "Añadiendo..." : "Añadir Miembro"}
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Lista de miembros */}
                    <div className="space-y-3">
                      {selectedFamily.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center space-x-3">
                            {renderUserAvatar(member.user)}
                            <div>
                              <p className="font-medium">
                                {member.user.name || "Usuario"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {member.user.email}
                              </p>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {getRoleInSpanish(member.role)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Enviar mensaje"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            {/* No mostrar el botón de eliminar para el usuario actual */}
                            {member.user.id !== session?.user.id && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveMember(member.id)}
                                title="Eliminar miembro"
                              >
                                <UserMinus className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Selecciona una familia
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  Selecciona una familia para ver sus detalles o crea una nueva para comenzar a gestionar la co-parentalidad.
                </p>
                <Button onClick={() => setShowAddFamily(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Crear Nueva Familia
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 