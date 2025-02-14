import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/.well-known',
  '/api/',
  '/_next'
] as const

function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some(publicPath => path.startsWith(publicPath))
}

const locales = ['en', 'ar'] as const
type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }
  
  // Skip if already on a locale path with trailing slash
  if (locales.some(locale => pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  // Get user's preferred language
  const acceptLanguage = request.headers.get('accept-language')
  let defaultLocale: Locale = 'en'
  
  if (acceptLanguage?.toLowerCase().includes('ar')) {
    defaultLocale = 'ar'
  }

  // Add trailing slash if missing
  if (!pathname.endsWith('/')) {
    const url = new URL(request.url)
    url.pathname = `${pathname}/`
    return NextResponse.redirect(url)
  }

  // Redirect root to detected language
  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/`, request.url))
  }

  // Add locale prefix to all other paths
  const url = new URL(request.url)
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Match all paths except excluded ones
    '/((?!api|_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|\\.well-known|.*\\..*).*)',
  ],
}