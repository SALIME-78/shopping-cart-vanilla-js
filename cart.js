let cart = JSON.parse(localStorage.getItem("cart")) || [];

clearCartBtn = document.getElementById("clear-cart");

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
  const cartContainer = document.getElementById("cartContainer");
  const totalCartPrice = document.getElementById("total-price");
  const checkOut = document.getElementById('checkout')
  // Vider le contenu du panier
  cartContainer.innerHTML = "";

  let total = 0;

  if (cart == [] || cart.length < 1 || cart == null) {
    clearCartBtn.style.display = "none";
    totalCartPrice.style.display = "none"
    checkOut.style.display = "none"

    noItemInCart = document.createElement('div')
    cartContainer.appendChild(noItemInCart)
    noItemInCart.classList.add('mt-5', 'pt-5')
    noItemInCart.innerHTML = `<h5 class="text-center">No Item In The Cart</h5>`

  }

  // Browse products in cart
  cart.forEach((item) => {
    const productTotal = item.price * item.quantity;
    total += productTotal;

    // create html elements to display items in cart
    const productElement = document.createElement("div");
    productElement.classList.add("product-in-cart");
    
    productElement.innerHTML = `
        <div class="d-flex justify-content-center align-items-center w-100 mt-5">
          <div class="d-flex align-items-center me-5">
             <img class="me-5" src="${item.imageUrl}" style="height: 80px; width: 80px">
             <p class="my-0">Prix: $${item.price}</p>
          </div>
          <div>
             <span onclick="decreaseQuantity(${item.id})"><i class="fa-regular fa-square-minus" style="color: #d8ae18;cursor:pointer;font-size:26px"></i></span>
             <span class="mx-2">${item.quantity}</span>
             <span onclick="increaseQuantity(${item.id})"><i class="fa-regular fa-square-plus" style="color: #4e7f34;cursor:pointer;font-size:26px"></i></span>
             </div>
             <p id="prix-total" class="mx-5 my-0">Prix total: $${productTotal}</p>
             <span onclick="removeItem(${item.id})"><i class="fa-regular fa-trash-can fw-bold" style="color: #e02e37; font-size: 25px; cursor: pointer"></i></span>
        </div>
      `;

    cartContainer.appendChild(productElement);
    clearCartBtn.innerText = "Clear Cart";
    clearCartBtn.classList.add("btn", "btn-danger");
  });

  // Afficher le prix total des produits ajoutés au panier
  totalCartPrice.innerHTML = `Total To Pay: <strong style="color: #000; font-size: 20px">${total}<sup>$</sup></strong>`;
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

function removeItem(productId) {
  cart.forEach((product) => {
    if (productId == product.id) {
      cart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  });
}

// Appel initial pour mettre à jour l'affichage du panier
updateCart();

function emptyCart() {
  cart = [];

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}
