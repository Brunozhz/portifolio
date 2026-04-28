export const languageOptions = [
  { code: "en", short: "EN", label: "English" },
  { code: "de", short: "DE", label: "Deutsch" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "it", short: "IT", label: "Italiano" },
  { code: "pt", short: "PT", label: "Português" }
];

const contactActions = {
  whatsapp: { href: "https://wa.me/5500000000000", type: "whatsapp", external: true },
  email: { href: "mailto:hello@brunoelias.dev", type: "email" },
  cv: { href: "/Bruno-Elias-CV.pdf", type: "download" },
  linkedin: { href: "https://www.linkedin.com/", type: "linkedin", external: true }
};

const navHrefs = ["#about", "#services", "#process", "#technologies", "#contact"];
const serviceIcons = ["mouse", "screen", "pipeline", "workflow", "bot", "webhook", "database", "blocks"];

function buildContent(copy) {
  return {
    header: {
      logo: "Bruno Elias",
      contact: copy.header.contact,
      navLinks: copy.header.navLabels.map((label, index) => ({ label, href: navHrefs[index] })),
      aria: copy.header.aria
    },
    hero: {
      name: "Bruno Elias",
      role: copy.hero.role,
      headline: copy.hero.headline,
      subheadline: copy.hero.subheadline,
      badges: copy.hero.badges,
      actions: [
        { label: copy.hero.actions.work, href: "#services", variant: "primary" },
        { label: copy.hero.actions.contact, href: "#contact", variant: "secondary" }
      ],
      floatingSignals: copy.hero.floatingSignals
    },
    about: copy.about,
    services: {
      eyebrow: copy.services.eyebrow,
      title: copy.services.title,
      subtitle: copy.services.subtitle,
      items: copy.services.items.map((item, index) => ({ ...item, icon: serviceIcons[index] }))
    },
    work: {
      eyebrow: copy.work.eyebrow,
      title: copy.work.title,
      subtitle: copy.work.subtitle,
      status: copy.work.status,
      note: copy.work.note,
      focusAreas: copy.work.focusAreas,
      cta: copy.work.cta
    },
    technologies: copy.technologies,
    contact: {
      eyebrow: copy.contact.eyebrow,
      title: copy.contact.title,
      text: copy.contact.text,
      details: copy.contact.details,
      actions: [
        { label: copy.contact.actions.whatsapp, ...contactActions.whatsapp },
        { label: copy.contact.actions.email, ...contactActions.email },
        { label: copy.contact.actions.cv, ...contactActions.cv },
        { label: copy.contact.actions.linkedin, ...contactActions.linkedin }
      ]
    }
  };
}

