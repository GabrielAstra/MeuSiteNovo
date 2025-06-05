// src/components/ContactModal.tsx
import React, { FormEvent, RefObject } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, formRef, onSubmit, isSubmitting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-full max-w-lg border border-white/20 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center">Entre em Contato</h3>

        <div className="space-y-6">
         <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <Mail className="text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:gvlc2013@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                gvlc2013@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <Phone className="text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-medium">Telefone</p>
              <a href="tel:+5561985623626" className="text-purple-300 hover:text-purple-200 transition-colors">
                +55 (61) 98562-3626
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
            <MapPin className="text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-medium">Localização</p>
              <p className="text-purple-300">Brasília, DF - Brasil</p>
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="user_name"
                placeholder="Seu Nome"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder-white/50"
              />
            </div>
            <div>
              <input
                type="email"
                name="user_email"
                placeholder="Seu Email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder-white/50"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Sua Mensagem"
                rows={4}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 transition-colors placeholder-white/50 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
