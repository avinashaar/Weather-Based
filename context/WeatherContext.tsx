"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  wind: number;
  humidity: number;
}

interface WeatherContextType {
  weather: WeatherData | null;
  history: string[];
  setWeather: (data: WeatherData) => void;
  addToHistory: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeatherState] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const setWeather = (data: WeatherData) => setWeatherState(data);

  const addToHistory = (city: string) => {
    setHistory((prev) => [city, ...prev.filter((c) => c !== city)].slice(0, 5));
  };

  return (
    <WeatherContext.Provider
      value={{ weather, history, setWeather, addToHistory }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider");
  return ctx;
};
