import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });
import './globals.css';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
      <body className={robotoMono.className}>
        <div className='items-center justify-items-center min-h-screen p-8 pb-20 gap-16 space-y-4'>
          <div className='space-y-2'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href='/' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                  <Link href='/pokemon' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Pokemon
                    </NavigationMenuLink>
                  </Link>
                  <Link href='/weather' legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Weather
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Separator />
          </div>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
