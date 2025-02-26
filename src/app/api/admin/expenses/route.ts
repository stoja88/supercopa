import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getAllExpenses, updateExpense, deleteExpense, createExpense } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  // Verificar si el usuario está autenticado y es administrador
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    )
  }

  try {
    const expenses = await getAllExpenses()
    return NextResponse.json(expenses)
  } catch (error) {
    console.error('Error al obtener gastos:', error)
    return NextResponse.json(
      { error: 'Error al obtener gastos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Verificar si el usuario está autenticado y es administrador
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    )
  }

  try {
    const expenseData = await request.json()
    
    // Validar datos requeridos
    if (!expenseData.description || !expenseData.amount || !expenseData.familyId) {
      return NextResponse.json(
        { error: 'Descripción, monto y ID de familia son obligatorios' },
        { status: 400 }
      )
    }
    
    // Asegurarse de que la fecha esté en formato correcto
    if (expenseData.date) {
      try {
        expenseData.date = new Date(expenseData.date).toISOString()
      } catch (e) {
        return NextResponse.json(
          { error: 'Formato de fecha inválido' },
          { status: 400 }
        )
      }
    } else {
      expenseData.date = new Date().toISOString()
    }
    
    // Asignar el creador del gasto si no se especifica
    if (!expenseData.createdById) {
      expenseData.createdById = session.user.id
    }
    
    // Asignar el pagador del gasto si no se especifica
    if (!expenseData.paidById) {
      expenseData.paidById = session.user.id
    }
    
    // Convertir el monto a número si es necesario
    if (typeof expenseData.amount === 'string') {
      expenseData.amount = parseFloat(expenseData.amount)
      
      if (isNaN(expenseData.amount)) {
        return NextResponse.json(
          { error: 'El monto debe ser un número válido' },
          { status: 400 }
        )
      }
    }
    
    const newExpense = await createExpense(expenseData)
    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    console.error('Error al crear gasto:', error)
    return NextResponse.json(
      { error: 'Error al crear gasto' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  // Verificar si el usuario está autenticado y es administrador
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    )
  }

  try {
    const { id, ...data } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de gasto requerido' },
        { status: 400 }
      )
    }
    
    // Convertir la fecha si existe
    if (data.date) {
      data.date = new Date(data.date).toISOString()
    }
    
    // Convertir el monto a número si es necesario
    if (typeof data.amount === 'string') {
      data.amount = parseFloat(data.amount)
      
      if (isNaN(data.amount)) {
        return NextResponse.json(
          { error: 'El monto debe ser un número válido' },
          { status: 400 }
        )
      }
    }

    const updatedExpense = await updateExpense(id, data)
    return NextResponse.json(updatedExpense)
  } catch (error) {
    console.error('Error al actualizar gasto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar gasto' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)

  // Verificar si el usuario está autenticado y es administrador
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de gasto requerido' },
        { status: 400 }
      )
    }

    await deleteExpense(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar gasto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar gasto' },
      { status: 500 }
    )
  }
} 