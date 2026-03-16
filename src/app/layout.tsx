// ** React
import { Suspense } from 'react';

// ** Next
import type { Metadata, Viewport } from 'next';
import { Bangers, Montserrat, Nunito } from 'next/font/google';
import Script from 'next/script';

// ** Styles
import './globals.css';

// ** Components
import { ThemeProvider } from '@/theme/ThemeProvider';
import NprogressWrapper from '@/components/common/nprogress.wrapper';
import ToasterCustom from '@/components/common/ToasterCustom';
import ScrollToTop from '@/components/common/ScrollToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import BusinessSchema from '@/components/schema/BusinessSchema';

// ** Module component
import WelcomePopup from '@/modules/home/WelcomePopup';

// ** Config
import { BASE_URL } from '@/configs/api';

// UI / Button / Filter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ui',
    display: 'swap',
});

// Title comic/ chapter
const bangers = Bangers({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-title',
    display: 'swap',
});

// Description / text comic
const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-text',
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: {
        template: '%s | Ztruyện',
        default: 'Đọc truyện tranh Manhwa, Manga, Manhua Online - Ztruyện',
    },
    description:
        'Web đọc truyện tranh manhwa, manhua, manga, ngôn tình, tiên hiệp, kiếm hiệp online hay và mới nhất cập nhật liên tục tại ztruyen.io.vn',
    generator: 'Next.js',
    applicationName: 'Ztruyen',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'doc truyen tranh',
        'manga',
        'doc manga',
        'ngon tinh',
        'tien hiep',
    ],
    authors: [
        { name: 'Cloly' },
        { name: 'Cloly', url: 'https://www.facebook.com/ree.6I6/' },
    ],
    creator: 'Cloly',
    publisher: 'Cloly',
    openGraph: {
        title: 'Đọc truyện tranh Manhwa, Manga, Manhua Online - Ztruyện ',
        description:
            'Web đọc truyện tranh manhwa, manhua, manga, ngôn tình, tiên hiệp, kiếm hiệp online hay và mới nhất cập nhật liên tục tại ztruyen.io.vn',
        url: `${BASE_URL}`,
        siteName: 'Ztruyện',
        images: [
            {
                url: '/bg.png',
                width: 1200,
                height: 630,
                alt: 'Ztruyện',
            },
        ],
        locale: 'vi_VN',
        phoneNumbers: '0326654301',
        emails: 'ree6i6x@gmail.com',
        type: 'website',
        countryName: 'Việt Nam',
    },
    alternates: {
        canonical: BASE_URL,
    },
    metadataBase: new URL(BASE_URL || ''),
    verification: {
        google: process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body
                className={`${montserrat.variable} ${bangers.variable} ${nunito.variable}`}
            >
                <BusinessSchema />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NprogressWrapper>
                        <Suspense fallback={null}>
                            <ScrollToTop />
                        </Suspense>
                        <TooltipProvider>
                            {children}
                            <Suspense fallback={null}>
                                <WelcomePopup />
                            </Suspense>
                        </TooltipProvider>
                        <ToasterCustom />
                    </NprogressWrapper>
                </ThemeProvider>
            </body>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
            </Script>
        </html>
    );
}
