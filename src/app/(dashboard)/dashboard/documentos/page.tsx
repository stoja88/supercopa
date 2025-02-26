"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  File, 
  FileImage, 
  FileSpreadsheet, 
  FileArchive 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tipos
type Document = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  category: string;
  uploaderId: string;
  familyId: string;
  createdAt: string;
  uploader: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

// Datos de ejemplo para familias
const mockFamilies = [
  {
    id: "1",
    name: "Familia García",
  },
  {
    id: "2",
    name: "Familia Martínez",
  },
];

// Categorías de documentos
const documentCategories = [
  { value: "LEGAL", label: "Legal" },
  { value: "MEDICAL", label: "Médico" },
  { value: "EDUCATIONAL", label: "Educativo" },
  { value: "FINANCIAL", label: "Financiero" },
  { value: "OTHER", label: "Otro" },
];

export default function DocumentosPage() {
  const { data: session } = useSession();
  const [selectedFamily, setSelectedFamily] = useState(mockFamilies[0]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar documentos
  useEffect(() => {
    if (session && selectedFamily) {
      loadDocuments();
    }
  }, [session, selectedFamily, selectedCategory]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      let url = `/api/documents?familyId=${selectedFamily.id}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Error al cargar documentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar documentos por búsqueda
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Manejar subida de archivos
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !session) return;

    setIsUploading(true);
    const file = files[0];

    try {
      // Subir archivo
      const formData = new FormData();
      formData.append("file", file);
      formData.append("familyId", selectedFamily.id);
      formData.append("folder", "documents");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Error al subir archivo");
      }

      const uploadData = await uploadRes.json();

      // Crear documento en la base de datos
      const title = prompt("Título del documento:", file.name) || file.name;
      const description = prompt("Descripción (opcional):");
      const category = prompt("Categoría (LEGAL, MEDICAL, EDUCATIONAL, FINANCIAL, OTHER):", "OTHER");

      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          fileUrl: uploadData.url,
          fileType: uploadData.fileType,
          familyId: selectedFamily.id,
          category: category || "OTHER",
        }),
      });

      if (!docRes.ok) {
        throw new Error("Error al crear documento");
      }

      // Recargar documentos
      loadDocuments();
    } catch (error) {
      console.error("Error al subir documento:", error);
      alert("Error al subir documento. Por favor, inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
      // Limpiar input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Eliminar documento
  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este documento?")) {
      return;
    }

    try {
      const res = await fetch(`/api/documents?id=${documentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar documento");
      }

      // Actualizar lista
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      alert("Error al eliminar documento. Por favor, inténtalo de nuevo.");
    }
  };

  // Obtener icono según tipo de archivo
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) {
      return <FileImage className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes("spreadsheet") || fileType.includes("excel") || fileType.includes("csv")) {
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    } else if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("tar")) {
      return <FileArchive className="h-8 w-8 text-yellow-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Documentos</h1>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="*/*"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Subiendo..." : "Subir documento"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Familias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFamilies.map((family) => (
                  <div
                    key={family.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedFamily.id === family.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedFamily(family)}
                  >
                    <p className="font-medium">{family.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedCategory === null
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <p className="font-medium">Todas</p>
                </div>
                {documentCategories.map((category) => (
                  <div
                    key={category.value}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedCategory === category.value
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <p className="font-medium">{category.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentos */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-lg">
                  {selectedCategory 
                    ? `Documentos - ${documentCategories.find(c => c.value === selectedCategory)?.label}` 
                    : "Todos los documentos"}
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar documentos..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No hay documentos</p>
                  <p className="text-sm max-w-md">
                    {searchTerm 
                      ? "No se encontraron documentos con ese término de búsqueda" 
                      : "Sube tu primer documento para comenzar a organizar tus archivos importantes"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          {getFileIcon(doc.fileType)}
                          <div className="ml-3">
                            <h3 className="font-medium truncate" title={doc.title}>
                              {doc.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(new Date(doc.createdAt))}
                            </p>
                          </div>
                        </div>
                        {doc.description && (
                          <p className="text-sm mb-4 line-clamp-2">{doc.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {documentCategories.find(c => c.value === doc.category)?.label || doc.category}
                          </span>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              title="Descargar"
                              onClick={() => window.open(doc.fileUrl, "_blank")}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              title="Eliminar"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 