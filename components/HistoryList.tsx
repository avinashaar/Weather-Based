"use client";
import { useWeather } from "@/context/WeatherContext";

export default function HistoryList() {
  const { history } = useWeather();
  if (history.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Recent Searches:</h3>
      <ul className="flex gap-2 flex-wrap">
        {history.map((city, i) => (
          <li
            key={i}
            className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
