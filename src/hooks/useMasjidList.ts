import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export type AkunMasjid = {
  id: string;
  name: string;
  location: string;
  created_at: string;
};

const ITEMS_PER_PAGE = 10;

export function useMasjidList() {
  const [data, setData] = useState<AkunMasjid[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      const res = await api.get("/admin/client", {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
        },
      });

      // Jika API mengembalikan object dengan data dan total
      if (res.data.data && Array.isArray(res.data.data)) {
        setData(res.data.data);
        setTotalItems(res.data.total || res.data.data.length);
      } else if (Array.isArray(res.data)) {
        // Jika API mengembalikan array langsung
        setData(res.data);
        setTotalItems(res.data.length);
      }
    } catch (err) {
      console.error("Gagal mengambil data", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return {
    data,
    loading,
    currentPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  };
}
