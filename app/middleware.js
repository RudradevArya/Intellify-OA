// import { NextResponse } from 'next/server'
// import { getCurrentUser } from '@/lib/supabase'

// export async function middleware(request) {
//   const user = await getCurrentUser()

//   if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/signup')) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// }
import { NextResponse } from 'next/server'
import { supabase } from './lib/supabase'

export async function middleware(request) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}