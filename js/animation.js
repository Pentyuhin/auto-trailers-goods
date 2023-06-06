// "use strict";


document.addEventListener("DOMContentLoaded", () => {
    let to_top_btn = document.querySelector(".to-up");

    window.onscroll = function () {
        if (window.pageYOffset > 500) {
            to_top_btn.style.display = "block"
        } else {
            to_top_btn.style.display = "none"
        }
    }

    // плавный скролл наверх
    to_top_btn.addEventListener("click", function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    });
});



