# Site Architecture

This project is moving from an approved landing page into a small bilingual consular service platform. The current foundation remains frontend-only: shared constants, locale-aware routing, route planning, reusable page components, and typed frontend content placeholders.

## Current Structure

- `app/[locale]/` contains localized Next.js App Router entry points.
- `i18n/` contains `next-intl` routing, request, and navigation helpers.
- `messages/fr.json` and `messages/en.json` contain reusable interface translations.
- `proxy.ts` applies locale detection and locale-prefix handling before routes render.
- `component/landing/` contains the approved homepage sections.
- `component/layout/` contains the shared navbar and footer used by the homepage.
- `lib/constants/` contains institutional and navigation configuration.
- `lib/content/` contains typed frontend content arrays that will be populated later.
- `components/shared/` contains reusable page-level UI components for future internal pages.

## Localization

Supported locales are:

```txt
fr
en
```

French is the default locale. The URL strategy uses `localePrefix: "as-needed"`:

```txt
/                  French homepage
/en                English homepage
/services-consulaires
/en/services-consulaires
```

The default French locale should not be exposed as `/fr` unless a future framework constraint requires it.

Internal links that should retain locale context must use the locale-aware helpers exported from `i18n/navigation.ts`:

- `Link`
- `redirect`
- `usePathname`
- `useRouter`
- `getPathname`

Future public pages must be created under `app/[locale]/...` and must validate locale params when they introduce their own layouts or route boundaries.

Reusable interface copy belongs in `messages/fr.json` and `messages/en.json`, including navigation labels, buttons, headings, form labels, status labels, and generic instructions. Institutional facts such as phone numbers, addresses, and URLs stay in `lib/constants/consulate.ts`.

## Planned Routes

```txt
/
/a-propos
/a-propos/mission
/a-propos/mot-du-consul

/services-consulaires
/services-consulaires/[slug]

/documents

/actualites
/actualites/[slug]

/evenements
/evenements/[slug]

/contact

/demande
/demande/succes

/suivi

/admin
/admin/demandes
/admin/demandes/[id]
```

English routes use the same canonical pathnames with the `/en` prefix, for example `/en/documents` and `/en/evenements`.

## Content Plan

Consular services will become data-driven. The first implementation should use typed service objects from `lib/content/consular-services.ts`, then later connect those records to a database or CMS if the consulate needs non-technical editing. The next ticket will model bilingual consular-service content.

Announcements and events will initially use frontend objects from `lib/content/announcements.ts` and `lib/content/events.ts`. This keeps the public site simple while official content volume is still small.

Future frontend content records should support localized content fields or locale-specific records. Interface translations should remain in `next-intl` message files; data-driven records such as services, announcements, and events should not be forced into the reusable UI message catalogs.

Consular requests will later use PostgreSQL as the primary system of record. Request forms, request statuses, generated ticket numbers, admin review flows, and audit history should all persist to the database.

Email should be secondary to the database. Transactional email can notify applicants and staff, but it should not be the only place where request data, status changes, or ticket details exist.

## Future Implementation Boundaries

The following are intentionally not implemented in this foundation ticket:

- Prisma schema or migrations
- PostgreSQL connection
- Authentication or authorization
- Admin dashboard
- Consular request forms
- Ticket generation
- Resend or other transactional email integration
- Backend route handlers or server actions
