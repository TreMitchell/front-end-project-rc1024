/* exported data */

// Define the type for Anime data (you can extend this based on API response)
// define a key for local storage
const key = 'Anime';

const data = {
  Anime: [] as {
    mal_id: number; // MyAnimeList ID
    title: string;
    url: string;
    images: { jpg: { image_url: string } }; // Example for image data
    synopsis: string;
  }[],

  currentView: 'home', // Default view is the homepage
};

function saveToLocalStorage(): void {
  localStorage.setItem(key, JSON.stringify(data.Anime));
}

saveToLocalStorage();

function loadFromLocalStorage(): void {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    data.Anime = JSON.parse(storedData);
  }
}
loadFromLocalStorage();
