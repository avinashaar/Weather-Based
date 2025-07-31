"use client";
import { useState, useEffect } from "react";
import { useWeather } from "@/context/WeatherContext";
import { fetchWeather } from "@/lib/weatherApi";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export default function SearchBar() {
  const { setWeather, addToHistory } = useWeather();
  const { isOffline } = useNetworkStatus();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [query]);

  const handleSearch = async (city: string) => {
    setError("");
    try {
      setLoading(true);
      const data = await fetchWeather(city);
      setWeather(data);
      addToHistory(city);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={query}
        placeholder="Search city..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={() => handleSearch(query)}
        disabled={isOffline || query?.length === 0 || loading}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-600"
      >
        {isOffline ? "Look like you network is down, Please check" : "Search"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
