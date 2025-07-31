type WeatherData = {
  city: string;
  temp: number;
  condition: string;
  wind: number;
  humidity: number;
};

export async function fetchWeather(
  city: string,
  retries = 3,
  delay = 1000
): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod != 200) throw new Error(data?.message);

    return {
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      wind: data.wind.speed,
      humidity: data.main.humidity,
    };
  } catch (error) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchWeather(city, retries - 1, delay);
    }
    throw new Error("Error while fetching the weather");
  }
}
