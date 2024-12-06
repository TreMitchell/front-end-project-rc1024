// Search feature doms
const $searchButton = document.querySelector('.search-button');
const $searchInput = document.querySelector('.search-bar') as HTMLInputElement;
const $animeDeck = document.querySelector('.anime-deck') as HTMLElement;

if (!$searchButton) throw new Error('searchButton query not found!');
if (!$searchInput) throw new Error('searchInput query not found!');
if (!$animeDeck) throw new Error('animeDeck query not found!');

// View swap doms
const $tabContainer = document.querySelector('.tab-container');
const $tab = document.querySelectorAll('.tab');
const $view = document.querySelectorAll('.view');

if (!$tabContainer) throw new Error('tab-container query not found!');
if (!$tab) throw new Error('tab query not found!');
if (!$view) throw new Error('view query not found!');

// Anime description doms
const $animeDetails = document.querySelector(
  '.anime-details',
) as HTMLDivElement;
const $animeTitle = document.querySelector('.anime-title');
const $animeDescription = document.querySelector('.anime-description');

if (!$animeDetails) throw new Error('animeDetails query not found!');
if (!$animeTitle) throw new Error('animeTitle query not found!');
if (!$animeDescription) throw new Error('animeDescription query not found!');

$searchButton.addEventListener('click', searchAnime);

async function searchAnime(): Promise<void> {
  const searchAnime: any[] = [];
  const letter = $searchInput.value.trim();
  const $results = document.querySelector('.results') as HTMLElement;

  if (!$results) throw new Error('results query not found!');

  if (!letter) {
    console.warn('Search input is empty!');
    return;
  }

  // Clearing the previous search results
  $results.innerHTML = '';

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${letter}`);
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }

    const data = await res.json();
    data.data.length = 20;
    searchAnime.push(...data.data);

    searchAnime.forEach((anime) => {
      const animeTree = renderDomTree(anime);
      $results.appendChild(animeTree);
    });

    setTab('search-results');
    setView('search-results');
  } catch (err) {
    console.error('Failed to fetch anime:', err);
  }
}

function renderDomTree(anime: any): HTMLElement {
  const animeDiv = document.createElement('div');
  animeDiv.className = 'column-fourth';

  const $animeImg = document.createElement('img');
  $animeImg.src = anime.images.jpg.image_url;
  $animeImg.alt = anime.title_english;

  animeDiv.appendChild($animeImg);

  animeDiv.addEventListener('click', () => displayAnimeDetails(anime));

  return animeDiv;
}

$tabContainer.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLDivElement;
  if (!$eventTarget) throw new Error('eventTarget query not found');

  if ($eventTarget.matches('.tab')) {
    $tab.forEach((tab) => {
      if (tab === $eventTarget) {
        tab.className = 'tab active';
      } else {
        tab.className = 'tab';
      }
    });

    const $selectedView = $eventTarget.getAttribute('data-view');
    if (!$selectedView) throw new Error('$selectedView query failed');

    $view.forEach(($view) => {
      if ($view.getAttribute('data-view') === $selectedView) {
        $view.classList.remove('hidden');
      } else {
        $view.classList.add('hidden');
      }
    });
  }
});

function setTab($selectedView: string): void {
  $tab.forEach(($tab) => {
    if ($tab.getAttribute('data-view') === $selectedView) {
      $tab.classList.add('active');
    } else {
      $tab.classList.remove('active');
    }
  });
  saveToLocalStorage();
}

function setView($selectedView: string): void {
  $view.forEach(($view) => {
    if ($view.getAttribute('data-view') === $selectedView) {
      $view.classList.remove('hidden');
    } else {
      $view.classList.add('hidden');
    }
  });
  saveToLocalStorage();
}

function displayAnimeDetails(anime: any): void {
  const $animeTitle = document.querySelector('.anime-title') as HTMLElement;
  const $animeDescription = document.querySelector(
    '.anime-description',
  ) as HTMLElement;
  const $animeDetailsContainer = document.querySelector(
    '.anime-details',
  ) as HTMLElement;

  if (!$animeTitle) throw new Error('animeTitle query not found!');
  if (!$animeDescription) throw new Error('animeDescription query not found!');
  if (!$animeDetailsContainer)
    throw new Error('animeDetailsContainer query not found!');

  $animeDetailsContainer.innerHTML = '';

  $animeTitle.textContent = anime.title_english || 'Title not available';

  $animeDescription.textContent =
    anime.synopsis || 'Description not available.';

  const $imageElement = document.createElement('img');
  $imageElement.src = anime.images.jpg.image_url;
  $imageElement.alt = anime.title_english || 'Anime image';
  $imageElement.className = 'anime-image';

  $animeDetailsContainer.append($imageElement, $animeTitle, $animeDescription);

  setView('anime-details');
}

async function fetchAllAnime(): Promise<void> {
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

      currentPage++;
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
fetchAllAnime();

async function getAnimeRecommendations(): Promise<void> {
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
  } catch (err) {
    console.error('There has been a problem with your fetch operation:', err);
  }
}
getAnimeRecommendations();
