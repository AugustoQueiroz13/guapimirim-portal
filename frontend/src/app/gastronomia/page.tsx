"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Utensils, Coffee, Pizza, Beer, MapPin, Phone, Clock,
    MessageCircle, ArrowLeft, Bike, Leaf, LayoutGrid,
    Sandwich, IceCream, Store, Star
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Restaurante {
    id: number;
    slug: string;
    nome: string;
    categoria: string;
    especialidade: string;
    foto: string | null;
    bairro: string;
    endereco: string;
    telefone: string;
    horario?: string;
    delivery: boolean;
    vegano_vegetariano: boolean;
    destaque: boolean;
}

export default function GastronomiaPage() {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("TODOS");

    function shuffleArray(array: Restaurante[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        async function fetchGastronomia() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/gastronomia/');
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const data = await response.json();
                const dadosEmbaralhados = shuffleArray(data);
                setRestaurantes(dadosEmbaralhados);
            } catch (error) {
                console.error("Erro na conexão com API:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGastronomia();
    }, []);

    const getWhatsappLink = (phone: string) => {
        const cleanNumber = phone.replace(/\D/g, '');
        return `https://wa.me/55${cleanNumber}`;
    };

    const restaurantesFiltrados = filtro === "TODOS"
        ? restaurantes
        : restaurantes.filter((r) => r.categoria === filtro);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/gastronomia_guapi.jpg"
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            alt="Gastronomia em Guapimirim"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                        </Link>
                        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">Gastronomia</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs italic">Sabores da Serra: Do Pastel de Feira ao Jantar Romântico</p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 relative z-20">
                    <nav className="flex justify-center md:justify-start gap-3 -mt-8 overflow-x-auto pb-6 scrollbar-hide">
                        {[
                            { id: "TODOS", label: "Tudo", icon: LayoutGrid },
                            { id: "RESTAURANTE", label: "Restaurantes", icon: Utensils },
                            { id: "LANCHONETE", label: "Lanches", icon: Sandwich },
                            { id: "PIZZARIA", label: "Pizzas", icon: Pizza },
                            { id: "CAFE E PADARIA", label: "Café / Padaria", icon: Coffee },
                            { id: "CERVEJARIA", label: "Bares", icon: Beer },
                            { id: "SORVETERIA", label: "Sorvetes", icon: IceCream },
                            { id: "OUTROS", label: "Outros", icon: Store },
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
                                <p className="text-emerald-600 font-black uppercase tracking-widest animate-pulse">Buscando sabores...</p>
                            </div>
                        ) : (
                            <>
                                {restaurantesFiltrados.length === 0 ? (
                                    <div className="text-center py-20 opacity-50">
                                        <p className="font-black uppercase tracking-widest">Nenhum local encontrado nesta categoria.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <AnimatePresence>
                                            {restaurantesFiltrados.map((item) => {

                                                const cardContent = (
                                                    <>
                                                        <div className="h-48 bg-emerald-100 relative overflow-hidden flex-shrink-0">
                                                            {item.destaque && (
                                                                <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5">
                                                                    <Star size={12} className="fill-yellow-900" /> Destaque da Cidade
                                                                </div>
                                                            )}

                                                            {item.foto ? (
                                                                <img src={item.foto} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.nome} />
                                                            ) : (
                                                                <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800/20">
                                                                    <Utensils size={48} />
                                                                    <span className="text-[10px] font-black uppercase mt-2">Sem foto</span>
                                                                </div>
                                                            )}
                                                            <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase ${item.destaque ? 'text-yellow-700' : 'text-emerald-700'} shadow-sm z-10`}>
                                                                {item.bairro}
                                                            </div>

                                                            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                                                                {item.delivery && (
                                                                    <span className="flex items-center gap-1 bg-amber-400/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-black uppercase text-amber-900 shadow-sm">
                                                                        <Bike size={10} /> Delivery
                                                                    </span>
                                                                )}
                                                                {item.vegano_vegetariano && (
                                                                    <span className="flex items-center gap-1 bg-green-600/90 backdrop-blur px-2 py-1 rounded-lg text-[8px] font-black uppercase text-white shadow-sm">
                                                                        <Leaf size={10} /> Opção Veg
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="p-8 space-y-4 flex flex-col flex-grow">
                                                            <div>
                                                                <p className={`text-[9px] font-black ${item.destaque ? 'text-yellow-600' : 'text-emerald-600'} uppercase tracking-widest mb-1`}>
                                                                    {item.categoria.replace('_', ' ')}
                                                                </p>
                                                                <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] leading-none mb-2">{item.nome}</h3>
                                                                <p className="text-xs font-medium text-amber-600 italic border-l-2 border-amber-400 pl-2">
                                                                    {item.especialidade}
                                                                </p>
                                                            </div>

                                                            <div className="pt-4 border-t border-emerald-50 mt-auto space-y-3">
                                                                {item.horario && (
                                                                    <div className="flex items-center gap-2 text-black text-sm font-bold italic">
                                                                        <Clock size={14} className="text-emerald-600" />
                                                                        <span>{item.horario}</span>
                                                                    </div>
                                                                )}

                                                                <div className="flex items-start gap-2 text-black">
                                                                    <MapPin size={14} className="mt-0.5 text-emerald-400" />
                                                                    <p className="text-sm font-bold leading-tight">{item.endereco}</p>
                                                                </div>

                                                                <div className="flex flex-wrap gap-3 pt-2">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            window.location.href = `tel:${item.telefone}`;
                                                                        }}
                                                                        className="flex items-center gap-1.5 text-[#1B3022] font-black text-[9px] uppercase hover:text-emerald-600 transition-colors bg-emerald-50 px-3 py-2 rounded-xl flex-1 justify-center"
                                                                    >
                                                                        <Phone size={12} className="text-emerald-500" /> Ligar
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            window.open(getWhatsappLink(item.telefone), '_blank');
                                                                        }}
                                                                        className="flex items-center gap-1.5 text-white font-black text-[9px] uppercase hover:bg-emerald-600 transition-colors bg-emerald-500 px-3 py-2 rounded-xl flex-[2] justify-center shadow-lg shadow-emerald-200"
                                                                    >
                                                                        <MessageCircle size={12} /> WhatsApp
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );

                                                return (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className={`bg-white rounded-[3rem] overflow-hidden shadow-xl border ${item.destaque ? 'border-yellow-400 shadow-yellow-500/20 ring-2 ring-yellow-400/50' : 'border-emerald-50'} group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full`}
                                                    >
                                                        {item.destaque ? (
                                                            <Link href={`/${item.slug}`} className="flex flex-col flex-grow">
                                                                {cardContent}
                                                            </Link>
                                                        ) : (
                                                            <div className="flex flex-col flex-grow">
                                                                {cardContent}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
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