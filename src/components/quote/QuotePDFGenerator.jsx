import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function QuotePDFGenerator({ formData, onGenerated }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const price = formData.price_without_vat || 0;
  const vat = price * 0.21;
  const total = price + vat;
  const advance = total * 0.5;

  const generatePDF = () => {
    setGenerating(true);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    // Header background
    doc.setFillColor(42, 48, 60);
    doc.rect(0, 0, pageWidth, 55, 'F');

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('TAPIZADOS NOVA', margin, 28);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Decoración Textil', margin, 36);

    // Quote number and date
    doc.setFontSize(9);
    const quoteNum = `P-${Date.now().toString().slice(-6)}`;
    doc.text(`Presupuesto: ${quoteNum}`, pageWidth - margin - 60, 28);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, pageWidth - margin - 60, 36);

    y = 70;

    // Client info section
    doc.setTextColor(42, 48, 60);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', margin, y);
    y += 2;
    doc.setDrawColor(198, 165, 100);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + 60, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);

    const clientFields = [
      ['Nombre:', formData.client_name || '—'],
      ['Dirección:', formData.client_address || '—'],
      ['Email:', formData.client_email || '—'],
      ['Teléfono:', formData.client_phone || '—'],
    ];

    clientFields.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 30, y);
      y += 7;
    });

    y += 8;

    // Work description
    doc.setTextColor(42, 48, 60);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TRABAJO A REALIZAR', margin, y);
    y += 2;
    doc.setDrawColor(198, 165, 100);
    doc.line(margin, y, margin + 60, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const workLines = doc.splitTextToSize(formData.work_description || '—', contentWidth);
    doc.text(workLines, margin, y);
    y += workLines.length * 6 + 12;

    // Notes
    if (formData.notes) {
      doc.setTextColor(42, 48, 60);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTAS', margin, y);
      y += 2;
      doc.setDrawColor(198, 165, 100);
      doc.line(margin, y, margin + 25, y);
      y += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const noteLines = doc.splitTextToSize(formData.notes, contentWidth);
      doc.text(noteLines, margin, y);
      y += noteLines.length * 6 + 12;
    }

    // Price table
    doc.setTextColor(42, 48, 60);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DESGLOSE ECONÓMICO', margin, y);
    y += 2;
    doc.setDrawColor(198, 165, 100);
    doc.line(margin, y, margin + 60, y);
    y += 10;

    // Table header
    doc.setFillColor(245, 245, 240);
    doc.rect(margin, y - 4, contentWidth, 10, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Concepto', margin + 4, y + 2);
    doc.text('Importe', pageWidth - margin - 25, y + 2);
    y += 12;

    // Table rows
    doc.setFont('helvetica', 'normal');
    const rows = [
      ['Precio sin IVA', `${price.toFixed(2)} €`],
      ['IVA (21%)', `${vat.toFixed(2)} €`],
    ];

    rows.forEach(([concept, amount]) => {
      doc.setTextColor(80, 80, 80);
      doc.text(concept, margin + 4, y);
      doc.text(amount, pageWidth - margin - 25, y);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.3);
      doc.line(margin, y + 3, pageWidth - margin, y + 3);
      y += 9;
    });

    // Total row
    doc.setFillColor(42, 48, 60);
    doc.rect(margin, y - 3, contentWidth, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('TOTAL', margin + 4, y + 5);
    doc.text(`${total.toFixed(2)} €`, pageWidth - margin - 25, y + 5);
    y += 18;

    // Advance payment
    doc.setFillColor(198, 165, 100);
    doc.rect(margin, y - 3, contentWidth, 12, 'F');
    doc.setTextColor(42, 48, 60);
    doc.text('ANTICIPO (50%)', margin + 4, y + 5);
    doc.text(`${advance.toFixed(2)} €`, pageWidth - margin - 25, y + 5);
    y += 25;

    // Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Tapizados Nova — Decoración Textil', margin, 280);
    doc.text('info@tapizadosnova.com | +34 600 000 000', margin, 285);
    doc.text('Presupuesto válido durante 30 días', pageWidth - margin - 55, 285);

    doc.save(`Presupuesto_TapizadosNova_${quoteNum}.pdf`);

    setGenerating(false);
    setGenerated(true);
    if (onGenerated) onGenerated();

    setTimeout(() => setGenerated(false), 3000);
  };

  const isValid = formData.client_name && formData.work_description && price > 0;

  return (
    <Button
      onClick={generatePDF}
      disabled={!isValid || generating}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 font-body text-base gap-2"
    >
      {generating ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : generated ? (
        <Check className="w-5 h-5" />
      ) : (
        <FileDown className="w-5 h-5" />
      )}
      {generating ? 'Generando PDF...' : generated ? '¡PDF Descargado!' : 'Descargar Presupuesto PDF'}
    </Button>
  );
}