import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhotoUploader from '../components/quote/PhotoUploader';
import VisualizationPreview from '../components/quote/VisualizationPreview';
import QuoteForm from '../components/quote/QuoteForm';
import PriceSummary from '../components/quote/PriceSummary';
import QuotePDFGenerator from '../components/quote/QuotePDFGenerator';

export default function QuoteBuilder() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    work_description: '',
    price_without_vat: 0,
    notes: '',
  });
  const [objectPhotos, setObjectPhotos] = useState([]);
  const [fabricPhotos, setFabricPhotos] = useState([]);
  const [visualizationUrl, setVisualizationUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const price = formData.price_without_vat || 0;
  const vat = price * 0.21;
  const total = price + vat;
  const advance = total * 0.5;

  const handleSaveQuote = async () => {
    if (!formData.client_name || !formData.work_description) {
      toast.error('Por favor, completa el nombre y la descripción del trabajo.');
      return;
    }

    setSaving(true);
    await base44.entities.Quote.create({
      ...formData,
      object_photos: objectPhotos,
      fabric_photos: fabricPhotos,
      visualization_url: visualizationUrl,
      vat_amount: vat,
      total_price: total,
      advance_payment: advance,
      status: 'pending',
    });
    setSaving(false);
    setSaved(true);
    toast.success('Presupuesto guardado correctamente.');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen font-body bg-background">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Solicitar Presupuesto
            </h1>
            <p className="font-body text-muted-foreground mt-3 max-w-xl">
              Completa el formulario, sube las fotos y genera tu presupuesto en PDF. 
              También puedes visualizar cómo quedará tu mueble con el tejido elegido.
            </p>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Client form */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <QuoteForm formData={formData} onChange={setFormData} />
              </div>

              {/* Photo uploads */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h3 className="font-heading text-lg font-semibold mb-6">Fotos del Proyecto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploader
                    label="Objeto a tapizar"
                    description="Sube fotos del mueble u objeto que quieres tapizar"
                    photos={objectPhotos}
                    onPhotosChange={setObjectPhotos}
                  />
                  <PhotoUploader
                    label="Tejido deseado"
                    description="Sube fotos del tejido o tela que deseas utilizar"
                    photos={fabricPhotos}
                    onPhotosChange={setFabricPhotos}
                  />
                </div>
              </div>

              {/* AI Visualization */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <VisualizationPreview
                  objectPhotos={objectPhotos}
                  fabricPhotos={fabricPhotos}
                  onVisualizationGenerated={setVisualizationUrl}
                />
              </div>
            </motion.div>

            {/* Right: Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="lg:sticky lg:top-28 space-y-6">
                <PriceSummary priceWithoutVat={formData.price_without_vat} />

                {/* Actions */}
                <div className="space-y-3">
                  <QuotePDFGenerator formData={formData} />

                  <Button
                    onClick={handleSaveQuote}
                    disabled={saving || !formData.client_name || !formData.work_description}
                    variant="outline"
                    className="w-full rounded-full h-12 font-body gap-2"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : saved ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar Presupuesto'}
                  </Button>
                </div>

                {/* Info */}
                <div className="bg-accent/10 rounded-2xl p-5 font-body text-sm space-y-2 text-muted-foreground">
                  <p className="font-medium text-foreground">Información importante:</p>
                  <ul className="space-y-1 list-disc list-inside text-xs">
                    <li>El presupuesto tiene una validez de 30 días</li>
                    <li>Se requiere un anticipo del 50% del total</li>
                    <li>IVA del 21% incluido en el total</li>
                    <li>Recogida y entrega a domicilio incluida</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}