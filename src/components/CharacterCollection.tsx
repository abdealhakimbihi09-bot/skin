import { motion } from 'motion/react';
import { HEROES } from '../constants';
import { Sparkles, Zap, User, Shield } from 'lucide-react';

export default function CharacterCollection() {
  return (
    <section id="character-collection" className="py-24 px-6 relative overflow-hidden bg-dark-bg border-t border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[50%] h-[50%] bg-brand-purple/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[50%] h-[50%] bg-brand-gold/5 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-brand-gold font-display font-black uppercase tracking-[0.4em] text-xs mb-4"
          >
            <User className="w-4 h-4" />
            Vanguard Legends
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">
            MARVEL RIVALS <span className="text-brand-gold">CHARACTERS</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl text-xs uppercase tracking-[0.3em] font-bold">
            Assemble your team from the most iconic heroes and villains in the universe
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {HEROES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative aspect-[3/4.5] w-full max-w-[320px] sm:max-w-none flex flex-col bg-[#05080f] rounded-[2rem] p-[2px] overflow-hidden transition-all duration-700 hover:shadow-[0_0_60px_rgba(255,215,0,0.05)]"
              style={{
                background: `linear-gradient(135deg, ${item.color}60, transparent, ${item.color}40)`
              }}
            >
              {/* Card Inner */}
              <div className="relative h-full w-full bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[1.9rem] flex flex-col overflow-hidden border-shine">
                
                {/* Playable Hero Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-white/20 rounded-sm backdrop-blur-md shadow-2xl">
                  <Shield className="w-3 h-3 text-brand-gold" />
                  <span className="text-[9px] font-black uppercase text-white tracking-[0.2em]">Playable Hero</span>
                </div>

                {/* Role Label */}
                <div className="absolute top-5 right-5 z-20">
                  <span 
                    className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-sm border backdrop-blur-md shadow-lg"
                    style={{ 
                      color: item.color, 
                      borderColor: `${item.color}40`, 
                      backgroundColor: `${item.color}10`,
                      boxShadow: `0 0 15px ${item.color}20`
                    }}
                  >
                    {item.role}
                  </span>
                </div>

                {/* Artwork container */}
                <div className="relative flex-[1.2] overflow-hidden flex items-center justify-center p-4">
                  <div 
                    className="absolute inset-0 opacity-30 blur-[80px] animate-pulse"
                    style={{ background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)` }}
                  />
                  
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    transition={{ duration: 0.8 }}
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-full object-cover z-10 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  {/* Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-100 z-10" />
                </div>

                {/* Content Section */}
                <div className="relative p-8 pt-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-20">
                  <div className="mb-6 relative">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] mb-2 pl-1 border-l border-brand-gold/30">
                      Marvel Universe
                    </p>
                    <h3 
                      className="text-2xl font-black italic uppercase tracking-tighter leading-none group-hover:scale-105 origin-left transition-transform duration-500"
                      style={{ color: item.color, textShadow: `0 0 20px ${item.color}40` }}
                    >
                      {item.name}
                    </h3>
                  </div>

                  <motion.button 
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 30px ${item.color}60`
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4.5 relative overflow-hidden group/btn rounded-sm text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                       Select Hero <Zap className="w-4 h-4 fill-current" />
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(45deg, transparent, ${item.color}40, transparent)` }}
                    />
                  </motion.button>
                </div>

                {/* Animated Border Lighting */}
                <div 
                  className="absolute inset-0 rounded-[1.9rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 border-2"
                  style={{ 
                    borderColor: `${item.color}60`, 
                    boxShadow: `inset 0 0 30px ${item.color}30, 0 0 30px ${item.color}20` 
                  }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
