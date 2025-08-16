// components/ui/sort-dropdown.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type SortOption = {
  value: string
  label: string
  icon: React.ReactNode
}

const sortOptions: SortOption[] = [
  {
    value: 'newest',
    label: 'Newest first',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    )
  },
  {
    value: 'oldest',
    label: 'Oldest first',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )
  },
  {
    value: 'title',
    label: 'Title A-Z',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    value: 'featured',
    label: 'Featured first',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  }
]

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState('newest')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current sort from URL params
  useEffect(() => {
    const sortParam = searchParams.get('sort')
    if (sortParam && sortOptions.some(option => option.value === sortParam)) {
      setSelectedSort(sortParam)
    }
  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (sortValue === 'newest') {
      // Remove sort param for default
      params.delete('sort')
    } else {
      params.set('sort', sortValue)
    }

    router.push(`${pathname}?${params.toString()}`)
    setSelectedSort(sortValue)
    setIsOpen(false)
  }

  const selectedOption = sortOptions.find(option => option.value === selectedSort) || sortOptions[0]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Glassmorphism Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center gap-3 px-5 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 hover:from-blue-100/60 hover:to-blue-150/40 dark:hover:from-blue-950/30 dark:hover:to-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm group"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* Glass overlay for depth */}
        <div className={`
          absolute inset-0 rounded-2xl backdrop-blur-sm transition-all duration-300
          ${isOpen 
            ? 'bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/10' 
            : 'bg-white/5 border border-white/10 dark:bg-white/2 dark:border-white/5 opacity-0 group-hover:opacity-100'
          }
        `} />
        
        <div className="relative flex items-center gap-2 z-10">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Sort by:
          </span>
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <span className="text-blue-600 dark:text-blue-400">
              {selectedOption.icon}
            </span>
            <span className="font-medium">{selectedOption.label}</span>
          </div>
        </div>
        <svg 
          className={`relative z-10 w-4 h-4 transition-all duration-300 text-blue-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Glassmorphism Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-3 w-72 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl shadow-lg z-50 py-3 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
            
            {/* Header */}
            <div className="px-5 py-3 border-b border-blue-100/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Sort Projects By
                </span>
                <span className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/20 px-2 py-0.5 rounded-xl ml-auto font-medium">
                  {sortOptions.length} options
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="py-2">
              {sortOptions.map((option, index) => {
                const isSelected = selectedSort === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-sm transition-all duration-200 group relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-50/80 to-blue-100/80 dark:from-blue-950/50 dark:to-blue-900/50 text-blue-800 dark:text-blue-200 font-semibold shadow-sm' 
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/30'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Selection Indicator */}
                    <div className={`w-1 h-8 rounded-full transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg' 
                        : 'bg-transparent group-hover:bg-blue-300/50'
                    }`} />
                    
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 shadow-sm' 
                        : 'bg-neutral-100/50 dark:bg-neutral-700/50 text-neutral-500 group-hover:bg-blue-100/70 group-hover:text-blue-500'
                    }`}>
                      {option.icon}
                    </div>
                    
                    {/* Label */}
                    <div className="flex-1 text-left">
                      <span className="block font-medium">{option.label}</span>
                      <span className={`text-xs transition-colors ${
                        isSelected 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-neutral-500 dark:text-neutral-400 group-hover:text-blue-500'
                      }`}>
                        {option.value === 'newest' ? 'Default sorting' :
                         option.value === 'oldest' ? 'Reverse chronological' :
                         option.value === 'title' ? 'Alphabetical order' :
                         'Prioritize featured'}
                      </span>
                    </div>

                    {/* Check Mark */}
                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-xl shadow-sm">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Hover Indicator */}
                    {!isSelected && (
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600 group-hover:border-blue-400 transition-colors" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-blue-100/50 dark:border-blue-800/30">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-blue-700 dark:text-blue-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Press ESC to close
                </span>
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {selectedOption.label}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}