import type { LocalizedText } from "./consular-services";

export type EventStatus = "draft" | "scheduled" | "cancelled" | "completed";

export type EventCategory =
  | "community"
  | "consular-outreach"
  | "cultural"
  | "official";

export type EventLocation = {
  name: LocalizedText;
  address?: string;
  mapsUrl?: string;
  isOnline?: boolean;
};

export type ConsulateEvent = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  description: LocalizedText;
  category: EventCategory;
  startAt: string;
  endAt?: string;
  location: EventLocation;
  image?: {
    src: string;
    alt: LocalizedText;
  };
  registrationUrl?: string;
  featured: boolean;
  status: EventStatus;
};

const publicEventStatuses: EventStatus[] = ["scheduled", "completed"];

export const events: ConsulateEvent[] = [
  {
    slug: "session-information-communautaire-demo",
    title: {
      fr: "Session d'information communautaire",
      en: "Community information session",
    },
    excerpt: {
      fr: "Exemple d'événement destiné à illustrer une future session d'information.",
      en: "Sample event illustrating a future information session.",
    },
    description: {
      fr: "Cet événement est un contenu de démonstration. La date, le format, le lieu et les modalités de participation ne sont pas confirmés par le consulat.",
      en: "This event is demo content. The date, format, location, and participation details are not confirmed by the consulate.",
    },
    category: "community",
    startAt: "2026-08-15T14:00:00-04:00",
    location: {
      name: {
        fr: "Lieu à confirmer",
        en: "Location to be confirmed",
      },
    },
    image: {
      src: "/images/news/consul-event-people.png",
      alt: {
        fr: "Image générique de communauté utilisée pour un événement de démonstration.",
        en: "Generic community image used for a demo event.",
      },
    },
    featured: true,
    status: "scheduled",
  },
  {
    slug: "rencontre-culturelle-demo",
    title: {
      fr: "Rencontre culturelle",
      en: "Cultural gathering",
    },
    excerpt: {
      fr: "Exemple de contenu pour une rencontre culturelle future.",
      en: "Sample content for a future cultural gathering.",
    },
    description: {
      fr: "Cette fiche est fournie à titre d'exemple et ne constitue pas une invitation officielle. Les informations définitives devront être confirmées avant publication publique.",
      en: "This entry is provided as an example and is not an official invitation. Final details must be confirmed before public publication.",
    },
    category: "cultural",
    startAt: "2026-09-12T16:00:00-04:00",
    location: {
      name: {
        fr: "Lieu à confirmer",
        en: "Location to be confirmed",
      },
    },
    image: {
      src: "/images/news/consul-event.png",
      alt: {
        fr: "Image générique utilisée pour illustrer un événement culturel de démonstration.",
        en: "Generic image used to illustrate a demo cultural event.",
      },
    },
    featured: false,
    status: "scheduled",
  },
  {
    slug: "mission-consulaire-demo",
    title: {
      fr: "Mission consulaire d'information",
      en: "Consular information outreach",
    },
    excerpt: {
      fr: "Exemple d'événement montrant comment une future mission d'information pourrait être présentée.",
      en: "Sample event showing how a future information outreach may be presented.",
    },
    description: {
      fr: "Cette mission est un exemple de contenu. Elle ne confirme aucune date officielle, aucun lieu, aucune procédure et aucun service qui serait assuré lors d'un déplacement.",
      en: "This outreach entry is sample content. It does not confirm any official date, location, procedure, or service that would be provided off-site.",
    },
    category: "consular-outreach",
    startAt: "2026-10-03T10:00:00-04:00",
    location: {
      name: {
        fr: "Lieu à confirmer",
        en: "Location to be confirmed",
      },
    },
    image: {
      src: "/images/news/consul-event-passport.png",
      alt: {
        fr: "Image générique liée aux services consulaires, utilisée pour un événement de démonstration.",
        en: "Generic consular-services image used for a demo event.",
      },
    },
    featured: true,
    status: "scheduled",
  },
];

export function getEventBySlug(slug: string): ConsulateEvent | undefined {
  return events.find((event) => event.slug === slug);
}

export function getUpcomingEvents(
  referenceDate: Date = new Date()
): ConsulateEvent[] {
  const referenceTime = referenceDate.getTime();

  return events
    .filter(
      (event) =>
        event.status === "scheduled" &&
        new Date(event.startAt).getTime() >= referenceTime
    )
    .toSorted(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
}

export function getPastEvents(
  referenceDate: Date = new Date()
): ConsulateEvent[] {
  const referenceTime = referenceDate.getTime();

  return events
    .filter(
      (event) =>
        publicEventStatuses.includes(event.status) &&
        new Date(event.startAt).getTime() < referenceTime
    )
    .toSorted(
      (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
    );
}

export function getFeaturedEvents(): ConsulateEvent[] {
  return events
    .filter(
      (event) =>
        event.featured && publicEventStatuses.includes(event.status)
    )
    .toSorted(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
}
