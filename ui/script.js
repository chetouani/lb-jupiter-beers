const beers = [
    { name: "Jupiter", style: "Pilsner", description: "Une Jupiter légère et rafraîchissante, parfaite pour toutes les occasions.", img: "assets/beer-bottle-jupiter.png", alcool: 5.2, bottlePriceExcVat: 350, canPriceExcVat: 250 },
    { name: "Rayon", style: "Strong Ale", description: "Une bière robuste avec des notes maltées profondes et une légère touche caramélisée.", img: "assets/beer-bottle-rayon.png", alcool: 8.7, bottlePriceExcVat: 350, canPriceExcVat: 250 },
    { name: "M27", style: "Pale Lager", description: "Une lager légère mais puissante, avec une touche légèrement amère et sucrée.", img: "assets/beer-bottle-m27.png", alcool: 6.9, bottlePriceExcVat: 350, canPriceExcVat: 250 },
    { name: "Solaris", style: "Blonde", description: "Une blonde dorée avec un goût équilibré entre douceur et amertume.", img: "assets/beer-bottle-solaris.png", alcool: 7.8, bottlePriceExcVat: 350, canPriceExcVat: 250 },
    { name: "Gravité 24,79", style: "Barleywine", description: "Une bière ultra forte avec des saveurs complexes et intenses, à boire avec modération.", img: "assets/beer-bottle-gravite.png", alcool: 24.79, bottlePriceExcVat: 350, canPriceExcVat: 250 }
];

function initApp() {
    const carousel = document.querySelector('.carousel');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carousel || !dotsContainer) {
        // DOM not ready yet (dev.js may still be restructuring), retry
        setTimeout(initApp, 50);
        return;
    }

    let currentIndex = 0;

    beers.forEach((beer, i) => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.innerHTML = `
            <img class="card-img" src="${beer.img}" alt="${beer.name}" />
            <div class="card-body">
                <div class="card-name">${beer.name}</div>
                <div class="card-style">${beer.style}</div>
                <div class="card-desc">${beer.description}</div>
                <div class="card-stats">
                    <div class="card-stat">${beer.alcool}%</div>
                </div>
            </div>
        `;
        carousel.appendChild(card);

        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => {
            const cards = carousel.querySelectorAll('.carousel-card');
            cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        };
        dotsContainer.appendChild(dot);
    });

    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
        const cards = carousel.querySelectorAll('.carousel-card');
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 12;
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));

        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < beers.length) {
            dots[currentIndex].classList.remove('active');
            currentIndex = newIndex;
            dots[currentIndex].classList.add('active');
        }
    });

    // Touch & mouse drag swipe support
    let startX = 0;
    let isDragging = false;

    function onPointerDown(e) {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging = true;
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        // Prevent vertical scroll while swiping horizontally
        if (e.touches && Math.abs((e.touches[0].clientX) - startX) > 10) {
            e.preventDefault();
        }
    }

    function onPointerEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - startX;
        const threshold = 50;

        if (Math.abs(diff) < threshold) return;

        const cards = carousel.querySelectorAll('.carousel-card');
        if (diff < 0 && currentIndex < cards.length - 1) {
            // Swipe left -> next
            cards[currentIndex + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else if (diff > 0 && currentIndex > 0) {
            // Swipe right -> prev
            cards[currentIndex - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    carousel.addEventListener('touchstart', onPointerDown, { passive: true });
    carousel.addEventListener('touchmove', onPointerMove, { passive: false });
    carousel.addEventListener('touchend', onPointerEnd);
    carousel.addEventListener('mousedown', onPointerDown);
    carousel.addEventListener('mousemove', onPointerMove);
    carousel.addEventListener('mouseup', onPointerEnd);
    carousel.addEventListener('mouseleave', () => { isDragging = false; });

    // Loading -> Catalog after 3,5 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').classList.remove('active');
        document.getElementById('catalog-screen').classList.add('active');
        // Center first card
        const firstCard = carousel.querySelector('.carousel-card');
        if (firstCard) {
            setTimeout(() => {
                firstCard.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
            }, 50);
        }
    }, 3500);

    // Theme support (lb-phone APIs)
    if (typeof onSettingsChange === 'function') {
        onSettingsChange((settings) => {
            document.querySelector('.app').dataset.theme = settings.display.theme;
        });
    }
    if (typeof getSettings === 'function') {
        getSettings().then((settings) => {
            document.querySelector('.app').dataset.theme = settings.display.theme;
        });
    }
}

initApp();
