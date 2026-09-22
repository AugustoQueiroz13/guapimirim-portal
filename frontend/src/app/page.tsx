"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import {
  MapPin, Utensils, ShoppingBag, Bed, Camera, ArrowRight,
  Star, ChevronRight, Megaphone, Compass, PhoneCall, Bus,
  Search, CloudSun, Calendar, Thermometer, Map
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Head from "next/head";
import { sendGAEvent } from '@next/third-parties/google';

const Counter = ({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center flex flex-col items-center p-4 bg-emerald-50/50 rounded-3xl border border-emerald-100">
      <div className="text-4xl md:text-5xl font-black text-emerald-500 mb-1 drop-shadow-sm">{count}{suffix}</div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#1B3022]/60">{label}</div>
    </div>
  );
};

// Imagens espelhando o topo de cada categoria do portal
const heroSlides = [
  {
    image: "/guapimirim_serra_dos_orgaos.jpg",
    subtitle: "Guia Oficial",
    title: "Guapimirim",
    desc: "Onde a Serra abraça o Mar"
  },
  {
    image: "/turismo.jpg",
    subtitle: "Aventura e Paz",
    title: "Turismo Natural",
    desc: "Cachoeiras e trilhas inesquecíveis"
  },
  {
    image: "/gastronomia.jpg",
    subtitle: "Gastronomia",
    title: "Sabores Locais",
    desc: "A culinária que encanta o paladar"
  },
  {
    image: "/hospedagem.jpg",
    subtitle: "Hospedagem",
    title: "Refúgio Perfeito",
    desc: "Descanse com o som da natureza"
  },
  {
    image: "/comercio.jpg",
    subtitle: "Vitrine de Negócios",
    title: "Essência da Cidade",
    desc: "Valorize quem faz a cidade acontecer"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destaques, setDestaques] = useState<any[]>([]);
  const [loadingDestaques, setLoadingDestaques] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventos, setEventos] = useState<any[]>([]);
  const [loadingEventos, setLoadingEventos] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/comercio`);
    }
  };

  // Busca eventos reais do Django
  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/eventos/');
        if (res.ok) {
          const data = await res.json();
          setEventos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos no banco:", error);
      } finally {
        setLoadingEventos(false);
      }
    }
    fetchEventos();
  }, []);

  // Troca automática do Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Busca os destaques reais do Django
  useEffect(() => {
    async function fetchDestaquesReais() {
      try {
        const [resComercio, resGastronomia, resHospedagem] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/comercio/').catch(() => null),
          fetch('http://127.0.0.1:8000/api/gastronomia/').catch(() => null),
          fetch('http://127.0.0.1:8000/api/hospedagem/').catch(() => null)
        ]);

        const dataComercio = resComercio?.ok ? await resComercio.json() : [];
        const dataGastronomia = resGastronomia?.ok ? await resGastronomia.json() : [];
        const dataHospedagem = resHospedagem?.ok ? await resHospedagem.json() : [];

        const formatarDestaques = (lista: any[], baseLink: string, categoriaPadrao: string) => {
          return lista
            .filter(item => item.destaque === true)
            .map(item => ({
              id: item.slug || `${baseLink}-${item.id}`,
              nome: item.nome,
              categoria: item.categoria || categoriaPadrao,
              foto: item.foto,
              link: `/${item.slug}`
            }));
        };

        const todosDestaques = [
          ...formatarDestaques(dataComercio, 'comercio', 'Comércio'),
          ...formatarDestaques(dataGastronomia, 'gastronomia', 'Gastronomia'),
          ...formatarDestaques(dataHospedagem, 'hospedagem', 'Hospedagem')
        ];

        const destaquesEmbaralhados = todosDestaques.sort(() => 0.5 - Math.random());
        setDestaques(destaquesEmbaralhados);

      } catch (error) {
        console.error("Erro ao buscar os destaques no banco:", error);
      } finally {
        setLoadingDestaques(false);
      }
    }
    fetchDestaquesReais();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
      <Head>
        <title>Início | Guia Guapimirim</title>
        <meta name="description" content="Portal oficial de Guapimirim. Descubra turismo, gastronomia, hospedagem e comércio local." />
      </Head>

      <Header />

      <main className="flex-grow font-sans antialiased text-[#2D3A30]">

        {/* HERO SECTION DINÂMICO */}
        <header className="relative bg-[#1B3022] pt-48 pb-56 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1B3022]/80 via-transparent to-[#1B3022]"></div>
            </motion.div>
          </AnimatePresence>

          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6 h-auto flex flex-col justify-center mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] drop-shadow-md block mb-4">
                  {heroSlides[currentSlide].subtitle}
                </span>
                <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl mb-4">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-emerald-50 text-xl font-medium italic opacity-90 tracking-wide">
                  {heroSlides[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Smart Search Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto w-full group"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl transition-all group-hover:bg-white/20"></div>
              <div className="relative flex items-center p-2">
                <div className="pl-6 text-white/70">
                  <Search size={24} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="O que você está buscando hoje?" 
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white/70 px-4 py-4 font-medium text-lg"
                />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg">
                  Buscar
                </button>
              </div>
            </motion.form>


          </div>

          <div className="absolute bottom-40 left-0 right-0 flex justify-center gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>

          {/* Weather Widget (Moved to bottom right of Hero) */}
          {/* Weather Widget (Moved to top left of Hero) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-[100px] left-6 md:left-12 hidden md:flex flex-col gap-2 z-20"
          >
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-2xl">
              <div className="bg-emerald-500/20 p-3 rounded-2xl">
                <CloudSun className="text-emerald-300 w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-white font-black text-2xl leading-none">26°C</div>
                <div className="text-emerald-200 text-[10px] uppercase tracking-widest font-bold">Guapimirim</div>
              </div>
            </div>
            {/* Mensagem Condicional de Sol */}
            <div className="bg-emerald-500/80 backdrop-blur px-4 py-2 rounded-xl border border-emerald-400/50 shadow-lg text-white text-[10px] uppercase tracking-widest font-black flex items-center justify-center">
              Ótimo dia para se aventurar
            </div>
          </motion.div>
        </header>

        <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24">

          {/* MENU DE ACESSO RÁPIDO */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Turismo", href: "/turismo", icon: Camera, color: "bg-emerald-500", event: "nav_turismo" },
                { label: "Onde Comer", href: "/gastronomia", icon: Utensils, color: "bg-orange-500", event: "nav_gastronomia" },
                { label: "Hospedagem", href: "/hospedagem", icon: Bed, color: "bg-blue-500", event: "nav_hospedagem" },
                { label: "Comércio", href: "/comercio", icon: ShoppingBag, color: "bg-purple-500", event: "nav_comercio" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => sendGAEvent({ event: 'button_click', value: item.event })}
                  className="group bg-white p-8 md:p-10 rounded-[3rem] border border-emerald-50 shadow-2xl hover:translate-y-[-10px] transition-all flex flex-col items-center text-center"
                >
                  <div className={`${item.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                    <item.icon className="text-white w-8 h-8" />
                  </div>
                  <span className="text-[#1B3022] font-black text-sm uppercase tracking-tighter">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* INTRODUÇÃO À CIDADE COM FOTO */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-20 flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border border-emerald-50">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-emerald-500">
                <Compass size={20} />
                <span className="font-black text-[10px] uppercase tracking-widest">Bem-vindo</span>
              </div>
              <h2 className="text-[#1B3022] text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                O paraíso aos pés da serra
              </h2>
              <p className="text-gray-600 font-medium text-lg text-justify leading-relaxed">
                Guapimirim guarda um dos cenários mais deslumbrantes do estado. Com a maior parte do seu território protegida por áreas de preservação, a cidade é um convite permanente para quem busca reconexão. Das águas calmas da Baía de Guanabara ao majestoso pico do Dedo de Deus, aqui a natureza dita o ritmo da vida.
              </p>
              <div className="pt-2">
                <Link href="/a-cidade" className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest hover:text-emerald-400 transition-colors">
                  Conheça a nossa história <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full h-[350px] lg:h-[450px]">
              <img
                src="/pedra_do_sino.webp"
                alt="Turismo em Guapimirim"
                className="w-full h-full object-cover rounded-[3rem] shadow-xl"
              />
            </div>
          </motion.section>

          {/* CONTADORES ANIMADOS DE AUTORIDADE */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Counter end={100} suffix="+" label="Estabelecimentos" />
              <Counter end={50} suffix="+" label="Cachoeiras" />
              <Counter end={365} label="Dias de Natureza" />
            </div>
          </motion.section>

          {/* SERVIÇOS ÚTEIS PADRONIZADOS */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-28 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/telefones-uteis" className="bg-emerald-600 p-8 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-white/20 p-5 rounded-full group-hover:bg-white/30 transition-colors mb-4">
                <PhoneCall className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Telefones Úteis</h3>
              <p className="text-emerald-100 font-bold text-[10px] uppercase tracking-widest mt-2">Serviço ao Cidadão</p>
            </Link>

            <Link href="/como-chegar" className="bg-emerald-600 p-8 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-white/20 p-5 rounded-full group-hover:bg-white/30 transition-colors mb-4">
                <MapPin className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Como Chegar</h3>
              <p className="text-emerald-100 font-bold text-[10px] uppercase tracking-widest mt-2">Planeje sua viagem</p>
            </Link>

            <Link href="/horarios-onibus" className="bg-emerald-600 p-8 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-white/20 p-5 rounded-full group-hover:bg-white/30 transition-colors mb-4">
                <Bus className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Transporte Público</h3>
              <p className="text-emerald-100 font-bold text-[10px] uppercase tracking-widest mt-2">Horários de Ônibus</p>
            </Link>
          </motion.section>

          {/* MINI AGENDA DA SEMANA */}
          {(!loadingEventos && eventos.length > 0) && (
            <motion.section 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}
              className="mb-28"
            >
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-emerald-500 mb-2">
                    <Calendar size={16} />
                    <span className="font-black text-[10px] uppercase tracking-widest">O que fazer</span>
                  </div>
                  <h2 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter">Eventos Locais</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {eventos.map((evento) => {
                  let tagColor = "bg-emerald-100 text-emerald-600";
                  if (evento.categoria === 'GASTRONOMIA') tagColor = "bg-orange-100 text-orange-600";
                  if (evento.categoria === 'AVENTURA') tagColor = "bg-blue-100 text-blue-600";
                  if (evento.categoria === 'CULTURA') tagColor = "bg-purple-100 text-purple-600";
                  if (evento.categoria === 'ESPORTE') tagColor = "bg-red-100 text-red-600";
                  if (evento.categoria === 'MUSICA') tagColor = "bg-pink-100 text-pink-600";
                  
                  return (
                    <div key={evento.id} className="bg-white rounded-[3rem] p-6 shadow-xl border border-emerald-50 hover:-translate-y-2 transition-transform">
                      <div className={`${tagColor} font-black text-xs uppercase px-3 py-1 rounded-full w-max mb-4`}>
                        {evento.categoria}
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] mb-2">{evento.titulo}</h3>
                      <p className="text-gray-500 text-sm font-medium mb-4">{evento.descricao_curta}</p>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                        <Calendar size={14} /> {evento.data_hora} - {evento.local}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )}

          {/* EXPLORE POR CATEGORIA */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
              <h2 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter">Tudo em um só lugar</h2>
              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                O Guia Guapimirim foi pensado para ser a sua fonte de consulta definitiva na cidade. Com uma interface rápida e direta, reunimos tudo o que você precisa saber, desde os pontos turísticos até os serviços locais. Navegue pelas categorias abaixo e aproveite o que o nosso guia tem a oferecer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Card Turismo */}
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-emerald-50 flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img src="/turismo.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Turismo" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center bg-white">
                  <Camera className="text-emerald-500 mb-4 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1B3022] mb-3">Turismo</h3>
                  <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">Explore rios de águas cristalinas, cachoeiras escondidas e trilhas que desafiam todos os níveis.</p>
                  <Link href="/turismo" className="mt-auto w-max inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                    Acessar roteiro <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card Gastronomia */}
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-emerald-50 flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img src="/gastronomia.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gastronomia" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center bg-white">
                  <Utensils className="text-orange-500 mb-4 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1B3022] mb-3">Gastronomia</h3>
                  <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">Sabores autênticos da serra. Descubra de restaurantes rústicos a bistrôs charmosos pela cidade.</p>
                  <Link href="/gastronomia" className="mt-auto w-max inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-colors">
                    Onde comer <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card Hospedagem */}
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-emerald-50 flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img src="/hospedagem.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Hospedagem" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center bg-white">
                  <Bed className="text-blue-500 mb-4 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1B3022] mb-3">Hospedagem</h3>
                  <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">Acorde com o som dos pássaros. Encontre a pousada ou hotel ideal para o seu merecido descanso.</p>
                  <Link href="/hospedagem" className="mt-auto w-max inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-colors">
                    Onde dormir <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card Comércio */}
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-emerald-50 flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img src="/comercio.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Comércio" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center bg-white">
                  <ShoppingBag className="text-purple-500 mb-4 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1B3022] mb-3">Comércio</h3>
                  <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">Valorize o produtor local. O guia completo de lojas, serviços, mercados e artesanato da região.</p>
                  <Link href="/comercio" className="mt-auto w-max inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-100 transition-colors">
                    Ver comércio <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.section>

          {/* ROLO DE DESTAQUES REAIS DO DJANGO */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-28">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-500 mb-2">
                  <Star size={16} fill="currentColor" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Recomendações do Portal</span>
                </div>
                <h2 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter">Destaques da Cidade</h2>
              </div>
            </div>

            {loadingDestaques ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-64 bg-emerald-50 rounded-[3rem] animate-pulse border border-emerald-100"></div>
                ))}
              </div>
            ) : destaques.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 pt-4">
                {destaques.map((item) => (
                  <Link href={item.link} key={item.id} className="group block h-full">
                    <div className="bg-white rounded-[3rem] p-4 shadow-xl border border-emerald-50 hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                      <div className="h-48 rounded-[2rem] overflow-hidden relative mb-6 bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        {item.foto ? (
                          <img src={item.foto} alt={item.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <Star className="text-emerald-300 w-12 h-12" />
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-700 shadow-sm">
                          {item.categoria}
                        </div>
                      </div>
                      <div className="px-2 pb-2 mt-auto">
                        <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] mb-1 truncate">{item.nome}</h3>
                        <p className="text-emerald-600 text-xs font-bold flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                          Acessar página <ChevronRight size={14} />
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-emerald-50 p-10 rounded-[3rem] text-center shadow-lg">
                <p className="text-gray-500 font-medium">Nenhum destaque configurado no momento.</p>
              </div>
            )}
          </motion.section>

          {/* SEÇÃO DE PUBLICIDADE NO FINAL */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-20">
            <div className="bg-[#1B3022] rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                <div className="bg-emerald-500/20 p-5 rounded-full flex-shrink-0">
                  <Megaphone className="text-emerald-400 w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">Destaque o seu negócio</h2>
                  <p className="text-emerald-100/80 font-medium">Anuncie no maior portal da cidade e seja visto por moradores e turistas todos os dias.</p>
                </div>
              </div>

              <Link href="/anuncie" className="relative z-10 bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-colors shadow-lg whitespace-nowrap flex items-center gap-2">
                Conheça os Planos <ArrowRight size={16} />
              </Link>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}