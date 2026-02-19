"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Phone, Shield, HeartPulse, Car,
    Zap, Info, MapPin, MessageCircle, Clock, Smartphone, ExternalLink, Anchor, Siren, Landmark, Headphones, Mail, Scale
} from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { sendGAEvent } from '@next/third-parties/google';

export default function TelefonesUteisPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            {/* UI/UX & SEO: Metatags preservando a identidade do portal */}
            <Head>
                <title>Telefones Úteis | Guia Guapimirim - DDD 21</title>
                <meta name="description" content="Lista de contatos essenciais de Guapimirim: Segurança, Saúde, Serviços Públicos e Mobilidade." />
                <meta property="og:title" content="Telefones Úteis | Guia Guapimirim" />
                <meta property="og:description" content="Encontre rapidamente contatos de emergência e utilidade pública em Guapimirim." />
                <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/4/42/Vista_do_Dedo_de_Deus_%281431%29.jpg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                <header className="relative bg-[#1B3022] pt-40 pb-32 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Vista_do_Dedo_de_Deus_%281431%29.jpg"
                            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
                            alt="Dedo de Deus"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Telefones Úteis</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs italic">Guapimirim DDD 21</p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-20 space-y-12">

                    {/* 1. EMERGÊNCIA E SEGURANÇA */}
                    <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                        <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-4">
                            <Shield className="w-8 h-8 text-red-600" />
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-2xl">Segurança e Emergência</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <ContactItem title="Canal para denúncias / Polícia" phone="190" sub="Emergência Geral" />
                                <ContactItem title="Polícia Militar (34º BPM)" phone="(21) 2633-2200 / 2633-4568" sub="Sede regional" />
                                <ContactItem title="Busca e Salvamento Marítimo (SAR)" phone="185" sub="Marinha do Brasil - Baía de Guanabara" />
                            </div>
                            <div className="space-y-6">
                                <ContactItem title="Guarda Municipal de Guapimirim" phone="(21) 2632-2112" sub="Patrulhamento preventivo e proteção de bens" />
                                <ContactItem title="Defesa Civil" phone="199 ou (21) 2632-2947" sub="Atendimento de desastres e riscos" />
                                <ContactItem title="67ª Delegacia Policial" phone="(21) 2333-5938" sub="Estrada do Bananal, 1919 - Bananal" />
                            </div>
                            <div className="space-y-6">
                                <ContactItem title="Polícia Militar (Mulher)" phone="180" sub="Denúncia de violência contra a mulher" />
                                <ContactItem title="Programa Mulher Mais Segura" phone="Presencial" sub="Estrada do Bananal, 1919 - Bananal" />
                            </div>
                        </div>
                    </section>

                    {/* 2. SAÚDE E SALVAMENTO */}
                    <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                        <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-4">
                            <HeartPulse className="w-8 h-8 text-emerald-600" />
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-2xl">Saúde e Salvamento</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-balance">
                            <ContactItem title="Ambulância / Bombeiro" phone="193" sub="Resgate e Incêndios" />
                            <ContactItem title="SAMU" phone="192" sub="Serviço de Atendimento Móvel de Urgência" />
                            <ContactItem title="2º GSFMA - Bombeiros Magé" phone="(21) 2633-6910" sub="Grupamento de Socorro Florestal" />

                            <div className="col-span-full pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-emerald-50">
                                <ContactItem
                                    title="Hospital Municipal José Rabelo de Melo"
                                    phone="(21) 2020-4788 / 2632-3169"
                                    sub="Rua Oswaldo Cruz, s/n - Bananal, Guapimirim"
                                />
                                <ContactItem
                                    title="Posto de Saúde da Família Vale das Pedrinhas"
                                    phone="(21) 2747-9353"
                                    sub="Rua Quinze, sem número - Vale das Pedrinhas, Guapimirim"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 3. SERVIÇOS PÚBLICOS E UTILIDADE */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                            <div className="flex items-center gap-3 mb-8">
                                <Zap className="w-7 h-7 text-amber-500" />
                                <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-xl">Concessionárias e Serviços</h2>
                            </div>
                            <div className="space-y-8">
                                <ContactItem title="Enel (Energia Elétrica)" phone="0800 28 00 120" sub="Falta de luz, problemas na rede ou postes" />
                                <ContactItem title="EcoRioMinas (BR-116)" phone="0800 116 0493" sub="Emergências e socorro na rodovia (Auditivo: 0800 116 0465)" />
                                <ContactItem title="Fonte das Serras (Água e Esgoto)" phone="(21) 2632-5225" sub="Vazamentos, falta d'água ou problemas na rede | faleconosco@fontesdaserra.com.br" />
                                <ContactItem title="Detran" phone="(21) 3633-1827" sub="Estrada do Bananal, 2115 - Bananal, Guapimirim" />
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                            <div className="flex items-center gap-3 mb-8 text-balance">
                                <Car className="text-emerald-600 w-7 h-7" />
                                <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-xl">Mobilidade e Táxis</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                                    <p className="text-emerald-800 font-black text-[10px] uppercase mb-1">Carros Águia (Táxi)</p>
                                    <a
                                        href="https://chat.whatsapp.com/DxoNwKJLerQFQTWagbtuaq"
                                        target="_blank"
                                        onClick={() => sendGAEvent({ event: 'click_utility', value: 'taxi_aguia_whatsapp' })}
                                        className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Entrar no Grupo
                                    </a>
                                </div>
                                <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                                    <p className="text-emerald-800 font-black text-[10px] uppercase mb-1">Carros Elite (Táxi)</p>
                                    <button
                                        onClick={() => {
                                            window.location.href = "tel:21967554442";
                                            sendGAEvent({ event: 'click_phone', value: 'taxi_elite' });
                                        }}
                                        className="text-lg font-black text-[#1B3022] hover:text-emerald-600 transition-colors"
                                    >
                                        (21) 96755-4442
                                    </button>
                                </div>
                                <div className="col-span-full p-6 bg-[#1B3022] rounded-[2rem] text-center">
                                    <p className="text-emerald-400 font-black text-[10px] uppercase">Uber e 99 em Guapimirim?</p>
                                    <p className="text-white font-bold italic text-sm text-balance">Sim, o serviço de aplicativos opera normalmente na cidade.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. PODER PÚBLICO E OUVIDORIA */}
                    <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                        <div className="flex items-center gap-3 mb-8">
                            <Landmark className="text-emerald-600 w-8 h-8" />
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-2xl">Poder Público e Ouvidoria</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="bg-[#F1F5F2] p-8 rounded-[2.5rem]">
                                <ContactItem title="Prefeitura de Guapimirim" phone="(21) 2632-7598" sub="Avenida Dedo de Deus, 1161 - Centro" />
                                <p className="text-[10px] text-emerald-700 font-black mt-2 uppercase tracking-tight italic">Horário: 08h às 17h (Seg a Sex)</p>
                            </div>
                            <div className="bg-[#F1F5F2] p-8 rounded-[2.5rem]">
                                <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                    <Headphones className="w-4 h-4" />
                                    <p className="font-black text-[10px] uppercase">Ouvidoria Geral (SIC)</p>
                                </div>
                                <button
                                    onClick={() => {
                                        window.location.href = "tel:2120204787";
                                        sendGAEvent({ event: 'click_phone', value: 'ouvidoria_geral' });
                                    }}
                                    className="text-xl font-black text-[#1B3022] hover:text-emerald-600 transition-colors"
                                >
                                    (21) 2020-4787
                                </button>
                                <p className="text-[11px] text-gray-500 font-medium italic">Av. Dedo de Deus, 1161 - Jardim Cantagalo (Térreo)</p>
                                <p className="text-[10px] text-emerald-600 font-bold mt-2">ouvidoria.geral@guapimirim.rj.gov.br</p>
                            </div>
                            <div className="space-y-6">
                                <ContactItem title="Câmara Municipal" phone="(21) 3633-2121" sub="Avenida Dedo de Deus, 820 - Centro" />
                                <ContactItem title="Fórum da Comarca" phone="(21) 2632-5248" sub="Estrada Imperial, s/n - Bananal" />
                            </div>
                        </div>
                    </section>

                    {/* 5. ASSISTÊNCIA SOCIAL E DIREITOS */}
                    <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-emerald-50">
                        <div className="flex items-center gap-3 mb-8">
                            <Scale className="text-emerald-600 w-8 h-8" />
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-2xl">Assistência Social e Direitos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <ContactItem title="CRAM | Centro de Referência à Mulher" phone="(21) 97202-4062 / 2020-6192" sub="Rua Claudionor Batista, 249 - Parque Freixal" />
                                <ContactItem title="Conselho Tutelar" phone="(21) 98356-6233" sub="Denúncias de violação dos direitos de menores" />
                                <ContactItem title="Conselho da Mulher" phone="Presencial" sub="Rua Francisco Buarque, 138 - Bananal" />
                                <ContactItem title="Cemitério de Guapimirim" phone="(21) 97013-0026 (Valdomiro)" sub="Horário: 08h às 16h | Estrada do Bananal, 27-149" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-[#1B3022] font-black uppercase text-xs border-b border-emerald-100 pb-2 mb-4">Unidades do CRAS (08h às 17h)</p>
                                <CRASItem
                                    nome="Faustina de Souza Fonseca"
                                    local="Rua Professor Rocha Faria - Guapimirim/RJ"
                                    email="cras1@guapimirim.rj.gov.br"
                                />
                                <CRASItem
                                    nome="Paulo Antônio Xavier Daim"
                                    local="Rua Prainos, 875 - Jardim Guapimirim/RJ"
                                    email="cras2@guapimirim.rj.gov.br"
                                />
                                <CRASItem
                                    nome="Maria Mercedes Rosa de Carvalho"
                                    local="Loteamento Vale das Pedrinhas"
                                    email="cras3@guapimirim.rj.gov.br"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>


        </div>
    );
}

