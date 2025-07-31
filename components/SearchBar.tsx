"use client";
import { useState, useEffect } from "react";
import { useWeather } from "@/context/WeatherContext";
import { fetchWeather } from "@/lib/weatherApi";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const { setWeather, addToHistory } = useWeather();

  useEffect(() => {
    setError("");
  }, [query]);

  const handleSearch = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      addToHistory(city);
    } catch (error) {
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
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
