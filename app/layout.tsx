import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });
import './globals.css';

export const metadata: Metadata = {
  title: 'pokemon auto chess stats',
  description: 'Advanced analytics for PAC.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}
