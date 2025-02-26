"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Filter, Calendar, Trash2, Receipt, Download } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

// Tipo para los gastos
type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  description: string | null;
  receipt: string | null;
  category: string;
  createdById: string;
  familyId: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

// Categorías de gastos
const expenseCategories = [
  { value: "EDUCATION", label: "Educación" },
  { value: "HEALTH", label: "Salud" },
  { value: "CLOTHING", label: "Ropa" },
  { value: "FOOD", label: "Alimentación" },
  { value: "ENTERTAINMENT", label: "Entretenimiento" },
  { value: "TRANSPORTATION", label: "Transporte" },
  { value: "OTHER", label: "Otros" },
];

export default function GastosPage() {
  const { data: session } = useSession();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Estado para el formulario de nuevo gasto
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    category: "OTHER",
    receipt: null as File | null,
  });
  
  // Estado para filtros
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  // ID de familia (en una aplicación real, esto vendría de la selección del usuario o del contexto)
  const familyId = "family-1"; // Ejemplo, en producción esto vendría de la base de datos

  // Cargar gastos al iniciar
  useEffect(() => {
    loadExpenses();
  }, []);

  // Función para cargar gastos
  const loadExpenses = async (filterParams = {}) => {
    setIsLoading(true);
    try {
      // Construir URL con parámetros de filtro
      let url = `/api/expenses?familyId=${familyId}`;
      
      if (filters.category) {
        url += `&category=${filters.category}`;
      }
      
      if (filters.startDate) {
        url += `&startDate=${filters.startDate}`;
      }
      
      if (filters.endDate) {
        url += `&endDate=${filters.endDate}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Error al cargar gastos");
      }
      
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error al cargar gastos:", error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en el archivo de recibo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewExpense((prev) => ({ ...prev, receipt: e.target.files![0] }));
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Aplicar filtros
  const applyFilters = () => {
    loadExpenses(filters);
    setShowFilters(false);
  };

  // Resetear filtros
  const resetFilters = () => {
    setFilters({
      category: "",
      startDate: "",
      endDate: "",
    });
    loadExpenses();
    setShowFilters(false);
  };

  // Enviar formulario de nuevo gasto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Si hay un recibo, primero subir el archivo
      let receiptUrl = null;
      if (newExpense.receipt) {
        const formData = new FormData();
        formData.append("file", newExpense.receipt);
        formData.append("familyId", familyId);
        formData.append("folder", "receipts");
        
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error("Error al subir el recibo");
        }
        
        const uploadData = await uploadResponse.json();
        receiptUrl = uploadData.url;
      }
      
      // Crear el gasto
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newExpense.title,
          amount: parseFloat(newExpense.amount),
          date: newExpense.date,
          description: newExpense.description || null,
          receipt: receiptUrl,
          category: newExpense.category,
          familyId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Error al crear el gasto");
      }
      
      const newExpenseData = await response.json();
      
      // Actualizar la lista de gastos
      setExpenses((prev) => [newExpenseData, ...prev]);
      
      // Resetear el formulario
      setNewExpense({
        title: "",
        amount: "",
        date: format(new Date(), "yyyy-MM-dd"),
        description: "",
        category: "OTHER",
        receipt: null,
      });
      
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al crear gasto:", error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un gasto
  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/expenses?id=${expenseId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Error al eliminar el gasto");
      }
      
      // Actualizar la lista de gastos
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular el total de gastos
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Agrupar gastos por categoría para el resumen
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gastos compartidos</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo gasto
          </Button>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrar gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label htmlFor="category" className="form-label">Categoría</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Todas las categorías</option>
                  {expenseCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate" className="form-label">Fecha inicio</label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate" className="form-label">Fecha fin</label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetFilters}>
              Resetear
            </Button>
            <Button onClick={applyFilters}>
              Aplicar filtros
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Formulario para añadir nuevo gasto */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Añadir nuevo gasto</CardTitle>
            <CardDescription>
              Completa el formulario para registrar un nuevo gasto compartido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Concepto</label>
                  <Input
                    id="title"
                    name="title"
                    value={newExpense.title}
                    onChange={handleInputChange}
                    placeholder="Ej: Material escolar"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount" className="form-label">Importe (€)</label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">Fecha</label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newExpense.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <select
                    id="category"
                    name="category"
                    value={newExpense.category}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    {expenseCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Descripción (opcional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                  placeholder="Añade detalles sobre este gasto"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="receipt" className="form-label">Recibo/Factura (opcional)</label>
                <Input
                  id="receipt"
                  name="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos aceptados: imágenes y PDF
                </p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar gasto"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Resumen de gastos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gastos por categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(expensesByCategory).map(([category, amount]) => {
                const categoryInfo = expenseCategories.find(c => c.value === category);
                return (
                  <div key={category} className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      {categoryInfo?.label || category}
                    </span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de gastos */}
      <h2 className="text-2xl font-bold mb-4">Historial de gastos</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : expenses.length > 0 ? (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{expense.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(expense.date)} • 
                          {expenseCategories.find(c => c.value === expense.category)?.label || expense.category}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>
                    
                    {expense.description && (
                      <p className="mt-2 text-sm">{expense.description}</p>
                    )}
                    
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <span>Registrado por {expense.createdBy.name || "Usuario"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0 space-x-2">
                    {expense.receipt && (
                      <a 
                        href={expense.receipt} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      >
                        <Receipt className="mr-2 h-4 w-4" />
                        Ver recibo
                      </a>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDeleteExpense(expense.id)}
                      title="Eliminar gasto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No hay gastos registrados</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Comienza a registrar los gastos compartidos para llevar un control
          </p>
          <Button className="mt-4" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Añadir primer gasto
          </Button>
        </div>
      )}
    </div>
  );
} 