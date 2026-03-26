import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function VibratoZeroOnboarding({ onComplete }: { onComplete: () => void }) {
  const steps = [
    {
      quote:
        "Você sabia que arquivos excluídos no celular continuam no disco? Eles ficam invisíveis, mas podem ser recuperados por softwares de perícia. O Vibrato Zero resolve isso.",
      name: "Privacidade Real",
      designation: "O Problema do Lixo Digital",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=3540&auto=format&fit=crop", // Imagem de dados digitais
    },
    {
      quote:
        "Nossa tecnologia utiliza algoritmos de sobrescrita (Wiping). Nós preenchemos o espaço vazio com bits aleatórios, tornando os dados antigos irrecuperáveis.",
      name: "Tecnologia de Wiping",
      designation: "Como o App Protege Você",
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=3540&auto=format&fit=crop", // Imagem de servidores/bits
    },
    {
      quote:
        "Ideal para quem vai vender o celular, descartar o aparelho ou precisa estar em conformidade com a LGPD. Proteja suas fotos, senhas e documentos permanentemente.",
      name: "Conformidade GRC",
      designation: "Segurança e Lei (LGPD)",
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=3540&auto=format&fit=crop", // Imagem de balança/justiça
    },
    {
      quote:
        "Ao final de cada limpeza, geramos um Hash SHA-256. É a sua prova digital de que a sanitização foi concluída com sucesso e rigor militar.",
      name: "Auditoria de Hashes",
      designation: "Integridade de Dados",
      src: "https://images.unsplash.com/photo-1633265485768-3c6808931f3e?q=80&w=3540&auto=format&fit=crop", // Imagem de cadeado digital
    },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <header className="mb-10 text-center">
          <h1 className="text-[#009B3A] text-3xl font-extrabold uppercase tracking-tighter">
            Bem-vindo ao Vibrato Zero
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Entenda por que a sua segurança começa no espaço livre.
          </p>
        </header>

        <AnimatedTestimonials testimonials={steps} />

        <div className="mt-12 flex justify-center">
          <button 
            onClick={onComplete}
            className="bg-[#009B3A] hover:bg-[#007F3A] text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-green-900/20 uppercase tracking-widest active:scale-95"
          >
            Entendi, Prosseguir para Login
          </button>
        </div>
      </div>
    </div>
  );
}
