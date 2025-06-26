fetch('https://api.jikan.moe/v4/top/anime?type=tv')
      .then(res => res.json())
      .then(data => {
        const section = document.getElementById('anime-section');
        data.data.forEach(anime => {
          const genres = anime.genres.map(g => g.name).join(', ');
          const rating = anime.rating || 'Unknown';
          const season = anime.season || 'Unknown';
          const score = anime.score || 'N/A';

          const card = document.createElement('div');
          card.className = 'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer';
          card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="w-full h-48 object-contain">
            <div class="p-4 space-y-2">
              <h2 class="text-xl font-bold text-indigo-600">${anime.title_english || anime.title}</h2>
              <p><strong>Season:</strong> ${season}</p>
              <p><strong>Genres:</strong> ${genres}</p>
              <p><strong>Rating:</strong> ${rating}</p>
              <p><strong>Score:</strong> ⭐ ${score}</p>
            </div>
          `;

          card.addEventListener('click', () => {
            window.location.href = `anime.html?id=${anime.mal_id}`;
          });

          section.appendChild(card);
        });
      })
      .catch(err => console.error('Error:', err));

// Grab all search inputs
const searchInputs = document.querySelectorAll('input[type="search"]');
const section = document.getElementById('anime-section');

searchInputs.forEach(input => {
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = input.value.trim();
      if (query) {
        searchAnime(query);
      }
    }
  });
});

function searchAnime(query) {
  fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&type=tv`)
    .then(res => res.json())
    .then(data => {
      section.innerHTML = ''; // Clear previous results

      if (data.data.length === 0) {
        section.innerHTML = `<p class="text-center col-span-3 text-lg text-gray-500">No results found for "${query}".</p>`;
        return;
      }

      data.data.forEach(anime => {
        const genres = anime.genres.map(g => g.name).join(', ');
        const rating = anime.rating || 'Unknown';
        const season = anime.season || 'Unknown';
        const score = anime.score || 'N/A';

        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer';
        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="w-full h-48 object-contain">
          <div class="p-4 space-y-2">
            <h2 class="text-xl font-bold text-indigo-600">${anime.title_english || anime.title}</h2>
            <p><strong>Season:</strong> ${season}</p>
            <p><strong>Genres:</strong> ${genres}</p>
            <p><strong>Rating:</strong> ${rating}</p>
            <p><strong>Score:</strong> ⭐ ${score}</p>
          </div>
        `;

        card.addEventListener('click', () => {
          window.location.href = `anime.html?id=${anime.mal_id}`;
        });

        section.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Search failed:', err);
      section.innerHTML = `<p class="text-center text-red-500">An error occurred while searching.</p>`;
    });
}
