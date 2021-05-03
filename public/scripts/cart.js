$( document ).ready(function() {

  // maybe we can add this in function inside helpers.js

  $("#menuItemsButton").click(function(event) {
   console.log('button clicked');
  $.ajax({
    url: "/orders",
    method: "GET",
    success: (data) => {
      console.log(data);
     $(".page-header").append(`<div class="menu-item">hello</div>`)
      let orders = data.orders
      console.log(orders);
     //  orders.forEach(order => {
     //    $(".cart").append(`<div class="menu-item">hello</div>`)
     //  })
    }
   })
 })
})
