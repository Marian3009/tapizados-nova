import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function PriceSummary({ priceWithoutVat }) {
  const price = priceWithoutVat || 0;
  const vat = price * 0.21;
  const total = price + vat;
  const advance = total * 0.5;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-heading text-lg font-semibold mb-4">Resumen del Presupuesto</h3>

      <div className="space-y-3 font-body text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Precio sin IVA</span>
          <span className="font-medium">{price.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">IVA (21%)</span>
          <span className="font-medium">{vat.toFixed(2)} €</span>
        </div>
        <Separator />
        <div className="flex justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-accent">{total.toFixed(2)} €</span>
        </div>
        <Separator />
        <div className="flex justify-between bg-accent/10 -mx-2 px-2 py-2 rounded-lg">
          <span className="font-medium">Anticipo (50%)</span>
          <span className="font-bold">{advance.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}