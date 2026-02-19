"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Navigation, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

export default function PontoDetalhePage() {
    const params = useParams();
    const [ponto, setPonto] = useState<any>(null);

    useEffect(() => {
        // Busca o ponto específico pelo slug
        fetch(`http://127.0.0.1:8000/api/turismo/?slug=${params.slug}`)
            .then(res => res.json())
            .then(data => setPonto(data[0])); // Pega o primeiro resultado do filtro
    }, [params.slug]);

    if (!ponto) return <div className="pt-40 text-center font-black uppercase">Carregando detalhes...</div>;

    return (
        <main className="min-h-screen bg-[#F8FAF9] pb-20">
            {/* Header com a Foto de Fundo */}
            <div className="h-[70vh] relative overflow-hidden rounded-b-[5rem] shadow-2xl">
                <img src={ponto.foto} className="w-full h-full object-cover" alt={ponto.nome} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-[#1B3022]/20 to-transparent"></div>
                <div className="absolute bottom-16 left-0 w-full px-6 text-center">
                    <Link href="/turismo" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-white transition-colors">
                        <ArrowLeft size={14} /> Voltar para Turismo
                    </Link>
                    <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">{ponto.nome}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10 space-y-12">
                {/* Texto e Informações */}
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-emerald-50 space-y-8">
                    <div className="flex flex-wrap gap-4 items-center border-b border-emerald-50 pb-6">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                            <MapPin size={16} /> {ponto.bairro}
                        </div>
                    </div>

                    <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed text-lg text-justify whitespace-pre-line">
                        <h2 className="text-[#1B3022] font-black text-3xl uppercase tracking-tighter mb-4">Sobre o local</h2>
                        {ponto.descricao_completa}
                    </div>

                    <div className="bg-emerald-50 p-10 rounded-[3rem] space-y-4">
                        <h3 className="text-[#1B3022] font-black text-xl uppercase tracking-tighter flex items-center gap-2">
                            <Navigation className="text-emerald-600" /> Como Chegar
                        </h3>
                        <p className="text-gray-600 font-medium italic">{ponto.como_chegar}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}