import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Sun, Moon, Sunrise, Sunset, Star, Calendar, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeBannerProps {
  onCreateEvent?: () => void;
}

export function WelcomeBanner({ onCreateEvent }: WelcomeBannerProps) {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [quote, setQuote] = useState("");

  // Establecer el saludo y el icono según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting("Buenos días");
      setIcon(<Sunrise className="h-8 w-8 text-amber-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Buenas tardes");
      setIcon(<Sun className="h-8 w-8 text-amber-500" />);
    } else if (hour >= 18 && hour < 22) {
      setGreeting("Buenas noches");
      setIcon(<Sunset className="h-8 w-8 text-indigo-500" />);
    } else {
      setGreeting("Buenas noches");
      setIcon(<Moon className="h-8 w-8 text-indigo-500" />);
    }
  }, []);

  // Seleccionar una frase inspiradora aleatoria
  useEffect(() => {
    const quotes = [
      "La comunicación efectiva es la base de una co-parentalidad exitosa.",
      "Pequeños pasos cada día construyen grandes cambios en la vida familiar.",
      "Organizar hoy es prepararse para un mañana más tranquilo.",
      "El respeto mutuo crea un ambiente positivo para todos los miembros de la familia.",
      "La consistencia en las rutinas ayuda a los niños a sentirse seguros.",
      "Celebra los pequeños logros en tu camino de co-parentalidad.",
      "La paciencia es clave en los momentos difíciles de la crianza compartida.",
      "Recuerda que ambos padres son importantes en la vida de los hijos.",
      "Una buena planificación reduce el estrés en la vida familiar.",
      "La flexibilidad y la comprensión fortalecen la relación de co-parentalidad."
    ];
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "Usuario";

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mt-20 -mr-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full -mb-10 -ml-10 z-0"></div>
      
      <CardContent className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              {icon}
              <h1 className="text-3xl font-bold ml-3">
                {greeting}, {firstName}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl">
              {quote}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={onCreateEvent}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Nuevo evento
            </Button>
            <Button 
              className="flex items-center"
            >
              <Bell className="mr-2 h-4 w-4" />
              Ver notificaciones
            </Button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center text-sm">
          <Star className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-muted-foreground">
            Consejo: Utiliza el calendario para coordinar actividades importantes con tu co-padre/madre.
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 