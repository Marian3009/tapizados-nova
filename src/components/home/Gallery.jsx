import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', title: 'Sofá Chesterfield' },
  { url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', title: 'Sillón Moderno' },
  { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', title: 'Sofá Contemporáneo' },
  { url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', title: 'Salón Completo' },
  { url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80', title: 'Tapicería Premium' },
  { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80', title: 'Restauración Clásica' },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">
            Nuestro Trabajo
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Galería de Proyectos
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Descubre algunos de nuestros trabajos más recientes y la calidad que nos define.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-heading text-lg text-primary-foreground font-semibold">
                  {img.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}