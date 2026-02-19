"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Car, Bus, Map as MapIcon, ArrowRight, ArrowLeft,
    MapPin, Navigation, Info, Smartphone, Fuel, Calculator, CheckCircle2, AlertTriangle, Train, Phone
} from "lucide-react";
import Link from "next/link";

export default function ComoChegarPage() {
    const [distancia, setDistancia] = useState<number>(0);
    const [consumo, setConsumo] = useState<number>(0);
    const [preco, setPreco] = useState<number>(0);
    const [idaVolta, setIdaVolta] = useState<boolean>(false);
    const [resultado, setResultado] = useState<{ litros: number, custo: number } | null>(null);

    const calcularCombustivel = () => {
        if (distancia > 0 && consumo > 0 && preco > 0) {
            const distTotal = idaVolta ? distancia * 2 : distancia;
            const litrosNecessarios = distTotal / consumo;
            const custoTotal = litrosNecessarios * preco;
            setResultado({ litros: litrosNecessarios, custo: custoTotal });
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAF9]">
            <Header />

            <main className="flex-grow font-sans antialiased text-[#2D3A30]">
                {/* Hero Section */}
                <header className="relative bg-[#1B3022] pt-48 pb-40 rounded-b-[4rem] shadow-2xl overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://odia.ig.com.br/_midias/jpg/2024/07/17/1200x750/1_br116_guapimirim_radar_prf-33449717.jpg"
                            className="w-full h-full object-cover object-center opacity-50 mix-blend-overlay scale-105"
                            alt="BR-116 Guapimirim"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-[#1B3022]/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        {/* Link Voltar ao Início */}
                        <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                        </Link>
                        <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-balance">Como Chegar</h1>
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs italic">Trace sua rota para o paraíso aos pés da Serra</p>
                    </div>
                </header>

                {/* Submenu de Navegação (Anchor Menu) */}
                <div className="sticky top-0 z-50 bg-[#F8FAF9]/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {[
                                { label: "Vindo de Carro", id: "carro", icon: Car },
                                { label: "Calculadora de Gastos", id: "calculadora", icon: Calculator },
                                { label: "Transporte Público", id: "transporte", icon: Bus },
                                { label: "Localização Geográfica", id: "localizacao", icon: MapIcon },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#1B3022] hover:text-emerald-600 transition-colors"
                                >
                                    <item.icon className="w-4 h-4 text-emerald-500" />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 space-y-24 relative z-20">

                    {/* SEÇÃO 1: VINDO DE CARRO */}
                    <section id="carro" className="scroll-mt-32">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-[#1B3022] p-2 rounded-xl shadow-lg">
                                <Car className="text-emerald-500 w-8 h-8" />
                            </div>
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-4xl">Vindo de Carro</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 space-y-8 text-balance">
                                <div>
                                    <h3 className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-3 italic">Do Rio de Janeiro</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        O acesso principal é realizado pela rodovia <span className="font-black text-[#1B3022]">BR-116 (Rio-Teresópolis)</span>. Após passar pelo pedágio de Magé, mantenha-se na pista por mais 9km. Guapimirim é a última cidade antes de iniciar a subida da Serra dos Órgãos. Fique atento à entrada principal do Portal a direita após o viaduto de Parada Modelo.
                                    </p>
                                </div>
                                <div className="pt-8 border-t border-emerald-50">
                                    <h3 className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-3 italic">Da Região dos Lagos</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        Siga pela <span className="font-black text-[#1B3022]">Via Lagos (RJ-124)</span> até Rio Bonito e acesse a BR-101 em direção ao Rio de Janeiro. Na altura de Itaboraí, pegue a saída para Magé via <span className="font-black text-[#1B3022]">Arco Metropolitano (BR-493)</span>. Ao chegar no entroncamento com a BR-116 em Magé, siga as placas no sentido Teresópolis até o portal de entrada de Guapimirim.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 space-y-8 text-balance flex flex-col justify-between">
                                <div>
                                    <h3 className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-3 italic">De Minas Gerais ou Teresópolis</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        Para quem vem pela <span className="font-black text-[#1B3022]">BR-116 (sentido Rio de Janeiro)</span>, o trajeto envolve a descida da Serra dos Órgãos. O acesso principal para o centro de Guapimirim é seguindo para descer a serra após passar pelo Mirante do Soberbo, logo no início do trecho de descida.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-4 items-center shadow-sm">
                                        <Smartphone className="text-amber-500 w-6 h-6 flex-shrink-0" />
                                        <p className="text-[12px] text-amber-900 font-bold italic leading-tight text-balance">
                                            Dica de GPS: Para chegar ao coração da cidade, procure por <span className="font-black uppercase">Prefeitura de Guapimirim</span> ou <span className="font-black uppercase">Praça da Emancipação</span> como ponto de referência central.
                                        </p>
                                    </div>
                                    <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex gap-4 items-center shadow-sm">
                                        <Navigation className="text-emerald-600 w-6 h-6 flex-shrink-0" />
                                        <p className="text-[12px] text-emerald-900 font-bold italic leading-tight text-balance">
                                            Acesso às Cachoeiras: Para as quedas d'água da Barreira, utilize a entrada no KM 98 da BR-116, na subida da serra.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SEÇÃO 2: CALCULADORA DE GASTOS */}
                    <section id="calculadora" className="scroll-mt-32 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1B3022] p-2 rounded-xl shadow-lg">
                                <Calculator className="text-emerald-500 w-8 h-8" />
                            </div>
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-3xl">Calculadora de Gastos com Combustível</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4 bg-[#1B3022] p-10 rounded-[3rem] shadow-2xl text-white h-fit">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">Distância a percorrer (KM)</label>
                                        <input type="number" onChange={(e) => setDistancia(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-all text-xl font-bold" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">Consumo Médio (KM/L)</label>
                                        <input type="number" onChange={(e) => setConsumo(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-all text-xl font-bold" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">Preço do Litro (R$)</label>
                                        <input type="number" onChange={(e) => setPreco(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-all text-xl font-bold" placeholder="0.00" />
                                    </div>
                                    <button onClick={() => setIdaVolta(!idaVolta)} className={`w-full py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${idaVolta ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}>
                                        Considerar Volta? {idaVolta ? 'Sim' : 'Não'}
                                    </button>
                                    <button onClick={calcularCombustivel} className="w-full bg-white text-[#1B3022] py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl">Calcular Agora</button>
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-8">
                                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 h-full min-h-[400px] flex flex-col">
                                    {resultado ? (
                                        <div className="flex-grow space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-emerald-50 p-8 rounded-[2.5rem] shadow-sm">
                                                    <span className="text-emerald-800 font-black text-[10px] uppercase block mb-2">Custo de Combustível</span>
                                                    <p className="text-5xl font-black text-[#1B3022]">R$ {resultado.custo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                </div>
                                                <div className="bg-[#1B3022] p-8 rounded-[2.5rem] text-white shadow-lg">
                                                    <span className="text-emerald-400 font-black text-[10px] uppercase block mb-2">Litros Necessários</span>
                                                    <p className="text-5xl font-black">{resultado.litros.toFixed(1)} L</p>
                                                </div>
                                            </div>
                                            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                                                <AlertTriangle className="text-amber-600 w-6 h-6 flex-shrink-0" />
                                                <p className="text-sm font-medium text-amber-900 leading-relaxed italic">Ajuste para condições reais de estrada: Fatores como trânsito, ar-condicionado e peso influenciam no consumo real. Recomendamos uma margem de segurança de 10% no orçamento.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-grow flex flex-col items-center justify-center opacity-20 text-center">
                                            <Fuel size={100} className="mb-4" />
                                            <p className="font-black uppercase tracking-widest text-xl">Aguardando dados para simulação...</p>
                                        </div>
                                    )}

                                    <div className="mt-8 pt-8 border-t border-emerald-50">
                                        <h4 className="text-[#1B3022] font-black text-sm uppercase mb-6 flex items-center gap-2 italic"><CheckCircle2 className="text-emerald-500 w-5 h-5" /> Checklist de Revisão para Viagem</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {['Pneus Calibrados', 'Nível do Óleo', 'Arrefecimento', 'Luzes e Freios'].map((dica) => (
                                                <div key={dica} className="bg-gray-50 p-3 rounded-xl text-[10px] font-black text-gray-500 uppercase text-center border border-gray-100 italic">{dica}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ECORIOMINAS */}
                    <section className="bg-white p-10 rounded-[4rem] shadow-2xl border border-emerald-50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                            <div className="lg:col-span-2 space-y-4 text-balance">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-500 p-2 rounded-lg text-white">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-[#1B3022] font-black uppercase text-2xl tracking-tighter italic">EcoRioMinas - Concessionária BR-116</h3>
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    A rodovia que corta Guapimirim é administrada pela <span className="font-black text-[#1B3022]">EcoRioMinas</span>. Em caso de qualquer imprevisto durante sua viagem, como problemas mecânicos, pneus furados ou necessidade de atendimento médico, a concessionária oferece suporte gratuito 24 horas por dia em todo o trecho da Rio-Teresópolis.
                                </p>
                            </div>
                            <div className="bg-[#1B3022] p-8 rounded-[3rem] text-center space-y-4 shadow-xl">
                                <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] italic">Atendimento de Emergência</p>
                                <div className="flex flex-col gap-2">
                                    <a href="tel:08001160493" className="text-white text-2xl font-black hover:text-emerald-400 transition-colors tracking-tighter">0800 116 0493</a>
                                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest italic leading-none">Deficientes Auditivos: 0800 116 0465</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SEÇÃO 3: TRANSPORTE PÚBLICO */}
                    <section id="transporte" className="scroll-mt-32 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1B3022] p-2 rounded-xl shadow-lg">
                                <Bus className="text-emerald-500 w-8 h-8" />
                            </div>
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-4xl">Transporte Público</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 text-balance">
                                <h3 className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic">
                                    <MapPin className="w-4 h-4" /> Rotas de Conexão (Sem linha direta)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-balance">
                                    <RouteInfo city="Vindo de Niterói" desc="Pegue o ônibus em direção a Magé (Viação Rio Ita) e, ao chegar no terminal de Magé, realize a integração com as linhas municipais ou vans destinadas a Guapimirim." />
                                    <RouteInfo city="Vindo de Petrópolis" desc="Utilize a linha intermunicipal Petrópolis x Teresópolis. Ao chegar no terminal de Teresópolis, utilize a linha Teresópolis x Guapimirim (Viação Teresópolis)." />
                                    <RouteInfo city="Vindo de Itaboraí" desc="Desloque-se até Magé através da rodovia BR-493. No centro de Magé, utilize as vans intermunicipais ou ônibus que fazem o trajeto direto para Guapimirim." />
                                    <RouteInfo city="Vindo de São Gonçalo" desc="Siga em direção ao terminal rodoviário de Magé. De lá, utilize as linhas frequentes de ônibus ou vans que seguem para o centro de Guapimirim." />
                                </div>
                                <div className="mt-10 pt-8 border-t border-emerald-50">
                                    <Link href="/horarios" className="inline-flex items-center gap-3 bg-[#1B3022] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-900 transition-all group shadow-lg">
                                        Ver Grade de Transporte <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1B3022] p-10 rounded-[3rem] shadow-xl text-white space-y-8">
                                <h3 className="text-emerald-400 font-black text-[10px] uppercase tracking-widest italic border-b border-white/10 pb-4">Linhas Diretas</h3>
                                <div className="space-y-6">
                                    <DirectLine icon={<Bus />} title="Rio (Central)" line="196C (Viação Reginas)" />
                                    <DirectLine icon={<Bus />} title="Duque de Caxias" line="576I (Viação Reginas)" />
                                    <DirectLine icon={<Train />} title="Saracuruna" line="Ramal Guapimirim (Supervia)" />
                                    <DirectLine icon={<Bus />} title="Teresópolis" line="Viação Teresópolis" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SEÇÃO 4: LOCALIZAÇÃO GEOGRÁFICA */}
                    <section id="localizacao" className="scroll-mt-32 space-y-6 pb-20">
                        <div className="flex items-center gap-3">
                            <MapIcon className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-[#1B3022] font-black uppercase tracking-tighter text-3xl">Localização Geográfica</h2>
                        </div>
                        <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white h-[450px] relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58953.5186252119!2d-43.02324055274937!3d-22.540139943640203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99009848f07b45%3A0x6b4845550275816b!2sGuapimirim%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1709140000000!5m2!1spt-BR!2sbr0"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function RouteInfo({ city, desc }: { city: string, desc: string }) {
    return (
        <div className="space-y-2 text-balance">
            <h4 className="text-[#1B3022] font-black text-sm uppercase tracking-tight">{city}</h4>
            <p className="text-[12px] text-gray-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

function DirectLine({ icon, title, line }: { icon: any, title: string, line: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-lg text-emerald-400">{icon}</div>
            <div>
                <p className="text-[10px] font-black uppercase text-emerald-400/60 leading-none mb-1">{title}</p>
                <p className="text-xs font-bold leading-tight">{line}</p>
            </div>
        </div>
    );
}