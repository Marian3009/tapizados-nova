import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const sections = [
  {
    title: '1. Responsable del tratamiento',
    content: `El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:

Denominación: Tapizados Nova
Dirección: Calle Bilbao N1, 1ª planta, 08191 Rubí (Barcelona)
Email: tapizadosnova@gmail.com
Teléfono: +34 611 491 661`,
  },
  {
    title: '2. Datos que recopilamos',
    content: `A través de nuestro formulario de presupuesto online recopilamos los siguientes datos personales:
    
• Nombre y apellidos
• Dirección postal
• Correo electrónico
• Número de teléfono
• Imágenes de muebles y tejidos aportadas por el usuario
• Descripción del trabajo solicitado

Estos datos son facilitados voluntariamente por el usuario y son necesarios para poder elaborar y enviar el presupuesto solicitado.`,
  },
  {
    title: '3. Finalidad del tratamiento',
    content: `Los datos personales que nos facilitas serán tratados con las siguientes finalidades:

• Elaborar y enviarte el presupuesto solicitado.
• Gestionar la relación contractual derivada de la aceptación del presupuesto.
• Comunicarnos contigo en relación con el estado de tu pedido o trabajo.
• Enviarte información relacionada con nuestros servicios si nos has dado tu consentimiento.`,
  },
  {
    title: '4. Base jurídica del tratamiento',
    content: `El tratamiento de tus datos se basa en:

• La ejecución de un contrato o medidas precontractuales (elaboración de presupuestos y prestación del servicio).
• Tu consentimiento, en los casos en que lo hayamos solicitado expresamente.
• El cumplimiento de obligaciones legales aplicables.`,
  },
  {
    title: '5. Conservación de los datos',
    content: `Tus datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos, y para atender las posibles responsabilidades legales derivadas del tratamiento.

En general, los datos relacionados con presupuestos y contratos se conservan durante un mínimo de 5 años conforme a la legislación mercantil y fiscal española.`,
  },
  {
    title: '6. Destinatarios de los datos',
    content: `No cedemos ni vendemos tus datos personales a terceros con fines comerciales. Únicamente podrán acceder a tus datos aquellos proveedores de servicios tecnológicos estrictamente necesarios para el funcionamiento de esta plataforma (alojamiento web, envío de emails), siempre bajo contrato de encargo de tratamiento y con plenas garantías.`,
  },
  {
    title: '7. Tus derechos',
    content: `Como titular de los datos, tienes derecho a:

• Acceder a tus datos personales.
• Solicitar la rectificación de datos inexactos.
• Solicitar la supresión de tus datos cuando ya no sean necesarios.
• Oponerte al tratamiento de tus datos o solicitar su limitación.
• Solicitar la portabilidad de tus datos.

Para ejercer cualquiera de estos derechos, puedes contactarnos por email en tapizadosnova@gmail.com indicando tu solicitud y adjuntando una copia de tu documento de identidad. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
  },
  {
    title: '8. Seguridad',
    content: `Tapizados Nova adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de tus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.`,
  },
  {
    title: '9. Cookies',
    content: `Este sitio web puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo o publicitarias de terceros. Puedes configurar tu navegador para rechazar el uso de cookies, aunque esto podría afectar al funcionamiento de algunas partes del sitio.`,
  },
  {
    title: '10. Cambios en la política de privacidad',
    content: `Tapizados Nova se reserva el derecho a modificar la presente política de privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. En caso de cambios sustanciales, te lo comunicaremos de forma visible en esta página. Te recomendamos revisarla periódicamente.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen font-body bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-3">Política de Privacidad</h1>
            <p className="text-muted-foreground font-body mb-2 text-sm">
              Última actualización: {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-muted-foreground font-body mb-12 leading-relaxed">
              En Tapizados Nova nos comprometemos a proteger y respetar tu privacidad. Esta política explica cómo tratamos los datos personales que nos facilitas a través de este sitio web.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <h2 className="font-heading text-lg font-semibold mb-4 text-foreground">{section.title}</h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="font-body text-sm text-muted-foreground">
                ¿Tienes dudas sobre tu privacidad? Escríbenos a{' '}
                <a href="mailto:tapizadosnova@gmail.com" className="text-accent hover:underline">
                  tapizadosnova@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}