/* ==========================================
   MR HATS - Admin Panel JavaScript
   ========================================== */

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'mrhats2024';

// ==========================================
// AUTH
// ==========================================
function checkAuth() {
  const auth = localStorage.getItem('mrhats_admin_auth');
  return auth === 'true';
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
    errorEl.textContent = 'Invalid username or password.';
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

  // Update header title
  const titles = { dashboard: 'Dashboard', products: 'Product Management', orders: 'Order Management', inventory: 'Inventory' };
  const headerTitle = document.getElementById('adminTitle');
  if (headerTitle) headerTitle.textContent = titles[section] || 'Dashboard';

  // Refresh section data
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
// DASHBOARD
// ==========================================
function loadDashboard() {
  const products = getProducts();
  const orders = getOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const inStockCount = products.filter(p => p.inStock).length;

  document.getElementById('dashRevenue').textContent = '$' + totalRevenue.toFixed(2);
  document.getElementById('dashProducts').textContent = totalProducts;
  document.getElementById('dashOrders').textContent = totalOrders;
  document.getElementById('dashInStock').textContent = inStockCount;

  // Recent orders
  const recentOrders = orders.slice(-5).reverse();
  const tbody = document.getElementById('dashRecentOrders');
  if (tbody) {
    if (recentOrders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#757575;padding:24px;">No orders yet</td></tr>';
    } else {
      tbody.innerHTML = recentOrders.map(o => `
        <tr>
          <td>#${o.id}</td>
          <td>${o.customer?.name || 'N/A'}</td>
          <td>${o.items?.length || 0} items</td>
          <td>$${(o.total || 0).toFixed(2)}</td>
          <td><span class="status-badge status-${(o.status || 'pending').toLowerCase()}">${o.status || 'Pending'}</span></td>
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
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#757575;padding:24px;">No products. Add one!</td></tr>';
    return;
  }

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.image} ${p.id}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.brand}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td><span class="status-badge ${p.inStock ? 'status-delivered' : 'status-pending'}">${p.inStock ? 'In Stock' : 'Out'}</span></td>
      <td>
        <button class="btn btn-sm btn-gold" onclick="editProduct(${p.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openProductForm(product = null) {
  editingProductId = product ? product.id : null;
  const modal = document.getElementById('productFormModal');
  document.getElementById('productFormTitle').textContent = product ? 'Edit Product' : 'Add Product';

  document.getElementById('pName').value = product?.name || '';
  document.getElementById('pBrand').value = product?.brand || 'New Era';
  document.getElementById('pCategory').value = product?.category || 'Baseball/Snapback';
  document.getElementById('pPrice').value = product?.price || '';
  document.getElementById('pColor').value = product?.color || '';
  document.getElementById('pDescription').value = product?.description || '';
  document.getElementById('pImage').value = product?.image || '🧢';
  document.getElementById('pInStock').checked = product ? product.inStock : true;

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
    image: document.getElementById('pImage').value.trim() || '🧢',
    inStock: document.getElementById('pInStock').checked
  };

  if (!productData.name || isNaN(productData.price)) {
    alert('Please fill in required fields (name, price).');
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
  if (!confirm('Are you sure you want to delete this product?')) return;
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
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#757575;padding:24px;">No orders yet</td></tr>';
    return;
  }

  tbody.innerHTML = orders.slice().reverse().map(o => {
    const date = new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const itemList = (o.items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
    return `
      <tr>
        <td>#${o.id}</td>
        <td>
          <strong>${o.customer?.name || 'N/A'}</strong><br>
          <small style="color:#757575;">${o.customer?.email || ''}</small>
        </td>
        <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${itemList}">${itemList || 'N/A'}</td>
        <td>$${(o.total || 0).toFixed(2)}</td>
        <td>${date}</td>
        <td><span class="status-badge status-${(o.status || 'pending').toLowerCase()}">${o.status || 'Pending'}</span></td>
        <td>
          <select onchange="updateOrderStatus(${o.id}, this.value)" style="padding:4px 8px;border-radius:4px;border:1px solid #e0e0e0;font-size:0.8rem;">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
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

  const brands = [...new Set(products.map(p => p.brand))];
  const summary = brands.map(brand => {
    const brandProducts = products.filter(p => p.brand === brand);
    const inStock = brandProducts.filter(p => p.inStock).length;
    const outOfStock = brandProducts.length - inStock;
    return { brand, total: brandProducts.length, inStock, outOfStock };
  });

  document.getElementById('invTotal').textContent = products.length;
  document.getElementById('invInStock').textContent = products.filter(p => p.inStock).length;
  document.getElementById('invOutOfStock').textContent = products.filter(p => !p.inStock).length;

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.image}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.brand}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm ${p.inStock ? 'btn-success' : 'btn-danger'}" onclick="toggleStock(${p.id})">
          ${p.inStock ? '✓ In Stock' : '✗ Out of Stock'}
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
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  // Product form
  const productForm = document.getElementById('productForm');
  if (productForm) productForm.addEventListener('submit', handleProductForm);

  // Sidebar navigation
  document.querySelectorAll('.admin-sidebar nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) navigateTo(section);
    });
  });

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Product form modal close
  const productFormModal = document.getElementById('productFormModal');
  if (productFormModal) {
    productFormModal.addEventListener('click', (e) => {
      if (e.target === productFormModal) closeProductForm();
    });
  }

  // Check auth
  if (checkAuth()) {
    showAdmin();
  } else {
    showLogin();
  }
});
