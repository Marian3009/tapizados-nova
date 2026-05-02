import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const quote = body?.data;

    if (!quote || !quote.client_email) {
      return Response.json({ skipped: true, reason: 'No client email' });
    }

    const price = quote.price_without_vat || 0;
    const vat = quote.vat_amount || price * 0.21;
    const total = quote.total_price || price + vat;
    const advance = quote.advance_payment || total * 0.5;
    const quoteNum = `P-${String(quote.id || '').slice(-6)}`;
    const dateStr = new Date(quote.created_date || Date.now()).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric'
    });

    const subject = `Tu presupuesto de Tapizados Nova — ${quoteNum}`;

    const body_html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f4f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2a303c;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="width:44px;height:44px;background-color:#c6a564;border-radius:50%;display:inline-block;text-align:center;line-height:44px;font-size:20px;font-weight:700;color:#2a303c;vertical-align:middle;">N</div>
                    <span style="color:#ffffff;font-size:20px;font-weight:700;margin-left:12px;vertical-align:middle;">Tapizados Nova</span>
                  </td>
                  <td align="right">
                    <span style="color:#c6a564;font-size:13px;">${quoteNum}</span><br>
                    <span style="color:rgba(255,255,255,0.5);font-size:12px;">${dateStr}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <h1 style="margin:0 0 12px;font-size:24px;color:#2a303c;font-weight:700;">¡Tu presupuesto está listo!</h1>
              <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.6;">
                Hola <strong style="color:#2a303c;">${quote.client_name}</strong>, hemos recibido tu solicitud y hemos preparado el siguiente presupuesto para ti.
              </p>
            </td>
          </tr>

          <!-- Work description -->
          <tr>
            <td style="padding:0 40px 24px;">
              <div style="background:#f9f8f5;border-radius:12px;padding:20px 24px;border-left:4px solid #c6a564;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#c6a564;text-transform:uppercase;letter-spacing:0.08em;">Trabajo a realizar</p>
                <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${quote.work_description || '—'}</p>
              </div>
            </td>
          </tr>

          ${quote.notes ? `
          <tr>
            <td style="padding:0 40px 24px;">
              <div style="background:#f9f8f5;border-radius:12px;padding:20px 24px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Notas</p>
                <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${quote.notes}</p>
              </div>
            </td>
          </tr>` : ''}

          <!-- Price breakdown -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#2a303c;text-transform:uppercase;letter-spacing:0.08em;">Desglose económico</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;">
                <tr style="background:#f3f2ee;">
                  <td style="padding:12px 16px;font-size:13px;color:#6b7280;">Precio sin IVA</td>
                  <td align="right" style="padding:12px 16px;font-size:13px;color:#374151;font-weight:600;">${price.toFixed(2)} €</td>
                </tr>
                <tr style="background:#ffffff;border-top:1px solid #e5e7eb;">
                  <td style="padding:12px 16px;font-size:13px;color:#6b7280;">IVA (21%)</td>
                  <td align="right" style="padding:12px 16px;font-size:13px;color:#374151;font-weight:600;">${vat.toFixed(2)} €</td>
                </tr>
                <tr style="background:#2a303c;">
                  <td style="padding:16px;font-size:15px;color:#ffffff;font-weight:700;">TOTAL</td>
                  <td align="right" style="padding:16px;font-size:15px;color:#c6a564;font-weight:700;">${total.toFixed(2)} €</td>
                </tr>
                <tr style="background:#c6a564;">
                  <td style="padding:14px 16px;font-size:14px;color:#2a303c;font-weight:700;">Anticipo requerido (50%)</td>
                  <td align="right" style="padding:14px 16px;font-size:14px;color:#2a303c;font-weight:700;">${advance.toFixed(2)} €</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info box -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:#fffbf0;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;">Información importante</p>
                <ul style="margin:0;padding-left:18px;color:#78350f;font-size:13px;line-height:1.8;">
                  <li>Este presupuesto tiene una validez de <strong>30 días</strong>.</li>
                  <li>Se requiere un anticipo del <strong>50%</strong> para iniciar el trabajo.</li>
                  <li>Incluye servicio de <strong>recogida y entrega a domicilio</strong>.</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f8f5;padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">¿Tienes preguntas? Contáctanos:</p>
              <p style="margin:0;font-size:13px;color:#2a303c;">
                📧 <a href="mailto:info@tapizadosnova.com" style="color:#c6a564;text-decoration:none;">info@tapizadosnova.com</a>
                &nbsp;&nbsp;📞 <a href="tel:+34600000000" style="color:#c6a564;text-decoration:none;">+34 600 000 000</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#9ca3af;">© ${new Date().getFullYear()} Tapizados Nova — Decoración Textil, Madrid</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: quote.client_email,
      subject,
      body: body_html,
    });

    return Response.json({ success: true, sent_to: quote.client_email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});