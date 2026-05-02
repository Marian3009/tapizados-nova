import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Visualiza el resultado antes de decidir
        </h2>
        <p className="font-body text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          Con nuestra herramienta de IA, sube la foto de tu mueble y del tejido, y te mostramos 
          una vista previa de cómo quedará el tapizado final.
        </p>
        <Link to="/presupuesto">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full px-10 h-14 text-base">
            Probar Ahora
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}