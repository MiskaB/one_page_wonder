// main.js - One Page Wonder

document.addEventListener('DOMContentLoaded', function () {
    // Contact form handler
    const form = document.getElementById('contactForm');
    const responseDiv = document.getElementById('formResponse');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulate sending (replace with real backend or 3rd party service)
            responseDiv.textContent = 'Thank you for contacting us! We will get back to you soon.';
            form.reset();
        });
    }

    // SEO JSON-LD injection
    const seoJson = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "One Page Wonder Event",
        "description": "Fast, clean, SEO-optimized landing page for any event or purpose.",
        "startDate": "2025-07-01T19:00",
        "endDate": "2025-07-01T23:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Melbourne, Australia",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Melbourne",
                "addressCountry": "AU"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "One Page Wonder",
            "url": "https://yourdomain.com/"
        }
    };
    const seoScript = document.getElementById('seo-json');
    if (seoScript) {
        seoScript.type = 'application/ld+json';
        seoScript.textContent = JSON.stringify(seoJson, null, 2);
    }

    // Scroll arrow logic
    const scrollDown = document.getElementById('scrollDown');
    const scrollUp = document.getElementById('scrollUp');
    function toggleArrows() {
        if (window.scrollY > window.innerHeight * 0.5) {
            scrollUp.style.display = 'flex';
            scrollDown.style.display = 'none';
        } else {
            scrollUp.style.display = 'none';
            scrollDown.style.display = 'flex';
        }
    }
    if (scrollDown && scrollUp) {
        toggleArrows();
        window.addEventListener('scroll', toggleArrows);
    }

    // Map click handler for device detection
    const mapClickArea = document.getElementById('mapClickArea');
    if (mapClickArea) {
        mapClickArea.addEventListener('click', function () {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            const isAndroid = /Android/.test(navigator.userAgent);
            let url = '';
            if (isIOS) {
                url = 'https://maps.apple.com/?q=Melbourne';
            } else if (isAndroid) {
                url = 'geo:0,0?q=Melbourne';
            } else {
                url = 'https://www.google.com/maps/search/?api=1&query=Melbourne';
            }
            window.open(url, '_blank');
        });
    }

    // Image modal logic
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalImg');
    const modalClose = document.getElementById('imgModalClose');
    document.querySelectorAll('.section-image').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // Section background image fade logic
    const bgOverlay = document.getElementById('bg-overlay');
    const sectionBgMap = {
        intro: 'Resources/BG.png',
        coffeeshop: 'Resources/CoffeeShop.png',
        karaokebar: 'Resources/KaraokeBar.png',
        bikerepair: 'Resources/BikeRepair.png',
        bakery: 'Resources/Bakery.png',
        tattooshop: 'Resources/TattooShop.png'
    };
    const sectionOrder = ['intro', 'coffeeshop', 'karaokebar', 'bikerepair', 'bakery', 'tattooshop'];
    function getCurrentSection() {
        let current = 'intro';
        let minDist = Infinity;
        sectionOrder.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top - 80); // 80px offset for header
                if (rect.top < window.innerHeight * 0.7 && dist < minDist) {
                    minDist = dist;
                    current = id;
                }
            }
        });
        return current;
    }
    let lastSection = '';
    function updateBg() {
        const section = getCurrentSection();
        if (section !== lastSection) {
            if (bgOverlay) {
                bgOverlay.style.opacity = 0;
                setTimeout(() => {
                    bgOverlay.style.backgroundImage = `url('${sectionBgMap[section]}')`;
                    bgOverlay.style.opacity = 1;
                }, 400);
            }
            lastSection = section;
        }
    }
    if (bgOverlay) {
        bgOverlay.style.backgroundImage = `url('${sectionBgMap.intro}')`;
        bgOverlay.style.opacity = 1;
        window.addEventListener('scroll', updateBg);
        window.addEventListener('resize', updateBg);
        // Also update on nav button click (in case of instant jump)
        document.querySelectorAll('.quick-nav button').forEach(btn => {
            btn.addEventListener('click', () => setTimeout(updateBg, 600));
        });
    }
    // Initial update
    setTimeout(updateBg, 100);
});
