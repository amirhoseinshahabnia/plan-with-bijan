import type { Metadata } from "next";
import { Be_Vietnam_Pro, Tinos } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});

const tinos = Tinos({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-tinos",
});

export const metadata: Metadata = {
  title: "Plan with Bijan | Estate Planning Attorney",
  description:
    "Plan with Bijan — California estate planning attorney helping families create wills, trusts, and legacy plans with clarity and care. Protect what matters most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} ${tinos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
