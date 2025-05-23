const url = "https://api.nasa.gov/planetary/apod";
const api_key = "fmhY1XYjBAzrrFKLxIb0ImZNtgQ01YfP8aPJv3vv";

function formatDate(date) {
  return date.toISOString().split("T")[0]; // yyyy-mm-dd
}

export default async function fetchApod(days = 8) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days - 1)); // últimos 5 días

    const response = await fetch(
      `${url}?api_key=${api_key}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`
    );
    const data = await response.json();
    return data; // array de objetos con info de cada día
  } catch (error) {
    console.log("Error al obtener imágenes APOD:", error);
    return [];
  }
}
