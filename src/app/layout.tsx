import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";

const SITE_CONFIG = {
  title: "Lucideus - Non-Anything",
  description:
    "Restricted zone detected. Unauthorized data, blacklisted sources, and contraband assets found in this sector.",
  url: "https://nonanyt.com",
  twitter: "@K_Waravit",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Lucideus",
    "Nonanyt",
    "Walker#153775",
    "Restricted zone",
    "Unauthorized data",
    "blacklisted sources",
    "contraband assets",
  ],
  authors: [{ name: "Nonanyt" }],
  creator: "Nonanyt",
  publisher: "Nonanyt",
  category: "technology",
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
  alternates: {
    canonical: "https://console.nonanyt.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.title,
    title: `${SITE_CONFIG.title} | ${SITE_CONFIG.description}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/trademarks/icon.png",
        width: 512,
        height: 512,
        alt: `${SITE_CONFIG.title} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.title} | ${SITE_CONFIG.description}`,
    description: SITE_CONFIG.description,
    images: ["/trademarks/icon.png"],
    creator: SITE_CONFIG.twitter,
    site: SITE_CONFIG.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
