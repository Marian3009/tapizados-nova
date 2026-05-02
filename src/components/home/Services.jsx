import React from 'react';
import { motion } from 'framer-motion';
import { Armchair, Palette, Scissors, Truck, Ruler, Shield } from 'lucide-react';

const services = [
  {
    icon: Armchair,
    title: 'Tapizado de Muebles',
    description: 'Sofás, sillas, sillones, cabeceros y cualquier pieza de mobiliario con acabados profesionales.',
  },
  {
    icon: Palette,
    title: 'Decoración Textil',
    description: 'Cortinas, estores, cojines y complementos textiles a medida para tu hogar o negocio.',
  },
  {
    icon: Scissors,
    title: 'Restauración',
    description: 'Devolvemos el esplendor original a tus piezas antiguas y de valor sentimental.',
  },
  {
    icon: Ruler,
    title: 'A Medida',
    description: 'Diseños personalizados adaptados a tus necesidades y al estilo de tu espacio.',
  },
  {
    icon: Truck,
    title: 'Recogida y Entrega',
    description: 'Servicio integral con recogida y entrega a domicilio sin preocupaciones.',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Materiales de primera calidad y garantía en todos nuestros trabajos realizados.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">
            Nuestros Servicios
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Lo que hacemos
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Ofrecemos un servicio completo de tapicería y decoración textil con la máxima calidad y atención al detalle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{service.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}