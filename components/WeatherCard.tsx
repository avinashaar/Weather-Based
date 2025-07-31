"use client";
import { useWeather } from "@/context/WeatherContext";

function getOutfitRecommendation(condition: string, temp: number) {
  if (condition.toLowerCase().includes("rain")) return "Take an umbrella!";
  if (temp < 10) return "Wear a warm jacket!";
  if (temp > 30) return "Sunglasses suggested!";
  return "Dress comfortably.";
}

export default function WeatherCard() {
  const { weather } = useWeather();
  if (!weather)
    return <p className="text-gray-500">Search a city to see weather.</p>;

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 transition">
      <h2 className="text-2xl font-bold">{weather.city}</h2>
      <p>Temp: {weather.temp}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Wind: {weather.wind} m/s</p>
      <p>Humidity: {weather.humidity}%</p>
      <p className="mt-2 font-semibold">
        {getOutfitRecommendation(weather.condition, weather.temp)}
      </p>
    </div>
  );
}
