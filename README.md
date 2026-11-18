# HULT PRIZE AASTU — Official Registration Portal

A complete, responsive, full-stack registration and organizer management platform for **HULT PRIZE AASTU** at **Addis Ababa Science and Technology University (AASTU)**.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Resend**.

---

## 🎨 Brand Identity: HULT PRIZE AASTU

- **Main Brand Name:** **HULT PRIZE** (bold, uppercase, visually prominent)
- **Campus Lockup:** **AASTU** (Addis Ababa Science and Technology University)
- **Official Brand Palette:**
  - **Heritage Pink:** `#FF329B` (primary brand accent, buttons, focus rings, badges)
  - **Midnight:** `#292563` (headings, dark hero, organizer navigation)
  - **Purple:** `#8A2890` (secondary brand color, cards, ambient lighting)
  - **Ink:** `#150007` (deep contrast typography)
  - **Gallery White:** `#FFFFFF` (clean reading surfaces)
  - **Sky Blue:** `#12B1E7` & **Aloe Green:** `#06B47A` (status badges & accents)
- **Official Typography:** [Figtree](https://fonts.google.com/specimen/Figtree) (`Figtree Black`, `Figtree Bold`, `Figtree Medium`, `Figtree Regular`)
- **Official Logo Assets:**
  - `public/hult-prize-logo-official.jpeg` (Official square avatar/badge)
  - `public/hult-prize-logo-dark.png` (Transparent official logo for light backgrounds)
  - `public/hult-prize-logo-light.png` (Transparent official logo for dark backgrounds)

---

## 🚀 Key Features

1. **Public Website:**
   - Responsive Navigation with official logo & **HULT PRIZE AASTU** lockup
   - Hero section: *"Turn Your Ideas Into Impact."*
   - About HULT PRIZE AASTU & UN Sustainable Development Goals alignment
   - 4-step competition journey (Register, Connect, Innovate, Compete)
   - Why Participate at AASTU benefits
   - Interactive FAQ accordion
   - AASTU campus footer
2. **Student Registration Form (`/register`):**
   - Personal info (Full name, Student ID, University Email, Phone, Department, Year)
   - Participation status (Already have a team, Looking for teammates, Learning first)
   - Real-time client-side validation
   - Unique reference code generation upon submission
   - Duplicate prevention on Student ID and Email
3. **Automatic Registration Confirmation Email (Resend):**
   - Secure server-side email dispatch upon registration
   - Branded responsive HTML template for **HULT PRIZE AASTU**
   - **Fault-tolerant:** If email delivery encounters an issue, the registration is safely retained in the database and the student still receives the registration confirmation screen with their reference code.
4. **Protected Organizer Dashboard (`/admin`):**
   - Protected by Supabase Auth and Next.js middleware
   - Metrics cards (Total, Formed Teams, Looking for Team, Learning first)
   - Live search by student name, ID, or email
   - Multi-filtering by Department, Year, and Status
   - Full registration details modal
   - Delete registration with confirmation
   - **Export to CSV:** Excel-compatible download (`HultPrize_AASTU_Registrations_2026.csv`)

---

## 🛠️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase Database & Auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Resend Email Delivery
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM="HULT PRIZE AASTU <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Resend Email Setup Instructions

1. **Create an Account:**
   - Sign up at [resend.com](https://resend.com).
2. **Generate an API Key:**
   - Go to **API Keys** → **Create API Key** → name it `Hult Prize AASTU` → copy the key starting with `re_`.
   - Set `RESEND_API_KEY=re_...` in `.env.local` (and in Vercel Environment Variables).
3. **Sender Address (`EMAIL_FROM`):**
   - **Development & Testing:** Resend provides a free testing domain `onboarding@resend.dev`. Set:
     ```env
     EMAIL_FROM="HULT PRIZE AASTU <onboarding@resend.dev>"
     ```
     *(Note: With the test domain, Resend allows sending to the email registered on your Resend account).*
   - **Production Delivery:** To send emails to any student email address, go to **Resend Dashboard → Domains → Add Domain** (e.g. `mail.aastu.edu.et` or your domain), add the provided DNS records (SPF, DKIM, MX), and once verified, set:
     ```env
     EMAIL_FROM="HULT PRIZE AASTU <hultprize@yourdomain.com>"
     ```

---

## 🧪 Testing & Production Build

### Run Locally:
```bash
npm run dev
```
- Public Portal: [http://localhost:3000](http://localhost:3000)
- Registration Form: [http://localhost:3000/register](http://localhost:3000/register)
- Organizer Portal: [http://localhost:3000/admin](http://localhost:3000/admin)

### Production Build:
```bash
npm run build
```

---

## ☁️ Deployment (Vercel)

1. Push all code to your GitHub repository.
2. In [Vercel](https://vercel.com), import your repository.
3. Configure the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Deploy**.
