// components/project/SmartFinalResults.tsx
'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

interface SmartFinalResultsProps {
  final: string[]
  title: string
}

export default function SmartFinalResults({ final, title }: SmartFinalResultsProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [orientations, setOrientations] = useState<{ [key: number]: 'portrait' | 'landscape' }>({})

  const handleImageLoad = useCallback((index: number, img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const orientation = aspectRatio < 1 ? 'portrait' : 'landscape'
    
    setOrientations(prev => ({ ...prev, [index]: orientation }))
    setLoadedImages(prev => new Set([...prev, index]))
  }, [])

  const getColumnSpan = (index: number) => {
    if (!loadedImages.has(index)) {
      return 'col-span-2 opacity-0' // Hidden until loaded, default size
    }
    
    const orientation = orientations[index]
    if (orientation === 'landscape') {
      // Landscape: 2 kolom di desktop (lebih kecil), 2 kolom di mobile
      return 'col-span-2 lg:col-span-2' 
    } else {
      // Portrait: 5 kolom di desktop (lebih besar), 2 kolom di mobile
      return 'col-span-2 lg:col-span-5' 
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Final Results</h2>
      
      {/* Grid 10 kolom untuk fleksibilitas yang lebih baik */}
      <div className="grid grid-cols-4 lg:grid-cols-10 gap-4 auto-rows-min">
        {final.map((src: string, index: number) => {
          const isLoaded = loadedImages.has(index)
          const orientation = orientations[index]
          
          return (
            <figure
              key={`final-${index}`}
              className={`
                group overflow-hidden rounded-xl border border-neutral-200 bg-white 
                dark:border-neutral-800 dark:bg-neutral-900 shadow-sm 
                hover:shadow-lg transition-all duration-300
                ${getColumnSpan(index)}
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
              }}
            >
              <div className="relative w-full">
                <Image
                  src={src}
                  alt={`${title} — final result ${index + 1}`}
                  width={2160} // Increased for better quality
                  height={2160} // Square fallback, will be adjusted by aspect ratio
                  quality={100} // Maximum quality
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                  className={`
                    w-full h-auto object-cover group-hover:scale-105 
                    transition-transform duration-500
                    ${orientation === 'portrait' ? 'aspect-auto' : 'aspect-auto'}
                  `}
                  {...(index < 4 ? { priority: true } : { loading: "lazy" })}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement
                    handleImageLoad(index, img)
                  }}
                  style={{
                    // Preserve original aspect ratio
                    aspectRatio: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Loading indicator */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                  <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </figure>
          )
        })}
      </div>
      
      {/* Debug info (hapus di production) */}
      <div className="text-xs text-neutral-500 mt-4">
        Loaded: {loadedImages.size}/{final.length} | 
        Portraits: {Object.values(orientations).filter(o => o === 'portrait').length} | 
        Landscapes: {Object.values(orientations).filter(o => o === 'landscape').length}
      </div>
    </div>
  )
}

// Alternative dengan CSS Grid yang lebih advanced
export function AdvancedFinalResults({ final, title }: SmartFinalResultsProps) {
  const [imageData, setImageData] = useState<{ 
    [key: number]: { 
      loaded: boolean; 
      orientation: 'portrait' | 'landscape';
      aspectRatio: number;
    } 
  }>({})

  const handleImageLoad = useCallback((index: number, img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const orientation = aspectRatio < 1 ? 'portrait' : 'landscape'
    
    setImageData(prev => ({
      ...prev,
      [index]: { loaded: true, orientation, aspectRatio }
    }))
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Final Results</h2>
      
      {/* Advanced CSS Grid dengan auto-fit */}
      <div 
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Kembali ke auto-fit
          gridAutoRows: 'min-content'
        }}
      >
        {final.map((src: string, index: number) => {
          const data = imageData[index]
          const isLoaded = data?.loaded || false
          const orientation = data?.orientation
          const aspectRatio = data?.aspectRatio || 1
          
          return (
            <figure
              key={`final-advanced-${index}`}
              className={`
                group overflow-hidden rounded-xl border border-neutral-200 bg-white 
                dark:border-neutral-800 dark:bg-neutral-900 shadow-sm 
                hover:shadow-lg transition-all duration-500
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
              style={{
                // Dynamic grid column span based on aspect ratio
                gridColumn: isLoaded 
                  ? orientation === 'landscape' 
                    ? 'span 3' // Landscape jadi 2 kolom (turun dari 3)
                    : 'span 1' // Portrait tetap 1 kolom
                  : 'span 1',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="relative w-full">
                <Image
                  src={src}
                  alt={`${title} — final result ${index + 1}`}
                  width={orientation === 'landscape' ? 3840 : 2400} // Landscape resolution lebih tinggi
                  height={orientation === 'landscape' ? 2160 : 2400} // 4K untuk landscape
                  quality={100} // Maximum quality
                  sizes={
                    orientation === 'landscape' 
                      ? "(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw" // Sizes untuk span 2
                      : "(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" // Sizes untuk span 1
                  }
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  {...(index < 3 ? { priority: true } : { loading: "lazy" })}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement
                    handleImageLoad(index, img)
                  }}
                  style={{
                    // Maintain original aspect ratio perfectly
                    aspectRatio: isLoaded ? aspectRatio : 'auto',
                    objectFit: 'cover',
                    height: 'auto'
                  }}
                />
              </div>
              
              {/* Enhanced loading indicator */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                  <div className="relative">
                    <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-10 h-10 border-3 border-emerald-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
                  </div>
                </div>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}

// Advanced Exploration - Dynamic masonry with aspect ratio adaptation
export function AdvancedExploration({ final, title }: SmartFinalResultsProps) {
  const [imageData, setImageData] = useState<{ 
    [key: number]: { 
      loaded: boolean; 
      orientation: 'portrait' | 'landscape' | 'square';
      aspectRatio: number;
      width: number;
      height: number;
    } 
  }>({})

  const handleImageLoad = useCallback((index: number, img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const width = img.naturalWidth
    const height = img.naturalHeight
    
    let orientation: 'portrait' | 'landscape' | 'square'
    if (aspectRatio > 1.2) orientation = 'landscape'
    else if (aspectRatio < 0.8) orientation = 'portrait'
    else orientation = 'square'
    
    setImageData(prev => ({
      ...prev,
      [index]: { loaded: true, orientation, aspectRatio, width, height }
    }))
  }, [])

  // Calculate dynamic dimensions based on aspect ratio
  const getItemStyle = (data: typeof imageData[0] | undefined) => {
    if (!data?.loaded) {
      return {
        aspectRatio: '1',
        minHeight: '200px'
      }
    }

    const { aspectRatio, orientation } = data
    
    // Base dimensions
    let gridColumnSpan = 1
    let calculatedHeight = 'auto'
    
    // Dynamic column spanning based on aspect ratio
    if (orientation === 'landscape') {
      if (aspectRatio > 2) {
        gridColumnSpan = 3 // Very wide images (panoramic)
      } else if (aspectRatio > 1.5) {
        gridColumnSpan = 2 // Wide images
      } else {
        gridColumnSpan = 1 // Slightly wide images
      }
    } else if (orientation === 'portrait') {
      gridColumnSpan = 1 // Portrait always 1 column
    } else {
      gridColumnSpan = 1 // Square images
    }

    return {
      gridColumn: `span ${gridColumnSpan}`,
      aspectRatio: aspectRatio.toString(),
      minHeight: orientation === 'portrait' ? '300px' : '200px'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Exploration Results</h2>
      
      {/* Dynamic masonry grid that adapts to image ratios */}
      <div 
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gridAutoRows: 'min-content',
          gridAutoFlow: 'row dense' // Allow items to fill gaps
        }}
      >
        {final.map((src: string, index: number) => {
          const data = imageData[index]
          const isLoaded = data?.loaded || false
          const itemStyle = getItemStyle(data)
          
          return (
            <figure
              key={`exploration-${index}`}
              className={`
                group overflow-hidden rounded-2xl border border-neutral-200 bg-white 
                dark:border-neutral-800 dark:bg-neutral-900 shadow-sm 
                hover:shadow-lg transition-all duration-500
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
              style={itemStyle}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`${title} — exploration ${index + 1}`}
                  fill
                  quality={95}
                  sizes={
                    data?.orientation === 'landscape' && data.aspectRatio > 1.5
                      ? "(min-width: 1280px) 66vw, (min-width: 768px) 80vw, 100vw" // Wide images
                      : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" // Normal images
                  }
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  {...(index < 6 ? { priority: true } : { loading: "lazy" })}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement
                    handleImageLoad(index, img)
                  }}
                />
              </div>
              
              {/* Loading state with aspect ratio placeholder */}
              {!isLoaded && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"
                  style={{ minHeight: '200px' }}
                >
                  <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              

            </figure>
          )
        })}
      </div>
    </div>
  )
}