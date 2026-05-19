/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import Stats from './Stats';
import { STATS } from '../constants';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-grid -z-10" />
      <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-brand-red/10 rounded-full blur-[100px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-brand-blue/10 rounded-full blur-[100px] md:blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4 px-4"
      >
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-brand-red drop-shadow-[0_0_30px_rgba(255,0,60,0.5)]">
          MARVEL RIVALS <br className="hidden xs:block" /> FREE SKINS
        </h1>

        <p className="text-red-200/60 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 font-bold">
          Ultimate Hero Drops Active • Multiverse Season 1 Live
        </p>

        <div className="mt-4 w-full flex justify-center">
          <Stats stats={STATS} />
        </div>
      </motion.div>

      {/* Decorative car/item placeholder - floating */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-40 lg:right-20 w-96 h-96 opacity-20 lg:opacity-100 -z-10 pointer-events-none"
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-brand-red/20 rounded-full blur-[80px]" />
          <img 
            src="https://images.unsplash.com/photo-1548685913-fe657448d31a?q=80&w=800&auto=format&fit=crop" 
            alt="Iron Man" 
            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,0,60,0.3)] rotate-6"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
}
