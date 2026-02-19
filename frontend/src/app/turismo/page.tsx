"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Camera, MapPin, ArrowRight, LayoutGrid, Mountain, Waves, Landmark, Trees, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { sendGAEvent } from '@next/third-parties/google';

// Interface baseada no model Turismo do Django
interface PontoTuristico {
    id: number;
    nome: string;
    slug: string;
    categoria: string; // Ex: 'CACHOEIRA', 'TRILHA', 'HISTORIA'
    introducao: string;
    foto: string | null;
    bairro: string;
}

export default function TurismoPage() {
    const [pontos, setPontos] = useState<PontoTuristico[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("TODOS");

    // Função para embaralhar (Fisher-Yates) - Garante que cada visita mostre uma ordem diferente
    function shuffleArray(array: PontoTuristico[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        async function fetchTurismo() {
            try {
                // Certifique-se de que sua API Django está servindo em /api/turismo/
                const response = await fetch('http://127.0.0.1:8000/api/turismo/');
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const data = await response.json();

                const dadosEmbaralhados = shuffleArray(data);
                setPontos(dadosEmbaralhados);
            } catch (error) {
                console.error("Erro na conexão com API:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTurismo();
    }, []);

    // Lógica de Filtragem
    const pontosFiltrados = filtro === "TODOS"
        ? pontos
        : pontos.filter((p) => p.categoria === filtro);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            {/* Metatags de SEO para a página de listagem */}
            <Head>
                <title>Turismo em Guapimirim | Cachoeiras, Trilhas e História</title>
                <meta name="description" content="Descubra o que fazer em Guapimirim. Guia completo de cachoeiras, trilhas no Dedo de Deus e pontos históricos." />
            </Head>

            {/* Header já incluso no Layout, mas mantido a estrutura caso esteja usando template limpo */}
            {/* <Header /> -> Removido se estiver usando Layout.tsx global */}

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">

                {/* Hero Section */}
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            alt="Turismo em Guapimirim"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                        </Link>
                        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">Explorar</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs italic">As maravilhas naturais da Serra dos Órgãos</p>
                    </div>
                </header>

                {/* Container Principal */}
                <div className="max-w-7xl mx-auto px-6 relative z-20">

                    {/* Navegação de Filtros */}
                    <nav className="flex justify-center md:justify-start gap-3 -mt-8 overflow-x-auto pb-6 scrollbar-hide">
                        {[
                            { id: "TODOS", label: "Tudo", icon: LayoutGrid },
                            { id: "CACHOEIRA", label: "Cachoeiras", icon: Waves },
                            { id: "TRILHA", label: "Trilhas", icon: Mountain }, // Mountain para trilhas/montanha
                            { id: "HISTORIA", label: "História", icon: Landmark },
                            { id: "PARQUE", label: "Parques", icon: Trees },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFiltro(item.id)}
                                className={`flex items-center gap-2 px-7 py-4 rounded-2xl text-xs font-black transition-all duration-300 whitespace-nowrap shadow-xl flex-shrink-0 ${filtro === item.id
                                    ? "bg-emerald-500 text-white scale-105 shadow-emerald-500/20"
                                    : "bg-white text-[#1B3022] border border-emerald-100 hover:bg-emerald-50"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${filtro === item.id ? "text-white" : "text-emerald-500"}`} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-12 pb-20">
                        {loading ? (
                            <div className="text-center py-20">
                                <p className="text-emerald-600 font-black uppercase tracking-widest animate-pulse">Buscando aventuras...</p>
                            </div>
                        ) : (
                            <>
                                {pontosFiltrados.length === 0 ? (
                                    <div className="text-center py-20 opacity-50">
                                        <p className="font-black uppercase tracking-widest">Nenhum local encontrado nesta categoria.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <AnimatePresence>
                                            {pontosFiltrados.map((ponto) => (
                                                <motion.div
                                                    key={ponto.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-emerald-50 group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                                                >
                                                    {/* Imagem */}
                                                    <div className="h-64 bg-emerald-100 relative overflow-hidden flex-shrink-0">
                                                        {ponto.foto ? (
                                                            <img src={ponto.foto} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={ponto.nome} />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800/20">
                                                                <Camera size={48} />
                                                                <span className="text-[10px] font-black uppercase mt-2">Sem foto</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-700 shadow-sm">
                                                            {ponto.bairro}
                                                        </div>
                                                    </div>

                                                    <div className="p-8 space-y-4 flex flex-col flex-grow">
                                                        <div>
                                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{ponto.categoria}</p>
                                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1B3022] leading-none mb-3">{ponto.nome}</h3>
                                                            <p className="text-gray-500 text-xs font-medium leading-relaxed italic line-clamp-3">
                                                                {ponto.introducao}
                                                            </p>
                                                        </div>

                                                        <div className="pt-4 border-t border-emerald-50 mt-auto">
                                                            <Link
                                                                href={`/turismo/${ponto.slug}`}
                                                                onClick={() => sendGAEvent({ event: 'click_turismo_card', value: ponto.slug })}
                                                                className="flex items-center justify-between group/link w-full"
                                                            >
                                                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover/link:underline">Ler Mais</span>
                                                                <div className="bg-[#1B3022] p-2 rounded-full text-white group-hover/link:bg-emerald-500 transition-colors">
                                                                    <ArrowRight size={16} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer já incluso no Layout */}
            {/* <Footer /> */}
        </div>
    );
}