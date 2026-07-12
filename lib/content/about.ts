import type { LocalizedText } from "./consular-services";

export type AboutSection = {
  title: LocalizedText;
  body: LocalizedText;
};

export type AboutPageContent = {
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  overview: LocalizedText;
  role: AboutSection;
  whoItServes: LocalizedText[];
  priorities: LocalizedText[];
};

export type MissionPageContent = {
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  statement: LocalizedText;
  principles: AboutSection[];
  commitments: LocalizedText[];
};

export type ConsulPortrait = {
  src: string;
  alt: LocalizedText;
};

export type ConsulMessageContent = {
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  consulName: LocalizedText;
  consulTitle: LocalizedText;
  portrait?: ConsulPortrait;
  message: LocalizedText;
  signature: LocalizedText;
  isPlaceholder: boolean;
};

export const aboutPageContent: AboutPageContent = {
  heroTitle: {
    fr: "À propos du Consulat",
    en: "About the Consulate",
  },
  heroDescription: {
    fr: "Découvrez le rôle institutionnel du consulat et les publics qu'il accompagne.",
    en: "Learn about the consulate's institutional role and the communities it supports.",
  },
  overview: {
    fr: "Le Consulat du Burkina Faso au New Jersey est présenté sur cette plateforme comme un point d'information et d'orientation pour les usagers recherchant des services consulaires. Les informations institutionnelles détaillées doivent être confirmées par le consulat avant publication officielle.",
    en: "The Consulate of Burkina Faso in New Jersey is presented on this platform as an information and guidance point for users seeking consular services. Detailed institutional information must be confirmed by the consulate before official publication.",
  },
  role: {
    title: {
      fr: "Rôle du consulat",
      en: "Role of the consulate",
    },
    body: {
      fr: "Le consulat accompagne les usagers dans l'accès à l'information consulaire, l'orientation administrative et la préparation de démarches nécessitant une confirmation officielle.",
      en: "The consulate supports users with access to consular information, administrative guidance, and preparation for procedures that require official confirmation.",
    },
  },
  whoItServes: [
    {
      fr: "Ressortissants burkinabè résidant ou se trouvant dans la juridiction indiquée par le consulat.",
      en: "Burkinabè citizens residing or located within the jurisdiction indicated by the consulate.",
    },
    {
      fr: "Membres de la diaspora recherchant une orientation consulaire générale.",
      en: "Members of the diaspora seeking general consular guidance.",
    },
    {
      fr: "Usagers ayant besoin d'informations publiques avant une démarche administrative.",
      en: "Users who need public information before an administrative procedure.",
    },
  ],
  priorities: [
    {
      fr: "Fournir une information claire, bilingue et accessible.",
      en: "Provide clear, bilingual, and accessible information.",
    },
    {
      fr: "Orienter les usagers vers les services consulaires appropriés.",
      en: "Guide users toward the appropriate consular services.",
    },
    {
      fr: "Mettre à jour les informations lorsque des éléments officiels sont confirmés.",
      en: "Update information when official details are confirmed.",
    },
  ],
};

export const missionPageContent: MissionPageContent = {
  heroTitle: {
    fr: "Mission",
    en: "Mission",
  },
  heroDescription: {
    fr: "Une présentation générale des principes de service qui guident la plateforme consulaire.",
    en: "A general presentation of the service principles that guide the consular platform.",
  },
  statement: {
    fr: "La mission présentée sur cette page consiste à faciliter l'accès à l'information consulaire, à orienter les usagers avec clarté et à préparer les démarches qui nécessitent un échange avec le consulat. Cette formulation reste générique jusqu'à validation officielle par le consulat.",
    en: "The mission presented on this page is to facilitate access to consular information, guide users clearly, and help prepare procedures that require communication with the consulate. This wording remains generic until officially validated by the consulate.",
  },
  principles: [
    {
      title: {
        fr: "Clarté",
        en: "Clarity",
      },
      body: {
        fr: "Présenter les informations dans un langage institutionnel, lisible et compréhensible.",
        en: "Present information in institutional, readable, and understandable language.",
      },
    },
    {
      title: {
        fr: "Accessibilité",
        en: "Accessibility",
      },
      body: {
        fr: "Rendre les informations publiques disponibles en français et en anglais.",
        en: "Make public information available in French and English.",
      },
    },
    {
      title: {
        fr: "Prudence",
        en: "Care",
      },
      body: {
        fr: "Distinguer les informations confirmées des éléments encore à valider par le consulat.",
        en: "Distinguish confirmed information from details that still need consular validation.",
      },
    },
  ],
  commitments: [
    {
      fr: "Maintenir une information publique structurée et cohérente.",
      en: "Maintain structured and consistent public information.",
    },
    {
      fr: "Aider les usagers à identifier le service adapté à leur besoin.",
      en: "Help users identify the service suited to their needs.",
    },
    {
      fr: "Éviter toute présentation comme procédure officielle lorsque les modalités ne sont pas confirmées.",
      en: "Avoid presenting anything as an official procedure when details are not confirmed.",
    },
  ],
};

export const consulMessageContent: ConsulMessageContent = {
  heroTitle: {
    fr: "Mot du Consul",
    en: "Message from the Consul",
  },
  heroDescription: {
    fr: "Cette page est prête à accueillir le message officiel du Consul lorsqu'il sera fourni.",
    en: "This page is ready to host the official message from the Consul when provided.",
  },
  consulName: {
    fr: "Nom du Consul à confirmer",
    en: "Consul name to be confirmed",
  },
  consulTitle: {
    fr: "Titre officiel à confirmer",
    en: "Official title to be confirmed",
  },
  message: {
    fr: "Le message officiel du Consul n'a pas encore été fourni. Une fois validé par le consulat, cet espace présentera le mot d'accueil, les priorités institutionnelles et les informations destinées à la communauté.",
    en: "The official message from the Consul has not yet been provided. Once validated by the consulate, this space will present the welcome message, institutional priorities, and information intended for the community.",
  },
  signature: {
    fr: "Signature à confirmer",
    en: "Signature to be confirmed",
  },
  isPlaceholder: true,
};
