"use client";

import Header from "../../components/Header";
import { MapPin, Clock, Utensils, ArrowLeft, MessageCircle, ExternalLink, Instagram, Star, Share2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PremiumPageClient({ estabelecimento, slug }: { estabelecimento: any, slug: string }) {
    if (!estabelecimento || !estabelecimento.destaque) {
        return (
            <div className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-3xl font-black text-[#1B3022] mb-4">Página indisponível</h2>
                <p className="text-gray-500 mb-8">Este estabelecimento não possui uma página detalhada no momento.</p>
                <Link href="/" className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition">
                    Voltar para o Início
                </Link>
            </div>
        );
    }

    const formatarUrlImagem = (url: string) => {
        if (!url) return null;
        return url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;
    };

    const fotoPrincipal = formatarUrlImagem(estabelecimento.foto);
    const galeria = [
        formatarUrlImagem(estabelecimento.foto_galeria_1),
        formatarUrlImagem(estabelecimento.foto_galeria_2),
        formatarUrlImagem(estabelecimento.foto_galeria_3)
    ].filter(Boolean);

    const whatsappLink = estabelecimento.telefone
        ? `https://wa.me/55${estabelecimento.telefone.replace(/\D/g, '')}`
        : '#';

    const linkVoltar = estabelecimento.tipo_global ? `/${estabelecimento.tipo_global}` : '/';
    const enderecoCompleto = `${estabelecimento.endereco}, ${estabelecimento.bairro}, Guapimirim - RJ`;
    const urlMapa = `http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* HERO SECTION PREMIUM */}
                <header className="relative w-full h-[50vh] min-h-[400px] bg-[#1B3022]">
                    {fotoPrincipal ? (
                        <motion.img
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            src={fotoPrincipal}
                            alt={estabelecimento.nome}
                            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-30">
                            <Utensils size={80} className="text-white" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF9] via-[#F8FAF9]/20 to-transparent"></div>

                    {/* Navegação e Compartilhamento */}
                    <div className="absolute top-28 left-0 right-0 max-w-6xl mx-auto px-6 flex justify-between items-center z-20">
                        <Link href={linkVoltar} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20">
                            <ArrowLeft size={14} /> Voltar
                        </Link>
                        <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20">
                            <Share2 size={14} /> Compartilhar
                        </button>
                    </div>
                </header>

                {/* CABEÇALHO DO ESTABELECIMENTO */}
                <div className="max-w-6xl mx-auto px-6 relative z-30 -mt-24 mb-16">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-emerald-50">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

                            <div className="space-y-4 max-w-2xl">
                                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                    <Star size={12} className="fill-emerald-500" /> Destaque da Cidade
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1B3022] leading-tight">
                                    {estabelecimento.nome}
                                </h1>

                                <p className="text-emerald-500 font-bold text-lg uppercase tracking-widest">
                                    {estabelecimento.subcategoria || estabelecimento.categoria || estabelecimento.tipo}
                                </p>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {(estabelecimento.faz_entrega || estabelecimento.delivery) && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Delivery</span>
                                    )}
                                    {estabelecimento.pet_friendly && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Pet Friendly</span>
                                    )}
                                    {(estabelecimento.opcoes_veganas || estabelecimento.vegano_vegetariano) && (
                                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Opções Veg / Veggie</span>
                                    )}
                                    {estabelecimento.cafe_da_manha && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Café da Manhã</span>
                                    )}
                                    {estabelecimento.piscina && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Piscina</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                {estabelecimento.telefone && (
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                                        <MessageCircle size={18} /> Falar no WhatsApp
                                    </a>
                                )}
                                {(estabelecimento.link_cardapio || estabelecimento.site_reserva) && (
                                    <a href={estabelecimento.link_cardapio || estabelecimento.site_reserva} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#1B3022] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-900 transition-colors">
                                        <ExternalLink size={18} /> {estabelecimento.site_reserva ? "Ver Site / Reservar" : "Ver Catálogo"}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-32">
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-emerald-50 space-y-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022]">Informações</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-emerald-50 p-3 rounded-xl"><MapPin className="text-emerald-500" size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Endereço</p>
                                        <p className="text-[#1B3022] font-bold text-sm leading-tight">{estabelecimento.endereco}</p>
                                        <p className="text-emerald-600 text-xs font-bold mt-1">{estabelecimento.bairro}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="bg-emerald-50 p-3 rounded-xl"><Clock className="text-emerald-500" size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Horário</p>
                                        <p className="text-[#1B3022] font-bold text-sm">{estabelecimento.horario_funcionamento || estabelecimento.horario || "Consulte horários"}</p>
                                    </div>
                                </div>

                                {estabelecimento.instagram && (
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-emerald-50 p-3 rounded-xl"><Instagram className="text-emerald-500" size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Instagram</p>
                                            <a href={`https://instagram.com/${estabelecimento.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#1B3022] font-bold text-sm hover:text-emerald-500 transition-colors">
                                                {estabelecimento.instagram}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-emerald-50 h-64">
                            <iframe
                                src={urlMapa}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-emerald-50">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 text-[#1B3022]">Sobre o local</h3>
                            {estabelecimento.descricao ? (
                                <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line text-base">
                                    {estabelecimento.descricao}
                                </p>
                            ) : (
                                <p className="text-gray-400 italic font-medium text-sm">Apresentação detalhada em breve.</p>
                            )}
                        </div>

                        {galeria.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-black uppercase tracking-tighter text-[#1B3022] px-2">Galeria</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {galeria.map((foto, index) => (
                                        <div key={index} className={`rounded-3xl overflow-hidden shadow-md ${index === 0 && galeria.length === 3 ? 'sm:col-span-2 sm:h-72' : 'h-56'}`}>
                                            <img src={foto as string} alt={`Foto ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}