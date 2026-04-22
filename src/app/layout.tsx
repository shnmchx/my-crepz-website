import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MY KREP'Z - Premium Crepes & More",
  description:
    "Nikmati crepes lezat dengan berbagai pilihan topping premium. MY KREP'Z - Crepes terenak di kota!",
  keywords: [
    "MY KREPZ",
    "crepes",
    "makanan",
    "dessert",
    "snack",
    "FNB",
    "kuliner",
  ],
  icons: {
    icon: "/mykrepz-logo.png",
  },
  openGraph: {
    title: "MY KREP'Z - Premium Crepes & More",
    description: "Crepes lezat dengan topping premium pilihan terbaik",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
