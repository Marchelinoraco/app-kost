"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tambahSuka } from "@/lib/firebaseAction";
import Link from "next/link";

interface KostCardProps {
  nama: string;
  jenis: string;
  harga: number;
  fasilitas: string[];
  jarak: number;
  imageSrc: string;
}

const kostList: KostCardProps[] = [
  // ... Data kost tetap seperti sebelumnya
  {
    nama: "Kost Genteng Biru",
    jenis: "Putri",
    harga: 800000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "Listrik", "Dapur Bersama"],
    jarak: 230,
    imageSrc: "/1.jpeg",
  },
  {
    nama: "Kost Genteng Merah",
    jenis: "Putri",
    harga: 800000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "Kulkas Bersama", "Listrik"],
    jarak: 235,
    imageSrc: "/2.jpeg",
  },
  {
    nama: "Kost Nibil",
    jenis: "Putri",
    harga: 750000,
    fasilitas: [
      "Lemari",
      "Meja Belajar",
      "Listrik",
      "Kamar Mandi Dalam",
      "Dapur Bersama",
    ],
    jarak: 250,
    imageSrc: "/3.jpeg",
  },
  {
    nama: "Kost Romancy",
    jenis: "Putri",
    harga: 1200000,
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
    imageSrc: "/4.jpeg",
  },
  {
    nama: "Kost Bonita",
    jenis: "Putri",
    harga: 700000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam"],
    jarak: 500,
    imageSrc: "/5.jpeg",
  },
  {
    nama: "Kost Glory",
    jenis: "Campur",
    harga: 900000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam"],
    jarak: 300,
    imageSrc: "/6.jpeg",
  },
  {
    nama: "Kost Executive Family",
    jenis: "Campur",
    harga: 850000,
    fasilitas: [
      "Wifi",
      "Kamar Mandi Dalam",
      "Dapur Bersama",
      "Listrik",
      "Parkiran",
    ],
    jarak: 280,
    imageSrc: "/7.jpeg",
  },
  {
    nama: "Kost Anugerah",
    jenis: "Campur",
    harga: 1000000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "AC", "Dapur Bersama", "Parkiran"],
    jarak: 650,
    imageSrc: "/8.jpeg",
  },
  {
    nama: "Kos Rajawali",
    jenis: "Campur",
    harga: 1200000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "Dapur Bersama", "AC", "Parkiran"],
    jarak: 500,
    imageSrc: "/9.jpeg",
  },
  {
    nama: "Kost Mulia",
    jenis: "Campur",
    harga: 1000000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "Dapur Bersama", "AC", "Parkiran"],
    jarak: 700,
    imageSrc: "/10.jpeg",
  },
  {
    nama: "D’Kost",
    jenis: "Campur",
    harga: 1250000,
    fasilitas: ["Wifi", "Kamar Mandi Dalam", "AC", "Parkiran"],
    jarak: 900,
    imageSrc: "/11.jpeg",
  },
];

