const api = new Api();
const validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  const promise = api.fecthData();
  promise
    .then(function (result) {
      renderUI(result.data);
      product = result.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function renderUI(data) {
  let content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td><img src="${product.img}" class="card-img-top" alt="..." /></td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button  style="font-size: 20px;" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${
                  product.id
                })">Edit</button>
                <button  style="font-size: 20px;" class="btn btn-danger" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = content;
}

function resetModal() {
  getEle("spID").value = "";
  getEle("TenSP").value = "";
  getEle("GiaSP").value = "";
  getEle("ManHinh").value = "";
  getEle("camSau").value = "";
  getEle("camTruoc").value = "";
  getEle("HinhSP").value = "";
  getEle("MoTa").value = "";
  getEle("loai").value = "";
}

getEle("btnThemSP").onclick = function () {
  resetModal();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";
  const btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

function addProduct() {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("ManHinh").value;
  const backCamera = getEle("camSau").value;
  const frontCamera = getEle("camTruoc").value;
  const image = getEle("HinhSP").value;
  const desc = getEle("MoTa").value;
  const type = getEle("loai").value;

  let isValid = true;
  isValid &= validation.kiemTraTong(
    name,
    "invalidTen",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    price,
    "invalidGia",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    screen,
    "invalidMH",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    backCamera,
    "invalidCS",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    frontCamera,
    "invalidCT",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    type,
    "invalidLoai",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    image,
    "invalidHinh",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    desc,
    "invalidMoTa",
    "(*) Thông tin không được rỗng"
  );

  if (!isValid) return null;

  const product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    image,
    desc,
    type
  );

  const promise = api.add(product);
  promise
    .then(function () {
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  const btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      getEle("spID").value = product.id;
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("ManHinh").value = product.screen;
      getEle("camSau").value = product.backCamera;
      getEle("camTruoc").value = product.frontCamera;
      getEle("HinhSP").value = product.img;
      getEle("MoTa").value = product.desc;
      getEle("loai").value = product.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

document.getElementById("txtSearch").addEventListener("keyup", function () {
  const keyword = document.getElementById("txtSearch").value;
  searchProducts(keyword);
});

function updateProduct() {
  const id = getEle("spID").value;
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("ManHinh").value;
  const backCamera = getEle("camSau").value;
  const frontCamera = getEle("camTruoc").value;
  const image = getEle("HinhSP").value;
  const desc = getEle("MoTa").value;
  const type = getEle("loai").value;

  let isValid = true;
  isValid &= validation.kiemTraTong(
    name,
    "invalidTen",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    price,
    "invalidGia",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    screen,
    "invalidMH",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    backCamera,
    "invalidCS",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    frontCamera,
    "invalidCT",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    type,
    "invalidLoai",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    image,
    "invalidHinh",
    "(*) Thông tin không được rỗng"
  );

  isValid &= validation.kiemTraTong(
    desc,
    "invalidMoTa",
    "(*) Thông tin không được rỗng"
  );

  if (!isValid) return null;

  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    image,
    desc,
    type
  );

  const promise = api.update(product);
  promise
    .then(function (result) {
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteProduct(id) {
  const promise = api.delete(id);
  promise
    .then(function (reslut) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

document.getElementById("searchIcon").addEventListener("click", function () {
  const keyword = getEle("txtSearch").value.toLowerCase();
  if (keyword !== "") {
    searchProducts(keyword);
  } else {
    getListProduct();
  }
});

document.getElementById("txtSearch").addEventListener("input", function (event) {
    const keyword = getEle("txtSearch").value.toLowerCase();
    if (event.key === "Enter") {
      if (keyword !== "") {
        searchProducts(keyword);
      } else {
        getListProduct();
      }
    }
  });

function searchProducts(keyword) {
  const filteredData = product.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );
  renderUI(filteredData);
}

function sapXepSanPham(order) {
  if (order === "tang") {
    product.sort((a, b) => a.price - b.price);
  } else {
    product.sort((a, b) => b.price - a.price);
  }
  renderUI(product);
}

document.getElementById("tangDan").addEventListener("click", function () {
  sapXepSanPham("tang");
});

document.getElementById("giamDan").addEventListener("click", function () {
  sapXepSanPham("giam");
});
