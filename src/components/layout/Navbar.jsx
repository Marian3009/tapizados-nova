import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/#servicios' },
  { label: 'Galería', path: '/#galeria' },
  { label: 'Contacto', path: '/#contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (path) => {
    setOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = path;
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5ede4] flex items-center justify-center shrink-0">
            <img src="https://media.base44.com/images/public/69f638fb6d7443aecf38ad91/adb9908b2_file_000000007a3072469a4fc05aa39a1039.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-heading text-xl font-semibold tracking-tight">Tapizados Nova</span>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase -mt-0.5">Decoración Textil</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link to="/presupuesto">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full px-6">
              Solicitar Presupuesto
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="block w-full text-left text-sm font-body font-medium text-muted-foreground hover:text-foreground py-2"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/presupuesto" onClick={() => setOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full mt-2">
                  Solicitar Presupuesto
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}