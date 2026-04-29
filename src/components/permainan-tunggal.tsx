"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Settings2, ArrowLeft, Bot } from "lucide-react";
import Link from "next/link";
import { PapanPermainan } from "./papan-permainan";
import { usePermainan, Kesulitan } from "@/hooks/use-permainan";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";



const TurnBadge = ({
  label,
  active,
  color,
}: {
  label: string;
  active: boolean;
  color: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-center px-4 py-2 border-[3px] border-black dark:border-white transition-all duration-200 font-black uppercase italic text-sm sm:text-base",
      active
        ? "translate-x-[-2px] translate-y-[-2px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-black dark:text-black"
        : "bg-white dark:bg-slate-800 opacity-40 text-black dark:text-white shadow-none"
    )}
    style={active ? { backgroundColor: color } : {}}
  >
    {label}
  </div>
);

const PemenangOverlay = ({
  pemenang,
  onReset,
}: {
  pemenang: string;
  onReset: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm z-20 p-6 text-center border-[3px] border-black dark:border-white"
  >
    <div className="bg-[#FFE135] p-3 sm:p-4 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4 animate-bounce">
      <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-black" />
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase italic mb-5">
      {pemenang === "seri" ? "SERI!" : `${pemenang} MENANG!`}
    </h2>
    <Button
      onClick={onReset}
      size="lg"
      className="h-12 px-8 bg-white hover:bg-slate-100 text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-black text-lg uppercase italic rounded-none transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    >
      <RotateCcw className="h-4 w-4 mr-2" strokeWidth={3} /> LAGI?
    </Button>
  </motion.div>
);



const PengaturanPanel = ({
  kesulitan,
  setKesulitan,
  onReset,
}: {
  kesulitan: Kesulitan;
  setKesulitan: (k: Kesulitan) => void;
  onReset: () => void;
}) => (
  <div className="flex flex-col gap-4">
    <Card className="border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] rounded-none">
      <CardHeader className="pb-3 border-b-[3px] border-black dark:border-white">
        <CardTitle className="text-base sm:text-lg font-black uppercase italic flex items-center gap-2 text-black dark:text-white">
          <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" /> Pengaturan
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Tingkat Kesulitan
          </label>

          <Select value={kesulitan} onValueChange={(val) => setKesulitan(val as Kesulitan)}>
            <SelectTrigger className="border-[3px] border-black dark:border-white font-bold h-11 rounded-none bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-0 focus:ring-offset-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <SelectValue placeholder="Pilih Kesulitan" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent 
                side="bottom" 
                sideOffset={8}
                className="border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white dark:bg-slate-800 z-[200]"
              >
                <SelectItem value="mudah" className="font-bold text-black dark:text-white focus:bg-[#3CC2FF] focus:text-white">
                  Mudah (Random)
                </SelectItem>
                <SelectItem value="sedang" className="font-bold text-black dark:text-white focus:bg-[#FF5FC9] focus:text-white">
                  Sedang (Lumayan)
                </SelectItem>
                <SelectItem value="sulit" className="font-bold text-black dark:text-white focus:bg-[#FFE135] focus:text-black">
                  Sulit (Minimax)
                </SelectItem>
              </SelectContent>
            </SelectPortal>
          </Select>
        </div>
      </CardContent>
    </Card>

    <Button
      className="w-full h-11 rounded-none bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] font-black uppercase italic text-black dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
      onClick={onReset}
    >
      <RotateCcw className="h-4 w-4 mr-2" strokeWidth={3} />
      ULANG PAPAN
    </Button>
  </div>
);



const StatusBotPanel = ({
  botBerpikir,
  giliranX,
  pemenang,
}: {
  botBerpikir: boolean;
  giliranX: boolean;
  pemenang: string | null;
}) => (
  <Card className="border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] rounded-none">
    <CardHeader className="pb-2 border-b-[3px] border-black dark:border-white">
      <CardTitle className="text-sm font-black uppercase italic text-black dark:text-white flex items-center gap-2">
        <Bot className="h-4 w-4" /> Status Bot
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="flex flex-col items-center justify-center p-5 border-[3px] border-black dark:border-white bg-slate-50 dark:bg-slate-800 min-h-[100px]">
        {botBerpikir ? (
          <div className="space-y-3 w-full flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full border-2 border-black dark:border-white bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-3 w-3/4 border-2 border-black dark:border-white bg-slate-200 dark:bg-slate-700" />
            <p className="text-[10px] font-black uppercase text-[#3CC2FF] animate-pulse">
              Bot lagi mikir...
            </p>
          </div>
        ) : (
          <>
            <Bot
              className={cn(
                "h-10 w-10 mb-2 transition-all",
                !giliranX && !pemenang ? "text-[#FF5FC9] animate-bounce" : "text-slate-400"
              )}
            />
            <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 text-center">
              {!giliranX && !pemenang ? "Giliran Bot" : "Nunggu kamu..."}
            </p>
          </>
        )}
      </div>
    </CardContent>
  </Card>
);



export const PermainanTunggal = () => {
  const game = usePermainan();

  return (
    <div className="relative flex min-h-screen flex-col bg-[#3CC2FF] dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <GridPattern
        width={40}
        height={40}
        className="opacity-10 dark:opacity-5 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-6">


        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-2"
        >
          <Link
            href="/"
            className="self-start inline-flex items-center px-3 py-1.5 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase italic hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200 text-black dark:text-white"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5" strokeWidth={3} /> KEMBALI
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase italic">
            ARENA BOT
          </h1>
          <div className="inline-block self-start px-3 py-0.5 bg-[#FF5FC9] border-[3px] border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-white text-xs font-black uppercase italic">Mode Single Player</p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] gap-4 sm:gap-6 items-start">


          <div className="order-3 lg:order-1">
            <PengaturanPanel
              kesulitan={game.kesulitan}
              setKesulitan={game.setKesulitan}
              onReset={game.resetPermainan}
            />
          </div>


          <div className="order-1 lg:order-2 flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={game.pemenang || "playing"}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full"
              >
                <PapanPermainan
                  kotak={game.papan}
                  klikKotak={game.buatLangkah}
                  garisMenang={game.garisMenang}
                  mati={!!game.pemenang || game.botBerpikir}
                />
                {game.pemenang && (
                  <PemenangOverlay
                    pemenang={game.pemenang}
                    onReset={game.resetPermainan}
                  />
                )}
              </motion.div>
            </AnimatePresence>


            <div className="flex gap-3 w-full max-w-[380px]">
              <TurnBadge label="KAMU (X)" active={game.giliranX} color="#3CC2FF" />
              <TurnBadge label="BOT (O)" active={!game.giliranX} color="#FF5FC9" />
            </div>
          </div>


          <div className="order-2 lg:order-3">
            <StatusBotPanel
              botBerpikir={game.botBerpikir}
              giliranX={game.giliranX}
              pemenang={game.pemenang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
