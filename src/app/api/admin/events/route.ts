import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getAllEvents, updateEvent, deleteEvent, createEvent } from '@/lib/db'

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
    const events = await getAllEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
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
    const eventData = await request.json()
    
    // Validar datos requeridos
    if (!eventData.title || !eventData.familyId) {
      return NextResponse.json(
        { error: 'Título y ID de familia son obligatorios' },
        { status: 400 }
      )
    }
    
    // Asegurarse de que la fecha esté en formato correcto
    if (eventData.date) {
      try {
        eventData.startDate = new Date(eventData.date).toISOString()
        delete eventData.date // Eliminar el campo date ya que usamos startDate en el modelo
      } catch (e) {
        return NextResponse.json(
          { error: 'Formato de fecha inválido' },
          { status: 400 }
        )
      }
    }
    
    // Asignar el creador del evento si no se especifica
    if (!eventData.createdById) {
      eventData.createdById = session.user.id
    }
    
    const newEvent = await createEvent(eventData)
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error('Error al crear evento:', error)
    return NextResponse.json(
      { error: 'Error al crear evento' },
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
        { error: 'ID de evento requerido' },
        { status: 400 }
      )
    }
    
    // Convertir date a startDate si existe
    if (data.date) {
      data.startDate = new Date(data.date).toISOString()
      delete data.date
    }

    const updatedEvent = await updateEvent(id, data)
    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Error al actualizar evento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar evento' },
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
        { error: 'ID de evento requerido' },
        { status: 400 }
      )
    }

    await deleteEvent(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar evento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar evento' },
      { status: 500 }
    )
  }
} 