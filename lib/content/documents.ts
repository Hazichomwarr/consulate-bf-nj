import type { LocalizedText } from "./consular-services";

export type DocumentCategory =
  | "passport"
  | "consular-card"
  | "civil-status"
  | "legal-guidance"
  | "general";

export type DocumentLanguage = "fr" | "en" | "bilingual";

export type DocumentStatus = "available" | "coming-soon" | "unavailable";

export type ConsularDocument = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: DocumentCategory;
  fileUrl: string;
  language: DocumentLanguage;
  lastUpdated: string | null;
  status: DocumentStatus;
};

export const documents: ConsularDocument[] = [
  {
    slug: "passport-application-form",
    title: {
      fr: "Formulaire de demande de passeport",
      en: "Passport Application Form",
    },
    description: {
      fr: "Emplacement réservé pour le formulaire officiel de demande de passeport, à publier après confirmation par le consulat.",
      en: "Placeholder for the official passport application form, to be published after confirmation by the consulate.",
    },
    category: "passport",
    fileUrl: "/documents/passport-form.pdf",
    language: "bilingual",
    lastUpdated: null,
    status: "coming-soon",
  },
  {
    slug: "consular-card-form",
    title: {
      fr: "Formulaire de carte consulaire",
      en: "Consular Card Form",
    },
    description: {
      fr: "Emplacement réservé pour le formulaire officiel relatif à la carte consulaire.",
      en: "Placeholder for the official form related to the consular card.",
    },
    category: "consular-card",
    fileUrl: "/documents/consular-card-form.pdf",
    language: "bilingual",
    lastUpdated: null,
    status: "coming-soon",
  },
  {
    slug: "civil-status-request",
    title: {
      fr: "Demande d'état civil",
      en: "Civil Status Request",
    },
    description: {
      fr: "Emplacement réservé pour les informations ou formulaires liés aux demandes d'état civil.",
      en: "Placeholder for information or forms related to civil status requests.",
    },
    category: "civil-status",
    fileUrl: "/documents/civil-status-request.pdf",
    language: "bilingual",
    lastUpdated: null,
    status: "coming-soon",
  },
  {
    slug: "power-of-attorney-guide",
    title: {
      fr: "Guide de procuration",
      en: "Power of Attorney Guide",
    },
    description: {
      fr: "Emplacement réservé pour un guide d'orientation sur les procurations, à valider avant publication.",
      en: "Placeholder for a guidance document about powers of attorney, to be validated before publication.",
    },
    category: "legal-guidance",
    fileUrl: "/documents/power-of-attorney-guide.pdf",
    language: "bilingual",
    lastUpdated: null,
    status: "coming-soon",
  },
  {
    slug: "general-information-sheet",
    title: {
      fr: "Fiche d'information générale",
      en: "General Information Sheet",
    },
    description: {
      fr: "Emplacement réservé pour une fiche d'information générale destinée aux usagers du consulat.",
      en: "Placeholder for a general information sheet intended for consular users.",
    },
    category: "general",
    fileUrl: "/documents/general-information-sheet.pdf",
    language: "bilingual",
    lastUpdated: null,
    status: "coming-soon",
  },
];

export function getAvailableDocuments(): ConsularDocument[] {
  return documents.filter((document) => document.status === "available");
}

export function getDocumentBySlug(
  slug: string
): ConsularDocument | undefined {
  return documents.find((document) => document.slug === slug);
}

export function getDocumentsByCategory(
  category: DocumentCategory
): ConsularDocument[] {
  return documents.filter((document) => document.category === category);
}
