"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
    ShoppingBag, MapPin, Phone, MessageCircle, ArrowLeft,
    LayoutGrid, Shirt, Smartphone, Wrench, Package, Search,
    ShoppingCart, Pill, Dog // Novos ícones importados
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Comercio {
    id: number;
    nome: string;
    categoria: string;
    descricao: string;
    bairro: string;
    endereco: string;
    telefone: string;
    foto: string | null;
    instagram: string;
    destaque?: boolean; // Preparado para o recurso de destaque que conversamos
}

export default function ComercioPage() {
    const [lojas, setLojas] = useState<Comercio[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("TODOS");

    useEffect(() => {
        async function fetchComercio() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/comercio/');
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const data = await response.json();

                // Opcional: Ordenar para que os destaques apareçam primeiro
                const dataOrdenada = data.sort((a: Comercio, b: Comercio) => {
                    if (a.destaque && !b.destaque) return -1;
                    if (!a.destaque && b.destaque) return 1;
                    return 0;
                });

                setLojas(dataOrdenada);
            } catch (error) {
                console.error("Erro na conexão com API:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchComercio();
    }, []);

    const lojasFiltradas = filtro === "TODOS"
        ? lojas
        : lojas.filter((l) => l.categoria === filtro);

    const getWhatsappLink = (phone: string) => {
        const cleanNumber = phone.replace(/\D/g, '');
        return `https://wa.me/55${cleanNumber}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* Hero Section */}
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/comercio.jpg"
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            alt="Comércio em Guapimirim"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                        </Link>
                        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">Comércio</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs italic">Valorize o empreendedor local de Guapimirim</p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 relative z-20">
                    {/* Filtros de Categorias Atualizados */}
                    <nav className="flex justify-center md:justify-start gap-3 -mt-8 overflow-x-auto pb-6 scrollbar-hide">
                        {[
                            { id: "TODOS", label: "Tudo", icon: LayoutGrid },
                            { id: "MERCADO", label: "Mercado", icon: ShoppingCart },
                            { id: "FARMACIA", label: "Farmácia", icon: Pill },
                            { id: "PETSHOP", label: "Pet-Shop", icon: Dog },
                            { id: "VESTUARIO", label: "Vestuário", icon: Shirt },
                            { id: "ELETRONICOS", label: "Eletrônicos", icon: Smartphone },
                            { id: "SERVICOS", label: "Serviços", icon: Wrench },
                            { id: "VARIEDADES", label: "Variedades", icon: Package },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFiltro(item.id)}
                                className={`flex items-center gap-2 px-7 py-4 rounded-2xl text-xs font-black transition-all duration-300 whitespace-nowrap shadow-xl flex-shrink-0 ${filtro === item.id
                                    ? "bg-emerald-500 text-white scale-105"
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
                                <p className="text-emerald-600 font-black uppercase tracking-widest animate-pulse">Carregando Lojas...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {lojasFiltradas.map((loja) => (
                                        <motion.div
                                            key={loja.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className={`bg-white rounded-[3rem] overflow-hidden shadow-xl border flex flex-col h-full group hover:-translate-y-2 transition-all duration-300 ${loja.destaque ? 'border-amber-400 border-2' : 'border-emerald-50'}`}
                                        >
                                            <div className="h-48 bg-emerald-100 relative overflow-hidden flex-shrink-0">
                                                {loja.foto ? (
                                                    <img src={loja.foto} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={loja.nome} />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800/20">
                                                        <ShoppingBag size={48} />
                                                    </div>
                                                )}

                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-700 shadow-sm">
                                                    {loja.bairro}
                                                </div>

                                                {/* Badge de Destaque Visual */}
                                                {loja.destaque && (
                                                    <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                                                        Destaque
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-8 space-y-4 flex flex-col flex-grow">
                                                <div>
                                                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{loja.categoria}</p>
                                                    <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] leading-none mb-2">{loja.nome}</h3>
                                                    {/* Usando line-clamp-2 e um min-height para manter o padrão de altura dos cards */}
                                                    <p className="text-gray-500 text-xs font-medium italic line-clamp-2 min-h-[32px]">{loja.descricao}</p>
                                                </div>

                                                <div className="pt-4 border-t border-emerald-50 mt-auto space-y-3">
                                                    {/* Endereço Padronizado (Preto e Maior) */}
                                                    <div className="flex items-start gap-2 text-black">
                                                        <MapPin size={14} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                                                        <p className="text-sm font-bold leading-tight">{loja.endereco}</p>
                                                    </div>

                                                    <div className="flex gap-3 pt-2">
                                                        <a href={`tel:${loja.telefone}`} className="flex items-center justify-center gap-1.5 text-[#1B3022] font-black text-[9px] uppercase bg-emerald-50 px-3 py-2 rounded-xl flex-1 hover:bg-emerald-100 transition-colors">
                                                            <Phone size={12} className="text-emerald-500" /> Ligar
                                                        </a>
                                                        <a href={getWhatsappLink(loja.telefone)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-white font-black text-[9px] uppercase bg-emerald-500 px-3 py-2 rounded-xl flex-[2] hover:bg-emerald-600 shadow-md transition-colors shadow-emerald-200">
                                                            <MessageCircle size={12} /> WhatsApp
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}