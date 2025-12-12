// app/maintenance/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Under Maintenance',
  description: 'Portfolio is currently under maintenance. We\'ll be back soon with an improved experience.',
}

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-bg-secondary border border-border flex items-center justify-center">
          <svg className="w-12 h-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-framer-blue/10 border border-framer-blue/20 text-framer-blue">
          <span className="w-2 h-2 bg-framer-blue rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Under Maintenance</span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            We're Making Improvements
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto">
            Portfolio is currently being updated with exciting new features and improvements.
            We'll be back shortly with an even better experience.
          </p>
        </div>

        {/* Details */}
        <div className="p-6 rounded-2xl bg-bg-secondary border border-border space-y-3">
          <div className="flex items-start gap-3 text-left">
            <svg className="w-5 h-5 text-framer-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">What's happening?</p>
              <p className="text-sm text-text-secondary">We're rebranding and upgrading the portfolio to better showcase data science and ML engineering work.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-left">
            <svg className="w-5 h-5 text-framer-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">When will it be back?</p>
              <p className="text-sm text-text-secondary">Expected to be back online within a few hours. Thank you for your patience!</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pt-4">
          <p className="text-sm text-text-secondary mb-4">
            Need to get in touch urgently?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:ikrargempurtrn@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-framer-blue text-white rounded-full hover:bg-framer-blue-hover transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/ikrar-gempur-tirani-867537283/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary rounded-full hover:bg-bg-secondary hover:border-border-hover transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
