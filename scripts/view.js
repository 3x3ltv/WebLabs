document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://my-json-server.typicode.com/3x3ltv/kino-data/images";
    const playerContainer = document.getElementById("video-player-placeholder");
    const descriptionText = document.querySelector(".description-text");
    const movieTitle = document.getElementById("movie-title");
    const nextMovieButton = document.getElementById("next-movie-button");

    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get('id'); // id из строки запроса
    currentId = currentId ? parseInt(currentId, 10) : 1;

    const videoBasePath = "/video/";

    async function loadMovie(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные о фильме.");
            }

            const data = await response.json();
            const videoUrl = `${videoBasePath}film${data.id}.mp4`;

            playerContainer.innerHTML = "";
            new Clappr.Player({
                source: videoUrl,
                parentId: "#video-player-placeholder",
                autoPlay: false,
                width: "100%",
                height: "100%",
            });

            movieTitle.textContent = data.name || `Фильм ${id}`;
            descriptionText.textContent = data.description || "Описание отсутствует.";
        } catch (error) {
            console.error("Ошибка при загрузке фильма:", error);
            descriptionText.textContent = "Ошибка загрузки фильма. Попробуйте позже.";
        }
    }

    loadMovie(currentId);

    nextMovieButton.addEventListener("click", () => {
        currentId++;
        loadMovie(currentId);
    });
});
