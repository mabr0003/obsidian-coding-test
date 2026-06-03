(function initCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const cartCountBadge = document.getElementById('cart-count');
    const cartLink = document.getElementById('header-cart-link');
    const quantityInput = document.querySelector('.quantity input[name="quantity"]');
    const decreaseBtn = document.querySelector('.quantity button[aria-label="Decrease quantity"]');
    const increaseBtn = document.querySelector('.quantity button[aria-label="Increase quantity"]');
    if (!addToCartBtn || !cartCountBadge) return;
    let itemCount = 0;
    function readQuantity() {
        const parsed = Number.parseInt(quantityInput?.value ?? '1', 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    }
    function writeQuantity(next) {
        if (quantityInput) quantityInput.value = String(Math.max(1, next));
    }
    function renderCartCount(animate) {
        cartCountBadge.textContent = String(itemCount);
        if (itemCount > 0) {
            cartCountBadge.classList.add('is-visible');
            cartCountBadge.removeAttribute('aria-hidden');
        } else {
            cartCountBadge.classList.remove('is-visible');
            cartCountBadge.setAttribute('aria-hidden', 'true');
        }
        if (cartLink) cartLink.setAttribute('aria-label', itemCount === 0 ? 'Cart' : itemCount === 1 ? 'Cart, 1 item' : `Cart, ${itemCount} items`);
        if (!animate) return;
        cartCountBadge.classList.remove('is-bump');
        cartCountBadge.offsetWidth;
        cartCountBadge.classList.add('is-bump');
        cartCountBadge.addEventListener('animationend', ()=>cartCountBadge.classList.remove('is-bump'), {
            once: true
        });
    }
    addToCartBtn.addEventListener('click', ()=>{
        itemCount += readQuantity();
        renderCartCount(true);
    });
    decreaseBtn?.addEventListener('click', ()=>{
        writeQuantity(readQuantity() - 1);
    });
    increaseBtn?.addEventListener('click', ()=>{
        writeQuantity(readQuantity() + 1);
    });
    renderCartCount(false);
})();

//# sourceMappingURL=pages.df0b1e58.js.map
