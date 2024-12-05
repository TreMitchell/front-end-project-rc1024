'use strict';
/* exported data */
// Define the type for Anime data (you can extend this based on API response)
// define a key for local storage
const key = 'Anime';
const data = {
  Anime: [],
  currentView: 'home', // Default view is the homepage
};
function saveToLocalStorage() {
  localStorage.setItem(key, JSON.stringify(data.Anime));
}
saveToLocalStorage();
function loadFromLocalStorage() {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    data.Anime = JSON.parse(storedData);
  }
}
loadFromLocalStorage();
