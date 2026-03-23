/* ==========================================
   MR HATS - Store JavaScript
   ========================================== */

// ==========================================
// PRODUCT DATA
// ==========================================
const DEFAULT_PRODUCTS = [
  // --- NEW ERA ($25.00) ---
  { id: 1, name: "59FIFTY Fitted Cap - Black", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Classic 59FIFTY fitted cap in solid black. Structured crown, flat visor.", color: "Black", image: "🧢", inStock: true },
  { id: 2, name: "59FIFTY Fitted Cap - Navy", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Iconic 59FIFTY fitted cap in navy blue. Official on-field style.", color: "Navy", image: "🧢", inStock: true },
  { id: 3, name: "9FORTY Adjustable - Red", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Relaxed 9FORTY adjustable cap. Pre-curved visor, comfortable fit.", color: "Red", image: "🧢", inStock: true },
  { id: 4, name: "9FORTY Adjustable - Gray", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Casual 9FORTY adjustable in heather gray. Everyday comfort.", color: "Gray", image: "🧢", inStock: true },
  { id: 5, name: "9FIFTY Snapback - Black/Gold", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "High-crown 9FIFTY snapback with gold accents. Bold street style.", color: "Black/Gold", image: "🧢", inStock: true },
  { id: 6, name: "9FIFTY Snapback - Camo", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "9FIFTY snapback in woodland camo. Flat visor, adjustable snap.", color: "Camo", image: "🧢", inStock: true },
  { id: 7, name: "59FIFTY Low Profile - White", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Sleek low-profile 59FIFTY in clean white. Modern silhouette.", color: "White", image: "🧢", inStock: true },
  { id: 8, name: "39THIRTY Stretch Fit - Charcoal", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Stretch-fit 39THIRTY in charcoal. No-hassle fit, curved visor.", color: "Charcoal", image: "🧢", inStock: true },
  { id: 9, name: "9TWENTY Adjustable - Khaki", brand: "New Era", category: "Baseball/Snapback", price: 25.00, description: "Relaxed unstructured 9TWENTY cap. Washed cotton, vintage feel.", color: "Khaki", image: "🧢", inStock: true },

  // --- STETSON ($49.99) ---
  { id: 10, name: "Skyline 6X Felt Hat", brand: "Stetson", category: "Felt", price: 49.99, description: "Premium 6X quality fur felt. Cattleman crown, San Antonio style.", color: "Silverbelly", image: "🤠", inStock: true },
  { id: 11, name: "El Presidente 10X Felt", brand: "Stetson", category: "Felt", price: 49.99, description: "Luxurious 10X beaver felt. Classic western crown with satin lining.", color: "Black", image: "🤠", inStock: true },
  { id: 12, name: "Open Road 6X", brand: "Stetson", category: "Western", price: 49.99, description: "The iconic Open Road. Worn by presidents and ranchers alike.", color: "Silverbelly", image: "🤠", inStock: true },
  { id: 13, name: "Stallion Straw Hat", brand: "Stetson", category: "Straw", price: 49.99, description: "Cool and comfortable shantung straw. Perfect for Texas summers.", color: "Natural", image: "🤠", inStock: true },
  { id: 14, name: "Rancher Straw Hat", brand: "Stetson", category: "Straw", price: 49.99, description: "Durable palm leaf straw with leather hatband. Work-ready.", color: "Natural", image: "🤠", inStock: true },
  { id: 15, name: "Boss of the Plains", brand: "Stetson", category: "Western", price: 49.99, description: "The original Stetson design. Timeless round crown, flat brim.", color: "Fawn", image: "🤠", inStock: true },

  // --- RESISTOL ($49.99) ---
  { id: 16, name: "Black Gold 20X Felt", brand: "Resistol", category: "Felt", price: 49.99, description: "Ultra-premium 20X beaver felt. Self-conforming comfort band.", color: "Black", image: "🤠", inStock: true },
  { id: 17, name: "Cojo Special 4X Felt", brand: "Resistol", category: "Felt", price: 49.99, description: "George Strait collection. Cattleman crown, 4-inch brim.", color: "Natural", image: "🤠", inStock: true },
  { id: 18, name: "Jason Aldean Straw", brand: "Resistol", category: "Straw", price: 49.99, description: "Jason Aldean signature series. Bangora straw, vented crown.", color: "Natural", image: "🤠", inStock: true },
  { id: 19, name: "Ranch Road Straw", brand: "Resistol", category: "Straw", price: 49.99, description: "Traditional western straw with Resistol comfort. Built to last.", color: "Tan", image: "🤠", inStock: true },
  { id: 20, name: "Cattleman 6X Felt", brand: "Resistol", category: "Western", price: 49.99, description: "Classic cattleman crease in premium 6X felt. Texas tradition.", color: "Silverbelly", image: "🤠", inStock: true },

  // --- ARIAT ($49.99) ---
  { id: 21, name: "Western Wool Felt Hat", brand: "Ariat", category: "Felt", price: 49.99, description: "Premium wool felt with Ariat logo pin. Shapeable brim.", color: "Chocolate", image: "🤠", inStock: true },
  { id: 22, name: "Bangora Straw Western", brand: "Ariat", category: "Straw", price: 49.99, description: "Lightweight bangora straw. Two-tone hatband, pinch front crown.", color: "Natural", image: "🤠", inStock: true },
  { id: 23, name: "Mesh Back Cap", brand: "Ariat", category: "Baseball/Snapback", price: 49.99, description: "Richardson-style Ariat cap with mesh back. Embroidered logo.", color: "Brown/Tan", image: "🧢", inStock: true },
  { id: 24, name: "Flexfit Western Cap", brand: "Ariat", category: "Baseball/Snapback", price: 49.99, description: "Stretch-fit western cap with Ariat shield. Oil-skin look.", color: "Black", image: "🧢", inStock: true },

  // --- BAILEY ($49.99) ---
  { id: 25, name: "Western Lightning 4X Felt", brand: "Bailey", category: "Felt", price: 49.99, description: "Handcrafted 4X fur felt. Pinch-front crown, bound edge.", color: "Black", image: "🎩", inStock: true },
  { id: 26, name: "Tully Roan Straw", brand: "Bailey", category: "Straw", price: 49.99, description: "Premium shantung straw with crushable construction. Travel-ready.", color: "Natural", image: "🤠", inStock: true },
  { id: 27, name: "Poet Dress Hat", brand: "Bailey", category: "Dress", price: 49.99, description: "Elegant dress hat in fine fur felt. Grosgrain ribbon band.", color: "Steel Gray", image: "🎩", inStock: true },

  // --- CHARLIE 1 HORSE ($49.99) ---
  { id: 28, name: "Highway Wool Felt", brand: "Charlie 1 Horse", category: "Western", price: 49.99, description: "Fashion-forward western felt with concho band. Free spirit style.", color: "Dusty Rose", image: "🤠", inStock: true },
  { id: 29, name: "Ivory Tower Straw", brand: "Charlie 1 Horse", category: "Straw", price: 49.99, description: "Chic straw hat with leather and feather band. Festival ready.", color: "Ivory", image: "🤠", inStock: true },
  { id: 30, name: "Chief Wool Felt", brand: "Charlie 1 Horse", category: "Felt", price: 49.99, description: "Bold fashion western with beaded hatband. Statement piece.", color: "Black", image: "🤠", inStock: true },

  // --- LARRY MAHAN ($49.99) ---
  { id: 31, name: "30X Opulento Felt", brand: "Larry Mahan", category: "Felt", price: 49.99, description: "Ultra-premium 30X beaver felt. Tejana crown, luxury finish.", color: "Platinum", image: "🤠", inStock: true },
  { id: 32, name: "Tucson Palm Straw", brand: "Larry Mahan", category: "Straw", price: 49.99, description: "Genuine palm straw with cattleman crown. Durable ranch style.", color: "Natural", image: "🤠", inStock: true },
  { id: 33, name: "Tejano 1000X Straw", brand: "Larry Mahan", category: "Straw", price: 49.99, description: "Incredibly fine 1000X straw. Ventilated, lightweight, elegant.", color: "Natural/Tan", image: "🤠", inStock: true },
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
  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Search toggle
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

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterProducts();
    });
  }

  // Cart toggle
  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');

  if (cartToggle) {
    cartToggle.addEventListener('click', () => openCart());
  }
  if (cartClose) {
    cartClose.addEventListener('click', () => closeCart());
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => closeCart());
  }

  // Filters
  const brandFilter = document.getElementById('brandFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  if (brandFilter) brandFilter.addEventListener('change', filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

  // Nav links smooth scroll & close mobile menu
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', openCheckout);
  }

  // Checkout modal close
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckout();
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
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
  showToast(`${product.name} added to cart`);
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

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:0.8rem;margin-top:8px;">Browse our collection and add some hats!</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.image}</div>
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

  // Update totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.0825; // Texas sales tax
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
    countEl.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <div class="icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <span class="product-badge badge-brand">${product.brand}</span>
        ${!product.inStock ? '<span class="product-badge badge-oos" style="left:auto;right:10px;">Sold Out</span>' : ''}
        ${product.image}
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
          ${product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
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
      <span>${item.image} ${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>`
  ).join('');

  document.getElementById('checkoutContent').innerHTML = `
    <h3>Order Summary</h3>
    ${summaryHtml}
    <div class="order-total">
      <span>Total (incl. tax)</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <div style="margin-top:24px;">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="custName" required placeholder="Your name">
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input type="tel" id="custPhone" required placeholder="(210) 555-0000">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="custEmail" required placeholder="you@email.com">
      </div>
      <button class="btn btn-gold" style="width:100%;margin-top:8px;" onclick="placeOrder()">
        Place Order
      </button>
      <button class="btn btn-outline" style="width:100%;margin-top:8px;" onclick="closeCheckout()">
        Cancel
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
    showToast('Please fill in all fields');
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
    subtotal,
    tax,
    total,
    status: 'Pending'
  };

  // Save order
  const orders = JSON.parse(localStorage.getItem('mrhats_orders') || '[]');
  orders.push(order);
  localStorage.setItem('mrhats_orders', JSON.stringify(orders));

  // Clear cart
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();

  closeCheckout();
  showToast('Order placed successfully! We will contact you shortly.');

  document.getElementById('checkoutContent').innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="font-size:4rem;margin-bottom:16px;">✅</div>
      <h3>Order Confirmed!</h3>
      <p style="color:#757575;margin:12px 0;">Order #${order.id}</p>
      <p style="color:#757575;">Thank you, ${name}! We'll reach out via phone or email to confirm your order.</p>
      <button class="btn btn-gold" style="margin-top:20px;" onclick="closeCheckout()">Continue Shopping</button>
    </div>
  `;
  document.getElementById('checkoutOverlay').classList.add('open');
}

// ==========================================
// CONTACT FORM
// ==========================================
function handleContactForm(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll get back to you soon.');
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
// FEATURED PRODUCTS (for homepage section)
// ==========================================
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = products.filter(p => p.inStock).slice(0, 4);
  grid.innerHTML = featured.map(product => `
    <div class="product-card">
      <div class="product-image">
        <span class="product-badge badge-brand">${product.brand}</span>
        ${product.image}
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
        <button class="btn btn-gold" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
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
