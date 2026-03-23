/* ==========================================
   MR HATS - Admin Panel JavaScript
   ========================================== */

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'mrhats2024';

// Allowed brands (updated)
const ADMIN_ALLOWED_BRANDS = ['New Era', '31 Hats', 'Dandy Hats', 'Barbas Hats', 'Cash Money Hats', 'Inedit Hats', 'MR Hats Exclusive'];

// ==========================================
// POLICE SIREN EFFECT (wrong password)
// ==========================================
let sirenAudioCtx = null;

function playPoliceSiren() {
    try {
        sirenAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = sirenAudioCtx.createOscillator();
        const gain = sirenAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, sirenAudioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, sirenAudioCtx.currentTime);

        // Siren sweep up/down
        const duration = 3;
        const steps = 6;
        for (let i = 0; i < steps; i++) {
            const t = sirenAudioCtx.currentTime + (i * duration / steps);
            if (i % 2 === 0) {
                osc.frequency.linearRampToValueAtTime(1200, t + duration / steps / 2);
                osc.frequency.linearRampToValueAtTime(600, t + duration / steps);
            } else {
                osc.frequency.linearRampToValueAtTime(800, t + duration / steps / 2);
                osc.frequency.linearRampToValueAtTime(400, t + duration / steps);
            }
        }
        gain.gain.linearRampToValueAtTime(0, sirenAudioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(sirenAudioCtx.destination);
        osc.start();
        osc.stop(sirenAudioCtx.currentTime + duration);
    } catch (e) {
        // Audio not supported, just do visual
    }
}

function triggerPoliceEffect() {
    const loginBox = document.querySelector('.login-box');
    const loginPage = document.getElementById('loginPage');
    if (!loginBox || !loginPage) return;

    // Add police flash class
    loginPage.classList.add('police-flash');
    loginBox.classList.add('police-shake');

    // Play siren sound
    playPoliceSiren();

    // Remove after animation
    setTimeout(() => {
        loginPage.classList.remove('police-flash');
        loginBox.classList.remove('police-shake');
    }, 3000);
}

// ==========================================
// AUTH
// ==========================================
function checkAuth() {
  return localStorage.getItem('mrhats_admin_auth') === 'true';
}

function showLogin() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
}

function showAdmin() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminApp').style.display = 'flex';
  loadDashboard();
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const errorEl = document.getElementById('loginError');

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem('mrhats_admin_auth', 'true');
    errorEl.style.display = 'none';
    showAdmin();
  } else {
    errorEl.style.display = 'block';
    errorEl.textContent = '🚨 ACCESO DENEGADO - Contraseña incorrecta 🚨';
    triggerPoliceEffect();
  }
}

function logout() {
  localStorage.removeItem('mrhats_admin_auth');
  showLogin();
}

// ==========================================
// NAVIGATION
// ==========================================
function navigateTo(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-sidebar nav a').forEach(a => a.classList.remove('active'));

  const sectionEl = document.getElementById('section-' + section);
  const navEl = document.querySelector(`[data-section="${section}"]`);
  if (sectionEl) sectionEl.classList.add('active');
  if (navEl) navEl.classList.add('active');

  const titles = {
    dashboard: 'Dashboard',
    products: 'Gestión de Productos',
    orders: 'Gestión de Pedidos',
    inventory: 'Inventario'
  };
  const headerTitle = document.getElementById('adminTitle');
  if (headerTitle) headerTitle.textContent = titles[section] || 'Dashboard';

  if (section === 'dashboard') loadDashboard();
  if (section === 'products') loadProductsTable();
  if (section === 'orders') loadOrdersTable();
  if (section === 'inventory') loadInventory();
}

// ==========================================
// DATA HELPERS
// ==========================================
function getProducts() {
  const stored = localStorage.getItem('mrhats_products');
  if (stored) return JSON.parse(stored);
  return [];
}

function saveProducts(prods) {
  localStorage.setItem('mrhats_products', JSON.stringify(prods));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('mrhats_orders') || '[]');
}

function saveOrders(orders) {
  localStorage.setItem('mrhats_orders', JSON.stringify(orders));
}

