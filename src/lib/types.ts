export interface Registration {
  id: string
  full_name: string
  student_id: string
  email: string
  phone: string
  department: string
  academic_year: string
  team_status: 'has_team' | 'looking_for_team' | 'want_to_learn'
  team_name: string | null
  interest: string | null
  created_at: string
}
