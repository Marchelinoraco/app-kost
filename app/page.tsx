"use client";

import Footer from "@/components/Footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default function Page() {
  const images = [
    "/1.jpeg",
    "/2.jpeg",
    "/3.jpeg",
    "/4.jpeg",
    "/5.jpeg",
    "/6.jpeg",
    "/7.jpeg",
    "/8.jpeg",
    "/9.jpeg",
  ];

  return (
    <SidebarProvider>
      <SidebarInset>
        {/* Header */}
        {/* <header className="relative flex h-16 items-center justify-center border-b bg-white px-4 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 absolute inset-0 flex items-center justify-center">
            SELAMAT DATANG
          </h1>
        </header> */}
        {/* Hero Section */}
        <section
          className="relative flex flex-col items-center justify-center py-[350px] text-center bg-cover bg-center"
          style={{
            backgroundImage: `url('/bg-kost.jpeg')`,
          }}
        >
          {/* Overlay gelap transparan */}
          <div className=" " />

          {/* Konten */}
          <div className="relative z-10 px-4 max-w-2xl gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-600 shadow-2xl mb-4 drop-shadow-md">
              LASALLE INDEKOST
            </h2>
            <p className="text-white  text-base md:text-xl leading-relaxed drop-shadow-sm font-semibold ">
              Merupakan sistem yang akan merekomendasikan tempat indekos di
              sekitar Unika De La Salle Manado.{" "}
            </p>
            <p className="font-semibold text-white">
              Yuk jelajahi indekost yang sesuai dengan kebutuhan kamu!
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-block rounded-lg bg-white text-indigo-700 font-semibold px-6 py-3 shadow-lg hover:bg-indigo-100 hover:text-indigo-900 transition duration-300"
            >
              Masuk ke Rekomendasi
            </Link>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
