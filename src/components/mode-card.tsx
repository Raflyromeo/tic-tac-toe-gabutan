"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ModeCardProps {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  buttonColor: string;
  buttonHoverColor: string;
  iconBg: string;
  Icon: LucideIcon;
  delay?: number;
  animateDir?: "left" | "right";
}

export const ModeCard = ({
  title,
  description,
  href,
  buttonLabel,
  buttonColor,
  buttonHoverColor,
  iconBg,
  Icon,
  delay = 0.2,
  animateDir = "left",
}: ModeCardProps) => {
  return (
    <motion.div
      initial={{ x: animateDir === "left" ? -50 : 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
      className="flex h-full"
    >
      <Card className="group flex flex-col w-full border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] rounded-none overflow-hidden hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] transition-all duration-200">
        <CardContent className="flex flex-col flex-1 p-5 sm:p-6 space-y-4">

          <div
            className="w-12 h-12 sm:w-14 sm:h-14 border-[3px] border-black dark:border-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={3} />
          </div>


          <div className="text-left space-y-1 flex-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase italic text-black dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight leading-relaxed">
              {description}
            </p>
          </div>


          <Link href={href} className="block w-full">
            <Button
              className={`w-full h-11 sm:h-12 border-[3px] border-black dark:border-white font-black text-base sm:text-lg uppercase italic shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 rounded-none text-white`}
              style={{ backgroundColor: buttonColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonColor)}
            >
              {buttonLabel}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};
