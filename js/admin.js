/* ==========================================
   MR HATS - Admin Panel JavaScript
   ========================================== */

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'mrhats2024';

let currentEditOrderId = null;

// ==========================================
// AUTHENTICATION
// ==========================================
function checkAuth() {
    const isLoggedIn = localStorage.getItem('mrhats_admin_auth') === 'true';
    if (isLoggedIn) {
        showAdmin();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('mrhats_admin_auth', 'true');
        showAdmin();
    } else {
        document.getElementById('loginError').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loginError').style.display = 'none';
        }, 3000);
    }
}

function handleLogout() {
    localStorage.removeItem('mrhats_admin_auth');
    showLogin();
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminLayout').style.display = 'none';
}

function showAdmin() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminLayout').style.display = 'block';
    loadDashboard();
}

// ==========================================
// NAVIGATION
// ==========================================
function showSection(sectionId, navItem) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('section-' + sectionId).classList.add('active');
    if (navItem) navItem.classList.add('active');

    switch (sectionId) {
        case 'dashboard': loadDashboard(); break;
        case 'products': loadProductsTable(); break;
        case 'orders': loadOrdersTable(); break;
        case 'inventory': loadInventoryTable(); break;
        case 'add-product': break;
    }
}

// ==========================================
// DASHBOARD
// ==========================================
function loadDashboard() {
    const products = getProducts();
    const orders = getOrders();

    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statOrders').textContent = orders.length;

    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    document.getElementById('statSales').textContent = '$' + totalSales.toFixed(2);

    const outOfStock = products.filter(p => !p.inStock).length;
    document.getElementById('statOutOfStock').textContent = outOfStock;

    // Recent orders
    const recent = orders.slice(-5).reverse();
    if (recent.length === 0) {
        document.getElementById('recentOrders').innerHTML = '<p style="color: #999;">No hay pedidos aún.</p>';
        return;
    }

    document.getElementById('recentOrders').innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                ${recent.map(o => `
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.customer.name}</td>
                        <td>$${o.total.toFixed(2)}</td>
                        <td><span class="status-badge status-${o.status.toLowerCase()}">${translateStatus(o.status)}</span></td>
                        <td>${new Date(o.date).toLocaleDateString('es-MX')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ==========================================
// PRODUCTS MANAGEMENT
// ==========================================
function getProducts() {
    return JSON.parse(localStorage.getItem('mrhats_products') || '[]');
}

function saveProducts(products) {
    localStorage.setItem('mrhats_products', JSON.stringify(products));
}

function loadProductsTable() {
    const products = getProducts();
    if (products.length === 0) {
        document.getElementById('productsTable').innerHTML = '<p style="color: #999;">No hay productos.</p>';
        return;
    }

    document.getElementById('productsTable').innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.image} ${p.name}</td>
                        <td>${p.brand}</td>
                        <td>${p.category}</td>
                        <td>$${p.price.toFixed(2)}</td>
                        <td>${p.inStock ? '<span style="color: #22c55e;">✓ Sí</span>' : '<span style="color: #ef4444;">✗ No</span>'}</td>
                        <td>
                            <div class="admin-actions">
                                <button class="btn btn-outline btn-sm" onclick="editProduct(${p.id})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function autoPrice() {
    const brand = document.getElementById('prodBrand').value;
    if (brand === 'New Era') {
        document.getElementById('prodPrice').value = '25.00';
    } else if (brand) {
        document.getElementById('prodPrice').value = '49.99';
    }
}

function saveProduct(e) {
    e.preventDefault();
    const products = getProducts();
    const editId = document.getElementById('editProductId').value;

    const productData = {
        name: document.getElementById('prodName').value,
        brand: document.getElementById('prodBrand').value,
        category: document.getElementById('prodCategory').value,
        price: parseFloat(document.getElementById('prodPrice').value),
        description: document.getElementById('prodDescription').value || '',
        color: document.getElementById('prodColor').value || '',
        image: document.getElementById('prodImage').value,
        inStock: document.getElementById('prodInStock').checked,
    };

    if (editId) {
        const index = products.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
        productData.id = maxId + 1;
        products.push(productData);
    }

    saveProducts(products);
    resetProductForm();
    showSection('products', document.querySelector('.admin-nav-item:nth-child(2)'));
    alert(editId ? 'Producto actualizado' : 'Producto agregado');
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('editProductId').value = product.id;
    document.getElementById('prodName').value = product.name;
    document.getElementById('prodBrand').value = product.brand;
    document.getElementById('prodCategory').value = product.category;
    document.getElementById('prodPrice').value = product.price;
    document.getElementById('prodDescription').value = product.description || '';
    document.getElementById('prodColor').value = product.color || '';
    document.getElementById('prodImage').value = product.image;
    document.getElementById('prodInStock').checked = product.inStock;
    document.getElementById('productFormTitle').textContent = 'Editar Producto';

    showSection('add-product', document.querySelector('.admin-nav-item:nth-child(3)'));
}

function deleteProduct(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    loadProductsTable();
}

function resetProductForm() {
    document.getElementById('editProductId').value = '';
    document.getElementById('prodName').value = '';
    document.getElementById('prodBrand').value = '';
    document.getElementById('prodCategory').value = '';
    document.getElementById('prodPrice').value = '';
    document.getElementById('prodDescription').value = '';
    document.getElementById('prodColor').value = '';
    document.getElementById('prodImage').value = '🧢';
    document.getElementById('prodInStock').checked = true;
    document.getElementById('productFormTitle').textContent = 'Agregar Producto';
}

// ==========================================
// ORDERS MANAGEMENT
// ==========================================
function getOrders() {
    return JSON.parse(localStorage.getItem('mrhats_orders') || '[]');
}

function saveOrders(orders) {
    localStorage.setItem('mrhats_orders', JSON.stringify(orders));
}

function loadOrdersTable() {
    const orders = getOrders();
    if (orders.length === 0) {
        document.getElementById('ordersTable').innerHTML = '<p style="color: #999;">No hay pedidos aún. Los pedidos aparecerán aquí cuando los clientes compren desde la tienda.</p>';
        return;
    }

    document.getElementById('ordersTable').innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(o => `
                    <tr>
                        <td><strong>${o.id}</strong></td>
                        <td>${o.customer.name}</td>
                        <td>${o.customer.email}</td>
                        <td>${o.items.reduce((sum, i) => sum + i.quantity, 0)} items</td>
                        <td><strong>$${o.total.toFixed(2)}</strong></td>
                        <td>${translatePayment(o.payment)}</td>
                        <td><span class="status-badge status-${o.status.toLowerCase()}">${translateStatus(o.status)}</span></td>
                        <td>${new Date(o.date).toLocaleDateString('es-MX')}</td>
                        <td>
                            <button class="btn btn-outline btn-sm" onclick="openOrderModal('${o.id}')">Ver/Editar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function openOrderModal(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    currentEditOrderId = orderId;

    document.getElementById('orderDetails').innerHTML = `
        <p><strong>Pedido:</strong> ${order.id}</p>
        <p><strong>Cliente:</strong> ${order.customer.name}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Teléfono:</strong> ${order.customer.phone}</p>
        <p><strong>Dirección:</strong> ${order.customer.address}</p>
        <p><strong>Pago:</strong> ${translatePayment(order.payment)}</p>
        <hr style="margin: 12px 0;">
        <p><strong>Productos:</strong></p>
        ${order.items.map(i => `<p>• ${i.name} x${i.quantity} - $${(i.price * i.quantity).toFixed(2)}</p>`).join('')}
        <hr style="margin: 12px 0;">
        <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;

    document.getElementById('orderStatus').value = order.status;
    document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
    currentEditOrderId = null;
}

function updateOrderStatus() {
    if (!currentEditOrderId) return;
    const orders = getOrders();
    const order = orders.find(o => o.id === currentEditOrderId);
    if (!order) return;

    order.status = document.getElementById('orderStatus').value;
    saveOrders(orders);
    closeOrderModal();
    loadOrdersTable();
    alert('Estado actualizado');
}

// ==========================================
// INVENTORY
// ==========================================
function loadInventoryTable() {
    const products = getProducts();

    document.getElementById('inventoryTable').innerHTML = `
        <div class="admin-toolbar">
            <p>Total: ${products.length} productos | En stock: ${products.filter(p => p.inStock).length} | Agotados: ${products.filter(p => !p.inStock).length}</p>
        </div>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.image} ${p.name}</td>
                        <td>${p.brand}</td>
                        <td>$${p.price.toFixed(2)}</td>
                        <td>${p.inStock ? '<span style="color: #22c55e;">En Stock ✓</span>' : '<span style="color: #ef4444;">Agotado ✗</span>'}</td>
                        <td>
                            <button class="btn btn-sm ${p.inStock ? 'btn-danger' : 'btn-primary'}" onclick="toggleStock(${p.id})">
                                ${p.inStock ? 'Marcar Agotado' : 'Marcar En Stock'}
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function toggleStock(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        product.inStock = !product.inStock;
        saveProducts(products);
        loadInventoryTable();
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
    return map[status] || status;
}

function translatePayment(method) {
    const map = {
        'cash': 'Efectivo',
        'transfer': 'Transferencia',
        'pickup': 'Recoger en tienda'
    };
    return map[method] || method;
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', checkAuth);
