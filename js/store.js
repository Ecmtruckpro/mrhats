/* ==========================================
   MR HATS - Store JS (Urban Streetwear - Fixed)
   ========================================== */
// ==========================================
// PRODUCT DATA — Only kept brands
// ==========================================
const defaultProducts = [
    // NEW ERA - $25.00
    { id: 1, name: "59FIFTY Fitted Spurs Black", brand: "New Era", category: "Fitted", price: 25.00, description: "Gorra oficial NBA San Antonio Spurs fitted. Diseño clásico en negro.", color: "Negro", image: "🧢", inStock: true },
    { id: 2, name: "59FIFTY Cowboys Navy", brand: "New Era", category: "Fitted", price: 25.00, description: "Gorra oficial NFL Dallas Cowboys fitted. Azul marino con estrella.", color: "Azul Marino", image: "🧢", inStock: true },
    { id: 3, name: "9FORTY Adjustable Yankees", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra ajustable NY Yankees. El clásico que nunca pasa de moda.", color: "Negro", image: "🧢", inStock: true },
    { id: 4, name: "9FIFTY Snapback Lakers", brand: "New Era", category: "Baseball", price: 25.00, description: "Snapback LA Lakers púrpura y oro. Estilo urbano premium.", color: "Púrpura", image: "🧢", inStock: true },
    { id: 5, name: "59FIFTY Astros Orange", brand: "New Era", category: "Fitted", price: 25.00, description: "Houston Astros fitted cap. Naranja vibrante con logo bordado.", color: "Naranja", image: "🧢", inStock: true },
    { id: 6, name: "9FORTY Rangers Red", brand: "New Era", category: "Baseball", price: 25.00, description: "Texas Rangers gorra ajustable. Rojo clásico del equipo.", color: "Rojo", image: "🧢", inStock: true },
    { id: 7, name: "59FIFTY México Flag", brand: "New Era", category: "Fitted", price: 25.00, description: "Edición especial con bandera de México. Fitted premium.", color: "Verde/Blanco/Rojo", image: "🧢", inStock: true },
    { id: 8, name: "9FIFTY Snapback Bulls", brand: "New Era", category: "Baseball", price: 25.00, description: "Chicago Bulls snapback negro y rojo. Icónico estilo NBA.", color: "Negro/Rojo", image: "🧢", inStock: true },
    { id: 9, name: "59FIFTY Dodgers Blue", brand: "New Era", category: "Fitted", price: 25.00, description: "LA Dodgers fitted azul. El favorito de la costa oeste.", color: "Azul", image: "🧢", inStock: true },
    { id: 10, name: "9FORTY Classic Black", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra básica negra ajustable. Perfecta para uso diario.", color: "Negro", image: "🧢", inStock: true },
    // 31 HATS
    { id: 33, name: "31 Hats Black Gold Crown", brand: "31 Hats", category: "Streetwear", price: 45.00, description: "Premium urban cap con bordado frontal bold. Corona estructurada, cierre snapback.", color: "Black / Gold", image: "https://i.postimg.cc/q7KH99G5/Producto-0101-foto01.jpg", inStock: true },
    { id: 40, name: "Big Boss Trucker", brand: "31 Hats", category: "Trucker", price: 45.00, description: "Big Boss trucker cap. Premium mesh back, corona estructurada.", color: "White / Black", image: "https://i.postimg.cc/qqwPjHd2/Producto-0385.jpg", inStock: true },
    // DANDY HATS
    { id: 34, name: "Dandy Midnight Street", brand: "Dandy Hats", category: "Streetwear", price: 42.00, description: "Gorra midnight con estilo street-ready. Brim curvo, mesh panels respirables.", color: "Black", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop", inStock: true },
    // BARBAS HATS
    { id: 35, name: "Barbas Sand Tone", brand: "Barbas Hats", category: "Streetwear", price: 39.00, description: "Tono arena con diseño minimalista clean. Low-profile desestructurada, algodón twill.", color: "Sand", image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=600&auto=format&fit=crop", inStock: true },
    // CASH MONEY HATS
    { id: 36, name: "Cash Money Red Flame", brand: "Cash Money Hats", category: "Streetwear", price: 48.00, description: "Gorra bold statement para outfits que destacan. Corona estructurada, snap premium.", color: "Red / Black", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", inStock: true },
    // INEDIT HATS
    { id: 37, name: "Inedit Grey Classic", brand: "Inedit Hats", category: "Streetwear", price: 40.00, description: "Gris clásico con elegancia understated. Wool blend, mid-profile estructurada.", color: "Grey", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=600&auto=format&fit=crop", inStock: true },
    // MR HATS EXCLUSIVE
    { id: 38, name: "Onyx MR Hats Exclusive", brand: "MR Hats Exclusive", category: "Streetwear", price: 55.00, description: "Nuestra exclusiva signature. Diseño onyx negro con logo dorado MR HATS. Edición limitada.", color: "Black / Gold", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=600&auto=format&fit=crop", inStock: true },
    // NEW ERA extras
    { id: 39, name: "Snapback Classic", brand: "New Era", category: "Baseball", price: 20.00, description: "Snapback clásico para uso diario. Diseño clean, ajuste ajustable.", color: "Black", image: "https://i.postimg.cc/prCwqMt8/Producto-0381.jpg", inStock: true },
];

// Allowed brands
const ALLOWED_BRANDS = ['New Era', '31 Hats', 'Dandy Hats', 'Barbas Hats', 'Cash Money Hats', 'Inedit Hats', 'MR Hats Exclusive'];

// ==========================================
// STATE
// ==========================================
let products = [];
let cart = [];
let currentFilters = { brand: 'all', category: 'all', sort: 'name', search: '' };

// ==========================================
// INIT
// ==========================================
function init() {
    loadProducts();
    loadCart();
    renderProducts();
    updateCartUI();
    setupEventListeners();
    renderFeatured();
}

function loadProducts() {
    const stored = localStorage.getItem('mrhats_products');
    if (stored) {
        try {
            let parsed = JSON.parse(stored);
            parsed = parsed.filter(p => ALLOWED_BRANDS.includes(p.brand));
            const isCorrupt = parsed.some(p => !p.brand || !p.name || typeof p.price !== 'number');
            if (isCorrupt || parsed.length === 0) {
                products = [...defaultProducts];
            } else {
                products = parsed.map(p => ({
                    ...p,
                    category: p.category || 'Streetwear',
                    color: p.color || '',
                    description: p.description || '',
                    image: p.image || '🧢',
                    inStock: p.inStock !== undefined ? p.inStock : true
                }));
            }
        } catch (e) {
            products = [...defaultProducts];
        }
    } else {
        products = [...defaultProducts];
    }
    localStorage.setItem('mrhats_products', JSON.stringify(products));
}

function loadCart() {
    const stored = localStorage.getItem('mrhats_cart');
    if (stored) cart = JSON.parse(stored);
}

function saveCart() {
    localStorage.setItem('mrhats_cart', JSON.stringify(cart));
}

// ==========================================
// HELPERS
// ==========================================
function isImageUrl(str) {
    if (!str) return false;
    return str.startsWith('http') || str.startsWith('data:') || str.startsWith('/');
}

function getProductImageHTML(product, size) {
    const sizeClass = size === 'large' ? 'img-large' : '';
    if (product.image && isImageUrl(product.image)) {
        return `<img src="${product.image}" alt="${product.name}" class="product-img ${sizeClass}" loading="lazy">`;
    }
    const emojis = {
        'New Era': '🧢', '31 Hats': '🎯', 'Dandy Hats': '🎩',
        'Barbas Hats': '👑', 'Cash Money Hats': '💰',
        'Inedit Hats': '💎', 'MR Hats Exclusive': '🔥'
    };
    const emoji = emojis[product.brand] || '🧢';
    return `<span class="product-emoji ${sizeClass}">${product.image && product.image.length <= 4 ? product.image : emoji}</span>`;
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('open');
            if (searchBar.classList.contains('open')) {
                searchBar.querySelector('input').focus();
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => searchProducts());
    }

    const cartToggle = document.getElementById('cartToggle');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    if (cartToggle) cartToggle.addEventListener('click', () => toggleCart());
    if (cartClose) cartClose.addEventListener('click', () => toggleCart());
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart());

    const brandFilter = document.getElementById('brandFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('filterSort');
    if (brandFilter) brandFilter.addEventListener('change', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('open');
        });
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);

    const checkoutOverlay = document.getElementById('checkoutOverlay');
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', (e) => {
            if (e.target === checkoutOverlay) closeCheckout();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.addEventListener('submit', handleContactForm);
}

// ==========================================
// PRODUCT RENDERING
// ==========================================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCount');
    if (!grid) return;

    let filtered = getFilteredProducts();

    if (countEl) {
        countEl.textContent = `Mostrando ${filtered.length} de ${products.length} productos`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <div class="icon">🔍</div>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o términos de búsqueda.</p>
            </div>`;
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const imgContent = getProductImageHTML(product);
        const category = product.category || 'Streetwear';
        const color = product.color ? ` · ${product.color}` : '';
        const description = product.description || '';
        const stockLabel = product.inStock ? '' : '<span class="product-badge badge-oos">Agotado</span>';
        const brandBadge = `<span class="product-badge badge-brand">${product.brand}</span>`;

        return `
        <div class="product-card ${!product.inStock ? 'sold-out' : ''}" data-id="${product.id}">
            <div class="product-image">
                ${stockLabel}
                ${brandBadge}
                ${imgContent}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${description}</p>
                <div class="product-meta">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <span class="product-category">${category}${color}</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-gold" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? '🛒 Agregar' : 'Agotado'}
                </button>
            </div>
        </div>`;
    }).join('');
}

function getFilteredProducts() {
    let filtered = [...products];
    if (currentFilters.brand !== 'all') filtered = filtered.filter(p => p.brand === currentFilters.brand);
    if (currentFilters.category !== 'all') filtered = filtered.filter(p => p.category === currentFilters.category);
    if (currentFilters.search) {
        const term = currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            (p.description || '').toLowerCase().includes(term) ||
            (p.category || '').toLowerCase().includes(term) ||
            (p.color || '').toLowerCase().includes(term)
        );
    }
    switch (currentFilters.sort) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'brand': filtered.sort((a, b) => a.brand.localeCompare(b.brand)); break;
        default: filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
}

function filterProducts() {
    const brandEl = document.getElementById('brandFilter');
    const catEl = document.getElementById('categoryFilter');
    const sortEl = document.getElementById('filterSort');
    if (brandEl) currentFilters.brand = brandEl.value;
    if (catEl) currentFilters.category = catEl.value;
    if (sortEl) currentFilters.sort = sortEl.value;
    renderProducts();
}

function searchProducts() {
    currentFilters.search = document.getElementById('searchInput')?.value || '';
    renderProducts();
}

function quickFilter(brand) {
    const brandEl = document.getElementById('brandFilter');
    if (brandEl) brandEl.value = brand;
    currentFilters.brand = brand;
    renderProducts();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// SHOPPING CART
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`${product.name} agregado al carrito`);
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) { removeFromCart(productId); return; }
    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    showToast('Carrito vaciado');
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) {
        countEl.textContent = totalItems;
        countEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="cart-empty">
                <div class="icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p style="font-size:0.8rem;margin-top:8px;">Explora nuestra colección y agrega gorras.</p>
            </div>`;
        if (footerEl) footerEl.style.display = 'none';
        return;
    }

    if (footerEl) footerEl.style.display = 'block';

    itemsEl.innerHTML = cart.map(item => {
        const imgEl = isImageUrl(item.image)
            ? `<img src="${item.image}" alt="${item.name}" class="cart-thumb">`
            : `<div class="cart-item-emoji">${item.image || '🧢'}</div>`;
        return `
        <div class="cart-item">
            <div class="cart-item-thumb">${imgEl}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-qty">
                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#10005;</button>
        </div>`;
    }).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    const totalsEl = document.getElementById('cartTotals');
    if (totalsEl) {
        totalsEl.innerHTML = `
            <div class="row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="row"><span>Tax (8.25%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
        `;
    }
}

// ==========================================
// CART / SEARCH / MENU TOGGLES
// ==========================================
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (!overlay || !sidebar) return;
    overlay.classList.toggle('open');
    sidebar.classList.toggle('open');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function openCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (!overlay || !sidebar) return;
    overlay.classList.add('open');
    sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (!overlay || !sidebar) return;
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    document.body.style.overflow = '';
}

// ==========================================
// CHECKOUT
// ==========================================
function openCheckout() {
    if (cart.length === 0) return;
    const overlay = document.getElementById('checkoutOverlay');
    if (!overlay) return;

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    const summaryHtml = cart.map(item =>
        `<div class="order-summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>`
    ).join('');

    document.getElementById('checkoutContent').innerHTML = `
        <h3>Resumen del Pedido</h3>
        ${summaryHtml}
        <div class="order-total">
            <span>Total (incl. tax)</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <div style="margin-top:24px;">
            <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" id="custName" required placeholder="Tu nombre">
            </div>
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="custPhone" required placeholder="(210) 555-0000">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="custEmail" required placeholder="tu@email.com">
            </div>
            <button class="btn btn-gold" style="width:100%;margin-top:8px;" onclick="placeOrder()">
                Confirmar Pedido
            </button>
            <button class="btn btn-outline" style="width:100%;margin-top:8px;" onclick="closeCheckout()">
                Cancelar
            </button>
        </div>
    `;

    overlay.classList.add('open');
    closeCart();
}

function closeCheckout() {
    const overlay = document.getElementById('checkoutOverlay');
    if (overlay) overlay.classList.remove('open');
}

function placeOrder() {
    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const email = document.getElementById('custEmail')?.value.trim();

    if (!name || !phone || !email) {
        showToast('Por favor llena todos los campos');
        return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        customer: { name, phone, email },
        items: [...cart],
        subtotal, tax, total,
        status: 'Pending'
    };

    const orders = JSON.parse(localStorage.getItem('mrhats_orders') || '[]');
    orders.push(order);
    localStorage.setItem('mrhats_orders', JSON.stringify(orders));

    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();

    document.getElementById('checkoutContent').innerHTML = `
        <div style="text-align:center;padding:20px;">
            <div style="font-size:4rem;margin-bottom:16px;">✅</div>
            <h3>¡Pedido Confirmado!</h3>
            <p style="color:#757575;margin:12px 0;">Pedido #${order.id}</p>
            <p style="color:#757575;">Gracias, ${name}. Te contactaremos pronto para confirmar tu pedido.</p>
            <button class="btn btn-gold" style="margin-top:20px;" onclick="closeCheckout()">Seguir Comprando</button>
        </div>
    `;
    document.getElementById('checkoutOverlay').classList.add('open');
}

// ==========================================
// CONTACT FORM
// ==========================================
function handleContactForm(e) {
    e.preventDefault();
    showToast('¡Mensaje enviado! Te contactaremos pronto.');
    e.target.reset();
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🎩</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==========================================
// FEATURED PRODUCTS
// ==========================================
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const featured = products.filter(p => p.inStock).slice(0, 4);
    grid.innerHTML = featured.map(product => `
        <div class="product-card">
            <div class="product-image">
                <span class="product-badge badge-brand">${product.brand}</span>
                ${getProductImageHTML(product)}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-meta">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <span class="product-category">${product.category}</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-gold" onclick="addToCart(${product.id})">🛒 Agregar</button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// INIT ON LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    init();
});
