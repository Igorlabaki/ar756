import { HeaderComponent } from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import FooterComponent from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AR756_",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"relative"}>
        <div className="absolute z-50 w-full">
          <HeaderComponent />
        </div>
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
