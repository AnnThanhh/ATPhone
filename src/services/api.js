function Api() {
  this.fecthData = function () {
    const promise = axios({
      url: "https://65d8a753c96fbb24c1bc0700.mockapi.io/api/Phone",
      method: "GET",
    });

    return promise;
  };

  this.delete = function (id) {
    const promise = axios({
      url: `https://65d8a753c96fbb24c1bc0700.mockapi.io/api/Phone/${id}`,
      method: "DELETE",
    });

    return promise;
  };

  this.add = function (product) {
    const promise = axios({
      url: "https://65d8a753c96fbb24c1bc0700.mockapi.io/api/Phone",
      method: "POST",
      data: product,
    });

    return promise;
  };

  this.getProductById = function (id) {
    const promise = axios({
      url: `https://65d8a753c96fbb24c1bc0700.mockapi.io/api/Phone/${id}`,
      method: "GET",
    });

    return promise;
  };

  this.update = function (product) {
    const promise = axios({
      url: `https://65d8a753c96fbb24c1bc0700.mockapi.io/api/Phone/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  };
}
