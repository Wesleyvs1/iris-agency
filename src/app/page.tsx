"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Eye,
  Cpu,
  Code2,
  Zap,
  Monitor,
  Layers,
  Terminal,
  ChevronRight,
  Menu,
  X,
  Send,
  MapPin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { sendContactRequest } from "@/lib/actions";

/* ─── DATA ─── */

const NAV_LINKS = [
  { label: "INÍCIO", href: "#inicio" },
  { label: "SOBRE", href: "#sobre" },
  { label: "SERVIÇOS", href: "#servicos" },
  { label: "METODOLOGIA", href: "#metodologia" },
  { label: "CASES", href: "#cases" },
  { label: "CONTATO", href: "#contato" },
];

const PILLARS = [
  {
    icon: Eye,
    title: "VISÃO",
    desc: "Enxergamos além do código. Analisamos seu mercado para criar ferramentas que capturam atenção e retêm usuários.",
  },
  {
    icon: Cpu,
    title: "CIRCUITO",
    desc: "Conectamos processos complexos através de automações invisíveis, eliminando atrito operacional.",
  },
  {
    icon: Code2,
    title: "CÓDIGO",
    desc: "Construímos infraestruturas web modernas, performáticas e à prova de falhas com as melhores stacks do mercado.",
  },
  {
    icon: Zap,
    title: "IMPACTO",
    desc: "Resultados mensuráveis. Velocidade de carregamento extrema e arquitetura focada em conversão e vendas.",
  },
];

const SERVICES = [
  {
    icon: Monitor,
    title: "DESENVOLVIMENTO WEB",
    desc: "Sites institucionais, landing pages de alta conversão e plataformas web sob medida. Design brutalista e performance extrema.",
    features: ["React / Vite / Next.js", "Animações Fluidas", "Otimização SEO"],
  },
  {
    icon: Layers,
    title: "AUTOMAÇÃO DE PROCESSOS",
    desc: "Sistemas interconectados que trabalham por você 24/7. Integração de APIs, CRMs e fluxos de atendimento automatizados.",
    features: ["Integrações API", "Workflows Customizados", "Redução de Custos"],
  },
  {
    icon: Terminal,
    title: "PROBLEM-SOLVING WEB",
    desc: "Auditoria e refatoração de sistemas legados. Resolvemos gargalos de performance, segurança e arquitetura no seu software.",
    features: ["Code Review", "Otimização de Performance", "Escalabilidade"],
  },
];

const METHODOLOGY_STEPS = [
  {
    num: "01",
    title: "MAPEAMENTO TÁTICO",
    desc: "Análise profunda do seu modelo de negócio, concorrência e objetivos. Definimos a arquitetura da solução antes de escrever a primeira linha de código.",
  },
  {
    num: "02",
    title: "DESIGN DE INTERFACE",
    desc: "Wireframes, protótipos e a estética IRIS aplicada à sua marca.",
  },
  {
    num: "03",
    title: "ENGENHARIA & CÓDIGO",
    desc: "Desenvolvimento front-end e integrações. Utilizamos tecnologias state-of-the-art para garantir velocidade, segurança e escalabilidade.",
  },
  {
    num: "04",
    title: "IMPLANTAÇÃO & ESCALA",
    desc: "Testes rigorosos, deploy em infraestrutura de alta performance e monitoramento contínuo para garantir estabilidade.",
  },
];

const TECH_STACK = [
  { name: "React", label: "FRONTEND" },
  { name: "Vite", label: "BUILD TOOL" },
  { name: "Next.js", label: "FRAMEWORK" },
  { name: "TypeScript", label: "LANGUAGE" },
  { name: "Tailwind CSS", label: "STYLING" },
  { name: "Node.js", label: "BACKEND" },
  { name: "PostgreSQL", label: "DATABASE" },
  { name: "AWS / Vercel", label: "INFRASTRUCTURE" },
];

const STATS_BANNER = [
  { value: "1M+", label: "LINHAS DE CÓDIGO" },
  { value: "100+", label: "PROJETOS ENTREGUES" },
  { value: "100%", label: "SATISFAÇÃO" },
  { value: "5+", label: "ANOS DE EXPERIÊNCIA" },
];

