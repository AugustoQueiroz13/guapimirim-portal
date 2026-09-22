"use client";

import Header from "../../components/Header";
import {
    TrendingUp, Users, MousePointer2, CheckCircle2,
    Crown, MessageSquare, ArrowRight, X, Upload
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnunciePage() {
    // Estados do Formulário Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [planoEscolhido, setPlanoEscolhido] = useState<"GRATUITO" | "OURO">("GRATUITO");

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        endereco: "",
        telefone: "",
        categoria: "Comércio",
        subcategoria: "",
        faz_entrega: false,
        pet_friendly: false,
        opcoes_veganas: false,
        foto: null as File | null,
        // Campos Ouro
        descricao: "",
        horario_funcionamento: "",
        link_cardapio: "",
        instagram: "",
        whatsapp: "",
        foto_galeria_1: null as File | null,
        foto_galeria_2: null as File | null,
        foto_galeria_3: null as File | null,
    });

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
            highlight: false,
            action: () => {
                setPlanoEscolhido("GRATUITO");
                setIsModalOpen(true);
            }
        },
        {
            nome: "Destaque Ouro",
            preco: "R$ 149,00 /ano",
            desc: "Para quem quer ser visto primeiro e passar mais credibilidade.",
            features: ["Topo das buscas", "Selo de Verificado", "Página Exclusiva", "Link de WhatsApp", "Sem anúncios externos"],
            btn: "Ser Destaque",
            highlight: true,
            action: () => {
                setPlanoEscolhido("OURO");
                setIsModalOpen(true);
            }
        }
    ];

    // Manipuladores de Mudança do Formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    // Envio para o Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        // FormData é necessário para enviar arquivos (foto)
        const data = new FormData();
        data.append("nome", formData.nome);
        data.append("email", formData.email);
        data.append("endereco", formData.endereco);
        data.append("telefone", formData.telefone);
        data.append("categoria", formData.categoria);
        data.append("subcategoria", formData.subcategoria);
        data.append("faz_entrega", String(formData.faz_entrega));
        data.append("pet_friendly", String(formData.pet_friendly));
        data.append("opcoes_veganas", String(formData.opcoes_veganas));
        if (formData.foto) data.append("foto", formData.foto);

        if (planoEscolhido === "OURO") {
            data.append("descricao", formData.descricao);
            data.append("horario_funcionamento", formData.horario_funcionamento);
            data.append("link_cardapio", formData.link_cardapio);
            data.append("instagram", formData.instagram);
            data.append("whatsapp", formData.whatsapp);
            if (formData.foto_galeria_1) data.append("foto_galeria_1", formData.foto_galeria_1);
            if (formData.foto_galeria_2) data.append("foto_galeria_2", formData.foto_galeria_2);
            if (formData.foto_galeria_3) data.append("foto_galeria_3", formData.foto_galeria_3);
        }

        try {
            const url = planoEscolhido === "OURO" 
                ? 'http://127.0.0.1:8000/api/checkout-ouro/' 
                : 'http://127.0.0.1:8000/api/cadastros-gratuitos/';

            const response = await fetch(url, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const resData = await response.json();
                
                if (planoEscolhido === "OURO" && resData.url) {
                    // Redireciona para o checkout da InfinitePay
                    window.location.href = resData.url;
                    return;
                }

                setSubmitStatus("success");
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSubmitStatus("idle");
                    // Reseta o formulário
                    setFormData({
                        nome: "", email: "", endereco: "", telefone: "", categoria: "Comércio", subcategoria: "",
                        faz_entrega: false, pet_friendly: false, opcoes_veganas: false, foto: null,
                        descricao: "", horario_funcionamento: "", link_cardapio: "", instagram: "", whatsapp: "",
                        foto_galeria_1: null, foto_galeria_2: null, foto_galeria_3: null
                    });
                }, 3000);
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Erro ao enviar cadastro:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* Hero Section */}
                <header className="relative bg-[#1B3022] pt-48 pb-32 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/mirante_soberbo_2.jpg"
                            alt="Mirante do Soberbo - Guapimirim"
                            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3022]/80 via-transparent to-[#1B3022]"></div>
                    </div>
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
                                    <button onClick={plano.action} className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${plano.highlight ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20' : 'bg-gray-100 hover:bg-gray-200 text-[#1B3022]'}`}>
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

            {/* MODAL DE CADASTRO GRATUITO */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative scrollbar-hide"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-[#1B3022]">
                                    {planoEscolhido === "OURO" ? "Cadastro Destaque Ouro" : "Cadastro Gratuito"}
                                </h2>
                                <p className="text-gray-500 font-medium mt-1">Preencha os dados do seu negócio para entrar no guia.</p>
                            </div>

                            {submitStatus === "success" ? (
                                <div className="bg-emerald-50 text-emerald-600 p-8 rounded-3xl text-center border border-emerald-100">
                                    <CheckCircle2 size={48} className="mx-auto mb-4" />
                                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Enviado com sucesso!</h3>
                                    <p className="text-sm font-medium">Sua solicitação será analisada pela nossa equipe em breve.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 text-[#1B3022]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Nome do Estabelecimento *</label>
                                            <input required name="nome" value={formData.nome} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Telefone (WhatsApp) *</label>
                                            <input required name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="Ex: 21999999999" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-700">E-mail *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Endereço Completo *</label>
                                        <input required name="endereco" value={formData.endereco} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Categoria Principal *</label>
                                            <select name="categoria" value={formData.categoria} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium appearance-none">
                                                <option value="Gastronomia">Gastronomia</option>
                                                <option value="Hospedagem">Hospedagem</option>
                                                <option value="Comércio">Comércio em Geral</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Subcategoria</label>
                                            <input name="subcategoria" value={formData.subcategoria} onChange={handleInputChange} placeholder="Ex: Hamburgueria, Pousada, Eletrônicos" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 space-y-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-2">Comodidades (Marque se possuir)</p>
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="faz_entrega" checked={formData.faz_entrega} onChange={handleInputChange} className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" />
                                                <span className="font-bold text-sm">Faz Entrega</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="pet_friendly" checked={formData.pet_friendly} onChange={handleInputChange} className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" />
                                                <span className="font-bold text-sm">Pet Friendly</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="opcoes_veganas" checked={formData.opcoes_veganas} onChange={handleInputChange} className="w-5 h-5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" />
                                                <span className="font-bold text-sm">Opções Veganas</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-700">Foto ou Logomarca Principal</label>
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                                                <p className="text-sm font-bold text-gray-500">
                                                    {formData.foto ? formData.foto.name : "Clique para selecionar um arquivo"}
                                                </p>
                                            </div>
                                            <input type="file" name="foto" accept="image/*" onChange={handleFileChange} className="hidden" />
                                        </label>
                                    </div>

                                    {planoEscolhido === "OURO" && (
                                        <div className="bg-[#1B3022] text-white p-8 rounded-3xl space-y-6 mt-8 relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 opacity-10 scale-150 rotate-12">
                                                <Crown size={200} />
                                            </div>
                                            <div className="relative z-10 space-y-6">
                                                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                                                    <Crown className="text-emerald-400" /> Benefícios Exclusivos Ouro
                                                </h3>
                                                
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-emerald-400">Descrição Completa *</label>
                                                    <textarea required name="descricao" value={formData.descricao} onChange={handleInputChange} rows={3} placeholder="Conte mais sobre o seu negócio, diferenciais, história..." className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-white placeholder-white/30" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-400">Horário de Funcionamento</label>
                                                        <input name="horario_funcionamento" value={formData.horario_funcionamento} onChange={handleInputChange} placeholder="Ex: Seg a Sab, 08h às 18h" className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-white placeholder-white/30" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-400">Link do Cardápio ou Site</label>
                                                        <input name="link_cardapio" value={formData.link_cardapio} onChange={handleInputChange} placeholder="https://..." className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-white placeholder-white/30" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-400">Instagram</label>
                                                        <input name="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="@seunegocio" className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-white placeholder-white/30" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-emerald-400">WhatsApp de Atendimento *</label>
                                                        <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="21999999999" className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-white placeholder-white/30" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-white/10">
                                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Fotos da Galeria (Máx 3)</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {[1, 2, 3].map(num => {
                                                            const fieldName = `foto_galeria_${num}` as keyof typeof formData;
                                                            const file = formData[fieldName] as File | null;
                                                            return (
                                                                <label key={num} className="flex flex-col items-center justify-center h-24 border border-dashed border-white/30 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer text-center p-2">
                                                                    <Upload className="w-5 h-5 text-emerald-400 mb-1" />
                                                                    <span className="text-[10px] uppercase font-bold text-white/70">
                                                                        {file ? file.name.slice(0,10)+"..." : `Foto ${num}`}
                                                                    </span>
                                                                    <input type="file" name={fieldName} accept="image/*" onChange={handleFileChange} className="hidden" />
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {submitStatus === "error" && (
                                        <p className="text-red-500 text-sm font-bold text-center">Ocorreu um erro ao enviar. Tente novamente.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full font-black uppercase text-sm tracking-widest py-5 rounded-2xl transition-all shadow-xl disabled:opacity-50 ${
                                            planoEscolhido === "OURO" 
                                                ? "bg-emerald-400 hover:bg-emerald-300 text-[#1B3022] shadow-emerald-400/20" 
                                                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                                        }`}
                                    >
                                        {isSubmitting 
                                            ? "Processando..." 
                                            : planoEscolhido === "OURO" 
                                                ? "Ir para Pagamento (R$ 149,00)" 
                                                : "Enviar Cadastro Gratuito"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}