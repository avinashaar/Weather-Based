export async function fetchWeather(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
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
}
