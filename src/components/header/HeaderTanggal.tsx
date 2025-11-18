export default function HeaderTanggal({
  hijriyah,
  masehi,
}: {
  hijriyah: string;
  masehi: string;
}) {
  return (
    <div className="text-right">
      <h2 className="text-xl font-bold text-black drop-shadow">
        {hijriyah}
      </h2>
      <p className="text-sm text-black/80">{masehi}</p>
    </div>
  );
}
