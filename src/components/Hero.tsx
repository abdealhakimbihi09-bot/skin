/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Play, Sparkles, Shield, Trophy } from 'lucide-react';
import Stats from './Stats';
import { STATS, SKIN_REWARDS } from '../constants';
import { CharacterReward, Hero as HeroType } from '../types';

interface HeroProps {
  onSelectReward: (item: CharacterReward | HeroType) => void;
}

export default function Hero({ onSelectReward }: HeroProps) {
  const handleQuickClaim = () => {
    // Select first Mythic item as quick claim (Spider-man Future Foundation)
    const spidermanSkin = SKIN_REWARDS.find(s => s.id === 'spiderman');
    if (spidermanSkin) {
      onSelectReward(spidermanSkin);
    }
  };

  return (
    <section id="hero" className="relative min-h-[96vh] pt-32 pb-24 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Grid & Background Aura */}
      <div className="absolute inset-0 bg-grid -z-10" />
      <div className="cyber-grid" />
      
      {/* High-end ambient backdrop spots */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-brand-red/15 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[180px] -z-10 animate-pulse [animation-delay:3s]" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[120px] -z-10" />

      {/* Cyberpunk Scanlines */}
      <div className="absolute inset-0 scanlines opacity-[0.08] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto text-center flex flex-col items-center gap-6 px-4 relative z-10"
      >
        {/* Esports season ribbon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#ff003c]/10 border border-[#ff003c]/30 text-[#ff003c] text-[10px] font-black tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(255,0,60,0.15)] mb-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          MULTIVERSE REWARDS CAMPAIGN LIVE
        </motion.div>

        {/* Cinematic AAA Typography Heading */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] text-white drop-shadow-[0_0_50px_rgba(0,229,255,0.15)]">
          MARVEL RIVALS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] via-[#ff5c8a] to-[#ffb300]">
            HERO DROPS
          </span>
        </h1>

        <p className="max-w-xl text-slate-400 text-xs sm:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase font-medium leading-relaxed mt-2">
          Claim ultra-HD cinematic skins, legendary custom client modifications, and play with exclusive multiversal legends. Zero cost • Safe account verification active.
        </p>

        {/* Dual CTA Futuristic Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full justify-center max-w-lg">
          {/* Main Action Skew Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickClaim}
            className="w-full sm:w-auto px-8 py-4.5 bg-[#ff003c] text-white font-black uppercase text-xs tracking-[0.3em] relative overflow-hidden group border-shine shadow-[0_0_30px_rgba(255,0,60,0.4)] cursor-pointer"
            style={{ clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Claim Mythic Drop <Play className="w-4 h-4 fill-white text-white animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.button>

          {/* Secondary Action Glass Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const el = document.getElementById('skin-rewards');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4.5 bg-white/5 border border-white/10 hover:border-brand-blue hover:bg-white/10 text-slate-300 hover:text-white font-black uppercase text-xs tracking-[0.3em] rounded-none transition-all cursor-pointer"
            style={{ clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
          >
            <span className="flex items-center justify-center gap-2">
              Browse Skins <ChevronRight className="w-4 h-4" />
            </span>
          </motion.button>
        </div>

        {/* System Stats Block */}
        <div className="mt-12 w-full flex justify-center">
          <Stats stats={STATS} />
        </div>
      </motion.div>

      {/* Futuristic Floating Character Visual Accent */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [6, 8, 6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] -right-44 lg:right-10 xl:right-24 w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] opacity-10 lg:opacity-75 -z-10 pointer-events-none hidden md:block"
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/15 to-transparent rounded-full blur-[100px]" />
          <img 
            src="https://i.postimg.cc/TwvzwH1C/download.jpg" 
            alt="Iron Man High Tech" 
            className="w-full h-full object-contain filter drop-shadow-[0_15px_60px_rgba(255,0,60,0.5)] contrast-110 brightness-95"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
}
