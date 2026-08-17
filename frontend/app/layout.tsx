import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { PublicLayoutWrapper } from "@/components/Layout/PublicLayoutWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Team Astrion | Serene Community Yoga Studio",
  description: "Experience serene yoga classes in a welcoming, earth-toned community space. Move, connect, and transform with Vinyasa, Hatha, Yin, and Meditation sessions at Team Astrion.",
  keywords: "yoga, yoga studio, vinyasa, hatha, meditation, mindfulness, wellness, health, serenity, Team Astrion",
  authors: [{ name: "Team Astrion" }],
  openGraph: {
    title: "Team Astrion | Serene Community Yoga Studio",
    description: "Experience serene yoga classes in a welcoming, earth-toned community space. Move, connect, and transform at Team Astrion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-astrian-oat text-astrian-charcoal min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-astrian-sage selection:text-white dark:bg-[#121413] dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id-for-build'}>
            <AuthProvider>
              <PublicLayoutWrapper>
                {children}
              </PublicLayoutWrapper>
            </AuthProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

