/* ==========================================
   MR HATS - Store JavaScript
   ========================================== */

// ==========================================
// PRODUCT DATA - 10 productos iniciales
// ==========================================
const DEFAULT_PRODUCTS = [
  // --- NEW ERA ($25.00) ---
  {
    id: 1,
    name: "59FIFTY Fitted Cap - Black",
    brand: "New Era",
    category: "Fitted",
    price: 25.00,
    description: "La icónica gorra 59FIFTY fitted en negro sólido. Corona estructurada de 6 paneles, visera plana y logo bordado. El modelo más vendido de New Era en todo el mundo.",
    color: "Negro",
    image: "",
    inStock: true
  },
  {
    id: 2,
    name: "9FIFTY Snapback - Black/Gold",
    brand: "New Era",
    category: "Snapback",
    price: 25.00,
    description: "Snapback 9FIFTY con corona alta y acentos dorados. Visera plana, broche trasero ajustable y bordado premium. Estilo urbano que nunca pasa de moda.",
    color: "Negro/Dorado",
    image: "",
    inStock: true
  },

  // --- BARBAS HATS ($49.99) ---
  {
    id: 3,
    name: "B Chrome 24K Rose Gold",
    brand: "Barbas Hats",
    category: "Premium",
    price: 49.99,
    description: "Edición exclusiva con acabado cromado en oro rosa 24K. Gorra de 5 paneles estilo A-Frame, visera de gamuza (suede), forro interior de satín y bordado premium. La firma de El Barbas.",
    color: "Rose Gold / Negro",
    image: "",
    inStock: true
  },
  {
    id: 4,
    name: "Blackout Edition",
    brand: "Barbas Hats",
    category: "Premium",
    price: 49.99,
    description: "Diseño totalmente negro con detalles en relieve. Corona estructurada de 5 paneles, visera curva de gamuza premium, forro de satín y cristales decorativos. Edición limitada con más de 500K fans mundiales.",
    color: "Negro Total",
    image: "",
    inStock: true
  },

  // --- DANDY HATS ($49.99) ---
  {
    id: 5,
    name: "Anniversary Black Edition",
    brand: "Dandy Hats",
    category: "Snapback",
    price: 49.99,
    description: "Edición de aniversario en algodón premium con bordado detallado conmemorativo. Acabado negro elegante, cierre snapback ajustable y diseño de edición limitada. La gorra insignia de Dandy.",
    color: "Negro",
    image: "",
    inStock: true
  },
  {
    id: 6,
    name: "Dandy x Junior H SadBoyz",
    brand: "Dandy Hats",
    category: "Colaboración",
    price: 49.99,
    description: "Colaboración exclusiva con Junior H. Representa la estética SadBoyz con bordado premium, materiales de primera calidad en mezcla de lana y fieltro. Diseño snapback con cierre personalizado.",
    color: "Azul / Negro",
    image: "",
    inStock: true
  },

  // --- INNEDIT ($49.99) ---
  {
    id: 7,
    name: "Ghost Edition",
    brand: "Innedit",
    category: "Premium",
    price: 49.99,
    description: "El modelo Ghost de Innedit: corona baja con visera curva ajustable. Bordado fantasma exclusivo con acabados premium. Marca mexicana con más de 46K seguidores y calificación 5 estrellas.",
    color: "Negro / Blanco",
    image: "",
    inStock: true
  },

  // --- BIGBOSS ($49.99) ---
  {
    id: 8,
    name: "Perico Loco Black Hat",
    brand: "BigBoss",
    category: "Snapback",
    price: 49.99,
    description: "Gorra insignia de BigBoss con diseño Perico Loco en negro. Bordado frontal detallado, corona estructurada, visera plana y broche snapback. Del primer drop oficial de la marca BIGBOSS.",
    color: "Negro",
    image: "",
    inStock: true
  },

  // --- CASH MONEY / CASH ONLY ($49.99) ---
  {
    id: 9,
    name: "Golden Skull Snapback",
    brand: "Cash Money",
    category: "Snapback",
    price: 49.99,
    description: "La inconfundible calavera dorada de Cash Only. Snapback con broche ajustable de plástico, materiales premium de gamuza y algodón, visera plana de algodón peinado, pines frontales y bolsillo interior.",
    color: "Negro / Dorado",
    image: "",
    inStock: true
  },
  {
    id: 10,
    name: "Medusa Gold Edition",
    brand: "Cash Money",
    category: "Premium",
    price: 49.99,
    description: "Medusa bañada en oro sobre fondo oscuro. Gorra snapback premium con bordado meticuloso, materiales de calidad superior, visera plana y cierre ajustable. Marca 100% mexicana con estilo urbano y lujo.",
    color: "Negro / Gold",
    image: "",
    inStock: true
  },
];

