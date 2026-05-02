import React from 'react';
import { Separator } from '@/components/ui/separator';
import { FABRIC_MULTIPLIERS, SIZE_MULTIPLIERS, FURNITURE_TYPES } from './PriceEstimator';

export default function PriceSummary({ priceWithoutVat, estimator, fabricCategory }) {
  const price = priceWithoutVat || 0;
  const vat = price * 0.21;
  const total = price + vat;
  const advance = total * 0.5;

  const furniture = FURNITURE_TYPES.find((f) => f.id === estimator?.furnitureTypeId);
  const size = SIZE_MULTIPLIERS.find((s) => s.id === (estimator?.sizeId || 'm'));
  const fabricMult = fabricCategory ? (FABRIC_MULTIPLIERS[fabricCategory] ?? 1) : null;
  const qty = parseInt(estimator?.quantity) || 1;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-heading text-lg font-semibold mb-4">Resumen del Presupuesto</h3>

      {/* Desglose de cálculo */}
      {furniture && price > 0 && (
        <div className="mb-4 space-y-1.5 text-xs font-body text-muted-foreground bg-muted/40 rounded-xl p-3">
          <p className="font-medium text-foreground text-sm mb-2">Desglose del cálculo</p>
          {furniture.id !== 'otro' && (
            <div className="flex justify-between">
              <span>Precio base ({furniture.label})</span>
              <span>{furniture.basePrice} €</span>
            </div>
          )}
          {size && (
            <div className="flex justify-between">
              <span>Tamaño ({size.label.split('(')[0].trim()})</span>
              <span>×{size.multiplier}</span>
            </div>
          )}
          {fabricMult && (
            <div className="flex justify-between">
              <span>Tejido ({fabricCategory})</span>
              <span>×{fabricMult}</span>
            </div>
          )}
          {qty > 1 && (
            <div className="flex justify-between">
              <span>Unidades</span>
              <span>×{qty}</span>
            </div>
          )}
        </div>
      )}

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

      {price === 0 && (
        <p className="text-xs text-muted-foreground font-body mt-4 text-center">
          Selecciona el tipo de mueble y tamaño para ver la estimación
        </p>
      )}
    </div>
  );
}