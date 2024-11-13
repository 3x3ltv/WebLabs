document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("schedule-form");
    const container = document.getElementById("schedule-container");
    const saveBtn = document.getElementById("save-btn");
    const loadBtn = document.getElementById("load-btn");
    const exportBtn = document.getElementById("export-btn");
    const importBtn = document.getElementById("import-btn");
    const importFile = document.getElementById("import-file");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        generateSchedule();
    });

    saveBtn.addEventListener("click", saveSettings);
    loadBtn.addEventListener("click", loadSettings);
    exportBtn.addEventListener("click", exportSchedule);
    importBtn.addEventListener("click", () => importFile.click());
    importFile.addEventListener("change", importSchedule);

    function generateSchedule(data) {
        const days = parseInt(document.getElementById("days").value);
        const lessons = parseInt(document.getElementById("lessons").value);
        const language = document.getElementById("language").value;

        const dayNames = language === "ru" ? ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        container.innerHTML = "";
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const thDay = document.createElement("th");
        thDay.textContent = language === "ru" ? "День" : "Day";
        headerRow.appendChild(thDay);

        for (let i = 1; i <= lessons; i++) {
            const th = document.createElement("th");
            th.textContent = language === "ru" ? `Урок ${i}` : `Lesson ${i}`;
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (let i = 0; i < days; i++) {
            const row = document.createElement("tr");

            const dayCell = document.createElement("td");
            dayCell.textContent = dayNames[i];
            row.appendChild(dayCell);

            for (let j = 0; j < lessons; j++) {
                const lessonCell = document.createElement("td");
                lessonCell.contentEditable = true;
                lessonCell.textContent = data ? data[i][j] || "" : "";
                row.appendChild(lessonCell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    }

    function saveSettings() {
        const settings = {
            days: document.getElementById("days").value,
            lessons: document.getElementById("lessons").value,
            language: document.getElementById("language").value
        };
        localStorage.setItem("scheduleSettings", JSON.stringify(settings));
        alert("Настройки сохранены.");
    }

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem("scheduleSettings"));
        if (settings) {
            document.getElementById("days").value = settings.days;
            document.getElementById("lessons").value = settings.lessons;
            document.getElementById("language").value = settings.language;
            alert("Настройки загружены.");
        } else {
            alert("Сохраненные настройки не найдены.");
        }
    }

    function exportSchedule() {
        const table = container.querySelector("table");
        const data = [];

        if (!table) return alert("Нет данных для экспорта");

        for (let i = 1; i < table.rows.length; i++) {
            const row = [];
            for (let j = 1; j < table.rows[i].cells.length; j++) {
                row.push(table.rows[i].cells[j].textContent);
            }
            data.push(row);
        }

        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "schedule.json";
        link.click();
    }

    function importSchedule(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const data = JSON.parse(e.target.result);
            generateSchedule(data);
        };
        reader.readAsText(file);
    }
});
