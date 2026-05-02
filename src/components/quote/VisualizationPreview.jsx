import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisualizationPreview({ objectPhotos, fabricPhotos, onVisualizationGenerated }) {
  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const canGenerate = objectPhotos.length > 0 && fabricPhotos.length > 0;

  const generateVisualization = async () => {
    setGenerating(true);

    const prompt = `Reupholstered furniture visualization: Take this piece of furniture and show how it would look reupholstered with the provided fabric/textile. The furniture should maintain its exact shape and form but show the new fabric applied naturally with proper wrapping, folds, and texture. The result should look photorealistic, like a professional upholstery job. Show the furniture in a clean, well-lit setting. Make it look stunning and professional.`;

    const allPhotos = [...objectPhotos, ...fabricPhotos];
    const result = await base44.integrations.Core.GenerateImage({
      prompt,
      existing_image_urls: allPhotos,
    });

    setPreviewUrl(result.url);
    onVisualizationGenerated(result.url);
    setGenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">Vista Previa con IA</h3>
          <p className="text-xs text-muted-foreground font-body">
            Genera una imagen de cómo quedará tu mueble con el tejido elegido
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img
              src={previewUrl}
              alt="Visualización del tapizado"
              className="w-full rounded-2xl border border-border shadow-lg"
            />
            <div className="absolute bottom-4 right-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={generateVisualization}
                disabled={generating}
                className="rounded-full gap-2 font-body"
              >
                <RefreshCw className={`w-3 h-3 ${generating ? 'animate-spin' : ''}`} />
                Regenerar
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-muted/50 rounded-2xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center"
          >
            {generating ? (
              <>
                <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
                <p className="font-body text-sm text-muted-foreground">
                  Generando visualización...
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Esto puede tardar unos segundos
                </p>
              </>
            ) : (
              <>
                <Sparkles className="w-10 h-10 text-muted-foreground/30 mb-4" />
                <p className="font-body text-sm text-muted-foreground">
                  Sube fotos del objeto y del tejido para generar la vista previa
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!previewUrl && (
        <Button
          onClick={generateVisualization}
          disabled={!canGenerate || generating}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-12 font-body gap-2"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {generating ? 'Generando...' : 'Generar Vista Previa'}
        </Button>
      )}
    </div>
  );
}