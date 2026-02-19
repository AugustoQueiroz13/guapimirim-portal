"use client";

import Link from "next/link";
import { Menu, Bus, Utensils, ShoppingBag, MapPin, X, Bed, Landmark, Map } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: "A Cidade", href: "/a-cidade", icon: Landmark },
        { label: "Como Chegar", href: "/como-chegar", icon: Map },
        { label: "Transporte", href: "/horarios", icon: Bus },
        { label: "Hospedagem", href: "/hospedagem", icon: Bed },
        { label: "Gastronomia", href: "/gastronomia", icon: Utensils },
        { label: "Comércio", href: "/comercio", icon: ShoppingBag },
        { label: "Turismo", href: "/turismo", icon: MapPin },
    ];

    return (
        <nav className="absolute top-0 left-0 w-full z-[100] font-sans">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo Guia Guapimirim */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-emerald-500 p-1.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-900/20">
                        <MapPin className="text-white w-6 h-6 fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl leading-none tracking-tighter uppercase">Guia Guapimirim</span>
                        <span className="text-emerald-400 text-[10px] font-bold tracking-[0.1em] uppercase italic">Terra do Dedo de Deus</span>
                    </div>
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-white/80 hover:text-white flex items-center gap-2 text-[13px] font-bold transition-colors whitespace-nowrap"
                        >
                            <item.icon className="w-4 h-4 text-emerald-400" />
                            {item.label}
                        </Link>
                    ))}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white p-2 bg-white/10 backdrop-blur-md rounded-xl"
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
                <div className="md:hidden bg-[#1B3022]/95 backdrop-blur-xl border-t border-white/5 p-6 space-y-3 shadow-2xl">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 text-white font-bold p-3 hover:bg-white/5 rounded-xl transition-all"
                        >
                            <item.icon className="w-5 h-5 text-emerald-400" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}