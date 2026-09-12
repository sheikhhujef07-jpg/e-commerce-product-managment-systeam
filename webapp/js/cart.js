let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");

async function loadCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0";
    return;
  }

  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    const cartProducts = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);

    displayCart(cartProducts);
  } catch (error) {
    cartContainer.innerHTML = "<p>Unable to load cart.</p>";
    console.error(error);
  }
}

function displayCart(cartProducts) {
  cartContainer.innerHTML = "";
  let total = 0;

  cartProducts.forEach((product) => {
    const itemTotal = Number(product.price) * product.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${product.image || "https://via.placeholder.com/120?text=Product"}" alt="${product.name}">
      <div class="cart-info">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <div class="quantity">
          <button onclick="changeQuantity(${product.id}, -1)">-</button>
          <span>${product.quantity}</span>
          <button onclick="changeQuantity(${product.id}, 1)">+</button>
        </div>
        <p>Subtotal: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(productId, change) {
  const item = cart.find((entry) => entry.productId === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart = cart.filter((entry) => entry.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeFromCart(productId) {
  cart = cart.filter((entry) => entry.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Your cart is empty.");
  if (!localStorage.getItem("token")) {
    alert("Please login before placing an order.");
    window.location.href = "login.html";
    return;
  }
  window.location.href = "checkout.html";
});

loadCart();
