 
import { Outfit } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";
import NextAuthSessionProvider from "./provider";
import { signIn, useSession } from "next-auth/react"; 
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "book N pay",
  description: "Service & Consultation App ",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
        <div className="mx-6 md:mx-16">
          <Header />
          <Toaster/>
          {children}
        </div>
        </NextAuthSessionProvider>
    
      </body>
    </html>
  );
}