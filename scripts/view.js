document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://my-json-server.typicode.com/3x3ltv/kino-data/images"; // API URL
    const videoContainer = document.getElementById("video-player-placeholder");
    const descriptionText = document.querySelector(".description-text");
    const nextButton = document.createElement("button");

    let currentId = 1; // Начальный ID фильма

    nextButton.textContent = "Далее";
    nextButton.style.marginTop = "20px";
    document.querySelector(".action-buttons").appendChild(nextButton);

    async function loadMovie(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные о фильме.");
            }
        const data = await response.json();

        videoContainer.innerHTML = `
                <iframe
                    src="//api.embess.ws/embed/movie/${data.id}"
                    allowfullscreen
                    allow="fullscreen; autoplay; encrypted-media">
                </iframe>`;

            descriptionText.textContent = data.description || "Описание отсутствует.";


        }
        catch (error) {
            console.error("Ошибка при загрузке фильма:", error);
            descriptionText.textContent = "Ошибка загрузки фильма. Попробуйте позже.";
        }
    }

    loadMovie(currentId);
    nextButton.addEventListener("click", () => {
    currentId++;
    loadMovie(currentId);
});
});
