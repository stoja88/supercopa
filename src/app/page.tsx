import Link from "next/link";
import { Calendar, MessageSquare, FileText, DollarSign, BookOpen, Shield, Zap, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simplifica la co-parentalidad con nuestra plataforma integral
            </h1>
            <p className="text-xl mb-8">
              Una solución completa para coordinar, comunicar y colaborar en la crianza compartida de tus hijos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Características principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Todo lo que necesitas para una co-parentalidad efectiva en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="feature-icon" />}
              title="Calendario compartido"
              description="Coordina visitas, eventos escolares y actividades importantes con un calendario sincronizado."
            />
            <FeatureCard
              icon={<MessageSquare className="feature-icon" />}
              title="Mensajería segura"
              description="Comunícate de forma efectiva con mensajes organizados y un historial completo de conversaciones."
            />
            <FeatureCard
              icon={<FileText className="feature-icon" />}
              title="Gestión de documentos"
              description="Almacena y comparte documentos legales, médicos y escolares en un lugar seguro."
            />
            <FeatureCard
              icon={<DollarSign className="feature-icon" />}
              title="Control de gastos"
              description="Registra, divide y realiza seguimiento de los gastos compartidos de manera transparente."
            />
            <FeatureCard
              icon={<Shield className="feature-icon" />}
              title="Asistente legal"
              description="Obtén ayuda con documentos legales y consultas relacionadas con la co-parentalidad."
            />
            <FeatureCard
              icon={<BookOpen className="feature-icon" />}
              title="Recursos educativos"
              description="Accede a guías, artículos y recursos para mejorar la comunicación y colaboración."
            />
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Premium
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Desbloquea todas las funcionalidades avanzadas para una experiencia completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PremiumFeatureCard
              icon={<Zap className="feature-icon" />}
              title="Calendario con sincronización avanzada"
              description="Sincroniza con Google Calendar, Outlook y otros calendarios populares."
            />
            <PremiumFeatureCard
              icon={<Shield className="feature-icon" />}
              title="Asistente legal con IA"
              description="Genera documentos personalizados y obtén respuestas a consultas legales."
            />
            <PremiumFeatureCard
              icon={<DollarSign className="feature-icon" />}
              title="Sistema inteligente de gastos"
              description="Análisis detallado, categorización automática y proyecciones de gastos."
            />
            <PremiumFeatureCard
              icon={<Database className="feature-icon" />}
              title="Almacenamiento ilimitado"
              description="Sin límites para documentos, fotos y archivos importantes."
            />
            <PremiumFeatureCard
              icon={<MessageSquare className="feature-icon" />}
              title="Soporte 24/7"
              description="Asistencia prioritaria por chat, email y teléfono cuando lo necesites."
            />
            <div className="flex items-center justify-center lg:col-span-1">
              <Link href="/register?plan=premium">
                <Button size="lg" className="w-full">
                  Obtener Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Historias reales de padres que han mejorado su experiencia de co-parentalidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Esta plataforma ha transformado nuestra comunicación. Ahora podemos coordinar todo sin conflictos y enfocarnos en lo que realmente importa: nuestros hijos."
              author="María G."
            />
            <TestimonialCard
              quote="El calendario compartido y el sistema de gastos han eliminado muchas discusiones. Todo queda registrado y es transparente para ambos."
              author="Carlos M."
            />
            <TestimonialCard
              quote="Como abogada de familia, recomiendo esta plataforma a mis clientes. Es una herramienta invaluable para mantener una co-parentalidad organizada y documentada."
              author="Laura S., Abogada"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comienza tu experiencia de co-parentalidad hoy
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a miles de padres que han mejorado su comunicación y colaboración para el bienestar de sus hijos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Registrarse gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CoParent</h3>
              <p className="text-gray-400">
                Simplificando la co-parentalidad con tecnología y empatía.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Características</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Precios</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">Preguntas frecuentes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Guías</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Soporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacidad</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Términos</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CoParent. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-center">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function PremiumFeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="card-hover border-yellow-300 dark:border-yellow-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex justify-center">{icon}</div>
          <span className="premium-badge">Premium</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <p className="text-lg italic mb-4">"{quote}"</p>
        <p className="text-right font-semibold">— {author}</p>
      </CardContent>
    </Card>
  );
}
