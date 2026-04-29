"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, RotateCcw, Globe, ArrowLeft, Plus, Hash, AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { PapanPermainan } from "./papan-permainan";
import { usePermainan, Pemain } from "@/hooks/use-permainan";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Skeleton } from "@/components/ui/skeleton";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";



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
    <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase italic mb-5">
      {pemenang === "seri" ? "SERI!" : `${pemenang} MENANG!`}
    </h2>
    <Button
      onClick={onReset}
      size="lg"
      className="h-12 px-8 bg-white hover:bg-slate-100 text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-black text-lg uppercase italic rounded-none transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    >
      <RotateCcw className="h-4 w-4 mr-2" strokeWidth={3} /> MAIN LAGI?
    </Button>
  </motion.div>
);



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
      "flex-1 flex items-center justify-center px-3 py-2 border-[3px] border-black dark:border-white transition-all duration-200 font-black uppercase italic text-sm",
      active
        ? "translate-x-[-2px] translate-y-[-2px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-black dark:text-black"
        : "bg-white dark:bg-slate-800 opacity-40 text-black dark:text-white"
    )}
    style={active ? { backgroundColor: color } : {}}
  >
    {label}
  </div>
);



const RuanganPanel = ({
  terhubung,
  sudahGabung,
  namaPengguna,
  setNamaPengguna,
  kodeRuangan,
  setKodeRuangan,
  sedangLoading,
  simbolPemain,
  onBikin,
  onGabung,
  onKeluar,
}: {
  terhubung: boolean;
  sudahGabung: boolean;
  namaPengguna: string;
  setNamaPengguna: (v: string) => void;
  kodeRuangan: string;
  setKodeRuangan: (v: string) => void;
  sedangLoading: boolean;
  simbolPemain: Pemain;
  onBikin: () => void;
  onGabung: () => void;
  onKeluar: () => void;
}) => (
  <Card className="border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] rounded-none">
    <CardHeader className="pb-3 border-b-[3px] border-black dark:border-white">
      <CardTitle className="text-base sm:text-lg font-black uppercase italic flex items-center gap-2 text-black dark:text-white">
        <Globe className="h-4 w-4 sm:h-5 sm:w-5" /> Ruangan
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">

      {!terhubung ? (
        <div className="p-4 border-[3px] border-black dark:border-white bg-yellow-100 dark:bg-yellow-900/30 flex flex-col items-center gap-2 text-center">
          <AlertTriangle className="h-7 w-7 text-yellow-600 dark:text-yellow-400 animate-pulse" strokeWidth={3} />
          <p className="text-xs font-black uppercase text-yellow-800 dark:text-yellow-200">
            Server Offline
            <br />
            <span className="text-[10px]">Cek backend Python kamu!</span>
          </p>
        </div>


      ) : !sudahGabung ? (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Nama Kamu
            </label>
            <Input
              placeholder="Masukkan nama"
              value={namaPengguna}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNamaPengguna(e.target.value)}
              className="border-[3px] border-black dark:border-white font-bold h-11 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 rounded-none text-black dark:text-white bg-white dark:bg-slate-800"
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBikin}
              disabled={!namaPengguna}
              className="w-full h-11 bg-[#FFE135] hover:bg-yellow-400 text-black border-[3px] border-black dark:border-white font-black text-base uppercase italic shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-1.5" strokeWidth={3} /> Bikin Ruangan
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-[2px] bg-black dark:bg-white" />
              <span className="text-[10px] font-black uppercase italic text-black dark:text-white">Atau Gabung</span>
              <div className="flex-1 h-[2px] bg-black dark:bg-white" />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Kode Ruangan"
                value={kodeRuangan}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKodeRuangan(e.target.value.toUpperCase())}
                className="border-[3px] border-black dark:border-white font-mono font-bold h-11 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none text-black dark:text-white bg-white dark:bg-slate-800 uppercase focus-visible:ring-0"
              />
              <Button
                onClick={onGabung}
                disabled={!namaPengguna || !kodeRuangan}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 border-[3px] border-black dark:border-white font-black uppercase italic h-11 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 rounded-none px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                GABUNG
              </Button>
            </div>
          </div>
        </div>


      ) : sedangLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full border-[3px] border-black dark:border-white rounded-none bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-10 w-full border-[3px] border-black dark:border-white rounded-none bg-slate-200 dark:bg-slate-700" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 border-[3px] border-black dark:border-white bg-blue-50 dark:bg-blue-900/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase italic text-slate-500 dark:text-slate-400">Kode Ruangan</span>
              <Badge className="bg-black dark:bg-white text-white dark:text-black font-mono text-base px-3 py-0.5 rounded-none border-[2px] border-black dark:border-white">
                {kodeRuangan || "???"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase italic text-slate-500 dark:text-slate-400">Kamu Bermain Sebagai</span>
              <Badge
                className={cn(
                  "text-white font-black uppercase italic px-3 py-0.5 rounded-none border-[2px] border-black",
                  simbolPemain === "X" ? "bg-[#3CC2FF]" : "bg-[#FF5FC9]"
                )}
              >
                Pemain {simbolPemain || "..."}
              </Badge>
            </div>
          </div>
          <Button
            className="w-full h-10 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white font-black uppercase italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 rounded-none text-black dark:text-white text-sm"
            onClick={onKeluar}
          >
            Keluar Ruangan
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);

