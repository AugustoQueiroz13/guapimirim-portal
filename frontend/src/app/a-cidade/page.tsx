"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    MapPin, Car, Train, Bus, Utensils, ShoppingBag,
    Bed, Camera, ArrowRight, Info, Map as MapIcon, Layers,
    Mountain, Waves, Wind, Landmark, PhoneCall
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { sendGAEvent } from '@next/third-parties/google'; // Importação do rastreador

export default function ACidadePage() {
    // Dados para o Mapa Interativo de Pontos Turísticos
    const [selectedPonto, setSelectedPonto] = useState<any>(null);
    const pontosTuristicos = [
        { name: "Poço Verde (PARNASO)", coord: "Sede Guapimirim", icon: "🌊", x: "45%", y: "25%" },
        { name: "Cachoeira do Vale da Lua", coord: "Barreira", icon: "🌙", x: "50%", y: "20%" },
        { name: "Dedo de Deus", coord: "Serra dos Órgãos", icon: "⛰️", x: "35%", y: "10%" },
        { name: "Poço do Padre", coord: "Barreira", icon: "🙏", x: "75%", y: "10%" },
        { name: "PARNASO", coord: "Sede Guapimirim", icon: "🌊", x: "45%", y: "20%" },
        { name: "Portal de Parada Modelo", coord: "Parada Modelo", icon: "📍", x: "50%", y: "35%" },
        { name: "Portal de Guapimirim", coord: "Serra dos Órgãos", icon: "⛰️", x: "50%", y: "30%" },
        { name: "Centro de Primatologia", coord: "Paraíso", icon: "🦧", x: "70%", y: "15%" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            {/* UI/UX & SEO: Metatags e Rastreamento */}
            <Head>
                <title>A Cidade | Guia Guapimirim - Onde a Serra abraça o Mar</title>
                <meta name="description" content="Conheça Guapimirim, o portal da Serra dos Órgãos. Natureza, cachoeiras, manguezais e o icônico Dedo de Deus." />
                <meta property="og:title" content="A Cidade | Guia Guapimirim" />
                <meta property="og:description" content="Explore as belezas naturais e a cidade de Guapimirim no Rio de Janeiro." />
                <meta property="og:image" content="/guapimirim_serra_dos_orgaos.jpg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* HERO SECTION */}
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/guapimirim_serra_dos_orgaos.jpg"
                            alt="Vista do Dedo de Deus - Guapimirim"
                            className="w-full h-full object-cover object-center opacity-50 mix-blend-overlay scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3022]/80 via-transparent to-[#1B3022]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] drop-shadow-md"
                        >
                            Guia Oficial da Cidade
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-white text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl"
                        >
                            Guapimirim
                        </motion.h1>
                        <p className="text-emerald-50 text-xl font-medium italic opacity-90 tracking-wide">
                            A Terra do Dedo de Deus
                        </p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

                    {/* EXPLORE O PORTAL - COM RASTREAMENTO */}
                    <section className="mb-24">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Onde Comer", href: "/gastronomia", icon: Utensils, color: "bg-orange-500", event: "nav_gastronomia" },
                                { label: "Turismo", href: "/turismo", icon: Camera, color: "bg-emerald-500", event: "nav_turismo" },
                                { label: "Hospedagem", href: "/hospedagem", icon: Bed, color: "bg-blue-500", event: "nav_hospedagem" },
                                { label: "Comércio", href: "/comercio", icon: ShoppingBag, color: "bg-purple-500", event: "nav_comercio" },
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => sendGAEvent({ event: 'button_click', value: item.event })}
                                    className="group bg-white p-10 rounded-[3rem] border border-emerald-50 shadow-2xl hover:translate-y-[-10px] transition-all flex flex-col items-center text-center"
                                >
                                    <div className={`${item.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                                        <item.icon className="text-white w-8 h-8" />
                                    </div>
                                    <span className="text-[#1B3022] font-black text-sm uppercase tracking-tighter">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* CONTEÚDO TEXTUAL - ÍNTEGRA COM IMAGENS */}
                    <div className="space-y-32 mb-28">

                        {/* Bloco 1 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-100 rounded-full text-emerald-800">
                                    <Mountain className="w-4 h-4" />
                                    <span className="font-black uppercase text-[10px] tracking-widest">Guapimirim</span>
                                </div>
                                <h2 className="text-[#1B3022] text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                                    Onde a Serra abraça o Mar
                                </h2>
                                <div className="text-gray-600 font-medium leading-relaxed text-lg text-justify space-y-6">
                                    <p>Guapimirim não é apenas um destino, é um encontro raro de ecossistemas que desafia a lógica geográfica tradicional. A cidade possui 70% do seu território em área de preservação ambiental. Localizada aos pés da <strong>Serra dos Órgãos</strong>, a cidade oferece uma transição mágica entre o topo das montanhas e as águas calmas do fundo da Baía de Guanabara, justificando seu nome de origem indígena: Nascente Pequena.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-emerald-500/10 rounded-[4rem] blur-2xl"></div>
                                <img
                                    src="/baia_de_ganabara.jfif"
                                    alt="Montanhas de Guapimirim"
                                    className="relative rounded-[4rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] w-full object-cover"
                                />
                            </div>
                        </section>

                        {/* Bloco 2 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-4 bg-blue-500/10 rounded-[4rem] blur-2xl"></div>
                                <img
                                    src="/chico_trekking_portais_de_hercules.jpg"
                                    alt="Escalada em Guapimirim"
                                    className="relative rounded-[4rem] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] w-full object-cover"
                                />
                            </div>
                            <div className="space-y-8 order-1 lg:order-2">
                                <h3 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter leading-none">A Majestade da Serra e as Montanhas</h3>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg text-justify">
                                    O horizonte da cidade é dominado pela silhueta icônica da <strong>Serra dos Órgãos</strong> e é no seu território que se localiza o pico <strong>Dedo de Deus</strong>, monumento que é o berço do montanhismo no Brasil. Para os entusiastas da escalada e do trekking, Guapimirim é o portal de entrada para o <strong>Parque Nacional da Serra dos Órgãos (PARNASO)</strong>. Trilhas que levam a picos desafiadores e mirantes naturais como a Pedra do Sina e os Portais de Hércules oferecem vistas que alcançam toda a Região Metropolitana e o oceano, proporcionando uma experiência de altitude inigualável no estado.
                                </p>
                            </div>
                        </section>

                        {/* Bloco 3 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h3 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter leading-none">O Santuário das Águas e Cachoeiras</h3>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg text-justify">
                                    Se a parte alta é para os fortes, as encostas são para o deleite. Bairros como a <strong>Barreira</strong> e a <strong>Caneca Fina</strong> escondem verdadeiras joias líquidas. São dezenas de poços de águas cristalinas e geladas, como o <strong>Poço Verde</strong> e os <strong>Cânions da Iconha</strong>, onde o Rio Soberbo e o Rio Iconha descem a serra criando refúgios perfeitos para o descanso em meio à Mata Atlântica preservada.
                                </p>
                            </div>
                            <div className="relative">
                                <img
                                    src="/cachoeiras_guapimirim.jpg"
                                    alt="Cachoeiras de Guapimirim"
                                    className="relative rounded-[4rem] shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 h-[400px] w-full object-cover"
                                />
                            </div>
                        </section>

                        {/* Bloco 4 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative order-2 lg:order-1">
                                <img
                                    src="/apa_guapimirim.jpg"
                                    alt="Pantanal Carioca em Guapimirim"
                                    className="relative rounded-[4rem] shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-500 h-[400px] w-full object-cover"
                                />
                            </div>
                            <div className="space-y-8 order-1 lg:order-2">
                                <h3 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter leading-none">O Pantanal Fluminense: Manguezais e Biodiversidade</h3>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg text-justify">
                                    O que muitos não sabem é que Guapimirim também possui "pé no mar". A cidade abriga a <strong>APA de Guapimirim e a Estação Ecológia da Baía de Guanabara</strong>, preservando o último remanescente de manguezal em estado de conservação no fundo da Baía de Guanabara. Navegar por seus canais é como entrar em um "Pantanal Fluminense", onde é possível observar garças, caranguejos e uma fauna marinha riquíssima, contrastando o verde profundo da floresta com o espelho d'água do litoral.
                                </p>
                            </div>
                        </section>

                        {/* Bloco 5 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h3 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter leading-none">Cultura, Fé e Hospitalidade</h3>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg text-justify">
                                    Além da natureza exuberante, Guapimirim respira história e espiritualidade. A cidade preserva imporante marcos históricos como a <strong>Capela de Nossa Senhora da Conceição do Soberbo (1713)</strong>, e mantém viva a tradição da hospitalidade serrana. Seja através dos seus festivais, da rota gastronômica que desce a serra ou do acolhimento das suas inúmeras pousadas, visitar Guapimirim é reconectar-se com o que o Rio de Janeiro tem de mais autêntico e preservado.
                                </p>
                            </div>
                            <div className="relative">
                                <img
                                    src="/Capela_NS_da_Conceição_do_Soberbo.jfif"
                                    alt="Cultura de Guapimirim"
                                    className="relative rounded-[4rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] w-full object-cover"
                                />
                            </div>
                        </section>
                    </div>

                    {/* MAPA INTERATIVO - SEÇÃO ATUALIZADA */}
                    <section className="mb-28">
                        <div className="flex items-center gap-3 mb-8">
                            <Layers className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-[#1B3022] text-3xl font-black uppercase tracking-tighter">Exploração Interativa</h2>
                        </div>

                        <div className="bg-white p-4 rounded-[4rem] shadow-2xl border border-emerald-50 min-h-[550px] flex flex-col md:flex-row overflow-hidden">

                            {/* Lado Esquerdo: Menu de Pontos */}
                            <div className="w-full md:w-1/3 bg-[#1B3022] rounded-[3rem] p-6 space-y-3 overflow-y-auto max-h-[500px]">
                                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest block mb-4">Selecione para localizar</span>
                                {pontosTuristicos.map((ponto, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSelectedPonto(ponto);
                                            sendGAEvent({ event: 'map_interaction', value: ponto.name });
                                        }}
                                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 group ${selectedPonto?.name === ponto.name
                                            ? "bg-emerald-500 border-emerald-400 shadow-lg scale-[1.02]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <span className="text-2xl">{ponto.icon}</span>
                                        <div>
                                            <p className={`font-bold text-sm uppercase ${selectedPonto?.name === ponto.name ? "text-white" : "text-white/90"}`}>
                                                {ponto.name}
                                            </p>
                                            <p className={`text-[10px] font-black uppercase ${selectedPonto?.name === ponto.name ? "text-emerald-100" : "text-emerald-400/60"}`}>
                                                {ponto.coord}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Lado Direito: O Mapa Real */}
                            <div className="w-full md:w-2/3 relative bg-emerald-50/30 overflow-hidden flex items-center justify-center p-4">
                                {/* Base do Mapa */}
                                <div className="relative w-full h-full max-w-[600px] aspect-square">
                                    <img
                                        src="/mapa_guapimirim.png" // Coloque sua imagem aqui na pasta public
                                        alt="Mapa de Guapimirim"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />

                                    {/* Marcadores Dinâmicos baseados em coordenadas % */}
                                    <AnimatePresence>
                                        {pontosTuristicos.map((ponto, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute cursor-pointer group"
                                                style={{ top: ponto.y, left: ponto.x }} // Usa as coordenadas do array
                                                onClick={() => setSelectedPonto(ponto)}
                                            >
                                                {/* Pin do Mapa */}
                                                <div className={`relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center`}>
                                                    <div className={`p-2 rounded-full shadow-xl transition-all ${selectedPonto?.name === ponto.name ? "bg-emerald-500 scale-125 z-30" : "bg-white z-20"
                                                        }`}>
                                                        <MapPin size={16} className={selectedPonto?.name === ponto.name ? "text-white" : "text-emerald-600"} />
                                                    </div>

                                                    {/* Label flutuante no Pin */}
                                                    {selectedPonto?.name === ponto.name && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: -5 }}
                                                            className="absolute bottom-full mb-2 bg-[#1B3022] text-white text-[10px] font-black px-3 py-1 rounded-lg whitespace-nowrap shadow-2xl z-40"
                                                        >
                                                            {ponto.name}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Overlay de instrução caso nada esteja selecionado */}
                                {!selectedPonto && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#1B3022]/5 backdrop-blur-[2px] pointer-events-none">
                                        <p className="text-[#1B3022]/40 font-black uppercase text-[10px] tracking-[0.3em]">Toque nos pontos para explorar</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                    {/* LINKS FINAIS - COM RASTREAMENTO */}
                    <section className="mb-28 flex flex-col md:flex-row justify-center gap-8">
                        <Link
                            href="/como-chegar"
                            onClick={() => sendGAEvent({ event: 'cta_click', value: 'como_chegar' })}
                            className="flex-1 inline-flex items-center justify-between gap-4 bg-[#1B3022] text-white px-10 py-8 rounded-[3rem] shadow-2xl hover:bg-emerald-700 transition-all group"
                        >
                            <div className="text-left">
                                <p className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Quer saber como visitar?</p>
                                <h3 className="text-xl font-black uppercase tracking-tighter">Veja como chegar</h3>
                            </div>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <Link
                            href="/telefones-uteis"
                            onClick={() => sendGAEvent({ event: 'cta_click', value: 'telefones_uteis' })}
                            className="flex-1 inline-flex items-center justify-between gap-4 bg-white text-[#1B3022] px-10 py-8 rounded-[3rem] shadow-2xl border border-emerald-50 hover:bg-emerald-50 transition-all group"
                        >
                            <div className="text-left">
                                <p className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Serviço ao Cidadão</p>
                                <h3 className="text-xl font-black uppercase tracking-tighter">Telefones Úteis</h3>
                            </div>
                            <PhoneCall className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                        </Link>
                    </section>

                </div>
            </main>


        </div>
    );
}