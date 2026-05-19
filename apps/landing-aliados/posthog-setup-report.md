<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the `landing-aliados` Next.js 16.1.1 (App Router) project.

## What was done

- **`instrumentation-client.ts`** (new): PostHog client-side initialization using the Next.js 15.3+ recommended approach. Enables autocapture, session replay, and exception tracking automatically.
- **`next.config.ts`** (updated): Added reverse proxy rewrites for `/ingest/*` → PostHog, so analytics requests route through the app's own domain (avoids ad blockers, improves reliability). Also added `skipTrailingSlashRedirect: true`.
- **`.env.local`** (updated): `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` written securely.
- **6 events** instrumented across 4 files (see table below).
- **User identification**: on hero email submit, unete form submit, and CTA form submit — PostHog `identify()` is called with the user's email to link events across sessions.

> **Action required**: Run `pnpm add posthog-js` in the project root to install the package. The sandbox prevented automatic installation.

## Event tracking summary

| Event | Description | File |
|---|---|---|
| `hero_email_submitted` | User submitted a valid email in the hero section and was redirected to /unete | `src/components/landing/02-hero.tsx` |
| `navbar_cta_clicked` | User clicked the 'Únete gratis' CTA button in the navbar (desktop or mobile) | `src/components/landing/01-navbar.tsx` |
| `unete_form_submitted` | User submitted the full clinic registration form on /unete — top conversion event | `src/app/(pages)/unete/page.tsx` |
| `unete_service_toggled` | User toggled a service selection in the /unete registration form | `src/app/(pages)/unete/page.tsx` |
| `cta_form_submitted` | User submitted the quick CTA form in the landing page footer section | `src/components/landing/12-cta-form.tsx` |
| `demo_booked_clicked` | User clicked 'Agenda una Demo' — high-intent action indicating readiness to talk to sales | `src/components/landing/11-faq.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/430439/dashboard/1601443)
- [Registration funnel: Hero email → Form submitted](https://us.posthog.com/project/430439/insights/z8vpjaDE)
- [Hero email submissions over time](https://us.posthog.com/project/430439/insights/tLq46SOc)
- [Clinic registrations over time](https://us.posthog.com/project/430439/insights/6GJfHVqA)
- [Navbar CTA clicks by location](https://us.posthog.com/project/430439/insights/cNzcn3lB)
- [Demo booking intent clicks](https://us.posthog.com/project/430439/insights/hrd7iQRq)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
