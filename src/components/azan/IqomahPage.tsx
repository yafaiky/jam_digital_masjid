export default function IqomahPage({ counter }: { counter: number }) {
  return (
    <div className="flex items-center justify-center h-full bg-green-900 text-white text-6xl font-bold">
      IQOMAH — {Math.floor(counter / 60)}:{(counter % 60).toString().padStart(2, "0")}
    </div>
  );
}
