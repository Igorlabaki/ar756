import { HeaderComponent } from "@/components/header";
import "./globals.css";
import FooterComponent from "@/components/footer";
import { Merriweather, Raleway } from "next/font/google";

export const metadata = {
  title: "AR756_",
};
const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${raleway.className}`}>
        <div id="modal-root" />
        <div className="absolute z-50 w-full">
          <HeaderComponent />
        </div>
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
