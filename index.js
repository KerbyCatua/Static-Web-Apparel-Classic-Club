// --- 1. DATA (Mapping UI exact strings to image paths) ---
const categoryData = {
    Shirts: { // Updated key to match screenshot UI
        categoryImg: "category/card-shirt.webp",
        items: [
            { id: 1, name: "Louder by Classic Club", price: 699.00, img: "shirt/louder-shirt.webp" },
            { id: 2, name: "Outcome by Classic Club", price: 699.00, img: "shirt/outcome-shirt.webp" },
            { id: 3, name: "Lives by Classic Club", price: 699.00, img: "shirt/lives_shirt.webp" },
            { id: 4, name: "Blessed by Classic Club", price: 699.00, img: "shirt/blessed-shirt.webp" },
            { id: 5, name: "Built by Classic Club", price: 699.00, img: "shirt/built-shirt.webp" }
        ]
    },
    Shorts: {
        categoryImg: "category/card-short.webp",
        items: [
            { id: 6, name: "Spurs Mesh Short", price: 699.00, img: "short/spurs-short.webp" },
            { id: 7, name: "Lakers Mesh Short", price: 699.00, img: "short/lakers-short.webp" },
            { id: 8, name: "Wolves Mesh Short", price: 699.00, img: "short/wolves-short.webp" },
            { id: 9, name: "Bulls Mesh Short", price: 699.00, img: "short/bulls1-short.webp" },
            { id: 10, name: "Bulls Paisley Sublimation", price: 699.00, img: "short/bulls2-short.webp" }
        ]
    },
    Others: {
        categoryImg: "category/card-others.webp",
        items: [
            { id: 11, name: "Coin Purse Wallet", price: 85.00, img: "others/coin-purse.webp" },
            { id: 12, name: "Car Sticker", price: 19.99, img: "others/sticker.webp" },
            { id: 13, name: "Classic Club Cap", price: 39.99, img: "others/classic-club-cap.webp" },
            { id: 14, name: "Classic Club Bottle", price: 34.99, img: "others/classic-club-bottle.webp" },
            { id: 15, name: "Classic Club Travel Bag", price: 119.99, img: "others/classic-club-travel-bag.webp" },
            { id: 16, name: "Keychain", price: 25.00, img: "others/keychain.webp" }
        ]
    }
};

let currentCart = [];

// --- 2. SPA ROUTING ---
function navigate(viewId) {
    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('d-none');
        section.classList.remove('active');
    });
    
    // Show target view
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.remove('d-none');
        target.classList.add('active');
    }

    // Toggle Global App Navbar
    const nav = document.getElementById('main-nav');
    if(['landing-view', 'login-view', 'register-view'].includes(viewId)) {
        nav.classList.add('d-none');
    } else {
        nav.classList.remove('d-none');
    }

    // Load data specific to routes
    if(viewId === 'home-view') renderCategories();
    if(viewId === 'cart-view') renderCart();
}

