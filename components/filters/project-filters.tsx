// components/filters/project-filters.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface ProjectFiltersProps {
  allCategories: string[]
  allSkills: string[]
  allTags: string[]
  allYears: number[]
  selectedTags: string[]
  selectedCategories: string[]
  selectedSkills: string[]
  selectedYears: number[]
}

export default function ProjectFilters({
  allCategories,
  allSkills,
  allTags,
  allYears,
  selectedTags,
  selectedCategories,
  selectedSkills,
  selectedYears,
}: ProjectFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // State untuk UI interactions
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    skills: false,
    tags: false,
    years: false,
  })

  // Helper function untuk update URL dengan multiple values
  const updateFilters = useCallback((type: string, value: string | number, action: 'add' | 'remove' | 'clear') => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Get current values
    const currentValues = params.get(type)?.split(',').filter(Boolean) || []
    
    let newValues: string[] = []
    
    if (action === 'add') {
      // Add value if not already present
      if (!currentValues.includes(String(value))) {
        newValues = [...currentValues, String(value)]
      } else {
        newValues = currentValues
      }
    } else if (action === 'remove') {
      // Remove specific value
      newValues = currentValues.filter(v => v !== String(value))
    } else if (action === 'clear') {
      // Clear all values for this type
      newValues = []
    }

    // Update or remove param
    if (newValues.length > 0) {
      params.set(type, newValues.join(','))
    } else {
      params.delete(type)
    }

    // Navigate to new URL
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  // Toggle individual filter
  const toggleFilter = useCallback((type: string, value: string | number) => {
    const currentValues = type === 'tags' ? selectedTags 
                        : type === 'categories' ? selectedCategories 
                        : type === 'skills' ? selectedSkills 
                        : selectedYears.map(String)

    const isSelected = currentValues.includes(String(value))
    updateFilters(type, value, isSelected ? 'remove' : 'add')
  }, [selectedTags, selectedCategories, selectedSkills, selectedYears, updateFilters])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Helper functions untuk menentukan apakah quick filter sedang aktif
  const isFeaturedActive = selectedTags.includes('featured')
  const isCurrentYearActive = selectedYears.includes(new Date().getFullYear())
  const isUXActive = selectedCategories.includes('UI/UX Design')
  const isWebDevActive = selectedCategories.includes('Web Development')

  // Filter items with counts
  const FilterSection = ({ 
    title, 
    type, 
    items, 
    selectedItems, 
    icon,
    colorClasses,
    isExpanded,
    onToggle 
  }: {
    title: string
    type: string
    items: (string | number)[]
    selectedItems: (string | number)[]
    icon: React.ReactNode
    colorClasses: string
    isExpanded: boolean
    onToggle: () => void
  }) => {
    const displayItems = isExpanded ? items : items.slice(0, 6)
    const hasMore = items.length > 6

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            {icon}
            <span>{title}</span>
            <span className="text-xs text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-xl">
              {items.length}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform text-blue-600 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {selectedItems.length > 0 && (
            <button
              onClick={() => updateFilters(type, '', 'clear')}
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 px-3 py-1 rounded-xl transition-colors"
            >
              Clear ({selectedItems.length})
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {displayItems.map((item) => {
              const isSelected = selectedItems.includes(item)
              return (
                <button
                  key={item}
                  onClick={() => toggleFilter(type, item)}
                  className={`
                    px-4 py-3 text-sm rounded-2xl border transition-all text-left hover:shadow-sm
                    ${isSelected 
                      ? colorClasses
                      : 'border-neutral-200 text-neutral-700 hover:border-blue-300 hover:bg-blue-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-blue-600 dark:hover:bg-blue-950/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-current' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
                    <span className="font-medium truncate">
                      {type === 'tags' ? `#${item}` : item}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        
      </div>
    )
  }

  const hasAnyFilters = selectedTags.length > 0 || selectedCategories.length > 0 || selectedSkills.length > 0 || selectedYears.length > 0

  return (
    <div className="space-y-6">
      {/* Header with clear all */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Browse by Filters
        </h2>

        {hasAnyFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-2xl border border-blue-500 hover:border-blue-600 transition-colors shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All Filters
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Categories */}
        {allCategories.length > 0 && (
          <FilterSection
            title="Categories"
            type="categories"
            items={allCategories}
            selectedItems={selectedCategories}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            colorClasses="bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-600/50 dark:text-blue-200 shadow-blue-100 dark:shadow-blue-900/20"
            isExpanded={expandedSections.categories}
            onToggle={() => toggleSection('categories')}
          />
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <FilterSection
            title="Skills & Tools"
            type="skills"
            items={allSkills}
            selectedItems={selectedSkills}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            colorClasses="bg-blue-200/70 border-blue-400/60 text-blue-900 dark:bg-blue-800/50 dark:border-blue-500/50 dark:text-blue-100"
            isExpanded={expandedSections.skills}
            onToggle={() => toggleSection('skills')}
          />
        )}

        {/* Tags */}
        {allTags.length > 0 && (
          <FilterSection
            title="Tags"
            type="tags"
            items={allTags}
            selectedItems={selectedTags}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
            colorClasses="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-700/50 dark:text-blue-300"
            isExpanded={expandedSections.tags}
            onToggle={() => toggleSection('tags')}
          />
        )}

        {/* Years */}
        {allYears.length > 0 && (
          <FilterSection
            title="Years"
            type="years"
            items={allYears}
            selectedItems={selectedYears}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            colorClasses="bg-blue-300/50 border-blue-400/50 text-blue-800 dark:bg-blue-700/30 dark:border-blue-600/50 dark:text-blue-200"
            isExpanded={expandedSections.years}
            onToggle={() => toggleSection('years')}
          />
        )}
      </div>

      {/* Quick Filter Presets - FIXED HIGHLIGHTING */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Filters
        </h3>
        <div className="flex flex-wrap gap-3">
          {/* Featured Projects Button */}
          <button
            onClick={() => router.push(`${pathname}?tags=featured`)}
            className={`px-4 py-2.5 text-sm font-medium rounded-2xl transition-all shadow-sm hover:shadow-md ${
              isFeaturedActive
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50'
            }`}
          >
            ⭐ Featured Projects
          </button>

          {/* This Year Button */}
          <button
            onClick={() => router.push(`${pathname}?years=${new Date().getFullYear()}`)}
            className={`px-4 py-2.5 text-sm font-medium rounded-2xl transition-all shadow-sm hover:shadow-md ${
              isCurrentYearActive
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50'
            }`}
          >
            📅 This Year
          </button>

          
        </div>
      </div>

      {/* Filter Statistics */}
      {hasAnyFilters && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Filters Active
              </span>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              {selectedTags.length + selectedCategories.length + selectedSkills.length + selectedYears.length} filter{selectedTags.length + selectedCategories.length + selectedSkills.length + selectedYears.length !== 1 ? 's' : ''} applied
            </div>
          </div>
        </div>
      )}
    </div>
  )
}