// ==========================================
// APP STATE
// ==========================================
let products = [];
let cart = [];
let filteredProducts = [];

// ==========================================
// INITIALIZATION
// ==========================================
function initStore() {
  loadProducts();
  loadCart();
  renderProducts();
  renderCart();
  updateCartCount();
  setupEventListeners();
}

function loadProducts() {
  const stored = localStorage.getItem('mrhats_products');
  if (stored) {
    products = JSON.parse(stored);
  } else {
    products = [...DEFAULT_PRODUCTS];
    localStorage.setItem('mrhats_products', JSON.stringify(products));
  }
  filteredProducts = [...products];
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
    searchInput.addEventListener('input', () => filterProducts());
  }

  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  if (cartToggle) cartToggle.addEventListener('click', () => openCart());
  if (cartClose) cartClose.addEventListener('click', () => closeCart());
  if (cartOverlay) cartOverlay.addEventListener('click', () => closeCart());

  const brandFilter = document.getElementById('brandFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  if (brandFilter) brandFilter.addEventListener('change', filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

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
// PRODUCT IMAGE HELPER
// ==========================================
function getProductImageHTML(product, size) {
  const sizeClass = size === 'large' ? 'img-large' : '';
  if (product.image && product.image.length > 10) {
    // It's a base64 or URL image
    return `<img src="${product.image}" alt="${product.name}" class="product-img ${sizeClass}">`;
  }
  // Fallback emoji based on brand
  const emojis = {
    'New Era': '🧢',
    'Barbas Hats': '👑',
    'Dandy Hats': '🎩',
    'Innedit': '💎',
    'BigBoss': '🔥',
    'Cash Money': '💰'
  };
  const emoji = emojis[product.brand] || '🧢';
  return `<span class="product-emoji ${sizeClass}">${emoji}</span>`;
}

// ==========================================
// CART FUNCTIONS
// ==========================================
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
  document.body.style.overflow = '';
}

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
  renderCart();
  updateCartCount();
  showToast(`${product.name} agregado al carrito`);
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (el) {
    const count = getCartItemCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
}

function getCartItemThumb(item) {
  if (item.image && item.image.length > 10) {
    return `<img src="${item.image}" alt="${item.name}" class="cart-thumb">`;
  }
  const emojis = { 'New Era': '🧢', 'Barbas Hats': '👑', 'Dandy Hats': '🎩', 'Innedit': '💎', 'BigBoss': '🔥', 'Cash Money': '💰' };
  return `<div class="cart-item-emoji">${emojis[item.brand] || '🧢'}</div>`;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <p>Tu carrito está vacío</p>
        <p style="font-size:0.8rem;margin-top:8px;">Explora nuestra colección y agrega gorras.</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${getCartItemThumb(item)}
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#10005;</button>
    </div>
  `).join('');

  const subtotal = getCartTotal();
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
// PRODUCT RENDERING
// ==========================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  if (countEl) {
    countEl.textContent = `Mostrando ${filteredProducts.length} de ${products.length} productos`;
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <div class="icon">🔍</div>
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o términos de búsqueda.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <span class="product-badge badge-brand">${product.brand}</span>
        ${!product.inStock ? '<span class="product-badge badge-oos">Agotado</span>' : ''}
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
        <button class="btn btn-gold" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
          ${product.inStock ? '🛒 Agregar' : 'Agotado'}
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================
// FILTER / SEARCH
// ==========================================
function filterProducts() {
  const brand = document.getElementById('brandFilter')?.value || 'all';
  const category = document.getElementById('categoryFilter')?.value || 'all';
  const search = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';

  filteredProducts = products.filter(p => {
    const brandMatch = brand === 'all' || p.brand === brand;
    const catMatch = category === 'all' || p.category === category;
    const searchMatch = !search ||
      p.name.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.color.toLowerCase().includes(search);
    return brandMatch && catMatch && searchMatch;
  });

  renderProducts();
}

// ==========================================
// CHECKOUT
// ==========================================
function openCheckout() {
  if (cart.length === 0) return;
  const overlay = document.getElementById('checkoutOverlay');
  if (!overlay) return;

  const subtotal = getCartTotal();
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

  const subtotal = getCartTotal();
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
  renderCart();
  updateCartCount();
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
  initStore();
  renderFeatured();
});
