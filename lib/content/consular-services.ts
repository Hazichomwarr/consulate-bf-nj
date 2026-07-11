export type SupportedLocale = "fr" | "en";

export type LocalizedText = Record<SupportedLocale, string>;

export type ServiceStatus = "active" | "coming-soon" | "unavailable";

export type ServiceStep = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ServiceFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type ServiceMeta = {
  label: LocalizedText;
  value: LocalizedText;
};

export type ServiceCta = {
  label: LocalizedText;
  href: string;
};

export type ConsularService = {
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  overview: LocalizedText;
  whoItIsFor: LocalizedText[];
  servicesIncluded: LocalizedText[];
  requiredDocuments: LocalizedText[];
  steps: ServiceStep[];
  fees: ServiceMeta;
  processingTime: ServiceMeta;
  importantNotes: LocalizedText[];
  faq: ServiceFaq[];
  cta: ServiceCta;
  status: ServiceStatus;
};

const toConfirm: LocalizedText = {
  fr: "À confirmer auprès du consulat.",
  en: "To be confirmed with the consulate.",
};

export const consularServices: ConsularService[] = [
  {
    slug: "passeport",
    name: {
      fr: "Passeport",
      en: "Passport",
    },
    shortDescription: {
      fr: "Orientation pour préparer une demande liée au passeport et organiser les prochaines étapes avec le consulat.",
      en: "Guidance for preparing a passport-related request and organizing next steps with the consulate.",
    },
    heroTitle: {
      fr: "Services de passeport",
      en: "Passport Services",
    },
    heroDescription: {
      fr: "Préparez les informations nécessaires, rassemblez vos documents et demandez une orientation avant toute démarche officielle.",
      en: "Prepare the necessary information, organize your documents, and request guidance before any official procedure.",
    },
    overview: {
      fr: "Ce service aide les usagers à comprendre comment préparer une demande liée au passeport, organiser les documents disponibles et solliciter des indications sur les étapes à suivre. L'utilisation du site ne constitue pas le dépôt officiel d'une demande de passeport.",
      en: "This service helps users understand how to prepare a passport-related request, organize available documents, and request guidance on next steps. Using the website does not constitute the official submission of a passport application.",
    },
    whoItIsFor: [
      {
        fr: "Ressortissants burkinabè recherchant des informations sur une démarche liée au passeport.",
        en: "Burkinabè citizens seeking information about a passport-related process.",
      },
      {
        fr: "Usagers souhaitant préparer leurs documents avant un échange avec le consulat.",
        en: "Users who want to prepare their documents before contacting the consulate.",
      },
    ],
    servicesIncluded: [
      {
        fr: "Orientation générale sur les informations à préparer.",
        en: "General guidance on information to prepare.",
      },
      {
        fr: "Aide à l'organisation des documents disponibles.",
        en: "Help organizing available documents.",
      },
      {
        fr: "Demande d'information ou de rendez-vous auprès du consulat.",
        en: "Request for information or an appointment with the consulate.",
      },
    ],
    requiredDocuments: [toConfirm],
    steps: [
      {
        title: {
          fr: "Préparer les informations de base",
          en: "Prepare basic information",
        },
        description: {
          fr: "Rassemblez vos coordonnées, l'objet de votre demande et les documents déjà disponibles.",
          en: "Gather your contact details, the purpose of your request, and any documents already available.",
        },
      },
      {
        title: {
          fr: "Soumettre une demande d'orientation",
          en: "Submit a guidance request",
        },
        description: {
          fr: "Utilisez le service en ligne pour demander les prochaines étapes, sans considérer cette démarche comme un dépôt officiel de passeport.",
          en: "Use the online service to request next steps, without treating it as an official passport application submission.",
        },
      },
      {
        title: {
          fr: "Attendre les indications du consulat",
          en: "Wait for consular guidance",
        },
        description: {
          fr: "Le consulat précisera les informations ou démarches complémentaires lorsqu'elles auront été confirmées.",
          en: "The consulate will provide additional confirmed information or next steps when available.",
        },
      },
    ],
    fees: {
      label: {
        fr: "Frais",
        en: "Fees",
      },
      value: toConfirm,
    },
    processingTime: {
      label: {
        fr: "Délai de traitement",
        en: "Processing time",
      },
      value: toConfirm,
    },
    importantNotes: [
      {
        fr: "La plateforme prépare la demande d'information; elle ne remplace pas une procédure officielle de passeport.",
        en: "The platform prepares an information request; it does not replace an official passport procedure.",
      },
      {
        fr: "Les pièces exigées, frais, délais et modalités officielles doivent être confirmés par le consulat.",
        en: "Required documents, fees, timelines, and official procedures must be confirmed by the consulate.",
      },
    ],
    faq: [
      {
        question: {
          fr: "La demande en ligne vaut-elle dépôt officiel de passeport ?",
          en: "Does the online request count as an official passport application?",
        },
        answer: {
          fr: "Non. Elle sert uniquement à préparer une demande d'orientation et à faciliter les prochaines étapes avec le consulat.",
          en: "No. It is only used to prepare a guidance request and help coordinate next steps with the consulate.",
        },
      },
      {
        question: {
          fr: "Quels documents dois-je fournir ?",
          en: "Which documents do I need to provide?",
        },
        answer: toConfirm,
      },
    ],
    cta: {
      label: {
        fr: "Préparer une demande",
        en: "Prepare a request",
      },
      href: "/demande?service=passeport",
    },
    status: "active",
  },
  {
    slug: "carte-consulaire",
    name: {
      fr: "Carte consulaire",
      en: "Consular Card",
    },
    shortDescription: {
      fr: "Préparation d'une demande liée à l'inscription consulaire ou à la carte consulaire.",
      en: "Preparation for a request related to consular registration or the consular card.",
    },
    heroTitle: {
      fr: "Carte consulaire",
      en: "Consular Card",
    },
    heroDescription: {
      fr: "Organisez vos informations et sollicitez une orientation concernant la carte consulaire.",
      en: "Organize your information and request guidance regarding the consular card.",
    },
    overview: {
      fr: "Ce service accompagne les usagers dans la préparation d'une demande d'information relative à l'inscription consulaire ou à la carte consulaire. Les conditions, pièces, frais et durées de validité doivent être confirmés par le consulat.",
      en: "This service supports users in preparing an information request related to consular registration or the consular card. Eligibility, documents, fees, and validity periods must be confirmed by the consulate.",
    },
    whoItIsFor: [
      {
        fr: "Ressortissants burkinabè souhaitant se renseigner sur l'inscription consulaire.",
        en: "Burkinabè citizens seeking information about consular registration.",
      },
      {
        fr: "Usagers préparant une demande liée à la carte consulaire.",
        en: "Users preparing a request related to the consular card.",
      },
    ],
    servicesIncluded: [
      {
        fr: "Préparation des informations nécessaires à la demande.",
        en: "Preparation of the information needed for the request.",
      },
      {
        fr: "Organisation des documents disponibles avant contact avec le consulat.",
        en: "Organization of available documents before contacting the consulate.",
      },
      {
        fr: "Demande d'information ou de rendez-vous selon les indications du consulat.",
        en: "Request for information or an appointment according to consular guidance.",
      },
    ],
    requiredDocuments: [toConfirm],
    steps: [
      {
        title: {
          fr: "Rassembler vos informations",
          en: "Gather your information",
        },
        description: {
          fr: "Préparez vos coordonnées, votre situation consulaire et les documents déjà en votre possession.",
          en: "Prepare your contact details, consular situation, and any documents already in your possession.",
        },
      },
      {
        title: {
          fr: "Demander une orientation",
          en: "Request guidance",
        },
        description: {
          fr: "Transmettez une demande d'information afin que les prochaines étapes puissent être précisées.",
          en: "Send an information request so that next steps can be clarified.",
        },
      },
      {
        title: {
          fr: "Suivre les indications reçues",
          en: "Follow the guidance received",
        },
        description: {
          fr: "Les modalités officielles seront confirmées par le consulat avant toute démarche complémentaire.",
          en: "Official procedures will be confirmed by the consulate before any additional step.",
        },
      },
    ],
    fees: {
      label: {
        fr: "Frais",
        en: "Fees",
      },
      value: toConfirm,
    },
    processingTime: {
      label: {
        fr: "Délai de traitement",
        en: "Processing time",
      },
      value: toConfirm,
    },
    importantNotes: [
      {
        fr: "Les conditions d'éligibilité, documents requis, frais et durées de validité ne sont pas confirmés dans cette plateforme.",
        en: "Eligibility, required documents, fees, and validity periods are not confirmed in this platform.",
      },
    ],
    faq: [
      {
        question: {
          fr: "Puis-je confirmer mon éligibilité en ligne ?",
          en: "Can I confirm my eligibility online?",
        },
        answer: toConfirm,
      },
      {
        question: {
          fr: "La plateforme délivre-t-elle une carte consulaire ?",
          en: "Does the platform issue a consular card?",
        },
        answer: {
          fr: "Non. Elle sert à préparer une demande d'information ou d'orientation auprès du consulat.",
          en: "No. It is used to prepare an information or guidance request with the consulate.",
        },
      },
    ],
    cta: {
      label: {
        fr: "Préparer une demande",
        en: "Prepare a request",
      },
      href: "/demande?service=carte-consulaire",
    },
    status: "active",
  },
  {
    slug: "etat-civil",
    name: {
      fr: "État civil",
      en: "Civil Status",
    },
    shortDescription: {
      fr: "Orientation concernant les demandes liées aux documents d'état civil.",
      en: "Guidance for requests related to civil-status documents.",
    },
    heroTitle: {
      fr: "État civil",
      en: "Civil Status",
    },
    heroDescription: {
      fr: "Demandez une orientation sur les démarches liées aux documents de naissance, mariage, décès ou autres actes.",
      en: "Request guidance on matters related to birth, marriage, death, or other civil-status documents.",
    },
    overview: {
      fr: "Ce service permet de solliciter une orientation concernant des documents ou démarches d'état civil, notamment les documents de naissance, de mariage, de décès, la transcription, la légalisation ou les demandes de documents. La disponibilité de chaque procédure auprès de ce consulat doit être confirmée.",
      en: "This service lets users request guidance regarding civil-status documents or procedures, including birth, marriage, death-related documents, transcription, legalization, or document requests. The availability of each procedure through this consulate must be confirmed.",
    },
    whoItIsFor: [
      {
        fr: "Usagers ayant besoin d'informations sur une démarche d'état civil.",
        en: "Users who need information about a civil-status matter.",
      },
      {
        fr: "Personnes préparant une demande de document ou une demande d'orientation.",
        en: "People preparing a document request or a guidance request.",
      },
    ],
    servicesIncluded: [
      {
        fr: "Orientation sur les documents de naissance, de mariage ou de décès.",
        en: "Guidance on birth, marriage, or death-related documents.",
      },
      {
        fr: "Demande d'information sur la transcription, la légalisation ou les demandes de documents.",
        en: "Information request about transcription, legalization, or document requests.",
      },
      {
        fr: "Organisation des informations avant contact avec le consulat.",
        en: "Organization of information before contacting the consulate.",
      },
    ],
    requiredDocuments: [toConfirm],
    steps: [
      {
        title: {
          fr: "Identifier la démarche concernée",
          en: "Identify the relevant matter",
        },
        description: {
          fr: "Précisez si votre demande concerne une naissance, un mariage, un décès, une transcription, une légalisation ou un autre document.",
          en: "Clarify whether your request concerns a birth, marriage, death, transcription, legalization, or another document.",
        },
      },
      {
        title: {
          fr: "Préparer les documents disponibles",
          en: "Prepare available documents",
        },
        description: {
          fr: "Rassemblez les pièces déjà disponibles sans supposer qu'elles constituent la liste officielle complète.",
          en: "Gather documents already available without assuming they are the complete official list.",
        },
      },
      {
        title: {
          fr: "Demander confirmation au consulat",
          en: "Request confirmation from the consulate",
        },
        description: {
          fr: "Le consulat confirmera si la démarche est disponible et quelles informations sont nécessaires.",
          en: "The consulate will confirm whether the procedure is available and what information is required.",
        },
      },
    ],
    fees: {
      label: {
        fr: "Frais",
        en: "Fees",
      },
      value: toConfirm,
    },
    processingTime: {
      label: {
        fr: "Délai de traitement",
        en: "Processing time",
      },
      value: toConfirm,
    },
    importantNotes: [
      {
        fr: "La mention d'un type de document ne confirme pas que la procédure est officiellement assurée par ce consulat.",
        en: "Mentioning a document type does not confirm that the procedure is officially handled by this consulate.",
      },
      {
        fr: "Les exigences officielles doivent être confirmées avant toute démarche.",
        en: "Official requirements must be confirmed before any procedure.",
      },
    ],
    faq: [
      {
        question: {
          fr: "Puis-je demander une orientation pour plusieurs types d'actes ?",
          en: "Can I request guidance for several types of records?",
        },
        answer: {
          fr: "Oui, vous pouvez indiquer le contexte de votre demande afin que le consulat puisse orienter les prochaines étapes.",
          en: "Yes, you can explain the context of your request so the consulate can guide next steps.",
        },
      },
      {
        question: {
          fr: "Les frais et délais sont-ils publiés ici ?",
          en: "Are fees and timelines published here?",
        },
        answer: toConfirm,
      },
    ],
    cta: {
      label: {
        fr: "Préparer une demande",
        en: "Prepare a request",
      },
      href: "/demande?service=etat-civil",
    },
    status: "active",
  },
  {
    slug: "assistance-urgence",
    name: {
      fr: "Assistance d'urgence",
      en: "Emergency Assistance",
    },
    shortDescription: {
      fr: "Orientation consulaire en cas de situation urgente affectant un ressortissant burkinabè.",
      en: "Consular guidance for urgent situations affecting a Burkinabè national.",
    },
    heroTitle: {
      fr: "Assistance d'urgence",
      en: "Emergency Assistance",
    },
    heroDescription: {
      fr: "Demandez une orientation consulaire pour une situation urgente, tout en contactant immédiatement les services locaux en cas de danger immédiat.",
      en: "Request consular guidance for an urgent situation while immediately contacting local services in case of immediate danger.",
    },
    overview: {
      fr: "Ce service permet de signaler une situation urgente nécessitant une orientation consulaire, par exemple la perte de documents de voyage ou un incident grave affectant un ressortissant burkinabè. En cas d'urgence policière, médicale ou d'incendie immédiate, contactez d'abord les services d'urgence locaux.",
      en: "This service lets users report an urgent situation requiring consular guidance, such as loss of travel documents or a serious incident affecting a Burkinabè national. For immediate police, medical, or fire emergencies, contact local emergency services first.",
    },
    whoItIsFor: [
      {
        fr: "Ressortissants burkinabè confrontés à une situation urgente nécessitant une orientation consulaire.",
        en: "Burkinabè citizens facing an urgent situation requiring consular guidance.",
      },
      {
        fr: "Familles ou proches cherchant à signaler une situation grave affectant un ressortissant burkinabè.",
        en: "Families or close contacts seeking to report a serious situation affecting a Burkinabè national.",
      },
    ],
    servicesIncluded: [
      {
        fr: "Orientation en cas de perte de documents de voyage.",
        en: "Guidance in case of lost travel documents.",
      },
      {
        fr: "Signalement d'incidents graves affectant des ressortissants burkinabè.",
        en: "Reporting serious incidents affecting Burkinabè nationals.",
      },
      {
        fr: "Orientation vers les ressources locales appropriées lorsque nécessaire.",
        en: "Orientation toward appropriate local resources when needed.",
      },
    ],
    requiredDocuments: [],
    steps: [
      {
        title: {
          fr: "Assurer la sécurité immédiate",
          en: "Ensure immediate safety",
        },
        description: {
          fr: "En cas de danger immédiat, contactez d'abord les services locaux de police, d'incendie ou d'urgence médicale.",
          en: "In case of immediate danger, contact local police, fire, or medical emergency services first.",
        },
      },
      {
        title: {
          fr: "Décrire la situation",
          en: "Describe the situation",
        },
        description: {
          fr: "Indiquez les faits essentiels, le lieu, les personnes concernées et les coordonnées permettant un suivi.",
          en: "Provide the essential facts, location, people involved, and contact details for follow-up.",
        },
      },
      {
        title: {
          fr: "Attendre l'orientation consulaire",
          en: "Await consular guidance",
        },
        description: {
          fr: "Le consulat pourra orienter vers les démarches ou ressources appropriées selon les informations disponibles.",
          en: "The consulate may provide guidance on appropriate steps or resources based on available information.",
        },
      },
    ],
    fees: {
      label: {
        fr: "Frais",
        en: "Fees",
      },
      value: toConfirm,
    },
    processingTime: {
      label: {
        fr: "Délai de réponse",
        en: "Response time",
      },
      value: toConfirm,
    },
    importantNotes: [
      {
        fr: "Pour toute urgence immédiate concernant la police, les pompiers ou une assistance médicale, contactez les services d'urgence locaux.",
        en: "For any immediate police, fire, or medical emergency, contact local emergency services.",
      },
      {
        fr: "Aucun numéro d'urgence consulaire n'est publié ici tant qu'il n'a pas été confirmé officiellement.",
        en: "No consular emergency number is published here until it has been officially confirmed.",
      },
    ],
    faq: [
      {
        question: {
          fr: "Que faire en cas de danger immédiat ?",
          en: "What should I do in case of immediate danger?",
        },
        answer: {
          fr: "Contactez immédiatement les services locaux de police, d'incendie ou d'urgence médicale avant de solliciter une orientation consulaire.",
          en: "Immediately contact local police, fire, or medical emergency services before requesting consular guidance.",
        },
      },
      {
        question: {
          fr: "Existe-t-il un numéro d'urgence consulaire ?",
          en: "Is there a consular emergency number?",
        },
        answer: toConfirm,
      },
    ],
    cta: {
      label: {
        fr: "Demander une orientation urgente",
        en: "Request urgent guidance",
      },
      href: "/demande?service=assistance-urgence",
    },
    status: "active",
  },
];

export function getConsularServiceBySlug(
  slug: string
): ConsularService | undefined {
  return consularServices.find((service) => service.slug === slug);
}

export function getActiveConsularServices(): ConsularService[] {
  return consularServices.filter((service) => service.status === "active");
}

export function getLocalizedText(
  value: LocalizedText,
  locale: SupportedLocale
): string {
  return value[locale];
}
