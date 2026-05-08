import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GUELL_LAMADRID_COLLECTIONS } from '@/data/guell-lamadrid-collections';

export default function FabricCatalog({ selectedFabric, onSelect, onUseAsPhoto }) {
  const [open, setOpen] = useState(false);
  const [expandedCollection, setExpandedCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(GUELL_LAMADRID_COLLECTIONS.map((c) => c.category)));
  }, []);

  const filteredCollections = useMemo(() => {
    return GUELL_LAMADRID_COLLECTIONS.filter((collection) => {
      const matchesCategory = !selectedCategory || collection.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        collection.colors.some((color) => color.colorName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleSelectColor = (collection, color) => {
    const fabricData = {
      id: `${collection.id}-${color.reference}`,
      name: `${collection.name} - ${color.colorName}`,
      category: collection.category,
      url: color.image,
      reference: color.reference,
      collection: collection.name,
      color: color.colorName,
    };
    onSelect(fabricData);
    onUseAsPhoto(fabricData.url);
    setOpen(false);
  };

  return (
    <div>
      <label className="font-body text-sm font-medium block mb-2">Tejido Güell Lamadrid</label>
      <p className="text-xs text-muted-foreground mb-3 font-body">
        Elige un tejido de nuestro catálogo premium o sube tu propia foto
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
        <span className="text-muted-foreground">{open ? 'Cerrar catálogo' : 'Ver catálogo Güell Lamadrid'}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {/* Catalog modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 border border-border rounded-xl bg-card overflow-hidden max-h-96 overflow-y-auto">
              {/* Search bar */}
              <div className="sticky top-0 bg-card border-b border-border p-3 z-10">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar colección o color..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-muted/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              {/* Category filters */}
              <div className="sticky top-12 bg-muted/20 border-b border-border p-2 flex flex-wrap gap-1 z-10">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-xs rounded-full transition-all font-body ${
                    selectedCategory === null
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-xs rounded-full transition-all font-body ${
                      selectedCategory === category
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Collections */}
              <div className="divide-y divide-border">
                {filteredCollections.map((collection) => (
                  <div key={collection.id} className="border-b border-border last:border-0">
                    {/* Collection header */}
                    <button
                      onClick={() => setExpandedCollection(expandedCollection === collection.id ? null : collection.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors font-body text-sm font-medium text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{collection.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{collection.description}</p>
                      </div>
                      {expandedCollection === collection.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                      )}
                    </button>

                    {/* Color variations */}
                    <AnimatePresence>
                      {expandedCollection === collection.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 bg-muted/20">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Composición: {collection.composition}
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {collection.colors.map((color, idx) => {
                                const isSelected =
                                  selectedFabric?.id === `${collection.id}-${color.reference}`;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleSelectColor(collection, color)}
                                    className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                                      isSelected
                                        ? 'border-accent bg-accent/10 shadow-md'
                                        : 'border-border hover:border-accent/50'
                                    }`}
                                  >
                                    <img
                                      src={color.image}
                                      alt={color.colorName}
                                      className="w-full h-16 object-cover rounded mb-1"
                                    />
                                    <span className="text-xs font-semibold text-foreground text-center line-clamp-1">
                                      {color.reference}
                                    </span>
                                    <span className="text-xs text-muted-foreground text-center line-clamp-1">
                                      {color.colorName}
                                    </span>
                                    {isSelected && (
                                      <div className="absolute mt-12 w-5 h-5 bg-accent rounded-full flex items-center justify-center shadow">
                                        <Check className="w-3 h-3 text-accent-foreground" />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredCollections.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">No se encontraron colecciones</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
