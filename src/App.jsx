import React, { useMemo, useState } from "react";
import {
  Mail,
  Github,
  Globe,
  ExternalLink,
  Code2,
  Cpu,
  Rocket,
  Layers,
  Languages,
} from "lucide-react";

/**
 * Portfolio (dark, showcase-style) with i18n toggle (EN/PL)
 * - Removed all print-related CSS/logic (this page is not for printing)
 * - Hover/tap reveals an expanding Details panel (no inner scrolling)
 * - On large screens: card widens on hover to reduce scrolling need
 */

// ---- Theme (dark) ----
const THEME = {
  bg: "bg-[#0b1220]",
  panel: "bg-[#0f172a]",
  text: "text-slate-100",
  subtext: "text-slate-400",
  accent: "text-cyan-400",
  chip: "bg-[#0b1220] text-slate-200 border border-slate-700",
  ring: "ring-1 ring-slate-800",
  link: "text-cyan-300 hover:text-cyan-200 underline",
  divider: "border-slate-800",
};

// ---- Base profile (language-agnostic) ----
const CONTACT = {
  name: "Peng-Yin Chen (陳鵬尹)",
  email: "alexdad063@gmail.com",
  github: "https://github.com/Joker066",
  website: "",
  photo: "/headshot.png", // place in public/
};

// ---- i18n dictionaries ----
const I18N = {
  en: {
    title: "Systems • AI/ML • Web/Deploy",
    filters: { all: "All" },
    sections: { projects: "Projects" },
    categories: {
      Systems: "Systems",
      "AI/ML": "AI/ML",
      "Web/Deploy": "Web/Deploy",
      "Algorithms/Math": "Algorithms/Math",
    },
    detailsLabels: {
      goal: "Goal",
      role: "Role",
      decisions: "Key decisions",
      outcome: "Outcome",
      close: "Close",
    },
  },
  pl: {
    title: "Systemy • SI/ML • Web/Wdrożenia",
    filters: { all: "Wszystko" },
    sections: { projects: "Projekty" },
    categories: {
      Systems: "Systemy",
      "AI/ML": "SI/ML",
      "Web/Deploy": "Web/Wdrożenia",
      "Algorithms/Math": "Algorytmy/Matematyka",
    },
    detailsLabels: {
      goal: "Cel",
      role: "Rola",
      decisions: "Kluczowe decyzje",
      outcome: "Wynik",
      details: "Szczegóły",
      close: "Zamknij",
    },
  },
};

// ---- Categories (keys are stable; labels are localized via I18N) ----
const CATEGORIES = [
  { key: "Systems", icon: Cpu },
  { key: "AI/ML", icon: Rocket },
  { key: "Web/Deploy", icon: Globe },
  { key: "Algorithms/Math", icon: Code2 },
];

