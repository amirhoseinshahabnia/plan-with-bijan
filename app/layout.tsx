import type { Metadata } from "next";
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
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
      className={`${bricolageGrotesque.variable} ${playfairDisplay.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Footer />
      </body>
    </html>
  );
}
