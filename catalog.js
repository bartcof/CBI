// catalog.js

const CATALOG_CONFIG = {
    itemsPerPage: 12,
    maxVisiblePages: 5
};

let currentState = {
    products: [],
    filteredProducts: [],
    currentPage: 1,
    activeFilters: {
        category: 'all',
        priceMin: null,
        priceMax: null,
        stock: 'all',
        prescription: 'all',
        manufacturer: 'all'
    },
    sortBy: 'popular',
    viewMode: 'grid'
};

const productData = [
    {
        id: 1,
        name: 'Нурофен Экспресс капсулы 400 мг, 10 шт.',
        category: 'Лекарства',
        price: 450,
        oldPrice: 530,
        discount: 15,
        manufacturer: 'Reckitt Benckiser, Великобритания',
        inStock: true,
        stockCount: 45,
        prescription: false,
        isNew: false,
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: 'Амоксиклав 875 мг + 125 мг, таблетки, 14 шт.',
        category: 'Лекарства',
        price: 890,
        oldPrice: null,
        discount: 0,
        manufacturer: 'Sandoz, Швейцария',
        inStock: true,
        stockCount: 8,
        prescription: true,
        isNew: false,
        rating: 4.7,
        reviews: 89
    },
    {
        id: 3,
        name: 'Компливит для женщин 45+, таблетки, 60 шт.',
        category: 'Витамины и БАДы',
        price: 620,
        oldPrice: 750,
        discount: 17,
        manufacturer: 'Фармстандарт, Россия',
        inStock: true,
        stockCount: 120,
        prescription: false,
        isNew: false,
        rating: 4.5,
        reviews: 210
    },
    {
        id: 4,
        name: 'La Roche-Posay Effaclar гель для умывания, 400 мл',
        category: 'Косметика',
        price: 1250,
        oldPrice: null,
        discount: 0,
        manufacturer: "L'Oreal, Франция",
        inStock: true,
        stockCount: 34,
        prescription: false,
        isNew: false,
        rating: 4.9,
        reviews: 156
    },
    {
        id: 5,
        name: 'Bebe Comfort термометр инфракрасный бесконтактный',
        category: 'Детские товары',
        price: 2990,
        oldPrice: 3500,
        discount: 15,
        manufacturer: 'Microlife, Швейцария',
        inStock: true,
        stockCount: 18,
        prescription: false,
        isNew: true,
        rating: 4.6,
        reviews: 73
    },
    {
        id: 6,
        name: 'Omron M2 Basic тонометр автоматический на плечо',
        category: 'Медицинские изделия',
        price: 3450,
        oldPrice: null,
        discount: 0,
        manufacturer: 'Omron, Япония',
        inStock: false,
        stockCount: 0,
        prescription: false,
        isNew: false,
        rating: 4.8,
        reviews: 205
    },
    {
        id: 7,
        name: 'Цитрамон П таблетки, 20 шт.',
        category: 'Лекарства',
        price: 85,
        oldPrice: null,
        discount: 0,
        manufacturer: 'Фармстандарт, Россия',
        inStock: true,
        stockCount: 230,
        prescription: false,
        isNew: false,
        rating: 4.3,
        reviews: 312
    },
    {
        id: 8,
        name: 'Витрум Вижн таблетки, 30 шт.',
        category: 'Витамины и БАДы',
        price: 870,
        oldPrice: 990,
        discount: 12,
        manufacturer: 'Unipharm, США',
        inStock: true,
        stockCount: 56,
        prescription: false,
        isNew: false,
        rating: 4.7,
        reviews: 98
    },
    {
        id: 9,
        name: 'Бепантен крем 5%, 100 г',
        category: 'Косметика',
        price: 580,
        oldPrice: 650,
        discount: 11,
        manufacturer: 'Bayer, Германия',
        inStock: true,
        stockCount: 42,
        prescription: false,
        isNew: false,
        rating: 4.9,
        reviews: 287
    },
    {
        id: 10,
        name: 'Пустышка Philips Avent соска-пустышка 0-6 мес.',
        category: 'Детские товары',
        price: 380,
        oldPrice: null,
        discount: 0,
        manufacturer: 'Philips, Нидерланды',
        inStock: true,
        stockCount: 67,
        prescription: false,
        isNew: false,
        rating: 4.4,
        reviews: 145
    },
    {
        id: 11,
        name: 'Глюкометр Accu-Chek Active с тест-полосками',
        category: 'Медицинские изделия',
        price: 1200,
        oldPrice: 1450,
        discount: 17,
        manufacturer: 'Roche, Швейцария',
        inStock: true,
        stockCount: 23,
        prescription: false,
        isNew: false,
        rating: 4.9,
        reviews: 312
    },
    {
        id: 12,
        name: 'Но-шпа таблетки 40 мг, 24 шт.',
        category: 'Лекарства',
        price: 220,
        oldPrice: 260,
        discount: 15,
        manufacturer: 'Sanofi, Франция',
        inStock: true,
        stockCount: 89,
        prescription: false,
        isNew: false,
        rating: 4.6,
        reviews: 178
    }
];

