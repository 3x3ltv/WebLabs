(function() {
    function setActiveMenu() {
        const buttons = document.querySelectorAll('nav button');
        const currentPath = window.location.pathname;

        buttons.forEach((button, index) => {
            button.classList.remove('active');

            if (currentPath.includes('movies.html') && index === 0) {
                button.classList.add('active');
            } else if (currentPath.includes('series.html') && index === 1) {
                button.classList.add('active');
            } else if (currentPath.includes('popular.html') && index === 2) {
                button.classList.add('active');
            } else if (currentPath.includes('recommended.html') && index === 3) {
                button.classList.add('active');
            }
        });
    }

    function setupMenuNavigation() {
        const buttons = document.querySelectorAll('nav button');

        buttons[0].addEventListener('click', () => {
            window.location.href = 'movies.html';
        });
        buttons[1].addEventListener('click', () => {
            window.location.href = 'series.html';
        });
        buttons[2].addEventListener('click', () => {
            window.location.href = 'popular.html';
        });
        buttons[3].addEventListener('click', () => {
            window.location.href = 'recommended.html';
        });
    }

    function logPageLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
            const footer = document.querySelector('footer');
            const loadTimeMessage = document.createElement('p');
            loadTimeMessage.textContent = `Время загрузки страницы: ${loadTime} мс.`;
            footer.appendChild(loadTimeMessage);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setActiveMenu();
        setupMenuNavigation();
        logPageLoadTime();
    });
})();
