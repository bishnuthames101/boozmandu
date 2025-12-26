import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Boozmandu - Nepal\'s Fastest Online Liquor Delivery',
  description: 'Order premium alcohol online with Boozmandu - Nepal\'s fastest liquor delivery service. Wide selection of whisky, vodka, beer, wine and more.',
  keywords: 'liquor delivery, alcohol delivery, booze, online alcohol, whisky, vodka, beer, wine, Nepal, Kathmandu',
  openGraph: {
    type: 'website',
    url: 'https://boozmandu.com/',
    title: 'Boozmandu - Nepal\'s Fastest Online Liquor Delivery',
    description: 'Premium alcohol delivered to your doorstep in Nepal. Wide selection of whisky, vodka, beer, wine and more.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4V2X3K6KG6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4V2X3K6KG6');
            `,
          }}
        />
      </head>
      <body className="bg-dark text-white">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
