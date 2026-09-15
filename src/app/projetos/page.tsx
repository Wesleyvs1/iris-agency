"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Terminal,
  Globe,
  ExternalLink,
  ArrowUpRight,
  Search,
  Monitor,
  Phone,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";

// ─── DATA ───
const CASES = [
  {
    title: "MALLU PET",
    tag: "E-COMMERCE & PET",
    desc: "Plataforma de vendas e cuidados para pets, combinando estética premium com alta performance em conversão e experiência de usuário.",
    image: "/case_mallupet.png",
    link: "https://mallupet.com.br"
  },
  {
    title: "PORTFÓLIO TECHNOLÓGICO",
    tag: "TERMINAL ECOSYSTEM",
    desc: "Ecossistema disruptivo com interface terminal-level, infraestrutura serverless e performance otimizada para o padrão IRIS.",
    image: "/case_portfolio.png",
    link: "https://portf-tecnologico-phi.vercel.app/"
  },
  {
    title: "AGROFORGE",
    tag: "E-COMMERCE & AGRO",
    desc: "Plataforma de e-commerce focada no agronegócio, com alta performance e integração direta de ponta a ponta.",
    image: "/case_agroforge2.png",
    link: "https://agroforge-nextjs.vercel.app"
  },
  {
    title: "VANGUARD LOGÍSTICA",
    tag: "SISTEMA INTERNO",
    desc: "Software de automação de frotas reduzindo custos operacionais em 30%.",
    image: null,
    link: "#"
  },
  {
    title: "REINO DOS PETS",
    tag: "PET CARE & VETERINARY",
    desc: "Centro veterinário completo com sistema de agendamento online e gestão de cuidados animais, focado em performance e conversão.",
    image: "/case_reino_pets.png",
    link: "/arquivos_de_operacao/reinodospets/index.html"
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-4 bg-transparent border-b border-iris-border-subtle bg-[#06070b]/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div 
            className="relative w-[98px] h-[57px] overflow-hidden flex-shrink-0"
            style={{ 
              clipPath: 'ellipse(50% 45% at 50% 50%)',
              filter: 'drop-shadow(0 0 10px rgba(217, 119, 47, 0.2))'
            }}
          >
            <Image
              src="/logo (2).png"
              alt="Logo IRIS"
              width={300}
              height={100}
              className="absolute left-[-10px] top-1/2 -translate-y-1/2 h-[110%] w-auto max-w-none transition-transform group-hover:scale-110 mix-blend-screen brightness-125 contrast-125"
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-[0.2em] font-[family-name:var(--font-space-grotesk)] iris-gradient-text">IRIS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="relative group text-[0.85rem] font-bold tracking-[0.2em] text-white/90 hover:text-white transition-colors font-[family-name:var(--font-jetbrains-mono)] overflow-hidden py-1"
          >
            INÍCIO
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-iris-orange -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
          <Link href="/#contato" className="group relative overflow-hidden text-[0.8rem] py-3 px-6 rounded-lg border border-iris-orange/50 bg-iris-orange/5 text-iris-orange font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-grotesk)] hover:border-iris-orange/80 hover:shadow-[0_0_20px_rgba(217,119,47,0.25)] transition-all duration-300">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06070b]">INICIAR PROJETO</span>
            <span className="absolute inset-0 bg-iris-orange translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-iris-text">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#06070b]/95 backdrop-blur-xl border-t border-white/[0.04] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
               <Link
                 href="/"
                 onClick={() => setOpen(false)}
                 className="text-sm font-bold tracking-[0.15em] text-white/90 hover:text-iris-orange transition-colors font-[family-name:var(--font-jetbrains-mono)]"
               >
                 INÍCIO
               </Link>
              <Link href="/#contato" className="text-center mt-4 rounded-lg border border-iris-orange/50 bg-iris-orange/10 text-iris-orange font-bold tracking-[0.15em] uppercase text-sm py-3 px-6 font-[family-name:var(--font-space-grotesk)] hover:bg-iris-orange/20 transition-all" onClick={() => setOpen(false)}>
                INICIAR PROJETO
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-iris-border-subtle py-12 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div 
              className="relative w-[80px] h-[46px] overflow-hidden flex-shrink-0 opacity-90"
              style={{ 
                clipPath: 'ellipse(50% 45% at 50% 50%)',
                filter: 'drop-shadow(0 0 8px rgba(217, 119, 47, 0.2))'
              }}
            >
              <Image
                src="/logo (2).png"
                alt="Logo IRIS"
                width={200}
                height={70}
                className="absolute left-[-8px] top-1/2 -translate-y-1/2 h-[110%] w-auto max-w-none mix-blend-screen brightness-125 contrast-125"
              />
            </div>
            <span className="text-xl font-bold tracking-[0.15em] font-[family-name:var(--font-space-grotesk)] iris-gradient-text opacity-90">IRIS</span>
          </div>

          <p className="text-xs text-iris-text-muted font-[family-name:var(--font-jetbrains-mono)]" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
            © 2025 IRIS Agency. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-iris-text-muted hover:text-iris-orange transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="text-iris-text-muted hover:text-iris-orange transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CasePreviewModal({ url, onClose }: { url: string; onClose: () => void }) {
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-8 bg-[#06070b]/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full h-full max-w-6xl bg-iris-surface border border-iris-border overflow-hidden rounded-xl flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Toolbar */}
        <div className="bg-iris-surface-light border-b border-iris-border px-3 sm:px-4 py-3 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden sm:flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-iris-orange/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-iris-surface border border-iris-border p-1 rounded-lg">
              <button
                onClick={() => setViewMode('web')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-md text-[0.6rem] sm:text-[0.65rem] font-bold transition-all ${
                  viewMode === 'web' 
                  ? 'bg-iris-orange text-black' 
                  : 'text-iris-text-muted hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                WEB
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-md text-[0.6rem] sm:text-[0.65rem] font-bold transition-all ${
                  viewMode === 'mobile' 
                  ? 'bg-iris-orange text-black' 
                  : 'text-iris-text-muted hover:text-white'
                }`}
              >
                <Phone className="w-3 h-3" />
                MOBILE
              </button>
            </div>

            <div className="hidden md:flex ml-2 px-3 py-1 bg-iris-surface border border-iris-border rounded-md text-[0.65rem] font-[family-name:var(--font-jetbrains-mono)] text-iris-text-muted items-center gap-2 min-w-[200px] lg:min-w-[300px] truncate">
              <Globe className="w-3 h-3 shrink-0" />
              <span className="truncate">{url}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-iris-surface rounded-lg transition-colors text-iris-text-muted hover:text-white shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className={`flex-1 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center ${viewMode === 'mobile' ? 'py-4 sm:py-10' : ''}`}>
          {viewMode === 'web' ? (
            <iframe 
              src={url} 
              className="w-full h-full border-none bg-white"
              title="Preview"
            />
          ) : (
            <div className="relative w-full max-w-[414px] h-full max-h-[896px] sm:bg-black rounded-[2rem] sm:rounded-[3.5rem] sm:border-[14px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col my-auto shrink-0">
              <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-[#1a1a1a] rounded-b-[2rem] z-20 items-center justify-center">
                <div className="w-12 h-1 bg-[#2a2a2a] rounded-full mt-1" />
              </div>
              
              <div className="w-full h-full overflow-hidden relative bg-white sm:rounded-[2.5rem]">
                <iframe 
                  src={url} 
                  className="w-full h-full border-none"
                  title="Preview Mobile"
                />
              </div>

              <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-20" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjetosPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const allTags = CASES.map(c => c.tag);
    return Array.from(new Set(allTags));
  }, []);

  const filteredCases = useMemo(() => {
    return CASES.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? c.tag === selectedTag : true;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-[#050505]">
      <Navbar />
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.h1 variants={fadeUp} custom={0} className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-6">
            ARQUIVOS DE <span className="iris-gradient-text" style={{ filter: 'drop-shadow(0 0 20px rgba(217,119,47,0.6)) drop-shadow(0 0 40px rgba(217,119,47,0.3))' }}>OPERAÇÃO</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="text-iris-text-muted max-w-2xl text-lg" style={{ textTransform: "none", letterSpacing: 0 }}>
            Explore nossos projetos recentes e veja como aplicamos nosso protocolo de execução para dominar o ambiente digital.
          </motion.p>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start gap-6 mb-12"
        >
          {/* Busca */}
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-iris-text-muted" />
            <input 
              type="text" 
              placeholder="Pesquisar projetos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-iris-surface border border-iris-border-subtle rounded-lg pl-12 pr-4 py-3 text-sm text-iris-text placeholder:text-iris-text-muted/50 focus:outline-none focus:border-iris-orange/50 transition-colors"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <span className="text-sm font-[family-name:var(--font-jetbrains-mono)] text-iris-text-muted shrink-0 hidden md:block">FILTRAR POR:</span>
            <div className="flex flex-wrap gap-2 items-center">
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-[family-name:var(--font-jetbrains-mono)] transition-all ${
                  selectedTag === null 
                  ? "bg-iris-orange text-black shadow-[0_0_15px_rgba(217,119,47,0.4)]" 
                  : "bg-iris-surface border border-iris-border-subtle text-iris-text-muted hover:border-iris-orange/50 hover:text-white"
                }`}
              >
                TODOS
              </button>
              {tags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-[family-name:var(--font-jetbrains-mono)] transition-all ${
                    selectedTag === tag 
                    ? "bg-iris-orange text-black shadow-[0_0_15px_rgba(217,119,47,0.4)]" 
                    : "bg-iris-surface border border-iris-border-subtle text-iris-text-muted hover:border-iris-orange/50 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lista de Casos */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c) => (
              <motion.div 
                key={c.title} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (c.link !== '#') {
                    setPreviewUrl(c.link);
                  }
                }}
                className="iris-card overflow-hidden group flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="h-64 bg-gradient-to-br from-iris-surface-light to-iris-surface relative overflow-hidden shrink-0">
                  {c.image ? (
                    <Image 
                      src={c.image} 
                      alt={c.title} 
                      fill 
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Terminal className="w-16 h-16" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[0.6rem] tracking-[0.15em] text-green-400 font-[family-name:var(--font-jetbrains-mono)] font-bold">
                      STATUS: OPERACIONAL
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <h3 className="text-base font-bold tracking-[0.1em] font-[family-name:var(--font-space-grotesk)] group-hover:text-iris-orange transition-colors">
                      {c.title}
                    </h3>
                  </div>
                  <span className="self-start text-[0.55rem] tracking-[0.15em] text-iris-text-muted border border-iris-border-subtle px-3 py-1 rounded font-[family-name:var(--font-jetbrains-mono)] mb-4">
                    {c.tag}
                  </span>
                  <p className="text-sm text-iris-text-muted flex-1" style={{ textTransform: "none", letterSpacing: 0 }}>
                    {c.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[0.65rem] font-bold text-iris-orange/0 group-hover:text-iris-orange transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    ACESSAR PROJETO <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredCases.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full py-20 flex flex-col items-center justify-center text-center mt-8"
          >
            <Terminal className="w-12 h-12 text-iris-border mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">NENHUM RESULTADO ENCONTRADO</h3>
            <p className="text-iris-text-muted">Ajuste seus filtros ou termo de busca.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-6 iris-btn-outline"
            >
              LIMPAR FILTROS
            </button>
          </motion.div>
        )}
      </main>

      <Footer />

      <AnimatePresence>
        {previewUrl && (
          <CasePreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
