
// document.addEventListener("DOMContentLoaded", () => {

let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger)

tl.fromTo('.header__logo', { buration: 2, x: 700, ease: 'slow (0.7, 0.7, false)' }, { x: 0 })
tl.fromTo(['.menu__body', '.header__logo-text'], { buration: 3, opacity: 0, ease: 'power.out' }, { opacity: 1 }, '-=0.3')


tl.fromTo('.block-main__title', { opacity: 0, y: -200, }, {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'back',
})
tl.fromTo('.block-main__text', { opacity: 0, x: 150 }, { buration: 1, opacity: 1, x: 0, ease: 'power.out' }, '-=0.3')
tl.fromTo('.block-main__button', { opacity: 0, x: -100 }, { duration: 1, opacity: 1, x: 0, ease: 'back.out(2)' })

// })