/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Cpu, BarChart2, Server, Globe, Database, ArrowRight } from 'lucide-react';

// --- NETWORK SIMULATION DIAGRAM (was Surface Code) ---
export const SurfaceCodeDiagram: React.FC = () => {
  // Repurposed as Network Node Status
  const [errors, setErrors] = useState<number[]>([]);
  
  // Adjacency list simulating connected microservices
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], 
  };

  const toggleError = (id: number) => {
    setErrors(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const activeStabilizers = [0, 1, 2, 3].filter(stabId => {
    let errorCount = 0;
    Object.entries(adjacency).forEach(([dataId, stabs]) => {
        if (errors.includes(parseInt(dataId)) && stabs.includes(stabId)) {
            errorCount++;
        }
    });
    return errorCount % 2 !== 0;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Simulasi Jaringan & Server</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Klik pada node <strong>Server (Lingkaran)</strong> untuk mensimulasikan beban trafik tinggi. Load Balancer (Kotak) akan mendeteksi anomali secara otomatis.
      </p>
      
      <div className="relative w-64 h-64 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 flex flex-wrap justify-between content-between relative">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-2/3 h-2/3 border border-stone-400"></div>
            <div className="absolute w-full h-[1px] bg-stone-400"></div>
            <div className="absolute h-full w-[1px] bg-stone-400"></div>
         </div>

         {/* Stabilizers (Load Balancers) */}
         {[
             {id: 0, x: '50%', y: '20%', label: 'LB-1', color: 'bg-blue-500'},
             {id: 1, x: '20%', y: '50%', label: 'LB-2', color: 'bg-indigo-500'},
             {id: 2, x: '80%', y: '50%', label: 'LB-3', color: 'bg-indigo-500'},
             {id: 3, x: '50%', y: '80%', label: 'LB-4', color: 'bg-blue-500'},
         ].map(stab => (
             <motion.div
                key={`stab-${stab.id}`}
                className={`absolute w-12 h-10 -ml-6 -mt-5 flex items-center justify-center text-white text-[10px] font-bold rounded-sm shadow-sm transition-all duration-300 ${activeStabilizers.includes(stab.id) ? 'bg-red-500 opacity-100 scale-110 ring-4 ring-offset-2 ring-stone-200' : 'bg-stone-300 opacity-40'}`}
                style={{ left: stab.x, top: stab.y }}
             >
                 {activeStabilizers.includes(stab.id) ? 'ALERT' : stab.label}
             </motion.div>
         ))}

         {/* Data Qubits (Servers) */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, // Center
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`data-${q.id}`}
                onClick={() => toggleError(q.id)}
                className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 ${errors.includes(q.id) ? 'bg-stone-800 border-stone-900 text-nobel-gold' : 'bg-white border-stone-300 hover:border-stone-500 text-stone-400'}`}
                style={{ left: q.x, top: q.y }}
             >
                <Server size={16} />
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-stone-800"></div> High Load</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-stone-300"></div> Normal</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-500"></div> Alert</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {errors.length === 0 ? "Sistem berjalan normal." : `Terdeteksi beban tinggi pada ${activeStabilizers.length} zona balancer.`}
      </div>
    </div>
  );
};

// --- ARCHITECTURE DIAGRAM (was Transformer) ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Alur Kerja Arsitektur Sistem</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        Visualisasi bagaimana data diproses dari input mentah menjadi API response yang siap digunakan.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-4 md:gap-8 p-4">
        
        {/* Input Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-nobel-gold bg-nobel-gold/10' : 'border-stone-200 bg-stone-50'}`}>
                <Globe size={24} className={step === 0 ? 'text-nobel-gold' : 'text-stone-300'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Raw Input</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}><ArrowRight size={16} className="text-stone-400"/></motion.div>

        {/* Processing Stage */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                <Cpu size={24} className={step === 1 || step === 2 ? 'text-nobel-gold animate-pulse' : 'text-stone-300'} />
                {step === 1 && <span className="text-[10px] absolute bottom-2">Processing</span>}
                {step === 2 && <span className="text-[10px] absolute bottom-2">Optimizing</span>}
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Core Engine</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}><ArrowRight size={16} className="text-stone-400"/></motion.div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                {step === 3 ? (
                    <Database size={24} className="text-green-600" />
                ) : (
                    <Database size={24} className="text-stone-300" />
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Stored</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART (was Metric Diagram) ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [metric, setMetric] = useState<'lcp' | 'fid' | 'cls'>('lcp');
    
    // Fake stats for before/after comparison
    // LCP (Loading): 2.5s -> 0.8s
    // FID (Interactive): 150ms -> 30ms
    // CLS (Stability): 0.25 -> 0.01
    const data = {
        lcp: { name: 'Loading Time (s)', before: 2.8, after: 0.8, unit: 's' },
        fid: { name: 'Response Time (ms)', before: 200, after: 45, unit: 'ms' },
        cls: { name: 'Layout Shift', before: 0.25, after: 0.005, unit: '' } 
    };

    const currentData = data[metric];
    const maxVal = Math.max(currentData.before, currentData.after) * 1.2;
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">Metrik Optimasi Proyek</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    Perbandingan performa aplikasi sebelum dan sesudah refactoring kode dan implementasi caching strategy.
                </p>
                <div className="flex gap-2 mt-6">
                    <button 
                        onClick={() => setMetric('lcp')} 
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${metric === 'lcp' ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                    >
                        Kecepatan Load
                    </button>
                    <button 
                        onClick={() => setMetric('fid')} 
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${metric === 'fid' ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                    >
                        Responsivitas
                    </button>
                </div>
                <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-nobel-gold" /> 
                    <span>LOWER IS BETTER</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* Before Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-sm font-mono text-stone-400 font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-stone-700/50 shadow-sm">{currentData.before}{currentData.unit}</div>
                        <motion.div 
                            className="w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.before / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">Sebelum</div>
                </div>

                {/* After Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-nobel-gold/30 shadow-sm">{currentData.after}{currentData.unit}</div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(1, (currentData.after / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider">Sesudah</div>
                </div>
            </div>
        </div>
    )
}