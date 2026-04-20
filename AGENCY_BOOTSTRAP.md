# 🚀 Agency SaaS Bootstrap: Strategic Index & Roadmap

Welcome to the foundational core of your agency. This project is configured with a high-performance system of "Development Skills" and "Best Practices" to ensure every SaaS project you build is world-class, secure, and AI-native.

## 🗂️ Knowledge Base (Source of Truth)
All imported skills are located in [`.antigravity/skills/`](./.antigravity/skills/). Use these as your primary reference when building:

| Skill | Category | Strategic Importance |
|-------|----------|----------------------|
| [ai-product](./.antigravity/skills/ai-product.md) | AI Core | Architecting RAG and agentic flows. |
| [product-manager-toolkit](./.antigravity/skills/product-manager-toolkit.md) | Strategy | RICE prioritization and PRD standards. |
| [nextjs-best-practices](./.antigravity/skills/nextjs-best-practices.md) | Tech Stack | App Router performance and RSC architecture. |
| [nextjs-supabase-auth](./.antigravity/skills/nextjs-supabase-auth.md) | Auth | Integration of Supabase Auth with App Router. |
| [shadcn](./.antigravity/skills/shadcn.md) | UI/UX | Component-driven design system. |
| [high-end-visual-design](./.antigravity/skills/high-end-visual-design.md) | Design | $150k+ agency-level aesthetics. |
| [stripe-integration](./.antigravity/skills/stripe-integration.md) | Business | Compliant checkout and subscription billing. |
| [supabase-automation](./.antigravity/skills/supabase-automation.md) | Data | Infrastructure automation and queries. |
| [ai-seo](./.antigravity/skills/ai-seo.md) | Growth | Answer Engine Optimization (AEO). |

---

## 🗺️ Roadmap: The Agency Launch Sequence

### Phase 1: Infrastructure Core (Completed)
- [x] Knowledge Base Initialization (`.antigravity/skills`)
- [x] Foundational Skills Import (13 Critical SaaS Skills)
- [x] Strategic Index Creation (`AGENCY_BOOTSTRAP.md`)

### Phase 2: Project Scaffold & Env (In Progress)
- [x] **Next.js Initialization**: Initialize a clean Next.js 15+ App Router project.
- [x] **Environment Security**: Configure `.env` and create `.env.example` template.
- [x] **UI Core**: Set up `tailwind-v4`, `shadcn/ui`, and the base theme architecture.

### Phase 3: The First SaaS Component
- [ ] **Auth Layer**: Implement Supabase Auth (Sign-in/Sign-up pages).
- [ ] **DB Layer**: Initialize Drizzle ORM and connect to Supabase Postgres.
- [ ] **Billing Layer**: Set up Stripe webhook handler and production-ready checkout flow.

---

## 🛡️ Critical Security & Quality Gates
- **Security**: Never expose direct DB URLs to client code. Enforce `orgId` scoping for all multi-tenant queries.
- **Aesthetics**: Follow the "Absolute Zero" visual directive—no generic fonts, no harsh shadows.
- **AI-First**: All LLM integrations MUST include structured output validation layers.

---
*Created by Antigravity AI for [Iris Agencia]*
