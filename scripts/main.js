(function() {
    function setActiveMenu() {
        const links = document.querySelectorAll('nav a');
        const currentPath = window.location.pathname;

        links.forEach((link) => {
            link.classList.remove('active');

            // Проверяем, если `href` ссылки соответствует текущему пути
            if (currentPath.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
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
        logPageLoadTime();
    });
})();
