import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/']
}

export default withAuth((req) => {
  if (req.nextUrl.pathname.startsWith('/dashboard') && !req.nextauth.token?.username) {
    return NextResponse.rewrite(new URL('/dashboard', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/sign-in') && req.nextauth.token?.username) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (req.nextUrl.pathname === '/' && req.nextauth.token?.username) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}, {
  callbacks: {
    authorized: ({ token, req }) => !!token || req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname === '/',
  }
})