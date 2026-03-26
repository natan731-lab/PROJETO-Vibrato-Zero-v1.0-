import React, { useState, useEffect } from "react";
import { IconShieldCheck, IconActivity, IconLock } from "@tabler/icons-react";

interface VibratoZeroMonitorProps {
  algorithm: string;
  progress: number;
  onAbort: () => void;
}

export function VibratoZeroMonitor({ algorithm, progress, onAbort }: VibratoZeroMonitorProps) {
  const [speed, setSpeed] = useState("45.8");
  const [blocks, setBlocks] = useState("1.240.892");

  // Simulate changing speed and blocks
  useEffect(() => {
    if (progress >= 100) return;
    
    const interval = setInterval(() => {
      const newSpeed = (Math.random() * 20 + 30).toFixed(1);
      setSpeed(newSpeed);
      
      const remainingBlocks = Math.floor(1240892 * (1 - progress / 100));
      setBlocks(remainingBlocks.toLocaleString('pt-BR'));
    }, 800);
    
    return () => clearInterval(interval);
  }, [progress]);

  const getAlgorithmName = (alg: string) => {
    switch(alg) {
      case 'fast': return 'Zeros (1 Pass)';
      case 'random': return 'CSPRNG (1 Pass)';
      case 'military': return 'DoD 5220.22-M (3 Passes)';
      default: return alg.toUpperCase();
    }
  };

  return (
    <div className="bg-[#050505] min-h-full p-8 flex flex-col font-sans animate-in fade-in duration-300 pb-24 overflow-y-auto">
      
      {/* 1. Status Superior */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-white text-xl font-bold uppercase tracking-tighter">
            {progress >= 100 ? "Concluído" : "Processando..."}
          </h2>
          <p className="text-[#009B3A] text-[10px] font-bold animate-pulse">
            ALGORITMO: {getAlgorithmName(algorithm)}
          </p>
        </div>
        <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
          {progress >= 100 ? (
            <IconShieldCheck className="text-[#009B3A]" size={20} />
          ) : (
            <IconActivity className="text-[#009B3A] animate-bounce" size={20} />
          )}
        </div>
      </header>

      {/* 2. Visualizador de Bits (Grid de Blocos) */}
      <div className="flex-1 grid grid-cols-10 gap-1 opacity-40 mb-10">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-[2px] transition-colors duration-500 ${
              i < progress ? 'bg-[#009B3A] shadow-[0_0_8px_#009B3A]' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* 3. Card de Progresso Central */}
      <div className="relative mb-10 p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] overflow-hidden">
        {/* Efeito de luz de fundo */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#009B3A]/20 blur-[50px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-black text-white">{Math.floor(progress)}%</span>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">
            {progress >= 100 ? "Higienização Concluída" : "Higienização em Curso"}
          </span>
          
          <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-[#009B3A] transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. Dados de Auditoria em Tempo Real */}
      <footer className="space-y-3">
        <div className="flex justify-between text-[10px] text-white/30 uppercase font-bold">
          <span>Velocidade de Escrita</span>
          <span className="text-white">{progress >= 100 ? "0.0 MB/s" : `${speed} MB/s`}</span>
        </div>
        <div className="flex justify-between text-[10px] text-white/30 uppercase font-bold">
          <span>Blocos Restantes</span>
          <span className="text-white">{progress >= 100 ? "0" : blocks}</span>
        </div>
        
        {progress < 100 && (
          <button 
            onClick={onAbort}
            className="w-full mt-6 py-4 border border-red-500/50 text-red-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
          >
            Abortar Operação
          </button>
        )}
      </footer>

    </div>
  );
}
