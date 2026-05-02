import { jsPDF } from 'jspdf';

export function generateQuotePDF(quote) {
  const price = quote.price_without_vat || 0;
  const vat = quote.vat_amount || price * 0.21;
  const total = quote.total_price || price + vat;
  const advance = quote.advance_payment || total * 0.5;

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

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Decoración Textil', margin, 36);

  const quoteNum = `P-${String(quote.id || Date.now()).slice(-6)}`;
  doc.setFontSize(9);
  doc.text(`Presupuesto: ${quoteNum}`, pageWidth - margin - 60, 28);
  doc.text(`Fecha: ${new Date(quote.created_date || Date.now()).toLocaleDateString('es-ES')}`, pageWidth - margin - 60, 36);

  y = 70;

  // Client info
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
    ['Nombre:', quote.client_name || '—'],
    ['Dirección:', quote.client_address || '—'],
    ['Email:', quote.client_email || '—'],
    ['Teléfono:', quote.client_phone || '—'],
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
  const workLines = doc.splitTextToSize(quote.work_description || '—', contentWidth);
  doc.text(workLines, margin, y);
  y += workLines.length * 6 + 12;

  if (quote.notes) {
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
    const noteLines = doc.splitTextToSize(quote.notes, contentWidth);
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

  doc.setFillColor(245, 245, 240);
  doc.rect(margin, y - 4, contentWidth, 10, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Concepto', margin + 4, y + 2);
  doc.text('Importe', pageWidth - margin - 25, y + 2);
  y += 12;

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

  doc.setFillColor(42, 48, 60);
  doc.rect(margin, y - 3, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL', margin + 4, y + 5);
  doc.text(`${total.toFixed(2)} €`, pageWidth - margin - 25, y + 5);
  y += 18;

  doc.setFillColor(198, 165, 100);
  doc.rect(margin, y - 3, contentWidth, 12, 'F');
  doc.setTextColor(42, 48, 60);
  doc.text('ANTICIPO (50%)', margin + 4, y + 5);
  doc.text(`${advance.toFixed(2)} €`, pageWidth - margin - 25, y + 5);
  y += 22;

  // Bank transfer section
  doc.setTextColor(42, 48, 60);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS PARA TRANSFERENCIA BANCARIA', margin, y);
  y += 2;
  doc.setDrawColor(198, 165, 100);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + 90, y);
  y += 10;

  doc.setFillColor(248, 247, 244);
  doc.rect(margin, y - 4, contentWidth, 28, 'F');
  doc.setDrawColor(198, 165, 100);
  doc.setLineWidth(0.5);
  doc.rect(margin, y - 4, contentWidth, 28, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text('Titular:', margin + 4, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.text('Tapizados Nova', margin + 30, y + 4);

  doc.setFont('helvetica', 'bold');
  doc.text('IBAN:', margin + 4, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text('ES00 0000 0000 0000 0000 0000', margin + 30, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Concepto:', margin + 4, y + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(`Presupuesto ${quoteNum} — ${quote.client_name || ''}`, margin + 30, y + 22);

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Tapizados Nova — Decoración Textil', margin, 280);
  doc.text('tapizadosnova@gmail.com | +34 611 491 661 | Calle Bilbao N1 1ª planta, 08191 Rubí (Barcelona)', margin, 285);
  doc.text('Presupuesto válido durante 30 días', pageWidth - margin - 55, 290);

  doc.save(`Presupuesto_TapizadosNova_${quoteNum}.pdf`);
}