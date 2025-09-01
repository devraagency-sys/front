import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('Middleware URL:', request.nextUrl.pathname);
  console.log('Middleware locale:', request.nextUrl.locale);

  const pathname = request.nextUrl.pathname;

  const locale = pathname.startsWith('/ru')
    ? 'ru'
    : pathname.startsWith('/ua')
    ? 'ua'
    : pathname.startsWith('/en')
    ? 'en'
    : 'ru'; // или 'en', если английский основной

  console.log('Extracted locale:', locale);

  return createMiddleware({
    locales: ['ru', 'ua', 'en'],
    defaultLocale: 'ru', // можно заменить на 'en' при необходимости
    localePrefix: 'always',
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
