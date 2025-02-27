"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Variantes de animación
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const formControls = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5
    }
  })
};

// Esquema de validación
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Componente interno que usa useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      console.log("Iniciando sesión con:", { email: data.email, password: "********" });
      
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log("Resultado de signIn:", result);
      setDebugInfo(result);

      if (result?.error) {
        setError(`Error: ${result.error}`);
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      console.error("Error en onSubmit:", error);
      setError(`Error inesperado: ${error instanceof Error ? error.message : String(error)}`);
      setDebugInfo(error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.div variants={slideUp} className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CoParent</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Plataforma de co-parentalidad</p>
          </motion.div>
        </div>
        
        <motion.div variants={slideUp}>
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Iniciar sesión
              </CardTitle>
              <CardDescription className="text-center">
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md flex items-start"
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Mostrar información de depuración en desarrollo */}
              {process.env.NODE_ENV === "development" && debugInfo && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md overflow-auto max-h-32"
                >
                  <strong>Debug Info:</strong>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div 
                  className="form-group"
                  variants={formControls}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <label htmlFor="email" className="form-label flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      {...register("email")}
                      disabled={isLoading}
                      className="pl-3 pr-3 py-2 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="form-error flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  className="form-group"
                  variants={formControls}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="form-label flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Lock className="h-4 w-4" />
                      <span>Contraseña</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      disabled={isLoading}
                      className="pl-3 pr-3 py-2 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    {errors.password && (
                      <p className="form-error flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  variants={formControls}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        Iniciar sesión
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div 
                className="relative my-6"
                variants={formControls}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">O continúa con</span>
                </div>
              </motion.div>

              <motion.div
                variants={formControls}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Google
                </Button>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <motion.div 
                className="text-center text-sm"
                variants={formControls}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                  Regístrate
                </Link>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Componente principal con Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
} 