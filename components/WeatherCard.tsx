"use client";
import { useWeather } from "@/context/WeatherContext";
import { useEffect, useState } from "react";

function getOutfitRecommendation(condition: string, temp: number) {
  if (condition.toLowerCase().includes("rain")) return "Take an umbrella!";
  if (temp < 10) return "Wear a warm jacket!";
  if (temp > 30) return "Sunglasses suggested!";
  return "Dress comfortably.";
}

export default function WeatherCard() {
  const { weather } = useWeather();
  const [visible, setVisible] = useState(false);
  const [displayedWeather, setDisplayedWeather] = useState<
    typeof weather | null
  >(null);

  useEffect(() => {
    if (weather) {
      setVisible(false);

      const timer = setTimeout(() => {
        setDisplayedWeather(weather);
        setVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [weather]);

  if (!displayedWeather)
    return <p className="text-gray-500">Search a city to see weather.</p>;

  return (
    <div
      className={`p-4 border rounded shadow bg-white dark:bg-gray-800 transform transition-all duration-300 ease-in-out 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <h2 className="text-2xl font-bold">{displayedWeather.city}</h2>
      <p>Temp: {displayedWeather.temp}°C</p>
      <p>Condition: {displayedWeather.condition}</p>
      <p>Wind: {displayedWeather.wind} m/s</p>
      <p>Humidity: {displayedWeather.humidity}%</p>
      <p className="mt-2 font-semibold">
        {getOutfitRecommendation(
          displayedWeather.condition,
          displayedWeather.temp
        )}
      </p>
    </div>
  );
}
