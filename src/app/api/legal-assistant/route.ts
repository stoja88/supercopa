import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Respuestas predefinidas para consultas comunes
const legalResponses = {
  "custodia": `
    La custodia compartida es un régimen donde ambos progenitores tienen los mismos derechos y responsabilidades en la crianza de los hijos.
    
    Puntos clave:
    - Ambos padres participan activamente en las decisiones importantes
    - El tiempo de convivencia puede ser equitativo o adaptado a las circunstancias
    - Se busca mantener la estabilidad emocional del menor
    - Requiere buena comunicación entre los progenitores
    
    Para establecer un régimen de custodia compartida, es recomendable:
    1. Elaborar un plan de parentalidad detallado
    2. Definir calendarios de convivencia claros
    3. Establecer mecanismos de comunicación efectivos
    4. Consultar con un abogado especializado en derecho de familia
  `,
  
  "pension": `
    La pensión alimenticia es la cantidad económica que un progenitor debe aportar para cubrir las necesidades básicas de los hijos.
    
    Aspectos importantes:
    - Se determina en función de las necesidades del menor y capacidad económica de los padres
    - Cubre gastos de alimentación, vestido, educación, sanidad y ocio
    - Es un derecho del menor, no del progenitor custodio
    - Debe actualizarse anualmente según el IPC
    
    Para calcular la pensión alimenticia se consideran:
    1. Ingresos de ambos progenitores
    2. Gastos fijos del menor (colegio, actividades, etc.)
    3. Tiempo de convivencia con cada progenitor
    4. Gastos extraordinarios (médicos no cubiertos, etc.)
  `,
  
  "visitas": `
    El régimen de visitas establece cómo se organizarán los encuentros entre el hijo y el progenitor no custodio.
    
    Consideraciones importantes:
    - Debe adaptarse a la edad y necesidades del menor
    - Puede incluir fines de semana alternos, días entre semana y periodos vacacionales
    - Debe ser flexible pero con un calendario claro
    - Puede modificarse si cambian las circunstancias
    
    Un régimen de visitas típico incluye:
    1. Fines de semana alternos (de viernes a domingo)
    2. Una o dos tardes entre semana
    3. Mitad de periodos vacacionales (verano, Navidad, Semana Santa)
    4. Fechas especiales como cumpleaños o días festivos
  `,
  
  "modificacion": `
    La modificación de medidas es el procedimiento para cambiar aspectos de un convenio regulador o sentencia previa.
    
    Se puede solicitar cuando:
    - Han cambiado sustancialmente las circunstancias (económicas, laborales, etc.)
    - Hay acuerdo entre ambos progenitores
    - El interés del menor lo requiere
    
    El proceso implica:
    1. Presentar una demanda de modificación de medidas
    2. Aportar pruebas del cambio de circunstancias
    3. Proponer nuevas medidas concretas
    4. Asistir a una vista judicial si no hay acuerdo
    
    Es recomendable intentar llegar a un acuerdo previo mediante mediación familiar.
  `,
  
  "incumplimiento": `
    El incumplimiento del régimen de visitas o de la pensión alimenticia puede tener consecuencias legales.
    
    Ante un incumplimiento puedes:
    - Documentar todos los incumplimientos (fechas, comunicaciones, etc.)
    - Intentar resolver el conflicto mediante diálogo o mediación
    - Presentar una demanda de ejecución de sentencia
    - En casos graves, denunciar por abandono de familia
    
    Consecuencias posibles:
    1. Multas económicas
    2. Modificación del régimen de custodia o visitas
    3. Compensación de periodos no disfrutados
    4. En casos extremos, consecuencias penales
  `,
  
  "mediacion": `
    La mediación familiar es un proceso voluntario para resolver conflictos con la ayuda de un profesional neutral.
    
    Ventajas de la mediación:
    - Es más rápida y económica que un proceso judicial
    - Fomenta la comunicación y el acuerdo entre las partes
    - Los acuerdos suelen cumplirse mejor al ser consensuados
    - Reduce el impacto emocional en los hijos
    
    El proceso de mediación:
    1. Sesión informativa inicial
    2. Identificación de puntos de conflicto
    3. Negociación de posibles soluciones
    4. Redacción de acuerdos
    5. Homologación judicial de los acuerdos
  `,
  
  "default": `
    Para obtener asesoramiento legal personalizado sobre co-parentalidad, te recomendamos:
    
    1. Consultar con un abogado especializado en derecho de familia
    2. Buscar servicios de mediación familiar en tu localidad
    3. Contactar con servicios sociales o asociaciones especializadas
    4. Revisar la legislación específica de tu comunidad autónoma
    
    Recuerda que cada caso es único y las circunstancias particulares pueden afectar a la aplicación de la ley.
    
    Puedes hacer preguntas más específicas sobre custodia compartida, pensión alimenticia, régimen de visitas, modificación de medidas, incumplimientos o mediación familiar.
  `
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Se requiere una consulta" },
        { status: 400 }
      );
    }

    // Analizar la consulta para determinar la respuesta más adecuada
    let response = legalResponses.default;
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes("custodia") || queryLower.includes("compartida")) {
      response = legalResponses.custodia;
    } else if (queryLower.includes("pension") || queryLower.includes("alimentos") || queryLower.includes("manutención")) {
      response = legalResponses.pension;
    } else if (queryLower.includes("visitas") || queryLower.includes("ver a mis hijos")) {
      response = legalResponses.visitas;
    } else if (queryLower.includes("modificar") || queryLower.includes("cambiar") || queryLower.includes("modificación")) {
      response = legalResponses.modificacion;
    } else if (queryLower.includes("incumplimiento") || queryLower.includes("no cumple") || queryLower.includes("no paga")) {
      response = legalResponses.incumplimiento;
    } else if (queryLower.includes("mediación") || queryLower.includes("mediador") || queryLower.includes("acuerdo")) {
      response = legalResponses.mediacion;
    }

    // Guardar la consulta en la base de datos (opcional)
    // await prisma.legalQuery.create({
    //   data: {
    //     userId: session.user.id,
    //     query,
    //     response,
    //     createdAt: new Date(),
    //   },
    // });

    return NextResponse.json({
      response,
      disclaimer: "Esta información es orientativa y no constituye asesoramiento legal profesional. Para casos específicos, consulte con un abogado especializado."
    });
  } catch (error) {
    console.error("Error en el asistente legal:", error);
    return NextResponse.json(
      { error: "Error al procesar la consulta" },
      { status: 500 }
    );
  }
} 