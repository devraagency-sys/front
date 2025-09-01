/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { NextIntlClientProvider } from "next-intl";
import { CustomCursor } from "../components/CustomCursor";
import { ThemeProvider } from "../components/ThemeProvider";
import { BackgroundClouds } from "../components/BackgroundClouds";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RA AGENCY — Telegram Ads Experts",
  description:
    "RA Agency — ваш гід у світі реклами в Telegram. Залучайте нових клієнтів та просувайте свій бренд з нами.",
  keywords: [
    "Telegram реклама",
    "RA Agency",
    "просування в Telegram",
    "реклама в месенджерах",
    "агенція маркетингу",
    "таргетинг Telegram",
  ],
  openGraph: {
    title: "RA AGENCY — Telegram Ads Experts",
    description:
      "Допомагаємо бізнесам зростати через рекламу в Telegram. Професійна команда, ефективні рішення, видимий результат.",
    url: "https://ваш-домен.com",
    siteName: "RA AGENCY",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  let messages;
  const supportedLangs = ["ru", "ua", "en"];

  try {
    if (!supportedLangs.includes(lang)) {
      throw new Error(`Unsupported lang: ${lang}`);
    }

    messages = (await import(`../messages/${lang}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for lang ${lang}:`, error);
    messages = (await import("../messages/ru.json")).default;
  }
  return (
    <html lang={lang}>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K6C4PPCQ');
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1093066636004137');
              fbq('track', 'PageView');
            `,
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6C4PPCQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1093066636004137&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

        <Toaster position="top-right" />

        <ThemeProvider>
          <NextIntlClientProvider locale={lang} messages={messages}>
          <BackgroundClouds />

            <CustomCursor />

            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
