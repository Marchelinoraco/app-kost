interface KostItem {
  title: string;
  price: string;
  image?: string;
  suka?: number;
}

// Fungsi untuk membentuk path gambar dari judul kost
const getImagePath = (title: string) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return `/images/${slug}-1.jpeg`;
};

export function NavMain({ items }: { items: KostItem[] }) {
  return (
    <div className="space-y-4 px-4 pt-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
            <img
              src={item.image ?? getImagePath(item.title)}
              alt={item.title}
              onError={(e) => {
                console.warn("Gagal load gambar:", e.currentTarget.src);
                e.currentTarget.src = "/images/default.jpeg";
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Kost */}
          <div>
            <p className="text-sm font-medium hover:underline cursor-pointer">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">Rp. {item.price}</p>
            {item.suka !== undefined && (
              <p className="text-xs text-muted-foreground">
                Disukai: {item.suka} orang
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
