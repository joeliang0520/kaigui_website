import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaiGui Ornament | Custom Lapel Pin Manufacturer",
  description: "Direct-to-factory custom lapel pin manufacturing. Hard enamel, soft enamel, die struck, and more. 50+ years of craftsmanship from Kunshan, China.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-text-dark">
        {children}
      </body>
    </html>
  );
}
