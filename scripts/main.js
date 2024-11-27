(function() {
    function setActiveMenu() {
        const links = document.querySelectorAll('nav a');
        const currentPath = window.location.pathname;

        links.forEach((link) => {
            link.classList.remove('active');

            if (currentPath.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setActiveMenu();
    });
})();
