import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Eye } from 'lucide-react';
import QuoteDetailModal from '@/components/admin/QuoteDetailModal';

const STATUS_LABELS = {
  pending: 'Pendiente',
  accepted: 'Aceptado',
  rejected: 'Rechazado',
  completed: 'Completado',
};

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedQuote, setSelectedQuote] = useState(null);

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: () => base44.entities.Quote.list('-created_date'),
    enabled: user?.role === 'admin',
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Quote.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quotes'] }),
  });

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-semibold mb-2">Acceso restringido</p>
          <p className="text-muted-foreground font-body mb-6">Solo los administradores pueden acceder a esta página.</p>
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-full font-body gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-heading text-2xl font-bold">Panel de Administración</h1>
              <p className="text-xs text-muted-foreground font-body">Tapizados Nova</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-medium">{quotes.length} presupuestos</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            No hay presupuestos todavía.
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cliente</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descripción</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote, idx) => (
                    <tr key={quote.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{quote.client_name}</p>
                        {quote.client_email && <p className="text-xs text-muted-foreground mt-0.5">{quote.client_email}</p>}
                        {quote.client_phone && <p className="text-xs text-muted-foreground">{quote.client_phone}</p>}
                      </td>
                      <td className="px-6 py-4 max-w-[220px]">
                        <p className="truncate text-muted-foreground">{quote.work_description}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {quote.total_price ? (
                          <span className="font-semibold text-accent">{quote.total_price.toFixed(2)} €</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                        {new Date(quote.created_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <Select
                          value={quote.status}
                          onValueChange={(val) => updateStatusMutation.mutate({ id: quote.id, status: val })}
                        >
                          <SelectTrigger className={`h-8 w-36 rounded-full border-0 text-xs font-medium ${STATUS_COLORS[quote.status]}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(STATUS_LABELS).map(([val, label]) => (
                              <SelectItem key={val} value={val} className="text-xs">{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedQuote(quote)}
                          className="rounded-full gap-1.5 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedQuote && (
        <QuoteDetailModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
      )}
    </div>
  );
}