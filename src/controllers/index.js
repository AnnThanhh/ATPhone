const api = new Api();
let cart = [];
getLocalStorage();

function getListProduct() {
  const promise = api.fecthData();
  document.getElementById("loader").style.display = "block";

  promise
    .then(function (result) {
      document.getElementById("loader").style.display = "none";
      renderUI(result.data);
      product = result.data;
    })
    .catch(function (error) {
      document.getElementById("loader").style.display = "none";
      console.log(error);
    });
}

getListProduct();

function renderUI(data) {
  let content = "";

  data.forEach(function (product) {
    content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardPhone">
            <img src="${product.img}" class="card-img-top" alt="..." />
            <div class="card-body">
                <div>
                <div class="d-flex justify-content-between">
                    <h3 class="cardPhone__title">${product.name}</h3>
                    <h3 class="cardPhone__title">$${product.price}</h3>
                </div>
                <div>
                <p class="cardPhone__text">${product.desc}</p>
                </div>
                </div>
                <div class="d-flex justify-content-between card__bottom">
                <div class="cardPhone__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div>
                    <button class="btnAT-buy" data-product-id="${product.id}" data-toggle="modal" data-target="#exampleModal"">
                    <i class="fa fa-shopping-cart" style="font-size: 25px;"></i>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    `;
  });

  document.getElementById("products__content_main").innerHTML = content;
}

function filtedItem(product) {
  let type = document.getElementById("selLoai").value;
  let filtedcontent = [];

  if (type === "all") {
    filtedcontent = product;
  } else {
    filtedcontent = product.filter(function (product) {
      return product.type === type;
    });
  }

  renderUI(filtedcontent);
}

function setLocalStorage() {
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

function getLocalStorage() {
  if (!localStorage.getItem("cart")) return;
  const cartString = localStorage.getItem("cart");
  cart = JSON.parse(cartString);
  renderCart();
}

function capNhatSoLuong(productID, click) {
  const item = cart.find((item) => item.product.id === productID);
  if (item) {
    if (click === "increase") {
      item.quantity++;
    } else if (click === "decrease" && item.quantity > 1) {
      item.quantity--;
    }
    renderCart();
    setLocalStorage();
  }
}

function xoaSanPham(productID) {
  cart = cart.filter((item) => item.product.id !== productID);
  renderCart();
  setLocalStorage();
}

function renderCart() {
  let totalAmount = 0;
  let cartContent = "";
  cart.forEach((item) => {
    const subtotal = item.product.price * item.quantity;
    totalAmount += subtotal;
    cartContent += `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>$${subtotal.toLocaleString()}</td>
        <td>
        <button class="btn btn-info" onclick="capNhatSoLuong('${
          item.product.id
        }', 'increase')">+</button>
        <button class="btn btn-info" onclick="capNhatSoLuong('${
          item.product.id
        }', 'decrease')">-</button>
        <button class="btn btn-danger" onclick="xoaSanPham('${
          item.product.id
        }')">X</button>
        </td>
      </tr>
    `;
  });

  document.getElementById(
    "totalAmount"
  ).innerText = `Tổng tiền: $${totalAmount.toLocaleString()}`;
  document.getElementById("cartTableBody").innerHTML = cartContent;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnAT-buy")) {
    const clickedProductID = event.target.dataset.productId;
    const clickedProduct = product.find((item) => item.id === clickedProductID);

    if (clickedProduct) {
      let existingCartItem = cart.find(
        (item) => item.product.id === clickedProduct.id
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        let newCartItem = { product: clickedProduct, quantity: 1 };
        cart.push(newCartItem);
      }

      renderCart();
      setLocalStorage();
    }
  }
});

document
  .getElementById("checkoutButton")
  .addEventListener("click", function () {
    cart = [];
    renderCart();
    setLocalStorage();
  });