function initCatalog() {
    currentState.products = productData;
    currentState.filteredProducts = [...productData];
    renderProducts();
    setupEventListeners();
    updateStats();
}

function filterProducts() {
    let result = [...currentState.products];
    const filters = currentState.activeFilters;

    if (filters.category !== 'all') {
        result = result.filter(p => p.category === filters.category);
    }

    if (filters.priceMin !== null) {
        result = result.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax !== null) {
        result = result.filter(p => p.price <= filters.priceMax);
    }

    if (filters.stock === 'available') {
        result = result.filter(p => p.inStock && p.stockCount > 0);
    } else if (filters.stock === 'low') {
        result = result.filter(p => p.inStock && p.stockCount <= 10);
    } else if (filters.stock === 'out') {
        result = result.filter(p => !p.inStock || p.stockCount === 0);
    }

    if (filters.prescription === 'required') {
        result = result.filter(p => p.prescription === true);
    } else if (filters.prescription === 'otc') {
        result = result.filter(p => p.prescription === false);
    }

    if (filters.manufacturer !== 'all') {
        result = result.filter(p => p.manufacturer.includes(filters.manufacturer));
    }

    currentState.filteredProducts = sortProducts(result);
    currentState.currentPage = 1;
    renderProducts();
    updateStats();
}

function sortProducts(products) {
    const sortBy = currentState.sortBy;
    const sorted = [...products];

    switch (sortBy) {
        case 'popular':
            sorted.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
            break;
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'new':
            sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        case 'discount':
            sorted.sort((a, b) => b.discount - a.discount);
            break;
        default:
            break;
    }

    return sorted;
}