// --- 3. RENDER COLLECTIONS ---
function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    Object.keys(categoryData).forEach(cat => {
        const catInfo = categoryData[cat];
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        // Exact replicate of your Image prototype (Rotated, zoomed, left-anchored)
        col.innerHTML = `
            <div class="collection-card d-flex flex-column h-100 p-0 position-relative" onclick="loadCategory('${cat}')" style="min-height: 420px; overflow: hidden;">
                <!-- Image Container with Rotation & Positioning -->
                <div class="position-absolute w-100 h-100" style="top: 0; left: 0;">
                     <img src="assets/images/${catInfo.categoryImg}" 
                          class="position-absolute" 
                          style="height: 120%; width: auto; left: -45%; top: -15%; transform: rotate(15deg); object-fit: contain; pointer-events: none;" 
                          onerror="this.src='https://placehold.co/400x400/transparent/ffffff?text=${cat}'">
                </div>
                
                <!-- Category Text Pushed to Bottom -->
                <div class="mt-auto px-4 py-3 fw-bold fs-3 text-white pb-4 w-100 text-start position-relative z-1" style="text-shadow: 0px 4px 10px rgba(0,0,0,0.3);">
                    <i class="bi bi-arrow-right-circle"></i> ${cat}
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// --- 4. RENDER PRODUCTS GRID ---
function loadCategory(categoryName) {
    document.getElementById('category-title').innerText = categoryName;
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    categoryData[categoryName].items.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3 mb-4';
        
        const imagePath = `assets/images/${prod.img}`;
        
        // Glassmorphic empty-style Grid Block mimic
        col.innerHTML = `
            <div class="product-card h-100 d-flex flex-column p-0 position-relative">
                <img src="${imagePath}" alt="${prod.name}" class="w-100 h-100 object-fit-cover position-absolute top-0 start-0 z-0" style="opacity: 0.8;" onerror="this.src=''">
                <div class="p-3 d-flex flex-column flex-grow-1 position-relative z-1 h-100 justify-content-end bg-gradient-overlay" style="background: linear-gradient(180deg, transparent 50%, rgba(11, 30, 74, 0.9) 100%);">
                    <h5 class="fs-6 mb-1 fw-bold text-white">${prod.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <span class="fw-bold text-white">₱${prod.price.toFixed(2)}</span>
                        <button class="btn btn-sm btn-light rounded-2 fw-bold text-primary-dark" onclick="addToCart(${prod.id}, '${prod.name}', ${prod.price}, '${imagePath}')">Add <i class="bi bi-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    
    navigate('products-view');
}

// --- 5. CART QUANTITY & LOGIC ---
function updateBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = currentCart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalItems;
    if(totalItems > 0) badge.classList.remove('d-none');
    else badge.classList.add('d-none');
}

function addToCart(id, name, price, img) {
    let existingItem = currentCart.find(item => item.id === id);
    if(existingItem) {
        existingItem.qty++;
    } else {
        currentCart.push({ id, name, price, img, qty: 1 });
    }
    updateBadge();
}

function changeQty(id, delta) {
    let itemIndex = currentCart.findIndex(item => item.id === id);
    if(itemIndex > -1) {
        currentCart[itemIndex].qty += delta;
        if(currentCart[itemIndex].qty <= 0) {
            currentCart.splice(itemIndex, 1);
        }
        updateBadge();
        renderCart(); 
    }
}

function renderCart() {
    const list = document.getElementById('cart-items-container');
    list.innerHTML = '';
    
    let subtotal = 0;

    if(currentCart.length === 0) {
        list.innerHTML = '<tr><td colspan="4" class="text-center py-5 text-white-50 fs-5">Your cart is empty.</td></tr>';
    } else {
        currentCart.forEach((item) => {
            let itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            list.innerHTML += `
                <tr class="cart-item-row">
                    <td class="py-3 px-4 d-flex align-items-center gap-3 w-100">
                        <img src="${item.img}" class="cart-img" onerror="this.style.display='none'">
                        <span class="fw-bold d-none d-sm-block text-truncate" style="max-width: 250px;">${item.name}</span>
                    </td>
                    <td class="py-3 text-center align-middle">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">–</button>
                        <span class="mx-2 fw-semibold fs-5">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </td>
                    <td class="py-3 text-center fw-semibold align-middle">₱${itemTotal.toFixed(2)}</td>
                    <td class="py-3 text-center pe-4 align-middle fs-5">
                        <i class="bi bi-trash text-danger" style="cursor: pointer; transition: 0.2s;" onclick="changeQty(${item.id}, -${item.qty})"></i>
                        <i class="bi bi-check-square ms-2" style="cursor: pointer;"></i>
                    </td>
                </tr>
            `;
        });
    }

    // Exact math required from design: subtotal + 12% = total
    const shipping = subtotal * 0.12;
    const total = subtotal + shipping;

    document.getElementById('cart-subtotal').innerText = `₱${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').innerText = `₱${shipping.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₱${total.toFixed(2)}`;
}

function checkout() {
    if(currentCart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Order Confirmed! Thank you for purchasing from Classic Club.");
    currentCart = [];
    updateBadge();
    navigate('home-view');
}

// --- 6. IMAGE SLIDESHOW LOGIC ---
function startSlideshow() {
    const slides = document.querySelectorAll('.man-slide');
    if(slides.length === 0) return;
    
    let currentIdx = 0;
    setInterval(() => {
        slides[currentIdx].classList.remove('active');
        currentIdx = (currentIdx + 1) % slides.length;
        slides[currentIdx].classList.add('active');
    }, 3000);
}

// Start slideshow after DOM loads
document.addEventListener('DOMContentLoaded', startSlideshow);
