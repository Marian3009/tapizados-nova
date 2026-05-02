import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function QuoteForm({ formData, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-5">
      <h3 className="font-heading text-lg font-semibold">Datos del Cliente</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="font-body text-sm">Nombre completo *</Label>
          <Input
            value={formData.client_name || ''}
            onChange={(e) => handleChange('client_name', e.target.value)}
            placeholder="Juan García López"
            className="mt-1.5 rounded-xl h-11 font-body"
          />
        </div>
        <div>
          <Label className="font-body text-sm">Email</Label>
          <Input
            type="email"
            value={formData.client_email || ''}
            onChange={(e) => handleChange('client_email', e.target.value)}
            placeholder="juan@email.com"
            className="mt-1.5 rounded-xl h-11 font-body"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="font-body text-sm">Teléfono</Label>
          <Input
            value={formData.client_phone || ''}
            onChange={(e) => handleChange('client_phone', e.target.value)}
            placeholder="+34 600 000 000"
            className="mt-1.5 rounded-xl h-11 font-body"
          />
        </div>
        <div>
          <Label className="font-body text-sm">Dirección *</Label>
          <Input
            value={formData.client_address || ''}
            onChange={(e) => handleChange('client_address', e.target.value)}
            placeholder="Calle, número, ciudad"
            className="mt-1.5 rounded-xl h-11 font-body"
          />
        </div>
      </div>

      <div>
        <Label className="font-body text-sm">Trabajo a realizar *</Label>
        <Textarea
          value={formData.work_description || ''}
          onChange={(e) => handleChange('work_description', e.target.value)}
          placeholder="Describe el trabajo que necesitas: tipo de mueble, tejido deseado, medidas aproximadas, etc."
          className="mt-1.5 rounded-xl min-h-[100px] font-body"
        />
      </div>

      <div>
        <Label className="font-body text-sm">Precio sin IVA (€) *</Label>
        <Input
          type="number"
          step="0.01"
          value={formData.price_without_vat || ''}
          onChange={(e) => handleChange('price_without_vat', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className="mt-1.5 rounded-xl h-11 font-body"
        />
      </div>

      <div>
        <Label className="font-body text-sm">Notas adicionales</Label>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Cualquier detalle adicional..."
          className="mt-1.5 rounded-xl min-h-[80px] font-body"
        />
      </div>
    </div>
  );
}