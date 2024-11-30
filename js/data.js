'use strict';
/* exported data */
async function fetchAllAnime() {
  const allAnime = [];
  let currentPage = 1;
  const maxPages = 1; // Adjust based on how many pages you want to fetch
  try {
    while (currentPage <= maxPages) {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?page=${currentPage}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      allAnime.push(...data.data); // Combine anime from current page into the main array
      // console.log(`Fetched page ${currentPage}`);
      currentPage++;
    }
    console.log(allAnime); // Complete list of anime
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
fetchAllAnime();
async function getAnimeRecommendations() {
  const animeRecommendations = [];
  const id = 1;
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/recommendations`,
    );
    if (!res.ok) throw new Error(`http error! status: ${res.status}`);
    const data = await res.json();
    data.data.length = 10;
    animeRecommendations.push(...data.data);
    console.log(animeRecommendations);
  } catch (err) {
    console.error('There has been a problem with your fetch operation:', err);
  }
}
getAnimeRecommendations();
async function getAnimeSearch() {
  const animeSearch = [];
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime`);
    if (!res.ok) throw new Error(`http error! status: ${res.status}`);
    const data = await res.json();
    data.data.length = 10;
    animeSearch.push(...data.data);
    console.log(animeSearch);
  } catch (err) {
    console.error('There has been a problem with your fetch operation:', err);
  }
}
getAnimeSearch();
