/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkinRewards from './components/SkinRewards';
import CharacterCollection from './components/CharacterCollection';
import Footer from './components/Footer';
import Background from './components/Background';
import ClaimModal from './components/ClaimModal';
import { useEffect, useState } from 'react';
import { CharacterReward, Hero as HeroType } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CharacterReward | HeroType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectReward = (item: CharacterReward | HeroType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="relative selection:bg-brand-blue selection:text-dark-bg">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full shadow-[0_0_30px_rgba(255,0,60,0.4)]"
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-display font-bold uppercase tracking-[0.4em] text-brand-red text-xs"
            >
              ASSEMBLING HEROES
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Background />
      <Navbar />
      
      <main className="relative z-10">
        <Hero onSelectReward={handleSelectReward} />
        <SkinRewards onSelectReward={handleSelectReward} />
        <CharacterCollection onSelectReward={handleSelectReward} />
      </main>

      <Footer />

      <ClaimModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rewardItem={selectedItem}
      />

      {/* Floating Action Badge - Open Discord Help */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 3 }}
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            // Trigger beautiful developer support or general drop notice
            alert("Rivals Drops verification engine online! Please select any Character or Skin from below to begin secure account linking.");
          }}
          className="w-16 h-16 bg-brand-red rounded-2xl shadow-[0_10px_30px_rgba(255,0,60,0.4)] flex items-center justify-center text-white transition-shadow hover:shadow-[0_15px_40px_rgba(255,0,60,0.6)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
