const ringButtons = document.querySelectorAll(".ring-button");

ringButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // removing selected color from all buttons
    ringButtons.forEach((button) => {
      button.classList.remove("border-red-500");
      button.classList.add("border-gray-300");
    });
    // adding selected color to the clicked button
    button.classList.remove("border-gray-300");
    button.classList.add("border-red-500");

    // changing the image of the product
    const imageName = button.id.replace("-color", "");
    // console.log(imageName);
    const productsImage = document.getElementById("product-image");
    productsImage.src = `../images/${imageName}.png`;
  });
});

const sizeBox = document.querySelectorAll(".size-box");
sizeBox.forEach((box) => {
  box.addEventListener("click", () => {
    const selectedSize = box.id.split("-")[1];
    console.log(selectedSize);
    // removing selected color from all buttons
    sizeBox.forEach((box) => {
      box.classList.remove("border-green-500");
    });
    // adding selected color to the clicked button
    box.classList.add("border-green-500");
  });
});

//Quantity Counter Management
const quantityButtons = document.querySelectorAll(".quantity-button");

for (let i = 0; i < quantityButtons.length; i++) {
  quantityButtons[i].addEventListener("click", (e) => {
    const numberOfIncrement = e.target.innerText === "+" ? 1 : -1;
    let quantity = parseInt(document.getElementById("quantity").innerText);
    const newQuantity = Math.max(0, numberOfIncrement + quantity);
    document.getElementById("quantity").innerText = newQuantity;
  });
}

let cartCount = 0;
let cartItems = [];
document.getElementById("add-to-cart").addEventListener("click", () => {
  const quantity = document.getElementById("quantity").innerText;
  cartCount += parseInt(quantity);
  if (parseInt(quantity) > 0) {
    document.getElementById("checkout-container").classList.remove("hidden");
    document.getElementById("cart-count").innerHTML = cartCount;

    // Adding item to the cart
    const selectedColor = document
      .querySelector("button.border-red-500.w-6")
      .id.split("-")[0];
    const selectedSize = document
      .querySelector("button.border-green-500:not(.w-6)")
      .id.split("-")[1];
    const selectedSizePrice = document
      .querySelector("button.border-green-500:not(.w-6)")
      .innerText.split("$")[1];
    const selectedQunatiy = parseInt(
      document.getElementById("quantity").innerText
    );
    const title = document.getElementById("product-title").innerText;
    // console.log(title);
    const selectedProductImage = document.getElementById("product-image");
    // console.log(selectedProductImage.src);
    const selectedProduct = {
      image: selectedProductImage.src,
      title: title,
      color: selectedColor,
      size: selectedSize,
      price: selectedSizePrice * quantity,
      quantity: selectedQunatiy,
    };
    cartItems.push(selectedProduct);
    console.log(selectedProduct);
  } else {
    alert("Please select a quantity greater than 0");
  }
});

document.getElementById("checkout-container").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("hidden");
  const cartModalContent = document.getElementById("cart-items");
  cartModalContent.innerHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
    totalQuantity += cartItems[i].quantity;
    const tableRow = document.createElement("tr");
    tableRow.classList.add("border-b-2");
    tableRow.innerHTML = `
        <td class="px-4 py-4 "> 
            <div class="flex items-center mt-2 gap-4">
                <img src="${cartItems[i].image}" class="w-8 h-8 object-cover rounded-md">
                <span class="font-semibold text-md"> ${cartItems[i].title} </span>
            </div>
        </td>
        <td class="px-4 py-4 "> ${cartItems[i].color} </td>
        <td class="px-4 py-4 "> ${cartItems[i].size} </td>
        <td class="px-4 py-4 "> ${cartItems[i].quantity} </td>
        <td class="px-4 py-4 "> $${cartItems[i].price} </td>
    `;
    cartModalContent.appendChild(tableRow);
  }

  const totalDetailsRow = document.createElement("tr");
  totalDetailsRow.innerHTML = `
        <td class="px-4 py-4 "> Total </td>
        <td class="px-4 py-4 ">  </td>
        <td class="px-4 py-4 ">  </td>
        <td class="px-4 py-4 "> ${totalQuantity} </td>
        <td class="px-4 py-4 "> $${totalPrice} </td>
  `;
  cartModalContent.appendChild(totalDetailsRow);
});


document.getElementById("continue-shopping").addEventListener('click', ()=>{
    document.getElementById("cart-modal").classList.add("hidden");
})