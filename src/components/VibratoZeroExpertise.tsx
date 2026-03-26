import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function VibratoZeroExpertise() {
  const expertise = [
    {
      quote:
        "Tecnólogo em Análise e Desenvolvimento de Sistemas (UNINOVE). Especialista em ciclo de vida de software seguro e arquitetura de sistemas escaláveis.",
      name: "Natan Dias Corrêa",
      designation: "Desenvolvedor de Software & GRC",
      src: "https://natan731-lab.github.io/assets/img/perfil.jpg", // Substitua pela sua foto do GitHub
    },
    {
      quote:
        "Certified in Cybersecurity (CC) pela (ISC)². Domínio em princípios de segurança (CIA), controle de acesso (IAM) e operações de segurança de rede.",
      name: "Cibersegurança Ofensiva/Defensiva",
      designation: "Candidato Oficial (ISC)²",
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop", // Imagem temática de código/segurança
    },
    {
      quote:
        "Especialista em conformidade com a LGPD e Governança de TI. Experiência prática em auditoria de sistemas e mitigação de riscos em infraestruturas críticas.",
      name: "Governança, Riscos e Conformidade",
      designation: "Expert em GRC & LGPD",
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=3540&auto=format&fit=crop", // Imagem temática de auditoria/documentos
    },
    {
      quote:
        "Vigilante Líder especializado em Segurança Física e Patrimonial. Primeira camada de defesa com foco em controle de acesso e gestão de crises.",
      name: "Segurança Física e Resiliência",
      designation: "Liderança de Equipe & Gestão de Crise",
      src: "https://images.unsplash.com/photo-1557597774-9d2739f85a7c?q=80&w=3540&auto=format&fit=crop", // Imagem temática de monitoramento/vigilância
    },
    {
      quote:
        "Habilitação Profissional Técnica em Química. Mentalidade analítica voltada para o controle de qualidade, normas técnicas e rigor laboratorial.",
      name: "Rigor Analítico & Qualidade",
      designation: "Técnico em Química (Etec)",
      src: "https://images.unsplash.com/photo-1532187875460-1454f7764acd?q=80&w=3540&auto=format&fit=crop", // Imagem temática de laboratório
    },
  ];

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl py-6 shadow-2xl">
      <h2 className="text-[#009B3A] text-center text-xl font-bold mb-2 uppercase tracking-widest">
        Perito Responsável
      </h2>
      <AnimatedTestimonials testimonials={expertise} />
    </div>
  );
}
