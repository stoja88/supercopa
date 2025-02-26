"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { 
  BookOpen, 
  Search, 
  Heart, 
  Share2, 
  ExternalLink, 
  BookMarked,
  Users,
  Calendar,
  MessageSquare,
  Brain,
  Lightbulb,
  Bookmark,
  CircleDollarSign
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Datos de recursos
const resources = [
  {
    id: "1",
    title: "Comunicación efectiva en la co-parentalidad",
    description: "Aprende técnicas para mantener una comunicación clara y respetuosa con tu co-padre/madre.",
    category: "Comunicación",
    image: "/images/communication.jpg",
    url: "#",
    premium: false,
  },
  {
    id: "2",
    title: "Creando rutinas estables para los niños",
    description: "Guía para establecer rutinas consistentes en ambos hogares que proporcionen estabilidad a los niños.",
    category: "Crianza",
    image: "/images/routines.jpg",
    url: "#",
    premium: false,
  },
  {
    id: "3",
    title: "Manejo de conflictos en la co-parentalidad",
    description: "Estrategias para resolver desacuerdos de manera constructiva y evitar que afecten a los niños.",
    category: "Resolución de conflictos",
    image: "/images/conflict.jpg",
    url: "#",
    premium: true,
  },
  {
    id: "4",
    title: "Transiciones suaves entre hogares",
    description: "Consejos para hacer que los cambios entre casas sean menos estresantes para los niños.",
    category: "Bienestar infantil",
    image: "/images/transitions.jpg",
    url: "#",
    premium: false,
  },
  {
    id: "5",
    title: "Coordinación de calendarios y eventos",
    description: "Herramientas y métodos para coordinar eficazmente horarios, actividades y eventos importantes.",
    category: "Organización",
    image: "/images/calendar.jpg",
    url: "#",
    premium: false,
  },
  {
    id: "6",
    title: "Apoyo emocional para niños de padres separados",
    description: "Cómo ayudar a los niños a procesar sus emociones y adaptarse a la nueva situación familiar.",
    category: "Bienestar infantil",
    image: "/images/emotional.jpg",
    url: "#",
    premium: true,
  },
  {
    id: "7",
    title: "Aspectos legales de la co-parentalidad",
    description: "Información sobre derechos, responsabilidades y aspectos legales de la crianza compartida.",
    category: "Legal",
    image: "/images/legal.jpg",
    url: "#",
    premium: false,
  },
  {
    id: "8",
    title: "Gestión financiera en la co-parentalidad",
    description: "Consejos para manejar gastos compartidos, presupuestos y planificación financiera.",
    category: "Finanzas",
    image: "/images/finances.jpg",
    url: "#",
    premium: true,
  },
];

// Categorías para filtrar
const categories = [
  "Todas",
  "Comunicación",
  "Crianza",
  "Resolución de conflictos",
  "Bienestar infantil",
  "Organización",
  "Legal",
  "Finanzas",
];

// Recursos destacados
const featuredResources = [
  {
    title: "Guía completa de co-parentalidad",
    description: "Manual paso a paso para una co-parentalidad exitosa",
    icon: <BookMarked className="h-10 w-10 text-primary" />,
    url: "#",
  },
  {
    title: "Webinars mensuales",
    description: "Sesiones en vivo con expertos en co-parentalidad",
    icon: <Users className="h-10 w-10 text-primary" />,
    url: "#",
  },
  {
    title: "Plantillas de acuerdos",
    description: "Documentos personalizables para acuerdos de co-parentalidad",
    icon: <Calendar className="h-10 w-10 text-primary" />,
    url: "#",
  },
];

export default function RecursosPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [savedResources, setSavedResources] = useState<string[]>([]);

  // Filtrar recursos
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Guardar/quitar recurso
  const toggleSaveResource = (resourceId: string) => {
    if (savedResources.includes(resourceId)) {
      setSavedResources(savedResources.filter(id => id !== resourceId));
    } else {
      setSavedResources([...savedResources, resourceId]);
    }
  };

  // Renderizar tarjeta de recurso
  const renderResourceCard = (resource: typeof resources[0]) => (
    <Card key={resource.id} className="overflow-hidden card-hover">
      <div className="relative h-48 bg-muted">
        {/* Aquí iría la imagen, pero usamos un placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
          {resource.category === "Comunicación" && <MessageSquare className="h-12 w-12 text-primary/40" />}
          {resource.category === "Crianza" && <Users className="h-12 w-12 text-primary/40" />}
          {resource.category === "Resolución de conflictos" && <Brain className="h-12 w-12 text-primary/40" />}
          {resource.category === "Bienestar infantil" && <Heart className="h-12 w-12 text-primary/40" />}
          {resource.category === "Organización" && <Calendar className="h-12 w-12 text-primary/40" />}
          {resource.category === "Legal" && <BookMarked className="h-12 w-12 text-primary/40" />}
          {resource.category === "Finanzas" && <CircleDollarSign className="h-12 w-12 text-primary/40" />}
        </div>
        {resource.premium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Premium
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="text-xs">{resource.category}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSaveResource(resource.id)}
            title={savedResources.includes(resource.id) ? "Quitar de guardados" : "Guardar recurso"}
          >
            <Bookmark 
              className={`h-5 w-5 ${savedResources.includes(resource.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} 
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{resource.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={resource.url}>
            <ExternalLink className="mr-2 h-4 w-4" /> Ver recurso
          </Link>
        </Button>
        <Button variant="ghost" size="icon" title="Compartir">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6" /> Recursos Educativos
          </h1>
          <p className="text-muted-foreground">
            Artículos, guías y herramientas para una co-parentalidad efectiva
          </p>
        </div>
      </div>

      {/* Recursos destacados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recursos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {resource.icon}
                  <h3 className="text-lg font-medium mt-4">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{resource.description}</p>
                  <Button className="mt-4" asChild>
                    <Link href={resource.url}>
                      Acceder
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar recursos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de recursos */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(renderResourceCard)}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No se encontraron recursos</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Intenta con otros términos de búsqueda o selecciona otra categoría
          </p>
        </div>
      )}

      {/* Sección de recursos guardados */}
      {savedResources.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Bookmark className="mr-2 h-5 w-5" /> Recursos guardados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter(resource => savedResources.includes(resource.id))
              .map(renderResourceCard)}
          </div>
        </div>
      )}
    </div>
  );
} 