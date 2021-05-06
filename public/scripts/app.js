$( document ).ready(function() {
  const shoppingCart =[];
  $('.checkout-confirmation').hide();
  $(".links").append(`<li class="login">LOGIN<i class="fas fa-angle-down"id="loginArrow"></i></li>`)
  $(".links").append(`<li class="register">REGISTER<i class="fas fa-angle-down"id="registerArrow"></i></li>`)
  $(".links").append(`<li class="logout">LOGOUT<i class="fas fa-angle-down"></i></li>`)
  $(".logout").hide()
  $('.registerFields').append(`
  <form class="reg">
    <fieldset>
      <input type="text" id="usernameR" placeholder="Name" />
      <input type="password" id="passwordR" placeholder="Password" />
      <input type="text" id="email" placeholder="Email" />
      <input type="tel" id="telephone" placeholder="Telephone" />
      <input type="text" id="allergens" placeholder="Allergens" />
      <input type="number" id="payment-info" placeholder="Payment info" />
      <button id="register" type="submit">Register</button>
    </fieldset>
  </form>
  `)
  $('.loginFields').append(`
  <form>
    <fieldset>
      <input type="text" id="usernameL" placeholder="username" />
      <input type="password" id="passwordL" placeholder="password" />
      <button id="login" type="button">Login</button>
    </fieldset>
  </form>

  `)

  $(".registerFields").hide()
  $(".loginFields").hide()

  $("#menuItemsButton").click(function() {
    $.ajax({
      url: "/menu",
      method: "GET",
      success: (data) => {
        let menuItems = data.menuItems
        menuItems.forEach(item => {
          $(".menu-listed-items").append(`<div class="menu-item">${item.name}</div>`)
        })
      }
    })
  })

  $("#user-slide-down").on('click',() => {
    $.ajax({
      url: "/users",
      method: "GET",
      success: (data) => {
        let users = data.users[0];
        $(".userInfo").empty()
        $(".userInfo").append(`<h5>name</h5><li><a href='#'>${users.name}</a></li>`)
        $(".userInfo").append(`<h5>email</h5><li><a href='#'>${users.email}</a></li>`)
        $(".userInfo").append(`<h5>favourite</h5><li><a href='#'>${users.favourites}</a></li>`)
        $(".userInfo").append(`<h5>allergens</h5><li><a href='#'>${users.allergens}</a></li>`)
        $('.userInfo').toggle('fast');
      }
    })
  })

  $(document).on("click", "#login", function(){
    $.ajax({
      url: '/users',
      method: 'GET',
      success: (data) => {
        if ($('#usernameL').val() === data.users[0].email && $('#passwordL').val() === data.users[0].password)
        {


        $(".register").hide();
        $(".login").hide();
        $('.loginFields').hide();
        $('.registerFields').hide();
        $(".logout").show()
      }
      }
    })
  });

  $(document).on("click", "#register", function(){
  let email = $("#email").val()
  let name = $("#usernameR").val()
  let password = $("#passwordR").val()
  let telephone = $("#telephone").val()
  let paymentInfo =  $("#payment-info").val()
  let allergens = $("#allergens").val()
    $.ajax({
      url: "/register",
      method: "POST",
      data : {email,name,password,telephone,paymentInfo,allergens},
      success: function(res ) {

        $('.registerFields').hide();
        $("#email").val("")
        $("#usernameR").val("")
        $("#passwordR").val("")
        $("#telephone").val("")
        $("#payment-info").val("")
        $("#allergens").val("")
      }
    })
  })

  $(document).on("click", ".logout", function(){

    $(".greeting").hide()
    $(".logout").hide()
    $(".login").show();
    $(".register").show();
    $(".links").show();

  });

   $('#loginArrow').on('click',() => {
    console.log("Test")
     if ($('.loginFields').is(':visible')) {
     $(".loginFields").hide()
    } else {


      $(".loginFields").hide().slideDown('fast');
    }
   })

  $('#registerArrow').on('click',() => {
    if ($('.registerFields').is(':visible')) {
      $(".registerFields").hide()
    } else {

      $('.registerFields').hide().slideDown();
    }
  })

  $.ajax({
    url: "/menu",
    method: "GET",
    success: (data) => {
      let menuItems = data.menuItems
      menuItems.forEach(item => {
        $(".menu-listed-items").append(`
        <div id="${item.id}" class="menuItems"> <img src=${item.display_image} style="width:200px;height:160px;"/>${item.name}
        </div>
        `)
        $(`#${item.id}`).click(function(event) {
          $.ajax({
            url: `/menuItem/${item.id}`,
            method: "GET",
            success: (data) => {
              if ($(".individualItem").children().length){

              $(".individualItem").empty()
              }

              $(".individualItem").append(`
              <div id="${item.id}-expanded" class="menuItem"><b>${item.name}</b>
              <img src=${item.display_image} style="width:300px;height:264px;" class="image">
              <div class="menu-text"
                <br>${item.price}$
                <br>${item.description}
                <br>${item.ingredients}
              </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary1">-</button>
                  <input type="number" id="quantity" name="quantity" placeholder="0" value="1" min="1">
                  <button type="button" class="btn btn-secondary2">+</button>
                </div>
                <button type="button" id="add-to-cart" class="btn btn-dark">Add to cart</button>
              </div>
              `)

              // temporary cart storage until order is finalized in checkout
              $('#add-to-cart').on("click", function(){

                let quantity = $('#quantity').val();
                const item_id = item.id
                const item_price = item.price
                const item_name = item.name
                shoppingCart.push({
                  item_id,
                  quantity,
                  item_price,
                  item_name

                });
                if ($('.confirmation-message').is(':empty')) {
              $('.confirmation-message').append(`<div class="alert success">
              <span class="closebtn">&times;</span>
              <strong>Success!</strong> Added ${quantity}X ${item.name} into cart.
              </div>`)
                }
              });
            }
          })
        })
      })
    }
  })

  $('body').on("click", function(event){
    let target = $(event.target)
     if (!(target.is("#loginArrow")) && (!(target.is(".loginFields"))) && (!(target.is("#usernameL"))) && (!(target.is("#passwordL")))) {
       $('.loginFields').hide()
     }
    if (!(target.is(".registerFields")) && (!(target.is("#registerArrow"))) && (!(target.is("#usernameR"))) &&(!(target.is("#passwordR")))
    && (!(target.is("#email"))) && (!(target.is("#telephone"))) && (!(target.is("#allergens"))) && (!(target.is("#payment-info")))) {
       $('.registerFields').hide()
     }
    if (!(target.is('#add-to-cart'))) {
      $('.confirmation-message').empty();
      $('.alert.success').hide()
    }
    if (!(target.is(".checkout-confirmation"))&& !(target.is("#checkout"))) {
    $('.checkout-confirmation').hide()
    }
    if (!(target.is("#shopping-cart"))) {
    $('.shopping-cart-view').hide()
    }
    if (!(target.is("#user-slide-down"))) {
    $('.userInfo').hide()
    }

  })

  $.ajax({
    url: '/orders/timestamp',
    method: 'GET',
    success: (data) => {
      const timer = function() {
        let timeOrdered = Date.parse(data.orders[0].order_time);
        let orderFinish = Date.parse(data.orders[0].finish_time);
        let countDown = orderFinish - timeOrdered;
        let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        const intervalID = setInterval(function() {
          if (seconds <= 0) {
            minutes --;
            seconds = 60
          }
          seconds--;
          if (seconds <= 9) {
            $('#seconds').html(`<span class='timeStyle'>${minutes}:0${seconds}</span>`)
          } else
          $('#seconds').html(`<span class='timeStyle'>${minutes}:${seconds}</span>`)
        },1000);
          if (minutes === 0 && seconds === 0) {
          clearInterval(intervalID);
          $('#time').html(`<div> TIME FOR PICKUP </div>`)
      }
    }
    timer();
  }
})


  $('#shopping-cart').on("click", function(){
    $('.shopping-cart-view').empty();
    $('.checkout-confirmation').empty();

    if (shoppingCart.length !== 0) {
      // for each item added to the shopping cart
      let subTotal = 0;
      let tax = 0;
      let checkoutTotal = 0;
      $('.checkout-confirmation').append(`
      <h4 class="checkout-title">Order confirmation</h4>
    `);
      shoppingCart.forEach(element => {

        subTotal += Number(element.item_price) * Number(element.quantity);
        if (element.quantity) {
          $('.shopping-cart-view').append(`
            <li class="${element.item_id}-cart-item">
              ${element.quantity} x ${element.item_name} = $${element.item_price * element.quantity}
              <i id="${element.item_id}-remove-item"class="fas fa-times"></i>
          `)
          // Remove item from shopping cart
          $(`#${element.item_id}-remove-item`).on('click', function() {
            const removeIndex = shoppingCart.indexOf(element);
            shoppingCart.splice(removeIndex, 1);
          })
        }
    });


      $('.shopping-cart-view').append(`<button type="button" id="checkout" class="btn btn-dark">Checkout</button>`)
      $('#checkout').on('click', function() {
        $('.checkout-confirmation').show();
      });
      // rounding to 2 decimal places
      tax = subTotal * 0.13;
      tax = Number(tax.toFixed(2));

      checkoutTotal = subTotal + tax;

      $('.checkout-confirmation').append(`
        <div class="order-total">
          <p class="sub-total">Sub-total = $${subTotal}</p>
          <p class="tax">Tax = $${tax}</p>
          <p class="order-total">Order Total =  $${checkoutTotal}</p>
        </div>
      `);
      $('.checkout-confirmation').append(`
        <button class="order-final">
          ORDER NOW
        </div>
      `);

      $('.order-final').on("click", function(event) {
        console.log(shoppingCart);
        let quantity = $('#quantity').val();
        shoppingCart.forEach(element => {
          const item_id = element.item_id
          const item_price = element.item_price
          const item_name = element.item_name

        $.ajax({
          url: "/finalItems",
          method: "POST",
          data : {item_id, item_price, item_name, quantity},
          success: function() {

            console.log('success1');

          }
        })

      });

      $.ajax({
        url: "/finalOrders",
        method: "POST",
        success: function() {

        console.log('success2');
        shoppingCart.length = 0;
      }
    })
      $('.checkout-confirmation').hide();
      });
    } else {
      $('.shopping-cart-view').append(`
        <p class="cart-quantity">Please add items to your cart first!</p>
      `)
    }

    if ($('.shopping-cart-view').is(':visible')) {
      $(".shopping-cart-view").hide()
    } else {
      $('.shopping-cart-view').hide().slideDown();
    }
  });

  $(document).on("click", ".btn.btn-secondary1", function(){
    if ($("#quantity").val() > 1 ) {
    let orderValue = Number($("#quantity").val()) - 1
    $("#quantity").val(orderValue)
    }
  });

  $(document).on("click", ".btn.btn-secondary2", function(){
    let orderValue = Number($("#quantity").val()) + 1

    $("#quantity").val(orderValue)
  });

  //scroll left
  $(document).on("click", ".far.fa-arrow-alt-circle-left", function(){
    $(".menu-listed-items").animate( { scrollLeft: '-=460' }, 1000);
  });

  //scroll right
  $(document).on("click", ".far.fa-arrow-alt-circle-right", function(){
    $(".menu-listed-items").animate( { scrollLeft: '+=460' }, 1000);

  })


});


// });
//   $.ajax({
//     url: `https://www.google.com/maps/dir/?api=1&origin=${user.street}+${user.city}&destination=662+King+St+W+Toronto+ON`,
//     method: 'GET',
//     success: (data => {
//       $('#directions').show()
//     })
//   })

