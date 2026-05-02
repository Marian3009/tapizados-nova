import React from 'react';
import { X, Phone, Mail, MapPin, FileText, Image, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuotePDF } from '@/utils/generateQuotePDF';

export default function QuoteDetailModal({ quote, onClose }) {
  const price = quote.price_without_vat || 0;
  const vat = quote.vat_amount || price * 0.21;
  const total = quote.total_price || price + vat;
  const advance = quote.advance_payment || total * 0.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading text-xl font-bold">{quote.client_name}</h2>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {new Date(quote.created_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quote.client_email && (
              <div className="flex items-center gap-2 text-sm font-body">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="truncate text-muted-foreground">{quote.client_email}</span>
              </div>
            )}
            {quote.client_phone && (
              <div className="flex items-center gap-2 text-sm font-body">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-muted-foreground">{quote.client_phone}</span>
              </div>
            )}
            {quote.client_address && (
              <div className="flex items-center gap-2 text-sm font-body">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span className="truncate text-muted-foreground">{quote.client_address}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Work description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-accent" />
              <h3 className="font-body text-sm font-semibold">Descripción del trabajo</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed bg-muted/40 rounded-xl p-4">
              {quote.work_description}
            </p>
          </div>

          {quote.notes && (
            <div>
              <h3 className="font-body text-sm font-semibold mb-2">Notas</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed bg-muted/40 rounded-xl p-4">
                {quote.notes}
              </p>
            </div>
          )}

          {/* Photos */}
          {(quote.object_photos?.length > 0 || quote.fabric_photos?.length > 0) && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-4 h-4 text-accent" />
                <h3 className="font-body text-sm font-semibold">Imágenes</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {quote.object_photos?.map((url, i) => (
                  <a key={`obj-${i}`} href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="Objeto" className="aspect-square object-cover rounded-xl border border-border hover:opacity-80 transition-opacity" />
                  </a>
                ))}
                {quote.fabric_photos?.map((url, i) => (
                  <a key={`fab-${i}`} href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="Tejido" className="aspect-square object-cover rounded-xl border border-border hover:opacity-80 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {quote.visualization_url && (
            <div>
              <h3 className="font-body text-sm font-semibold mb-2">Visualización IA</h3>
              <img src={quote.visualization_url} alt="Visualización" className="w-full rounded-xl border border-border" />
            </div>
          )}

          <Separator />

          {/* Price breakdown */}
          <div className="bg-muted/40 rounded-xl p-4 space-y-2 font-body text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Precio sin IVA</span>
              <span>{price.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>IVA (21%)</span>
              <span>{vat.toFixed(2)} €</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-accent">{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-medium text-muted-foreground">
              <span>Anticipo (50%)</span>
              <span>{advance.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <Button onClick={() => generateQuotePDF(quote)} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-body gap-2">
            <Download className="w-4 h-4" /> Descargar PDF
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1 rounded-full font-body">
            Cerrar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}