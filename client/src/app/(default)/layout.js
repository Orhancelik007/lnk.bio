import { Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const lato = Lato({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata = {
  title: "Linktree",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>
          <Header />
          <div className="p-6 max-w-4xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
