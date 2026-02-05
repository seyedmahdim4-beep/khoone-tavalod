// داده‌های محصولات
const productsData = [
    {
        id: 1,
        name: "ست دکوراسیون پرنسسی",
        category: "theme",
        price: 350000,
        description: "دکوراسیون کامل با تم پرنسسی شامل تاج، روتختی و تزئینات",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "پرفروش"
    },
    {
        id: 2,
        name: "بادکنک‌های طلایی",
        category: "decor",
        price: 75000,
        description: "مجموعه ۲۴ عددی بادکنک طلایی درخشان برای تزئینات",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "جدید"
    },
    {
        id: 3,
        name: "ظروف یکبار مصرف طرحدار",
        category: "tableware",
        price: 120000,
        description: "ست کامل ظروف یکبار مصرف با طرح‌های شاد و رنگارنگ",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: ""
    },
    {
        id: 4,
        name: "تاج تولد الماس‌نما",
        category: "accessory",
        price: 45000,
        description: "تاج زیبای تولد با سنگ‌های الماس‌نما برای عروسک جشن",
        image: "/assets/taj.jpg",
        badge: "ویژه"
    },
    {
        id: 5,
        name: "تم سوپر هیرو",
        category: "theme",
        price: 420000,
        description: "دکوراسیون کامل تم سوپر هیرو برای پسران",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: ""
    },
    {
        id: 6,
        name: "شمع‌های عددی",
        category: "accessory",
        price: 35000,
        description: "شمع‌های عددی از ۰ تا ۹ برای کیک تولد",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "پرفروش"
    },
    {
        id: 7,
        name: "رومیزی جشن",
        category: "tableware",
        price: 85000,
        description: "رومیزی پلاستیکی با طرح‌های شاد تولد",
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: ""
    },
    {
        id: 8,
        name: "ست نورپردازی جشن",
        category: "decor",
        price: 180000,
        description: "مجموعه چراغ‌های رنگی برای نورپردازی جشن",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "جدید"
    },

];

// سبد خرید
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// المنت‌های DOM
const productsContainer = document.getElementById('productsContainer');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const bakeryNameInput = document.getElementById('bakeryName');
const bakeryAddressInput = document.getElementById('bakeryAddress');
const bakeryInfoForm = document.getElementById('bakeryInfoForm');

// بررسی حالت دارک مود از localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// تغییر حالت دارک/لایت مود
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    if (isDarkMode) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'false');
    }
}

// نمایش محصولات با فیلتر و جستجو
function displayProducts(filter = 'all', searchQuery = '') {
    productsContainer.innerHTML = '';

    let filteredProducts = productsData;

    // اعمال فیلتر دسته‌بندی
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filter);
    }

    // اعمال جستجو
    if (searchQuery.trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>محصولی یافت نشد</h3>
                        <p>متأسفانه هیچ محصولی مطابق با جستجوی شما پیدا نشد.</p>
                    </div>
                `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="product-price">
                            <span class="price">${product.price.toLocaleString()} تومان</span>
                            <button class="add-to-cart" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> افزودن
                            </button>
                        </div>
                    </div>
                `;
        productsContainer.appendChild(productCard);
    });

    // افزودن رویداد به دکمه‌های اضافه به سبد خرید
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        });
    });
}

// افزودن به سبد خرید
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`"${product.name}" به سبد خرید اضافه شد!`);
}

// به‌روزرسانی سبد خرید
function updateCart() {
    // ذخیره در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // به‌روزرسانی تعداد
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // نمایش یا پنهان کردن فرم اطلاعات قنادی
    if (cart.length > 0) {
        bakeryInfoForm.style.display = 'block';
    } else {
        bakeryInfoForm.style.display = 'none';
    }

    // به‌روزرسانی آیتم‌ها
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-color); opacity: 0.7;">سبد خرید شما خالی است</p>';
        cartTotal.textContent = '0 تومان';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">${item.price.toLocaleString()} تومان</p>
                        <div class="cart-item-controls">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="cart-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">حذف</button>
                        </div>
                    </div>
                `;
        cartItems.appendChild(cartItem);
    });

    // به‌روزرسانی جمع کل
    cartTotal.textContent = `${totalPrice.toLocaleString()} تومان`;

    // افزودن رویداد به دکمه‌های کنترل مقدار
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, -1);
        });
    });

    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// به‌روزرسانی مقدار آیتم در سبد خرید
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }

        updateCart();
    }
}

// حذف از سبد خرید
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('محصول از سبد خرید حذف شد');
}

// نمایش نوتیفیکیشن
function showNotification(message) {
    // ایجاد عنصر نوتیفیکیشن
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--accent);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: var(--shadow);
                z-index: 1002;
                animation: slideIn 0.3s ease;
                font-weight: 500;
            `;

    // اضافه کردن استایل انیمیشن
    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
    document.head.appendChild(style);

    notification.textContent = message;
    document.body.appendChild(notification);

    // حذف نوتیفیکیشن بعد از 3 ثانیه
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// فیلتر کردن محصولات
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // حذف کلاس active از همه دکمه‌ها
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // اضافه کردن کلاس active به دکمه کلیک شده
        button.classList.add('active');

        const filter = button.dataset.filter;
        const searchQuery = searchInput.value;
        displayProducts(filter, searchQuery);
    });
});

// جستجوی محصولات
function handleSearch() {
    const searchQuery = searchInput.value;
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    if (searchQuery.trim() !== '') {
        clearSearch.classList.add('show');
    } else {
        clearSearch.classList.remove('show');
    }

    displayProducts(activeFilter, searchQuery);
}

// پاک کردن جستجو
function clearSearchInput() {
    searchInput.value = '';
    clearSearch.classList.remove('show');
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    displayProducts(activeFilter, '');
}

// اسکرول به بخش محصولات
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// رویدادهای سبد خرید
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

clearCartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!');
        return;
    }

    if (confirm('آیا از پاک کردن سبد خرید مطمئن هستید؟')) {
        cart = [];
        updateCart();
        showNotification('سبد خرید پاک شد');
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!');
        return;
    }

    // بررسی اطلاعات قنادی
    const bakeryName = bakeryNameInput.value.trim();
    const bakeryAddress = bakeryAddressInput.value.trim();

    if (!bakeryName || !bakeryAddress) {
        showNotification('لطفاً اطلاعات قنادی را کامل کنید');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderSummary = cart.map(item =>
        `• ${item.name} (${item.quantity} عدد) - ${(item.price * item.quantity).toLocaleString()} تومان`
    ).join('\n');

    alert(`✅ سفارش شما با موفقیت ثبت شد!\n\n📋 اطلاعات سفارش:\n${orderSummary}\n\n🏪 اطلاعات قنادی:\nنام: ${bakeryName}\nآدرس: ${bakeryAddress}\n\n💰 مجموع مبلغ: ${totalPrice.toLocaleString()} تومان\n\nسفارش شما در اسرع وقت آماده خواهد شد.`);

    // پاک کردن فرم
    bakeryNameInput.value = '';
    bakeryAddressInput.value = '';

    cart = [];
    updateCart();
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
    // مقداردهی دارک مود
    initDarkMode();

    // نمایش محصولات
    displayProducts();
    updateCart();

    // رویداد تغییر تم
    themeToggle.addEventListener('click', toggleDarkMode);

    // رویداد جستجو
    searchInput.addEventListener('input', handleSearch);
    clearSearch.addEventListener('click', clearSearchInput);

    // اسکرول نرم برای لینک‌ها
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});