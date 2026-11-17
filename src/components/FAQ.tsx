'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is Hult Prize?',
    answer:
      "Hult Prize is the world's largest student competition for social entrepreneurship. Each year, it challenges university students around the globe to solve pressing social issues through innovative and sustainable business ventures, with the winning team receiving $1 million USD in seed funding.",
  },
  {
    question: 'Who can participate?',
    answer:
      'Any currently enrolled university student can participate. There are no restrictions on your field of study, year, or background. We welcome students from all departments and academic levels — diversity of thought is what drives innovation.',
  },
  {
    question: 'Can I register without an existing team?',
    answer:
      "Absolutely! Many participants register as individuals looking for teammates. Our OnCampus program creates opportunities for students to connect and form teams. Simply select \"Looking for teammates\" during registration and we'll help you find the right team.",
  },
  {
    question: 'Do I need an existing business idea?',
    answer:
      'No, you do not need an existing idea to register. The global challenge and theme are announced by Hult Prize, and teams develop their solutions throughout the program. What you need is curiosity, passion, and a willingness to learn.',
  },
  {
    question: 'Is registration free?',
    answer:
      'Yes, registration for Hult Prize OnCampus is completely free. Our goal is to make this opportunity accessible to every student, regardless of financial background.',
  },
  {
    question: 'What happens after registration?',
    answer:
      "After registering, our organizing team will contact you with further details about upcoming events, workshops, and team formation opportunities. You'll receive updates about the OnCampus competition schedule and next steps to prepare your submission.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
