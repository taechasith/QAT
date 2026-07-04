import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, JetBrains_Mono, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { LocaleProvider } from "@/lib/i18n/context";
import { getLocale } from "@/lib/i18n/locale";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  metadataBase,
  siteUrl,
} from "@/lib/metadata";

import { t } from "@/lib/i18n/translations";

import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-thai",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  const description = tr.footer.tagline;

  return {
    metadataBase: metadataBase(),
    applicationName: SITE_NAME,
    title: {
      default: SITE_NAME,
      template: "%s | QAT",
    },
    description,
    keywords: locale === "th"
      ? [
          "Quantum Art Thailand",
          "QAT",
          "สมาคมศิลปะควอนตัมแห่งประเทศไทย",
          "วิทยาศาสตร์ควอนตัม",
          "ศิลปะควอนตัม",
          "การสื่อสารวิทยาศาสตร์",
          "เทคโนโลยีสร้างสรรค์",
          "การออกแบบปฏิสัมพันธ์",
          "ฟิสิกส์ควอนตัม"
        ]
      : [
          "Quantum Art Thailand",
          "QAT",
          "quantum art",
          "quantum science",
          "science communication",
          "creative technology",
          "Thailand",
          "quantum physics",
          "art and science"
        ],
    authors: [{ name: "CreativeLabTH Group" }],
    creator: "CreativeLabTH Group",
    publisher: SITE_NAME,
    alternates: {
      canonical: siteUrl("/"),
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/brand/QAT_Logo.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
      url: siteUrl("/"),
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description,
    },
    category: "education",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${ibmPlexSansThai.variable} ${manrope.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <LocaleProvider locale={locale}>
          <SplashScreen />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
