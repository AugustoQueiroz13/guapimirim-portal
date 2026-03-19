"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  MapPin, Utensils, ShoppingBag, Bed, Camera, ArrowRight,
  Star, ChevronRight, Megaphone, Compass, PhoneCall, Bus
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { sendGAEvent } from '@next/third-parties/google';

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
    subtitle: "Comércio",
    title: "Compre Local",
    desc: "Valorize o empreendedor da cidade"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destaques, setDestaques] = useState<any[]>([]);
  const [loadingDestaques, setLoadingDestaques] = useState(true);

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
              id: `${baseLink}-${item.id}`,
              nome: item.nome,
              categoria: item.categoria || categoriaPadrao,
              foto: item.foto,
              link: `/${baseLink}`
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

          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6 h-40 flex flex-col justify-center mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
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
        </header>

        <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24">

          {/* MENU DE ACESSO RÁPIDO */}
          <section className="mb-20">
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
          </section>

          {/* INTRODUÇÃO À CIDADE COM FOTO */}
          <section className="mb-20 flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border border-emerald-50">
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
                src="/baia_de_ganabara.jfif"
                alt="Vista de Guapimirim"
                className="w-full h-full object-cover rounded-[3rem] shadow-xl"
              />
            </div>
          </section>

          {/* SERVIÇOS ÚTEIS (Movidos para cá, agora com Transporte Público) */}
          <section className="mb-28 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/telefones-uteis" className="bg-[#1B3022] p-8 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-emerald-500/20 p-5 rounded-full group-hover:bg-emerald-500/40 transition-colors mb-4">
                <PhoneCall className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Telefones Úteis</h3>
              <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest mt-2">Serviço ao Cidadão</p>
            </Link>

            <Link href="/como-chegar" className="bg-white p-8 rounded-[3rem] shadow-xl border border-emerald-50 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-emerald-50 p-5 rounded-full group-hover:bg-emerald-100 transition-colors mb-4">
                <MapPin className="text-emerald-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022]">Como Chegar</h3>
              <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mt-2">Planeje sua viagem</p>
            </Link>

            <Link href="/horarios-onibus" className="bg-white p-8 rounded-[3rem] shadow-xl border border-emerald-50 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform">
              <div className="bg-emerald-50 p-5 rounded-full group-hover:bg-emerald-100 transition-colors mb-4">
                <Bus className="text-emerald-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022]">Transporte Público</h3>
              <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mt-2">Horários de Ônibus</p>
            </Link>
          </section>

          {/* ROLO DE DESTAQUES REAIS DO DJANGO */}
          <section className="mb-28">
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
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="min-w-[280px] md:min-w-[320px] h-64 bg-emerald-50 rounded-[3rem] animate-pulse border border-emerald-100 flex-shrink-0"></div>
                ))}
              </div>
            ) : destaques.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
                {destaques.map((item) => (
                  <Link href={item.link} key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center group block">
                    <div className="bg-white rounded-[3rem] p-4 shadow-xl border border-emerald-50 hover:-translate-y-2 transition-transform duration-300 h-full">
                      <div className="h-48 rounded-[2rem] overflow-hidden relative mb-6 bg-emerald-100 flex items-center justify-center">
                        {item.foto ? (
                          <img src={item.foto} alt={item.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <Star className="text-emerald-300 w-12 h-12" />
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-700 shadow-sm">
                          {item.categoria}
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] mb-1 truncate">{item.nome}</h3>
                        <p className="text-emerald-600 text-xs font-bold flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                          Explorar <ChevronRight size={14} />
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
          </section>

          {/* EXPLORE POR CATEGORIA */}
          <section className="mb-32">
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
          </section>

          {/* SEÇÃO DE PUBLICIDADE NO FINAL */}
          <section className="mb-20">
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
          </section>

        </div>
      </main>
    </div>
  );
}