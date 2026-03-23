/* ==========================================
   MR HATS - Store JavaScript
   ========================================== */

// ==========================================
// PRODUCT DATA
// ==========================================
const defaultProducts = [
    // NEW ERA - All $25.00
    { id: 1, name: "59FIFTY Fitted Spurs Black", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra oficial NBA San Antonio Spurs fitted. Diseño clásico en negro.", color: "Negro", image: "🧢", inStock: true },
    { id: 2, name: "59FIFTY Cowboys Navy", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra oficial NFL Dallas Cowboys fitted. Azul marino con estrella.", color: "Azul Marino", image: "🧢", inStock: true },
    { id: 3, name: "9FORTY Adjustable Yankees", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra ajustable NY Yankees. El clásico que nunca pasa de moda.", color: "Negro", image: "🧢", inStock: true },
    { id: 4, name: "9FIFTY Snapback Lakers", brand: "New Era", category: "Baseball", price: 25.00, description: "Snapback LA Lakers púrpura y oro. Estilo urbano premium.", color: "Púrpura", image: "🧢", inStock: true },
    { id: 5, name: "59FIFTY Astros Orange", brand: "New Era", category: "Baseball", price: 25.00, description: "Houston Astros fitted cap. Naranja vibrante con logo bordado.", color: "Naranja", image: "🧢", inStock: true },
    { id: 6, name: "9FORTY Rangers Red", brand: "New Era", category: "Baseball", price: 25.00, description: "Texas Rangers gorra ajustable. Rojo clásico del equipo.", color: "Rojo", image: "🧢", inStock: true },
    { id: 7, name: "59FIFTY México Flag", brand: "New Era", category: "Baseball", price: 25.00, description: "Edición especial con bandera de México. Fitted premium.", color: "Verde/Blanco/Rojo", image: "🧢", inStock: true },
    { id: 8, name: "9FIFTY Snapback Bulls", brand: "New Era", category: "Baseball", price: 25.00, description: "Chicago Bulls snapback negro y rojo. Icónico estilo NBA.", color: "Negro/Rojo", image: "🧢", inStock: true },
    { id: 9, name: "59FIFTY Dodgers Blue", brand: "New Era", category: "Baseball", price: 25.00, description: "LA Dodgers fitted azul. El favorito de la costa oeste.", color: "Azul", image: "🧢", inStock: true },
    { id: 10, name: "9FORTY Classic Black", brand: "New Era", category: "Baseball", price: 25.00, description: "Gorra básica negra ajustable. Perfecta para uso diario.", color: "Negro", image: "🧢", inStock: true },

    // STETSON - $49.99
    { id: 11, name: "Stetson 6X Open Road", brand: "Stetson", category: "Felt", price: 49.99, description: "El icónico Open Road en fieltro 6X. Estilo presidencial texano.", color: "Silverbelly", image: "🤠", inStock: true },
    { id: 12, name: "Stetson Skyline 6X", brand: "Stetson", category: "Felt", price: 49.99, description: "Copa cattleman clásica. Fieltro premium de pelo de conejo.", color: "Negro", image: "🤠", inStock: true },
    { id: 13, name: "Stetson El Presidente", brand: "Stetson", category: "Felt", price: 49.99, description: "Sombrero de vestir elegante. Perfecto para eventos especiales.", color: "Chocolate", image: "🤠", inStock: true },
    { id: 14, name: "Stetson Straw Rancher", brand: "Stetson", category: "Straw", price: 49.99, description: "Sombrero de palma natural. Ideal para el calor de Texas.", color: "Natural", image: "🤠", inStock: true },
    { id: 15, name: "Stetson 10X Shasta", brand: "Stetson", category: "Felt", price: 49.99, description: "Fieltro 10X premium. La joya de la colección Stetson.", color: "Mist Grey", image: "🤠", inStock: true },

    // RESISTOL - $49.99
    { id: 16, name: "Resistol 20X Black Gold", brand: "Resistol", category: "Felt", price: 49.99, description: "Fieltro 20X de la más alta calidad. Elegancia pura.", color: "Negro", image: "🤠", inStock: true },
    { id: 17, name: "Resistol Jason Aldean Amarillo Sky", brand: "Resistol", category: "Straw", price: 49.99, description: "Colección Jason Aldean. Paja premium con estilo country.", color: "Natural", image: "🤠", inStock: true },
    { id: 18, name: "Resistol George Strait Cowboy", brand: "Resistol", category: "Felt", price: 49.99, description: "Colección George Strait. El rey del country en tu cabeza.", color: "Silverbelly", image: "🤠", inStock: true },
    { id: 19, name: "Resistol Cojo Special", brand: "Resistol", category: "Felt", price: 49.99, description: "Clásico western con acabado superior. Hecho en Texas.", color: "Café", image: "🤠", inStock: true },

    // ARIAT - $49.99
    { id: 20, name: "Ariat Bangora Straw", brand: "Ariat", category: "Straw", price: 49.99, description: "Sombrero de paja Bangora. Ligero y resistente para el rancho.", color: "Natural", image: "🤠", inStock: true },
    { id: 21, name: "Ariat Western Wool Felt", brand: "Ariat", category: "Felt", price: 49.99, description: "Fieltro de lana premium. Estilo western moderno.", color: "Negro", image: "🤠", inStock: true },
    { id: 22, name: "Ariat FlexFit Mesh Cap", brand: "Ariat", category: "Baseball", price: 49.99, description: "Gorra FlexFit con mesh. Comodidad y estilo western.", color: "Café/Beige", image: "🧢", inStock: true },
    { id: 23, name: "Ariat Cattleman Crown", brand: "Ariat", category: "Western", price: 49.99, description: "Copa cattleman tradicional. El sombrero del verdadero vaquero.", color: "Tan", image: "🤠", inStock: true },

    // BAILEY - $49.99
    { id: 24, name: "Bailey Western Tombstone", brand: "Bailey", category: "Western", price: 49.99, description: "Inspirado en el viejo oeste. Estilo Tombstone auténtico.", color: "Negro", image: "🤠", inStock: true },
    { id: 25, name: "Bailey Dress Fedora", brand: "Bailey", category: "Dress", price: 49.99, description: "Fedora elegante para vestir. Perfecto con traje o casual.", color: "Gris", image: "🎩", inStock: true },
    { id: 26, name: "Bailey Western Renegade", brand: "Bailey", category: "Western", price: 49.99, description: "El renegado del oeste. Fieltro de alta calidad.", color: "Chocolate", image: "🤠", inStock: true },

    // CHARLIE 1 HORSE - $49.99
    { id: 27, name: "Charlie 1 Horse Highway", brand: "Charlie 1 Horse", category: "Western", price: 49.99, description: "Estilo boho-western. Popular entre artistas y músicos.", color: "Sand", image: "🤠", inStock: true },
    { id: 28, name: "Charlie 1 Horse Desperado", brand: "Charlie 1 Horse", category: "Felt", price: 49.99, description: "Fieltro con actitud. Diseño único y atrevido.", color: "Negro", image: "🤠", inStock: true },
    { id: 29, name: "Charlie 1 Horse Tee Pee", brand: "Charlie 1 Horse", category: "Straw", price: 49.99, description: "Paja natural con detalles artesanales. Espíritu libre.", color: "Natural", image: "🤠", inStock: true },

    // LARRY MAHAN - $49.99
    { id: 30, name: "Larry Mahan 30X Opulento", brand: "Larry Mahan", category: "Felt", price: 49.99, description: "Fieltro 30X ultra premium. Lo mejor de lo mejor.", color: "Platinum", image: "🤠", inStock: true },
    { id: 31, name: "Larry Mahan Straw Tejano", brand: "Larry Mahan", category: "Straw", price: 49.99, description: "Sombrero tejano de palma. Tradición mexicana-texana.", color: "Natural", image: "🤠", inStock: true },
    { id: 32, name: "Larry Mahan 500X El Jefe", brand: "Larry Mahan", category: "Felt", price: 49.99, description: "500X - La máxima calidad disponible. Para el verdadero jefe.", color: "Silverbelly", image: "🤠", inStock: true },
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
let products = [];
let cart = [];
let currentFilters = { brand: 'all', category: 'all', sort: 'name', search: '' };

// Initialize
function init() {
    loadProducts();
    loadCart();
    renderProducts();
    updateCartUI();
    setupScrollEffects();
    setupSmoothScroll();
}

function loadProducts() {
    const stored = localStorage.getItem('mrhats_products');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        products = [...defaultProducts];
        localStorage.setItem('mrhats_products', JSON.stringify(products));
    }
}

function loadCart() {
    const stored = localStorage.getItem('mrhats_cart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

function saveCart() {
    localStorage.setItem('mrhats_cart', JSON.stringify(cart));
}

// ==========================================
// PRODUCT RENDERING
// ==========================================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    let filtered = getFilteredProducts();

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.inStock ? `<span class="product-badge">${product.brand}</span>` : `<span class="product-badge out-of-stock">Agotado</span>`}
                <span>${product.image}</span>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <span class="product-color">• ${product.color}</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="product-add-btn" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? '+ Agregar' : 'Agotado'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredProducts() {
    let filtered = [...products];

    if (currentFilters.brand !== 'all') {
        filtered = filtered.filter(p => p.brand === currentFilters.brand);
    }

    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    if (currentFilters.search) {
        const term = currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    switch (currentFilters.sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'brand':
            filtered.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
}

function filterProducts() {
    currentFilters.brand = document.getElementById('filterBrand').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.sort = document.getElementById('filterSort').value;
    renderProducts();
}

function searchProducts() {
    currentFilters.search = document.getElementById('searchInput').value;
    renderProducts();
}

function quickFilter(brand) {
    document.getElementById('filterBrand').value = brand;
    currentFilters.brand = brand;
    renderProducts();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
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
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} agregado al carrito`);
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
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

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
    const emptyEl = document.getElementById('cartEmpty');
    const footerEl = document.getElementById('cartFooter');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = totalItems;

    if (cart.length === 0) {
        emptyEl.style.display = 'block';
        footerEl.style.display = 'none';
        itemsEl.innerHTML = '';
        itemsEl.appendChild(emptyEl);
        return;
    }

    emptyEl.style.display = 'none';
    footerEl.style.display = 'block';

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-emoji">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="cart-qty">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// ==========================================
// CART SIDEBAR TOGGLE
// ==========================================
function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
    document.getElementById('cartSidebar').classList.toggle('active');
    document.body.style.overflow = document.getElementById('cartSidebar').classList.contains('active') ? 'hidden' : '';
}

function toggleSearch() {
    document.getElementById('searchBar').classList.toggle('active');
    if (document.getElementById('searchBar').classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function toggleMenu() {
    document.getElementById('nav').classList.toggle('active');
}

// ==========================================
// CHECKOUT
// ==========================================
function checkout() {
    if (cart.length === 0) return;
    toggleCart();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    document.getElementById('checkoutSummary').innerHTML = `
        <strong>Resumen del Pedido:</strong><br>
        ${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('<br>')}
        <hr style="margin: 8px 0; border-color: #ddd;">
        Subtotal: $${subtotal.toFixed(2)}<br>
        Tax (8.25%): $${tax.toFixed(2)}<br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;

    document.getElementById('checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = '';
}

function placeOrder(e) {
    e.preventDefault();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    const order = {
        id: 'MRH-' + Date.now().toString(36).toUpperCase(),
        date: new Date().toISOString(),
        customer: {
            name: document.getElementById('checkName').value,
            email: document.getElementById('checkEmail').value,
            phone: document.getElementById('checkPhone').value,
            address: document.getElementById('checkAddress').value,
        },
        payment: document.getElementById('checkPayment').value,
        items: [...cart],
        subtotal,
        tax,
        total,
        status: 'Pending'
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem('mrhats_orders') || '[]');
    orders.push(order);
    localStorage.setItem('mrhats_orders', JSON.stringify(orders));

    // Show success
    closeCheckout();
    document.getElementById('orderNumber').textContent = order.id;
    document.getElementById('successModal').classList.add('active');

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
}

function closeSuccess() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// CONTACT FORM
// ==========================================
function submitContactForm(e) {
    e.preventDefault();
    showToast('¡Mensaje enviado! Te contactaremos pronto.');
    e.target.reset();
}

// ==========================================
// UI EFFECTS
// ==========================================
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                document.getElementById('nav').classList.remove('active');
                // Update active nav
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', init);
