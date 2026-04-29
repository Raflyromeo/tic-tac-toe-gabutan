"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type Pemain = "X" | "O" | null;
export type ModePermainan = "single" | "multiplayer";
export type Kesulitan = "mudah" | "sedang" | "sulit";

const KOMBINASI_MENANG = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const usePermainan = () => {
  const [papan, setPapan] = useState<Pemain[]>(Array(9).fill(null));
  const [giliranX, setGiliranX] = useState(true);
  const [pemenang, setPemenang] = useState<Pemain | "seri">(null);
  const [garisMenang, setGarisMenang] = useState<number[] | null>(null);
  const [mode, setMode] = useState<ModePermainan>("single");
  const [kesulitan, setKesulitan] = useState<Kesulitan>("sulit");
  const [botBerpikir, setBotBerpikir] = useState(false);
  const botMoving = useRef(false);

  const cekPemenang = useCallback((papanSekarang: Pemain[]) => {
    for (const combo of KOMBINASI_MENANG) {
      const [a, b, c] = combo;
      if (papanSekarang[a] && papanSekarang[a] === papanSekarang[b] && papanSekarang[a] === papanSekarang[c]) {
        return { pemenang: papanSekarang[a], garis: combo };
      }
    }
    if (papanSekarang.every((cell) => cell !== null)) {
      return { pemenang: "seri" as const, garis: null };
    }
    return { pemenang: null, garis: null };
  }, []);

  const buatLangkah = useCallback((indeks: number) => {
    if (papan[indeks] || pemenang) return;

    const papanBaru = [...papan];
    papanBaru[indeks] = giliranX ? "X" : "O";
    setPapan(papanBaru);
    setGiliranX(!giliranX);

    const hasil = cekPemenang(papanBaru);
    if (hasil.pemenang) {
      setPemenang(hasil.pemenang);
      setGarisMenang(hasil.garis);
    }
  }, [papan, giliranX, pemenang, cekPemenang]);

  const minimax = useCallback((papanTemp: Pemain[], depth: number, isMaximizing: boolean): number => {
    const hasil = cekPemenang(papanTemp);
    if (hasil.pemenang === "O") return 10 - depth;
    if (hasil.pemenang === "X") return depth - 10;
    if (hasil.pemenang === "seri") return 0;

    if (isMaximizing) {
      let skorTerbaik = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (papanTemp[i] === null) {
          papanTemp[i] = "O";
          const skor = minimax(papanTemp, depth + 1, false);
          papanTemp[i] = null;
          skorTerbaik = Math.max(skor, skorTerbaik);
        }
      }
      return skorTerbaik;
    } else {
      let skorTerbaik = Infinity;
      for (let i = 0; i < 9; i++) {
        if (papanTemp[i] === null) {
          papanTemp[i] = "X";
          const skor = minimax(papanTemp, depth + 1, true);
          papanTemp[i] = null;
          skorTerbaik = Math.min(skor, skorTerbaik);
        }
      }
      return skorTerbaik;
    }
  }, [cekPemenang]);

  const ambilLangkahBot = useCallback(() => {
    const langkahTersedia = papan.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    if (langkahTersedia.length === 0) return -1;

    if (kesulitan === "mudah") {
      return langkahTersedia[Math.floor(Math.random() * langkahTersedia.length)];
    }

    if (kesulitan === "sedang") {
      if (Math.random() > 0.5) {
        let skorTerbaik = -Infinity;
        let langkah = -1;
        const papanSalinan = [...papan];
        for (let i = 0; i < 9; i++) {
          if (papanSalinan[i] === null) {
            papanSalinan[i] = "O";
            const skor = minimax(papanSalinan, 0, false);
            papanSalinan[i] = null;
            if (skor > skorTerbaik) {
              skorTerbaik = skor;
              langkah = i;
            }
          }
        }
        return langkah !== -1 ? langkah : langkahTersedia[0];
      }
      return langkahTersedia[Math.floor(Math.random() * langkahTersedia.length)];
    }

    let skorTerbaik = -Infinity;
    let langkah = -1;
    const papanSalinan = [...papan];
    for (let i = 0; i < 9; i++) {
      if (papanSalinan[i] === null) {
        papanSalinan[i] = "O";
        const skor = minimax(papanSalinan, 0, false);
        papanSalinan[i] = null;
        if (skor > skorTerbaik) {
          skorTerbaik = skor;
          langkah = i;
        }
      }
    }
    return langkah !== -1 ? langkah : langkahTersedia[0];
  }, [papan, kesulitan, minimax]);

  useEffect(() => {
    if (mode === "single" && !giliranX && !pemenang && !botMoving.current) {
      botMoving.current = true;
      setBotBerpikir(true);
      const timer = setTimeout(() => {
        const langkahBot = ambilLangkahBot();
        if (langkahBot !== -1) {
          buatLangkah(langkahBot);
        }
        setBotBerpikir(false);
        botMoving.current = false;
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [giliranX, mode, pemenang, ambilLangkahBot, buatLangkah]);

  const resetPermainan = () => {
    setPapan(Array(9).fill(null));
    setGiliranX(true);
    setPemenang(null);
    setGarisMenang(null);
    setBotBerpikir(false);
    botMoving.current = false;
  };

  return {
    papan,
    giliranX,
    pemenang,
    garisMenang,
    mode,
    setMode,
    kesulitan,
    setKesulitan,
    buatLangkah,
    resetPermainan,
    botBerpikir,
    setPapan,
    setGiliranX,
  };
};
