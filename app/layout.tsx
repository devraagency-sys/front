'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
