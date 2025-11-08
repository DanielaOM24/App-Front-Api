/** import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middlewareDashboard(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('authorization') || null;
  const url = req.nextUrl.pathname;

  if (!token && url.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && (url === '/login' || url === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}*/

