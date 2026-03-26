import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, Smartphone, HardDrive, Database, 
  Settings, FileText, ShieldCheck, 
  CheckCircle2, Activity, ChevronLeft, Monitor, Info
} from 'lucide-react';
import { IconFingerprint, IconDeviceMobile } from '@tabler/icons-react';
import { VibratoZeroDock } from './components/VibratoZeroDock';
import { VibratoZeroExpertise } from './components/VibratoZeroExpertise';
import { VibratoZeroOnboarding } from './components/VibratoZeroOnboarding';
import { VibratoZeroAuth } from './components/VibratoZeroAuth';
import { VibratoZeroAlgorithms } from './components/VibratoZeroAlgorithms';
import { VibratoZeroMonitor } from './components/VibratoZeroMonitor';

type AppState = 'splash' | 'onboarding' | 'auth' | 'main';
type ViewState = 'dashboard' | 'algorithms' | 'hardware' | 'audit' | 'about';
type DeviceType = 'smartphone' | 'tablet_desktop';
type AlgorithmType = 'fast' | 'random' | 'military';
type StorageType = 'internal' | 'sd';

interface LogEntry {
  id: string;
  hash: string;
  date: string;
  algorithm: AlgorithmType;
  storage: StorageType;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [view, setView] = useState<ViewState>('dashboard');
  const [deviceMode, setDeviceMode] = useState<DeviceType>('smartphone');
  
  // Configs
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('random');
  const [storage, setStorage] = useState<StorageType>('internal');
  
