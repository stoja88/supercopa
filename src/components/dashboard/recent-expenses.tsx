import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, Calendar, User, Check, X, Clock } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  date: Date;
  paidBy: string;
  status: "pendiente" | "aprobado" | "rechazado";
  category: "educación" | "salud" | "ropa" | "actividades" | "otros";
  sharedPercentage: number;
}

export function RecentExpenses() {
  // En una implementación real, estos datos vendrían de la API
  const expenses: Expense[] = [
    {
      id: "1",
      title: "Material escolar",
      description: "Libros y cuadernos para el nuevo curso",
      amount: 85.50,
      currency: "EUR",
      date: new Date(Date.now() - 259200000), // 3 días atrás
      paidBy: "Carlos Rodríguez",
      status: "pendiente",
      category: "educación",
      sharedPercentage: 50,
    },
    {
      id: "2",
      title: "Clases de natación",
      description: "Inscripción trimestral",
      amount: 120.00,
      currency: "EUR",
      date: new Date(Date.now() - 604800000), // 7 días atrás
      paidBy: "Ana García",
      status: "aprobado",
      category: "actividades",
      sharedPercentage: 50,
    },
    {
      id: "3",
      title: "Consulta pediatra",
      description: "Revisión anual",
      amount: 60.00,
      currency: "EUR",
      date: new Date(Date.now() - 432000000), // 5 días atrás
      paidBy: "Ana García",
      status: "aprobado",
      category: "salud",
      sharedPercentage: 50,
    },
    {
      id: "4",
      title: "Ropa de invierno",
      description: "Abrigos y botas",
      amount: 145.75,
      currency: "EUR",
      date: new Date(Date.now() - 691200000), // 8 días atrás
      paidBy: "Carlos Rodríguez",
      status: "rechazado",
      category: "ropa",
      sharedPercentage: 50,
    },
  ];

  // Función para formatear la fecha del gasto
  const formatExpenseDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.round(diffMs / 86400000);

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  // Función para formatear el importe
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Función para obtener el color del estado
  const getStatusBadge = (status: Expense["status"]) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "aprobado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rechazado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  // Función para traducir el estado
  const getStatusName = (status: Expense["status"]) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "aprobado":
        return "Aprobado";
      case "rechazado":
        return "Rechazado";
    }
  };

  // Función para obtener el icono del estado
  const getStatusIcon = (status: Expense["status"]) => {
    switch (status) {
      case "pendiente":
        return <Clock className="h-4 w-4" />;
      case "aprobado":
        return <Check className="h-4 w-4" />;
      case "rechazado":
        return <X className="h-4 w-4" />;
    }
  };

  // Función para obtener el color de la categoría
  const getCategoryBadge = (category: Expense["category"]) => {
    switch (category) {
      case "educación":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "salud":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "ropa":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "actividades":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "otros":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Función para traducir la categoría
  const getCategoryName = (category: Expense["category"]) => {
    switch (category) {
      case "educación":
        return "Educación";
      case "salud":
        return "Salud";
      case "ropa":
        return "Ropa";
      case "actividades":
        return "Actividades";
      case "otros":
        return "Otros";
    }
  };

  // Calcular el importe total y pendiente
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = expenses
    .filter(expense => expense.status === "pendiente")
    .reduce((sum, expense) => sum + (expense.amount * expense.sharedPercentage / 100), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Gastos recientes</CardTitle>
            <CardDescription>
              Total: {formatAmount(totalAmount, "EUR")} • Pendiente: {formatAmount(pendingAmount, "EUR")}
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo gasto
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No hay gastos recientes</p>
            </div>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="mr-3 mt-1 flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{expense.title}</p>
                    <Badge
                      variant="outline"
                      className={getStatusBadge(expense.status)}
                    >
                      <span className="flex items-center">
                        {getStatusIcon(expense.status)}
                        <span className="ml-1">{getStatusName(expense.status)}</span>
                      </span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getCategoryBadge(expense.category)}
                    >
                      {getCategoryName(expense.category)}
                    </Badge>
                  </div>
                  {expense.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {expense.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatExpenseDate(expense.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>Pagado por {expense.paidBy}</span>
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatAmount(expense.amount, expense.currency)}
                    </div>
                  </div>
                  {expense.status === "pendiente" && (
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Aprobar
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <X className="h-3 w-3 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="link" className="ml-auto text-xs">
          Ver todos los gastos
        </Button>
      </CardFooter>
    </Card>
  );
} 