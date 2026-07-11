export type NavigationItem = {
  key: string;
  href: string;
  children?: NavigationItem[];
};

export const mainNavigation: NavigationItem[] = [
  { key: "home", href: "/" },
  {
    key: "about",
    href: "/a-propos",
    children: [
      { key: "mission", href: "/a-propos/mission" },
      {
        key: "consulMessage",
        href: "/a-propos/mot-du-consul",
      },
    ],
  },
  {
    key: "services",
    href: "/services-consulaires",
    children: [
      { key: "passport", href: "/services-consulaires/passeport" },
      {
        key: "consularCard",
        href: "/services-consulaires/carte-consulaire",
      },
      { key: "civilStatus", href: "/services-consulaires/etat-civil" },
      {
        key: "emergencyAssistance",
        href: "/services-consulaires/assistance-urgence",
      },
    ],
  },
  { key: "documents", href: "/documents" },
  { key: "news", href: "/actualites" },
  { key: "events", href: "/evenements" },
  { key: "contact", href: "/contact" },
];

export const footerNavigation: NavigationItem[] = mainNavigation.filter(
  (item) => item.href !== "/a-propos"
);
