/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, Send, Github, Linkedin, Mail } from 'lucide-react';

const SkillCard = ({ name, category, delay }: { name: string, category: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{category}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">F</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              FAJAR WIJAYA <span className="font-normal text-stone-500">DEV</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Tentang Saya</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Proyek</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Keahlian</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer">Kontak</a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Tentang Saya</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Proyek</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Keahlian</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer">Kontak</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Portfolio 2024
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Halo, Saya Fajar <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Creative Technologist & Full Stack Developer</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Menggabungkan logika manusia dengan imajinasi komputer untuk menciptakan pengalaman digital yang bermakna.
          </p>
          
          <div className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>JELAJAHI KARYA SAYA</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / About */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Tentang Saya</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Membangun Solusi Digital</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">S</span>aya adalah seorang pengembang perangkat lunak yang berfokus pada performa dan pengalaman pengguna. Dengan latar belakang di teknik informatika dan kecintaan pada seni visual, saya percaya bahwa kode yang baik haruslah seindah hasil akhirnya.
              </p>
              <p>
                Saya memiliki spesialisasi dalam membangun aplikasi web modern yang responsif, sistem backend yang skalabel, dan visualisasi data interaktif. Portofolio ini sendiri adalah demonstrasi dari filosofi desain saya: <strong className="text-stone-900 font-medium">bersih, fungsional, dan elegan</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Project 1: Network / Surface Code Repurposed */}
        <section id="projects" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> STUDI KASUS #1
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Sistem Monitoring Jaringan</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           Sebuah dashboard real-time yang dirancang untuk memantau kesehatan server dalam arsitektur mikroservis. Sistem ini secara otomatis mendeteksi anomali dan "load balancing" secara cerdas.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            <strong>Tantangan:</strong> Menangani ribuan request per detik tanpa lag UI.<br/>
                            <strong>Solusi:</strong> Menggunakan WebSocket dan algoritma deteksi pola terdistribusi untuk memvisualisasikan status node secara instan.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <span className="px-3 py-1 bg-stone-100 text-xs font-bold text-stone-600 rounded">React</span>
                            <span className="px-3 py-1 bg-stone-100 text-xs font-bold text-stone-600 rounded">TypeScript</span>
                            <span className="px-3 py-1 bg-stone-100 text-xs font-bold text-stone-600 rounded">Node.js</span>
                        </div>
                    </div>
                    <div>
                        {/* Repurposed Surface Code Diagram as Network Monitor */}
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Project 2: Architecture / Transformer Repurposed */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern */}
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            STUDI KASUS #2
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Otomatisasi Pipeline Data</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Merancang arsitektur pipeline data yang memproses input mentah menjadi insight bisnis yang berharga. Menggunakan pendekatan <strong>Event-Driven Architecture</strong>.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            Sistem ini mengelola alur data dari berbagai sumber, melakukan transformasi kompleks, dan menyimpannya dengan aman, mengurangi waktu pemrosesan manual hingga 80%.
                        </p>
                        <div className="flex gap-2 mt-6">
                            <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-xs font-bold text-nobel-gold rounded">Python</span>
                            <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-xs font-bold text-nobel-gold rounded">Kafka</span>
                            <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-xs font-bold text-nobel-gold rounded">AWS</span>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Results / Performance */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Hasil Nyata & Optimasi</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        Saya tidak hanya menulis kode, saya memberikan hasil. Berikut adalah perbandingan metrik performa dari proyek e-commerce klien sebelum dan sesudah optimasi sistem yang saya lakukan.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* Experience / Impact */}
        <section className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Simulasi Server Room & Hardware Integration</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">PENGALAMAN</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Perjalanan Karir</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-stone-900">Senior Frontend Engineer</h3>
                            <p className="text-sm text-stone-500 mb-2">Tech Startup Unicorn • 2022 - Sekarang</p>
                            <p className="text-stone-600 leading-relaxed">
                                Memimpin tim frontend dalam mengembangkan dashboard analitik yang digunakan oleh lebih dari 500 perusahaan enterprise.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900">Full Stack Developer</h3>
                            <p className="text-sm text-stone-500 mb-2">Digital Agency Jakarta • 2020 - 2022</p>
                            <p className="text-stone-600 leading-relaxed">
                                Mengerjakan berbagai proyek klien mulai dari e-commerce hingga company profile dengan fokus pada SEO dan performa.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Fajar memiliki kemampuan unik untuk menerjemahkan kebutuhan bisnis yang kompleks menjadi solusi teknis yang sederhana dan elegan."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Klien E-Commerce, 2023</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Skills / Authors Repurposed */}
        <section id="skills" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">KEAHLIAN</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Tech Stack</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Teknologi yang saya gunakan untuk membangun masa depan digital.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <SkillCard 
                        name="React & Next.js" 
                        category="Frontend Development" 
                        delay="0s" 
                    />
                    <SkillCard 
                        name="TypeScript" 
                        category="Language" 
                        delay="0.1s" 
                    />
                    <SkillCard 
                        name="Node.js & Go" 
                        category="Backend Systems" 
                        delay="0.2s" 
                    />
                    <SkillCard 
                        name="Three.js / WebGL" 
                        category="Creative Coding" 
                        delay="0.3s" 
                    />
                    <SkillCard 
                        name="AWS & Docker" 
                        category="DevOps & Cloud" 
                        delay="0.4s" 
                    />
                    <SkillCard 
                        name="UI/UX Design" 
                        category="Figma & Prototyping" 
                        delay="0.5s" 
                    />
                </div>
           </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-stone-900 text-white">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="font-serif text-4xl md:text-5xl mb-8">Mari Bekerja Sama</h2>
                 <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto">
                    Apakah Anda memiliki proyek menarik atau ingin mendiskusikan ide? Saya selalu terbuka untuk tantangan baru.
                 </p>
                 <a 
                    href="mailto:hello@fajar.dev"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-nobel-gold text-stone-900 rounded-full font-bold tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.3)] mb-12"
                 >
                    <Send size={20} /> KIRIM EMAIL
                 </a>
                 
                 <div className="flex justify-center gap-8 text-stone-400">
                    <a href="#" className="hover:text-nobel-gold transition-colors"><Github size={24}/></a>
                    <a href="#" className="hover:text-nobel-gold transition-colors"><Linkedin size={24}/></a>
                    <a href="#" className="hover:text-nobel-gold transition-colors"><Mail size={24}/></a>
                 </div>
            </div>
        </section>

      </main>

      <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Fajar.dev</div>
                <p className="text-sm">© 2024 Fajar Portofolio. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;