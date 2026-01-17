import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextLand - Society Management Platform",
  description: "A digital platform to manage society content, governance, facilities, and community engagement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
