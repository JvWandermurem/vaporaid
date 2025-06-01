"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Recycle,
  HeartPulse,
  Leaf,
  Users,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Clock,
  ChevronDown,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ContactModal } from "../components/contact-modal";

const initialCollectionPoints = [
  {
    id: 2,
    name: "UBS Vila Mariana SP",
    address: "Rua das Acácias, 500, Vila Mariana",
    hours: "Seg-Sex: 07:00 - 19:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "São Paulo",
    neighborhood: "Vila Mariana",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20das%20Ac%C3%A1cias%2C%20500%2C%20Vila%20Mariana%2C%20S%C3%A3o%20Paulo%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 3,
    name: "Posto de Saúde Itaquera Leste",
    address: "Av. Jacu Pêssego, 2500, Itaquera",
    hours: "Seg-Sex: 08:00 - 18:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "São Paulo",
    neighborhood: "Itaquera",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Jacu%20P%C3%AAssego%2C%202500%2C%20Itaquera%2C%20S%C3%A3o%20Paulo%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 4,
    name: "Prefeitura Pinheiros SP",
    address: "Av. Faria Lima, 456",
    hours: "Seg-Sex: 09:00 - 18:00",
    icon: <Users className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "São Paulo",
    neighborhood: "Pinheiros",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Faria%20Lima%2C%20456%2C%20Pinheiros%2C%20S%C3%A3o%20Paulo%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 5,
    name: "Posto Saúde Guanabara Campinas",
    address: "Rua Mário Siqueira, 789, Guanabara",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "Campinas",
    neighborhood: "Guanabara",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20M%C3%A1rio%20Siqueira%2C%20789%2C%20Guanabara%2C%20Campinas%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 6,
    name: "UBS Central Guarulhos",
    address: "Praça Getúlio Vargas, 100, Centro",
    hours: "Seg-Sáb: 07:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "Guarulhos",
    neighborhood: "Centro",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Pra%C3%A7a%20Get%C3%BAlio%20Vargas%2C%20100%2C%20Centro%2C%20Guarulhos%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 7,
    name: "Eco Ponto Lapa SP",
    address: "Rua da Lapa, 100",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <Recycle className="h-6 w-6 text-[#3f8ec9]" />,
    state: "SP",
    city: "São Paulo",
    neighborhood: "Lapa",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20da%20Lapa%2C%20100%2C%20Lapa%2C%20S%C3%A3o%20Paulo%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },

  // Rio de Janeiro (RJ)
  {
    id: 8,
    name: "Posto Saúde Central RJ",
    address: "Rua da Praia, 123",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "RJ",
    city: "Rio de Janeiro",
    neighborhood: "Centro",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20da%20Praia%2C%20123%2C%20Centro%2C%20Rio%20de%20Janeiro%2C%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 9,
    name: "Clínica da Família Copacabana",
    address: "Av. Nossa Sra. de Copacabana, 500",
    hours: "Seg-Sex: 08:00 - 20:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "RJ",
    city: "Rio de Janeiro",
    neighborhood: "Copacabana",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Nossa%20Sra.%20de%20Copacabana%2C%20500%2C%20Copacabana%2C%20Rio%20de%20Janeiro%2C%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 10,
    name: "UBS Tijuca Maracanã",
    address: "Rua São Francisco Xavier, 300, Tijuca",
    hours: "Seg-Sex: 07:30 - 18:30",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "RJ",
    city: "Rio de Janeiro",
    neighborhood: "Tijuca",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20S%C3%A3o%20Francisco%20Xavier%2C%20300%2C%20Tijuca%2C%20Rio%20de%20Janeiro%2C%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 11,
    name: "Eco Ponto Zona Portuária RJ",
    address: "Av. Rodrigues Alves, 303",
    hours: "Seg-Sex: 09:00 - 17:00",
    icon: <Recycle className="h-6 w-6 text-[#3f8ec9]" />,
    state: "RJ",
    city: "Rio de Janeiro",
    neighborhood: "Gamboa",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Rodrigues%20Alves%2C%20303%2C%20Gamboa%2C%20Rio%20de%20Janeiro%2C%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 12,
    name: "Posto de Saúde Icaraí Niterói",
    address: "Rua Álvares de Azevedo, 150, Icaraí",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "RJ",
    city: "Niterói",
    neighborhood: "Icaraí",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20%C3%81lvares%20de%20Azevedo%2C%20150%2C%20Icara%C3%AD%2C%20Niter%C3%B3i%2C%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },

  // Minas Gerais (MG)
  {
    id: 13,
    name: "Centro de Saúde Lourdes BH",
    address: "Rua Rio de Janeiro, 1500, Lourdes",
    hours: "Seg-Sex: 07:00 - 19:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Belo Horizonte",
    neighborhood: "Lourdes",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20Rio%20de%20Janeiro%2C%201500%2C%20Lourdes%2C%20Belo%20Horizonte%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 14,
    name: "UBS Savassi Flores",
    address: "Rua Tomé de Souza, 800, Savassi",
    hours: "Seg-Sex: 08:00 - 18:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20Tom%C3%A9%20de%20Souza%2C%20800%2C%20Savassi%2C%20Belo%20Horizonte%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 15,
    name: "Posto de Saúde Pampulha",
    address: "Av. Fleming, 200, Pampulha",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Belo Horizonte",
    neighborhood: "Pampulha",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Fleming%2C%20200%2C%20Pampulha%2C%20Belo%20Horizonte%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 16,
    name: "Horta Comunitária Centro BH",
    address: "Rua Bahia, 1000, fundos",
    hours: "Ter-Dom: 09:00 - 16:00",
    icon: <Leaf className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Belo Horizonte",
    neighborhood: "Centro",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20Bahia%2C%201000%2C%20fundos%2C%20Centro%2C%20Belo%20Horizonte%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 17,
    name: "UBS Central Contagem",
    address: "Av. João César de Oliveira, 500, Centro",
    hours: "Seg-Sex: 07:30 - 17:30",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Contagem",
    neighborhood: "Centro",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Av.%20Jo%C3%A3o%20C%C3%A9sar%20de%20Oliveira%2C%20500%2C%20Centro%2C%20Contagem%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 18,
    name: "Posto Saúde Santa Efigênia Uberlândia",
    address: "Rua da Carioca, 123, Santa Efigênia",
    hours: "Seg-Sex: 08:00 - 17:00",
    icon: <HeartPulse className="h-6 w-6 text-[#3f8ec9]" />,
    state: "MG",
    city: "Uberlândia",
    neighborhood: "Santa Efigênia",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Rua%20da%20Carioca%2C%20123%2C%20Santa%20Efig%C3%AAnia%2C%20Uberl%C3%A2ndia%2C%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
];

const missionVisionValuesData = [
  {
    title: "Nossa Missão",
    icon: <Recycle className="h-10 w-10 text-[#3f8ec9] mb-3" />,
    content:
      "Ressignificar resíduos eletrônicos em soluções inovadoras para a saúde pública e o meio ambiente, combatendo arboviroses de forma acessível e sustentável através do dispositivo Vaporaid.",
  },
  {
    title: "Nossa Visão",
    icon: <Lightbulb className="h-10 w-10 text-[#3f8ec9] mb-3" />,
    content:
      "Ser referência em inovação social e economia circular, inspirando a colaboração entre setor público, privado e comunidade para transformar desafios complexos em bem-estar coletivo e um futuro mais saudável.",
  },
  {
    title: "Nossos Valores",
    icon: <HeartPulse className="h-10 w-10 text-[#3f8ec9] mb-3" />,
    content: (
      <ul className="list-disc list-inside space-y-1 text-left text-sm sm:text-base">
        {" "}
        <li>
          <strong>Sustentabilidade:</strong> Compromisso com o planeta e o uso
          consciente de recursos.
        </li>{" "}
        <li>
          <strong>Inovação:</strong> Busca contínua por soluções criativas e
          eficazes.
        </li>{" "}
        <li>
          <strong>Impacto Social:</strong> Foco em gerar benefícios tangíveis
          para a comunidade.
        </li>{" "}
        <li>
          <strong>Colaboração:</strong> Crença no poder da união para alcançar
          grandes objetivos.
        </li>{" "}
        <li>
          <strong>Transparência:</strong> Clareza em nossas ações e comunicação
          com a sociedade.
        </li>{" "}
      </ul>
    ),
  },
];

const ITEMS_PER_COLLECTION_SLIDE = 3;

export default function VaporaidLandingPage() {
  const [currentMVVSlide, setCurrentMVVSlide] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const nextMVVSlide = () =>
    setCurrentMVVSlide((prev) =>
      prev === missionVisionValuesData.length - 1 ? 0 : prev + 1
    );
  const prevMVVSlide = () =>
    setCurrentMVVSlide((prev) =>
      prev === 0 ? missionVisionValuesData.length - 1 : prev - 1
    );

  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<
    string | undefined
  >(undefined);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [filteredPoints, setFilteredPoints] = useState(initialCollectionPoints);
  const [currentCollectionStartIndex, setCurrentCollectionStartIndex] =
    useState(0);

  const uniqueStates = useMemo(
    () => [...new Set(initialCollectionPoints.map((p) => p.state))].sort(),
    []
  );
  const availableCities = useMemo(() => {
    if (!selectedState) return [];
    return [
      ...new Set(
        initialCollectionPoints
          .filter((p) => p.state === selectedState)
          .map((p) => p.city)
      ),
    ].sort();
  }, [selectedState]);
  const availableNeighborhoods = useMemo(() => {
    if (!selectedCity) return [];
    return [
      ...new Set(
        initialCollectionPoints
          .filter((p) => p.state === selectedState && p.city === selectedCity)
          .map((p) => p.neighborhood)
      ),
    ].sort();
  }, [selectedState, selectedCity]);

  useEffect(() => {
    let points = initialCollectionPoints;
    if (selectedState) points = points.filter((p) => p.state === selectedState);
    if (selectedCity) points = points.filter((p) => p.city === selectedCity);
    if (selectedNeighborhood)
      points = points.filter((p) => p.neighborhood === selectedNeighborhood);
    setFilteredPoints(points);
    setCurrentCollectionStartIndex(0);
  }, [selectedState, selectedCity, selectedNeighborhood]);

  const nextCollectionSlide = () => {
    setCurrentCollectionStartIndex((prev) => {
      const nextIndex = prev + ITEMS_PER_COLLECTION_SLIDE;
      return nextIndex >= filteredPoints.length ? 0 : nextIndex;
    });
  };
  const prevCollectionSlide = () => {
    setCurrentCollectionStartIndex((prev) => {
      const prevIndex = prev - ITEMS_PER_COLLECTION_SLIDE;
      if (prevIndex < 0) {
        // Go to the start of the last page
        return (
          Math.floor((filteredPoints.length - 1) / ITEMS_PER_COLLECTION_SLIDE) *
          ITEMS_PER_COLLECTION_SLIDE
        );
      }
      return prevIndex;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Mostra o conteúdo quando rolar mais de 50% da altura da tela
      if (scrollY > windowHeight * 0.5) {
        setShowContent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStateChange = (value: string) => {
    setSelectedState(value === "all" ? undefined : value);
    setSelectedCity(undefined);
    setSelectedNeighborhood(undefined);
  };
  const handleCityChange = (value: string) => {
    setSelectedCity(value === "all" ? undefined : value);
    setSelectedNeighborhood(undefined);
  };
  const handleNeighborhoodChange = (value: string) => {
    setSelectedNeighborhood(value === "all" ? undefined : value);
  };

  const collectionPointsToShow = useMemo(() => {
    return filteredPoints.slice(
      currentCollectionStartIndex,
      currentCollectionStartIndex + ITEMS_PER_COLLECTION_SLIDE
    );
  }, [filteredPoints, currentCollectionStartIndex]);

  const scrollToContent = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf2] text-[#0f1f2a]">
      <header className="sticky top-0 z-50 w-full bg-[#fffaf2] shadow-md border-b border-[#dfdad3]">
        <div className="container mx-auto flex items-center p-4">
          <Link href="#" className="flex items-center">
            <Image
              src="/vape_logo.png"
              alt=""
              width={40}
              height={40}
              className=""
            />{" "}
            <span className="text-2xl font-bold text-[#b13537]">Vaporaid</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-auto">
            <Link
              href="#sobre"
              className="text-[#8d8c8c] hover:text-[#3f8ec9] transition-colors"
            >
              Sobre o Projeto
            </Link>
            <Link
              href="#coleta"
              className="text-[#8d8c8c] hover:text-[#3f8ec9] font-semibold transition-colors"
            >
              Pontos de Coleta
            </Link>
            <Link
              href="#nossos-pilares"
              className="text-[#8d8c8c] hover:text-[#3f8ec9] transition-colors"
            >
              Nossos Pilares
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full h-screen text-[#fffaf2] overflow-hidden flex items-center justify-center">
          {/* Imagem de fundo com opacidade */}
          <img
            src="/fundo.png"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          {/* Camada azul escura com transparência */}
          <div className="absolute inset-0 bg-[#0F1F2A]/85" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-around flex-col md:flex-row items-center">
              <div className="w-full md:w-3/5 mb-10 md:mb-0 -mt-12">
                <div className="justify-start">
                  <span className="text-white text-[12rem] leading-none font-chunk font-extrabold">
                    Vapor
                  </span>
                  <span className="text-[#d13537] text-[12rem] leading-none font-chunk font-extrabold">
                    aid
                  </span>
                </div>

                <p className="text-3xl md:text-4xl lg:text-5xl mb-10 pt-6">
                  Vapor que{" "}
                  <span className="bg-[#d13537] px-2 py-1 rounded-md text-white">
                    protege.
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={scrollToContent}
                    size="lg"
                    className="bg-[#3f8ec9] text-[#fffaf2] font-semibold border-[#3f8ec9] hover:bg-[#2d7bb8] hover:border-[#2d7bb8] transition-colors flex items-center gap-4 px-6 py-8 rounded-md text-lg md:text-xl text-left leading-tight"
                  >
                    <PackageOpen className="w-48 h-48 shrink-0" />
                    <span>Quero ver pontos de distribuição</span>
                  </Button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Image src="/vape.png" alt="" width={500} height={500} />
              </div>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={scrollToContent}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Rolar para baixo"
            >
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
        </section>

        {/* Resto do conteúdo - Aparece com scroll */}
        <div
          className={`transform transition-all duration-1000 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          <section id="sobre" className="py-16 px-4 bg-[#fffaf2]">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center gap-4">
                  <Image
                    src="mosquito.png"
                    alt="Mosquito"
                    width={70}
                    height={70}
                  />
                  <h2 className="text-3xl font-bold text-[#0f1f2a]">
                    O Desafio e a Solução Vaporaid
                  </h2>

                  <Image src="vape.png" alt="Mosquito" width={30} height={30} />
                </div>
                <p className="text-[#8d8c8c] max-w-2xl mx-auto">
                  Enfrentamos dois grandes problemas: o descarte inadequado de
                  cigarros eletrônicos e a persistência de doenças transmitidas
                  por mosquitos. O Vaporaid surge como uma resposta inovadora.
                </p>
              </div>
              

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="exemplo.png"
                    alt="Ilustração do problema: vapes descartados e mosquito"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg mx-auto border border-[#dfdad3]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#0f1f2a] mb-3">
                    Nossa Proposta: Ressignificar para Proteger
                  </h3>
                  <p className="text-[#8d8c8c] mb-4">
                    O Vaporaid é um dispositivo vaporizador de repelente
                    líquido, desenvolvido a partir da reutilização de
                    componentes de cigarros eletrônicos (vapes/pods) apreendidos
                    e doados.
                  </p>
                  <ul className="space-y-2 text-[#8d8c8c]">
                    <li className="flex items-start">
                      <Recycle className="h-5 w-5 text-[#3f8ec9] mr-2 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-[#0f1f2a]">
                          Componentes Reutilizados:
                        </strong>{" "}
                        Baterias e atomizadores.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="h-5 w-5 text-[#3f8ec9] mr-2 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-[#0f1f2a]">
                          Funcionamento Simples:
                        </strong>{" "}
                        Um interruptor ativa a vaporização do repelente,
                        protegendo o ambiente.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <PackageOpen className="h-5 w-5 text-[#3f8ec9] mr-2 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-[#0f1f2a]">
                          Distribuição Gratuita:
                        </strong>{" "}
                        Dispositivo distribuído em postos de saúde e
                        prefeituras.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Seção de Pontos de Coleta */}
          <section id="coleta" className="relative py-16 px-4 overflow-hidden">
            {/* Imagem de fundo */}
            <img
              src="fundo_bonitinho.png"
              alt="Pontos de coleta"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Camada azul clara com baixa opacidade */}
            <div className="absolute inset-0 bg-[#0F1F2A]/85" />

            {/* Conteúdo */}
            <div className="relative z-10 container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Pontos de Coleta
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto">
                  Encontre o ponto de coleta mais próximo de você e contribua
                  para um futuro mais sustentável.
                </p>
              </div>

              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
                <Select onValueChange={handleStateChange}>
                  <SelectTrigger className="w-full md:w-1/3 bg-[#fffaf2] border-[#bab9b9] text-[#0f1f2a]">
                    <SelectValue placeholder="Selecione o Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fffaf2] border-[#bab9b9]">
                    <SelectItem value="all">Todos os Estados</SelectItem>
                    {uniqueStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={handleCityChange}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full md:w-1/3 bg-[#fffaf2] border-[#bab9b9] text-[#0f1f2a] disabled:opacity-50">
                    <SelectValue placeholder="Selecione a Cidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fffaf2] border-[#bab9b9]">
                    <SelectItem value="all">Todas as Cidades</SelectItem>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={handleNeighborhoodChange}
                  disabled={!selectedCity}
                >
                  <SelectTrigger className="w-full md:w-1/3 bg-[#fffaf2] border-[#bab9b9] text-[#0f1f2a] disabled:opacity-50">
                    <SelectValue placeholder="Selecione o Bairro" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fffaf2] border-[#bab9b9]">
                    <SelectItem value="all">Todos os Bairros</SelectItem>
                    {availableNeighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cards dos Pontos de Coleta */}
              <div className="relative">
                {filteredPoints.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {collectionPointsToShow.map((point) => (
                        <Card
                          key={point.id}
                          className="h-100 flex flex-col shadow-lg hover:shadow-xl transition-shadow bg-[#fffaf2] border-[#bab9b9]"
                        >
                          <CardHeader className="flex-shrink-0 pb-3">
                            <div className="flex items-center gap-3 mb-2">
                              {point.icon}
                              <CardTitle className="text-lg text-[#0f1f2a] line-clamp-2">
                                {point.name}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-between pt-0">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-[#8d8c8c] mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-[#8d8c8c] line-clamp-2">
                                  {point.address}
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="h-4 w-4 text-[#8d8c8c] mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-[#8d8c8c]">
                                  {point.hours}
                                </p>
                              </div>
                            </div>
                            <div className="aspect-video w-full rounded-md overflow-hidden mt-auto border border-[#bab9b9]">
                              <iframe
                                className="my-3 rounded-md"
                                src={point.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Mapa para ${point.name}`}
                              ></iframe>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Navegação do Carrossel */}
                    {filteredPoints.length > ITEMS_PER_COLLECTION_SLIDE && (
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={prevCollectionSlide}
                          className="rounded-full bg-[#fffaf2] border-[#bab9b9] text-[#0f1f2a] hover:bg-[#dfdad3]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-[#8d8c8c]">
                          {Math.floor(
                            currentCollectionStartIndex /
                              ITEMS_PER_COLLECTION_SLIDE
                          ) + 1}{" "}
                          de{" "}
                          {Math.ceil(
                            filteredPoints.length / ITEMS_PER_COLLECTION_SLIDE
                          )}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={nextCollectionSlide}
                          className="rounded-full bg-[#fffaf2] border-[#bab9b9] text-[#0f1f2a] hover:bg-[#dfdad3]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-[#8d8c8c] text-lg">
                      Nenhum ponto de coleta encontrado com os filtros
                      selecionados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Ciclo de Vida e Sustentabilidade */}
          <section className="relative py-16 px-4">
            {/* Imagem de fundo */}
            <img
              src="fundo2.png"
              alt="Fundo Ciclo de Vida"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="container mx-auto relative z-10">
              {/* Mosquito à esquerda */}

              {/* Texto centralizado */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-[#0f1f2a] mb-2">
                  Ciclo de Vida Sustentável
                </h2>
                <p className="text-[#4b4b4b]">
                  O Vaporaid é pensado para um ciclo completo, da produção ao
                  descarte consciente e recondicionamento.
                </p>
              </div>

              {/* Container principal com as duas divs lado a lado */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Div dos Cards */}
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 gap-8">
                    <Card className="bg-[#fffaf2] border-[#dfdad3]">
                      <CardHeader>
                        <CardTitle className="text-[#0f1f2a]">
                          1. Coleta e Doação
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#8d8c8c]">
                          Vapes e pods são coletados em pontos específicos,
                          doados pela população e parceiros.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#fffaf2] border-[#dfdad3]">
                      <CardHeader>
                        <CardTitle className="text-[#0f1f2a]">
                          2. Transformação
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#8d8c8c]">
                          Componentes são testados, adaptados e montados no
                          dispositivo Vaporaid com repelente.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#fffaf2] border-[#dfdad3]">
                      <CardHeader>
                        <CardTitle className="text-[#0f1f2a]">
                          3. Proteção em Ação
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#8d8c8c]">
                          O Vaporaid é utilizado pela comunidade para dispersar
                          o repelente, protegendo os lares contra o mosquito
                          transmissor.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Div da Imagem */}
                <div className="text-center">
                  <Image
                    src="/reciclagem.jpeg"
                    alt="Diagrama do ciclo de vida do Vaporaid"
                    width={600}
                    height={300}
                    className="rounded-lg shadow-lg mx-auto border border-[#dfdad3]"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="nossos-pilares" className="py-16 px-4 bg-[#fffaf2]">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0f1f2a] mb-4">
                  Nossos Pilares
                </h2>
                <p className="text-[#8d8c8c] max-w-2xl mx-auto">
                  Conheça a Missão, Visão e Valores que guiam o Projeto Vaporaid
                  na busca por um futuro mais saudável e sustentável.
                </p>
              </div>

              {/* Grid de cartões lado a lado */}
              <div className="grid gap-8 md:grid-cols-3">
                {missionVisionValuesData.map((item) => (
                  <Card
                    key={item.title}
                    className="min-h-[320px] flex flex-col justify-start items-center text-center p-6 md:p-8 bg-[#fffaf2] border-[#dfdad3]"
                  >
                    <CardHeader className="flex flex-col items-center mb-4">
                      {item.icon}
                      <CardTitle className="text-2xl text-[#0f1f2a] mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#8d8c8c] text-sm sm:text-base">
                      {typeof item.content === "string" ? (
                        <p>{item.content}</p>
                      ) : (
                        item.content
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 bg-[#3f8ec9] text-[#fffaf2]">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Junte-se à Revolução Vaporaid!
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Sua pequena ação de doar um vape pode ter um grande impacto na
                saúde da sua comunidade e na preservação do meio ambiente.
              </p>
              <Link href="#coleta">
                <Button
                  size="lg"
                  className="bg-[#fffaf2] text-[#3f8ec9] hover:bg-[#dfdad3] border-[#fffaf2] hover:border-[#dfdad3] transition-colors"
                >
                  Encontrar Ponto de Coleta Agora
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#0f1f2a] text-[#bab9b9] py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Image
                src="/vape_logo.png"
                alt=""
                width={40}
                height={40}
                className=""
              />{" "}
              <span className="text-xl font-bold text-[#fffaf2]">Vaporaid</span>
            </Link>
            <p className="text-sm">Transformando resíduos em bem-estar.</p>
          </div>
          <div className="flex justify-center gap-6 mb-4">
            <Link
              href="#sobre"
              className="hover:text-[#3f8ec9] transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="#coleta"
              className="hover:text-[#3f8ec9] transition-colors"
            >
              Coleta
            </Link>
            <Link
              href="#nossos-pilares"
              className="hover:text-[#3f8ec9] transition-colors"
            >
              Nossos Pilares
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setContactModalOpen(true);
              }}
              className="hover:text-[#3f8ec9] transition-colors"
            >
              Contato
            </Link>
          </div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Projeto Vaporaid. Todos os
            direitos reservados.
          </p>
        </div>
      </footer>
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </div>
  );
}
