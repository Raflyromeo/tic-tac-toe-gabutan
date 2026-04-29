"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function PilihTema() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-12 w-12 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center border-4 border-black dark:border-white bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none w-10 h-10 md:w-12 md:h-12 focus:outline-none focus:ring-0">
          <Sun className="w-5 h-5 md:w-6 md:h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black dark:text-white" strokeWidth={3} />
          <Moon className="absolute w-5 h-5 md:w-6 md:h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-black dark:text-white" strokeWidth={3} />
          <span className="sr-only">Ganti Tema</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] rounded-none p-2 bg-white dark:bg-slate-900 z-[300] min-w-48">
        <DropdownMenuItem onClick={() => setTheme("light")} className="font-black uppercase italic gap-3 p-3 focus:bg-[#3CC2FF] focus:text-white cursor-pointer text-black dark:text-white rounded-none transition-colors">
          <Sun className="h-5 w-5" strokeWidth={3} /> Terang
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="font-black uppercase italic gap-3 p-3 focus:bg-[#FF5FC9] focus:text-white cursor-pointer text-black dark:text-white rounded-none transition-colors">
          <Moon className="h-5 w-5" strokeWidth={3} /> Gelap
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="font-black uppercase italic gap-3 p-3 focus:bg-[#FFE135] focus:text-black cursor-pointer text-black dark:text-white rounded-none transition-colors">
          <Laptop className="h-5 w-5" strokeWidth={3} /> Sistem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
