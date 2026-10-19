import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loonie — Tax tools, money coaching and quotes for Canadian freelancers",
  description: "Free GST/HST tools, income tracking with tax set-asides, and quotes with the right Canadian tax built in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
