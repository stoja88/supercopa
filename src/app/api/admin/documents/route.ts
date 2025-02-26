import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getAllDocuments, updateDocument, deleteDocument, createDocument } from '@/lib/db'

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
    const documents = await getAllDocuments()
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error al obtener documentos:', error)
    return NextResponse.json(
      { error: 'Error al obtener documentos' },
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
    const documentData = await request.json()
    
    // Validar datos requeridos
    if (!documentData.title || !documentData.url || !documentData.familyId) {
      return NextResponse.json(
        { error: 'Título, URL y ID de familia son obligatorios' },
        { status: 400 }
      )
    }
    
    // Asignar el creador del documento si no se especifica
    if (!documentData.uploaderId) {
      documentData.uploaderId = session.user.id
    }
    
    const newDocument = await createDocument(documentData)
    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    console.error('Error al crear documento:', error)
    return NextResponse.json(
      { error: 'Error al crear documento' },
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
        { error: 'ID de documento requerido' },
        { status: 400 }
      )
    }

    const updatedDocument = await updateDocument(id, data)
    return NextResponse.json(updatedDocument)
  } catch (error) {
    console.error('Error al actualizar documento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar documento' },
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
        { error: 'ID de documento requerido' },
        { status: 400 }
      )
    }

    await deleteDocument(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar documento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar documento' },
      { status: 500 }
    )
  }
} 