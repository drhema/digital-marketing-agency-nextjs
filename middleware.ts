import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ar'] as const
type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const response = NextResponse.next()
    // Set locale in cookie
    const locale = pathname.split('/')[1] as Locale
    response.cookies.set('locale', locale, {
      path: '/',
      maxAge: 31536000 // 1 year
    })
    return response
  }

  // Get locale from cookie or default to 'en'
  const locale = request.cookies.get('locale')?.value || 'en'
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}