// ---- Content with per-language strings + details ----
const PROJECTS = [
  {
    i18n: {
      en: {
        title: "Polish Learning Tool (PLT)",
        summary:
          "Flask app for Polish vocabulary practice with approval-gated data, 20Q practice engine, and a lightweight POS classifier.",
      },
      pl: {
        title: "Polish Learning Tool (PLT)",
        summary:
          "Aplikacja Flask do nauki polskiego z potokiem akceptacji danych, silnikiem ćwiczeń 20 pytań i lekkim klasyfikatorem POS.",
      },
    },
    stack: ["Python", "Flask", "SQLite", "Docker", "Nginx", "NumPy"],
    link: "https://github.com/Joker066/Polish-learning-tool",
    demo: "",
    category: ["Web/Deploy", "AI/ML"],
    cover: "/covers/plt.png",
    details: {
      en: {
        goal: [
          "Build a vocabulary trainer with admin-approved data.",
          "Keep setup and deployment simple.",
          "Design a question-selection mechanism that strengthens learning.",
        ],
        role: [
          "Sole author/maintainer: Flask backend and lightweight UI; deployment with Docker + Nginx; storage with SQLite.",
        ],
        decisions: [
          "Approval pipeline for entries (review → approve → publish).",
          "“20 Questions” practice engine to drive active recall.",
          "Lightweight POS classifier (avoids heavy NLP stack, but works well in most cases).",
        ],
        outcome: [
          "Fast local spin-up and low-cost deployment.",
          "Modular design ready for add-ons (new routes, alternative database formats).",
        ],
      },
      pl: {
        goal: [
          "Zbudować trener słownictwa z danymi zatwierdzanymi przez administratora.",
          "Utrzymać prosty proces uruchomienia i wdrożenia.",
          "Zaprojektować mechanizm doboru pytań, który wzmacnia naukę.",
        ],
        role: [
          "Autor i maintainer: backend w Flasku i lekkie UI; wdrożenie Docker + Nginx; baza SQLite.",
        ],
        decisions: [
          "Pipeline akceptacji wpisów (przegląd → akceptacja → publikacja).",
          "Silnik „20 pytań” wspierający aktywne przywoływanie.",
          "Lekki klasyfikator POS (unika ciężkiego NLP, a w większości przypadków sprawdza się dobrze).",
        ],
        outcome: [
          "Szybkie uruchomienie lokalne i niskokosztowe wdrożenie.",
          "Modułowa architektura gotowa na rozszerzenia (nowe trasy, alternatywne formaty baz danych).",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        title: "Web-Chess (engine + trainer)",
        summary:
          "Browser chess engine with alpha-beta, TT heuristics, and a tiny MLP value net (JSON weights) for in-browser eval.",
      },
      pl: {
        title: "Web-Chess (silnik + trener)",
        summary:
          "Silnik szachowy w przeglądarce: alfa–beta, tablice transpozycji, heurystyki; mała sieć MLP (JSON) do oceny w przeglądarce.",
      },
    },
    stack: ["JavaScript", "Alpha–Beta", "Zobrist", "LMR", "PyTorch (train)"],
    link: "https://github.com/Joker066/chess",
    demo: "",
    category: ["Algorithms/Math", "AI/ML"],
    cover: "/covers/chess.png",
    details: {
      en: {
        goal: [
          "Build an in-browser chess engine and trainer that works fully offline.",
          "Make it easy to generate training data and train the value model.",
        ],
        role: [
          "Sole author: search engine and heuristics, trainer UI, and tooling for dataset generation and offline training of a compact value model.",
        ],
        decisions: [
          "Alpha–beta search with a Transposition Table (Zobrist), Late Move Reductions, and iterative deepening.",
          "Compact MLP value network (small footprint, fast inference).",
          "Conservative depth/time caps to keep interaction smooth and predictable.",
        ],
        outcome: [
          "Smooth, backend-free play with low memory usage.",
          "Quick move responses at low/medium depths.",
        ],
      },
      pl: {
        goal: [
          "Zbudować silnik i trener szachowy działające w przeglądarce, w pełni offline.",
          "Ułatwić generowanie danych treningowych i trenowanie modelu wartościującego.",
        ],
        role: [
          "Autor solo: silnik wyszukiwania i heurystyki, UI trenera oraz narzędzia do generowania zbiorów i offline’owego trenowania kompaktowego modelu wartości.",
        ],
        decisions: [
          "Alpha–beta z tablicą transpozycji (Zobrist), Late Move Reductions i iterative deepening.",
          "Kompaktowa sieć MLP do oceny (mały narzut, szybka inferencja).",
          "Konserwatywne limity głębokości/czasu dla płynnej i przewidywalnej interakcji.",
        ],
        outcome: [
          "Płynna rozgrywka bez backendu, niski narzut pamięci.",
          "Szybkie odpowiedzi na niskich/średnich głębokościach.",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        title: "Sound of Water (p5.js)",
        summary:
          "Audiovisual piece mapping the character 水 to a note-transition matrix to generate calm textures.",
      },
      pl: {
        title: "Sound of Water (p5.js)",
        summary:
          "Audiowizualny utwór mapujący znak 水 do macierzy przejść między dźwiękami, tworzącej spokojne faktury.",
      },
    },
    stack: ["p5.js", "Creative Coding"],
    link: "",
    demo: "https://editor.p5js.org/Joker066/full/DC-igYdly",
    category: ["Web/Deploy"],
    cover: "/covers/water.png",
    details: {
      en: {
        goal: [
          "Create a browser-based audio-visual piece inspired by the character “水”.",
          "Generate calm, evolving textures using a simple, rule-based system.",
        ],
        role: ["Sole author: concept, audio design, and visual rendering."],
        decisions: [
          "Built a note-transition matrix derived from features of “水” to guide pitch movement.",
        ],
        outcome: ["Zero-install, quick to load, and soothing."],
      },
      pl: {
        goal: [
          "Stworzyć przeglądarkową kompozycję audiowizualną inspirowaną znakiem „水”.",
          "Generować spokojne, ewoluujące faktury w oparciu o prosty, regułowy system.",
        ],
        role: ["Autor solo: koncepcja, projekt dźwięku i warstwa wizualna."],
        decisions: [
          "Macierz przejść nut wyprowadzona z cech znaku „水”, która prowadzi ruch wysokości dźwięku.",
        ],
        outcome: ["Zero instalacji, szybkie ładowanie i kojący odbiór."],
      },
    },
  },
  {
    i18n: {
      en: {
        title: "Robot of Memory (R.O.M.)",
        summary:
          "2D platformer; gameplay/physics and a heuristic enemy AI; teamwork with Git workflows.",
      },
      pl: {
        title: "Robot of Memory (R.O.M.)",
        summary:
          "Platformówka 2D; rozgrywka/fizyka oraz heurystyczne AI przeciwnika; praca zespołowa z Git.",
      },
    },
    stack: ["Unity", "C#", "Git", "Awarded"],
    link: "https://github.com/Joker066/ROM",
    demo: "https://youtu.be/GXqoc0RkPAU?si=S4FxBDKpkf-58LZT",
    category: ["Systems"],
    cover: "/covers/rom.png",
    details: {
      en: {
        goal: [
          "Build a 2D platformer with responsive controls, grounded physics, and a distinctive swinging-based movement mechanic.",
          "Ship a stable demo as a small team using a clean Git workflow.",
        ],
        role: [
          "Gameplay & physics programming; designed and implemented heuristic enemy AI; collaboration via branching and PR reviews.",
        ],
        decisions: [
          "Swinging-based traversal integrated into the core movement/collision system for a tight feel.",
          "Enemies driven by lightweight heuristics (distance, line of sight, simple state machine) instead of heavy pathfinding.",
          "Level scripting and prefabs organized for scalable level design and fast iteration.",
        ],
        outcome: [
          "Stable demo builds with playable levels.",
          "Best Technical Award — Taiwan College Game Design Competition 2024.",
        ],
      },
      pl: {
        goal: [
          "Zbudować platformówkę 2D z responsywnym sterowaniem, fizyką i mechaniką ruchu opartą na huśtaniu (swinging).",
          "Dostarczyć stabilne demo w małym zespole, korzystając z czystego workflow Git.",
        ],
        role: [
          "Programowanie rozgrywki i fizyki; projekt i implementacja heurystycznego AI przeciwników; współpraca poprzez branchowanie i przeglądy PR.",
        ],
        decisions: [
          "Integracja mechaniki huśtania z rdzeniem ruchu/kolizji dla „tight feel”.",
          "Przeciwnicy sterowani lekkimi heurystykami (odległość, linia wzroku, prosta maszyna stanów) zamiast ciężkiego pathfindingu.",
          "Skryptowanie poziomów i prefabrykaty uporządkowane pod skalowalny level design i szybką iterację.",
        ],
        outcome: [
          "Stabilne buildy demonstracyjne z grywalnymi poziomami.",
          "Best Technical Award — Taiwan College Game Design Competition 2024.",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        title: "ds — Simple Data Structures in C",
        summary:
          "Usable, vendorable C11 DS set (vector/stack/queue/heap/BST/RB-tree/ordered array/segment tree/XOR list; Big Integer, fraction).",
      },
      pl: {
        title: "ds — proste struktury danych w C",
        summary:
          "Użyteczny, możliwy do włączenia zestaw struktur C11 (wektor/stos/kolejka/kopiec/BST/RB-tree/tablica uporządkowana/drzewo przedziałowe/lista XOR; Big Integer, ułamki).",
      },
    },
    stack: ["C (C11)", "Unity build", "ds_all.c"],
    link: "https://github.com/Joker066/ds",
    demo: "",
    category: ["Systems", "Algorithms/Math"],
    cover: "/covers/c-ds.png",
    details: {
      en: {
        goal: [
          "Provide a vendor-friendly C11 data-structure library with zero external dependencies.",
          "Maintain a consistent, minimal API that’s easy to drop into existing builds.",
        ],
        role: [
          "Library author: API design, C implementations, examples/documentation, and build layout.",
        ],
        decisions: [
          "Unity build with an aggregator file (ds_all.c) for quick inclusion.",
          "Coverage: vector, stack, queue, binary heap, BST, RB-tree, ordered array, segment tree, XOR list, Big Integer, fraction.",
          "C11-only, portable across common compilers (GCC/Clang/MSVC).",
        ],
        outcome: [
          "Fast drop-in integration with low compile overhead.",
          "Good portability across major toolchains (GCC/Clang/MSVC).",
        ],
      },
      pl: {
        goal: [
          "Dostarczyć vendorowalną bibliotekę struktur danych w C11 bez zewnętrznych zależności.",
          "Utrzymać spójne, minimalistyczne API, łatwe do wpięcia w istniejące buildy.",
        ],
        role: [
          "Autor biblioteki: projekt API, implementacje w C, przykłady/dokumentacja, układ builda.",
        ],
        decisions: [
          "Unity build z plikiem agregującym ds_all.c dla szybkiego włączenia.",
          "Zakres: vector, stack, queue, binary heap, BST, RB-tree, ordered array, segment tree, XOR list, Big Integer, fraction.",
          "Tylko C11, przenośna w popularnych kompilatorach (GCC/Clang/MSVC).",
        ],
        outcome: [
          "Szybka integracja „drop-in” z niskim narzutem kompilacji.",
          "Dobra przenośność między toolchainami (GCC/Clang/MSVC).",
        ],
      },
    },
  },
];

// ---- UI primitives ----
function Chip({ children }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] rounded-full ${THEME.chip}`}>{children}</span>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-[12px] transition-colors ${
        active
          ? "bg-cyan-400/10 border-cyan-400/60 text-cyan-200"
          : "bg-transparent border-slate-700 text-slate-300 hover:border-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

function Section({ title, children, right }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-[16px] font-semibold tracking-tight text-slate-100">{title}</h2>
        {right || null}
      </div>
      <div>{children}</div>
    </section>
  );
}

// ---- Project card: hover/tap expands Details (no inner scroll) ----
function ProjectCard({ p, lang }) {
  const [open, setOpen] = React.useState(false);
  const overlayRef = React.useRef(null);

  const { title, summary } = p.i18n[lang] || p.i18n.en;
  const labels = I18N[lang]?.detailsLabels || I18N.en.detailsLabels;
  const D = (p.details && (p.details[lang] || p.details.en)) || null;

  // Close on Esc
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // If pointer leaves the whole wrapper, close unless moving into overlay
  const onWrapperLeave = (e) => {
    const into = e.relatedTarget;
    if (overlayRef.current && into && overlayRef.current.contains(into)) return;
    setOpen(false);
  };

  return (
    <div
      className={`
        relative overflow-visible rounded-2xl
        transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "z-50 shadow-2xl" : "hover:z-20 hover:shadow-2xl"}
      `}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={onWrapperLeave}
      onFocus={() => setOpen(true)}
      tabIndex={0}
    >
      {/* Surface (keeps base rounded clipping) */}
      <div className={`rounded-2xl overflow-hidden ${THEME.ring} bg-slate-900/5`}>
        {/* Cover */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900">
          {p.cover ? (
            <img
              src={p.cover}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-slate-500">
              <Layers className="w-8 h-8 mb-2" />
              <span className="text-xs">No cover</span>
            </div>
          )}
        </div>

        {/* Body (no links here) */}
        <div className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
            <div className="flex gap-1 flex-wrap">
              {p.stack.map((t, i) => (
                <Chip key={i}>{t}</Chip>
              ))}
            </div>
          </div>
          <p className={`mt-2 text-[13px] ${THEME.subtext}`}>{summary}</p>

          {/* Mobile open button (hidden on md+) */}
          {(D || p.link || p.demo) && (
            <button
              onClick={() => setOpen(true)}
              className="mt-3 md:hidden text-xs px-2 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/60"
              aria-expanded={open}
              aria-controls={`details-${title}`}
            >
              More
            </button>
          )}
        </div>
      </div>

      {/* Scrim (click to close) */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Overlay (enlarged; auto-height; text unchanged) */}
      <div
        ref={overlayRef}
        id={`details-${title}`}
        className={`
          absolute left-0 right-0 top-0 z-50 rounded-2xl
          bg-[#0d1730]/95 text-slate-200 ring-1 ring-slate-700/70 shadow-2xl
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? "-left-6 -right-6 -top-8 opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
          max-h-[90vh] overflow-auto
        `}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Optional larger cover */}
        {p.cover && (
          <div className="aspect-[16/9] w-full bg-slate-900">
            <img src={p.cover} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-4 md:p-6">
          {D ? (
            <ul className="space-y-4 text-[13px] leading-relaxed">
              {D.goal?.length > 0 && (
                <li>
                  <div className="font-semibold text-slate-100 mb-1">{labels.goal}</div>
                  <ul className="list-disc ml-5 space-y-1">{D.goal.map((s, i) => <li key={`g${i}`}>{s}</li>)}</ul>
                </li>
              )}
              {D.role?.length > 0 && (
                <li>
                  <div className="font-semibold text-slate-100 mb-1">{labels.role}</div>
                  <ul className="list-disc ml-5 space-y-1">{D.role.map((s, i) => <li key={`r${i}`}>{s}</li>)}</ul>
                </li>
              )}
              {D.decisions?.length > 0 && (
                <li>
                  <div className="font-semibold text-slate-100 mb-1">{labels.decisions}</div>
                  <ul className="list-disc ml-5 space-y-1">{D.decisions.map((s, i) => <li key={`d${i}`}>{s}</li>)}</ul>
                </li>
              )}
              {D.outcome?.length > 0 && (
                <li>
                  <div className="font-semibold text-slate-100 mb-1">{labels.outcome}</div>
                  <ul className="list-disc ml-5 space-y-1">{D.outcome.map((s, i) => <li key={`o${i}`}>{s}</li>)}</ul>
                </li>
              )}
            </ul>
          ) : (
            // Fallback when details are missing
            <div className="text-[13px] leading-relaxed">
              <div className="font-semibold text-slate-100 mb-2">{title}</div>
              <p className="text-slate-300">{summary}</p>
            </div>
          )}

          {(p.link || p.demo) && (
            <div className="mt-4 flex items-center gap-4">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={THEME.link}>
                  <ExternalLink className="inline-block w-3.5 h-3.5 -mt-0.5" /> Repo
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className={THEME.link}>
                  <ExternalLink className="inline-block w-3.5 h-3.5 -mt-0.5" /> Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ---- Page ----
export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lang, setLang] = useState("en"); // "en" | "pl"
  const hasPhoto = useMemo(() => !!CONTACT.photo, []);

  const t = I18N[lang];

  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category?.includes(active));
  }, [active]);

  return (
    <div className={`w-full min-h-screen ${THEME.bg} ${THEME.text} p-6 md:p-10`}>
      <div className="max-w-6xl mx-auto">
        {/* Top bar with language toggle */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full border text-[12px] ${lang === "en" ? "border-cyan-400 text-cyan-200 bg-cyan-400/10" : "border-slate-700 text-slate-300"}`}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pl")}
              className={`px-3 py-1 rounded-full border text-[12px] ${lang === "pl" ? "border-cyan-400 text-cyan-200 bg-cyan-400/10" : "border-slate-700 text-slate-300"}`}
              aria-pressed={lang === "pl"}
            >
              PL
            </button>
          </div>
        </div>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-slate-800 bg-slate-900 shrink-0">
                {hasPhoto ? (
                  <img src={CONTACT.photo} alt={CONTACT.name} className="w-full h-full object-cover object-center" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-slate-500">No Photo</div>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-100">{CONTACT.name}</h1>
                <p className={`mt-1 text-sm md:text-base ${THEME.subtext}`}>{t.title}</p>
                <div className="mt-2 text-sm flex flex-wrap items-center gap-x-5 gap-y-2">
                  {CONTACT.email && (
                    <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 hover:underline">
                      <Mail className="w-4 h-4" /> {CONTACT.email}
                    </a>
                  )}
                  {CONTACT.github && (
                    <a href={CONTACT.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}
                  {CONTACT.website && (
                    <a href={CONTACT.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <Globe className="w-4 h-4" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <FilterChip active={active === "All"} onClick={() => setActive("All")}>
            {t.filters.all}
          </FilterChip>
          {CATEGORIES.map(({ key }) => (
            <FilterChip key={key} active={active === key} onClick={() => setActive(key)}>
              {t.categories[key] || key}
            </FilterChip>
          ))}
        </div>

        {/* Projects */}
        <Section
          title={t.sections.projects}
          right={<span className={`text-[12px] ${THEME.subtext}`}>{filtered.length} / {PROJECTS.length}</span>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6">
            {filtered.map((p, i) => (
              <ProjectCard key={i} p={p} lang={lang} />
            ))}
          </div>
        </Section>

        <footer className={`mt-12 pt-6 border-t ${THEME.divider} ${THEME.subtext}`}>
          <div className="text-[12px]">© {new Date().getFullYear()} Peng-Yin Chen. Built with React & Tailwind.</div>
        </footer>
      </div>
    </div>
  );
}