  // Wipe State
  const [isWiping, setIsWiping] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);
  const [freeSpace, setFreeSpace] = useState(34); // Simulando 34% livre inicialmente
  const wipeIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Logs
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // 1. Detecção de Hardware (Primeiro Boot)
  useEffect(() => {
    const storedDevice = localStorage.getItem('vibrato_device_mode') as DeviceType | null;
    if (storedDevice) {
      setDeviceMode(storedDevice);
    } else {
      const width = window.innerWidth;
      const detectedMode = width > 600 ? 'tablet_desktop' : 'smartphone';
      setDeviceMode(detectedMode);
      localStorage.setItem('vibrato_device_mode', detectedMode);
    }
  }, []);

  // 2. Splash Screen Timeout
  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => setAppState('onboarding'), 4000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Gerador de Hash SHA-256 Simulado
  const generateFakeHash = () => {
    const chars = 'abcdef0123456789';
    return Array.from({ length: 64 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleAuth = () => {
    setAppState('main');
  };

  const handleWipe = () => {
    if (isWiping) return;
    setIsWiping(true);
    setWipeProgress(0);

    // Simula o preenchimento do espaço livre (Lógica Mobile)
    let currentProgress = 0;
    wipeIntervalRef.current = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (wipeIntervalRef.current) clearInterval(wipeIntervalRef.current);
        
        setTimeout(() => {
          const newLog: LogEntry = {
            id: Math.random().toString(36).substr(2, 9),
            hash: generateFakeHash(),
            date: new Date().toISOString(),
            algorithm,
            storage
          };
          setLogs(prev => [newLog, ...prev]);
          setFreeSpace(100); // Espaço "limpo"
          setIsWiping(false);
          setWipeProgress(0);
        }, 1500); // Give it a bit more time to show 100%
      }
      setWipeProgress(currentProgress);
    }, 400);
  };

  const handleAbortWipe = () => {
    if (wipeIntervalRef.current) {
      clearInterval(wipeIntervalRef.current);
    }
    setIsWiping(false);
    setWipeProgress(0);
  };

  // --- RENDERERS ---

  if (appState === 'splash') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Simulação de Vídeo Splash */}
        <div className="absolute inset-0 opacity-40 flex items-center justify-center">
           <div className="w-64 h-64 border-4 border-[#009B3A] rounded-full animate-ping absolute"></div>
           <div className="w-48 h-48 border-4 border-[#009B3A] rounded-full animate-pulse absolute"></div>
        </div>
        <ShieldCheck size={80} className="text-[#009B3A] mb-6 relative z-10 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-white tracking-widest relative z-10">VIBRATO<span className="text-[#009B3A]">ZERO</span></h1>
        <p className="text-[#009B3A] mt-2 font-mono text-sm tracking-widest relative z-10">DATA SANITIZATION</p>
        <p className="absolute bottom-8 text-gray-600 text-xs font-mono">vibrato_digital_intro.mp4</p>
      </div>
    );
  }

  if (appState === 'onboarding') {
    return <VibratoZeroOnboarding onComplete={() => setAppState('auth')} />;
  }

  if (appState === 'auth') {
    return <VibratoZeroAuth onAuthenticate={handleAuth} />;
  }

  // Circular Progress Component
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((isWiping ? wipeProgress : freeSpace) / 100) * circumference;

  return (
    <div className={`min-h-screen bg-black text-white font-sans ${deviceMode === 'tablet_desktop' ? 'p-8 flex justify-center items-center' : ''}`}>
      <div className={`bg-[#0a0a0a] w-full ${deviceMode === 'tablet_desktop' ? 'max-w-4xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col h-[80vh]' : 'min-h-screen flex flex-col'}`}>
        
        {/* HEADER */}
        <header className="bg-[#111] border-b border-gray-800 p-4 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-2">
            {view !== 'dashboard' && (
              <button onClick={() => setView('dashboard')} className="text-gray-400 hover:text-white mr-2">
                <ChevronLeft size={24} />
              </button>
            )}
            <ShieldCheck size={24} className="text-[#009B3A]" />
            <h1 className="text-lg font-bold tracking-widest">VIBRATO<span className="text-[#009B3A]">ZERO</span></h1>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          
          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && !isWiping && (
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto space-y-10 pb-24">
              
              {/* Circular Progress */}
              <div className="relative flex justify-center items-center">
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle cx="100" cy="100" r={radius} stroke="#1a1a1a" strokeWidth="16" fill="transparent" />
                  <circle 
                    cx="100" cy="100" r={radius} 
                    stroke={isWiping ? "#FFD700" : "#009B3A"} 
                    strokeWidth="16" fill="transparent" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-extrabold">{isWiping ? wipeProgress : freeSpace}%</span>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">
                    {isWiping ? 'Sobrescrevendo' : 'Espaço Livre'}
                  </span>
                </div>
              </div>

              {/* Storage Selection */}
              <div className="w-full space-y-3">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest text-center mb-4">Selecionar Unidade</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => !isWiping && setStorage('internal')}
                    disabled={isWiping}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${
                      storage === 'internal' ? 'border-[#009B3A] bg-[#009B3A]/10 text-[#009B3A]' : 'border-gray-800 text-gray-500 hover:border-gray-700'
                    } ${isWiping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <HardDrive size={24} />
                    <span className="text-xs font-bold uppercase">Interno</span>
                  </button>
                  <button 
                    onClick={() => !isWiping && setStorage('sd')}
                    disabled={isWiping}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${
                      storage === 'sd' ? 'border-[#009B3A] bg-[#009B3A]/10 text-[#009B3A]' : 'border-gray-800 text-gray-500 hover:border-gray-700'
                    } ${isWiping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Database size={24} />
                    <span className="text-xs font-bold uppercase">Cartão SD</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleWipe}
                className="w-full py-5 rounded-2xl font-extrabold text-lg tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-3 bg-[#009B3A] hover:bg-[#008A33] text-white hover:shadow-[#009B3A]/20 hover:shadow-2xl active:scale-95"
              >
                <ShieldCheck size={24} />
                Iniciar Sobrescrita
              </button>
            </div>
          )}

          {/* MONITOR VIEW */}
          {isWiping && (
            <VibratoZeroMonitor 
              algorithm={algorithm}
              progress={wipeProgress}
              onAbort={handleAbortWipe}
            />
          )}

          {/* ALGORITHMS VIEW */}
          {view === 'algorithms' && (
            <VibratoZeroAlgorithms 
              currentAlgorithm={algorithm}
              onSelectAlgorithm={setAlgorithm}
              onConfirm={() => setView('dashboard')}
            />
          )}

          {/* HARDWARE VIEW */}
          {view === 'hardware' && (
            <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24">
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-800 pb-4 flex items-center gap-2">
                <IconDeviceMobile size={24} className="text-[#009B3A]" /> Hardware
              </h2>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest">Modo de Exibição</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setDeviceMode('smartphone');
                      localStorage.setItem('vibrato_device_mode', 'smartphone');
                    }}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                      deviceMode === 'smartphone' ? 'border-[#009B3A] bg-[#009B3A]/10 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'
                    }`}
                  >
                    <Smartphone size={20} />
                    <span className="text-xs font-bold uppercase">Celular</span>
                  </button>
                  <button 
                    onClick={() => {
                      setDeviceMode('tablet_desktop');
                      localStorage.setItem('vibrato_device_mode', 'tablet_desktop');
                    }}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                      deviceMode === 'tablet_desktop' ? 'border-[#009B3A] bg-[#009B3A]/10 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'
                    }`}
                  >
                    <Monitor size={20} />
                    <span className="text-xs font-bold uppercase">Tablet / PC</span>
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center mt-2">
                  Detectado automaticamente no primeiro boot: {window.innerWidth > 600 ? 'Tablet' : 'Celular'}.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest">Painel de Diagnóstico</h3>
                <div className="bg-[#111] p-4 rounded-xl border border-gray-800 space-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Viewport Width</p>
                    <p className="text-xs font-mono text-white">{window.innerWidth}px</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">User Agent</p>
                    <p className="text-[10px] font-mono text-gray-400 break-all">{navigator.userAgent}</p>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('vibrato_device_mode');
                      window.location.reload();
                    }}
                    className="w-full mt-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    Resetar Detecção
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOG VIEW */}
          {view === 'audit' && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24">
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-800 pb-4 flex items-center gap-2 text-[#FFD700]">
                <FileText size={24} className="text-[#FFD700]" /> Log de Auditoria
              </h2>
              
              {logs.length === 0 ? (
                <div className="text-center p-10 border border-gray-800 rounded-2xl bg-[#111]">
                  <Database size={40} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-sm font-bold uppercase text-gray-500 tracking-widest">Nenhum registro de sanitização.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="bg-[#111] border border-gray-800 rounded-xl p-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#009B3A]"></div>
                      <div className="flex justify-between items-start mb-3 pl-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{new Date(log.date).toLocaleString()}</span>
                        <span className="px-2 py-1 bg-[#009B3A]/20 text-[#009B3A] text-[10px] font-bold uppercase rounded">Sucesso</span>
                      </div>
                      <div className="pl-2 space-y-2">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Hash SHA-256</p>
                          <p className="text-xs font-mono text-white break-all">{log.hash}</p>
                        </div>
                        <div className="flex gap-4 pt-2 border-t border-gray-800">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Algoritmo</p>
                            <p className="text-xs text-gray-300 uppercase">{log.algorithm}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Unidade</p>
                            <p className="text-xs text-gray-300 uppercase">{log.storage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABOUT VIEW (GRC COMPLIANCE) */}
          {view === 'about' && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24">
              <h2 className="text-xl font-extrabold uppercase tracking-widest border-b border-gray-800 pb-4 flex items-center gap-2 text-[#FFD700]">
                <Info size={24} className="text-[#FFD700]" /> Sobre o Sistema
              </h2>
              
              <VibratoZeroExpertise />
              
              <div className="bg-[#4c0505] border border-red-900 p-4 rounded-xl mt-6 shadow-inner">
                <p className="text-xs text-white font-extrabold uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#FFD700]" />
                  Conformidade GRC
                </p>
                <p className="text-[10px] text-gray-300 mt-2 font-medium leading-relaxed">
                  Este módulo opera em conformidade estrita com as políticas de segurança. Links externos foram desativados para prevenir vetores de ataque via navegação não intencional (Phishing/Redirecionamento).
                </p>
              </div>
            </div>
          )}

        </main>

        {/* FLOATING DOCK */}
        <VibratoZeroDock setView={setView} currentView={view} />
      </div>
    </div>
  );
}