// ==========================================
// IMAGE HELPERS
// ==========================================
function getProductThumb(product) {
  if (product.image && product.image.length > 10) {
    return `<img src="${product.image}" alt="${product.name}" class="admin-thumb">`;
  }
  const emojis = {
    'New Era': '🧢',
    '31 Hats': '🎯',
    'Barbas Hats': '👑',
    'Dandy Hats': '🎩',
    'Inedit Hats': '💎',
    'Cash Money Hats': '💰',
    'MR Hats Exclusive': '🔥'
  };
  return `<span class="admin-thumb-emoji">${emojis[product.brand] || '🧢'}</span>`;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    alert('La imagen es muy grande. Máximo 2MB.');
    return;
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Solo se permiten archivos de imagen.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Resize image to reduce localStorage usage
      const canvas = document.createElement('canvas');
      const maxSize = 400;
      let w = img.width;
      let h = img.height;

      if (w > maxSize || h > maxSize) {
        if (w > h) {
          h = Math.round(h * maxSize / w);
          w = maxSize;
        } else {
          w = Math.round(w * maxSize / h);
          h = maxSize;
        }
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      document.getElementById('pImage').value = dataUrl;
      document.getElementById('imagePreview').src = dataUrl;
      document.getElementById('imagePreview').style.display = 'block';
      document.getElementById('uploadPlaceholder').style.display = 'none';
      document.getElementById('removeImageBtn').style.display = 'inline-flex';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  document.getElementById('pImage').value = '';
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('imagePreview').src = '';
  document.getElementById('uploadPlaceholder').style.display = 'flex';
  document.getElementById('removeImageBtn').style.display = 'none';
  document.getElementById('pImageFile').value = '';
}

function autoPriceAdmin() {
  const brand = document.getElementById('pBrand').value;
  const prices = {
    'New Era': '25.00',
    '31 Hats': '45.00',
    'Dandy Hats': '42.00',
    'Barbas Hats': '39.00',
    'Cash Money Hats': '48.00',
    'Inedit Hats': '40.00',
    'MR Hats Exclusive': '55.00'
  };
  document.getElementById('pPrice').value = prices[brand] || '25.00';
}

// ==========================================
// DASHBOARD
// ==========================================
function loadDashboard() {
  const products = getProducts();
  const orders = getOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  document.getElementById('dashRevenue').textContent = '$' + totalRevenue.toFixed(2);
  document.getElementById('dashProducts').textContent = products.length;
  document.getElementById('dashOrders').textContent = orders.length;
  document.getElementById('dashInStock').textContent = products.filter(p => p.inStock).length;

  const recentOrders = orders.slice(-5).reverse();
  const tbody = document.getElementById('dashRecentOrders');
  if (tbody) {
    if (recentOrders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#757575;padding:24px;">No hay pedidos aún</td></tr>';
    } else {
      tbody.innerHTML = recentOrders.map(o => `
        <tr>
          <td>#${o.id}</td>
          <td>${o.customer?.name || 'N/A'}</td>
          <td>${o.items?.length || 0} items</td>
          <td>$${(o.total || 0).toFixed(2)}</td>
          <td><span class="status-badge status-${(o.status || 'pending').toLowerCase()}">${translateStatus(o.status)}</span></td>
        </tr>
      `).join('');
    }
  }
}

// ==========================================
// PRODUCT MANAGEMENT
// ==========================================
let editingProductId = null;

function loadProductsTable() {
  const products = getProducts();
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#757575;padding:24px;">No hay productos. ¡Agrega uno!</td></tr>';
    return;
  }

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${getProductThumb(p)}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.brand}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td><span class="status-badge ${p.inStock ? 'status-delivered' : 'status-pending'}">${p.inStock ? 'En Stock' : 'Agotado'}</span></td>
      <td>
        <button class="btn btn-sm btn-gold" onclick="editProduct(${p.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function openProductForm(product) {
  editingProductId = product ? product.id : null;
  const modal = document.getElementById('productFormModal');
  document.getElementById('productFormTitle').textContent = product ? 'Editar Producto' : 'Agregar Producto';

  document.getElementById('pName').value = product?.name || '';
  document.getElementById('pBrand').value = product?.brand || 'New Era';
  document.getElementById('pCategory').value = product?.category || 'Snapback';
  document.getElementById('pPrice').value = product?.price || '';
  document.getElementById('pColor').value = product?.color || '';
  document.getElementById('pDescription').value = product?.description || '';
  document.getElementById('pInStock').checked = product ? product.inStock : true;

  // Handle image
  const imageVal = product?.image || '';
  document.getElementById('pImage').value = imageVal;
  if (imageVal && imageVal.length > 10) {
    document.getElementById('imagePreview').src = imageVal;
    document.getElementById('imagePreview').style.display = 'block';
    document.getElementById('uploadPlaceholder').style.display = 'none';
    document.getElementById('removeImageBtn').style.display = 'inline-flex';
  } else {
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').src = '';
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    document.getElementById('removeImageBtn').style.display = 'none';
  }
  document.getElementById('pImageFile').value = '';

  if (!product) autoPriceAdmin();

  modal.classList.add('open');
}

