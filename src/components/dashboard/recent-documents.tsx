import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Eye, FileIcon, PlusCircle } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description?: string;
  fileType: "pdf" | "doc" | "image" | "spreadsheet" | "other";
  uploadedBy: string;
  uploadedAt: Date;
  size: string;
  isNew: boolean;
  isShared: boolean;
  category?: "escolar" | "médico" | "legal" | "personal" | "otro";
}

export function RecentDocuments() {
  // En una implementación real, estos datos vendrían de la API
  const documents: Document[] = [
    {
      id: "1",
      title: "Informe escolar - Primer trimestre",
      description: "Calificaciones y comentarios del profesor",
      fileType: "pdf",
      uploadedBy: "Ana García",
      uploadedAt: new Date(Date.now() - 172800000), // 2 días atrás
      size: "2.4 MB",
      isNew: true,
      isShared: true,
      category: "escolar",
    },
    {
      id: "2",
      title: "Calendario de vacunas",
      description: "Próximas vacunas programadas",
      fileType: "pdf",
      uploadedBy: "Carlos Rodríguez",
      uploadedAt: new Date(Date.now() - 432000000), // 5 días atrás
      size: "1.2 MB",
      isNew: false,
      isShared: true,
      category: "médico",
    },
    {
      id: "3",
      title: "Acuerdo de custodia actualizado",
      description: "Documento legal firmado por ambas partes",
      fileType: "doc",
      uploadedBy: "María López",
      uploadedAt: new Date(Date.now() - 604800000), // 7 días atrás
      size: "3.5 MB",
      isNew: false,
      isShared: true,
      category: "legal",
    },
    {
      id: "4",
      title: "Fotos del cumpleaños",
      description: "Celebración del cumpleaños de Lucía",
      fileType: "image",
      uploadedBy: "Carlos Rodríguez",
      uploadedAt: new Date(Date.now() - 259200000), // 3 días atrás
      size: "15.8 MB",
      isNew: false,
      isShared: false,
      category: "personal",
    },
  ];

  // Función para formatear la fecha de subida
  const formatUploadDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  // Función para obtener el icono del tipo de archivo
  const getFileIcon = (fileType: Document["fileType"]) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "doc":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "image":
        return <FileIcon className="h-5 w-5 text-purple-500" />;
      case "spreadsheet":
        return <FileIcon className="h-5 w-5 text-green-500" />;
      case "other":
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Función para obtener el color de la categoría
  const getCategoryBadge = (category?: Document["category"]) => {
    if (!category) return "";
    
    switch (category) {
      case "escolar":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "médico":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "legal":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "otro":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Función para traducir la categoría
  const getCategoryName = (category?: Document["category"]) => {
    if (!category) return "";
    
    switch (category) {
      case "escolar":
        return "Escolar";
      case "médico":
        return "Médico";
      case "legal":
        return "Legal";
      case "personal":
        return "Personal";
      case "otro":
        return "Otro";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Documentos recientes</CardTitle>
            <CardDescription>
              Archivos compartidos entre los miembros de la familia
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" className="h-8">
            <Upload className="h-4 w-4 mr-2" />
            Subir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No hay documentos recientes</p>
              <Button variant="outline" className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Subir primer documento
              </Button>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="mr-3 mt-1 flex-shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{doc.title}</p>
                    {doc.isNew && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Nuevo
                      </Badge>
                    )}
                    {doc.category && (
                      <Badge
                        variant="outline"
                        className={getCategoryBadge(doc.category)}
                      >
                        {getCategoryName(doc.category)}
                      </Badge>
                    )}
                  </div>
                  {doc.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {doc.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>
                        Subido por {doc.uploadedBy} • {formatUploadDate(doc.uploadedAt)} • {doc.size}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="Ver documento">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Descargar">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="link" className="ml-auto text-xs">
          Ver todos los documentos
        </Button>
      </CardFooter>
    </Card>
  );
} 