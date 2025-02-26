import { PrismaClient } from '@prisma/client'

// Evitar múltiples instancias de Prisma Client en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Servicios para el panel de administración

// Usuarios
export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

export async function createUser(data: any) {
  return await prisma.user.create({
    data,
  })
}

export async function updateUser(id: string, data: any) {
  return await prisma.user.update({
    where: { id },
    data,
  })
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  })
}

// Familias
export async function getAllFamilies() {
  return await prisma.family.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function getFamilyById(id: string) {
  return await prisma.family.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      documents: true,
      events: true,
      expenses: true,
      messages: true,
    },
  })
}

export async function createFamily(data: any) {
  return await prisma.family.create({
    data,
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function updateFamily(id: string, data: any) {
  return await prisma.family.update({
    where: { id },
    data,
  })
}

export async function deleteFamily(id: string) {
  return await prisma.family.delete({
    where: { id },
  })
}

// Eventos
export async function getAllEvents() {
  return await prisma.event.findMany({
    orderBy: { startDate: 'desc' },
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function getEventById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function createEvent(data: any) {
  return await prisma.event.create({
    data,
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function updateEvent(id: string, data: any) {
  return await prisma.event.update({
    where: { id },
    data,
  })
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: { id },
  })
}

// Mensajes
export async function getAllMessages() {
  return await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      sender: true,
      family: true,
    },
  })
}

export async function getMessageById(id: string) {
  return await prisma.message.findUnique({
    where: { id },
    include: {
      sender: true,
      family: true,
    },
  })
}

export async function createMessage(data: any) {
  return await prisma.message.create({
    data,
    include: {
      sender: true,
      family: true,
    },
  })
}

export async function updateMessage(id: string, data: any) {
  return await prisma.message.update({
    where: { id },
    data,
  })
}

export async function deleteMessage(id: string) {
  return await prisma.message.delete({
    where: { id },
  })
}

// Documentos
export async function getAllDocuments() {
  return await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      uploader: true,
      family: true,
    },
  })
}

export async function getDocumentById(id: string) {
  return await prisma.document.findUnique({
    where: { id },
    include: {
      uploader: true,
      family: true,
    },
  })
}

export async function createDocument(data: any) {
  return await prisma.document.create({
    data,
    include: {
      uploader: true,
      family: true,
    },
  })
}

export async function updateDocument(id: string, data: any) {
  return await prisma.document.update({
    where: { id },
    data,
  })
}

export async function deleteDocument(id: string) {
  return await prisma.document.delete({
    where: { id },
  })
}

// Gastos
export async function getAllExpenses() {
  return await prisma.expense.findMany({
    orderBy: { date: 'desc' },
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function getExpenseById(id: string) {
  return await prisma.expense.findUnique({
    where: { id },
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function createExpense(data: any) {
  return await prisma.expense.create({
    data,
    include: {
      createdBy: true,
      family: true,
    },
  })
}

export async function updateExpense(id: string, data: any) {
  return await prisma.expense.update({
    where: { id },
    data,
  })
}

export async function deleteExpense(id: string) {
  return await prisma.expense.delete({
    where: { id },
  })
}

// Estadísticas para el dashboard
export async function getDashboardStats() {
  const [
    totalUsers,
    totalFamilies,
    totalEvents,
    totalMessages,
    totalDocuments,
    totalExpenses,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.family.count(),
    prisma.event.count(),
    prisma.message.count(),
    prisma.document.count(),
    prisma.expense.count(),
  ])

  return {
    totalUsers,
    totalFamilies,
    totalEvents,
    totalMessages,
    totalDocuments,
    totalExpenses,
  }
} 