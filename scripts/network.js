document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://my-json-server.typicode.com/3x3ltv/kino-data/images";
    const moviesGrid = document.querySelector(".movies-grid");
    const preloader = document.getElementById("preloader");
    const MAX_CARDS = 10;

    function renderMovies(data) {
        moviesGrid.innerHTML = "";
        data.forEach((item) => {
            const movieCard = createMovieCard(item);
            moviesGrid.appendChild(movieCard);
        });
    }

    function showError(message) {
        moviesGrid.innerHTML = `<p class="error">⚠ ${message}</p>`;
    }

    function getTypeFromPath() {
        const path = window.location.pathname.toLowerCase();

        if (path.includes("movies")) {
            return "film";
        } else if (path.includes("series")) {
            return "series";
        } else {
            return "all";
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function loadMovies() {
        preloader.style.display = "flex";
        moviesGrid.innerHTML = "";
        const type = getTypeFromPath();
        const typeFilter = type === "all" ? "" : `?type=${type}`;
        const urlWithLimit = `${apiUrl}${typeFilter}${typeFilter ? "&" : "?"}_limit=${MAX_CARDS}`;

        try {
            const response = await fetch(urlWithLimit);

            if (!response.ok) {
                moviesGrid.innerHTML = `<p class="error">⚠ ${message}</p>`;
            }

            const data = await response.json();
            console.log("Полученные данные:", data);

            let filteredData = type === "all" ? data : data.filter(item => item.type === type);
            filteredData = shuffleArray(filteredData);

            preloader.style.display = "none";
            renderMovies(filteredData);
        } catch (error) {
            preloader.style.display = "none";
            showError("Что-то пошло не так. Проверьте подключение к сети.");
            console.error("Ошибка загрузки:", error);
        }
    }

    function createMovieCard(movie) {
        const article = document.createElement("article");
        article.className = "movie-card";

        const img = document.createElement("img");
        img.className = "container";
        img.alt = movie.description || "Movie Image";

        if (movie.url && movie.url.startsWith("http")) {
            img.src = movie.url;
        } else {
            img.src = "default-image.jpg";
        }

        img.addEventListener("click", () => {
            window.location.href = `view-page.html?id=${movie.id}`;
        });

        article.appendChild(img);
        return article;
    }

    loadMovies().then(() => {
        console.log("Фильмы загружены успешно.");
    }).catch((error) => {
        console.error("Ошибка при загрузке фильмов:", error);
    });
});
