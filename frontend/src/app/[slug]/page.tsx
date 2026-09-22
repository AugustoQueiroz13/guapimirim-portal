import { Metadata } from "next";
import PremiumPageClient from "./PremiumPageClient";

// Arruma a URL da foto para o WhatsApp ler corretamente
const formatarUrlImagem = (url: string | null) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;
};

// Esta função mágica constrói as tags invisíveis (SEO e Open Graph)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    // AQUI ESTÁ A MÁGICA NOVA: precisamos do "await" no Next.js atual
    const { slug } = await params;

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/estabelecimento/${slug}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Não encontrado");

        const data = await res.json();
        const fraseDestaque = "Destaque da cidade no Guia Guapimirim";

        return {
            title: `${data.nome} | Guia Guapimirim`,
            description: fraseDestaque,
            openGraph: {
                title: data.nome,
                description: fraseDestaque,
                images: [formatarUrlImagem(data.foto)],
                type: "website",
            },
        };
    } catch (error) {
        return {
            title: "Página não encontrada | Guia Guapimirim",
        };
    }
}

// O componente do servidor que passa os dados para o visual
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    // AQUI TAMBÉM: "await" obrigatório
    const { slug } = await params;
    let estabelecimento = null;

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/estabelecimento/${slug}/`, { cache: 'no-store' });
        if (res.ok) {
            estabelecimento = await res.json();
        }
    } catch (error) {
        console.error("Erro na comunicação com o banco:", error);
    }

    // Chama o visual e entrega os dados prontos
    return <PremiumPageClient estabelecimento={estabelecimento} slug={slug} />;
}