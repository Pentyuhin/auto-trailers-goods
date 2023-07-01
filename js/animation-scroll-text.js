
document.addEventListener("DOMContentLoaded", () => {

    let tl = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger)

    tl.from('.header__logo', { buration: 2, x: 700, ease: 'slow (0.7, 0.7, false)' })
    tl.from(['.menu__body', '.header__logo-text'], { buration: 3, opacity: 0, ease: 'power.out' }, '-=0.3')


    tl.from('.block-main__title', {
        duration: 1,
        opacity: 0,
        y: 200,
        ease: 'back',
    })
    tl.from('.block-main__text', { buration: 1, opacity: 0, x: 150, ease: 'power.out' }, '-=0.3')
    tl.from('.block-main__button', { duration: 1, opacity: 0, x: -100, ease: 'back.out(2)' })

})