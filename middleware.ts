// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for bypass parameter - for testing/development
  // Usage: add ?bypass=dev123 to any URL to access the site
  const bypassParam = request.nextUrl.searchParams.get('bypass')

  if (bypassParam === 'dev123') {
    // Set cookie to remember bypass for 1 hour
    const response = NextResponse.next()
    response.cookies.set('maintenance-bypass', 'true', {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
      sameSite: 'strict'
    })
    return response
  }

  // Check if user has bypass cookie
  const bypassCookie = request.cookies.get('maintenance-bypass')
  if (bypassCookie?.value === 'true') {
    return NextResponse.next()
  }

  // Allow access to maintenance page and static assets
  if (
    request.nextUrl.pathname === '/maintenance' ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/images') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect all other routes to maintenance page
  return NextResponse.redirect(new URL('/maintenance', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