function ContactItem({ title, phone, sub }: { title: string, phone: string, sub: string }) {
    const isClickable = phone !== "Presencial";

    return (
        <div className="group">
            <p className="text-emerald-600 font-black text-[9px] uppercase tracking-widest mb-1 leading-none">{title}</p>
            {isClickable ? (
                <button
                    onClick={() => {
                        window.location.href = `tel:${phone.replace(/\D/g, '')}`;
                        sendGAEvent({ event: 'click_phone', value: title.toLowerCase() });
                    }}
                    className="text-2xl font-black text-[#1B3022] group-hover:text-emerald-700 transition-colors tracking-tighter text-left"
                >
                    {phone}
                </button>
            ) : (
                <p className="text-2xl font-black text-[#1B3022] tracking-tighter">{phone}</p>
            )}
            <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">{sub}</p>
        </div>
    );
}

function CRASItem({ nome, local, email }: { nome: string, local: string, email: string }) {
    return (
        <div className="bg-[#1B3022] p-5 rounded-[2rem] text-white">
            <p className="text-emerald-400 font-black text-[8px] uppercase tracking-widest mb-1 leading-none">Unidade de Assistência Social</p>
            <h5 className="font-black uppercase text-xs mb-1 tracking-tight">CRAS {nome}</h5>
            <p className="text-white/60 text-[10px] font-medium leading-tight mb-1">{local}</p>
            <button
                onClick={() => sendGAEvent({ event: 'click_email', value: `cras_${nome.toLowerCase()}` })}
                className="text-emerald-400 text-[9px] font-bold italic hover:text-white transition-colors"
            >
                {email}
            </button>
        </div>
    );
}