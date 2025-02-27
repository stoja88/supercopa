export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function DashboardPage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">Cargando Dashboard...</h1>
      <p className="text-muted-foreground">
        Por favor espere mientras cargamos su panel de co-parentalidad.
      </p>
    </div>
  );
}