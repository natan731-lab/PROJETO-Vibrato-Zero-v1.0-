import React from "react";
import { IconBolt, IconArrowsShuffle, IconShieldCheckered, IconInfoCircle } from "@tabler/icons-react";

type AlgorithmType = 'fast' | 'random' | 'military';

interface VibratoZeroAlgorithmsProps {
  currentAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  onConfirm: () => void;
}

export function VibratoZeroAlgorithms({ currentAlgorithm, onSelectAlgorithm, onConfirm }: VibratoZeroAlgorithmsProps) {
  const algorithms = [
    {
      id: "fast" as AlgorithmType,
      title: "Rápido (Zeros)",
      desc: "Uma única passagem preenchendo o espaço livre com 0x00. Ideal para uso diário.",
      icon: <IconBolt className="text-green-400" />,
      level: "Nível 1 - Básico",
      color: "border-green-500/30",
      activeColor: "border-green-500 bg-green-500/10"
    },
    {
      id: "random" as AlgorithmType,
      title: "Aleatório (CSPRNG)",
      desc: "Sobrescreve com bits aleatórios criptograficamente seguros. Dificulta a perícia.",
      icon: <IconArrowsShuffle className="text-blue-400" />,
      level: "Nível 2 - Avançado",
      color: "border-blue-500/30",
      activeColor: "border-blue-500 bg-blue-500/10"
    },
    {
      id: "military" as AlgorithmType,
      title: "Militar (DoD 5220.22-M)",
      desc: "Padrão do Departamento de Defesa dos EUA. 3 passagens completas de sanitização.",
      icon: <IconShieldCheckered className="text-yellow-500" />,
      level: "Nível 3 - Governamental",
      color: "border-yellow-500/50",
      activeColor: "border-yellow-500 bg-yellow-500/10"
    }
  ];

  return (
    <div className="bg-[#050505] min-h-full p-8 font-sans animate-in fade-in duration-300 pb-24 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-white text-2xl font-bold">Método de Limpeza</h2>
        <p className="text-white/40 text-sm mt-1">Escolha o rigor da destruição dos dados</p>
      </header>

      <div className="space-y-4">
        {algorithms.map((algo) => {
          const isActive = currentAlgorithm === algo.id;
          return (
            <div 
              key={algo.id}
              onClick={() => onSelectAlgorithm(algo.id)}
              className={`p-5 rounded-2xl bg-white/5 backdrop-blur-lg border transition-all cursor-pointer group ${isActive ? algo.activeColor : algo.color} hover:bg-white/10`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-black/40 rounded-xl">
                  {algo.icon}
                </div>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  {algo.level}
                </span>
              </div>
              
              <h3 className="text-white font-semibold mt-4 text-lg">{algo.title}</h3>
              <p className="text-white/50 text-xs mt-2 leading-relaxed">
                {algo.desc}
              </p>
              
              <div className={`mt-4 flex items-center gap-2 text-[10px] font-bold uppercase ${isActive ? 'text-white' : 'text-[#009B3A]'}`}>
                <IconInfoCircle size={14} />
                Recomendado para GRC/LGPD
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-10">
        <button 
          onClick={onConfirm}
          className="w-full bg-[#009B3A] hover:bg-[#007F3A] text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-green-900/20 active:scale-95 transition-all"
        >
          Confirmar Algoritmo
        </button>
      </footer>
    </div>
  );
}
