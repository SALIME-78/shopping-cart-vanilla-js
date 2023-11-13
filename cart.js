let cart = JSON.parse(localStorage.getItem("cart")) || [];

clearCartBtn = document.getElementById('clear-cart')

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
    const cartContainer = document.getElementById("cartContainer");
    const totalCartPrice = document.getElementById("total-price");
    // Vider le contenu du panier
    cartContainer.innerHTML = "";
  
    let total = 0;

    if(cart == [] || cart.length < 1 || cart == null){
      clearCartBtn.style.display = 'none'

      cartContainer.innerHTML = `
         <div class="d-flex justify-content-center mt-5"><h3>No Item In The Cart</h3></div>
      `
  }
  
    // Parcourir les produits dans le panier
    cart.forEach((item) => {
      const productTotal = item.price * item.quantity;
      total += productTotal;
  
      // Créer les éléments HTML pour afficher le produit dans le panier
      const productElement = document.createElement("div");
      productElement.classList.add("product-in-cart");
      productElement.innerHTML = `
        <div class="d-flex justify-content-between w-100">
          <h3>${item.title}</h3>
          <p>Prix: $${item.price}</p>
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
          <p id="prix-total mt-4">Prix total: $${productTotal}</p>
          <span onclick="removeItem(${item.id})"><i class="fa-regular fa-trash-can fw-bold" style="color: #e02e37; font-size: 24px; cursor: pointer"></i></span>
        </div>
      `;
  
      cartContainer.appendChild(productElement);
      clearCartBtn.innerText = 'Clear'
      clearCartBtn.classList.add('btn', 'btn-danger')

    
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


function removeItem(productId){
  cart.forEach((product)=>{
    if(productId==product.id){
      cart = cart.filter(item=>item.id!==productId)
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart()
    }
  })
}
  
  // Appel initial pour mettre à jour l'affichage du panier
  updateCart();

function emptyCart() {
    cart = [];

  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart()
}

