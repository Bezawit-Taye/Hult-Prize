'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is HULT PRIZE AASTU?',
    answer:
      "HULT PRIZE AASTU is the official on-campus chapter of the global Hult Prize Foundation at Addis Ababa Science and Technology University. It challenges university students to build sustainable, for-profit social enterprises addressing pressing global challenges, with winning teams competing for $1,000,000 USD in equity-free global seed capital.",
  },
  {
    question: 'Who can participate in HULT PRIZE AASTU?',
    answer:
      'Any currently enrolled student at Addis Ababa Science and Technology University (AASTU) can participate. Students from all faculties—including Electrical & Mechanical Engineering, Civil & Architecture, Applied Sciences, and Software & Computing—are warmly welcomed.',
  },
  {
    question: 'Can I register without an existing team?',
    answer:
      'Yes, absolutely! Individual students can register. The HULT PRIZE AASTU organizing team hosts team-formation workshops and mixer sessions to help you find teammates with complementary skillsets before competition stages.',
  },
  {
    question: 'Do I need a business idea to register?',
    answer:
      'No pre-existing venture or idea is needed at registration. You will receive challenge toolkits, workshops, and mentor support to brainstorm, test, and develop your innovative concept throughout the program.',
  },
  {
    question: 'Is registration free?',
    answer:
      'Yes, participating in HULT PRIZE AASTU is 100% free of charge for all registered AASTU students.',
  },
  {
    question: 'What happens after I submit my registration?',
    answer:
      'You will receive an on-screen confirmation with your unique registration reference code. The HULT PRIZE AASTU organizing team will announce orientation dates, challenge guidelines, and bootcamp schedules.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-slate-50/70 dark:bg-[#0D0B1C] border-t border-slate-100 dark:border-white/10 transition-colors duration-150">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink-light dark:bg-brand-pink/15 border border-brand-pink/20 dark:border-brand-pink/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-pink">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight dark:text-white tracking-tight uppercase">
            Questions & <span className="text-brand-pink">Answers</span>
          </h2>
          <p className="text-brand-midnight/65 dark:text-slate-300 mt-4 max-w-xl mx-auto text-base">
            Everything you need to know about joining HULT PRIZE AASTU.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-brand-pink/40 shadow-sm ring-1 ring-brand-pink/15 bg-white dark:bg-[#131024]'
                    : 'border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-[#131024]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors"
                >
                  <span
                    className={`font-bold text-base sm:text-lg transition-colors ${
                      isOpen
                        ? 'text-brand-pink'
                        : 'text-brand-midnight dark:text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-brand-pink text-white rotate-180'
                        : 'bg-slate-100 dark:bg-white/10 text-brand-midnight/60 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-brand-midnight/75 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-white/10">
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
