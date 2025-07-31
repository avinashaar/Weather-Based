import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HistoryList from "@/components/HistoryList";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Weather App</h1>
        <SearchBar />
        <WeatherCard />
        <HistoryList />
      </div>
    </main>
  );
}
