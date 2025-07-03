"use client";

import { useEffect, useState } from "react";
import { fetchSearchHistory, RiwayatPencarian } from "@/lib/configFirebase";
import Link from "next/link";

export default function RiwayatPage() {
  const [history, setHistory] = useState<RiwayatPencarian[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<any[] | null>(null);

  useEffect(() => {
    fetchSearchHistory(50)
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-center">Memuat riwayat...</p>;
  if (history.length === 0)
    return <p className="p-6 text-center text-gray-500">Belum ada riwayat.</p>;

  return (
    <div className="p-6">
      <div className="flex my-2">
        <Link
          className="border py-2 px-4 rounded-xl hover:bg-blue-600 hover:text-white duration-300"
          href="/dashboard"
        >
          Kembali
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-4">📜 Riwayat Pencarian</h2>
      <div className="overflow-x-auto rounded border">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Kata Kunci</th>
              <th className="border px-3 py-2">Lihat Hasil</th>
              <th className="border px-3 py-2">Waktu Pencarian</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{idx + 1}</td>
                <td className="border px-3 py-2 font-medium text-blue-600">
                  {item.query}
                </td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => setSelectedDetail(item.hasil)}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Detail
                  </button>
                </td>
                <td className="border px-3 py-2 text-gray-500 text-xs">
                  {item.createdAt
                    ? item.createdAt.toDate().toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto relative">
            <h3 className="text-lg font-bold mb-4">📊 Detail Perhitungan</h3>

            {selectedDetail.map((item: any, idx: number) => (
              <div
                key={idx}
                className="mb-6 border rounded p-4 bg-gray-50 shadow"
              >
                <h4 className="font-semibold text-blue-700 text-lg mb-2">
                  {item.nama}
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Skor Kemiripan:</strong>{" "}
                  {(item.skor_kemiripan * 100).toFixed(2)}%
                </p>

                {/* TABEL RINGKAS */}
                <table className="text-sm w-full mb-4 border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">Dot Product</td>
                      <td className="border px-2 py-1">
                        {item.perhitungan?.dot_product.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Norm Query</td>
                      <td className="border px-2 py-1">
                        {item.perhitungan?.norm_query.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Norm Item</td>
                      <td className="border px-2 py-1">
                        {item.perhitungan?.norm_item.toFixed(4)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Cosine Similarity</td>
                      <td className="border px-2 py-1 font-semibold text-emerald-600">
                        {item.perhitungan?.cosine_similarity.toFixed(4)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* RUMUS PERHITUNGAN */}
                <div className="mt-2 text-sm bg-blue-50 border border-blue-200 p-3 rounded">
                  <h5 className="font-medium mb-1 text-blue-700">
                    📘 Rumus Cosine Similarity
                  </h5>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {(() => {
                      const dot = item.perhitungan?.dot_product?.toFixed(4);
                      const normQuery =
                        item.perhitungan?.norm_query?.toFixed(4);
                      const normItem = item.perhitungan?.norm_item?.toFixed(4);
                      const cosine =
                        item.perhitungan?.cosine_similarity?.toFixed(4);
                      return `(${dot}) / (${normQuery} × ${normItem}) = ${cosine}`;
                    })()}
                  </p>
                </div>

                {/* TABEL TF-IDF DETAIL */}
                <div className="mt-6">
                  <h5 className="font-medium mb-2">🔍 Detail TF-IDF</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Fitur</th>
                          <th className="border px-2 py-1">TF-IDF Query</th>
                          <th className="border px-2 py-1">TF-IDF Item</th>
                          <th className="border px-2 py-1">Produk TF-IDF</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.perhitungan?.tfidf_detail?.map(
                          (tfidf: any, tfIdx: number) => (
                            <tr key={tfIdx}>
                              <td className="border px-2 py-1">
                                {tfidf.fitur}
                              </td>
                              <td className="border px-2 py-1">
                                {tfidf.tfidf_query.toFixed(4)}
                              </td>
                              <td className="border px-2 py-1">
                                {tfidf.tfidf_item.toFixed(4)}
                              </td>
                              <td className="border px-2 py-1">
                                {tfidf.produk_tfidf.toFixed(4)}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setSelectedDetail(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
