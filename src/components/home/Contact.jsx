import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">
              Contacto
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              ¿Listo para transformar tus muebles?
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Solicita tu presupuesto online sin compromiso. Sube fotos de tu mueble, 
              elige el tejido y te mostramos cómo quedará. Rápido, fácil y transparente.
            </p>
            <Link to="/presupuesto">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full px-8 h-14 text-base gap-2 group">
                Presupuesto Online Gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: 'Teléfono', value: '+34 600 000 000', sublabel: 'Lunes a Viernes, 9:00 - 18:00' },
              { icon: Mail, label: 'Email', value: 'info@tapizadosnova.com', sublabel: 'Respondemos en 24h' },
              { icon: MapPin, label: 'Ubicación', value: 'Madrid, España', sublabel: 'Servicio a domicilio' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="font-heading text-lg font-semibold mt-0.5">{item.value}</p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">{item.sublabel}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}