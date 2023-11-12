/*// Liste des produits
const products = [
  { id: 1, title: "Produit 1", price: 10 },
  { id: 2, title: "Produit 2", price: 20 },
  { id: 3, title: "Produit 3", price: 30 },
  { id: 4, title: "Produit 4", price: 40 },
];

// Récupérer le panier depuis le local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
  // Vérifier si le produit est déjà dans le panier
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    // Trouver le produit dans la liste des produits
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  // Désactiver le bouton d'ajout au panier
  const addButton = document.getElementById(`addButton-${productId}`);
  if (addButton) {
    addButton.disabled = true;
  }

  // Mettre à jour le panier dans le local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour l'affichage du panier
  updateCart();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
  const cartContainer = document.getElementById("cartContainer");
  const totalCartPrice = document.getElementById("totalPrice");

  // Vider le contenu du panier
  cartContainer.innerHTML = "";

  let total = 0;

  // Parcourir les produits dans le panier
  cart.forEach((item) => {
    const productTotal = item.price * item.quantity;
    total += productTotal;

    // Créer les éléments HTML pour afficher le produit dans le panier
    const productElement = document.createElement("div");
    productElement.classList.add("product-in-cart");


    const productNameElement = document.createElement("span");
    productNameElement.textContent = item.title;

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(item.id));

    const quantityElement = document.createElement("span");
    quantityElement.textContent = item.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(item.id));

    const productTotalElement = document.createElement("span");
    productTotalElement.textContent = `Total : $${productTotal}`;

    // Ajouter les éléments au conteneur du panier
    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityElement);
    quantityContainer.appendChild(increaseButton);

    productElement.appendChild(productNameElement);
    productElement.appendChild(quantityContainer);
    productElement.appendChild(productTotalElement);

    cartContainer.appendChild(productElement);
  });

  // Mettre à jour le prix total
  totalCartPrice.textContent = `Prix total : $${total.toFixed(2)}`;
}

// Fonction pour diminuer la quantité d'un produit dans le panier
function decreaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      // Supprimer le produit du panier s'il n'y en a qu'un
      cart = cart.filter((item) => item.id !== productId);

      // Réactiver le bouton d'ajout au panier
      const addButton = document.getElementById(`addButton-${productId}`);
      if (addButton) {
        addButton.disabled = false;
      }
    }

    // Mettre à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCart();
  }
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function increaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;

    // Mettre à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCart();
  }
}

// Mettre à jour l'affichage initial du panier
updateCart();
*/


// Une deuxième Méthode

/* // Liste des produits
const products = [
  { id: 1, title: "Produit 1", price: 10 },
  { id: 2, title: "Produit 2", price: 20 },
  { id: 3, title: "Produit 3", price: 30 },
  { id: 4, title: "Produit 4", price: 40 },
];

// Récupérer le panier depuis le local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
  // Vérifier si le produit est déjà dans le panier
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    // Trouver le produit dans la liste des produits
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  // Désactiver le bouton d'ajout au panier
  const addButton = document.getElementById(`addButton-${productId}`);
  if (addButton) {
    addButton.disabled = true;
  }

  // Mettre à jour le panier dans le local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour l'affichage du panier
  updateCart();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
  const cartContainer = document.getElementById("cartContainer");
  const totalCartPrice = document.getElementById("totalPrice");

  // Vider le contenu du panier
  cartContainer.innerHTML = "";

  let total = 0;

  // Parcourir les produits dans le panier
  cart.forEach((item) => {
    const productTotal = item.price * item.quantity;
    total += productTotal;

    // Créer les éléments HTML pour afficher le produit dans le panier
    const productElement = document.createElement("div");
    productElement.classList.add("product-in-cart");
    productElement.innerHTML = `
      <h3>${item.title}</h3>
      <p>Prix: $${item.price}</p>
      <div>
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${item.id})">+</button>
      </div>
      <p>Prix total: $${productTotal}</p>
    `;

    cartContainer.appendChild(productElement);
  });

  // Afficher le prix total des produits ajoutés au panier
  totalCartPrice.innerHTML = `Prix total: $${total}`;
}

// Fonction pour diminuer la quantité d'un produit dans le panier
function decreaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      // Supprimer le produit du panier s'il n'y en a qu'un
      cart = cart.filter((item) => item.id !== productId);

      // Réactiver le bouton d'ajout au panier
      const addButton = document.getElementById(`addButton-${productId}`);
      if (addButton) {
        addButton.disabled = false;
      }
    }

    // Mettre à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCart();
  }
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function increaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;

    // Mettre à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCart();
  }
}

// Appel initial pour mettre à jour l'affichage du panier
updateCart(); */

// Liste des produits
const products = [
  { id: 1, title: "Produit 1", price: 10 },
  { id: 2, title: "Produit 2", price: 20 },
  { id: 3, title: "Produit 3", price: 30 },
  { id: 4, title: "Produit 4", price: 40 },
];

// Récupérer le panier depuis le local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let navItem = document.getElementById('nav-item')

let bag = document.getElementById('bag')

bag.textContent = `${cart.length}`

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
  const addButton = document.getElementById(`addButton-${productId}`);
  // Vérifier si le produit est déjà dans le panier
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    alert('Product Already In Cart')
    return 
  } else {
    // Trouver le produit dans la liste des produits
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
      bag.textContent = `${cart.length}`

    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  
}


