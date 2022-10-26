// ===== Preloader =====
function preloader() {
    let preloader = document.getElementById("preloader");

    setTimeout(function() {
        preloader.style.transform = "translateY(-" + (preloader.offsetHeight * 3) + "px)";
    }, 350);
}

// ===== Dark Mode =====
let tmSwitch = document.getElementById("tm-switch");
let userTheme = localStorage.getItem("theme");
let sysTheme = matchMedia("(prefers-color-scheme: dark)").matches;

// Theme Check
function theme_check() {
    if (userTheme === "dark" || (!userTheme && sysTheme)) {
        document.documentElement.classList.add("dark");
        tmSwitch.querySelector("input").checked = true;
    } else {
        tmSwitch.querySelector("input").checked = false;
    }
}

// Theme Switch
tmSwitch.querySelector("input").addEventListener("click", function() {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        this.checked = false;
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        this.checked = true;
        localStorage.setItem("theme", "dark");
    }
});

// ===== Header / Navbar Toggle =====
function navbar_toggle(collapseID) {
    let cID = document.getElementById(collapseID);
    let menu = document.getElementById("menu");

    cID.classList.toggle("hidden");
    cID.classList.toggle("flex");

    if (!cID.classList.contains("hidden")) {
        menu.setAttribute("d", "M6 18L18 6M6 6l12 12");
        header.classList.add("navbar-shown");

        if (document.documentElement.scrollTop <= 50) header.classList.add("bg-[#6047ec]", "dark:bg-slate-800", "shadow-2xl");
    } else {
        menu.setAttribute("d", "M4 6h16M4 12h16m-7 6h7");
        header.classList.remove("navbar-shown");

        if (document.documentElement.scrollTop <= 50) header.classList.remove("bg-[#6047ec]", "dark:bg-slate-800", "shadow-2xl");
    }
}

// ===== Header / Sticky =====
let header = document.querySelector("header");
let oldSY = scrollY;

function header_sticky() {
    if (document.documentElement.scrollTop > 50) {
        header.classList.add("bg-[#6047ec]", "dark:bg-slate-800", "shadow-2xl");

        if (oldSY > scrollY) header.style.transform = "translateY(0)";
        else header.style.transform = "translateY(-" + header.offsetHeight + "px)";

        oldSY = scrollY;
    } else {
        if (!header.classList.contains("navbar-shown")) header.classList.remove("bg-[#6047ec]", "dark:bg-slate-800", "shadow-2xl");
    }
}

// ===== Hero / Swiper Slider =====
if (document.querySelector(".hero-swiper")) {
    const heroSwiper = new Swiper(".hero-swiper", {
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000
        },
        pagination: {
            el: ".hero-swiper-pagination",
            clickable: true
        }
    });
}

// ===== Course Information / Tab =====
function ci_tab() {
    if (document.querySelector(".ci")) {
        let firstTitle = document.querySelectorAll(".ci .tab .title")[0];
        let lastTitle = document.querySelectorAll(".ci .tab .title")[1];
        let firstContent = document.querySelectorAll(".ci .tab-content > div:first-child")[0];
        let lastContent = document.querySelectorAll(".ci .tab-content > div:last-child")[0];

        if (document.getElementById("tab-1").checked) {
            if (lastTitle.classList.contains("active")) lastTitle.classList.remove("active");
            if (!lastContent.classList.contains("hidden")) lastContent.classList.add("hidden");

            firstTitle.classList.add("active");
            firstContent.classList.remove("hidden");
        } else if (document.getElementById("tab-2").checked) {
            firstTitle.classList.remove("active");
            firstContent.classList.add("hidden");

            lastTitle.classList.add("active");
            lastContent.classList.remove("hidden");
        }
    }
}

// ===== Course Information / Skeleton =====
function ci_skeleton() {
    let ci = document.querySelector(".ci");

    if (ci) {
        let ciTop = ci.offsetTop;
        let ciBottom = ciTop + ci.offsetHeight;
        const ciRect = ci.getBoundingClientRect();
        let iW = innerWidth;
        let iH = innerHeight;
        let sY = scrollY;

        if ((iH + sY > ciTop + 340 && iH + sY <= ciBottom + 500) || (ciRect.top >= 0 && ciRect.left >= 0 && ciRect.bottom <= iH && ciRect.right <= iW)) {
            setTimeout(function() {
                document.querySelectorAll(".ci .skeleton").forEach(function(item) {
                    item.classList.remove("skeleton-item", "dark:skeleton-item");
                });
            }, 1000);
        }
    }
}

// ===== Testimonial / Swiper Slider =====
if (document.querySelector(".testimonial-swiper")) {
    const testimonialSwiper = new Swiper(".testimonial-swiper", {
        autoplay: {
            delay: 5000
        },
        spaceBetween: 15
    });
}

// ===== Login + Registration / Control Password =====
function control_password() {
    let password = document.getElementById("password");
    let hidePassword = document.getElementById("hide-password");

    if (hidePassword.classList.contains("inactive")) {
        password.type = "password";
        hidePassword.classList.replace("fa-eye", "fa-eye-slash");
        hidePassword.classList.remove("inactive");
    } else {
        password.type = "text";
        hidePassword.classList.replace("fa-eye-slash", "fa-eye");
        hidePassword.classList.add("inactive");
    }
}

// ===== Initial Load =====
theme_check();
header_sticky();
ci_tab();
ci_skeleton();

// ===== Window Scroll Event =====
onscroll = function() {
    header_sticky();
    ci_skeleton();
}