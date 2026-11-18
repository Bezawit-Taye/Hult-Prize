# EF Hult Prize — OnCampus Registration Portal

A complete, professional registration platform for the **EF Hult Prize — OnCampus** program, redesigned using the current official brand identity and built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 🎨 Official Brand Identity

| Color Name | Hex Code | Role |
|------------|----------|------|
| **Heritage Pink** | `#FF329B` | Primary Accent & Main Brand Color |
| **Purple** | `#8A2890` | Secondary Brand Color |
| **Midnight** | `#292563` | Headings, Navigation & Contrast Sections |
| **Ink** | `#150007` | Deep Dark Text & Primary Contrast |
| **Gallery White** | `#FFFFFF` | Background Surfaces & Clean Canvas |
| **Sky Blue** | `#12B1E7` | Occasional Accent |
| **Sun Yellow** | `#FDD40E` | Occasional Accent |
| **Aloe Green** | `#06B47A` | Occasional Accent |
| **Red** | `#FB0000` | Alert / Occasional Accent |

### Typography
- **Primary Typeface:** [Figtree](https://fonts.google.com/specimen/Figtree)
  - `Figtree Black (900)`: Hero main headlines
  - `Figtree Bold (700)`: Section titles & card headings
  - `Figtree Regular / Medium / SemiBold`: UI labels, body text, form elements

### Brand Assets
- Official logo files are stored locally in `/public`:
  - `public/hult-prize-logo-dark.png` (for white/light backgrounds)
  - `public/hult-prize-logo-light.png` (for Midnight/dark backgrounds)
  - Sourced directly from [ask.hultprize.org](https://ask.hultprize.org/en_US/our-brand-and-guidelines/logos).

---

## Features

- 🌐 **Public Landing Page**
  - Navigation bar with official logo & responsive mobile drawer
  - Hero section: *"Turn Your Ideas Into Impact."* with Figtree Black typography
  - About EF Hult Prize & United Nations SDGs alignment
  - 4-step visual flow: Register, Connect, Innovate, Compete
  - Why Participate benefits grid
  - Interactive FAQ accordion
  - Midnight brand footer with university & social placeholders
- 📝 **Student Registration Form**
  - Personal information (Name, Student ID, Email, Phone, Department, Year)
  - Team status selection & optional idea interest
  - Full client validation with duplicate prevention (Student ID & Email)
  - Generates unique reference ID upon success
- 🔒 **Organizer Admin Portal (`/admin`)**
  - Protected by Supabase Auth and Next.js middleware
  - Metric summary cards (Total, Has Team, Looking for Team, Want to Learn)
  - Search by student name, ID, or email
  - Filter by department, academic year, and team status
  - Registration detail modal inspection
  - Delete registration with confirmation
  - **Export to CSV** (Excel-compatible with all fields)

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** → paste and run `supabase/migrations/001_create_registrations.sql`.
3. In **Authentication → Users**, click **Add user → Create user** to generate your initial admin credentials.

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Find both values in **Project Settings → API**.

### 4. Run Locally

```bash
npm run dev
```

- Public Site: [http://localhost:3000](http://localhost:3000)
- Registration Form: [http://localhost:3000/register](http://localhost:3000/register)
- Admin Portal: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deployment (Vercel)

1. Push to GitHub repository.
2. Import repository at [vercel.com](https://vercel.com).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Environment Variables.
4. Deploy!

---

## Security Notes

- RLS ensures anon users can only INSERT registration records.
- Only authenticated admins can SELECT, review, or DELETE records.
- Service-role key is never exposed to the client.
