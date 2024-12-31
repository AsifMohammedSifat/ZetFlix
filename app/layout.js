import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import Loader from "@/components/ui-SVG/Loader";
import { dbConnect } from "@/services/mongo";
import AuthProvider from "./providers/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MovieDB",
  description: "Enjoy your weekend!",
};

export default async function RootLayout({ children }) {
  await dbConnect()
  .catch((err) => console.error(err));
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
