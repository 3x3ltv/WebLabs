document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://my-json-server.typicode.com/3x3ltv/kino-data/images";
    const moviesGrid = document.querySelector(".movies-grid");
    const preloader = document.getElementById("preloader");

    function renderMovies(data) {
        moviesGrid.innerHTML = "";

        data.forEach((item) => {
            const article = document.createElement("article");
            article.className = "movie-card";

            const img = document.createElement("img");
            img.className = "container";
            img.alt = item.description || "Movie Image";

            if (item.url && item.url.startsWith("http")) {
                img.src = item.url;
            } else {
                img.src = "default-image.jpg";
            }

            article.appendChild(img);
            moviesGrid.appendChild(article);
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

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }

            const data = await response.json();
            console.log("Полученные данные:", data);

            const type = getTypeFromPath();
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

    loadMovies().then(() => {
        console.log("Фильмы загружены успешно.");
    }).catch((error) => {
        console.error("Ошибка при загрузке фильмов:", error);
    });
});
