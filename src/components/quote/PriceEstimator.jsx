import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

// Precio base por tipo de mueble (€ sin IVA)
export const FURNITURE_TYPES = [
  { id: 'sofa_2', label: 'Sofá 2 plazas', basePrice: 280 },
  { id: 'sofa_3', label: 'Sofá 3 plazas', basePrice: 380 },
  { id: 'sofa_chaise', label: 'Sofá chaise longue', basePrice: 480 },
  { id: 'sillon', label: 'Sillón', basePrice: 160 },
  { id: 'silla', label: 'Silla', basePrice: 65 },
  { id: 'taburete', label: 'Taburete', basePrice: 40 },
  { id: 'cabecero', label: 'Cabecero', basePrice: 120 },
  { id: 'otomana', label: 'Otomana / Puf', basePrice: 90 },
  { id: 'banqueta', label: 'Banqueta', basePrice: 75 },
  { id: 'otro', label: 'Otro / Personalizado', basePrice: 0 },
];

// Multiplicadores por categoría de tejido
export const FABRIC_MULTIPLIERS = {
  'Terciopelo':          1.35,
  'Lino & Algodón':      1.00,
  'Cuero & Polipiel':    1.60,
  'Jacquard & Estampados': 1.25,
  default:               1.00,
};

// Multiplicadores por tamaño (unidades)
export const SIZE_MULTIPLIERS = [
  { id: 'xs', label: 'Muy pequeño  (< 0,5 m²)', multiplier: 0.60 },
  { id: 's',  label: 'Pequeño      (0,5 – 1 m²)', multiplier: 0.85 },
  { id: 'm',  label: 'Mediano      (1 – 2 m²)',   multiplier: 1.00 },
  { id: 'l',  label: 'Grande       (2 – 4 m²)',   multiplier: 1.30 },
  { id: 'xl', label: 'Muy grande   (> 4 m²)',     multiplier: 1.65 },
];

// Función exportada: calcula precio neto a partir de los parámetros
export function calculatePrice({ furnitureTypeId, fabricCategory, sizeId, quantity, customBase }) {
  const furniture = FURNITURE_TYPES.find((f) => f.id === furnitureTypeId);
  const size = SIZE_MULTIPLIERS.find((s) => s.id === sizeId);
  const fabricMult = FABRIC_MULTIPLIERS[fabricCategory] ?? FABRIC_MULTIPLIERS.default;
  const qty = Math.max(1, parseInt(quantity) || 1);

  if (!furniture || !size) return 0;

  const base = furniture.id === 'otro' ? (parseFloat(customBase) || 0) : furniture.basePrice;
  return parseFloat((base * size.multiplier * fabricMult * qty).toFixed(2));
}

export default function PriceEstimator({ estimator, onChange, fabricCategory }) {
  const handleChange = (field, value) => {
    onChange({ ...estimator, [field]: value });
  };

  const selectedFurniture = FURNITURE_TYPES.find((f) => f.id === estimator.furnitureTypeId);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <h3 className="font-heading text-lg font-semibold">Estimación de Precio</h3>
        <span className="text-xs bg-accent/15 text-accent-foreground font-body px-2 py-0.5 rounded-full">Auto</span>
      </div>

      {/* Tipo de mueble */}
      <div>
        <Label className="font-body text-sm">Tipo de mueble *</Label>
        <Select value={estimator.furnitureTypeId || ''} onValueChange={(v) => handleChange('furnitureTypeId', v)}>
          <SelectTrigger className="mt-1.5 rounded-xl h-11 font-body">
            <SelectValue placeholder="Selecciona el tipo de mueble" />
          </SelectTrigger>
          <SelectContent>
            {FURNITURE_TYPES.map((f) => (
              <SelectItem key={f.id} value={f.id} className="font-body">
                {f.label}
                {f.basePrice > 0 && <span className="ml-2 text-muted-foreground text-xs">(desde {f.basePrice} €)</span>}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Precio base personalizado si "otro" */}
      {selectedFurniture?.id === 'otro' && (
        <div>
          <Label className="font-body text-sm">Precio base sin IVA (€) *</Label>
          <Input
            type="number"
            min="0"
            value={estimator.customBase || ''}
            onChange={(e) => handleChange('customBase', e.target.value)}
            placeholder="Introduce el precio base"
            className="mt-1.5 rounded-xl h-11 font-body"
          />
        </div>
      )}

      {/* Tamaño */}
      <div>
        <Label className="font-body text-sm">Tamaño del mueble</Label>
        <Select value={estimator.sizeId || 'm'} onValueChange={(v) => handleChange('sizeId', v)}>
          <SelectTrigger className="mt-1.5 rounded-xl h-11 font-body">
            <SelectValue placeholder="Selecciona el tamaño" />
          </SelectTrigger>
          <SelectContent>
            {SIZE_MULTIPLIERS.map((s) => (
              <SelectItem key={s.id} value={s.id} className="font-body text-sm">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cantidad */}
      <div>
        <Label className="font-body text-sm">Cantidad de unidades</Label>
        <Input
          type="number"
          min="1"
          value={estimator.quantity || 1}
          onChange={(e) => handleChange('quantity', e.target.value)}
          className="mt-1.5 rounded-xl h-11 font-body w-28"
        />
      </div>

      {/* Tejido seleccionado (informativo) */}
      {fabricCategory && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground font-body bg-muted/50 rounded-xl px-3 py-2.5">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent" />
          <span>
            Tejido: <strong>{fabricCategory}</strong> — factor ×{FABRIC_MULTIPLIERS[fabricCategory] ?? 1}
          </span>
        </div>
      )}
    </div>
  );
}