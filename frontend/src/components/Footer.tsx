import { Instagram, Facebook, Mail, MapPin, Phone, Megaphone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#142118] text-emerald-50/60 pt-16 pb-8 border-t border-white/5 font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Coluna 1: Branding e Social */}
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl leading-none tracking-tighter uppercase">Guia Guapi</span>
                        <span className="text-emerald-400 text-[10px] font-bold tracking-[0.1em] uppercase italic">Terra do Dedo de Deus</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        O guia definitivo da cidade de Guapimirim. Encontre horários de transporte,
                        o melhor da gastronomia local, comércio e o caminho para o Dedo de Deus.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://instagram.com" target="_blank" className="bg-white/5 p-2 rounded-lg hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                        <a href="https://facebook.com" target="_blank" className="bg-white/5 p-2 rounded-lg hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                        <a href="mailto:contato@guiaguapi.com.br" className="bg-white/5 p-2 rounded-lg hover:text-white transition-all"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Coluna 2: Navegação e Negócios */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest">Navegação</h4>
                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-medium">
                        <li><Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Início</Link></li>
                        <li><Link href="/a-cidade" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• A Cidade</Link></li>
                        <li><Link href="/como-chegar" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Como Chegar</Link></li>
                        <li><Link href="/horarios" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Transporte</Link></li>
                        <li><Link href="/hospedagem" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Hospedagem</Link></li>
                        <li><Link href="/gastronomia" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Gastronomia</Link></li>
                        <li><Link href="/comercio" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Comércio</Link></li>
                        <li><Link href="/turismo" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Turismo</Link></li>
                        <li><Link href="/telefones-uteis" className="hover:text-emerald-400 transition-colors flex items-center gap-2">• Telefones Úteis</Link></li>
                    </ul>

                    {/* Link de Monetização em Destaque */}
                    <div className="pt-4">
                        <Link href="/anuncie" className="text-emerald-400 font-black flex items-center gap-2 hover:text-white transition-colors group">
                            <Megaphone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            ANUNCIE NO PORTAL
                        </Link>
                    </div>
                </div>

                {/* Coluna 3: Localização */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest">Localização</h4>
                    <div className="flex gap-3 items-start">
                        <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <div className="flex flex-col">
                            <p className="text-sm">Guapimirim - Rio de Janeiro</p>
                            <span className="text-[11px] opacity-70 italic">Terra do Dedo de Deus</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center pt-2">
                        <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm font-bold text-white">(21) 99999-9999</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                    © 2026 Guia Guapimirim • Todos os direitos reservados.
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-60">
                    Desenvolvido por <a href="https://augustoqueiroz13.github.io/meu-portfolio/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">Eletrofox Tecnologia</a>
                </p>
            </div>
        </footer>
    );
}