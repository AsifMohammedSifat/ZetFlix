"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const doSearch = useDebounce((term) => {
    if (term.trim()) {
      router.push(
        `/search?query=${encodeURIComponent(term.trim().toLowerCase())}`
      );
    }
  }, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      doSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 text-white bg-gray-700 px-3 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
