import type { LocalizedText } from "./consular-services";

export type AnnouncementStatus = "draft" | "published" | "archived";

export type AnnouncementCategory =
  | "general"
  | "consular-service"
  | "community"
  | "emergency";

export type Announcement = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  category: AnnouncementCategory;
  publishedAt: string;
  updatedAt?: string;
  image?: {
    src: string;
    alt: LocalizedText;
  };
  featured: boolean;
  status: AnnouncementStatus;
};

export const announcements: Announcement[] = [
  {
    slug: "bienvenue-plateforme-consulaire",
    title: {
      fr: "Bienvenue sur la plateforme consulaire",
      en: "Welcome to the consular platform",
    },
    excerpt: {
      fr: "Annonce de démonstration présentant l'espace d'information bilingue du consulat.",
      en: "Demo announcement introducing the consulate's bilingual information space.",
    },
    content: {
      fr: "Ce contenu de démonstration présente la future utilisation de la rubrique Actualités. Les informations officielles, procédures et dates confirmées seront publiées uniquement après validation par le consulat.",
      en: "This demo content shows how the News section may be used in the future. Official information, procedures, and confirmed dates will be published only after validation by the consulate.",
    },
    category: "general",
    publishedAt: "2026-07-01",
    image: {
      src: "/images/news/consul-event.png",
      alt: {
        fr: "Image générique utilisée pour illustrer une annonce de démonstration.",
        en: "Generic image used to illustrate a demo announcement.",
      },
    },
    featured: true,
    status: "published",
  },
  {
    slug: "information-services-consulaires-demo",
    title: {
      fr: "Information sur les services consulaires",
      en: "Consular services information",
    },
    excerpt: {
      fr: "Exemple d'annonce décrivant comment les mises à jour de services pourront être présentées.",
      en: "Sample announcement showing how service updates may be presented.",
    },
    content: {
      fr: "Cette annonce est un exemple de contenu. Elle ne confirme aucune exigence officielle, aucun délai, aucun frais et aucune procédure. Les informations définitives devront être confirmées auprès du consulat.",
      en: "This announcement is sample content. It does not confirm any official requirement, timeline, fee, or procedure. Final information must be confirmed with the consulate.",
    },
    category: "consular-service",
    publishedAt: "2026-06-24",
    image: {
      src: "/images/news/consul-event-passport.png",
      alt: {
        fr: "Image générique liée aux services consulaires, utilisée à titre de démonstration.",
        en: "Generic consular-services image used for demonstration purposes.",
      },
    },
    featured: false,
    status: "published",
  },
  {
    slug: "note-communautaire-demo",
    title: {
      fr: "Note communautaire",
      en: "Community notice",
    },
    excerpt: {
      fr: "Exemple de note destinée à illustrer une communication générale avec la communauté.",
      en: "Sample notice illustrating general communication with the community.",
    },
    content: {
      fr: "Cette note est un exemple non officiel. Elle illustre la structure d'une future communication communautaire et ne constitue pas une annonce confirmée du consulat.",
      en: "This notice is an unofficial example. It illustrates the structure of a future community communication and is not a confirmed consular announcement.",
    },
    category: "community",
    publishedAt: "2026-06-10",
    image: {
      src: "/images/news/consul-event-people.png",
      alt: {
        fr: "Image générique de communauté utilisée pour un contenu de démonstration.",
        en: "Generic community image used for demo content.",
      },
    },
    featured: true,
    status: "published",
  },
];

export function getPublishedAnnouncements(): Announcement[] {
  return announcements
    .filter((announcement) => announcement.status === "published")
    .toSorted(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAnnouncementBySlug(
  slug: string
): Announcement | undefined {
  return announcements.find((announcement) => announcement.slug === slug);
}

export function getFeaturedAnnouncements(): Announcement[] {
  return getPublishedAnnouncements().filter(
    (announcement) => announcement.featured
  );
}
