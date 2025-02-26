import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getAllFamilies, updateFamily, deleteFamily } from '@/lib/db'

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
    const families = await getAllFamilies()
    return NextResponse.json(families)
  } catch (error) {
    console.error('Error al obtener familias:', error)
    return NextResponse.json(
      { error: 'Error al obtener familias' },
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
        { error: 'ID de familia requerido' },
        { status: 400 }
      )
    }

    const updatedFamily = await updateFamily(id, data)
    return NextResponse.json(updatedFamily)
  } catch (error) {
    console.error('Error al actualizar familia:', error)
    return NextResponse.json(
      { error: 'Error al actualizar familia' },
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
        { error: 'ID de familia requerido' },
        { status: 400 }
      )
    }

    await deleteFamily(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar familia:', error)
    return NextResponse.json(
      { error: 'Error al eliminar familia' },
      { status: 500 }
    )
  }
} 