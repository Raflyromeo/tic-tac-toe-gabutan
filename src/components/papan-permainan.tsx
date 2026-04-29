"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KotakProps {
  nilai: "X" | "O" | null;
  klik: () => void;
  apakahMenang: boolean;
  mati: boolean;
}

const Kotak = ({ nilai, klik, apakahMenang, mati }: KotakProps) => {
  const kosong = nilai === null;
  return (
    <motion.button
      whileHover={!mati && kosong ? { scale: 0.95, y: -2 } : {}}
      whileTap={!mati && kosong ? { scale: 0.9 } : {}}
      onClick={klik}
      disabled={mati || !kosong}
      className={cn(
        "relative flex aspect-square w-full items-center justify-center border-[3px] border-black dark:border-white transition-all duration-150 rounded-none",
        "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]",

        kosong && !mati && "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        kosong && mati && "bg-white dark:bg-slate-900 opacity-50 cursor-not-allowed",

        apakahMenang && "!bg-[#FFE135] dark:!bg-yellow-400 scale-105 z-10 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",

        nilai === "X" && "bg-[#3CC2FF]",
        nilai === "O" && "bg-[#FF5FC9]"
      )}
    >
      {nilai === "X" && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex items-center justify-center w-full h-full"
        >
          <X className="w-[55%] h-[55%] text-white" strokeWidth={4} />
        </motion.div>
      )}
      {nilai === "O" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex items-center justify-center w-full h-full"
        >
          <Circle className="w-[45%] h-[45%] text-white" strokeWidth={5} />
        </motion.div>
      )}
    </motion.button>
  );
};

interface PapanProps {
  kotak: ("X" | "O" | null)[];
  klikKotak: (i: number) => void;
  garisMenang: number[] | null;
  mati: boolean;
}

export const PapanPermainan = ({ kotak, klikKotak, garisMenang, mati }: PapanProps) => {
  return (
    <div className="w-full aspect-square max-w-[380px] mx-auto">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-3 w-full h-full bg-white/10 dark:bg-black/20 border-[3px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.08)]">
        {kotak.map((n, i) => (
          <Kotak
            key={i}
            nilai={n}
            klik={() => klikKotak(i)}
            apakahMenang={garisMenang?.includes(i) ?? false}
            mati={mati}
          />
        ))}
      </div>
    </div>
  );
};
