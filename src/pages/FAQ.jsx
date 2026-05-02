import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const faqs = [
  {
    category: 'Presupuestos y precios',
    items: [
      {
        q: '¿Cómo puedo solicitar un presupuesto?',
        a: 'Puedes solicitar tu presupuesto directamente desde nuestra web de forma online, subiendo fotos de tu mueble y eligiendo el tejido deseado. También puedes contactarnos por teléfono o email y te asesoramos personalmente.',
      },
      {
        q: '¿El presupuesto tiene algún coste?',
        a: 'No, el presupuesto es completamente gratuito y sin compromiso. Solo pagas si decides contratar nuestros servicios.',
      },
      {
        q: '¿Cuánto tiempo es válido el presupuesto?',
        a: 'Todos nuestros presupuestos tienen una validez de 30 días desde la fecha de emisión.',
      },
      {
        q: '¿Qué incluye el precio del presupuesto?',
        a: 'El precio incluye la mano de obra, el tejido seleccionado, y el servicio de recogida y entrega a domicilio. El IVA (21%) se indica siempre de forma separada.',
      },
    ],
  },
  {
    category: 'Proceso y plazos',
    items: [
      {
        q: '¿Cuánto tarda en realizarse el trabajo?',
        a: 'El plazo habitual es de 7 a 14 días laborables dependiendo del tipo de trabajo y el tejido elegido. Te informamos del plazo exacto en el presupuesto.',
      },
      {
        q: '¿Recogéis y entregáis a domicilio?',
        a: 'Sí, ofrecemos servicio de recogida y entrega a domicilio incluido en el precio del presupuesto. Nos desplazamos a Rubí y alrededores.',
      },
      {
        q: '¿Cómo funciona el proceso paso a paso?',
        a: '1. Solicitas el presupuesto online o por teléfono. 2. Aceptas el presupuesto y abonas el anticipo del 50%. 3. Recogemos el mueble en tu domicilio. 4. Realizamos el trabajo en nuestro taller. 5. Te entregamos el mueble tapizado. 6. Abonas el 50% restante.',
      },
    ],
  },
  {
    category: 'Tejidos y materiales',
    items: [
      {
        q: '¿Puedo aportar mi propio tejido?',
        a: 'Sí, puedes traer tu propio tejido. En ese caso, el presupuesto solo incluirá la mano de obra. Consúltanos las medidas necesarias antes de comprarlo.',
      },
      {
        q: '¿Qué tipos de tejidos trabajáis?',
        a: 'Trabajamos con todo tipo de tejidos: terciopelo, lino, algodón, polipiel, cuero, jacquard, estampados y muchos más. Disponemos de un amplio catálogo y también podemos trabajar con materiales a medida.',
      },
      {
        q: '¿Puedo ver muestras de tejido antes de decidir?',
        a: 'Sí, puedes visitar nuestro taller en Rubí para ver y tocar las muestras de tejido. También puedes solicitar que te las llevemos en la visita de recogida.',
      },
    ],
  },
  {
    category: 'Pago y garantías',
    items: [
      {
        q: '¿Qué formas de pago aceptáis?',
        a: 'Aceptamos transferencia bancaria y efectivo. Se requiere un anticipo del 50% para iniciar el trabajo, y el resto al entregar el mueble.',
      },
      {
        q: '¿Ofrecéis garantía en los trabajos?',
        a: 'Sí, todos nuestros trabajos tienen garantía. Si detectas cualquier problema de acabado o costura en los primeros 6 meses, lo reparamos sin coste adicional.',
      },
      {
        q: '¿Puedo cancelar o modificar el pedido?',
        a: 'Puedes cancelar antes de que recojamos el mueble. Si ya se ha iniciado el trabajo, el anticipo no es reembolsable. Para modificaciones, contáctanos lo antes posible.',
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-body font-medium text-foreground text-sm md:text-base">{question}</span>
        <ChevronDown className={`w-5 h-5 text-accent shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground font-body leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen font-body bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">Ayuda</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-3">Preguntas Frecuentes</h1>
            <p className="text-muted-foreground font-body mb-12">
              Todo lo que necesitas saber sobre nuestros servicios de tapicería y decoración textil.
            </p>

            <div className="space-y-10">
              {faqs.map((group) => (
                <div key={group.category}>
                  <h2 className="font-heading text-xl font-semibold mb-1 text-accent">{group.category}</h2>
                  <div className="bg-card border border-border rounded-2xl px-6">
                    {group.items.map((item) => (
                      <FAQItem key={item.q} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 bg-primary text-primary-foreground rounded-2xl p-8 text-center">
              <p className="font-heading text-xl font-semibold mb-2">¿No encuentras lo que buscas?</p>
              <p className="font-body text-primary-foreground/70 text-sm mb-4">Contáctanos directamente y te responderemos en menos de 24 horas.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center font-body text-sm">
                <a href="tel:+34611491661" className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-medium hover:bg-accent/90 transition-colors">
                  📞 +34 611 491 661
                </a>
                <a href="mailto:tapizadosnova@gmail.com" className="border border-primary-foreground/30 text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary-foreground/10 transition-colors">
                  ✉️ tapizadosnova@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}