const InfoTandingPanel = ({
  giliranX,
  giliranSaya,
  sudahGabung,
}: {
  giliranX: boolean;
  giliranSaya: boolean;
  sudahGabung: boolean;
}) => (
  <Card className="border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] rounded-none">
    <CardHeader className="pb-2 border-b-[3px] border-black dark:border-white">
      <CardTitle className="text-sm font-black uppercase italic flex items-center gap-2 text-black dark:text-white">
        <Hash className="h-4 w-4" /> Info Tanding
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4 flex flex-col gap-4 text-center">
      <div className="flex flex-col items-center justify-center p-5 border-[3px] border-black dark:border-white bg-slate-50 dark:bg-slate-800">
        <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-2">
          Giliran Siapa?
        </span>
        <div className="text-6xl font-black uppercase italic">
          {giliranX ? (
            <span className="text-[#3CC2FF] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">X</span>
          ) : (
            <span className="text-[#FF5FC9] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">O</span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "p-3 border-[3px] border-black dark:border-white font-black uppercase italic text-xs transition-all duration-300",
          giliranSaya
            ? "bg-green-300 dark:bg-green-900/50 text-green-900 dark:text-green-100 animate-pulse"
            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        )}
      >
        {sudahGabung ? (giliranSaya ? "GILIRAN KAMU!" : "GILIRAN MUSUH...") : "BELUM GABUNG"}
      </div>
    </CardContent>
  </Card>
);



export const PermainanMabar = () => {
  const game = usePermainan();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [kodeRuangan, setKodeRuangan] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [sudahGabung, setSudahGabung] = useState(false);
  const [simbolPemain, setSimbolPemain] = useState<Pemain>(null);
  const [sedangLoading, setSedangLoading] = useState(false);
  const [terhubung, setTerhubung] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { reconnectionAttempts: 5, timeout: 5000 });
    setSocket(newSocket);

    newSocket.on("connect", () => setTerhubung(true));
    newSocket.on("disconnect", () => setTerhubung(false));
    newSocket.on("room_state", (state) => {
      game.setPapan(state.board);
      game.setGiliranX(state.isXNext);
      setSedangLoading(false);
    });
    newSocket.on("player_info", (info) => setSimbolPemain(info.symbol));
    newSocket.on("move_made", (state) => {
      game.setPapan(state.board);
      game.setGiliranX(state.isXNext);
    });
    newSocket.on("game_reset", (state) => {
      game.setPapan(state.board);
      game.setGiliranX(state.isXNext);
    });

    return () => { newSocket.disconnect(); };
  }, []);

  const handleGabung = () => {
    if (socket && kodeRuangan && namaPengguna && terhubung) {
      setSedangLoading(true);
      socket.emit("join_room", { room: kodeRuangan, username: namaPengguna });
      setSudahGabung(true);
      setTimeout(() => setSedangLoading(false), 2000);
    }
  };

  const handleBikin = () => {
    if (socket && namaPengguna && terhubung) {
      setSedangLoading(true);
      const idBaru = Math.random().toString(36).substring(2, 8).toUpperCase();
      setKodeRuangan(idBaru);
      socket.emit("join_room", { room: idBaru, username: namaPengguna });
      setSudahGabung(true);
      setTimeout(() => setSedangLoading(false), 2000);
    }
  };

  const handleLangkah = (indeks: number) => {
    if (socket && sudahGabung && simbolPemain && terhubung) {
      const giliranSekarang = game.giliranX ? "X" : "O";
      if (simbolPemain === giliranSekarang) {
        socket.emit("make_move", { room: kodeRuangan, index: indeks, symbol: simbolPemain });
      }
    }
  };

  const handleReset = () => {
    if (socket && sudahGabung && terhubung) {
      socket.emit("reset_game", { room: kodeRuangan });
    }
  };

  const giliranSaya =
    (game.giliranX && simbolPemain === "X") || (!game.giliranX && simbolPemain === "O");

  return (
    <div className="relative flex min-h-screen flex-col bg-[#FF5FC9] dark:bg-slate-950 overflow-hidden transition-colors duration-500">
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
            <ArrowLeft className="h-3 w-3 mr-1.5" strokeWidth={3} /> MENU UTAMA
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase italic">
            MABAR ONLINE
          </h1>
          <div className="inline-block self-start px-3 py-0.5 bg-[#3CC2FF] border-[3px] border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-white text-xs font-black uppercase italic">PVP Real-Time</p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] gap-4 sm:gap-6 items-start">


          <div className="order-3 lg:order-1">
            <RuanganPanel
              terhubung={terhubung}
              sudahGabung={sudahGabung}
              namaPengguna={namaPengguna}
              setNamaPengguna={setNamaPengguna}
              kodeRuangan={kodeRuangan}
              setKodeRuangan={setKodeRuangan}
              sedangLoading={sedangLoading}
              simbolPemain={simbolPemain}
              onBikin={handleBikin}
              onGabung={handleGabung}
              onKeluar={() => setSudahGabung(false)}
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
                  klikKotak={handleLangkah}
                  garisMenang={game.garisMenang}
                  mati={!!game.pemenang || !sudahGabung || !giliranSaya || sedangLoading}
                />
                {game.pemenang && (
                  <PemenangOverlay pemenang={game.pemenang} onReset={handleReset} />
                )}
              </motion.div>
            </AnimatePresence>


            <div className="flex gap-3 w-full max-w-[380px]">
              <TurnBadge label="Player X" active={game.giliranX} color="#3CC2FF" />
              <TurnBadge label="Player O" active={!game.giliranX} color="#FF5FC9" />
            </div>
          </div>


          <div className="order-2 lg:order-3">
            <InfoTandingPanel
              giliranX={game.giliranX}
              giliranSaya={giliranSaya}
              sudahGabung={sudahGabung}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
