/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Cpu, Key, CheckCircle, ExternalLink, RefreshCw, Layers, Award } from 'lucide-react';
import { CharacterReward, Hero } from '../types';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardItem: CharacterReward | Hero | null;
}

type ClaimStep = 'account' | 'injecting' | 'secured';

export default function ClaimModal({ isOpen, onClose, rewardItem }: ClaimModalProps) {
  const [step, setStep] = useState<ClaimStep>('account');
  const [platform, setPlatform] = useState<'steam' | 'epic' | 'psn' | 'xbox'>('steam');
  const [username, setUsername] = useState('');
  const [region, setRegion] = useState('us-east');
  const [errorMsg, setErrorMsg] = useState('');
  const [injectionLogs, setInjectionLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [claimCode, setClaimCode] = useState('');

  // Reset states on select
  useEffect(() => {
    if (isOpen) {
      setStep('account');
      setUsername('');
      setProgress(0);
      setInjectionLogs([]);
      setErrorMsg('');
      
      // Generate a premium random hash for claim code
      const randHash = Array.from({ length: 4 }, () => 
        Math.random().toString(36).substring(2, 6).toUpperCase()
      ).join('-');
      setClaimCode(`MR-${randHash}`);
    }
  }, [isOpen]);

  // Inject logs animation
  useEffect(() => {
    if (step !== 'injecting') return;

    const logPhrases = [
      'Establishing connection to Marvel NetEase gateway...',
      'Validating Marvel Rivals license hash...',
      'Region routing node handshake: SECURED',
      `Target user account "${username}" found on catalog database.`,
      `Syncing secure cryptographic keys with ${platform.toUpperCase()} system...`,
      'Loading Skin/Hero assets injection manifest...',
      'Modifying game bundle client package: ID.7740...',
      'Adding server-side validation token...',
      'Re-encrypting files integrity check (SHA-256)...',
      'Assets injected successfully! Generating claim secure verification bundle.'
    ];

    let timer: NodeJS.Timeout;
    let currentLogIdx = 0;

    const runLogs = () => {
      if (currentLogIdx < logPhrases.length) {
        setInjectionLogs((v) => [...v, logPhrases[currentLogIdx]]);
        setProgress((prev) => Math.min(prev + 10, 100));
        currentLogIdx++;
        timer = setTimeout(runLogs, 400 + Math.random() * 400);
      } else {
        setProgress(100);
        timer = setTimeout(() => {
          setStep('secured');
        }, 850);
      }
    };

    runLogs();

    return () => clearTimeout(timer);
  }, [step, username, platform]);

  if (!rewardItem) return null;

  const isSkin = 'skinName' in rewardItem;
  const displayName = isSkin ? (rewardItem as CharacterReward).skinName : rewardItem.name;
  const rarityOrRole = isSkin ? (rewardItem as CharacterReward).rarity : 'Playable Hero';
  const accentColor = rewardItem.color || '#FF003C';

  const handleNext = () => {
    if (!username.trim()) {
      setErrorMsg('Game account username or Epic/Steam ID is required.');
      return;
    }
    if (username.trim().length < 3) {
      setErrorMsg('Please enter a valid gaming identifier (at least 3 characters).');
      return;
    }
    setErrorMsg('');
    setStep('injecting');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02050a]/90 backdrop-blur-xl"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-2xl bg-[#05080f] rounded-[2rem] border-2 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            style={{ borderColor: `${accentColor}30` }}
          >
            {/* Specular Ambient Backlighting */}
            <div 
              className="absolute -top-[20%] -left-[20%] w-[140%] h-[40%] blur-[120px] pointer-events-none opacity-25"
              style={{ background: `radial-gradient(ellipse at top, ${accentColor}, transparent 70%)` }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors z-30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 relative z-20">
              
              {/* Step 1: Link Account */}
              {step === 'account' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-2 rounded-lg bg-white/5 border border-white/10" style={{ color: accentColor }}>
                      <Award className="w-6 h-6 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Multiverse Injection Gateway</span>
                      <h2 className="text-xl sm:text-2xl font-black italic tracking-tight text-white uppercase leading-none mt-1">
                        Unlock <span style={{ color: accentColor }}>{displayName}</span>
                      </h2>
                    </div>
                  </div>

                  {/* Character/Skin Card preview Row */}
                  <div className="glass border-white/5 rounded-2xl p-4 mb-8 flex items-center gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-black/40 overflow-hidden relative border border-white/10 flex items-center justify-center">
                      <div 
                        className="absolute inset-0 opacity-45 blur-md"
                        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
                      />
                      <img 
                        src={rewardItem.image} 
                        alt={rewardItem.name} 
                        className="w-full h-full object-cover relative z-10"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <span 
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm border"
                        style={{ 
                          color: accentColor, 
                          borderColor: `${accentColor}40`, 
                          backgroundColor: `${accentColor}08` 
                        }}
                      >
                        {rarityOrRole}
                      </span>
                      <h3 className="text-lg font-black italic uppercase text-white tracking-wide mt-2">
                        {displayName}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        {isSkin ? `Model override code pack ready for ${rewardItem.name}` : `Hero character database unlock packet`}
                      </p>
                    </div>
                  </div>

                  {/* Account detail Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3">
                        Choose Connection Platform
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['steam', 'epic', 'psn', 'xbox'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPlatform(p)}
                            className={`py-3.5 px-3 rounded-xl border text-[11px] font-bold uppercase transition-all flex flex-col items-center gap-2 relative ${
                              platform === p
                                ? 'bg-white/10 text-white shadow-lg border-2'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                            }`}
                            style={{ borderColor: platform === p ? accentColor : undefined }}
                          >
                            <span className="uppercase text-[9px] tracking-wider">{p}</span>
                            {platform === p && (
                              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                          Platform Username / ID
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="e.g. RivalsPro#1234, SteamID"
                          className="w-full bg-[#0a0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors font-mono"
                          style={{ focusBorderColor: accentColor }}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                          Matches Game Region
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full bg-[#0a0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors font-bold uppercase"
                        >
                          <option value="us-east">North America (US East)</option>
                          <option value="us-west">North America (US West)</option>
                          <option value="eu-west">Europe (EU West)</option>
                          <option value="eu-east">Europe (EU East)</option>
                          <option value="asia">Asia Pacific</option>
                          <option value="sa">South America</option>
                        </select>
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-brand-red text-xs font-bold font-mono tracking-tight bg-brand-red/10 border border-brand-red/20 rounded-lg p-3">
                        ⚠ {errorMsg}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <ShieldCheck className="w-5 h-5 text-brand-green" />
                        <span className="text-[10px] uppercase tracking-wider font-bold">Encrypted End-to-End Tunnel</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${accentColor}50` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleNext}
                        className="w-full sm:w-auto px-8 py-3.5 text-[11px] font-black uppercase text-white tracking-[0.2em] rounded-md transition-all border border-white/20 hover:bg-white hover:text-black flex items-center justify-center gap-2"
                        style={{ backgroundColor: `${accentColor}d0` }}
                      >
                        Initiate Connection
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Injecting Mod Animation */}
              {step === 'injecting' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 animate-spin text-brand-blue" style={{ color: accentColor }} />
                      <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">
                        Assets Override Pipeline
                      </h2>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-400">{progress}%</span>
                  </div>

                  {/* Progress Glow Bar */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${progress}%`, 
                        backgroundColor: accentColor,
                        boxShadow: `0 0 15px ${accentColor}`
                      }}
                    />
                  </div>

                  {/* Console Emulator Terminal logs */}
                  <div className="bg-[#020509] border border-white/5 rounded-2xl p-4 sm:p-6 h-60 overflow-y-auto font-mono text-xs text-slate-400 space-y-2.5 custom-scrollbar">
                    {injectionLogs.map((log, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={index}
                        className="flex items-start gap-2.5"
                      >
                        <span className="text-slate-600 select-none">[{index + 1}]</span>
                        <p className={index === injectionLogs.length - 1 ? 'text-white font-bold' : ''}>
                          {log}
                        </p>
                      </motion.div>
                    ))}
                    <div className="h-4" />
                  </div>

                  <p className="text-center font-mono text-[9px] uppercase tracking-widest text-[#52637a]">
                    Please do not close or reload this window during active injection sequence.
                  </p>
                </div>
              )}

              {/* Step 3: Injection Secured */}
              {step === 'secured' && (
                <div className="text-center py-4 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                    className="w-16 h-16 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center text-brand-green mb-6"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>

                  <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2">
                    REWARD MOD PRE-LOADED!
                  </h2>
                  <p className="text-slate-400 max-w-md text-xs uppercase mb-8 tracking-widest leading-relaxed">
                    Account <span className="font-bold text-white">"{username}"</span> has been queued for verification. The {isSkin ? 'skin skinpack code' : 'character slot token'} will propagate to your in-game mailbox securely.
                  </p>

                  <div className="w-full bg-[#0a0d14] border border-white/5 rounded-2xl p-6 mb-8 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-5">
                      <Layers className="w-full h-full" />
                    </div>
                    
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2">
                      Your Unique Claim Certificate Hash
                    </span>
                    
                    <div className="flex items-center justify-between gap-4 font-mono select-all">
                      <span className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        {claimCode}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(claimCode);
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white rounded border border-white/10 transition-all uppercase tracking-wider whitespace-nowrap"
                      >
                        Copy Hash
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-slate-400 text-[11px] text-left uppercase font-bold tracking-wider leading-relaxed mb-8 w-full">
                    <span className="text-brand-gold font-black">HOW TO ACTIVATE:</span> Launch Marvel Rivals in {platform.toUpperCase()} under your account <span className="text-white">"{username}"</span> and complete safe mod verification overlay in the main screen lobby inside 24 hours.
                  </div>

                  <div className="flex gap-4 w-full justify-center">
                    <button
                      onClick={onClose}
                      className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all uppercase tracking-widest"
                    >
                      Close Lobby Overlay
                    </button>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.reload();
                      }}
                      className="px-6 py-3.5 bg-brand-red text-white text-xs font-black rounded-lg transition-all uppercase tracking-widest shadow-[0_4px_20px_rgba(255,0,60,0.3)] flex items-center gap-2 hover:scale-105"
                    >
                      Return to Drops <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
