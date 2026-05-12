import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ປ້ອງກັນທຸກ route ທີ່ matcher ກວດພົບ (ຍົກເວັ້ນ /admin ເອງທີ່ບໍ່ໄດ້ຢູ່ໃນ matcher)
  const adminAuth = request.cookies.get('adminAuth')?.value;

  if (adminAuth !== 'true') {
    const loginUrl = new URL('/admin', request.url);
    loginUrl.searchParams.set('unauthorized', '1');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // ກວດສອບທຸກ path ໃນ /admin ຍົກເວັ້ນ /admin ເອງ (login page)
  matcher: ['/admin/:path+'],
};
