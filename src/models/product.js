function Product(
  _id,
  _name,
  _price,
  _screen,
  _backCamera,
  _frontCamera,
  _image,
  _desc,
  _type
) {
  this.id = _id;
  this.name = _name;
  this.price = _price;
  this.screen = _screen;
  this.backCamera = _backCamera;
  this.frontCamera = _frontCamera;
  this.image = _image;
  this.desc = _desc;
  this.type = _type;
}

function CartItem(_product, _quantity) {
  this.product = _product;
  this.quantity = _quantity;
}