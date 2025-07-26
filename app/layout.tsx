import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sulemait SMS Greetings - Send Beautiful Cards via SMS",
  description:
    "Create and send personalized greeting cards through SMS. Perfect for birthdays, anniversaries, and special occasions.",
  keywords:
    "SMS greetings, greeting cards, birthday cards, anniversary cards, text messages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
