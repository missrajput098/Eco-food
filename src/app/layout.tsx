import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { SearchModal } from "@/components/modals/SearchModal";
import { AccountModal } from "@/components/modals/AccountModal";
import { ToastNotification } from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
  title: "Organic Food Store | Good Food for a Healthier Tomorrow",
  description:
    "Discover pure, natural and organic food products for a healthier you and a greener planet. Certified organic fruits, vegetables, grains, nuts, and superfoods.",
  keywords: [
    "organic food",
    "fresh produce",
    "superfoods",
    "healthy living",
    "organic groceries",
    "farm fresh",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fbfbf9] text-[#4c6052] font-sans antialiased selection:bg-[#2e7d32] selection:text-white">
        <CartProvider>
          {/* Main Top Navbar */}
          <Navbar />

          {/* Page Contents */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <SearchModal />
          <AccountModal />
          <ToastNotification />
        </CartProvider>
      </body>
    </html>
  );
}
