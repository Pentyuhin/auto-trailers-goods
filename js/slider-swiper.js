const swiper = new Swiper('.swiper', {
    speed: 2400,
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    on: {
        init() {
            this.el.addEventListener('mouseenter', () => {
                this.autoplay.stop();
            });

            this.el.addEventListener('mouseleave', () => {
                this.autoplay.start();
            });
        }
    },

    spaceBetween: 18,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
});