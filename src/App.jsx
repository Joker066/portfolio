import React, { useMemo, useState } from "react";
import {
  Mail,
  Github,
  Globe,
  ExternalLink,
  Code2,
  Cpu,
  Rocket,
  Award,
  Layers,
  Languages,
} from "lucide-react";

/**
 * DISTINCT PORTFOLIO LAYOUT (dark, showcase-style) with i18n toggle (EN/PL)
 * Fixes:
 * - Replaced non-ASCII non-breaking hyphen (\u2011) with regular hyphen (-) everywhere (e.g., "Peng-Yin", "Web-Chess").
 * - Fixed header/section structure (closed <header>, moved sections outside) to avoid JSX nesting issues.
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
    sections: { projects: "Projects", awards: "Awards" },
    categories: {
      Systems: "Systems",
      "AI/ML": "AI/ML",
      "Web/Deploy": "Web/Deploy",
      "Algorithms/Math": "Algorithms/Math",
    },
  },
  pl: {
    title: "Systemy • SI/ML • Web/Wdrożenia",
    filters: { all: "Wszystko" },
    sections: { projects: "Projekty", awards: "Nagrody" },
    categories: {
      Systems: "Systemy",
      "AI/ML": "SI/ML",
      "Web/Deploy": "Web/Wdrożenia",
      "Algorithms/Math": "Algorytmy/Matematyka",
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

// ---- Content with per-language strings ----
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
    stack: ["Unity", "C#", "Git"],
    link: "https://github.com/Joker066/ROM",
    demo: "https://youtu.be/GXqoc0RkPAU?si=S4FxBDKpkf-58LZT",
    category: ["Systems"],
    cover: "/covers/rom.png",
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
    link: "https://github.com/Joker066/ds", // replace if different
    demo: "",
    category: ["Systems", "Algorithms/Math"],
    cover: "/covers/c-ds.png" // optional; remove if you don't have one yet
  },
];

const AWARDS = [
  {
    i18n: {
      en: {
        title: "Best Technical Award — Taiwan College Game Design Competition 2024",
        bullets: [
          "Recognized for the programming and technical implementation of R.O.M.",
        ],
      },
      pl: {
        title: "Best Technical Award — Taiwan College Game Design Competition 2024",
        bullets: [
          "Wyróżnienie za programistyczne i techniczne opracowanie projektu R.O.M.",
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
    <section className="break-inside-avoid">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-[16px] font-semibold tracking-tight text-slate-100">{title}</h2>
        {right || null}
      </div>
      <div>{children}</div>
    </section>
  );
}

function ProjectCard({ p, lang }) {
  const { title, summary } = p.i18n[lang] || p.i18n.en;
  return (
    <div className={`overflow-hidden rounded-2xl ${THEME.ring}`}>
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900">
        {p.cover ? (
          <img
            src={p.cover}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        {!p.cover ? (
          <div className="absolute inset-0 grid place-items-center text-slate-500">
            <Layers className="w-8 h-8 mb-2" />
            <span className="text-xs">No cover</span>
          </div>
        ) : null}
      </div>
      {/* Body */}
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
        <div className="mt-3 flex items-center gap-4 flex-wrap">
          {p.link ? (
            <a href={p.link} target="_blank" rel="noreferrer" className={THEME.link}>
              <ExternalLink className="inline-block w-3.5 h-3.5 -mt-0.5" /> Repo
            </a>
          ) : null}
          {p.demo ? (
            <a href={p.demo} target="_blank" rel="noreferrer" className={THEME.link}>
              <ExternalLink className="inline-block w-3.5 h-3.5 -mt-0.5" /> Demo
            </a>
          ) : null}
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
    <div className={`w-full min-h-screen ${THEME.bg} ${THEME.text} p-6 md:p-10 print:p-0`}>
      <div className="max-w-6xl mx-auto">
        { /* Top bar with language toggle */ }
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

        { /* Hero */ }
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
        <Section title={t.sections.projects} right={<span className={`text-[12px] ${THEME.subtext}`}>{filtered.length} / {PROJECTS.length}</span>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard key={i} p={p} lang={lang} />
            ))}
          </div>
        </Section>

        {/* Awards */}
        <Section title={t.sections.awards}>
          <ul className="list-disc ml-5 text-[14px]">
            {AWARDS.map((a, i) => {
              const item = a.i18n[lang] || a.i18n.en;
              return (
                <li key={i} className="mb-2">
                  <div className="font-medium text-slate-100">{item.title}</div>
                  {item.bullets && item.bullets.length ? (
                    <ul className={`list-disc ml-5 text-[13px] ${THEME.subtext}`}>
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Section>

        <footer className={`mt-12 pt-6 border-t ${THEME.divider} ${THEME.subtext}`}>
          <div className="text-[12px]">© {new Date().getFullYear()} Peng-Yin Chen. Built with React & Tailwind.</div>
        </footer>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .shadow, .shadow-sm, .shadow-md, .shadow-lg { box-shadow: none !important; }
          .rounded-2xl { border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
