export type ConsulateAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type ConsulateOfficeHours = {
  label: string;
  note?: string;
};

export type ConsulateInfo = {
  officialName: string;
  shortName: string;
  jurisdiction: string;
  description: string;
  phone: string;
  email: string;
  emergencyPhone: string | null;
  address: ConsulateAddress;
  googleMapsUrl: string | null;
  officeHours: ConsulateOfficeHours;
  facebookUrl: string | null;
  officialGovernmentUrl: string | null;
};

export const consulateInfo: ConsulateInfo = {
  officialName: "Consulate of Burkina Faso in New Jersey",
  shortName: "Consulate of Burkina Faso",
  jurisdiction: "New Jersey",
  description:
    "The official Consulate of Burkina Faso in New Jersey providing passport services, consular assistance, travel documentation, and support for Burkinabè citizens.",
  phone: "(973) 522-2250",
  email: "info@consulatebf-nj.org",
  emergencyPhone: null,
  address: {
    line1: "123 Market Street",
    line2: "Suite 200",
    city: "Newark",
    state: "NJ",
    postalCode: "07102",
    country: "USA",
  },
  googleMapsUrl: null,
  officeHours: {
    label: "Mon - Fri: 9:00 AM - 5:00 PM",
    note: "Closed on US & BF Holidays",
  },
  facebookUrl: null,
  officialGovernmentUrl: "https://www.gouvernement.gov.bf",
};

export const formatAddress = (address: ConsulateAddress) =>
  [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.postalCode}`,
    address.country,
  ].filter(Boolean);

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const emailHref = (email: string) => `mailto:${email}`;