function renderProducts() {
    const container = document.querySelector('.products-grid-view');
    if (!container) return;

    const start = (currentState.currentPage - 1) * CATALOG_CONFIG.itemsPerPage;
    const end = start + CATALOG_CONFIG.itemsPerPage;
    const pageProducts = currentState.filteredProducts.slice(start, end);

    if (pageProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <span style="font-size: 4rem;">🔍</span>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
            </div>
        `;
        renderPagination();
        return;
    }

    container.innerHTML = pageProducts.map(product => {
        const badgeHtml = product.discount > 0 
            ? `<div class="product-badge">Акция -${product.discount}%</div>`
            : product.isNew 
                ? `<div class="product-badge">Новинка</div>`
                : product.prescription 
                    ? `<div class="product-badge prescription">По рецепту</div>`
                    : '';

        const oldPriceHtml = product.oldPrice 
            ? `<span class="old-price">${product.oldPrice} ₽</span>`
            : '';

        const discountHtml = product.discount > 0
            ? `<span class="discount">-${product.discount}%</span>`
            : '';

        const stockStatus = product.inStock && product.stockCount > 0
            ? product.stockCount <= 10
                ? `<span class="stock-low">⚠ Осталось мало</span>`
                : `<span class="stock-available">✓ В наличии</span>`
            : `<span class="stock-out">✗ Нет в наличии</span>`;

        const actionButton = product.inStock && product.stockCount > 0
            ? `<button class="btn-add-to-cart" data-id="${product.id}">
                <span>🛒</span> В корзину
              </button>`
            : `<button class="btn-add-to-cart" disabled data-id="${product.id}">
                <span>🔔</span> Уведомить
              </button>`;

        return `
            <div class="product-card" data-id="${product.id}">
                ${badgeHtml}
                <div class="product-image">
                    <span style="font-size: 3rem;">${getProductIcon(product.category)}</span>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-manufacturer">${product.manufacturer}</span>
                    <div class="product-price">
                        <span class="current-price">${product.price} ₽</span>
                        ${oldPriceHtml}
                        ${discountHtml}
                    </div>
                    <div class="product-stock">
                        ${stockStatus}
                        <span>• ${product.stockCount} шт.</span>
                    </div>
                    <div class="product-actions">
                        ${actionButton}
                        <button class="btn-favorite" data-id="${product.id}">♥</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    renderPagination();
}

function getProductIcon(category) {
    const icons = {
        'Лекарства': '💊',
        'Витамины и БАДы': '🌿',
        'Косметика': '🧴',
        'Детские товары': '👶',
        'Медицинские изделия': '🩺',
        'Средства гигиены': '🧼',
        'Диабетические товары': '🩸'
    };
    return icons[category] || '📦';
}

function renderPagination() {
    const container = document.querySelector('.pagination');
    if (!container) return;

    const total = currentState.filteredProducts.length;
    const totalPages = Math.ceil(total / CATALOG_CONFIG.itemsPerPage);

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    const current = currentState.currentPage;

    if (current > 1) {
        html += `<a href="#" class="prev" data-page="${current - 1}">← Назад</a>`;
    }

    const maxVisible = CATALOG_CONFIG.maxVisiblePages;
    let startPage = Math.max(1, current - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        html += `<a href="#" data-page="1">1</a>`;
        if (startPage > 2) {
            html += `<span>...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<a href="#" data-page="${i}" ${i === current ? 'class="current"' : ''}>${i}</a>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span>...</span>`;
        }
        html += `<a href="#" data-page="${totalPages}">${totalPages}</a>`;
    }

    if (current < totalPages) {
        html += `<a href="#" class="next" data-page="${current + 1}">Вперед →</a>`;
    }

    container.innerHTML = html;
}

function updateStats() {
    const stats = document.querySelector('.catalog-stats');
    if (stats) {
        const total = currentState.filteredProducts.length;
        stats.textContent = `Более ${total} товаров в наличии • 200+ аптек по России • Доставка за 24 часа`;
    }

    const results = document.querySelector('.filter-results');
    if (results) {
        results.textContent = `Показано: ${currentState.filteredProducts.length} товаров`;
    }
}

function setupEventListeners() {
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const parent = this.closest('.filter-section');
            if (parent) {
                parent.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            }
            this.classList.add('active');
            handleFilterChange(this);
        });
    });

    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.sort-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            const sortValue = this.textContent.trim();
            const sortMap = {
                'По популярности': 'popular',
                'По возрастанию цены': 'price-asc',
                'По убыванию цены': 'price-desc',
                'По названию (А-Я)': 'name',
                'Сначала новинки': 'new',
                'Со скидкой': 'discount'
            };
            currentState.sortBy = sortMap[sortValue] || 'popular';
            filterProducts();
        });
    });

    document.querySelector('.btn-clear-filters')?.addEventListener('click', function() {
        clearAllFilters();
    });

    document.querySelectorAll('.price-input input').forEach(input => {
        input.addEventListener('change', function() {
            const min = document.querySelector('.price-input input[placeholder="От"]');
            const max = document.querySelector('.price-input input[placeholder="До"]');
            currentState.activeFilters.priceMin = min && min.value ? parseFloat(min.value) : null;
            currentState.activeFilters.priceMax = max && max.value ? parseFloat(max.value) : null;
            filterProducts();
        });
    });

    document.querySelector('.view-toggle')?.addEventListener('click', function(e) {
        const buttons = this.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        const target = e.target.closest('button');
        if (target) {
            target.classList.add('active');
            const mode = target.title === 'Сетка' ? 'grid' : 'list';
            currentState.viewMode = mode;
            const grid = document.querySelector('.products-grid-view');
            if (grid) {
                grid.className = mode === 'grid' ? 'products-grid-view' : 'products-list-view';
            }
        }
    });

    document.querySelector('.search-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input && input.value.trim().length > 0) {
            const query = input.value.trim().toLowerCase();
            currentState.products = productData.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.manufacturer.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
            filterProducts();
        } else {
            currentState.products = [...productData];
            filterProducts();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-to-cart:not([disabled])')) {
            const btn = e.target.closest('.btn-add-to-cart');
            const productId = parseInt(btn.dataset.id);
            addToCart(productId);
        }

        if (e.target.closest('.btn-favorite')) {
            const btn = e.target.closest('.btn-favorite');
            const productId = parseInt(btn.dataset.id);
            toggleFavorite(productId);
        }

        if (e.target.closest('.pagination a')) {
            e.preventDefault();
            const link = e.target.closest('.pagination a');
            const page = parseInt(link.dataset.page);
            if (page && page !== currentState.currentPage) {
                currentState.currentPage = page;
                renderProducts();
                window.scrollTo({ top: document.querySelector('.catalog-header').offsetTop - 100, behavior: 'smooth' });
            }
        }
    });
}

