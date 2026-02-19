"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Clock, MapPin, Info, ArrowLeft, Navigation2, Train, AlertTriangle } from "lucide-react";
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
    fetch("http://127.0.0.1:8000/api/horarios/")
      .then((res) => res.json())
      .then((data: Horario[]) => {
        // Ordenação para garantir que empresas iguais fiquem juntas
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
        <header className="bg-[#1B3022] px-6 pt-12 pb-20 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                <ArrowLeft className="text-white w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-white text-3xl font-black tracking-tighter uppercase leading-tight">Horários - Transporte Público</h1>
                <p className="text-emerald-400 text-[10px] font-bold tracking-[0.1em] uppercase italic">Terra do Dedo de Deus</p>
              </div>
            </div>

            {/* Aviso Importante Adicionado */}
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-4 items-center max-w-2xl mb-6">
              <AlertTriangle className="text-amber-500 w-6 h-6 flex-shrink-0" />
              <p className="text-amber-200 text-[11px] leading-tight font-bold uppercase tracking-tight">
                * Todos os horários podem sofrer alterações. Informações fornecidas pelas respectivas empresas. Consulte o DETRO-RJ.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex gap-4 items-center max-w-2xl">
              <div className="bg-emerald-500/20 p-2 rounded-xl">
                <Navigation2 className="text-emerald-400 w-5 h-5 fill-current" />
              </div>
              <p className="text-emerald-50 text-[11px] leading-relaxed font-medium">
                Consulte as linhas municipais, trens, vans e intermunicipais de Guapimirim.
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex justify-start gap-3 -mt-7 overflow-x-auto pb-4 scrollbar-hide relative z-20">
            {[
              { id: "TODOS", label: "Tudo" },
              { id: "MUNICIPAL", label: "Municipais" },
              { id: "INTERMUNICIPAL", label: "Intermunicipal" },
              { id: "TREM", label: "Trens" },
              { id: "VAN", label: "Vans" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFiltro(item.id)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 whitespace-nowrap shadow-lg ${filtro === item.id
                  ? "bg-[#3A5A40] text-white scale-105"
                  : "bg-white text-[#58705F] border border-emerald-100/50 hover:bg-emerald-50"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-emerald-800/40 font-bold uppercase tracking-widest">
                  Sincronizando Dados...
                </div>
              ) : rotasFiltradas.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border border-dashed border-emerald-200">
                  Nenhum itinerário encontrado
                </div>
              ) : (
                rotasFiltradas.map((rota) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={rota.id}
                    className="bg-white rounded-[2rem] p-6 shadow-sm border border-emerald-50 transition-all flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-[70%]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded shadow-sm ${getEmpresaStyle(rota.empresa)}`}>
                            {rota.empresa}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-[#1B3022] leading-tight mb-1">{rota.destino}</h3>
                        <div className="flex items-center gap-1 text-gray-400">
                          {rota.tipo === 'TREM' ? <Train className="w-3.5 h-3.5 text-red-600" /> : <Navigation2 className="w-3 h-3 fill-current" />}
                          <span className="text-[10px] font-bold uppercase tracking-tight">Via {rota.via || 'Direto'}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold text-gray-400 uppercase mb-1">Tarifa</span>
                        <div className={`px-3 py-1 rounded-xl font-black text-sm ${Number(rota.tarifa) === 0 ? 'bg-blue-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                          {Number(rota.tarifa) === 0 ? 'GRÁTIS' : `R$ ${rota.tarifa}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 p-2 bg-emerald-50/50 rounded-xl">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <p className="text-xs font-bold text-emerald-900/70">Partida: <span className="text-[#1B3022]">{rota.origem}</span></p>
                    </div>

                    <div className="bg-[#F1F5F2] rounded-2xl p-4 flex-grow border border-emerald-100/10">
                      <div className="flex items-center gap-2 mb-2 text-[#3A5A40] text-[10px] font-black uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        Horários Previstos
                      </div>
                      <p className="text-[13px] text-[#4A5D50] font-semibold leading-relaxed whitespace-pre-line">
                        {rota.horarios}
                      </p>
                    </div>

                    {rota.observacoes && (
                      <div className="mt-4 pt-3 border-t border-emerald-50">
                        <p className="text-[10px] text-orange-800/60 font-medium italic flex gap-2 items-start">
                          <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          {rota.observacoes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}