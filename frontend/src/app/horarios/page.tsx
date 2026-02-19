"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
    Clock, MapPin, Info, ArrowLeft, Navigation2, Train,
    AlertTriangle, Bus, Ticket, ArrowRightLeft, Smartphone,
    ExternalLink, Play
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Horario {
    id: number;
    origem: string;
    destino: string;
    empresa: string;
    numero_linha: string;
    tipo: string;
    tarifa: string;
    horarios: string;
    via: string;
    observacoes: string;
}

export default function HorariosPage() {
    const [rotas, setRotas] = useState<Horario[]>([]);
    const [filtro, setFiltro] = useState("TODOS");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // CORREÇÃO AQUI: A rota correta no Django é 'transporte'
        fetch("http://127.0.0.1:8000/api/transporte/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro na API: ${res.status}`);
                }
                return res.json();
            })
            .then((data: Horario[]) => {
                const ordenadas = data.sort((a, b) => a.empresa.localeCompare(b.empresa));
                setRotas(ordenadas);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar horários:", err);
                setLoading(false);
            });
    }, []);

    const getEmpresaStyle = (empresa: string) => {
        const nome = empresa.toUpperCase();
        if (nome.includes("REGINAS")) return "bg-[#FACC15] text-black";
        if (nome.includes("PARAÍSO VERDE")) return "bg-[#064E3B] text-white";
        if (nome.includes("COMDEGUAPI") || nome.includes("ÔNIBUS DA GENTE")) return "bg-[#6EE7B7] text-black";
        if (nome.includes("VAN")) return "bg-[#92400E] text-white";
        if (nome.includes("SUPERVIA")) return "bg-[#DC2626] text-white";
        if (nome.includes("TERESÓPOLIS")) return "bg-[#1E40AF] text-white";
        return "bg-[#1B3022] text-white";
    };

    const rotasFiltradas = filtro === "TODOS"
        ? rotas
        : rotas.filter(r => r.tipo === filtro);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow pb-20 font-sans antialiased text-[#2D3A30]">
                {/* Hero Section com Imagem Transparente */}
                <header className="relative bg-[#1B3022] pt-32 pb-24 rounded-b-[3.5rem] shadow-2xl overflow-hidden">
                    {/* Imagem de Fundo com Máscara */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
                            alt="Transporte"
                            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/80"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-4">
                                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Voltar para o Início
                                </Link>
                                <div>
                                    <h1 className="text-white text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                                        Transporte <br /> <span className="text-emerald-500">Público</span>
                                    </h1>
                                </div>
                            </div>

                            <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 p-5 rounded-3xl max-w-sm">
                                <div className="flex gap-3 items-center mb-2">
                                    <AlertTriangle className="text-amber-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">Aviso Oficial</span>
                                </div>
                                <p className="text-amber-100/80 text-[11px] font-medium leading-relaxed italic">
                                    Horários sujeitos a alterações. Informações fornecidas pelas empresas. Consulte o DETRO-RJ.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6">
                    {/* Navegação de Filtros */}
                    <nav className="flex justify-start gap-3 -mt-8 overflow-x-auto pb-6 scrollbar-hide relative z-20">
                        {[
                            { id: "TODOS", label: "Tudo", icon: ArrowRightLeft },
                            { id: "MUNICIPAL", label: "Municipais", icon: Bus },
                            { id: "INTERMUNICIPAL", label: "Intermunicipal", icon: Navigation2 },
                            { id: "TREM", label: "Trens", icon: Train },
                            { id: "VAN", label: "Vans", icon: Bus },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFiltro(item.id)}
                                className={`flex items-center gap-2 px-7 py-4 rounded-2xl text-xs font-black transition-all duration-300 whitespace-nowrap shadow-xl ${filtro === item.id
                                    ? "bg-emerald-500 text-white scale-105 shadow-emerald-500/20"
                                    : "bg-white text-[#1B3022] border border-emerald-100 hover:bg-emerald-50"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${filtro === item.id ? "text-white" : "text-emerald-500"}`} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Grid de Horários */}
                    <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                <div className="col-span-full py-20 text-center">
                                    <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-4 text-emerald-900/40 font-bold uppercase text-xs tracking-widest">Carregando Itinerários...</p>
                                </div>
                            ) : (
                                <>
                                    {rotasFiltradas.length === 0 ? (
                                        <div className="col-span-full py-20 text-center opacity-50">
                                            <p className="font-black uppercase tracking-widest">Nenhum horário encontrado nesta categoria.</p>
                                        </div>
                                    ) : (
                                        rotasFiltradas.map((rota) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                key={rota.id}
                                                className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-emerald-50 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all flex flex-col h-full"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="space-y-3">
                                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl shadow-sm ${getEmpresaStyle(rota.empresa)}`}>
                                                            {rota.tipo === 'TREM' ? <Train className="w-3 h-3" /> : <Bus className="w-3 h-3" />}
                                                            {rota.empresa}
                                                        </span>
                                                        <h3 className="text-2xl font-black text-[#1B3022] tracking-tighter leading-tight">{rota.destino}</h3>
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Navigation2 className="w-4 h-4 fill-current text-emerald-500" />
                                                            <span className="text-xs font-bold uppercase tracking-tight">Via {rota.via || 'Direto'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <span className="block text-[9px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Tarifa</span>
                                                        <div className={`px-4 py-2 rounded-2xl font-black text-base shadow-sm ${Number(rota.tarifa) === 0 ? 'bg-blue-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                                            {Number(rota.tarifa) === 0 ? 'GRÁTIS' : `R$ ${rota.tarifa}`}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 mb-6 p-4 bg-emerald-50/30 rounded-[1.5rem] border border-emerald-100/50">
                                                    <div className="bg-white p-2 rounded-xl shadow-sm">
                                                        <MapPin className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-emerald-600/60 uppercase">Ponto de Partida</span>
                                                        <span className="text-sm font-black text-[#1B3022]">{rota.origem}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-[#F8FAF9] rounded-[1.5rem] p-6 flex-grow border border-emerald-100/30 group-hover:bg-emerald-50/30 transition-colors">
                                                    <div className="flex items-center gap-2 mb-4 text-[#3A5A40] text-[10px] font-black uppercase tracking-widest opacity-50">
                                                        <Clock className="w-4 h-4" />
                                                        Grade de Horários
                                                    </div>
                                                    <p className="text-[14px] text-[#2D3A30] font-bold leading-relaxed whitespace-pre-line tracking-tight">
                                                        {rota.horarios}
                                                    </p>
                                                </div>

                                                {rota.observacoes && (
                                                    <div className="mt-6 pt-4 border-t border-emerald-50 flex gap-3 items-start">
                                                        <Info className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                                        <p className="text-[11px] text-[#2D3A30]/60 font-bold italic leading-snug">
                                                            {rota.observacoes}
                                                        </p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))
                                    )}

                                    {/* Card DETRO Compacto */}
                                    <div className="col-span-full flex justify-start mt-4">
                                        <div className="max-w-xs p-5 bg-[#003399] rounded-[2rem] border-l-[6px] border-[#FFCC00] flex items-center gap-4 shadow-2xl">
                                            <div className="p-2.5 bg-white/10 rounded-xl text-[#FFCC00]">
                                                <Play className="w-5 h-5 fill-current" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-white text-[9px] font-black uppercase tracking-wider">Detro Meu Ônibus</p>
                                                <a
                                                    href="https://play.google.com/store/apps/details?id=com.detro.bus&hl=pt_BR"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-[#FFCC00] hover:bg-white text-[#003399] text-[10px] font-black py-2 px-4 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tighter"
                                                >
                                                    <Smartphone className="w-3.5 h-3.5" />
                                                    Ver em tempo real
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </main>


        </div>
    );
}