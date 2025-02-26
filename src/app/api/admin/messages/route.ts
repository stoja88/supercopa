import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getAllMessages, updateMessage, deleteMessage, createMessage } from '@/lib/db'

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
    const messages = await getAllMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error al obtener mensajes:', error)
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
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
    const messageData = await request.json()
    
    // Validar datos requeridos
    if (!messageData.content || !messageData.senderId || !messageData.familyId) {
      return NextResponse.json(
        { error: 'Contenido, ID del remitente y ID de familia son obligatorios' },
        { status: 400 }
      )
    }
    
    const newMessage = await createMessage(messageData)
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Error al crear mensaje:', error)
    return NextResponse.json(
      { error: 'Error al crear mensaje' },
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
        { error: 'ID de mensaje requerido' },
        { status: 400 }
      )
    }

    const updatedMessage = await updateMessage(id, data)
    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Error al actualizar mensaje:', error)
    return NextResponse.json(
      { error: 'Error al actualizar mensaje' },
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
        { error: 'ID de mensaje requerido' },
        { status: 400 }
      )
    }

    await deleteMessage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar mensaje:', error)
    return NextResponse.json(
      { error: 'Error al eliminar mensaje' },
      { status: 500 }
    )
  }
} 