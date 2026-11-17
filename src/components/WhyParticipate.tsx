import { Lightbulb, Network, Users, BookOpen, Globe, Award } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    icon: Lightbulb,
    title: 'Entrepreneurship & Innovation',
    description: 'Develop entrepreneurial thinking and learn to build ventures that create real value in the world.',
  },
  {
    icon: Network,
    title: 'Networking Opportunities',
    description: 'Connect with fellow students, mentors, industry professionals, and a global community of changemakers.',
  },
  {
    icon: Users,
    title: 'Teamwork & Leadership',
    description: 'Build your collaboration and leadership skills by working in diverse, motivated teams toward a common goal.',
  },
  {
    icon: BookOpen,
    title: 'Mentorship & Learning',
    description: 'Receive guidance from experienced mentors who will help you refine your ideas and develop your skills.',
  },
  {
    icon: Globe,
    title: 'Real-World Problem Solving',
    description: 'Tackle genuine global challenges and understand how business can be a force for positive social change.',
  },
  {
    icon: Award,
    title: 'Global Recognition',
    description: 'Compete on a world stage and gain recognition that could transform your academic and professional career.',
  },
]

export default function WhyParticipate() {
  return (
    <section id="why" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Benefits</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Why <span className="text-primary">Participate?</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Hult Prize is more than a competition — it&apos;s a transformative experience that will shape your future.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-200">
                <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Join the Movement Today
          </Link>
        </div>
      </div>
    </section>
  )
}
