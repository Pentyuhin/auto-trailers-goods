function smoothScrollToElement(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        const targetPosition = element.offsetTop;
        const currentPosition = window.pageYOffset;
        const distance = targetPosition - currentPosition;
        const step = Math.ceil(distance / 30); // Здесь можно регулировать скорость (чем больше число, тем медленнее скролл)

        function scrollStep() {
            if (window.pageYOffset === targetPosition) {
                return;
            }

            if (Math.abs(targetPosition - window.pageYOffset) < Math.abs(step)) {
                window.scrollTo(0, targetPosition);
                return;
            }

            window.scrollBy(0, step);

            // Добавляем задержку перед следующим шагом скролла
            setTimeout(scrollStep, 10); // Здесь можно регулировать задержку (чем больше число, тем медленнее скролл)
        }

        scrollStep();
    }
}
