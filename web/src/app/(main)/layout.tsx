import type { Metadata } from "next";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Byte Blog",
  description: "A platform for insightful articles on various topics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
}