const copies = {
  en: {
    header: {
      contact: "Contact",
      navLabels: ["About", "Services", "Process", "Technologies", "Contact"],
      aria: {
        home: "Bruno Elias home",
        primary: "Primary navigation",
        mobile: "Mobile navigation",
        open: "Open navigation",
        close: "Close navigation",
        language: "Select language"
      }
    },
    hero: {
      role: "Freelance Technical Builder",
      headline: "I build websites, sales pages, CRM implementations, automations and AI-powered service and SDR agents.",
      subheadline:
        "Brazilian freelancer focused on creating modern digital experiences, implementing CRM workflows and building intelligent systems for businesses and agencies.",
      badges: ["Remote Freelancer", "Based in Brazil", "Available for Projects", "Websites • CRM Implementation • Automation • AI SDR"],
      actions: { work: "View Services", contact: "Contact Me" },
      floatingSignals: ["CRM Setup", "n8n Flow", "API Layer", "AI SDR"]
    },
    about: {
      eyebrow: "Profile",
      title: "About Me",
      paragraphs: [
        "I’m Bruno, a 21-year-old Brazilian freelancer focused on building modern digital solutions.",
        "I work with web design, custom websites, sales pages, CRM implementations, automations, API integrations, AI service and SDR agents, databases and more complex systems involving workflow and data logic.",
        "I’m currently building remote connections with companies abroad, especially in Europe, while learning more about international markets, languages and business culture."
      ],
      highlights: [
        "21 years old",
        "Brazil-based",
        "Remote work",
        "International mindset",
        "Technical execution",
        "Creative direction"
      ]
    },
    services: {
      eyebrow: "Services",
      title: "What I Build",
      subtitle: "A complete technical and creative layer for modern digital businesses.",
      items: [
        {
          title: "Sales Pages",
          description:
            "High-converting landing pages and sales pages designed to present offers clearly and turn visitors into leads or customers."
        },
        {
          title: "Custom Websites",
          description: "Modern, responsive and personalized websites for businesses, agencies and digital projects."
        },
        {
          title: "CRM Implementations",
          description: "CRM setup, pipeline configuration, customer stages, lead organization and internal sales process implementation."
        },
        {
          title: "Automation Flows",
          description: "Workflows that connect forms, CRMs, notifications, APIs and business logic to reduce manual work."
        },
        {
          title: "AI Service & SDR Agents",
          description: "AI-based agents for customer service, SDR flows, lead qualification, support and automated responses."
        },
        {
          title: "API & Webhook Integrations",
          description: "Connecting platforms, tools and systems through APIs, webhooks and automation logic."
        },
        {
          title: "Databases & Internal Systems",
          description: "Structured data, dashboards, internal tools and custom systems for more complex business needs."
        },
        {
          title: "Digital Operations",
          description:
            "Technical support for agencies and small businesses that need execution, organization and scalable digital processes."
        }
      ]
    },
    work: {
      eyebrow: "Work",
      title: "Selected Work",
      subtitle: "A visual space to present websites, systems, automations, CRM implementations and digital solutions.",
      status: "Real case studies coming soon.",
      note:
        "I’m keeping this area clean until I have projects documented with screenshots, metrics and live links. For now, this portfolio focuses on what I build and how I can support your operation.",
      focusAreas: ["Landing pages", "CRM implementations", "n8n automations", "AI service agents", "API integrations", "Internal systems"],
      cta: { label: "Talk about a project", href: "#contact" },
      labels: {
        preview: "Project Preview",
        viewProject: "View Project",
        caseDetails: "Case Details"
      },
      projects: [
        {
          category: "Sales Page / Landing Page",
          title: "Conversion Offer Page",
          description: "A conversion-focused page designed for digital offers, lead capture and paid traffic campaigns.",
          tags: ["Landing Page", "Web Design", "Conversion"]
        },
        {
          category: "Custom Business Website",
          title: "Modern Company Website",
          description: "A personalized business website with modern design, clear structure and responsive experience.",
          tags: ["Website", "Frontend", "UX"]
        },
        {
          category: "CRM Implementation",
          title: "CRM Setup & Pipeline",
          description: "A CRM implementation to configure leads, opportunities, follow-ups, stages and sales operations.",
          tags: ["CRM", "Implementation", "Sales"]
        },
        {
          category: "n8n Automation Flow",
          title: "Connected Workflow",
          description: "A workflow connecting forms, CRM, notifications, APIs and internal processes.",
          tags: ["n8n", "Automation", "Webhook"]
        },
        {
          category: "AI Service & SDR Agent",
          title: "AI SDR Assistant",
          description: "A service, support or SDR assistant for lead qualification, chat flows and communication platforms.",
          tags: ["AI Agent", "SDR", "WhatsApp"]
        },
        {
          category: "Internal Dashboard",
          title: "Business Control Panel",
          description: "A simple internal system for metrics, data visualization, filters and business control.",
          tags: ["Dashboard", "Data", "System"]
        },
        {
          category: "API Integration",
          title: "System Connection Layer",
          description: "A technical integration connecting different systems through APIs and webhooks.",
          tags: ["API", "Webhook", "Integration"]
        },
        {
          category: "Complex System",
          title: "Custom Digital System",
          description: "A more advanced project involving database, logic, interface and automation.",
          tags: ["Database", "Logic", "Full System"]
        }
      ]
    },
    technologies: {
      eyebrow: "Technologies",
      title: "Tools & Technologies",
      groups: [
        {
          title: "Frontend & Design",
          tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Web Design", "Landing Pages"]
        },
        {
          title: "Automation & Integrations",
          tools: ["n8n", "Webhooks", "REST APIs", "CRM Implementations", "WhatsApp Integrations", "Workflow Automation"]
        },
        {
          title: "Data & Systems",
          tools: ["Supabase", "PostgreSQL", "Databases", "Dashboards", "Internal Tools", "Business Logic"]
        },
        {
          title: "AI & Customer Experience",
          tools: ["AI Agents", "AI SDR Agents", "Customer Support Automation", "Lead Qualification", "Multilingual Assistants"]
        },
        {
          title: "Deployment & Tools",
          tools: ["Vercel", "Railway", "GitHub", "Google Sheets", "Notion"]
        }
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build something together.",
      text:
        "If you need a remote technical freelancer for websites, sales pages, CRM implementations, automations, integrations, AI service or SDR agents and custom digital solutions, I’d be glad to connect.",
      details: [
        { key: "name", label: "Name", value: "Bruno Elias" },
        { key: "location", label: "Location", value: "Brazil" },
        { key: "work", label: "Work", value: "Remote" },
        { key: "availability", label: "Availability", value: "Freelance projects and technical support" }
      ],
      actions: {
        whatsapp: "Send WhatsApp Message",
        email: "Send Email",
        cv: "Download CV",
        linkedin: "LinkedIn"
      }
    }
  },
  de: {
    header: {
      contact: "Kontakt",
      navLabels: ["Über mich", "Leistungen", "Prozess", "Technologien", "Kontakt"],
      aria: {
        home: "Startseite von Bruno Elias",
        primary: "Hauptnavigation",
        mobile: "Mobile Navigation",
        open: "Navigation öffnen",
        close: "Navigation schließen",
        language: "Sprache auswählen"
      }
    },
    hero: {
      role: "Freiberuflicher technischer Entwickler",
      headline: "Ich entwickle Websites, Verkaufsseiten, CRM-Implementierungen, Automationen sowie KI-Service- und SDR-Agenten.",
      subheadline:
        "Brasilianischer Freelancer mit Fokus auf moderne digitale Erlebnisse, CRM-Workflows und intelligente Systeme für Unternehmen und Agenturen.",
      badges: ["Remote Freelancer", "In Brasilien ansässig", "Für Projekte verfügbar", "Websites • CRM-Implementierung • Automation • KI-SDR"],
      actions: { work: "Leistungen ansehen", contact: "Kontakt aufnehmen" },
      floatingSignals: ["CRM-Setup", "n8n-Flow", "API-Ebene", "KI-SDR"]
    },
    about: {
      eyebrow: "Profil",
      title: "Über mich",
      paragraphs: [
        "Ich bin Bruno, ein 21-jähriger brasilianischer Freelancer mit Fokus auf moderne digitale Lösungen.",
        "Ich arbeite mit Webdesign, individuellen Websites, Verkaufsseiten, CRM-Implementierungen, Automationen, API-Integrationen, KI-Service- und SDR-Agenten, Datenbanken und komplexeren Systemen mit Workflow- und Datenlogik.",
        "Aktuell baue ich Remote-Verbindungen zu Unternehmen im Ausland auf, besonders in Europa, und lerne mehr über internationale Märkte, Sprachen und Geschäftskultur."
      ],
      highlights: [
        "21 Jahre alt",
        "In Brasilien ansässig",
        "Remote-Arbeit",
        "Internationales Mindset",
        "Technische Umsetzung",
        "Kreative Leitung"
      ]
    },
    services: {
      eyebrow: "Leistungen",
      title: "Was ich entwickle",
      subtitle: "Eine vollständige technische und kreative Ebene für moderne digitale Unternehmen.",
      items: [
        {
          title: "Verkaufsseiten",
          description:
            "Conversion-orientierte Landingpages und Verkaufsseiten, die Angebote klar präsentieren und Besucher in Leads oder Kunden verwandeln."
        },
        {
          title: "Individuelle Websites",
          description: "Moderne, responsive und personalisierte Websites für Unternehmen, Agenturen und digitale Projekte."
        },
        {
          title: "CRM-Implementierungen",
          description: "CRM-Einrichtung, Pipeline-Konfiguration, Kundenphasen, Lead-Organisation und Umsetzung interner Vertriebsprozesse."
        },
        {
          title: "Automations-Flows",
          description:
            "Workflows, die Formulare, CRMs, Benachrichtigungen, APIs und Geschäftslogik verbinden, um manuelle Arbeit zu reduzieren."
        },
        {
          title: "KI-Service- & SDR-Agenten",
          description: "KI-basierte Agenten für Kundenservice, SDR-Flows, Lead-Qualifizierung, Support und automatisierte Antworten."
        },
        {
          title: "API- & Webhook-Integrationen",
          description: "Verbindung von Plattformen, Tools und Systemen über APIs, Webhooks und Automationslogik."
        },
        {
          title: "Datenbanken & interne Systeme",
          description: "Strukturierte Daten, Dashboards, interne Tools und individuelle Systeme für komplexere Geschäftsanforderungen."
        },
        {
          title: "Digitale Operations",
          description:
            "Technische Unterstützung für Agenturen und kleine Unternehmen, die Umsetzung, Struktur und skalierbare digitale Prozesse benötigen."
        }
      ]
    },
    work: {
      eyebrow: "Arbeiten",
      title: "Ausgewählte Arbeiten",
      subtitle: "Ein visueller Bereich für Websites, Systeme, Automationen, CRM-Implementierungen und digitale Lösungen.",
      status: "Echte Case Studies folgen bald.",
      note:
        "Ich halte diesen Bereich bewusst sauber, bis Projekte mit Screenshots, Ergebnissen und Links dokumentiert sind. Im Moment zeigt das Portfolio, was ich baue und wie ich digitale Abläufe unterstützen kann.",
      focusAreas: ["Landingpages", "CRM-Implementierungen", "n8n-Automationen", "KI-Service-Agenten", "API-Integrationen", "Interne Systeme"],
      cta: { label: "Über ein Projekt sprechen", href: "#contact" },
      labels: {
        preview: "Projektvorschau",
        viewProject: "Projekt ansehen",
        caseDetails: "Projektdetails"
      },
      projects: [
        {
          category: "Verkaufsseite / Landingpage",
          title: "Conversion-Angebotsseite",
          description: "Eine conversion-orientierte Seite für digitale Angebote, Lead-Erfassung und Paid-Traffic-Kampagnen.",
          tags: ["Landingpage", "Webdesign", "Conversion"]
        },
        {
          category: "Individuelle Business-Website",
          title: "Moderne Unternehmenswebsite",
          description: "Eine personalisierte Business-Website mit modernem Design, klarer Struktur und responsiver Erfahrung.",
          tags: ["Website", "Frontend", "UX"]
        },
        {
          category: "CRM-Implementierung",
          title: "CRM-Setup & Pipeline",
          description: "Eine CRM-Implementierung zur Konfiguration von Leads, Chancen, Follow-ups, Phasen und Vertriebsabläufen.",
          tags: ["CRM", "Implementierung", "Vertrieb"]
        },
        {
          category: "n8n Automations-Flow",
          title: "Vernetzter Workflow",
          description: "Ein Workflow, der Formulare, CRM, Benachrichtigungen, APIs und interne Prozesse verbindet.",
          tags: ["n8n", "Automation", "Webhook"]
        },
        {
          category: "KI-Service- & SDR-Agent",
          title: "KI-SDR-Assistent",
          description: "Ein Service-, Support- oder SDR-Assistent für Lead-Qualifizierung, Chat-Flows und Kommunikationsplattformen.",
          tags: ["KI-Agent", "SDR", "WhatsApp"]
        },
        {
          category: "Internes Dashboard",
          title: "Business-Kontrollpanel",
          description: "Ein einfaches internes System für Kennzahlen, Datenvisualisierung, Filter und Geschäftskontrolle.",
          tags: ["Dashboard", "Daten", "System"]
        },
        {
          category: "API-Integration",
          title: "System-Verbindungsebene",
          description: "Eine technische Integration, die verschiedene Systeme über APIs und Webhooks verbindet.",
          tags: ["API", "Webhook", "Integration"]
        },
        {
          category: "Komplexes System",
          title: "Individuelles digitales System",
          description: "Ein fortgeschritteneres Projekt mit Datenbank, Logik, Interface und Automation.",
          tags: ["Datenbank", "Logik", "Komplettes System"]
        }
      ]
    },
    technologies: {
      eyebrow: "Technologien",
      title: "Tools & Technologien",
      groups: [
        {
          title: "Frontend & Design",
          tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Webdesign", "Landingpages"]
        },
        {
          title: "Automation & Integrationen",
          tools: ["n8n", "Webhooks", "REST APIs", "CRM-Implementierungen", "WhatsApp-Integrationen", "Workflow-Automation"]
        },
        {
          title: "Daten & Systeme",
          tools: ["Supabase", "PostgreSQL", "Datenbanken", "Dashboards", "Interne Tools", "Geschäftslogik"]
        },
        {
          title: "KI & Kundenerfahrung",
          tools: ["KI-Agenten", "KI-SDR-Agenten", "Kundensupport-Automation", "Lead-Qualifizierung", "Mehrsprachige Assistenten"]
        },
        {
          title: "Deployment & Werkzeuge",
          tools: ["Vercel", "Railway", "GitHub", "Google Sheets", "Notion"]
        }
      ]
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns gemeinsam etwas bauen.",
      text:
        "Wenn du einen Remote-Freelancer für Websites, Verkaufsseiten, CRM-Implementierungen, Automationen, Integrationen, KI-Service- oder SDR-Agenten und individuelle digitale Lösungen brauchst, freue ich mich über eine Nachricht.",
      details: [
        { key: "name", label: "Name", value: "Bruno Elias" },
        { key: "location", label: "Standort", value: "Brasilien" },
        { key: "work", label: "Arbeit", value: "Remote" },
        { key: "availability", label: "Verfügbarkeit", value: "Freelance-Projekte und technischer Support" }
      ],
      actions: {
        whatsapp: "WhatsApp-Nachricht senden",
        email: "E-Mail senden",
        cv: "Lebenslauf herunterladen",
        linkedin: "LinkedIn"
      }
    }
  },
  fr: {
    header: {
      contact: "Contact",
      navLabels: ["À propos", "Services", "Processus", "Technologies", "Contact"],
      aria: {
        home: "Accueil de Bruno Elias",
        primary: "Navigation principale",
        mobile: "Navigation mobile",
        open: "Ouvrir la navigation",
        close: "Fermer la navigation",
        language: "Choisir la langue"
      }
    },
    hero: {
      role: "Développeur technique freelance",
      headline: "Je crée des sites web, pages de vente, implémentations CRM, automatisations et agents IA de service et SDR.",
      subheadline:
        "Freelance brésilien spécialisé dans la création d’expériences digitales modernes, l’implémentation de workflows CRM et les systèmes intelligents pour entreprises et agences.",
      badges: ["Freelance à distance", "Basé au Brésil", "Disponible pour des projets", "Sites web • Implémentation CRM • Automatisation • SDR IA"],
      actions: { work: "Voir les services", contact: "Me contacter" },
      floatingSignals: ["Setup CRM", "Flux n8n", "Couche API", "SDR IA"]
    },
    about: {
      eyebrow: "Profil",
      title: "À propos de moi",
      paragraphs: [
        "Je suis Bruno, un freelance brésilien de 21 ans spécialisé dans la création de solutions digitales modernes.",
        "Je travaille sur le web design, les sites personnalisés, les pages de vente, les implémentations CRM, les automatisations, les intégrations API, les agents IA de service et SDR, les bases de données et des systèmes plus complexes avec logique de workflow et de données.",
        "Je développe actuellement des connexions à distance avec des entreprises à l’étranger, surtout en Europe, tout en approfondissant ma compréhension des marchés internationaux, des langues et de la culture business."
      ],
      highlights: [
        "21 ans",
        "Basé au Brésil",
        "Travail à distance",
        "Vision internationale",
        "Exécution technique",
        "Direction créative"
      ]
    },
    services: {
      eyebrow: "Services",
      title: "Ce que je construis",
      subtitle: "Une couche technique et créative complète pour les entreprises digitales modernes.",
      items: [
        {
          title: "Pages de vente",
          description:
            "Landing pages et pages de vente orientées conversion, conçues pour présenter clairement les offres et transformer les visiteurs en prospects ou clients."
        },
        {
          title: "Sites personnalisés",
          description: "Sites modernes, responsives et personnalisés pour entreprises, agences et projets digitaux."
        },
        {
          title: "Implémentations CRM",
          description: "Configuration de CRM, pipelines, étapes client, organisation des leads et mise en place des processus commerciaux internes."
        },
        {
          title: "Flux d’automatisation",
          description:
            "Workflows qui connectent formulaires, CRM, notifications, API et logique métier afin de réduire le travail manuel."
        },
        {
          title: "Agents IA service & SDR",
          description:
            "Agents basés sur l’IA pour le service client, les flux SDR, la qualification de leads, le support et les réponses automatisées."
        },
        {
          title: "Intégrations API & Webhook",
          description: "Connexion de plateformes, outils et systèmes via API, webhooks et logique d’automatisation."
        },
        {
          title: "Bases de données & systèmes internes",
          description:
            "Données structurées, dashboards, outils internes et systèmes personnalisés pour des besoins business plus complexes."
        },
        {
          title: "Opérations digitales",
          description:
            "Support technique pour agences et petites entreprises qui ont besoin d’exécution, d’organisation et de processus digitaux scalables."
        }
      ]
    },
    work: {
      eyebrow: "Projets",
      title: "Projets sélectionnés",
      subtitle: "Un espace visuel pour présenter sites, systèmes, automatisations, implémentations CRM et solutions digitales.",
      status: "Des études de cas réelles arrivent bientôt.",
      note:
        "Je garde cet espace propre jusqu’à avoir des projets documentés avec captures, résultats et liens. Pour l’instant, ce portfolio met en avant ce que je construis et la manière dont je peux soutenir vos opérations digitales.",
      focusAreas: ["Landing pages", "Implémentations CRM", "Automatisations n8n", "Agents IA service", "Intégrations API", "Systèmes internes"],
      cta: { label: "Parler d’un projet", href: "#contact" },
      labels: {
        preview: "Aperçu du projet",
        viewProject: "Voir le projet",
        caseDetails: "Détails du cas"
      },
      projects: [
        {
          category: "Page de vente / Landing page",
          title: "Page d’offre conversion",
          description: "Une page orientée conversion pour offres digitales, capture de leads et campagnes de trafic payant.",
          tags: ["Landing Page", "Web Design", "Conversion"]
        },
        {
          category: "Site d’entreprise personnalisé",
          title: "Site d’entreprise moderne",
          description: "Un site business personnalisé avec design moderne, structure claire et expérience responsive.",
          tags: ["Site web", "Frontend", "UX"]
        },
        {
          category: "Implémentation CRM",
          title: "Setup CRM & pipeline",
          description: "Une implémentation CRM pour configurer leads, opportunités, relances, étapes et opérations commerciales.",
          tags: ["CRM", "Implémentation", "Ventes"]
        },
        {
          category: "Flux d’automatisation n8n",
          title: "Workflow connecté",
          description: "Un workflow qui connecte formulaires, CRM, notifications, API et processus internes.",
          tags: ["n8n", "Automatisation", "Webhook"]
        },
        {
          category: "Agent IA service & SDR",
          title: "Assistant SDR IA",
          description: "Un assistant de service, support ou SDR pour la qualification de leads, les flux chat et les plateformes de communication.",
          tags: ["Agent IA", "SDR", "WhatsApp"]
        },
        {
          category: "Dashboard interne",
          title: "Panneau de contrôle business",
          description: "Un système interne simple pour métriques, visualisation de données, filtres et contrôle business.",
          tags: ["Dashboard", "Données", "Système"]
        },
        {
          category: "Intégration API",
          title: "Couche de connexion système",
          description: "Une intégration technique qui connecte différents systèmes via API et webhooks.",
          tags: ["API", "Webhook", "Intégration"]
        },
        {
          category: "Système complexe",
          title: "Système digital personnalisé",
          description: "Un projet plus avancé impliquant base de données, logique, interface et automatisation.",
          tags: ["Base de données", "Logique", "Système complet"]
        }
      ]
    },
    technologies: {
      eyebrow: "Technologies",
      title: "Outils & Technologies",
      groups: [
        {
          title: "Frontend & Design",
          tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Web Design", "Landing Pages"]
        },
        {
          title: "Automatisation & Intégrations",
          tools: ["n8n", "Webhooks", "REST APIs", "Implémentations CRM", "Intégrations WhatsApp", "Automatisation de workflows"]
        },
        {
          title: "Données & Systèmes",
          tools: ["Supabase", "PostgreSQL", "Bases de données", "Dashboards", "Outils internes", "Logique métier"]
        },
        {
          title: "IA & Expérience client",
          tools: ["Agents IA", "Agents SDR IA", "Automatisation du support client", "Qualification de leads", "Assistants multilingues"]
        },
        {
          title: "Déploiement & Outils",
          tools: ["Vercel", "Railway", "GitHub", "Google Sheets", "Notion"]
        }
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Construisons quelque chose ensemble.",
      text:
        "Si vous avez besoin d’un freelance technique à distance pour des sites web, pages de vente, implémentations CRM, automatisations, intégrations, agents IA de service ou SDR et solutions digitales personnalisées, je serais ravi d’échanger.",
      details: [
        { key: "name", label: "Nom", value: "Bruno Elias" },
        { key: "location", label: "Localisation", value: "Brésil" },
        { key: "work", label: "Travail", value: "À distance" },
        { key: "availability", label: "Disponibilité", value: "Projets freelance et support technique" }
      ],
      actions: {
        whatsapp: "Envoyer un message WhatsApp",
        email: "Envoyer un e-mail",
        cv: "Télécharger le CV",
        linkedin: "LinkedIn"
      }
    }
  },
  it: {
    header: {
      contact: "Contatto",
      navLabels: ["Chi sono", "Servizi", "Processo", "Tecnologie", "Contatto"],
      aria: {
        home: "Home di Bruno Elias",
        primary: "Navigazione principale",
        mobile: "Navigazione mobile",
        open: "Apri navigazione",
        close: "Chiudi navigazione",
        language: "Seleziona lingua"
      }
    },
    hero: {
      role: "Sviluppatore tecnico freelance",
      headline: "Creo siti web, pagine di vendita, implementazioni CRM, automazioni e agenti IA per assistenza e SDR.",
      subheadline:
        "Freelance brasiliano focalizzato su esperienze digitali moderne, implementazioni di workflow CRM e sistemi intelligenti per aziende e agenzie.",
      badges: ["Freelance da remoto", "Con base in Brasile", "Disponibile per progetti", "Siti web • Implementazione CRM • Automazione • SDR IA"],
      actions: { work: "Vedi i servizi", contact: "Contattami" },
      floatingSignals: ["Setup CRM", "Flusso n8n", "Livello API", "SDR IA"]
    },
    about: {
      eyebrow: "Profilo",
      title: "Chi sono",
      paragraphs: [
        "Sono Bruno, un freelance brasiliano di 21 anni focalizzato sulla creazione di soluzioni digitali moderne.",
        "Lavoro con web design, siti personalizzati, pagine di vendita, implementazioni CRM, automazioni, integrazioni API, agenti IA per assistenza e SDR, database e sistemi più complessi che coinvolgono workflow e logica dei dati.",
        "Attualmente sto costruendo connessioni da remoto con aziende all’estero, soprattutto in Europa, mentre approfondisco mercati internazionali, lingue e cultura business."
      ],
      highlights: [
        "21 anni",
        "Con base in Brasile",
        "Lavoro da remoto",
        "Mentalità internazionale",
        "Esecuzione tecnica",
        "Direzione creativa"
      ]
    },
    services: {
      eyebrow: "Servizi",
      title: "Cosa costruisco",
      subtitle: "Un livello tecnico e creativo completo per aziende digitali moderne.",
      items: [
        {
          title: "Pagine di vendita",
          description:
            "Landing page e pagine di vendita orientate alla conversione, progettate per presentare offerte in modo chiaro e trasformare visitatori in lead o clienti."
        },
        {
          title: "Siti personalizzati",
          description: "Siti moderni, responsive e personalizzati per aziende, agenzie e progetti digitali."
        },
        {
          title: "Implementazioni CRM",
          description: "Setup CRM, configurazione pipeline, fasi cliente, organizzazione lead e implementazione dei processi di vendita interni."
        },
        {
          title: "Flussi di automazione",
          description:
            "Workflow che collegano form, CRM, notifiche, API e logica business per ridurre il lavoro manuale."
        },
        {
          title: "Agenti IA assistenza & SDR",
          description: "Agenti basati sull’IA per assistenza clienti, flussi SDR, qualificazione lead, supporto e risposte automatizzate."
        },
        {
          title: "Integrazioni API & Webhook",
          description: "Connessione di piattaforme, strumenti e sistemi tramite API, webhook e logica di automazione."
        },
        {
          title: "Database & sistemi interni",
          description: "Dati strutturati, dashboard, strumenti interni e sistemi personalizzati per esigenze business più complesse."
        },
        {
          title: "Operazioni digitali",
          description:
            "Supporto tecnico per agenzie e piccole aziende che hanno bisogno di esecuzione, organizzazione e processi digitali scalabili."
        }
      ]
    },
    work: {
      eyebrow: "Progetti",
      title: "Progetti selezionati",
      subtitle: "Uno spazio visivo per presentare siti, sistemi, automazioni, implementazioni CRM e soluzioni digitali.",
      status: "Case study reali in arrivo.",
      note:
        "Mantengo quest’area pulita finché non avrò progetti documentati con screenshot, risultati e link. Per ora, il portfolio mostra cosa costruisco e come posso supportare le tue operazioni digitali.",
      focusAreas: ["Landing page", "Implementazioni CRM", "Automazioni n8n", "Agenti IA assistenza", "Integrazioni API", "Sistemi interni"],
      cta: { label: "Parlare di un progetto", href: "#contact" },
      labels: {
        preview: "Anteprima progetto",
        viewProject: "Vedi progetto",
        caseDetails: "Dettagli del caso"
      },
      projects: [
        {
          category: "Pagina di vendita / Landing page",
          title: "Pagina offerta conversione",
          description: "Una pagina orientata alla conversione per offerte digitali, acquisizione lead e campagne paid traffic.",
          tags: ["Landing Page", "Web Design", "Conversione"]
        },
        {
          category: "Sito aziendale personalizzato",
          title: "Sito aziendale moderno",
          description: "Un sito business personalizzato con design moderno, struttura chiara ed esperienza responsive.",
          tags: ["Sito web", "Frontend", "UX"]
        },
        {
          category: "Implementazione CRM",
          title: "Setup CRM & pipeline",
          description: "Un’implementazione CRM per configurare lead, opportunità, follow-up, fasi e operazioni di vendita.",
          tags: ["CRM", "Implementazione", "Vendite"]
        },
        {
          category: "Flusso di automazione n8n",
          title: "Workflow connesso",
          description: "Un workflow che collega form, CRM, notifiche, API e processi interni.",
          tags: ["n8n", "Automazione", "Webhook"]
        },
        {
          category: "Agente IA assistenza & SDR",
          title: "Assistente SDR IA",
          description: "Un assistente per assistenza, supporto o SDR per qualificazione lead, flussi chat e piattaforme di comunicazione.",
          tags: ["Agente IA", "SDR", "WhatsApp"]
        },
        {
          category: "Dashboard interna",
          title: "Pannello di controllo business",
          description: "Un semplice sistema interno per metriche, visualizzazione dati, filtri e controllo business.",
          tags: ["Dashboard", "Dati", "Sistema"]
        },
        {
          category: "Integrazione API",
          title: "Livello di connessione sistemi",
          description: "Un’integrazione tecnica che collega sistemi diversi tramite API e webhook.",
          tags: ["API", "Webhook", "Integrazione"]
        },
        {
          category: "Sistema complesso",
          title: "Sistema digitale personalizzato",
          description: "Un progetto più avanzato con database, logica, interfaccia e automazione.",
          tags: ["Database", "Logica", "Sistema completo"]
        }
      ]
    },
    technologies: {
      eyebrow: "Tecnologie",
      title: "Strumenti & Tecnologie",
      groups: [
        {
          title: "Frontend & Design",
          tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Web Design", "Landing Pages"]
        },
        {
          title: "Automazione & Integrazioni",
          tools: ["n8n", "Webhooks", "REST APIs", "Implementazioni CRM", "Integrazioni WhatsApp", "Workflow Automation"]
        },
        {
          title: "Dati & Sistemi",
          tools: ["Supabase", "PostgreSQL", "Database", "Dashboard", "Strumenti interni", "Logica business"]
        },
        {
          title: "IA & Customer Experience",
          tools: ["Agenti IA", "Agenti SDR IA", "Automazione customer support", "Qualificazione lead", "Assistenti multilingua"]
        },
        {
          title: "Deployment & Tools",
          tools: ["Vercel", "Railway", "GitHub", "Google Sheets", "Notion"]
        }
      ]
    },
    contact: {
      eyebrow: "Contatto",
      title: "Costruiamo qualcosa insieme.",
      text:
        "Se hai bisogno di un freelance tecnico da remoto per siti web, pagine di vendita, implementazioni CRM, automazioni, integrazioni, agenti IA per assistenza o SDR e soluzioni digitali personalizzate, sarò felice di parlarne.",
      details: [
        { key: "name", label: "Nome", value: "Bruno Elias" },
        { key: "location", label: "Località", value: "Brasile" },
        { key: "work", label: "Lavoro", value: "Da remoto" },
        { key: "availability", label: "Disponibilità", value: "Progetti freelance e supporto tecnico" }
      ],
      actions: {
        whatsapp: "Invia messaggio WhatsApp",
        email: "Invia e-mail",
        cv: "Scarica CV",
        linkedin: "LinkedIn"
      }
    }
  },
  pt: {
    header: {
      contact: "Contato",
      navLabels: ["Sobre", "Serviços", "Processo", "Tecnologias", "Contato"],
      aria: {
        home: "Início de Bruno Elias",
        primary: "Navegação principal",
        mobile: "Navegação mobile",
        open: "Abrir navegação",
        close: "Fechar navegação",
        language: "Selecionar idioma"
      }
    },
    hero: {
      role: "Freelancer técnico",
      headline: "Eu construo sites, páginas de vendas, implementações em CRMs, automações e agentes de atendimento e SDR com IA.",
      subheadline:
        "Freelancer brasileiro focado em criar experiências digitais modernas, implementar fluxos em CRMs e construir sistemas inteligentes para empresas e agências.",
      badges: ["Freelancer remoto", "Baseado no Brasil", "Disponível para projetos", "Sites • Implementação CRM • Automação • SDR IA"],
      actions: { work: "Ver serviços", contact: "Falar comigo" },
      floatingSignals: ["Setup CRM", "Fluxo n8n", "Camada API", "SDR IA"]
    },
    about: {
      eyebrow: "Perfil",
      title: "Sobre mim",
      paragraphs: [
        "Sou Bruno, um freelancer brasileiro de 21 anos focado em construir soluções digitais modernas.",
        "Trabalho com web design, sites personalizados, páginas de vendas, implementações em CRMs, automações, integrações com API, agentes de atendimento e SDR com IA, bancos de dados e sistemas mais complexos envolvendo lógica de workflow e dados.",
        "Atualmente estou construindo conexões remotas com empresas do exterior, especialmente na Europa, enquanto aprendo mais sobre mercados internacionais, idiomas e cultura de negócios."
      ],
      highlights: [
        "21 anos",
        "Baseado no Brasil",
        "Trabalho remoto",
        "Mentalidade internacional",
        "Execução técnica",
        "Direção criativa"
      ]
    },
    services: {
      eyebrow: "Serviços",
      title: "O que eu construo",
      subtitle: "Uma camada técnica e criativa completa para negócios digitais modernos.",
      items: [
        {
          title: "Páginas de vendas",
          description:
            "Landing pages e páginas de vendas focadas em conversão, criadas para apresentar ofertas com clareza e transformar visitantes em leads ou clientes."
        },
        {
          title: "Sites personalizados",
          description: "Sites modernos, responsivos e personalizados para empresas, agências e projetos digitais."
        },
        {
          title: "Implementações em CRMs",
          description: "Configuração de CRM, pipelines, etapas de clientes, organização de leads e implementação de processos comerciais internos."
        },
        {
          title: "Fluxos de automação",
          description:
            "Workflows que conectam formulários, CRMs, notificações, APIs e lógica de negócio para reduzir trabalho manual."
        },
        {
          title: "Agentes de atendimento & SDR",
          description: "Agentes com IA para atendimento, SDR, qualificação de leads, suporte e respostas automatizadas."
        },
        {
          title: "Integrações API & Webhook",
          description: "Conexão entre plataformas, ferramentas e sistemas por meio de APIs, webhooks e lógica de automação."
        },
        {
          title: "Bancos de dados & sistemas internos",
          description: "Dados estruturados, dashboards, ferramentas internas e sistemas personalizados para necessidades mais complexas."
        },
        {
          title: "Operações digitais",
          description:
            "Suporte técnico para agências e pequenos negócios que precisam de execução, organização e processos digitais escaláveis."
        }
      ]
    },
    work: {
      eyebrow: "Trabalhos",
      title: "Trabalhos selecionados",
      subtitle: "Um espaço visual para apresentar sites, sistemas, automações, implementações em CRMs e soluções digitais.",
      status: "Cases reais em preparação.",
      note:
        "Vou manter esta área limpa até ter projetos documentados com prints, resultados e links reais. Por enquanto, o portfólio mostra com clareza o que eu construo e como posso apoiar operações digitais.",
      focusAreas: ["Landing pages", "Implementações em CRMs", "Automações n8n", "Agentes de atendimento", "Integrações API", "Sistemas internos"],
      cta: { label: "Conversar sobre um projeto", href: "#contact" },
      labels: {
        preview: "Prévia do projeto",
        viewProject: "Ver projeto",
        caseDetails: "Detalhes do case"
      },
      projects: [
        {
          category: "Página de vendas / Landing page",
          title: "Página de oferta com conversão",
          description: "Uma página focada em conversão para ofertas digitais, captura de leads e campanhas de tráfego pago.",
          tags: ["Landing Page", "Web Design", "Conversão"]
        },
        {
          category: "Site empresarial personalizado",
          title: "Site moderno para empresa",
          description: "Um site empresarial personalizado com design moderno, estrutura clara e experiência responsiva.",
          tags: ["Website", "Frontend", "UX"]
        },
        {
          category: "Implementação em CRM",
          title: "Setup de CRM & pipeline",
          description: "Uma implementação em CRM para configurar leads, oportunidades, follow-ups, etapas e processos comerciais.",
          tags: ["CRM", "Implementação", "Vendas"]
        },
        {
          category: "Fluxo de automação n8n",
          title: "Workflow conectado",
          description: "Um workflow conectando formulários, CRM, notificações, APIs e processos internos.",
          tags: ["n8n", "Automação", "Webhook"]
        },
        {
          category: "Agente de atendimento & SDR",
          title: "Assistente SDR com IA",
          description: "Um assistente de atendimento, suporte ou SDR para qualificação de leads, fluxos de chat e canais de comunicação.",
          tags: ["Agente IA", "SDR", "WhatsApp"]
        },
        {
          category: "Dashboard interno",
          title: "Painel de controle empresarial",
          description: "Um sistema interno simples para métricas, visualização de dados, filtros e controle de negócio.",
          tags: ["Dashboard", "Dados", "Sistema"]
        },
        {
          category: "Integração com API",
          title: "Camada de conexão entre sistemas",
          description: "Uma integração técnica conectando diferentes sistemas por meio de APIs e webhooks.",
          tags: ["API", "Webhook", "Integração"]
        },
        {
          category: "Sistema complexo",
          title: "Sistema digital personalizado",
          description: "Um projeto mais avançado envolvendo banco de dados, lógica, interface e automação.",
          tags: ["Banco de dados", "Lógica", "Sistema completo"]
        }
      ]
    },
    technologies: {
      eyebrow: "Tecnologias",
      title: "Ferramentas & Tecnologias",
      groups: [
        {
          title: "Frontend & Design",
          tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Web Design", "Landing Pages"]
        },
        {
          title: "Automação & Integrações",
          tools: ["n8n", "Webhooks", "REST APIs", "Implementações CRM", "Integrações WhatsApp", "Automação de Workflows"]
        },
        {
          title: "Dados & Sistemas",
          tools: ["Supabase", "PostgreSQL", "Bancos de dados", "Dashboards", "Ferramentas internas", "Lógica de negócio"]
        },
        {
          title: "IA & Experiência do cliente",
          tools: ["Agentes de IA", "Agentes SDR com IA", "Automação de atendimento", "Qualificação de leads", "Assistentes multilíngues"]
        },
        {
          title: "Deploy & Ferramentas",
          tools: ["Vercel", "Railway", "GitHub", "Google Sheets", "Notion"]
        }
      ]
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos construir algo juntos.",
      text:
        "Se você precisa de um freelancer técnico remoto para sites, páginas de vendas, implementações em CRMs, automações, integrações, agentes de atendimento ou SDR com IA e soluções digitais personalizadas, vou gostar de conversar.",
      details: [
        { key: "name", label: "Nome", value: "Bruno Elias" },
        { key: "location", label: "Localização", value: "Brasil" },
        { key: "work", label: "Trabalho", value: "Remoto" },
        { key: "availability", label: "Disponibilidade", value: "Projetos freelance e suporte técnico" }
      ],
      actions: {
        whatsapp: "Enviar mensagem no WhatsApp",
        email: "Enviar e-mail",
        cv: "Baixar CV",
        linkedin: "LinkedIn"
      }
    }
  }
};

export const translations = Object.fromEntries(Object.entries(copies).map(([locale, copy]) => [locale, buildContent(copy)]));

export function getPortfolioContent(locale) {
  return translations[locale] ?? translations.en;
}
