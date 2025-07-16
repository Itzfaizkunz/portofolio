AOS.init();

// Fungsi untuk menyembunyikan preloader
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        preloader.addEventListener('transitionend', function() {
            preloader.style.display = 'none';
        });
    }
}

// 1. Buat sebuah Promise yang selesai setelah halaman dimuat
const pageLoadPromise = new Promise(resolve => {
    window.addEventListener('load', resolve);
});

// 2. Buat sebuah Promise yang selesai setelah waktu minimal (misal 3.5 detik)
const minDelayPromise = new Promise(resolve => {
    setTimeout(resolve, 3500); // 3500 milidetik = 3.5 detik
});

// 3. Jalankan fungsi hidePreloader() HANYA SETELAH KEDUA Promise di atas selesai
Promise.all([pageLoadPromise, minDelayPromise]).then(() => {
    hidePreloader();
});

// ========================================================
// === Logika untuk menutup hamburger menu saat link diklik ===
// ========================================================
const hamburgerCheckbox = document.querySelector('.menu');
const navLinks = document.querySelectorAll('nav ul li a');

function closeMenu() {
    hamburgerCheckbox.checked = false;
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ========================================================
// === Logika untuk mengubah header saat scroll ===
// ========================================================
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
// === Logika untuk Animasi Mengetik Teks Dinamis ===
// ========================================================

document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen span tempat teks akan ditampilkan
    const dynamicText = document.getElementById('dynamic-text');
    
    // Daftar kata-kata yang akan ditampilkan bergantian
    const words = ["M. FAIZ ADI BUFFERY","Tech Enthusiast", "Problem Solving"];
    
    // Variabel untuk melacak status animasi
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        // Tentukan kata saat ini
        const currentWord = words[wordIndex];
        
        // Buat substring dari kata saat ini berdasarkan status (mengetik/menghapus)
        let displayText = '';
        if (isDeleting) {
            // Proses menghapus
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Proses mengetik
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Tampilkan teks ke elemen span
        dynamicText.textContent = displayText;

        // Tentukan kecepatan mengetik
        let typeSpeed = isDeleting ? 100 : 200;

        // Logika untuk mengubah status dari mengetik ke menghapus
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Jeda sebelum mulai menghapus
        } 
        // Logika untuk mengubah status dari menghapus ke mengetik kata berikutnya
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
            typeSpeed = 500; // Jeda sebelum mulai mengetik kata baru
        }

        // Panggil fungsi type() lagi setelah jeda sesuai kecepatan
        setTimeout(type, typeSpeed);
    }

    // Mulai animasi saat halaman selesai dimuat
    type();
});