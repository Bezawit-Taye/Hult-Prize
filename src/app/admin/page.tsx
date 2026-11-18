import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata = {
  title: 'Admin Dashboard | HULT PRIZE AASTU',
  description: 'Organizer management portal for HULT PRIZE AASTU registrations.',
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return <AdminDashboard userEmail={user.email ?? ''} />
}
