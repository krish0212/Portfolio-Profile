/* =========================================
   DOM ELEMENTS
========================================= */

const body = document.body;

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");

const navbar = document.getElementById("navbar");

const typingText = document.getElementById("typingText");

const yearElement = document.getElementById("year");


/* =========================================
   CURRENT YEAR
========================================= */

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   TYPING ANIMATION
========================================= */

const roles = [

    "Python Full Stack Developer",

    "Django Developer",

    "AI/ML Developer",

    "Backend Developer"

];

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

    }


    let speed = deleting ? 45 : 85;


    if (
        !deleting &&
        characterIndex === currentRole.length
    ) {

        speed = 1700;

        deleting = true;

    }


    if (
        deleting &&
        characterIndex === 0
    ) {

        deleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;

        speed = 400;

    }


    setTimeout(typeRole, speed);

}


window.addEventListener("DOMContentLoaded", () => {

    setTimeout(typeRole, 700);

});


/* =========================================
   THEME TOGGLE
========================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    body.setAttribute(
        "data-theme",
        "light"
    );

}


function updateThemeIcon() {

    if (!themeBtn) return;

    const icon =
        themeBtn.querySelector("i");

    const lightMode =
        body.getAttribute("data-theme") === "light";


    if (icon) {

        icon.className = lightMode
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

    }

}


updateThemeIcon();


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        const lightMode =
            body.getAttribute("data-theme") === "light";


        if (lightMode) {

            body.removeAttribute("data-theme");

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        } else {

            body.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        }


        updateThemeIcon();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            const isOpen =
                navMenu.classList.contains("active");


            icon.className = isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

        }

    });

}


/* Close mobile menu */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");


        const icon =
            menuBtn?.querySelector("i");


        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    { passive: true }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================
   PROJECT ACCORDIONS
========================================= */

const projectExpandButtons =
    document.querySelectorAll(
        ".project-expand"
    );


projectExpandButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const targetId =
                button.dataset.target;


            const target =
                document.getElementById(
                    targetId
                );


            if (!target) return;


            const isOpen =
                target.classList.contains(
                    "show"
                );


            /* Close all other project lists */

            document
                .querySelectorAll(
                    ".sub-projects.show"
                )
                .forEach((list) => {

                    if (list !== target) {

                        list.classList.remove(
                            "show"
                        );

                    }

                });


            document
                .querySelectorAll(
                    ".project-expand.open"
                )
                .forEach((btn) => {

                    if (btn !== button) {

                        btn.classList.remove(
                            "open"
                        );

                    }

                });


            target.classList.toggle(
                "show",
                !isOpen
            );


            button.classList.toggle(
                "open",
                !isOpen
            );


            button.childNodes[0].textContent =
                !isOpen
                    ? "Close Projects "
                    : "Explore Projects ";


            /* Keep correct text for templates */

            if (targetId === "webProjects") {

                button.childNodes[0].textContent =
                    !isOpen
                        ? "Close Templates "
                        : "Explore Templates ";

            }

        }
    );

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!formStatus) return;


            formStatus.textContent =
                "Sending message...";


            formStatus.style.color =
                "var(--text-secondary)";


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "email"
                )?.value.trim();


            const subject =
                document.getElementById(
                    "subject"
                )?.value.trim();


            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            const formData = {

                name,
                email,
                subject,
                message

            };


            try {

                const response =
                    await fetch(
                        "https://formspree.io/f/mzdnypek",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    formData
                                )

                        }
                    );


                if (response.ok) {

                    formStatus.textContent =
                        "Message sent successfully!";

                    formStatus.style.color =
                        "#34d399";


                    contactForm.reset();

                } else {

                    formStatus.textContent =
                        "Unable to send message. Please try again.";

                    formStatus.style.color =
                        "#f87171";

                }

            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                formStatus.textContent =
                    "Network error. Please try again.";

                formStatus.style.color =
                    "#f87171";

            }

        }
    );

}


/* =========================================
   SMOOTH SCROLL
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            (event) => {

                const targetId =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* =========================================
   SIMPLE REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .skill-category, .project-card, .featured-project, .career-box, .contact-form-wrapper, .profile-card"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {

                threshold: 0.12

            }
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   ESC KEY - CLOSE MOBILE MENU
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navMenu
        ) {

            navMenu.classList.remove(
                "active"
            );


            const icon =
                menuBtn?.querySelector("i");


            if (icon) {

                icon.className =
                    "fa-solid fa-bars";

            }

        }

    }
);