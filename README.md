# Hult Prize OnCampus Registration Portal

A complete, professional registration platform for the Hult Prize OnCampus program, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## Features

- 🌐 **Public landing page** — Hero, About, How It Works, Why Participate, FAQ, Footer
- 📝 **Student registration form** — validation, duplicate prevention, success confirmation with reference ID
- 🔒 **Protected admin dashboard** — authentication, search, filters, pagination, detail modal, CSV export
- 🗄️ **Supabase backend** — PostgreSQL with Row Level Security

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `supabase/migrations/001_create_registrations.sql`
3. Go to **Authentication → Users** → **Add user → Create new user** — set your admin email and password

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find both values in **Supabase → Project Settings → API**.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customization Checklist

Before going live, update these placeholders:

| File | Placeholder | Replace with |
|------|------------|--------------|
| `src/app/layout.tsx` | `[Your University Name]` | Your university |
| `src/components/Footer.tsx` | `[Your University Name]` | Your university |
| `src/components/Footer.tsx` | `[contact@youruniversity.edu]` | Your email |
| `src/components/Footer.tsx` | Social media `href="#"` | Real URLs |

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in **Vercel → Settings → Environment Variables**
4. Deploy

---

## Admin Dashboard

- URL: `/admin`
- Unauthenticated users are redirected to `/admin/login`
- Use the credentials you created in Supabase Authentication

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── register/page.tsx        # Registration form
│   ├── admin/
│   │   ├── page.tsx             # Dashboard (protected)
│   │   └── login/page.tsx       # Admin login
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── HowItWorks.tsx
│   ├── WhyParticipate.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── RegistrationForm.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       └── AdminDashboard.tsx
├── lib/
│   ├── types.ts
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
└── middleware.ts
supabase/
└── migrations/
    └── 001_create_registrations.sql
```

---

## Security Notes

- The Supabase **anon key** is safe to use in the frontend — RLS policies restrict what it can do.
- Never expose the **service-role key** in client-side code.
- RLS ensures public users can only INSERT; they cannot read the registration list.
- Admin access is protected by Supabase Auth + Next.js middleware.
