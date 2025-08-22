"use client";

import Footer from "@/components/Footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { Search, Filter, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        {/* Hero Section */}
        <section
          className="relative flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center"
          style={{ backgroundImage: `url('/bg-kost.jpeg')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Konten */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-4 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text text-transparent mb-4 drop-shadow-md">
              LASALLE INDEKOST
            </h1>
            <p className="text-white text-base md:text-xl leading-relaxed font-semibold drop-shadow-sm">
              Sistem rekomendasi tempat indekos di sekitar Unika De La Salle
              Manado.
            </p>
            <p className="mt-2 font-semibold text-gray-200">
              Yuk jelajahi indekost yang sesuai dengan kebutuhan kamu!
            </p>
            <Link
              href="/rekomendasi"
              className="mt-8 inline-block rounded-lg bg-indigo-600 text-white font-semibold px-6 py-3 shadow-lg hover:bg-indigo-700 hover:scale-105 transition duration-300"
            >
              Mulai Rekomendasi
            </Link>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Cara Menggunakan Aplikasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Search className="w-12 h-12" />,
                title: "Cari Kost",
                desc: "Masukkan kata kunci seperti 'kost dekat kampus'.",
              },
              {
                icon: <Filter className="w-12 h-12" />,
                title: "Gunakan Filter",
                desc: "Saring berdasarkan jenis, harga, jarak, dan fasilitas.",
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Simpan Favorit",
                desc: "Tandai kost yang kamu suka agar mudah ditemukan lagi.",
              },
              {
                icon: <MapPin className="w-12 h-12" />,
                title: "Lihat Detail",
                desc: "Baca informasi lengkap dan lokasi kost pilihanmu.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="text-indigo-600 mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Keunggulan Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Kenapa Pilih Aplikasi Ini?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                emoji: "🔍",
                title: "Rekomendasi Pintar",
                desc: "Sistem cerdas yang menyesuaikan hasil dengan kebutuhanmu.",
              },
              {
                emoji: "⚡",
                title: "Cepat & Mudah",
                desc: "Hanya dengan beberapa klik, temukan kost sesuai keinginan.",
              },
              {
                emoji: "📍",
                title: "Lokasi Akurat",
                desc: "Dilengkapi dengan jarak dari kampus dan detail lokasi kost.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <h3 className="font-semibold text-lg text-indigo-600 mb-2">
                  {item.emoji} {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