export function CardDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterHargaMax, setFilterHargaMax] = useState<number | null>(null);
  const [filterFasilitas, setFilterFasilitas] = useState<string[]>([]);
  const [filterJarakMax, setFilterJarakMax] = useState<number | null>(null);
  const [likedList, setLikedList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSuka = (nama: string) => {
    if (likedList.includes(nama)) {
      setLikedList((prev) => prev.filter((item) => item !== nama));
    } else {
      tambahSuka(nama);
      setLikedList((prev) => [...prev, nama]);
    }
  };

  // ⬇️ Parse kalimat pencarian
  useEffect(() => {
    const parsed = searchQuery.toLowerCase();

    // Reset semua filter dulu
    setFilterJenis("");
    setFilterHargaMax(null);
    setFilterJarakMax(null);
    setFilterFasilitas([]);

    // 1. Jenis
    if (parsed.includes("wanita") || parsed.includes("putri")) {
      setFilterJenis("Putri");
    } else if (parsed.includes("pria") || parsed.includes("putra")) {
      setFilterJenis("Putra");
    } else if (parsed.includes("campur")) {
      setFilterJenis("Campur");
    }

    // 2. Harga
    if (parsed.includes("murah")) {
      setFilterHargaMax(800000); // kamu bisa sesuaikan nilai ini
    } else if (parsed.includes("mahal")) {
      setFilterHargaMax(1500000); // contoh harga tinggi
    }

    // 3. Jarak
    if (parsed.includes("dekat kampus") || parsed.includes("dekat")) {
      setFilterJarakMax(300); // misal: 300 meter adalah "dekat"
    } else if (parsed.includes("jauh")) {
      setFilterJarakMax(1000); // jika ada kata "jauh"
    }

    // 4. Fasilitas
    const fasilitasDetected: string[] = [];
    const fasilitasKunci = [
      "ac",
      "wifi",
      "listrik",
      "dapur",
      "kamar mandi dalam",
      "parkiran",
    ];
    fasilitasKunci.forEach((f) => {
      if (parsed.includes(f)) {
        fasilitasDetected.push(f.toLowerCase());
      }
    });
    setFilterFasilitas(fasilitasDetected);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filterJenis, filterHargaMax, filterFasilitas, filterJarakMax]);

  const filteredKosts = kostList.filter((kost) => {
    const matchJenis = filterJenis
      ? kost.jenis.toLowerCase() === filterJenis.toLowerCase()
      : true;
    const matchHarga = filterHargaMax ? kost.harga <= filterHargaMax : true;
    const matchJarak = filterJarakMax ? kost.jarak <= filterJarakMax : true;
    const matchFasilitas =
      filterFasilitas.length > 0
        ? filterFasilitas.every((f) =>
            kost.fasilitas.map((x) => x.toLowerCase()).includes(f)
          )
        : true;

    return matchJenis && matchHarga && matchJarak && matchFasilitas;
  });

  return (
    <div className="space-y-6 p-4">
      {/* 🔍 Search Query */}
      <input
        type="text"
        placeholder="Contoh: saya ingin kost dekat kampus, murah, AC"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Filter Manual */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <select
          value={filterJenis}
          onChange={(e) => setFilterJenis(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Semua Jenis</option>
          <option value="Putri">Kost Wanita</option>
          <option value="Putra">Kost Pria</option>
          <option value="Campur">Campur</option>
        </select>

        <input
          type="number"
          placeholder="Harga max (contoh: 1000000)"
          onChange={(e) =>
            setFilterHargaMax(e.target.value ? Number(e.target.value) : null)
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Jarak max (meter)"
          onChange={(e) =>
            setFilterJarakMax(e.target.value ? Number(e.target.value) : null)
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Fasilitas (pisahkan koma)"
          onChange={(e) =>
            setFilterFasilitas(
              e.target.value
                .split(",")
                .map((f) => f.trim().toLowerCase())
                .filter((f) => f !== "")
            )
          }
          className="border p-2 rounded"
        />
      </div>

      {/* Kost Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-lg font-medium text-gray-700">
              Memuat data kost...
            </p>
          </div>
        ) : filteredKosts.length > 0 ? (
          filteredKosts.map((kost, index) => {
            const liked = likedList.includes(kost.nama);
            return (
              <Card
                key={index}
                className="w-full max-w-sm bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${kost.imageSrc})` }}
              >
                <div className="bg-white/90 rounded-xl text-black py-4">
                  <CardHeader>
                    <CardTitle>{kost.nama}</CardTitle>
                    <CardDescription className="mb-2">
                      Tempat nyaman dan aman
                    </CardDescription>
                  </CardHeader>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-44 rounded-t-xl overflow-hidden">
                      <img
                        src={kost.imageSrc}
                        alt={kost.nama}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <h3 className="font-semibold text-base">{kost.nama}</h3>
                    <p className="text-sm">Rp. {kost.harga.toLocaleString()}</p>
                    <p className="text-sm text-gray-700">{kost.jenis}</p>
                    <p className="text-sm text-gray-700">
                      {kost.jarak} meter dari lokasi
                    </p>
                    <p className="text-sm text-gray-600 text-center px-2">
                      {kost.fasilitas.join(", ")}
                    </p>

                    <div className="flex gap-2 mt-2 mb-2">
                      <Button
                        variant={liked ? "default" : "outline"}
                        className={`text-sm px-4 transition-colors duration-300 ${
                          liked ? "bg-red-500 text-white hover:bg-red-600" : ""
                        }`}
                        onClick={() => handleSuka(kost.nama)}
                      >
                        {liked ? "❤️ Disukai" : "🤍 Suka"}
                      </Button>
                    </div>
                  </div>

                  <CardFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full">
                      Hubungi Pemilik
                    </Button>
                    <Link
                      href={`/kost/${encodeURIComponent(kost.nama)}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Lihat Detail
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-600">
            Tidak ada kost yang sesuai filter.
          </div>
        )}
      </div>
    </div>
  );
}
