"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Code2, Monitor, Users, X, Circle } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { PilihTema } from "@/components/pilih-tema";
import ModalInfo from "@/components/modal-info";
import { ModeCard } from "@/components/mode-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#3CC2FF] dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <GridPattern
        width={40}
        height={40}
        className="opacity-10 dark:opacity-5 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />


      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex gap-2 sm:gap-3 z-50">
        <ModalInfo />
        <PilihTema />
      </div>


      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-8 sm:gap-10 px-4 py-16 sm:py-20">


        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-1.5 bg-[#FFE135] px-4 py-2 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] -rotate-2">
            <X className="h-6 w-6 sm:h-8 sm:w-8 text-black" strokeWidth={4} />
            <Circle className="h-5 w-5 sm:h-7 sm:w-7 text-black" strokeWidth={5} />
            <X className="h-6 w-6 sm:h-8 sm:w-8 text-black" strokeWidth={4} />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase italic leading-none">
            TIC TAC TOE
          </h1>

          <div className="inline-block px-3 py-1 bg-[#FF5FC9] border-[3px] border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            <p className="text-white text-xs sm:text-sm font-black uppercase italic tracking-widest">
              EDISI SPESIAL MABAR!
            </p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
          <ModeCard
            title="ARENA BOT"
            description="Uji kemampuan kamu melawan AI super cerdik dengan 3 tingkat kesulitan. Berani coba?"
            href="/lawan-bot"
            buttonLabel="MAIN SENDIRI"
            buttonColor="#3CC2FF"
            buttonHoverColor="#2fb1f0"
            iconBg="#3CC2FF"
            Icon={Monitor}
            delay={0.2}
            animateDir="left"
          />
          <ModeCard
            title="MABAR ONLINE"
            description="Bikin ruangan, bagiin kode, dan ajak teman kamu duel real-time dari mana saja!"
            href="/mabar"
            buttonLabel="MULAI MABAR"
            buttonColor="#FF5FC9"
            buttonHoverColor="#f04eb8"
            iconBg="#FF5FC9"
            Icon={Users}
            delay={0.3}
            animateDir="right"
          />
        </div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-white dark:text-white/60 font-black uppercase italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <Code2 className="h-4 w-4" />
          <span className="text-xs sm:text-sm">PROYEK GABUT BUATAN RAFLY ROMEO</span>
          <Code2 className="h-4 w-4" />
        </motion.div>
      </div>
    </main>
  );
}
