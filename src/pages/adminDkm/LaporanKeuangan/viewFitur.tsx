import React, { useState } from "react";
import {
  FaCreditCard,
  FaExchangeAlt,
  FaChartBar,
  FaCalendarTimes,
} from "react-icons/fa";
import KartuIndex from "./Kartu/index";
import TransaksiIndex from "./Transaksi/index";
import LaporanIndex from "./Laporan/index";
import TutupBulanIndex from "./Tutup_Bulan/index";

const viewFitur: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "kartu" | "transaksi" | "laporan" | "tutup-bulan"
  >("kartu");

  const tabs = [
    { key: "kartu", label: "Kartu", icon: FaCreditCard, component: KartuIndex },
    {
      key: "transaksi",
      label: "Transaksi",
      icon: FaExchangeAlt,
      component: TransaksiIndex,
    },
    {
      key: "laporan",
      label: "Laporan",
      icon: FaChartBar,
      component: LaporanIndex,
    },
    {
      key: "tutup-bulan",
      label: "Tutup Bulan",
      icon: FaCalendarTimes,
      component: TutupBulanIndex,
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.key === activeTab)?.component || KartuIndex;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaChartBar className="text-4xl text-yellow-400" />
            <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
          </div>
          <p className="text-gray-600">
            Kelola kartu keuangan, transaksi, laporan, dan tutup bulan
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-yellow-500 border-b-2 border-yellow-400 bg-yellow-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="text-lg" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default viewFitur;
