const submitBtn = document.getElementById('submitBtn');
const musicBtn = document.getElementById('musicBtn');
const giftBtn = document.getElementById('giftBtn');
const giftScreen = document.querySelector('.gift-screen');
const giftBox = document.getElementById('giftBox');
const bouquet = document.getElementById('bouquet');
const confetti = document.getElementById('confetti');
const bgMusic = document.getElementById('bgMusic');

submitBtn.addEventListener('click', function() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        const message = `${name} Hanım, ANNELER GÜNÜNÜZ KUTLU OLSUN💐`;
        document.getElementById('messageText').textContent = message;
        document.getElementById('message').classList.remove('hidden');
        document.querySelector('.input-section').style.display = 'none';

        if (bgMusic.paused) {
            bgMusic.currentTime = 40; // Snowman şarkısının en iyi bölümü için başlangıç
            bgMusic.play().catch(() => {
                musicBtn.textContent = 'Müziği Aç';
            });
            musicBtn.textContent = 'Müziği Kapat';
        }

        setTimeout(() => {
            giftBtn.classList.add('show');
        }, 3000);
    } else {
        alert('Lütfen isminizi girin.');
    }
});

giftBtn.addEventListener('click', function() {
    document.querySelector('.container').classList.add('hidden');
    giftBtn.classList.add('hidden');
    giftScreen.classList.remove('hidden');
    bouquet.classList.add('hidden');
    giftBox.classList.remove('hidden');
    giftBox.classList.remove('open');
});

giftBox.addEventListener('click', function() {
    giftBox.classList.add('open');
    confetti.classList.remove('hidden');
    createConfetti();
    setTimeout(() => {
        giftBox.classList.add('hidden');
        bouquet.classList.remove('hidden');
        // Kısa kalp yağmuru başlat
        startHeartRain();
    }, 700);
    setTimeout(() => {
        confetti.classList.add('hidden');
        confetti.innerHTML = '';
    }, 1800);
});

function createConfetti() {
    confetti.innerHTML = '';
    const colors = ['#ff7fbf', '#ffd6e8', '#ffda75', '#ff8fc3', '#ffb3ba'];
    for (let i = 0; i < 25; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.6}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.width = `${8 + Math.random() * 8}px`;
        piece.style.height = `${12 + Math.random() * 8}px`;
        confetti.appendChild(piece);
    }
}

function startHeartRain() {
    const giftScreen = document.querySelector('.gift-screen');
    const heartContainer = document.createElement('div');
    heartContainer.className = 'heart-rain-container';
    heartContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 10;
    `;
    giftScreen.appendChild(heartContainer);

    // 8-10 kalp oluştur
    const heartCount = 8 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 15}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: heartFall 2s ease-out forwards;
                opacity: 0.8;
            `;
            heartContainer.appendChild(heart);
            
            // Kalp düştükten sonra kaldır
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 200); // Her kalp 200ms arayla başlasın
    }
    
    // 3 saniye sonra container'ı kaldır
    setTimeout(() => {
        if (heartContainer.parentNode) {
            heartContainer.parentNode.removeChild(heartContainer);
        }
    }, 4000);
}

musicBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.currentTime = 40; // En iyi kısmı her açışta başlat
        bgMusic.play();
        musicBtn.textContent = 'Müziği Kapat';
    } else {
        bgMusic.pause();
        musicBtn.textContent = 'Müziği Aç';
    }
});