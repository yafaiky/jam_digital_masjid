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

// import { useEffect, useState } from "react";
// import { getBanners } from "../../services/bannerClient";
// import type { Banner } from "../../services/bannerClient";

// export default function BannerPage({ index }: { index: number }) {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const token = localStorage.getItem("token") || "";

//   useEffect(() => {
//     const loadBanners = async () => {
//       try {
//         const data = await getBanners(token);
//         setBanners(data);
//       } catch (err) {
//         console.error("Gagal load banner:", err);
//       }
//     };

//     if (token) loadBanners();
//   }, [token]);

//   return (
//     <div className="w-full h-full bg-black">
//       {banners[index] ? (
//         <img
//           src={banners[index].path}
//           className="w-full h-full object-cover"
//           alt={`Banner ${index + 1}`}
//         />
//       ) : (
//         <div className="w-full h-full flex items-center justify-center text-white/40">
//           Tidak ada banner
//         </div>
//       )}
//     </div>
//   );
// }
