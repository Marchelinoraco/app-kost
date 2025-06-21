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
        <header className="relative flex h-16 items-center justify-center border-b bg-white px-4 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 absolute inset-0 flex items-center justify-center">
            SELAMAT DATANG
          </h1>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-56 bg-gradient-to-br from-indigo-100 to-white text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-indigo-700 mb-4">
            INDEKOST
          </h2>
          <p className="text-gray-600 max-w-xl text-base md:text-lg">
            Jelajahi Kost Yang Sesuai dengan Kebutuhan Kamu
          </p>

          {/* Tombol menuju dashboard */}
          <Link
            href="./dashboard"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white text-base font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Masuk ke rekomendasi
          </Link>
        </section>

        {/* Image Grid */}
        <section className="px-4 md:px-12 lg:px-24 py-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-48 md:h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Deskripsi / Informasi */}
        <section className="px-6 md:px-40 py-16 text-gray-800">
          <p className="text-justify leading-relaxed text-base md:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
            labore quaerat fuga repellendus magni delectus corporis, deleniti
            culpa illum esse hic laudantium aut dolorum, voluptatem ex possimus
            maiores optio nihil. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Qui nihil eius laudantium rerum culpa? Ullam dolor
            modi esse neque, tempore quis reprehenderit pariatur voluptate, ad
            ex minima dolore fugit earum! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Mollitia obcaecati autem repellendus asperiores
            expedita dolore sed, nostrum minus odit quae libero illo quaerat
            placeat dicta cum, molestiae animi. Nihil, ducimus!
          </p>
        </section>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
