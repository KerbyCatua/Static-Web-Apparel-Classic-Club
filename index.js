// --- 1. DATA (Extracted from SharedData.bas & Folder Structure) ---
const categoryData = {
    Shirt: {
        categoryImg: "category/card-shirt.png",
        items: [
            { id: 1, name: "Louder by Classic Club", price: 699.00, desc: "Make a bold statement with the Louder oversized tee.", img: "shirt/louder-shirt.png" },
            { id: 2, name: "Outcome by Classic Club", price: 699.00, desc: "Define your style with the Outcome shirt.", img: "shirt/outcome-shirt.png" },
            { id: 3, name: "Lives by Classic Club", price: 699.00, desc: "Level up your wardrobe with the Lives oversized tee.", img: "shirt/lives_shirt.png" },
            { id: 4, name: "Blessed by Classic Club", price: 699.00, desc: "Stay blessed with this classic club original.", img: "shirt/blessed-shirt.png" },
            { id: 5, name: "Built by Classic Club", price: 699.00, desc: "Built tough for the grind.", img: "shirt/built-shirt.png" }
        ]
    },
    Short: {
        categoryImg: "category/card-short.png",
        items: [
            { id: 6, name: "Spurs Mesh Short", price: 699.00, desc: "Breathable Spurs themed mesh shorts.", img: "short/spurs-short.png" },
            { id: 7, name: "Lakers Mesh Short", price: 699.00, desc: "Showtime Lakers themed shorts.", img: "short/lakers-short.png" },
            { id: 8, name: "Wolves Mesh Short", price: 699.00, desc: "Stay cool with Wolves aesthetics.", img: "short/wolves-short.png" },
            { id: 9, name: "Bulls Mesh Short", price: 699.00, desc: "Classic Bulls colorway mesh shorts.", img: "short/bulls1-short.png" },
            { id: 10, name: "Bulls Paisley Sublimation", price: 699.00, desc: "Paisley sublimation design.", img: "short/bulls2-short.png" }
        ]
    },
    Others: {
        categoryImg: "category/card-others.png",
        items: [
            { id: 11, name: "Coin Purse Wallet", price: 85.00, desc: "Store loose change securely.", img: "others/coin-purse.png" },
            { id: 12, name: "Car Sticker", price: 19.99, desc: "Rep the Classic Club on your ride.", img: "others/sticker.jpg" },
            { id: 13, name: "Classic Club Cap", price: 39.99, desc: "Monochrome structured fit cap.", img: "others/classic-club-cap.png" },
            { id: 14, name: "Classic Club Bottle", price: 34.99, desc: "Stay hydrated with Classic Club.", img: "others/classic-club-bottle.png" },
            { id: 15, name: "Classic Club Travel Bag", price: 119.99, desc: "Perfect for the gym or weekend trips.", img: "others/classic-club-travel-bag.png" },
            { id: 16, name: "Keychain", price: 25.00, desc: "Classic Club Keychain.", img: "others/keychain.jpg" }
        ]
    }
};

let currentCart = [];

// --- 2. DYNAMIC BACKGROUND LOGIC ---
const landingBGs = [
    'url("https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=1920")', 
    'url("https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1920")',
    'url("https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1920")'
];
let currentBgIdx = 0;

function rotateBackground() {
    const bgElement = document.getElementById('landing-bg');
    if(bgElement) {
        bgElement.style.backgroundImage = landingBGs[currentBgIdx];
        currentBgIdx = (currentBgIdx + 1) % landingBGs.length;
    }
}
// Start rotation every 3s
rotateBackground();
setInterval(rotateBackground, 3000);

// --- 3. SPA ROUTING ---
function navigate(viewId) {
    // Hide all views
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

    // Toggle Navbar
    const nav = document.getElementById('main-nav');
    if(['landing-view', 'login-view', 'register-view'].includes(viewId)) {
        nav.classList.add('d-none');
    } else {
        nav.classList.remove('d-none');
    }

    // Load data
    if(viewId === 'home-view') renderCategories();
    if(viewId === 'cart-view') renderCart();
}

// --- 4. RENDER CATEGORIES ---
function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    Object.keys(categoryData).forEach(cat => {
        const catInfo = categoryData[cat];
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        col.innerHTML = `
            <div class="category-card p-0 text-center rounded-0 overflow-hidden" onclick="loadCategory('${cat}')">
                <img src="assets/images/${catInfo.categoryImg}" class="w-100 object-fit-cover" style="height: 250px; opacity: 0.8; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.8" onerror="this.src='https://placehold.co/600x400/1a1a1a/ffffff?text=${cat}'">
                <div class="p-3">
                    <h3 class="font-playfair text-light mb-3">${cat.toUpperCase()}</h3>
                    <button class="btn btn-outline-light rounded-0 w-100 font-monospace">VIEW COLLECTION ❯</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// --- 5. RENDER PRODUCTS IN A CATEGORY ---
function loadCategory(categoryName) {
    document.getElementById('category-title').innerText = categoryName;
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    categoryData[categoryName].items.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        
        // Dynamically path to the image using the defined string
        const imagePath = `assets/images/${prod.img}`;
        
        col.innerHTML = `
            <div class="product-card rounded-0 h-100 d-flex flex-column bg-dark border-secondary">
                <img src="${imagePath}" alt="${prod.name}" class="product-img w-100 object-fit-cover" style="height: 300px;" onerror="this.src='https://placehold.co/400x500/1a1a1a/ffffff?text=Image+Missing'">
                <div class="p-3 d-flex flex-column flex-grow-1">
                    <h5 class="font-playfair fs-6 mb-2 fw-bold text-light">${prod.name}</h5>
                    <p class="text-muted small mb-3 flex-grow-1">${prod.desc}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="font-monospace fw-bold text-light">₱${prod.price.toFixed(2)}</span>
                        <button class="btn btn-sm btn-light rounded-0 fw-bold" onclick="addToCart(${prod.id}, '${prod.name}', ${prod.price})">ADD ＋</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    
    navigate('products-view');
}

// --- 6. CART LOGIC ---
function addToCart(id, name, price) {
    currentCart.push({ id, name, price });
    document.getElementById('cart-count').innerText = currentCart.length;
    alert(`${name} added to cart!`);
}

function removeFromCart(index) {
    currentCart.splice(index, 1);
    document.getElementById('cart-count').innerText = currentCart.length;
    renderCart(); // re-render HTML
}

function renderCart() {
    const list = document.getElementById('cart-items-container');
    list.innerHTML = '';
    
    let subtotal = 0;

    if(currentCart.length === 0) {
        list.innerHTML = '<li class="list-group-item text-center py-4 text-muted font-playfair bg-transparent text-light border-secondary">Your cart is empty.</li>';
    } else {
        currentCart.forEach((item, index) => {
            subtotal += item.price;
            list.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-0 bg-transparent text-light border-secondary">
                    <div>
                        <h6 class="my-0 font-playfair">${item.name}</h6>
                        <small class="text-muted font-monospace">₱${item.price.toFixed(2)}</small>
                    </div>
                    <button class="btn btn-outline-danger btn-sm rounded-0 px-3" onclick="removeFromCart(${index})">✕</button>
                </li>
            `;
        });
    }

    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').innerText = `₱${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').innerText = `₱${tax.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₱${total.toFixed(2)}`;
}

function checkout() {
    if(currentCart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Order Confirmed! Thank you for purchasing from Classic Club.");
    currentCart = [];
    document.getElementById('cart-count').innerText = '0';
    navigate('home-view');
}