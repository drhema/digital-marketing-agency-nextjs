import { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], display: 'swap', variable: '--font-cairo' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isArabic = params.locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mu3lnen.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: isArabic ? '%s | موصلنين' : '%s | Mu3lnen',
      default: isArabic ? 'موصلنين - وكالة التسويق الرقمي الرائدة في الكويت' : 'Mu3lnen - Leading Digital Marketing Agency in Kuwait',
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
      },
    },
  };
}

export default function RootLayout({ children, params }: Props) {
  const isRTL = params.locale === 'ar';
  
  return (
    <html lang={params.locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}