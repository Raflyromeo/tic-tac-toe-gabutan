"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info, X,
  MousePointer2, Trophy, Shield, Zap
} from 'lucide-react';
import { cn } from "@/lib/utils";

const IkonGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IkonLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IkonInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ModalInfo() {
  const [buka, setBuka] = useState(false);

  const aturan = [
    {
      icon: <MousePointer2 className="w-4 h-4 text-black" />,
      bg: "bg-[#3CC2FF]",
      judul: "Cara Main",
      deskripsi: "Klik kotak kosong mana saja di papan untuk menaruh simbol kamu (X atau O).",
    },
    {
      icon: <Trophy className="w-4 h-4 text-black" />,
      bg: "bg-[#FFE135]",
      judul: "Gimana Menangnya?",
      deskripsi: "Berhasil buat garis sejajar 3 simbol (mendatar, tegak, atau miring)? Kamu pemenangnya!",
    },
    {
      icon: <Shield className="w-4 h-4 text-black" />,
      bg: "bg-[#FF5FC9]",
      judul: "Lawan Bot",
      deskripsi: "Arena Bot punya 3 level. Level 'Sulit' pake algoritma Minimax—bot ini hampir mustahil dikalahin!",
    },
    {
      icon: <Zap className="w-4 h-4 text-black" />,
      bg: "bg-[#FFE135]",
      judul: "Mabar Online",
      deskripsi: "Gunakan mode Mabar Online buat main bareng temen real-time pake kode ruangan unik.",
    },
  ];

  return (
    <>
      <button
        onClick={() => setBuka(true)}
        className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
        aria-label="Info Game"
      >
        <Info className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white" strokeWidth={3} />
      </button>

      <AnimatePresence>
        {buka && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setBuka(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] flex flex-col max-h-[90dvh] overflow-hidden rounded-none"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b-4 border-black dark:border-white bg-[#FF5FC9]">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    PANDUAN GAME
                  </h2>
                  <p className="text-white font-bold text-xs uppercase tracking-widest mt-1">TIC TAC TOE PRO</p>
                </div>
                <button
                  onClick={() => setBuka(false)}
                  className="p-2 bg-white dark:bg-slate-800 border-4 border-black dark:border-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <X className="w-6 h-6 text-black dark:text-white" strokeWidth={3} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 bg-white dark:bg-slate-900">
                <div className="p-4 border-4 border-black dark:border-white bg-[#3CC2FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                  <p className="text-black font-black text-sm leading-relaxed uppercase italic">
                    "Projek Gabut Buatan <span className="underline decoration-4">Rafly Romeo</span>"
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Tata Cara Bermain</h3>
                  <div className="grid gap-3">
                    {aturan.map((rule, i) => (
                      <div
                        key={i}
                        className={cn("flex items-start gap-4 p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]", rule.bg)}
                      >
                        <div className="mt-0.5 shrink-0 p-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-white">
                          {rule.icon}
                        </div>
                        <div>
                          <p className="text-black font-black text-sm uppercase italic leading-none">{rule.judul}</p>
                          <p className="text-black/80 text-xs font-bold mt-2 leading-relaxed">{rule.deskripsi}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t-4 border-black dark:border-white">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Hubungi Pengembang</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href="https://linkedin.com/in/muhammadraflyromeonasution"
                      target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-[#0077B5] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all group"
                    >
                      <div className="text-white group-hover:scale-110 transition-transform">
                        <IkonLinkedin />
                      </div>
                      <span className="text-white font-black text-[10px] uppercase italic">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/Raflyromeo/raflyromeo"
                      target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-black dark:bg-slate-950 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all group"
                    >
                      <div className="text-white group-hover:scale-110 transition-transform">
                        <IkonGithub />
                      </div>
                      <span className="text-white font-black text-[10px] uppercase italic">GitHub</span>
                    </a>
                    <a
                      href="https://instagram.com/rfly.romeo_"
                      target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-[#E4405F] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all group"
                    >
                      <div className="text-white group-hover:scale-110 transition-transform">
                        <IkonInstagram />
                      </div>
                      <span className="text-white font-black text-[10px] uppercase italic">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
