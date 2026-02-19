"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    TrendingUp, Users, MousePointer2, CheckCircle2,
    Star, Crown, Mail, MessageSquare, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnunciePage() {
    const beneficios = [
        {
            title: "Visibilidade Local",
            desc: "Apareça para turistas e moradores que buscam ativamente o que fazer em Guapimirim.",
            icon: Users
        },
        {
            title: "SEO Otimizado",
            desc: "Seu estabelecimento indexado no Google através de um portal de autoridade na região.",
            icon: TrendingUp
        },
        {
            title: "Conversão Direta",
            desc: "Botões de WhatsApp e reservas que levam o cliente direto para o seu atendimento.",
            icon: MousePointer2
        }
    ];

    const planos = [
        {
            nome: "Essencial",
            preco: "Gratuito",
            desc: "Presença básica no guia para todos os comércios locais.",
            features: ["Cadastro no Guia", "Telefone e Endereço", "Link de Localização"],
            btn: "Cadastrar Grátis",
            highlight: false
        },
        {
            nome: "Destaque Ouro",
            preco: "R$ 94,80 /ano",
            desc: "Para quem quer ser visto primeiro e passar mais credibilidade.",
            features: ["Topo das buscas", "Selo de Verificado", "Página Exclusiva", "Link de WhatsApp", "Sem anúncios externos"],
            btn: "Ser Destaque",
            highlight: true
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* Hero Section */}
                <header className="relative bg-[#1B3022] pt-48 pb-32 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
                        <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em]">Oportunidade de Negócio</span>
                        <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Sua marca no <br /> <span className="text-emerald-500">Coração de Guapimirim</span>
                        </h1>
                        <p className="text-emerald-50/70 text-lg max-w-2xl mx-auto font-medium">
                            Conecte seu comércio ou serviço ao maior portal de turismo e utilidade pública da nossa cidade.
                        </p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                    {/* Grid de Benefícios */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {beneficios.map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 text-center space-y-4">
                                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="font-black uppercase text-sm tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </section>

                    {/* Seção de Planos */}
                    <section className="mb-24 space-y-12">
                        <div className="text-center">
                            <h2 className="text-[#1B3022] text-4xl font-black uppercase tracking-tighter">Planos de Anúncio</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {planos.map((plano, i) => (
                                <div key={i} className={`p-12 rounded-[4rem] shadow-2xl flex flex-col ${plano.highlight ? 'bg-[#1B3022] text-white border-4 border-emerald-500 scale-105' : 'bg-white text-[#1B3022] border border-emerald-50'}`}>
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 flex items-center gap-2">
                                            {plano.highlight && <Crown className="text-emerald-400" />} {plano.nome}
                                        </h3>
                                        <p className={`text-sm font-medium ${plano.highlight ? 'text-emerald-100/60' : 'text-gray-400'}`}>{plano.desc}</p>
                                    </div>
                                    <div className="text-4xl font-black mb-8">{plano.preco}</div>
                                    <ul className="space-y-4 mb-12 flex-grow">
                                        {plano.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-bold">
                                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${plano.highlight ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20' : 'bg-gray-100 hover:bg-gray-200 text-[#1B3022]'}`}>
                                        {plano.btn}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Chamada para Contato Direto */}
                    <section className="bg-emerald-500 rounded-[4rem] p-12 md:p-20 mb-28 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                        <div className="relative z-10 space-y-6 max-w-xl text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Precisa de um projeto personalizado?</h2>
                            <p className="font-bold text-emerald-100 text-lg italic opacity-90 tracking-wide">
                                Criamos banners exclusivos, publieditoriais, destaques em redes sociais, sistemas e sites para o seu negócio.
                            </p>
                        </div>
                        <a href="https://wa.me/5521999999999" target="_blank" className="relative z-10 bg-[#1B3022] px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center gap-4 hover:scale-105 transition-transform shadow-2xl">
                            Falar com o Guia <ArrowRight size={20} />
                        </a>
                        <div className="absolute top-0 right-0 opacity-10 rotate-12 scale-150">
                            <MessageSquare size={300} />
                        </div>
                    </section>
                </div>
            </main>


        </div>
    );
}