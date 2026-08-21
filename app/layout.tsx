import type { Metadata } from "next";
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import { ChecklistStickyBar } from "@/components/layout/checklist-sticky-bar";
import { Footer } from "@/components/layout/footer";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { Header } from "@/components/layout/header";
import { ChecklistModalProvider } from "@/components/ui/checklist-modal-provider";
import { ConsultationModalProvider } from "@/components/ui/consultation-modal-provider";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Plan with Bijan | Estate Planning Attorney",
  description:
    "Plan with Bijan, California estate planning attorney helping families create wills, trusts, and legacy plans with clarity and care. Protect what matters most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ChecklistModalProvider>
          <ConsultationModalProvider>
            <HashScrollHandler />
            <Header />
            {children}
            <Footer />
            <ChecklistStickyBar />
          </ConsultationModalProvider>
        </ChecklistModalProvider>
      </body>
    </html>
  );
}
