"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
    Bed, MapPin, Phone, MessageCircle, ArrowLeft,
    ExternalLink, LayoutGrid, Building, Home, Tent
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Hospedagem {
    id: number;
    nome: string;
    tipo: string;
    descricao: string;
    bairro: string;
    endereco: string;
    telefone: string;
    foto: string | null;
    site_reserva: string;
    cafe_da_manha: boolean;
    pet_friendly: boolean;
}

export default function HospedagemPage() {
    const [pousadas, setPousadas] = useState<Hospedagem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("TODOS");

    function shuffleArray(array: Hospedagem[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        async function fetchHospedagens() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/hospedagem/');
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const data = await response.json();
                const dadosEmbaralhados = shuffleArray(data);
                setPousadas(dadosEmbaralhados);
            } catch (error) {
                console.error("Erro na conexão com API:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHospedagens();
    }, []);

    const pousadasFiltradas = filtro === "TODOS"
        ? pousadas
        : pousadas.filter((p) => p.tipo === filtro);

    const getWhatsappLink = (phone: string) => {
        const cleanNumber = phone.replace(/\D/g, '');
        return `https://wa.me/55${cleanNumber}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* Hero Section - Caminho corrigido */}
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/hospedagem.jpg"
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            alt="Hospedagem em Guapimirim"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                        </Link>
                        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">Hospedagem</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs italic">Onde descansar na Terra do Dedo de Deus</p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 relative z-20">
                    {/* Navegação de Filtros */}
                    <nav className="flex justify-center md:justify-start gap-3 -mt-8 overflow-x-auto pb-6 scrollbar-hide">
                        {[
                            { id: "TODOS", label: "Tudo", icon: LayoutGrid },
                            { id: "POUSADA", label: "Pousadas", icon: Bed },
                            { id: "HOTEL", label: "Hotéis", icon: Building },
                            { id: "CHALE", label: "Chalés", icon: Home },
                            { id: "CAMPING", label: "Camping", icon: Tent },
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
                                <p className="text-emerald-600 font-black uppercase tracking-widest animate-pulse">Carregando Hospedagens...</p>
                            </div>
                        ) : (
                            <>
                                {pousadasFiltradas.length === 0 ? (
                                    <div className="text-center py-20 opacity-50">
                                        <p className="font-black uppercase tracking-widest">Nenhuma hospedagem encontrada.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <AnimatePresence mode="popLayout">
                                            {pousadasFiltradas.map((pousada) => (
                                                <motion.div
                                                    key={pousada.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-emerald-50 group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                                                >
                                                    {/* Imagem */}
                                                    <div className="h-48 bg-emerald-100 relative overflow-hidden flex-shrink-0">
                                                        {pousada.foto ? (
                                                            <img src={pousada.foto} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={pousada.nome} />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800/20">
                                                                <Bed size={48} />
                                                                <span className="text-[10px] font-black uppercase mt-2">Sem foto</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-700 shadow-sm">
                                                            {pousada.bairro}
                                                        </div>

                                                        {/* Tags de Diferenciais */}
                                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                                            {pousada.pet_friendly && (
                                                                <span className="bg-[#1B3022]/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-bold uppercase text-emerald-400 shadow-sm">Pet Friendly</span>
                                                            )}
                                                            {pousada.cafe_da_manha && (
                                                                <span className="bg-emerald-500/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-bold uppercase text-white shadow-sm">Café Incluso</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="p-8 space-y-4 flex flex-col flex-grow">
                                                        <div>
                                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{pousada.tipo}</p>
                                                            <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] leading-none mb-2">{pousada.nome}</h3>
                                                            <p className="text-gray-500 text-xs font-medium leading-relaxed italic line-clamp-3">
                                                                {pousada.descricao}
                                                            </p>
                                                        </div>

                                                        <div className="pt-4 border-t border-emerald-50 mt-auto space-y-3">
                                                            {/* Endereço - Padronizado: Preto e Maior */}
                                                            <div className="flex items-start gap-2 text-black">
                                                                <MapPin size={14} className="mt-0.5 text-emerald-600" />
                                                                <p className="text-sm font-bold leading-tight">{pousada.endereco}</p>
                                                            </div>

                                                            <div className="flex flex-wrap gap-3 pt-2">
                                                                <a href={`tel:${pousada.telefone}`} className="flex items-center gap-1.5 text-[#1B3022] font-black text-[9px] uppercase hover:text-emerald-600 transition-colors bg-emerald-50 px-3 py-2 rounded-xl flex-1 justify-center">
                                                                    <Phone size={12} className="text-emerald-500" /> Ligar
                                                                </a>
                                                                <a href={getWhatsappLink(pousada.telefone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white font-black text-[9px] uppercase hover:bg-emerald-600 transition-colors bg-emerald-500 px-3 py-2 rounded-xl flex-1 justify-center shadow-md">
                                                                    <MessageCircle size={12} /> WhatsApp
                                                                </a>
                                                                {pousada.site_reserva && (
                                                                    <a href={pousada.site_reserva} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#1B3022] font-black text-[9px] uppercase hover:bg-gray-100 transition-colors border border-gray-200 px-3 py-2 rounded-xl">
                                                                        Site <ExternalLink size={10} />
                                                                    </a>
                                                                )}
                                                            </div>
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
        </div>
    );
}