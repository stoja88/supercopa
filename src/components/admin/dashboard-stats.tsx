"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, MessageSquare, FileText, DollarSign, Home } from "lucide-react";
import { StatsCard } from "@/components/admin/stats-card";

interface DashboardStats {
  totalUsers: number;
  totalFamilies: number;
  totalEvents: number;
  totalMessages: number;
  totalDocuments: number;
  totalExpenses: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Error al cargar estadísticas');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg mb-8">
        Error al cargar estadísticas. Por favor, intenta de nuevo más tarde.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard
        title="Usuarios"
        value={stats.totalUsers}
        icon={<Users className="h-5 w-5" />}
      />
      <StatsCard
        title="Familias"
        value={stats.totalFamilies}
        icon={<Home className="h-5 w-5" />}
      />
      <StatsCard
        title="Eventos"
        value={stats.totalEvents}
        icon={<Calendar className="h-5 w-5" />}
      />
      <StatsCard
        title="Mensajes"
        value={stats.totalMessages}
        icon={<MessageSquare className="h-5 w-5" />}
      />
      <StatsCard
        title="Documentos"
        value={stats.totalDocuments}
        icon={<FileText className="h-5 w-5" />}
      />
      <StatsCard
        title="Gastos"
        value={stats.totalExpenses}
        icon={<DollarSign className="h-5 w-5" />}
      />
    </div>
  );
} 