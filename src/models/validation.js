function Validation() {
    this.kiemTraTong = function (value, spanId, message) {
      if (value === "") {
        getEle(spanId).innerHTML = message;
        return false;
      }
  
      getEle(spanId).innerHTML = "";
      return true;
    };
  }