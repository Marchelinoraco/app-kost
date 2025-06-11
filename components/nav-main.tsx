interface KostItem {
  title: string;
  price: string;
  image?: string;
  suka?: number; // tambahkan properti suka
}

export function NavMain({ items }: { items: KostItem[] }) {
  return (
    <div className="space-y-4 px-4 pt-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          {/* Gambar thumbnail */}
          <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v18h18V3H3zm4.5 9l2.25 3 3-4 4.5 6H6.75z"
                />
              </svg>
            )}
          </div>
          {/* Info */}
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
