/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Shield, Gift, Search, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Skins', href: '#skin-rewards' },
    { name: 'Characters', href: '#character-collection' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between glass rounded-2xl px-4 md:px-6 py-3 border-white/5 relative z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-brand-red rounded-sm skew-x-12 flex items-center justify-center font-black italic text-white shadow-[0_0_15px_rgba(255,0,60,0.5)]">MR</div>
            <span className="font-display font-black tracking-tighter italic uppercase text-lg md:text-xl block">
              Marvel<span className="text-brand-red">Rivals</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`transition-colors ${link.name === 'Home' ? 'text-brand-red border-b-2 border-brand-red pb-1' : 'hover:text-brand-red'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-4 md:px-6 py-2 bg-brand-red hover:bg-red-500 text-[10px] font-bold uppercase skew-x-[-12deg] border border-red-400 shadow-[0_0_15px_rgba(255,0,60,0.5)] transition-all text-white"
            >
              Infinity Account
            </motion.button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 md:hidden z-40"
            >
              <div className="glass rounded-2xl p-6 border-white/5 flex flex-col gap-4 shadow-2xl">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-xs uppercase tracking-[0.2em] font-black italic hover:text-brand-red transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="w-full py-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest italic rounded-lg">
                  Join Infinity
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
