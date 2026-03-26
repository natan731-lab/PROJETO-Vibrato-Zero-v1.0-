import React from "react";
import { IconFingerprint, IconShieldLock, IconDialpad } from "@tabler/icons-react";

interface VibratoZeroAuthProps {
  onAuthenticate: () => void;
}

export function VibratoZeroAuth({ onAuthenticate }: VibratoZeroAuthProps) {
  return (
    <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-between p-10 font-sans animate-in fade-in duration-500">
      
      {/* 1. Header de Segurança */}
      <header className="mt-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/10">
          <IconShieldLock className="text-[#009B3A] w-10 h-10" />
        </div>
        <h1 className="text-white font-bold mt-4 text-xl uppercase tracking-widest">
          Acesso Restrito
        </h1>
        <p className="text-white/40 text-xs mt-1">Identifique-se para gerenciar o disco</p>
      </header>

      {/* 2. Área Central: Biometria Glassmórfica */}
      <div 
        className="flex flex-col items-center group cursor-pointer"
        onClick={onAuthenticate}
      >
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#009B3A]/30 flex items-center justify-center animate-pulse">
          <div className="w-24 h-24 bg-gradient-to-br from-[#009B3A]/20 to-transparent backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
            <IconFingerprint className="text-[#009B3A] w-14 h-14" />
          </div>
        </div>
        <span className="text-white/60 mt-6 text-sm font-medium group-hover:text-white transition-colors">
          Toque para Biometria
        </span>
      </div>

      {/* 3. Rodapé: Alternativa e GRC */}
      <footer className="w-full flex flex-col items-center gap-6 mb-10">
        <button 
          onClick={onAuthenticate}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
        >
          <IconDialpad size={18} />
          Usar PIN de Segurança
        </button>
        
        <div className="h-[1px] w-1/4 bg-white/10"></div>
        
        <p className="text-[10px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
          Proteção em conformidade com LGPD <br /> 
          Sessão Protegida por Criptografia AES-256
        </p>
      </footer>

    </div>
  );
}
