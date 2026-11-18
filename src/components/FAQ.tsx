'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is EF Hult Prize?',
    answer:
      "The EF Hult Prize is the world's largest student competition for social entrepreneurship. Each year, it challenges university students globally to solve pressing social issues through viable, scalable for-profit business ventures, with the winning team awarded $1,000,000 USD in equity-free seed capital.",
  },
  {
    question: 'Who can participate in OnCampus?',
    answer:
      'Any currently enrolled university student can participate regardless of faculty, major, or academic year. Multidisciplinary teams combining business, engineering, design, and science backgrounds often build the most resilient ventures.',
  },
  {
    question: 'Can I register without an existing team?',
    answer:
      'Yes, absolutely! Many students register individually. Through our OnCampus team formation workshops and networking sessions, we assist you in connecting with complementary teammates before competition day.',
  },
  {
    question: 'Do I need an existing business idea to join?',
    answer:
      'No pre-existing venture or business idea is required. The official challenge prompt will guide you, and our workshops, mentors, and resources will help your team brainstorm, validate, and develop an idea from scratch.',
  },
  {
    question: 'Is registration completely free?',
    answer:
      'Yes, participating in the EF Hult Prize — OnCampus program is 100% free of charge for all eligible university students.',
  },
  {
    question: 'What happens after I register?',
    answer:
      'Upon submitting your registration, you will receive a confirmation with your unique reference ID. Our campus organizing committee will contact you with orientation schedules, masterclasses, challenge toolkits, and team matching events.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight tracking-tight">
            Frequently Asked <span className="text-brand-pink">Questions</span>
          </h2>
          <p className="text-brand-midnight/65 mt-4 max-w-xl mx-auto text-base">
            Everything you need to know about participating in EF Hult Prize — OnCampus.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-brand-pink/40 shadow-sm ring-1 ring-brand-pink/15'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors"
                >
                  <span
                    className={`font-bold text-base sm:text-lg transition-colors ${
                      isOpen ? 'text-brand-pink' : 'text-brand-midnight'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-brand-pink text-white rotate-180' : 'bg-slate-100 text-brand-midnight/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-brand-midnight/75 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
