document.addEventListener('DOMContentLoaded', function() {
    const showBtn = document.getElementById('showConferenceInfoBtn');
    const infoDiv = document.getElementById('conference-info');

    const confs = [
        {
            name: "AI and Machine Learning",
            sections: ["Deep Learning", "Natural Language Processing", "Computer Vision"],
            uni: "Tech University",
            date: "2024-11-9"
        },
        {
            name: "Web Development Trends",
            sections: ["Frontend Frameworks", "Backend Technologies", "DevOps"],
            uni: "Code Academy",
            date: "2024-11-15"
        },
        {
            name: "Cybersecurity Symposium",
            sections: ["Network Security", "Ethical Hacking", "Data Privacy"],
            uni: "Security Institute",
            date: "2024-11-25"
        }
    ];

    function daysDiff(date) {
        const diff = new Date(date) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    showBtn.addEventListener('click', function() {
        infoDiv.innerHTML = '';

        confs.forEach(conf => {
            const startDays = daysDiff(conf.date);
            const endDays = startDays + 2; 
            
            let status, activeSection;
            if (startDays > 0) {
                status = `Починається через ${startDays} днів`;
                activeSection = "Конференція ще не почалася";
            } else if (endDays < 0) {
                status = "Завершена";
                activeSection = "Конференція завершена";
            } else {
                status = `В процесі, закінчується через ${endDays + 1} днів`;
                activeSection = conf.sections[-startDays] || "Сьогодні немає активної секції";
            }

            const confBlock = document.createElement('div');
            confBlock.className = 'conference-block';
            if (startDays <= 0 && endDays >= 0) {
                confBlock.classList.add('active');
            }
            
            confBlock.innerHTML = `
                <h4>${conf.name}</h4>
                <p><strong>Університет:</strong> ${conf.uni}</p>
                <p><strong>Статус:</strong> ${status}</p>
                <p><strong>Дата початку:</strong> ${conf.date}</p>
                <p><strong>Активна секція сьогодні:</strong> ${activeSection}</p>
                <p><strong>Всі секції:</strong></p>
                <ul>
                    ${conf.sections.map((section, i) => 
                        `<li class="${i === -startDays && startDays <= 0 && endDays >= 0 ? 'active-section' : ''}">${section} (День ${i + 1})</li>`
                    ).join('')}
                </ul>
            `;

            infoDiv.appendChild(confBlock);
        });
    });
});