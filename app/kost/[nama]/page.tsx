// app/kost/[nama]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface KostDetail {
  nama: string;
  harga: number;
  jenis: string;
  fasilitas: string[];
  jarak: number;
  images: string[];
}

const kostDetails: Record<string, KostDetail> = {
  "Kost Genteng Biru": {
    nama: "Kost Genteng Biru",
    harga: 800000,
    jenis: "Putri",
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "Listrik", "Dapur Bersama"],
    jarak: 230,
    images: ["/1.jpeg", "/1-mandi.jpeg", "/1-kasur.jpeg"],
  },
  "Kost Romancy": {
    nama: "Kost Romancy",
    harga: 1200000,
    jenis: "Putri",
    fasilitas: [
      "Wifi",
      "Meja Belajar",
      "Meja Rias",
      "Tempat Tidur",
      "Lemari",
      "Kamar Mandi Dalam",
      "Kulkas Bersama",
      "Dapur Bersama",
      "AC",
    ],
    jarak: 230,
    images: ["/4.jpeg", "/4-mandi.jpeg", "/4-kasur.jpeg"],
  },
  // Tambahkan kost lainnya sesuai kebutuhan...
};

export default function KostDetailPage({
  params,
}: {
  params: { nama: string };
}) {
  const decodedNama = decodeURIComponent(params.nama);
  const detail: KostDetail | undefined = kostDetails[decodedNama];

  if (!detail) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        href="/dashboard"
        className="text-blue-600 hover:underline text-sm inline-block mb-4"
      >
        ← Kembali ke daftar kost
      </Link>

      <h1 className="text-3xl font-bold mb-2">{detail.nama}</h1>
      <p className="text-gray-700">Jenis: {detail.jenis}</p>
      <p className="text-gray-700">Harga: Rp {detail.harga.toLocaleString()}</p>
      <p className="text-gray-700">Jarak: {detail.jarak} meter</p>
      <p className="text-gray-700">
        Fasilitas:{" "}
        <span className="font-medium">{detail.fasilitas.join(", ")}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {detail.images.map((src, i) => (
          <div key={i} className="rounded overflow-hidden shadow">
            <Image
              src={src}
              alt={`Gambar ${i + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
