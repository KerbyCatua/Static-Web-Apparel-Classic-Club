// DATA
const categoryData = {
    Shirts: { 
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

// SPA ROUTING
function navigate(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('d-none');
        section.classList.remove('active');
    });
    
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.remove('d-none');
        target.classList.add('active');
    }

    const nav = document.getElementById('main-nav');
    const footer = document.getElementById('main-footer');
    
    if(['landing-view', 'login-view', 'register-view'].includes(viewId)) {
        nav.classList.add('d-none');
        footer.classList.add('d-none');
    } else {
        nav.classList.remove('d-none');
        footer.classList.remove('d-none');
    }

    window.scrollTo(0, 0);

    // Load Data
    if(viewId === 'home-view') renderCategories();
    if(viewId === 'cart-view') renderCart();
}

// RENDER COLLECTIONS
function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    Object.keys(categoryData).forEach(cat => {
        const catInfo = categoryData[cat];
        const col = document.createElement('div');
        col.className = 'col-12 col-md-4';
        
        col.innerHTML = `
            <div class="collection-card mx-auto" style="width: 85%;" onclick="loadCategory('${cat}')">
                 <img src="assets/images/${catInfo.categoryImg}" class="collection-img" alt="${cat}" 
                      onerror="this.src='https://placehold.co/600x800/f4f5f7/000000?text=${cat}'">
                 
                 <div class="collection-overlay position-absolute top-0 start-0 w-100 h-100"></div>

                 <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-4" style="z-index: 2; pointer-events: none;">
                     <h2 class="category-title fw-black text-uppercase m-0 fs-1">${cat}</h2>
                 </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// RENDER PRODUCTS GRID
function loadCategory(categoryName) {
    document.getElementById('category-title').innerText = categoryName;
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    categoryData[categoryName].items.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'col-6 col-lg-3';
        
        const imagePath = `assets/images/${prod.img}`;
        
        col.innerHTML = `
            <div class="product-item">
                <div class="product-img-wrapper mb-3">
                    <img src="${imagePath}" alt="${prod.name}" class="product-img" onerror="this.src='https://placehold.co/400x400/f4f5f7/000000?text=No+Image'">
                    <div class="product-overlay">
                        <button class="btn btn-dark rounded-0 px-4 py-2 text-uppercase fw-bold shadow-sm" 
                                onclick="addToCart(${prod.id}, '${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${imagePath}'); event.stopPropagation();">
                            Add to Bag
                        </button>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <h6 class="product-title fw-bold text-uppercase m-0 text-truncate" title="${prod.name}">${prod.name}</h6>
                    <span class="text-muted mt-1">₱${prod.price.toFixed(2)}</span>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    
    navigate('products-view');
}

// CART QUANTITY & LOGIC
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
    
    const btn = event.currentTarget;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.classList.replace('btn-dark', 'btn-success');
    setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.replace('btn-success', 'btn-dark');
    }, 1000);
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
        list.innerHTML = '<tr><td colspan="3" class="text-center py-5 text-muted fs-5">Your bag is empty.</td></tr>';
    } else {
        currentCart.forEach((item) => {
            let itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            list.innerHTML += `
                <tr>
                    <td class="py-4 pe-2 pe-md-4 w-50 border-bottom">
                        <div class="d-flex align-items-center gap-3 gap-md-4">
                            <div class="cart-img-wrapper flex-shrink-0">
                                <img src="${item.img}" onerror="this.style.display='none'">
                            </div>
                            <div>
                                <h6 class="fw-bold text-uppercase mb-1" style="font-size: 0.85rem;">${item.name}</h6>
                                <p class="text-muted m-0 mb-2 small">₱${item.price.toFixed(2)}</p>
                                <button class="remove-btn" onclick="changeQty(${item.id}, -${item.qty})">Remove</button>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 text-center align-middle border-bottom">
                        <div class="qty-control mx-auto">
                            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">–</button>
                            <span class="px-3 fw-bold" style="font-size: 0.9rem;">${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </td>
                    <td class="py-4 text-end fw-bold align-middle border-bottom">₱${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });
    }

    const shipping = subtotal * 0.12;
    const total = subtotal + shipping;

    document.getElementById('cart-subtotal').innerText = `₱${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').innerText = `₱${shipping.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₱${total.toFixed(2)}`;
}

function checkout() {
    if(currentCart.length === 0) {
        alert("Your bag is empty.");
        return;
    }
    alert("Order Confirmed. Thank you for shopping with Classic Club.");
    currentCart = [];
    updateBadge();
    navigate('home-view');
}

// IMAGE SLIDESHOW LOGIC
function startSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if(slides.length === 0) return;
    
    let currentIdx = 0;
    setInterval(() => {
        slides[currentIdx].classList.remove('active');
        currentIdx = (currentIdx + 1) % slides.length;
        slides[currentIdx].classList.add('active');
    }, 3500);
}

// Start slideshow after DOM loads
document.addEventListener('DOMContentLoaded', startSlideshow);