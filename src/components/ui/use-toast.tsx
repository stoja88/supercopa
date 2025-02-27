// Este archivo implementa el hook useToast para la funcionalidad de notificaciones

import { toast, type ToastProps, type ToastActionElement } from "@/components/ui/toast"

export type ToastOptions = {
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
} & ToastProps

export function useToast() {
  return {
    toast,
    dismiss: () => {}, // Función vacía para compatibilidad
  }
}

export { toast, type ToastProps, type ToastActionElement } 