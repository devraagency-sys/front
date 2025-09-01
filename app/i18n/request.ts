import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  console.log('Request.ts locale:', locale);
  // Fallback на 'ru', если locale не определён
  const effectiveLocale = locale || 'ru';
  try {
    const messages = (await import(`../messages/${effectiveLocale}.json`)).default;
    return { messages, locale: effectiveLocale };
  } catch (error) {
    console.error(`Failed to load messages for locale ${effectiveLocale}:`, error);
    return { messages: (await import('../messages/ru.json')).default, locale: 'ru' };
  }
});