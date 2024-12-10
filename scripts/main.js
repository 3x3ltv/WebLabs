(function() {
    function setActiveMenu() {
        const links = document.querySelectorAll('nav a');
        const currentPath = window.location.fullPath;

        links.forEach((link) => {
            link.classList.remove('active');

            if (currentPath.includes(link('href'))) {
                link.classList.add('active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setActiveMenu();
    });
})();
