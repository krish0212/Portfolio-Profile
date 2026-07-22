// --- Dom Elements ---
const themeBtn = document.getElementById('themeBtn');
const mobileMenuBtn = document.getElementById('mobileMenu');
const navLinksContainer = document.getElementById('navLinks');
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const typingElement = document.querySelector('.typing-text');

// --- 1. Dynamic Auto-Typing Effect ---
const words = ["Full Stack Developer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    if (!typingElement) return; // Guard clause in case element missing
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeAnimation, typeSpeed);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(typeAnimation, 1000));


// --- 2. Interactive Light/Dark Mode Toggle ---
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const icon = themeBtn.querySelector('i');
        
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            if (icon) icon.className = 'fa-solid fa-moon';
        } else {
            document.body.setAttribute('data-theme', 'light');
            if (icon) icon.className = 'fa-solid fa-sun';
        }
    });
}


// --- 3. Responsive Mobile Menu Sidebar ---
if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    // Close menu when link is clicked on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}


// --- 4. Scroll Tracking (Active Navbar Highlights) ---
window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY; // Modern standard

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // FIX: Only match if currentSectionId is NOT empty
        if (currentSectionId && href.includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for the home page scroll-down mouse button
// const scrollDownBtn = document.getElementById('scrollDownBtn');

// if (scrollDownBtn) {
//     scrollDownBtn.addEventListener('click', function(e) {
//         e.preventDefault(); // Stop the default page jump
        
//         const targetSection = document.querySelector('#about');
//         if (targetSection) {
//             targetSection.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// }

// const contactForm = document.getElementById('contactForm');
// const formStatus = document.getElementById('formStatus');

// if (contactForm) {
//     contactForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevents page reload
        
//         formStatus.textContent = "Sending message... ✉️";
//         formStatus.style.color = "var(--text-color)";

//         // Simulate an API call (or plug in Formspree/EmailJS here)
//         setTimeout(() => {
//             formStatus.textContent = "Message sent successfully! 🎉";
//             formStatus.style.color = "#28a745"; // Green success text
//             contactForm.reset(); // Clears the form inputs
//         }, 2000);
//     });
// }

// Python projects
function togglePythonSuite(event) {
    event.preventDefault();
    const card = event.target.closest('.project-card');
    const list = card.querySelector('.python-projects-list');
    const isHidden = list.style.display === 'none';
    
    list.style.display = isHidden ? 'block' : 'none';
    event.target.innerHTML = isHidden 
        ? 'Close Suite <i class="fa-solid fa-chevron-up"></i>' 
        : 'Explore Projects <i class="fa-solid fa-chevron-down"></i>';
}

// Toggle UI Templates List
function toggleUISuite(event) {
    event.preventDefault();
    const card = event.target.closest('.project-card');
    const list = card.querySelector('.ui-projects-list');
    const isHidden = list.style.display === 'none';
    
    list.style.display = isHidden ? 'block' : 'none';
    event.target.innerHTML = isHidden 
        ? 'Close Templates <i class="fa-solid fa-chevron-up"></i>' 
        : 'Explore Templates <i class="fa-solid fa-chevron-down"></i>';
}

// Toggle Games List
function toggleGameSuite(event) {
    event.preventDefault();
    const card = event.target.closest('.project-card');
    const list = card.querySelector('.game-projects-list');
    const isHidden = list.style.display === 'none';
    
    list.style.display = isHidden ? 'block' : 'none';
    event.target.innerHTML = isHidden 
        ? 'Close Games <i class="fa-solid fa-chevron-up"></i>' 
        : 'Explore Games <i class="fa-solid fa-chevron-down"></i>';
}