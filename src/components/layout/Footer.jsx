import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5ede4] flex items-center justify-center shrink-0">
                <img src="https://media.base44.com/images/public/69f638fb6d7443aecf38ad91/adb9908b2_file_000000007a3072469a4fc05aa39a1039.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading text-xl font-semibold">Tapizados Nova</span>
            </div>
            <p className="text-primary-foreground/70 font-body text-sm leading-relaxed">
              Especialistas en tapicería y decoración textil. Transformamos tus muebles con los mejores tejidos y acabados profesionales.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-4 h-4 text-accent" />
                <span>+34 611 491 661</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>tapizadosnova@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent" />
                <div>
                  <p>Calle Bilbao N1, 1ª planta</p>
                  <p>08191 Rubí, Barcelona</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Horario</h4>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Clock className="w-4 h-4 text-accent" />
                <div>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} Tapizados Nova. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/presupuesto" className="text-xs text-primary-foreground/50 hover:text-accent font-body transition-colors">
              Presupuesto Online
            </Link>
            <Link to="/faq" className="text-xs text-primary-foreground/50 hover:text-accent font-body transition-colors">
              Preguntas Frecuentes
            </Link>
            <Link to="/privacidad" className="text-xs text-primary-foreground/50 hover:text-accent font-body transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}