function closeProductForm() {
  document.getElementById('productFormModal').classList.remove('open');
  editingProductId = null;
}

function handleProductForm(e) {
  e.preventDefault();
  const products = getProducts();

  const productData = {
    name: document.getElementById('pName').value.trim(),
    brand: document.getElementById('pBrand').value,
    category: document.getElementById('pCategory').value,
    price: parseFloat(document.getElementById('pPrice').value),
    color: document.getElementById('pColor').value.trim(),
    description: document.getElementById('pDescription').value.trim(),
    image: document.getElementById('pImage').value,
    inStock: document.getElementById('pInStock').checked
  };

  if (!productData.name || isNaN(productData.price)) {
    alert('Por favor llena los campos requeridos (nombre, precio).');
    return;
  }

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...productData };
    }
  } else {
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    products.push({ id: maxId + 1, ...productData });
  }

  saveProducts(products);
  closeProductForm();
  loadProductsTable();
}

function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (product) openProductForm(product);
}

function deleteProduct(id) {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return;
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  loadProductsTable();
}

// ==========================================
// ORDER MANAGEMENT
// ==========================================
function loadOrdersTable() {
  const orders = getOrders();
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#757575;padding:24px;">No hay pedidos aún</td></tr>';
    return;
  }

  tbody.innerHTML = orders.slice().reverse().map(o => {
    const date = new Date(o.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' });
    const itemList = (o.items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
    return `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td>
          <strong>${o.customer?.name || 'N/A'}</strong><br>
          <small style="color:#757575;">${o.customer?.email || ''}</small>
        </td>
        <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${itemList}">${itemList || 'N/A'}</td>
        <td>$${(o.total || 0).toFixed(2)}</td>
        <td>${date}</td>
        <td><span class="status-badge status-${(o.status || 'pending').toLowerCase()}">${translateStatus(o.status)}</span></td>
        <td>
          <select onchange="updateOrderStatus(${o.id}, this.value)" style="padding:4px 8px;border-radius:4px;border:1px solid #e0e0e0;font-size:0.8rem;">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pendiente</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Procesando</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Enviado</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Entregado</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrders(orders);
    loadOrdersTable();
    loadDashboard();
  }
}

// ==========================================
// INVENTORY
// ==========================================
function loadInventory() {
  const products = getProducts();
  const tbody = document.getElementById('inventoryTableBody');
  if (!tbody) return;

  document.getElementById('invTotal').textContent = products.length;
  document.getElementById('invInStock').textContent = products.filter(p => p.inStock).length;
  document.getElementById('invOutOfStock').textContent = products.filter(p => !p.inStock).length;

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${getProductThumb(p)}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.brand}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm ${p.inStock ? 'btn-success' : 'btn-danger'}" onclick="toggleStock(${p.id})">
          ${p.inStock ? '✓ En Stock' : '✗ Agotado'}
        </button>
      </td>
    </tr>
  `).join('');
}

function toggleStock(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    product.inStock = !product.inStock;
    saveProducts(products);
    loadInventory();
  }
}

// ==========================================
// HELPERS
// ==========================================
function translateStatus(status) {
  const map = {
    'Pending': 'Pendiente',
    'Processing': 'Procesando',
    'Shipped': 'Enviado',
    'Delivered': 'Entregado'
  };
  return map[status] || status || 'Pendiente';
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const productForm = document.getElementById('productForm');
  if (productForm) productForm.addEventListener('submit', handleProductForm);

  document.querySelectorAll('.admin-sidebar nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) navigateTo(section);
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  const productFormModal = document.getElementById('productFormModal');
  if (productFormModal) {
    productFormModal.addEventListener('click', (e) => {
      if (e.target === productFormModal) closeProductForm();
    });
  }

  if (checkAuth()) {
    showAdmin();
  } else {
    showLogin();
  }
});
