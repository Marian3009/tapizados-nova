import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FABRICS = [
  {
    category: 'Terciopelo',
    items: [
      { id: 'terciopelo-azul', name: 'Terciopelo Azul Noche', color: '#2B3A6B', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 'terciopelo-verde', name: 'Terciopelo Verde Bosque', color: '#2D5A3D', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
      { id: 'terciopelo-mostaza', name: 'Terciopelo Mostaza', color: '#C9A84C', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
      { id: 'terciopelo-burdeos', name: 'Terciopelo Burdeos', color: '#6B2737', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
    ],
  },
  {
    category: 'Lino & Algodón',
    items: [
      { id: 'lino-crudo', name: 'Lino Crudo Natural', color: '#D4C5A9', url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80' },
      { id: 'lino-gris', name: 'Lino Gris Piedra', color: '#8E8E8E', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80' },
      { id: 'algodon-blanco', name: 'Algodón Blanco Roto', color: '#F5F0E8', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80' },
    ],
  },
  {
    category: 'Cuero & Polipiel',
    items: [
      { id: 'cuero-cognac', name: 'Cuero Cognac', color: '#9B5D2E', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80' },
      { id: 'cuero-negro', name: 'Cuero Negro', color: '#1A1A1A', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 'polipiel-blanca', name: 'Polipiel Blanca', color: '#F0EDE8', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80' },
    ],
  },
  {
    category: 'Jacquard & Estampados',
    items: [
      { id: 'jacquard-floral', name: 'Jacquard Floral Clásico', color: '#8B7355', url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80' },
      { id: 'estampado-geometrico', name: 'Estampado Geométrico', color: '#4A6B8A', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
    ],
  },
];

export default function FabricCatalog({ selectedFabric, onSelect, onUseAsPhoto }) {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const handleSelect = (fabric) => {
    onSelect(fabric);
    onUseAsPhoto(fabric.url);
    setOpen(false);
  };

  return (
    <div>
      <label className="font-body text-sm font-medium block mb-2">Tejido del catálogo</label>
      <p className="text-xs text-muted-foreground mb-3 font-body">
        Elige un tejido de nuestro catálogo o sube tu propia foto
      </p>

      {/* Selected fabric preview */}
      {selectedFabric && (
        <div className="flex items-center gap-3 mb-3 p-3 rounded-xl border border-accent/40 bg-accent/5">
          <img src={selectedFabric.url} alt={selectedFabric.name} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-medium truncate">{selectedFabric.name}</p>
            <p className="font-body text-xs text-muted-foreground">{selectedFabric.category}</p>
          </div>
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-accent-foreground" />
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all font-body text-sm"
      >
        <span className="text-muted-foreground">{open ? 'Cerrar catálogo' : 'Ver catálogo de tejidos'}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {/* Catalog dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 border border-border rounded-xl bg-card overflow-hidden">
              {FABRICS.map((group) => (
                <div key={group.category} className="border-b border-border last:border-0">
                  <button
                    onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors font-body text-sm font-medium"
                  >
                    <span>{group.category}</span>
                    {openCategory === group.category
                      ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  <AnimatePresence>
                    {openCategory === group.category && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-2 p-3 bg-muted/20">
                          {group.items.map((fabric) => {
                            const isSelected = selectedFabric?.id === fabric.id;
                            return (
                              <button
                                key={fabric.id}
                                onClick={() => handleSelect({ ...fabric, category: group.category })}
                                className={`relative flex flex-col rounded-xl overflow-hidden border-2 transition-all text-left ${
                                  isSelected ? 'border-accent shadow-md' : 'border-transparent hover:border-accent/30'
                                }`}
                              >
                                <div className="aspect-[4/3] w-full overflow-hidden">
                                  <img
                                    src={fabric.url}
                                    alt={fabric.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="p-2 bg-card flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded-full border border-border shrink-0"
                                    style={{ backgroundColor: fabric.color }}
                                  />
                                  <span className="font-body text-xs leading-tight">{fabric.name}</span>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow">
                                    <Check className="w-3 h-3 text-accent-foreground" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}