import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// 👇 Укажи путь к request.ts (относительно корня проекта)
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', 'upload.wikimedia.org'],
  },
};

export default withNextIntl(nextConfig);
