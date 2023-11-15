// List of products
const products = [
  {
    id: 1,
    title:"Lenovo X260",
    imageUrl:"images/pc.png",
    description:"Good computer.",
    rating:4.3,
    price: 560
},
{
    id:2,
    title:"Salomon XT",
    imageUrl:"images/shoes.png",
    description:"Good Sneaker.",
    rating:4.2,
    price:180
},
{
    id:3,
    title:"Galaxy S20",
    imageUrl:"images/phone.png",
    description:"Good phone.",
    rating:4.5,
    price:750
},
{
    id:4,
    title:"Liner Algebra",
    imageUrl:"images/book.png",
    description:"Good book",
    rating:4.6,
    price:100
}
];

// Get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let bag = document.getElementById('bag')

bag.textContent = `${cart.length}`

// Displaying The list of products in the DOM
function displayProducts() {
  
  const productSection = document.getElementById('product-list');
  productSection.innerHTML = ''; // Clear product list

  products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
      <div class="item-container">
      <div class="main-item" style="display: flex, justify-content: center, aligni-tems: center">
          <img src=${product.imageUrl} width="100%" style="background: #eceaea" alt="pc" />
      </div>
      <h5 class="item-heading">
          ${product.title}
      </h5> 
  
      <p class="item-description">
          ${product.description}
      </p>
      <div class="rating">
          <p class="desc" style="fontWeight: bold, textAlign: justify">Rating</p>
          <p style="font-weight: bold">${product.rating}</p>
      </div>
      <p class="item-price"><sup>$</sup>${product.price}</p>
      <button class="item-cart-btn" onclick="addToCart(${product.id})">Add To Cart</button>
  </div>
      `;
      productSection.appendChild(productDiv);
  });
}

// adding a product to cart
function addToCart(productId) {
  console.log(productId)
  const success = document.getElementById("success");
  // Verify if a product is already in cart
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    // alert('Product Already In Cart')
    alreadyInCart = document.getElementById('already-in-cart')

    setTimeout(() => {
      alreadyInCart.classList.remove('d-none')
    }, 500);

    setTimeout(() => {
      alreadyInCart.classList.add('d-block')
      alreadyInCart.transition = 'd-block 1s ease'
    }, 800);

    setTimeout(() => {
      alreadyInCart.classList.remove('d-block')
      alreadyInCart.classList.add('d-none')
      alreadyInCart.style.transition = 'd-none 1s ease'
    }, 1200);

    return 
  } else {
    // Find the product in the list of products
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
      bag.textContent = `${cart.length}`
      bag.style.cssText = 'transform: rotate(360deg) scale(1.5); transition: transform 1s'

      setTimeout(() => {
        success.classList.remove('d-none')
      }, 500);

      setTimeout(() => {
        success.classList.add('d-block')
        success.style.transition = 'd-block 1s ease'
      }, 800);

      setTimeout(() => {
        success.classList.remove('d-block')
        success.classList.add('d-none')
        success.style.transition = 'd-none 1s ease'
      }, 1200);

    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  
}

displayProducts()