const CASES = [
  {
    title: "PORTFÓLIO TECHNOLÓGICO",
    tag: "TERMINAL ECOSYSTEM",
    desc: "Ecossistema disruptivo com interface terminal-level, infraestrutura serverless e performance otimizada para o padrão IRIS.",
    image: "/case_portfolio.png",
    link: "https://blackcivic.com.br/"
  },
  {
    title: "AURA E-COMMERCE",
    tag: "E-COMMERCE",
    desc: "Loja virtual headless com tempo de carregamento inferior a 1 segundo.",
    image: null,
    link: "#"
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
    link: "/arquivos_de_operacao/petpal/index.html"
  },
];

const TESTIMONIALS = [
  {
    text: "A IRIS não apenas fez nosso site, eles reestruturaram a forma como captamos clientes na internet. A conversão aumentou 400% em dois meses.",
    author: "Carlos M.",
    role: "CEO, Nexus Finanças",
  },
  {
    text: "Velocidade impressionante. O sistema de automação que implementaram reduziu nosso trabalho manual em 20 horas semanais.",
    author: "Ana L.",
    role: "COO, Vanguard Logística",
  },
  {
    text: "Profissionalismo cirúrgico. Cumpriram prazos, entregaram um design brutal e um código limpo. A melhor agência com quem já trabalhamos.",
    author: "Ricardo S.",
    role: "CTO, Horizon Clínicas",
  },
];

/* ─── ANIMATIONS ─── */

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

