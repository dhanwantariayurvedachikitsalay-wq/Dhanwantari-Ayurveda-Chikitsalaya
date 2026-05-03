document.addEventListener('DOMContentLoaded', () => {
    // AOS Init
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = item.src;
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// 🔥 Swarnaprashana Dates Fetch
// 🔥 Swarnaprashana Dates Fetch
const sheetURL = "https://opensheet.elk.sh/1reqBSgwvNKqFwn81qTT0_Q5eFyV8bPcTq_hUNjEEjIE/Sheet1";

function loadSwarnaprashanaDates() {
    const list = document.getElementById("dateList");
    if (!list) return;

    fetch(sheetURL)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                list.innerHTML = "<li>No upcoming dates scheduled.</li>";
                return;
            }
            list.innerHTML = "";
            data.forEach(item => {
                // We use || "..." to prevent 'undefined' from showing up if a cell is empty
                const eventName = item.Swarnaprashana || "Swarnaprashana";
                const eventDate = item.UpdatedDates || "Date TBD";
                
                const li = document.createElement("li");
                li.innerHTML = `<strong>${eventName}</strong> <span>${eventDate}</span>`;
                list.appendChild(li);
            });
        })
        .catch(() => {
            list.innerHTML = "<li>Unable to load dates. Please contact us for schedule.</li>";
        });
}
loadSwarnaprashanaDates();
// 🔥 Testimonial Auto Slider
// 1. Paste your Published CSV link from Google Sheets here
const TESTIMONIAL_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPTmjobXMj6ou82SSEG-anexxNDPSz-jUVyR0yLtP55AFavtB1Tkb826rT1feqAAq7-Q7zsb9Gxc_h/pub?gid=686597879&single=true&output=csv";

function loadTestimonials() {
    const container = document.getElementById('testimonialContainer');
    if (!container) return;

    fetch(TESTIMONIAL_CSV_URL)
        .then(res => res.text())
        .then(csvText => {
            // Split into rows and remove the first row (header)
            const rows = csvText.split('\n').slice(1);
            let html = '';

            rows.forEach(row => {
                // This logic splits by comma but ignores commas inside quotes
                // It ensures Full Names and Full Feedback are captured perfectly
                const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

                if (columns && columns.length >= 3) {
                    // Clean up quotes and extra spaces
                    const name = columns[1].replace(/^"|"$/g, '').trim(); 
                    const feedback = columns[2].replace(/^"|"$/g, '').trim(); 
                    
                    if(name && feedback) {
                        html += `
                            <div class="testimonial-card" data-aos="fade-up">
                                <p>"${feedback}"</p>
                                <h4>- ${name}</h4>
                            </div>
                        `;
                    }
                }
            });

            // Fill the grid or show a message if empty
            container.innerHTML = html || "<p style='text-align:center; grid-column: 1/-1;'>Be the first to share your experience!</p>";
        })
        .catch(err => {
            console.error("Error loading reviews:", err);
            container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Unable to load reviews at this time.</p>";
        });
}

// Call the function when the page is ready
document.addEventListener('DOMContentLoaded', loadTestimonials);
