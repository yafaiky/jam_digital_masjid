import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export type AkunMasjid = {
  id: string;
  name: string;
  location: string;
  created_at: string;
  DkmUser?: {
    id: string;
    username: string;
  };
};

const ITEMS_PER_PAGE = 9;

export function useMasjidList() {
  const [allData, setAllData] = useState<AkunMasjid[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/client");

      if (res.data?.data && Array.isArray(res.data.data)) {
        setAllData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setAllData(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data", err);
      setAllData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter data berdasarkan search query
  const filteredData = allData.filter(
    (item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.location.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Reset ke halaman 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Paginate filtered data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const setSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const displayStartIndex = totalItems === 0 ? 0 : startIndex + 1;
  const displayEndIndex = Math.min(endIndex, totalItems);

  return {
    data,
    loading,
    currentPage,
    totalItems,
    totalPages,
    startIndex: displayStartIndex,
    endIndex: displayEndIndex,
    searchQuery,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
    setSearch,
  };
}