/* ─── COMPONENTS ─── */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-4 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
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
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative group text-[0.85rem] font-bold tracking-[0.2em] text-white/90 hover:text-white transition-colors font-[family-name:var(--font-jetbrains-mono)] overflow-hidden py-1"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-iris-orange -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          ))}
          <a href="#contato" className="group relative overflow-hidden text-[0.8rem] py-3 px-6 rounded-lg border border-iris-orange/50 bg-iris-orange/5 text-iris-orange font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-grotesk)] hover:border-iris-orange/80 hover:shadow-[0_0_20px_rgba(217,119,47,0.25)] transition-all duration-300">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06070b]">INICIAR PROJETO</span>
            <span className="absolute inset-0 bg-iris-orange translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </a>
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
               {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold tracking-[0.15em] text-white/90 hover:text-iris-orange transition-colors font-[family-name:var(--font-jetbrains-mono)]"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contato" className="text-center mt-4 rounded-lg border border-iris-orange/50 bg-iris-orange/10 text-iris-orange font-bold tracking-[0.15em] uppercase text-sm py-3 px-6 font-[family-name:var(--font-space-grotesk)] hover:bg-iris-orange/20 transition-all" onClick={() => setOpen(false)}>
                INICIAR PROJETO
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* All rounding illuminations behind text removed for requested dark section aesthetic */}
        {/* Very subtle, tight halo only for the orbital circle to give depth without bleeding light */}
        <div className="absolute top-[50%] right-[12%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-iris-orange/10 blur-[100px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-iris-border to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-[290px] items-center py-20 pointer-events-none">
        {/* Left Content */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[680px] pointer-events-auto">
          <motion.div variants={fadeUp} custom={0} className="border border-iris-orange/20 border-l-0 w-fit pr-6 py-2 mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-iris-orange animate-pulse ml-4" />
            <span className="text-[0.65rem] tracking-[0.2em] text-iris-orange font-[family-name:var(--font-jetbrains-mono)] font-bold">SISTEMAS OPERACIONAIS ONLINE</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-6xl sm:text-7xl lg:text-[6rem] xl:text-[6.4rem] font-bold leading-[0.9] mb-8 font-[family-name:var(--font-space-grotesk)] text-white tracking-[-0.05em]"
          >
            DOMINE
            <br />
            <span className="whitespace-nowrap">O AMBIENTE</span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="iris-gradient-text relative z-10">DIGITAL.</span>
              <div className="absolute inset-0 top-1/2 -translate-y-1/2 bg-iris-orange/20 blur-[50px] rounded-full z-0 scale-x-125" />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-xl lg:text-[1.35rem] text-[#e8e6e3] max-w-[640px] mb-12 leading-[1.6] font-medium" style={{ textTransform: "none", letterSpacing: 0 }}>
            Não criamos apenas sites. Desenvolvemos centros de comando para o seu negócio. Automações precisas, plataformas robustas e soluções arquitetadas para escalar.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-5">
            <a href="#contato" className="bg-[#d9772f] hover:bg-[#e8924e] text-[#06070b] text-base tracking-[0.08em] font-bold font-[family-name:var(--font-space-grotesk)] py-5 px-10 rounded-md flex items-center gap-4 transition-all hover:shadow-[0_0_30px_rgba(217,119,47,0.3)]">
              ACESSAR CONSULTORIA <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </a>
            <a href="#cases" className="bg-transparent border border-white/20 hover:border-white/40 text-white text-base tracking-[0.08em] font-bold font-[family-name:var(--font-space-grotesk)] py-5 px-10 rounded-md transition-all flex items-center">
              VER PROJETOS
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Hero Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center relative pointer-events-auto"
        >
          <div className="relative w-[500px] h-[500px]">
            {/* Outer spinning ring with orbital dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border-2 border-iris-orange/15"
              style={{ boxShadow: '0 0 40px rgba(217,119,47,0.06)' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-iris-orange shadow-[0_0_12px_rgba(217,119,47,0.7)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-iris-orange/50" />
            </motion.div>
            {/* Middle counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full border border-dashed border-iris-border/40"
            >
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-iris-orange/40" />
            </motion.div>
            {/* Inner glow ring */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-iris-orange/20 via-transparent to-iris-orange/10 blur-sm" />
            {/* Video container with pulsing border glow */}
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(217,119,47,0.1)', 
                  '0 0 60px rgba(217,119,47,0.15)', 
                  '0 0 30px rgba(217,119,47,0.1)'
                ] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full overflow-hidden border border-iris-orange/20 bg-[#06070b]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.05]"
              >
                <source src="/video-2_AQ69cf5u.mp4" type="video/mp4" />
              </video>
              
              {/* Refined overlays for seamless blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-transparent opacity-40 shrink-0" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(6,7,11,0.9)] pointer-events-none" />
            </motion.div>
            {/* Floating animated accents */}
            <motion.div
              animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-8 w-2 h-2 rounded-full bg-iris-orange shadow-[0_0_8px_rgba(217,119,47,0.6)]"
            />
            <motion.div
              animate={{ y: [5, -5, 5], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-14 left-0 w-3 h-3 rounded-sm bg-iris-orange/50 rotate-45"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-yellow-400/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="relative py-[96px] border-t border-iris-border-subtle bg-[#070a0f]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
        {/* Left — Pillars grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-2 gap-4 items-start"
        >
          <div className="flex flex-col gap-4">
            {[PILLARS[0], PILLARS[2]].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={i * 2}
                className="group bg-[#06070b]/50 border border-iris-border-subtle p-6 sm:p-8 flex flex-col gap-5 hover:border-iris-orange/40 hover:bg-[#06070b] hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(217,119,47,0.2)] transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-iris-orange/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p.icon className="w-6 h-6 text-iris-orange group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <h3 className="text-sm md:text-base font-bold tracking-[0.15em] text-white font-[family-name:var(--font-space-grotesk)]">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[22.8px] tracking-[-0.2px] text-[#C9BEB1] font-normal" style={{ textTransform: "none" }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-12">
            {[PILLARS[1], PILLARS[3]].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={(i * 2) + 1}
                className="group bg-[#06070b]/50 border border-iris-border-subtle p-6 sm:p-8 flex flex-col gap-5 hover:border-iris-orange/40 hover:bg-[#06070b] hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(217,119,47,0.2)] transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-iris-orange/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p.icon className="w-6 h-6 text-iris-orange group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <h3 className="text-sm md:text-base font-bold tracking-[0.15em] text-white font-[family-name:var(--font-space-grotesk)]">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[22.8px] tracking-[-0.2px] text-[#C9BEB1] font-normal" style={{ textTransform: "none" }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — About text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="iris-section-label mb-6">
            A AGÊNCIA IRIS
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-white font-[family-name:var(--font-space-grotesk)]"
          >
            ENGENHARIA DE
            <br />
            ALTA PRECISÃO
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[18px] leading-[29.3px] tracking-[-0.2px] text-[#C9BEB1] font-normal mb-6" style={{ textTransform: "none" }}>
            A IRIS nasceu da necessidade de elevar o padrão do desenvolvimento web. Não entregamos templates genéricos. Construímos ativos digitais que funcionam como máquinas de vendas e otimização para empresas sérias.
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="text-[18px] leading-[29.3px] tracking-[-0.2px] text-[#C9BEB1] font-normal mb-10" style={{ textTransform: "none" }}>
            Nosso símbolo reflete nossa essência: o olho que tudo vê no mercado (Estratégia), os circuitos que conectam sistemas (Automação), e o código que constrói a realidade (Engenharia).
          </motion.p>
          <motion.div variants={fadeUp} custom={4} className="flex gap-16 border-t border-iris-border-subtle pt-8">
            <div>
              <span className="text-[36px] leading-[40px] tracking-[-1.8px] font-light text-[#F5F1EB] font-[family-name:var(--font-space-grotesk)]">100+</span>
              <p className="text-[10px] tracking-[0.1em] text-iris-text-muted mt-2 font-[family-name:var(--font-jetbrains-mono)]">PROJETOS ENTREGUES</p>
            </div>
            <div>
              <span className="text-[36px] leading-[40px] tracking-[-1.8px] font-light text-[#F5F1EB] font-[family-name:var(--font-space-grotesk)]">99%</span>
              <p className="text-[10px] tracking-[0.1em] text-iris-text-muted mt-2 font-[family-name:var(--font-jetbrains-mono)]">UPTIME GARANTIDO</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicos" className="relative py-[96px] border-t border-iris-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-white"
          >
            ARSENAL DE <span className="iris-gradient-text" style={{ filter: 'drop-shadow(0 0 20px rgba(217,119,47,0.6)) drop-shadow(0 0 40px rgba(217,119,47,0.3))' }}>SOLUÇÕES</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-iris-text-muted mt-4 max-w-2xl mx-auto" style={{ textTransform: "none", letterSpacing: 0 }}>
            Ferramentas projetadas para dominação de mercado. Cada serviço é arquitetado para gerar resultados reais.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} variants={fadeUp} custom={i} className="group iris-card p-8 flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(217,119,47,0.15)] hover:border-iris-orange/30">
              <div className="absolute inset-0 bg-gradient-to-br from-iris-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-start justify-between relative z-10">
                <s.icon className="w-7 h-7 text-iris-orange group-hover:scale-110 transition-transform duration-500" />
                <s.icon className="w-5 h-5 text-iris-border opacity-40 group-hover:text-iris-orange/20 transition-colors duration-500" />
              </div>
              <h3 className="text-base font-bold tracking-[0.1em] font-[family-name:var(--font-space-grotesk)]">
                {s.title}
              </h3>
              <p className="text-sm text-iris-text-muted leading-relaxed flex-1" style={{ textTransform: "none", letterSpacing: 0 }}>
                {s.desc}
              </p>
              <ul className="flex flex-col gap-2 pt-4 border-t border-iris-border-subtle">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-iris-text-muted font-[family-name:var(--font-jetbrains-mono)]" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
                    <span className="w-1 h-1 rounded-full bg-iris-orange" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <section id="metodologia" className="relative py-[96px] border-t border-iris-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_1.5fr] gap-16">
        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold leading-tight font-[family-name:var(--font-space-grotesk)]">
            PROTOCOLO DE
            <br />
            <span className="iris-gradient-text" style={{ filter: 'drop-shadow(0 0 20px rgba(217,119,47,0.5)) drop-shadow(0 0 60px rgba(217,119,47,0.25))' }}>EXECUÇÃO</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-iris-text-muted mt-6 leading-relaxed mb-8" style={{ textTransform: "none", letterSpacing: 0 }}>
            Nosso processo é militar. Sem achismos, apenas métodos validados que garantem entregas no prazo e com qualidade excepcional.
          </motion.p>
          <motion.a variants={fadeUp} custom={2} href="#contato" className="iris-btn-outline w-full sm:w-auto flex justify-between items-center group text-xs font-[family-name:var(--font-jetbrains-mono)] tracking-[0.1em] border-iris-border/40 hover:border-iris-orange">
            AGENDAR BRIEFING
            <ArrowUpRight className="w-4 h-4 text-iris-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Right — Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-8"
        >
          {METHODOLOGY_STEPS.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} custom={i} className="group flex gap-6 items-start p-4 -ml-4 rounded-xl hover:bg-iris-surface-light border border-transparent hover:border-iris-border-subtle transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg border border-iris-border group-hover:border-iris-orange/50 group-hover:bg-iris-orange/10 flex items-center justify-center text-iris-orange font-bold text-lg font-[family-name:var(--font-space-grotesk)] transition-all duration-300 group-hover:scale-110">
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-[0.1em] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  {step.title}
                </h3>
                <p className="text-sm text-iris-text-muted leading-relaxed" style={{ textTransform: "none", letterSpacing: 0 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className="relative py-24 border-t border-iris-border-subtle bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-16 text-white font-[family-name:var(--font-space-grotesk)]"
        >
          TECNOLOGIA DE <span className="text-iris-orange">PONTA</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {TECH_STACK.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              className="bg-[#06070b] border border-white/[0.08] hover:border-iris-orange/50 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(217,119,47,0.2)] transition-all duration-500 px-6 py-6 min-w-[140px] sm:min-w-[160px] flex flex-col items-center justify-center gap-1.5 group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-iris-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-[1rem] sm:text-lg font-bold text-white group-hover:text-iris-orange transition-colors duration-300 font-[family-name:var(--font-space-grotesk)]">
                {t.name}
              </span>
              <p className="text-[0.6rem] tracking-[0.2em] text-[#d9772f]/80 font-bold font-[family-name:var(--font-jetbrains-mono)] uppercase mt-1">
                {t.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="w-full bg-[#d9772f] h-auto lg:h-[376px] flex items-center py-20 lg:py-0">
      <div className="w-full max-w-[1900px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full gap-y-16 lg:gap-y-0">
          {STATS_BANNER.map((s, idx) => (
            <div 
              key={s.label} 
              className="flex flex-col items-center justify-center text-center relative"
            >
              {/* Linha divisória vertical (visível apenas em telas grandes) */}
              {idx !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[160px] bg-[#000000]/15" />
              )}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#06070b] font-[family-name:var(--font-space-grotesk)] leading-none mb-6">
                {s.value}
              </span>
              <p className="text-[0.65rem] sm:text-xs tracking-[0.2em] text-[#06070b]/80 font-bold uppercase font-[family-name:var(--font-inter)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesSection({ onPreview }: { onPreview: (url: string) => void }) {
  return (
    <section id="cases" className="relative py-[96px] border-t border-iris-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)]">
              ARQUIVOS DE
              <br />
              <span className="iris-gradient-text">OPERAÇÃO</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-iris-text-muted mt-4 max-w-lg" style={{ textTransform: "none", letterSpacing: 0 }}>
              Projetos recentes desenvolvidos sob o rigoroso padrão IRIS. Interfaces que dominam e sistemas que não falham.
            </motion.p>
          </div>
          <motion.a variants={fadeUp} custom={2} href="#" className="iris-btn-outline shrink-0">
            VER TODOS OS CASOS
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {CASES.map((c, i) => (
            <motion.div 
              key={c.title} 
              onClick={() => {
                if (c.link.startsWith('/')) {
                  onPreview(c.link);
                } else if (c.link !== '#') {
                  window.open(c.link, '_blank');
                }
              }}
              variants={fadeUp} 
              custom={i} 
              className="iris-card overflow-hidden group block cursor-pointer"
            >
              {/* Image Container */}
              <div className="h-64 bg-gradient-to-br from-iris-surface-light to-iris-surface relative overflow-hidden">
                {c.image ? (
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
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
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-bold tracking-[0.1em] font-[family-name:var(--font-space-grotesk)] group-hover:text-iris-orange transition-colors">
                    {c.title}
                  </h3>
                  <span className="text-[0.55rem] tracking-[0.15em] text-iris-text-muted border border-iris-border-subtle px-3 py-1 rounded font-[family-name:var(--font-jetbrains-mono)]">
                    {c.tag}
                  </span>
                </div>
                <p className="text-sm text-iris-text-muted" style={{ textTransform: "none", letterSpacing: 0 }}>
                  {c.desc}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-[0.65rem] font-bold text-iris-orange/0 group-hover:text-iris-orange transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  ACESSAR PROJETO <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-[96px] border-t border-iris-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-16 font-[family-name:var(--font-space-grotesk)]"
        >
          AUTORIDADE <span className="iris-gradient-text">VALIDADA</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="group iris-card p-8 flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(217,119,47,0.15)] hover:border-iris-orange/30">
              <div className="absolute inset-0 bg-gradient-to-br from-iris-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-2xl text-iris-orange font-bold mb-6 group-hover:scale-125 origin-left transition-transform duration-500">&ldquo;&rdquo;</span>
              <p className="text-sm text-iris-text-muted leading-relaxed flex-1 mb-6" style={{ textTransform: "none", letterSpacing: 0 }}>
                {t.text}
              </p>
              <div className="border-t border-iris-border-subtle pt-4">
                <p className="text-sm font-bold font-[family-name:var(--font-space-grotesk)]">{t.author}</p>
                <p className="text-xs text-iris-text-muted font-[family-name:var(--font-jetbrains-mono)]" style={{ textTransform: "none", letterSpacing: "0.02em" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendContactRequest(formData);
    
    setIsPending(false);
    
    if (result.success) {
      toast.success("Mensagem enviada! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Erro ao enviar mensagem.");
    }
  }

  return (
    <section id="contato" className="relative py-[96px] border-t border-iris-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
        {/* Left — info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="iris-section-label mb-6">
            CONTATO
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold leading-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            INICIAR
            <br />
            <span className="iris-gradient-text">OPERAÇÃO</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-iris-text-muted leading-relaxed mb-10" style={{ textTransform: "none", letterSpacing: 0 }}>
            Pronto para elevar sua presença digital ao próximo nível? Entre em contato com a equipe IRIS.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-iris-text-muted">
              <Mail className="w-4 h-4 text-iris-orange" />
              <span style={{ textTransform: "none", letterSpacing: 0 }}>contato@irisagency.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-iris-text-muted">
              <Phone className="w-4 h-4 text-iris-orange" />
              <span style={{ textTransform: "none", letterSpacing: 0 }}>+55 (11) 9xxxx-xxxx</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-iris-text-muted">
              <MapPin className="w-4 h-4 text-iris-orange" />
              <span style={{ textTransform: "none", letterSpacing: 0 }}>São Paulo, SP — Brasil</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <motion.div variants={fadeUp} custom={0} className="grid sm:grid-cols-2 gap-5">
            <input
              required
              name="name"
              type="text"
              placeholder="Seu nome"
              className="w-full bg-iris-surface border border-iris-border-subtle rounded-lg px-4 py-3 text-sm text-iris-text placeholder:text-iris-text-muted/50 focus:outline-none focus:border-iris-orange/50 transition-colors"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Seu e-mail"
              className="w-full bg-iris-surface border border-iris-border-subtle rounded-lg px-4 py-3 text-sm text-iris-text placeholder:text-iris-text-muted/50 focus:outline-none focus:border-iris-orange/50 transition-colors"
            />
          </motion.div>
          <motion.input
            required
            name="subject"
            variants={fadeUp}
            custom={1}
            type="text"
            placeholder="Assunto"
            className="w-full bg-iris-surface border border-iris-border-subtle rounded-lg px-4 py-3 text-sm text-iris-text placeholder:text-iris-text-muted/50 focus:outline-none focus:border-iris-orange/50 transition-colors"
          />
          <motion.textarea
            required
            name="message"
            variants={fadeUp}
            custom={2}
            placeholder="Descreva seu projeto..."
            rows={5}
            className="w-full bg-iris-surface border border-iris-border-subtle rounded-lg px-4 py-3 text-sm text-iris-text placeholder:text-iris-text-muted/50 focus:outline-none focus:border-iris-orange/50 transition-colors resize-none"
          />
          <motion.button 
            disabled={isPending}
            variants={fadeUp} 
            custom={3} 
            type="submit" 
            className="iris-btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "ENVIANDO..." : "ENVIAR MENSAGEM"} <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-iris-border-subtle py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-[96px] h-9 overflow-hidden flex-shrink-0 opacity-80">
              <Image
                src="/logo (2).png"
                alt="Logo IRIS"
                width={150}
                height={50}
                className="absolute left-0 top-[-5%] h-[110%] w-auto max-w-none mix-blend-screen brightness-110 contrast-125"
                style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }}
              />
            </div>
            <span className="text-xl font-bold tracking-[0.1em] font-[family-name:var(--font-space-grotesk)] iris-gradient-text opacity-90">IRIS</span>
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

/* ─── PAGE ─── */

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ContactSection />
        <AboutSection />
        <ServicesSection />
        <MethodologySection />
        <TechStackSection />
        <StatsBanner />
        <CasesSection onPreview={setPreviewUrl} />
        <TestimonialsSection />
      </main>
      <Footer />

      <AnimatePresence>
        {previewUrl && (
          <CasePreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function CasePreviewModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#06070b]/95 backdrop-blur-md"
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
        <div className="bg-iris-surface-light border-b border-iris-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-iris-orange/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="ml-4 px-3 py-1 bg-iris-surface border border-iris-border rounded-md text-[0.65rem] font-[family-name:var(--font-jetbrains-mono)] text-iris-text-muted flex items-center gap-2 min-w-[200px] sm:min-w-[400px]">
              <Globe className="w-3 h-3" />
              {url}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-iris-surface rounded-lg transition-colors text-iris-text-muted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Preview"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
