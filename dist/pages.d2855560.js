const DESKTOP_QUERY = '(min-width: 1080px)';
const VISIBLE_COUNT = 3;
const carousel = document.querySelector('.products-related-carousel');
if (carousel) {
    const viewport = carousel.querySelector('.products-related-carousel-viewport');
    const track = carousel.querySelector('ul');
    const prevButton = carousel.querySelector('.carousel-btn--prev');
    const nextButton = carousel.querySelector('.carousel-btn--next');
    const items = track ? [
        ...track.children
    ] : [];
    let index = 0;
    function isDesktop() {
        return window.matchMedia(DESKTOP_QUERY).matches;
    }
    function getGap() {
        if (!track) return 0;
        const styles = getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap) || 0;
    }
    function getCardWidth() {
        if (!viewport) return 0;
        const gap = getGap();
        return (viewport.clientWidth - gap * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT;
    }
    function getStep() {
        return getCardWidth() + getGap();
    }
    function getMaxIndex() {
        return Math.max(0, items.length - VISIBLE_COUNT);
    }
    function updateButtons() {
        const desktop = isDesktop();
        const maxIndex = getMaxIndex();
        const showControls = desktop && maxIndex > 0;
        prevButton?.toggleAttribute('hidden', !showControls);
        nextButton?.toggleAttribute('hidden', !showControls);
        if (!showControls) return;
        prevButton.disabled = index <= 0;
        nextButton.disabled = index >= maxIndex;
    }
    function updateMetrics() {
        if (!viewport || !track) return;
        if (!isDesktop()) {
            carousel.style.removeProperty('--carousel-card-width');
            track.style.transform = '';
            index = 0;
            updateButtons();
            return;
        }
        carousel.style.setProperty('--carousel-card-width', `${getCardWidth()}px`);
        index = Math.min(index, getMaxIndex());
        track.style.transform = `translateX(-${index * getStep()}px)`;
        updateButtons();
    }
    function applyTransform() {
        if (!track || !isDesktop()) {
            track.style.transform = '';
            return;
        }
        track.style.transform = `translateX(-${index * getStep()}px)`;
        updateButtons();
    }
    prevButton?.addEventListener('click', ()=>{
        if (!isDesktop()) return;
        index = Math.max(0, index - 1);
        applyTransform();
    });
    nextButton?.addEventListener('click', ()=>{
        if (!isDesktop()) return;
        index = Math.min(getMaxIndex(), index + 1);
        applyTransform();
    });
    window.addEventListener('resize', updateMetrics);
    window.matchMedia(DESKTOP_QUERY).addEventListener('change', updateMetrics);
    updateMetrics();
}

//# sourceMappingURL=pages.d2855560.js.map
