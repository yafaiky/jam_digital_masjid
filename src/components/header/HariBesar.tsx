export default function HariBesar({ event }: { event: string }) {
  return (
    <div className="mt-34 flex justify-end">
      <span className="bg-red-500 text-white px-4 py-1 rounded-full text-xl shadow font-bold">
        {event}
      </span>
    </div>
  );
}
