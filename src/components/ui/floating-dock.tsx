import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-4 p-3 rounded-2xl", className)}>
      {items.map((item) => (
        <DockIcon key={item.title} item={item} />
      ))}
    </div>
  );
};

function DockIcon({ item }: { item: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault();
          item.onClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors group"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-12 left-1/2 whitespace-pre px-3 py-1.5 rounded-md bg-[#00173A] border border-[#009B3A]/30 text-white text-xs font-bold tracking-widest shadow-xl z-50 pointer-events-none"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        {item.icon}
      </div>
    </button>
  );
}
