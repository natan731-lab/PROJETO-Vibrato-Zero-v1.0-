import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconShieldCheck,
  IconFingerprint,
  IconClipboardList,
  IconUserShield,
  IconDeviceMobile,
  IconBrandGithub,
} from "@tabler/icons-react";

export function VibratoZeroDock({ setView, currentView }: { setView: (view: any) => void, currentView: string }) {
  const links = [
    {
      title: "Status",
      icon: <IconShieldCheck className={`h-full w-full ${currentView === 'dashboard' ? 'text-[#009B3A]' : 'text-neutral-400'}`} />,
      href: "#dashboard",
      onClick: () => setView('dashboard')
    },
    {
      title: "Wipe Mode",
      icon: <IconFingerprint className={`h-full w-full ${currentView === 'algorithms' ? 'text-[#009B3A]' : 'text-neutral-400'}`} />,
      href: "#algoritmos",
      onClick: () => setView('algorithms')
    },
    {
      title: "Logs GRC",
      icon: <IconClipboardList className={`h-full w-full ${currentView === 'audit' ? 'text-[#009B3A]' : 'text-neutral-400'}`} />,
      href: "#auditoria",
      onClick: () => setView('audit')
    },
    {
      title: "Natan (Dev)",
      icon: <IconUserShield className={`h-full w-full ${currentView === 'about' ? 'text-[#009B3A]' : 'text-[#002776]'}`} />,
      href: "#sobre",
      onClick: () => setView('about')
    },
    {
      title: "Hardware",
      icon: <IconDeviceMobile className={`h-full w-full ${currentView === 'hardware' ? 'text-[#009B3A]' : 'text-neutral-400'}`} />,
      href: "#dispositivo",
      onClick: () => setView('hardware')
    },
    {
      title: "Source",
      icon: <IconBrandGithub className="h-full w-full text-neutral-400" />,
      href: "https://natan731-lab.github.io",
      onClick: () => window.open("https://natan731-lab.github.io", "_blank")
    },
  ];

  return (
    <div className="flex items-center justify-center fixed bottom-6 w-full z-50 px-4">
      <FloatingDock
        items={links}
        className="bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,155,58,0.15)]"
      />
    </div>
  );
}
