export default function BannerPage({ index }: { index: number }) {
  const banners = [
    "banner/banner1.jpg",
    "banner/banner2.jpg",
    "banner/banner3.jpg",
    "banner/banner4.jpg",
    "banner/banner5.jpg",
  ];

  return (
    <div className="w-full h-full">
      <img
        src={banners[index]}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
