const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
let products = [];

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML = "<p>Unable to load products. Check the server and database.</p>";
    console.error(error);
  }
}

function displayProducts(productList) {
  if (productList.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productContainer.innerHTML = "";
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    const image = product.image || "https://via.placeholder.com/300?text=Product";

    card.innerHTML = `
      <img src="${image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">₹${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    displayProducts(products.filter((product) =>
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    ));
  });
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((entry) => entry.productId === productId);

  if (item) item.quantity += 1;
  else cart.push({ productId, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

loadProducts();
