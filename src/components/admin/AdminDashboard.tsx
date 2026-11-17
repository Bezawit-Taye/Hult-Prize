'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Users, UserCheck, UserSearch, BookOpen,
  Search, Download, Trash2, Eye,
  ChevronLeft, ChevronRight, Trophy,
  LogOut, RefreshCw, X, Loader2,
} from 'lucide-react'
import type { Registration } from '@/lib/types'

const ITEMS_PER_PAGE = 10

const teamStatusLabel: Record<string, string> = {
  has_team: 'Has Team',
  looking_for_team: 'Looking for Team',
  want_to_learn: 'Want to Learn',
}

const teamStatusColor: Record<string, string> = {
  has_team: 'bg-green-100 text-green-700',
  looking_for_team: 'bg-blue-100 text-blue-700',
  want_to_learn: 'bg-yellow-100 text-yellow-700',
}

export default function AdminDashboard({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [viewRecord, setViewRecord] = useState<Registration | null>(null)
  const [exporting, setExporting] = useState(false)

  const fetchRegistrations = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setRegistrations(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this registration? This action cannot be undone.'
      )
    )
      return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from('registrations').delete().eq('id', id)
    if (!error) {
      setRegistrations((prev) => prev.filter((r) => r.id !== id))
    } else {
      alert('Failed to delete. Please try again.')
    }
    setDeletingId(null)
  }

  const handleExport = async () => {
    setExporting(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      alert('Export failed. Please try again.')
      setExporting(false)
      return
    }

    const headers = [
      'Registration ID',
      'Full Name',
      'Student ID',
      'Email',
      'Phone',
      'Department',
      'Academic Year',
      'Team Status',
      'Team Name',
      'Interest',
      'Registration Date',
    ]

    const rows = data.map((r: Registration) => [
      r.id,
      r.full_name,
      r.student_id,
      r.email,
      r.phone,
      r.department,
      r.academic_year,
      teamStatusLabel[r.team_status] ?? r.team_status,
      r.team_name ?? '',
      r.interest ?? '',
      new Date(r.created_at).toLocaleString(),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'HultPrize_Registrations_2026.csv'
    a.click()
    URL.revokeObjectURL(url)
    setExporting(false)
  }

  // Filtering
  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      r.full_name.toLowerCase().includes(q) ||
      r.student_id.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    const matchDept = !filterDept || r.department === filterDept
    const matchYear = !filterYear || r.academic_year === filterYear
    const matchStatus = !filterStatus || r.team_status === filterStatus
    return matchSearch && matchDept && matchYear && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const departments = [...new Set(registrations.map((r) => r.department))].sort()
  const years = [...new Set(registrations.map((r) => r.academic_year))].sort()

  const stats = {
    total: registrations.length,
    has_team: registrations.filter((r) => r.team_status === 'has_team').length,
    looking: registrations.filter((r) => r.team_status === 'looking_for_team').length,
    want_to_learn: registrations.filter((r) => r.team_status === 'want_to_learn').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm">Hult Prize</span>
              <span className="text-xs text-gray-500 block leading-none">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-500">{userEmail}</span>
            <button
              onClick={fetchRegistrations}
              className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all Hult Prize OnCampus registrations.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Registrations', value: stats.total, icon: Users, color: 'bg-gray-900 text-white' },
            { label: 'Have a Team', value: stats.has_team, icon: UserCheck, color: 'bg-green-500 text-white' },
            { label: 'Looking for Team', value: stats.looking, icon: UserSearch, color: 'bg-blue-500 text-white' },
            { label: 'Want to Learn', value: stats.want_to_learn, icon: BookOpen, color: 'bg-yellow-500 text-white' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3 flex-1">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <select
                value={filterDept}
                onChange={(e) => { setFilterDept(e.target.value); setPage(1) }}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Departments</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                value={filterYear}
                onChange={(e) => { setFilterYear(e.target.value); setPage(1) }}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Years</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Statuses</option>
                <option value="has_team">Has Team</option>
                <option value="looking_for_team">Looking for Team</option>
                <option value="want_to_learn">Want to Learn</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={exporting || registrations.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">No registrations found</h3>
              <p className="text-sm text-gray-400">
                {registrations.length === 0
                  ? 'No students have registered yet.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['#', 'Full Name', 'Student ID', 'Email', 'Department', 'Year', 'Team Status', 'Date', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map((r, i) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {(page - 1) * ITEMS_PER_PAGE + i + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {r.full_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.student_id}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.email}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.department}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.academic_year}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              teamStatusColor[r.team_status] ?? 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {teamStatusLabel[r.team_status] ?? r.team_status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setViewRecord(r)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
                              disabled={deletingId === r.id}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === r.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => idx + 1).map((pn) => (
                      <button
                        key={pn}
                        onClick={() => setPage(pn)}
                        className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                          page === pn ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {pn}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Detail modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setViewRecord(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-5">Registration Details</h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {[
                ['Full Name', viewRecord.full_name],
                ['Student ID', viewRecord.student_id],
                ['Email', viewRecord.email],
                ['Phone', viewRecord.phone],
                ['Department', viewRecord.department],
                ['Academic Year', viewRecord.academic_year],
                ['Team Status', teamStatusLabel[viewRecord.team_status]],
                ['Team Name', viewRecord.team_name ?? '—'],
                ['Registered', new Date(viewRecord.created_at).toLocaleString()],
                ['Ref ID', viewRecord.id.split('-')[0].toUpperCase()],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </dt>
                  <dd className="text-gray-900 font-medium break-words">{value}</dd>
                </div>
              ))}
              {viewRecord.interest && (
                <div className="col-span-2">
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Interest
                  </dt>
                  <dd className="text-gray-700 leading-relaxed">{viewRecord.interest}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
