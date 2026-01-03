const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Function to set active nav link based on current page
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const currentFile = currentLocation.substring(currentLocation.lastIndexOf('/') + 1) || 'index.html';
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        
        const href = link.getAttribute("href");
        
        if (!href || href === "#" || href.startsWith("http")) {
            return;
        }
        
        const linkFile = href.substring(href.lastIndexOf('/') + 1) || 'index.html';
        
        // Check if current page matches the link href
        if (currentFile === linkFile || 
            (currentFile === '' && linkFile === 'index.html') ||
            (currentFile === 'index.html' && linkFile === 'index.html') ||
            (currentFile === 'tentang_kami.html' && linkFile === 'tentang_kami.html')) {
            link.classList.add("active");
        }
    });
}

// Set active link on page load
document.addEventListener("DOMContentLoaded", setActiveNavLink);

document.addEventListener("DOMContentLoaded", () => {
    const openVideoBtn = document.getElementById("openVideoBtn");
    const closeVideoBtn = document.getElementById("closeVideoBtn");
    const videoModal = document.getElementById("videoModal");
    const videoIframe = document.getElementById("videoIframe");

    if (!openVideoBtn || !closeVideoBtn || !videoModal || !videoIframe) {
        return;
    }

    const iframeSrc = videoIframe.src;

    function playVideo() {
        videoIframe.src = iframeSrc.replace("autoplay=0", "autoplay=1");
    }

    function stopVideo() {
        videoIframe.src = iframeSrc.replace("autoplay=1", "autoplay=0");
        setTimeout(() => {
            videoIframe.src = iframeSrc;
        }, 100);
    }

    openVideoBtn.addEventListener("click", () => {
        videoModal.classList.add("active");
        playVideo();
    });

    closeVideoBtn.addEventListener("click", () => {
        videoModal.classList.remove("active");
        stopVideo();
    });

    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove("active");
            stopVideo();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoModal.classList.contains("active")) {
            videoModal.classList.remove("active");
            stopVideo();
        }
    });

    const memberModal = document.getElementById("memberModal");
    
    if (!memberModal) {
        return;
    }

    const memberCards = document.querySelectorAll(".member-clickable");
    const closeMemberBtn = document.getElementById("closeMemberBtn");
    const memberModalPhoto = document.getElementById("memberModalPhoto");
    const memberModalName = document.getElementById("memberModalName");
    const memberModalNim = document.getElementById("memberModalNim");

    const openModal = (name, nim, image) => {
        memberModalName.textContent = name;
        memberModalNim.textContent = nim;
        memberModalPhoto.src = image;
        memberModal.classList.add("active");
    };

    const closeModal = () => {
        memberModal.classList.remove("active");
    };

    const toggleModal = (name, nim, image) => {
        if (memberModal.classList.contains("active")) {
            closeModal();
        } else {
            openModal(name, nim, image);
        }
    };

    memberCards.forEach((card) => {
        card.addEventListener("click", () => {
            const name = card.dataset.name;
            const nim = card.dataset.nim;
            const image = card.dataset.image;
            toggleModal(name, nim, image);
        });
    });

    if (closeMemberBtn) {
        closeMemberBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    memberModal.addEventListener("click", (e) => {
        if (e.target === memberModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && memberModal.classList.contains("active")) {
            closeModal();
        }
    });
});

