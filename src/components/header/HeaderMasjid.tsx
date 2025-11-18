export default function HeaderMasjid({
  nama,
  alamat,
}: {
  nama: string;
  alamat: string;
}) {
  return (
    <div className="flex gap-3 items-center">
      {/* Icon Masjid */}
      {/* <img src="/icons/masjid.svg" className="w-10 h-10 opacity-90" /> */}

      <div>
        <h1 className="text-xl font-bold text-black drop-shadow">
          {nama}
        </h1>
        <p className="text-sm text-black/80 leading-tight max-w-xs">
          {alamat}
        </p>
      </div>
    </div>
  );
}
