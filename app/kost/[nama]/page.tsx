"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

interface KostDetail {
  nama: string;
  jenis: string;
  harga: number;
  fasilitas: string;
  jarak: number;
  kontak?: string;
}

// Mapping nama kost ke prefix nama file gambar
const getImagePaths = (nama: string): string[] => {
  const mapNamaToPrefix: Record<string, string> = {
    "kost Anugerah": "anugerah",
    "Kost Supit": "supit",
    "Kost Budi Sejati": "budisejati",
    "Kost Candi Borobudur": "borobudur",
    "Genteng Biru": "gentengbiru",
    "Genteng Merah": "gentengmerah",
    "Kost Mulia I": "mulia",
    // Tambahkan kost lain jika tersedia gambarnya
  };

  const prefix = mapNamaToPrefix[nama];
  if (!prefix) {
    return [
      "/images/default1.jpeg",
      "/images/default2.jpeg",
      "/images/default3.jpeg",
    ];
  }

  return [
    `/images/${prefix}1.jpeg`,
    `/images/${prefix}2.jpeg`,
    `/images/${prefix}3.jpeg`,
  ];
};

export default function KostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [kost, setKost] = useState<KostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const nama = decodeURIComponent(params.nama as string);
        const res = await axios.get("http://localhost:5001/detail-kost", {
          params: { nama },
        });
        setKost(res.data.kost);
      } catch (err) {
        console.error("Gagal mengambil detail kost:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.nama) fetchDetail();
  }, [params.nama]);

  const images = kost ? getImagePaths(kost.nama) : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ✅ Tombol Kembali */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 inline-block px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
      >
        ← Indekost
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Memuat detail kost...</p>
      ) : kost ? (
        <div className="bg-white rounded-lg shadow-xl p-6 border">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gambar Dinamis */}
            <div className="space-y-4">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-64 object-cover rounded"
                />
              ))}
            </div>

            {/* Detail Kost */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{kost.nama}</h1>
              <p className="text-lg text-gray-700">Jenis: {kost.jenis}</p>
              <p className="text-lg text-gray-700">
                Harga:{" "}
                <span className="font-semibold text-emerald-600">
                  Rp{kost.harga.toLocaleString("id-ID")}
                </span>
              </p>
              <p className="text-lg text-gray-700">Jarak: {kost.jarak} meter</p>

              <div>
                <p className="font-semibold text-gray-700 mb-1">Fasilitas:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {kost.fasilitas.split(",").map((f, i) => (
                    <li key={i}>{f.trim()}</li>
                  ))}
                </ul>
              </div>

              {/* Tombol WhatsApp */}
              {kost.kontak ? (
                <a
                  href={`https://wa.me/${kost.kontak}?text=${encodeURIComponent(
                    `Halo, saya tertarik dengan ${kost.nama}. Apakah masih tersedia?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    <FaWhatsapp />
                    Hubungi via WhatsApp
                  </button>
                </a>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  Kontak belum tersedia
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 font-medium">
          Kost tidak ditemukan.
        </p>
      )}
    </div>
  );
}
