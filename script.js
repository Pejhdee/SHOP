let products = [
    {
        id: 1,
        description: "BetaFPV Aquila20",
        price: 15400,
        photo: "fpv_drones/product_1.png"
    },
    {
        id: 2,
        description: "X226",
        price: 4500,
        photo: "fpv_drones/product_2.png"
    },
    {
        id: 3,
        description: "DJI Mini 3 Fly More Combo",
        price: 36000,
        photo: "fpv_drones/product_3.png"
    },
    {
        id: 4,
        description: "BETAFPV Aquila16 ELRS (2023)",
        price: 6620,
        photo: "fpv_drones/product_4.png"
    },
    {
        id: 5,
        description: "L300 Ultra Max",
        price: 6500,
        photo: "fpv_drones/product_5.png"
    },
    {
        id: 6,
        description: "SJY XiL017 4K ",
        price: 14000,
        photo: "fpv_drones/product_6.png"
    }
];

let products_2 = [
    { 
        id: 1, 
        description: "Apex HD 7",
        price: 988, 
        photo: "/accessories/product_1.jpg" 
    },
    { 
        id: 2, 
        description: "Emax ECO II 2807A 1300KV",
        price: 480, 
        photo: "/accessories/product_2.png" 
    },
    { 
        id: 3, 
        description: "RushFPV MAX SOLO VTX 2.5W 5.8GHz",
        price: 2880, 
        photo: "/accessories/product_3.png" 
    },
    { 
        id: 4, 
        description: "Foxeer Predator V5 Nano Plug M8",
        price: 2200, 
        photo: "/accessories/product_4.png" 
    },
    { 
        id: 5, 
        description: "SpeedyBee",
        price: 3800, 
        photo: "/accessories/product_5.png" 
    },
    { 
        id: 6, 
        description: "6S2P 10400 mAh",
        price: 4600, 
        photo: "/accessories/product_6.png" 
    }
];

let cart = [];

function renderProducts(productsArray, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    productsArray.forEach(product => {
        let card = document.createElement('div');
        card.className = 'product-card';

        let imgDiv = document.createElement('div');
        imgDiv.className = 'product-img';

        let img = document.createElement('img');
        img.src = product.photo;
        img.alt = product.description;

        imgDiv.appendChild(img);

        let title = document.createElement('h3');
        title.textContent = product.description;

        let price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = product.price.toLocaleString() + ' ₴';

        let button = document.createElement('button');
        button.className = 'product-btn';
        button.textContent = 'В корзину';

        button.addEventListener('click', () => {
            addToCart(product);
        });

        card.append(imgDiv, title, price, button);
        container.appendChild(card);
    });
}

function addToCart(product) {
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
    document.getElementById('cart-container').style.display = 'block';
} 

function renderCart() {
    let cartContainer = document.getElementById('cart-items');
    let total = 0;
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        let title = document.createElement("p");
        title.textContent = item.description + " x" + item.quantity;

        let quantityBlock = document.createElement("div");
        quantityBlock.className = "quantity-block";

        let minusBtn = document.createElement("button");
        minusBtn.textContent = "−";
        minusBtn.className = "minus-btn";

        let quantityText = document.createElement("span");
        quantityText.textContent = item.quantity;

        let plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.className = "plus-btn";

        minusBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(p => p.id !== item.id);
            }
            renderCart();
        });

        plusBtn.addEventListener("click", () => {
            item.quantity += 1;
            renderCart();
        });

        quantityBlock.append(minusBtn, quantityText, plusBtn);

        let price = document.createElement("p");
        let itemTotal = item.price * item.quantity;
        price.textContent = itemTotal.toLocaleString() + " ₴";

        total += itemTotal;

        let removeBtn = document.createElement("button");
        removeBtn.className = "removeBtn";
        removeBtn.textContent = "Видалити";

        removeBtn.addEventListener("click", () => {
            cart = cart.filter(p => p.id !== item.id);
            renderCart();
        });

        cartItem.append(title, price, removeBtn, quantityBlock);
        cartContainer.appendChild(cartItem);
    });

    let totalBlock = document.createElement("div");
    totalBlock.className = "cart-total";
    totalBlock.textContent = "Разом: " + total.toLocaleString() + " ₴";
    cartContainer.appendChild(totalBlock);

    if (cart.length > 0) {
        let orderBtn = document.createElement("button");
        orderBtn.className = "order-btn";
        orderBtn.textContent = "Оформити замовлення";
        orderBtn.addEventListener("click", openOrderForm);
        cartContainer.appendChild(orderBtn);
    }
}

function openOrderForm() {
    document.getElementById('order-modal').style.display = 'block';
}

renderProducts(products, "products-container");
renderProducts(products_2, "products-container_2");

let cartButton = document.querySelector('.cart-button');
if (cartButton) {
    cartButton.addEventListener('click', () => {
        let cartContainer = document.getElementById('cart-container');
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    });
}

let cancelBtn = document.getElementById('order-cancel');
if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        document.getElementById('order-modal').style.display = 'none';
    });
}

let confirmBtn = document.getElementById('order-confirm');
if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let adress = document.getElementById('adress').value;

        if (name && phone && adress) {
            alert('Дякуємо за замовлення, ' + name + '! Ваші товари будуть доставлені за адресою: ' + adress);
            cart = [];
            renderCart();
            document.getElementById('order-modal').style.display = 'none';
        } else {
            alert('Заповніть всі поля форми замовлення!');
        }
    });
}

let cartClosebutton = document.getElementById('cart-close');
if (cartClosebutton) {
    cartClosebutton.addEventListener('click', () => {
        document.getElementById('cart-container').style.display = 'none';
    });
}

console.log(cart);
