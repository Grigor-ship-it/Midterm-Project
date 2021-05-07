const postUserRegistration = function() {

  const email       = $("#email").val();
  const name        = $("#usernameR").val();
  const password    = $("#passwordR").val();
  const telephone   = $("#telephone").val();
  const paymentInfo =  $("#payment-info").val();
  const allergens   = $("#allergens").val();

  $.ajax({
    url: "/register",
    method: "POST",
    data : {email, name, password, telephone, paymentInfo, allergens},
    success: function(res ) {

      $('.registerFields').hide();
      $("#email").val("");
      $("#usernameR").val("");
      $("#passwordR").val("");
      $("#telephone").val("");
      $("#payment-info").val("");
      $("#allergens").val("");
    }
  })

}

const postCartItems = function(item_id, item_price, item_name, quantity) {
  $.ajax({
  url: "/finalItems",
  method: "POST",
  data : {item_id, item_price, item_name, quantity},
  success: function() {
    startTimer();
  }
})
}

const postOrders = function(shoppingCart) {
  $.ajax({
  url: "/finalOrders",
  method: "POST",
  success: function() {
    shoppingCart.length = 0;
  }
  })
}
