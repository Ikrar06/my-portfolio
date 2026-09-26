// components/contact-form.tsx
'use client'

import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type FormState = { 
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

type ProjectType = {
  value: string
  label: string
  description: string
  icon: string
}

type BudgetRange = {
  value: string
  label: string
  description: string
}

export default function ContactFormLite() {
  const [state, setState] = useState<FormState>({ 
    name: '', 
    email: '', 
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '' 
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const alertRef = useRef<HTMLDivElement | null>(null)

  const projectTypes: ProjectType[] = [
    {
      value: 'job',
      label: 'Full-time Role',
      description: 'AI / ML engineering or full-stack position',
      icon: ''
    },
    {
      value: 'internship',
      label: 'Internship',
      description: 'Internship or research assistant position',
      icon: ''
    },
    {
      value: 'ai-integration',
      label: 'AI / LLM Project',
      description: 'RAG, chatbots, NLP or model integration',
      icon: ''
    },
    {
      value: 'web-app',
      label: 'Web App or Dashboard',
      description: 'Full-stack web apps, internal tools, dashboards',
      icon: ''
    },
    {
      value: 'data',
      label: 'Data & ML Analysis',
      description: 'Data analysis, modeling, experiments',
      icon: ''
    },
    {
      value: 'design',
      label: 'Design',
      description: 'UI/UX or graphic design',
      icon: ''
    },
    {
      value: 'other',
      label: 'Something Else',
      description: 'Research collaboration or a question',
      icon: ''
    }
  ]

  const budgetRanges: BudgetRange[] = [
    {
      value: 'not-applicable',
      label: 'Not applicable',
      description: 'Job, internship or collaboration'
    },
    {
      value: 'under-500',
      label: 'Under $500',
      description: 'Small feature or fix'
    },
    {
      value: '500-1500',
      label: '$500 - $1,500',
      description: 'Small app, integration or prototype'
    },
    {
      value: '1500-5000',
      label: '$1,500 - $5,000',
      description: 'Complete app or AI system'
    },
    {
      value: 'above-5000',
      label: 'Above $5,000',
      description: 'Larger or ongoing work'
    },
    {
      value: 'discuss',
      label: 'Let\'s Discuss',
      description: 'Depends on scope'
    }
  ]

  const setField = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState((s) => ({ ...s, [key]: e.target.value }))

  const setSelectField = (key: keyof FormState) => (value: string) =>
    setState((s) => ({ ...s, [key]: value }))

  const validate = () => {
    const errs: string[] = []
    if (!state.name || state.name.trim().length < 2) {
      errs.push('Name must be at least 2 characters.')
    }
    if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errs.push('Please enter a valid email address.')
    }
    if (!state.projectType) {
      errs.push('Please choose what you would like to discuss.')
    }
    if (!state.message || state.message.trim().length < 20) {
      errs.push('Please add a few more details (minimum 20 characters).')
    }
    return errs
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate basic info
      if (!state.name || !state.email) {
        setError('Please fill in your name and email address.')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
        setError('Please enter a valid email address.')
        return
      }
    }
    setError(null)
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setError(null)
    setCurrentStep(currentStep - 1)
  }

  // Handle email click - open Gmail compose
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const email = 'ikrargempurtrn@gmail.com'
    const subject = encodeURIComponent('Hello from your portfolio')
    const body = encodeURIComponent('Hi Ikrar,\n\nI found your portfolio and would like to talk about:\n\n\nBest regards,')
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&subject=${subject}&body=${body}`
    
    // Open Gmail compose in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    const errs = validate()
    if (errs.length) {
      setError(errs.join(' '))
      requestAnimationFrame(() => {
        alertRef.current?.focus()
        alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }

    setSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...state,
          projectType: projectTypes.find(p => p.value === state.projectType)?.label || state.projectType,
          budget: budgetRanges.find(b => b.value === state.budget)?.label || state.budget,
        }),
        cache: 'no-store',
      })

      const data = await res.json()
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to send message.')
      }

      // Track successful submission
      try { 
        (window as any).va?.('event', 'contact_form_submit', {
          project_type: state.projectType,
          budget: state.budget
        }) 
      } catch {}

      setSuccess('Message sent. Thank you for reaching out, I will get back to you by email soon.')
      setState({ 
        name: '', 
        email: '', 
        company: '', 
        projectType: '', 
        budget: '', 
        timeline: '', 
        message: '' 
      })
      setCurrentStep(1)
      
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again or contact me directly via email.')
      requestAnimationFrame(() => {
        alertRef.current?.focus()
        alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    } finally {
      setSubmitting(false)
    }
  }

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
            Step {currentStep} of {totalSteps}
          </h3>
          <span className="text-xs sm:text-sm text-white/60">
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Topic"}
            {currentStep === 3 && "Details"}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        {/* Success/Error Messages */}
        {success && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl sm:rounded-xl border border-blue-500/40 bg-blue-500/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-blue-300"
          >
            <div>{success}</div>
          </div>
        )}

        {error && (
          <div
            ref={alertRef}
            tabIndex={-1}
            role="alert"
            className="rounded-xl sm:rounded-xl border border-red-500/40 bg-red-500/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-red-300 outline-none ring-0"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Nice to meet you!</h3>
              <p className="text-sm sm:text-base text-white/60">Let's start with who you are</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm sm:text-base text-white font-medium">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={state.name}
                  onChange={setField('name')}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/25 rounded-xl sm:rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm sm:text-base text-white font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={state.email}
                  onChange={setField('email')}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/25 rounded-xl sm:rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company" className="text-sm sm:text-base text-white font-medium">
                  Company/Organization <span className="text-white/60">(optional)</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Company Inc."
                  value={state.company}
                  onChange={setField('company')}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/25 rounded-xl sm:rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 sm:pt-4">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 md:px-8 rounded-xl sm:rounded-xl text-sm sm:text-base h-10 sm:h-11"
                disabled={!state.name || !state.email}
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">What would you like to discuss?</h3>
              <p className="text-sm sm:text-base text-white/60">Job opportunity, freelance project, or collaboration</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {/* Project Type */}
              <div className="grid gap-2 sm:gap-3">
                <Label className="text-sm sm:text-base text-white font-medium">
                  Topic *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectField('projectType')(type.value)}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-xl border text-left transition-all duration-200 ${type.value === 'other' ? 'sm:col-span-2' : ''} ${
                        state.projectType === type.value
                          ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                          : 'border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-base sm:text-xl">{type.icon}</span>
                        <div>
                          <div className="font-semibold text-sm sm:text-base">{type.label}</div>
                          <div className="text-xs sm:text-sm opacity-70">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="grid gap-2 sm:gap-3">
                <Label className="text-sm sm:text-base text-white font-medium">
                  Budget <span className="text-white/60">(freelance only, optional)</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setSelectField('budget')(budget.value)}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-xl border text-left transition-all duration-200 ${
                        state.budget === budget.value
                          ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                          : 'border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold text-xs sm:text-sm">{budget.label}</div>
                      <div className="text-[10px] sm:text-xs opacity-70">{budget.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="grid gap-2">
                <Label htmlFor="timeline" className="text-sm sm:text-base text-white font-medium">
                  Timeline or start date <span className="text-white/60">(optional)</span>
                </Label>
                <Input
                  id="timeline"
                  name="timeline"
                  placeholder="e.g. 'Start in January', 'Within 2 months', or 'Flexible'"
                  value={state.timeline}
                  onChange={setField('timeline')}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/25 rounded-xl sm:rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex justify-between pt-3 sm:pt-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl sm:rounded-xl px-4 sm:px-5 md:px-6 text-sm sm:text-base h-10 sm:h-11"
              >
                ← Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 md:px-8 rounded-xl sm:rounded-xl text-sm sm:text-base h-10 sm:h-11"
                disabled={!state.projectType}
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Project Details */}
        {currentStep === 3 && (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Almost done</h3>
              <p className="text-sm sm:text-base text-white/60">A few details help me reply with something useful</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="message" className="text-sm sm:text-base text-white font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={8}
                  placeholder="For a role: the position, team, and where you found my profile.
For a project: what you want to build, who will use it, and any existing systems or data."
                  value={state.message}
                  onChange={setField('message')}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/25 min-h-[180px] sm:min-h-[200px] rounded-xl sm:rounded-xl text-sm sm:text-base"
                />
                <p className="text-[10px] sm:text-xs text-white/50">
                  Minimum 20 characters • Current: {state.message.length}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-3 sm:pt-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl sm:rounded-xl px-4 sm:px-5 md:px-6 text-sm sm:text-base h-10 sm:h-11"
              >
                ← Back
              </Button>
              <Button
                type="submit"
                disabled={submitting || !state.message || state.message.length < 20}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 md:px-8 disabled:opacity-50 rounded-xl sm:rounded-xl text-sm sm:text-base h-10 sm:h-11"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Alternative Contact */}
        <div className="pt-4 sm:pt-6 border-t border-white/10">
          <p className="text-[10px] sm:text-xs text-white/50 text-center leading-relaxed">
            Prefer a different method? {' '}
            <button
              type="button"
              onClick={handleEmailClick}
              className="text-blue-400 hover:text-blue-300 underline transition-colors cursor-pointer"
            >
              send me an email directly
            </button>
            {' or '}
            <a
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
              href={`https://wa.me/6281214590205?text=${encodeURIComponent('Hi Ikrar! I found your portfolio and would like to talk.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              message me on WhatsApp
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  )
}