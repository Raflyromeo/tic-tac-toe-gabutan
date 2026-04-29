"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GridPattern } from "@/components/ui/grid-pattern"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFE135] dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <GridPattern
        width={40}
        height={40}
        className="opacity-10 dark:opacity-5 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 border-8 border-black dark:border-white p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)]"
        >
          <h1 className="text-9xl font-black text-black dark:text-white italic tracking-tighter">404</h1>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-4xl font-black uppercase italic text-black dark:text-white drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Waduh! Halaman Hilang
          </h2>
          <p className="text-lg font-bold text-black/60 dark:text-white/60 uppercase tracking-widest max-w-md">
            Mungkin kamu salah jalan atau link-nya udah basi. Balik lagi yuk!
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="h-16 px-10 bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 border-4 border-black dark:border-white font-black text-xl uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none">
            <Home className="mr-3 h-6 w-6" strokeWidth={3} /> KE BERANDA
          </Button>
        </Link>
      </div>
    </main>
  )
}