function handleFilterChange(element) {
    const text = element.textContent.trim();
    const section = element.closest('.filter-section');
    
    if (!section) return;

    const sectionTitle = section.querySelector('h3')?.textContent.trim() || '';

    switch (sectionTitle) {
        case 'Категории':
            if (text === 'Все категории') {
                currentState.activeFilters.category = 'all';
            } else {
                currentState.activeFilters.category = text;
            }
            break;
        case 'Наличие':
            const stockMap = {
                'В наличии': 'available',
                'Под заказ': 'low',
                'С доставкой': 'out'
            };
            currentState.activeFilters.stock = stockMap[text] || 'all';
            break;
        case 'Рецепт':
            const prescriptionMap = {
                'Без рецепта': 'otc',
                'По рецепту': 'required'
            };
            currentState.activeFilters.prescription = prescriptionMap[text] || 'all';
            break;
        case 'Производитель':
            if (text === 'Все') {
                currentState.activeFilters.manufacturer = 'all';
            } else {
                currentState.activeFilters.manufacturer = text;
            }
            break;
        default:
            break;
    }

    filterProducts();
}

function clearAllFilters() {
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('active');
        if (tag.textContent.trim() === 'Все категории' || tag.textContent.trim() === 'В наличии') {
            tag.classList.add('active');
        }
    });

    document.querySelectorAll('.price-input input').forEach(input => {
        input.value = '';
    });

    currentState.activeFilters = {
        category: 'all',
        priceMin: null,
        priceMax: null,
        stock: 'all',
        prescription: 'all',
        manufacturer: 'all'
    };

    currentState.products = [...productData];
    filterProducts();
}

function addToCart(productId) {
    const product = productData.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    let cart = JSON.parse(localStorage.getItem('cbi_cart') || '[]');
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: getProductIcon(product.category)
        });
    }

    localStorage.setItem('cbi_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`✅ ${product.name} добавлен в корзину`);
}

function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('cbi_favorites') || '[]');
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('♡ Удалено из избранного');
    } else {
        favorites.push(productId);
        showNotification('♥ Добавлено в избранное');
    }
    
    localStorage.setItem('cbi_favorites', JSON.stringify(favorites));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cbi_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function showNotification(message) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c7a4d;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        max-width: 400px;
        cursor: pointer;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);

    toast.addEventListener('click', () => {
        toast.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .products-list-view {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .products-list-view .product-card {
            display: flex;
            flex-direction: row;
            padding: 20px;
        }
        .products-list-view .product-card .product-image {
            width: 120px;
            height: 120px;
            margin-right: 20px;
            flex-shrink: 0;
        }
        .products-list-view .product-card .product-info {
            flex: 1;
        }
        .no-products {
            text-align: center;
            padding: 60px 20px;
            background: #f8f9fa;
            border-radius: 12px;
            grid-column: 1 / -1;
        }
        .no-products h3 {
            margin: 16px 0 8px;
            font-size: 20px;
            color: #333;
        }
        .no-products p {
            color: #666;
            font-size: 14px;
        }
        .notification-toast {
            animation: slideInUp 0.3s ease;
        }
        .product-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            background: #e53935;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 2;
        }
        .product-badge.prescription {
            background: #f57c00;
        }
        .product-card {
            position: relative;
        }
    `;
    document.head.appendChild(style);
    
    initCatalog();
    updateCartCount();
});
