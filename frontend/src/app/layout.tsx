import type { Metadata } from "next"; 
import "./globals.css";
import AnimatedHeader from "@/components/AnimateHeader"; 


export const metadata: Metadata = {
  title: "NeuraX",
  description: "Your Smart AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className="
      bg-gray-950
      text-white
      min-h-screen  
      ">
        <AnimatedHeader />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
