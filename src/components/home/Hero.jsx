import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80"
          alt="Sofá tapizado elegante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent font-body text-sm font-medium tracking-widest uppercase">
                Decoración Textil
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Damos nueva
              <br />
              <span className="italic text-accent">vida</span> a tus
              <br />
              muebles
            </h1>

            <p className="font-body text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
              Especialistas en tapicería artesanal. Restauramos, renovamos y transformamos 
              cualquier pieza con los mejores tejidos y acabados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/presupuesto">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full px-8 h-14 text-base gap-2 group">
                  Solicitar Presupuesto
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body rounded-full px-8 h-14 text-base"
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Servicios
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}