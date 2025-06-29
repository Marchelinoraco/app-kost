"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { tambahSuka, saveSearchResult } from "@/lib/firebaseAction";

interface KostCardProps {
  nama: string;
  jenis: string;
  harga: number;
  fasilitas: string[] | string;
  jarak: number;
  skor_kemiripan?: number;
}

export default function SearchKostPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<KostCardProps[]>([]);
  const [originalResults, setOriginalResults] = useState<KostCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedList, setLikedList] = useState<string[]>([]);

  const [filterJenis, setFilterJenis] = useState("");
  const [filterHargaMax, setFilterHargaMax] = useState<number | null>(null);
  const [filterJarakMax, setFilterJarakMax] = useState<number | null>(null);
  const [filterFasilitas, setFilterFasilitas] = useState<string[]>([]);
  const [hargaInput, setHargaInput] = useState("");

  const formatRupiah = (angka: string) => {
    const cleaned = angka.replace(/[^0-9]/g, "");
    const number = Number(cleaned);
    if (isNaN(number)) return "";
    return "Rp" + number.toLocaleString("id-ID");
  };

  const handleSuka = (nama: string) => {
    if (likedList.includes(nama)) {
      setLikedList((prev) => prev.filter((item) => item !== nama));
    } else {
      tambahSuka(nama);
      setLikedList((prev) => [...prev, nama]);
    }
  };

  const doSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/search-detail", {
        params: { q: searchQuery, jumlah: 6 },
      });

      const hasil = res.data.hasil;

      const hasilDenganSkor = hasil.filter(
        (item: any) =>
          typeof item.skor_kemiripan === "number" && item.skor_kemiripan > 0
      );

      const sortedByJarak = [...hasilDenganSkor].sort(
        (a, b) => a.jarak - b.jarak
      );

      setOriginalResults(sortedByJarak);
      setResults(sortedByJarak);

      const simpan = await saveSearchResult(searchQuery, sortedByJarak);
      if (simpan.success) {
        console.log("✅ Disimpan di Firebase:", simpan.id);
      }
    } catch (error) {
      console.error("Gagal mencari:", error);
      setOriginalResults([]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/semua-kost");
      const sorted = res.data.hasil.sort((a: any, b: any) => a.jarak - b.jarak);
      setOriginalResults(sorted);
      setResults(sorted);
    } catch (error) {
      console.error("Gagal load semua:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAll2 = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/semua-kost");
      const sorted = res.data.hasil.sort((a: any, b: any) => a.jarak - b.jarak);
      setOriginalResults(sorted);
      setResults(sorted);
      setSearchQuery("");
      setHargaInput("");
      setFilterHargaMax(null);
      setFilterJarakMax(null);
      setFilterJenis("");
      setFilterFasilitas([]);
    } catch (error) {
      console.error("Gagal load semua:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const filtered = originalResults.filter((kost) => {
      const cocokJenis =
        !filterJenis || kost.jenis.toLowerCase() === filterJenis.toLowerCase();
      const cocokHarga =
        filterHargaMax === null || kost.harga <= filterHargaMax;
      const cocokJarak =
        filterJarakMax === null || kost.jarak <= filterJarakMax;
      const cocokFasilitas =
        filterFasilitas.length === 0 ||
        filterFasilitas.every((f) =>
          kost.fasilitas.toString().toLowerCase().includes(f)
        );
      return cocokJenis && cocokHarga && cocokJarak && cocokFasilitas;
    });

    const sortedByJarak = [...filtered].sort((a, b) => a.jarak - b.jarak);
    setResults(sortedByJarak);
  }, [
    filterJenis,
    filterHargaMax,
    filterJarakMax,
    filterFasilitas,
    originalResults,
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Input Pencarian */}
      <div className="flex gap-2 lg:mx-[15%]">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Contoh: kost murah dekat kampus, kost ac, kost perempuan"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={doSearch}>Cari</Button>
        <Button variant="outline" onClick={loadAll2}>
          Tampilkan Semua
        </Button>
      </div>

      {/* Loading */}
      {loading && <p>Memuat data...</p>}

      {/* Hasil Pencarian */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((kost, idx) => {
            const liked = likedList.includes(kost.nama);

            return (
              <Card
                key={idx}
                className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    {kost.nama}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {kost.jenis} •{" "}
                    <span className="font-semibold text-emerald-600">
                      Rp{kost.harga.toLocaleString()}
                    </span>
                  </CardDescription>
                </CardHeader>

                <div className="px-6 py-2 text-sm space-y-1 text-gray-700">
                  <p>{kost.jarak} meter dari Unika De La Salle Manado</p>

                  {kost.skor_kemiripan !== undefined && (
                    <p>
                      <span className="font-medium text-gray-500">
                        Skor kemiripan:
                      </span>{" "}
                      <span className="text-blue-600 font-semibold">
                        {kost.skor_kemiripan.toFixed(3)}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-2 px-6">
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

                <CardFooter className="justify-end px-6 py-2 ">
                  <Link href={`/kost/${encodeURIComponent(kost.nama)}`}>
                    <Button size="sm" variant="outline">
                      Lihat Detail
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada hasil ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
