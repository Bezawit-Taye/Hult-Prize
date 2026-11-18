'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Users,
  UserCheck,
  UserSearch,
  BookOpen,
  Search,
  Download,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  LogOut,
  RefreshCw,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import type { Registration } from '@/lib/types'
import Logo from '@/components/Logo'
import Link from 'next/link'

const ITEMS_PER_PAGE = 10

const teamStatusLabel: Record<string, string> = {
  has_team: 'Has Team',
  looking_for_team: 'Looking for Team',
  want_to_learn: 'Want to Learn',
}

const teamStatusBadge: Record<string, string> = {
  has_team: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  looking_for_team: 'bg-sky-50 text-sky-700 border border-sky-200/80',
  want_to_learn: 'bg-purple-50 text-brand-purple border border-brand-purple/20',
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
      alert('Failed to delete registration. Please try again.')
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

  // Multi-field search & filters
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
    <div className="min-h-screen bg-slate-50/70 flex flex-col">
      {/* Top Navigation Bar with Midnight Background */}
      <header className="bg-brand-midnight text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="light" size="sm" campusName="Organizer Portal" href="/admin" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <span className="hidden md:block text-xs font-medium text-gray-300 border-l border-white/20 pl-3">
              {userEmail}
            </span>

            <button
              onClick={fetchRegistrations}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-brand-pink px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Title & Live Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-midnight tracking-tight">
              Registration Management
            </h1>
            <p className="text-xs sm:text-sm text-brand-midnight/60 mt-1">
              Review, filter, inspect, and export all campus student registrations.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={exporting || registrations.length === 0}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-pink text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-brand-pink-hover shadow-md shadow-brand-pink/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export Registrations (CSV)</span>
          </button>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Registrations',
              value: stats.total,
              icon: Users,
              color: 'bg-brand-midnight text-white',
              badge: 'All Students',
            },
            {
              label: 'Have a Team',
              value: stats.has_team,
              icon: UserCheck,
              color: 'bg-emerald-600 text-white',
              badge: 'Formed Teams',
            },
            {
              label: 'Looking for Team',
              value: stats.looking,
              icon: UserSearch,
              color: 'bg-brand-blue text-white',
              badge: 'Teammates Wanted',
            },
            {
              label: 'Want to Learn',
              value: stats.want_to_learn,
              icon: BookOpen,
              color: 'bg-brand-purple text-white',
              badge: 'Workshops First',
            },
          ].map(({ label, value, icon: Icon, color, badge }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {badge}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand-midnight font-mono">
                  {value}
                </div>
                <div className="text-xs font-semibold text-brand-midnight/65 mt-0.5">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name, ID, or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all text-brand-midnight placeholder:text-slate-400"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDept}
              onChange={(e) => {
                setFilterDept(e.target.value)
                setPage(1)
              }}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-brand-midnight bg-white focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Academic Year Filter */}
            <select
              value={filterYear}
              onChange={(e) => {
                setFilterYear(e.target.value)
                setPage(1)
              }}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-brand-midnight bg-white focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all"
            >
              <option value="">All Academic Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Team Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setPage(1)
              }}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-brand-midnight bg-white focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all"
            >
              <option value="">All Team Statuses</option>
              <option value="has_team">Has Team</option>
              <option value="looking_for_team">Looking for Team</option>
              <option value="want_to_learn">Want to Learn</option>
            </select>

            {/* Clear Filters Button (Visible if active) */}
            {(search || filterDept || filterYear || filterStatus) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setFilterDept('')
                  setFilterYear('')
                  setFilterStatus('')
                  setPage(1)
                }}
                className="text-xs font-bold text-brand-pink hover:text-brand-pink-hover px-2 py-1"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-brand-pink" />
              <p className="text-xs font-semibold text-brand-midnight/60">
                Loading database records...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-brand-midnight text-base mb-1">
                No registrations found
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                {registrations.length === 0
                  ? 'No students have submitted registration forms yet.'
                  : 'No registrations match your current search terms or filters.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80">
                      {[
                        '#',
                        'Full Name',
                        'Student ID',
                        'Email',
                        'Department',
                        'Year',
                        'Team Status',
                        'Date',
                        'Actions',
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3.5 text-[11px] font-bold text-brand-midnight/70 uppercase tracking-wider whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginated.map((r, i) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3.5 text-slate-400 text-xs font-mono">
                          {(page - 1) * ITEMS_PER_PAGE + i + 1}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-brand-midnight whitespace-nowrap">
                          {r.full_name}
                        </td>
                        <td className="px-4 py-3.5 text-brand-midnight/70 font-mono text-xs">
                          {r.student_id}
                        </td>
                        <td className="px-4 py-3.5 text-brand-midnight/70 max-w-xs truncate">
                          {r.email}
                        </td>
                        <td className="px-4 py-3.5 text-brand-midnight/70 whitespace-nowrap">
                          {r.department}
                        </td>
                        <td className="px-4 py-3.5 text-brand-midnight/70 whitespace-nowrap">
                          {r.academic_year}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              teamStatusBadge[r.team_status] ?? 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {teamStatusLabel[r.team_status] ?? r.team_status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap text-xs">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewRecord(r)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-sky-50 transition-colors"
                              title="View Registration Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(r.id)}
                              disabled={deletingId === r.id}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Delete Record"
                            >
                              {deletingId === r.id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3.5 border-t border-slate-100 bg-white">
                  <p className="text-xs text-brand-midnight/60 font-medium">
                    Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-midnight disabled:opacity-30 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => idx + 1).map((pn) => (
                      <button
                        key={pn}
                        type="button"
                        onClick={() => setPage(pn)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                          page === pn
                            ? 'bg-brand-midnight text-white'
                            : 'text-brand-midnight/70 hover:bg-slate-100'
                        }`}
                      >
                        {pn}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-midnight disabled:opacity-30 hover:bg-slate-100 transition-colors"
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

      {/* Registration Detail Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-midnight/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7 relative border border-slate-100">
            <button
              type="button"
              onClick={() => setViewRecord(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-brand-midnight rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
              <h3 className="text-xl font-black text-brand-midnight tracking-tight">
                Registration Details
              </h3>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs sm:text-sm">
              {[
                ['Full Name', viewRecord.full_name],
                ['Student ID', viewRecord.student_id],
                ['Email', viewRecord.email],
                ['Phone', viewRecord.phone],
                ['Department', viewRecord.department],
                ['Academic Year', viewRecord.academic_year],
                ['Team Status', teamStatusLabel[viewRecord.team_status] ?? viewRecord.team_status],
                ['Team Name', viewRecord.team_name ?? '—'],
                ['Registered Date', new Date(viewRecord.created_at).toLocaleString()],
                ['Reference ID', viewRecord.id.split('-')[0].toUpperCase()],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </dt>
                  <dd className="text-brand-midnight font-semibold break-words">{value}</dd>
                </div>
              ))}

              {viewRecord.interest && (
                <div className="col-span-2 pt-2 border-t border-slate-100 mt-2">
                  <dt className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    What interests you most about EF Hult Prize?
                  </dt>
                  <dd className="text-brand-midnight/80 font-normal leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                    {viewRecord.interest}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
