$(document).ready(function() {
  // array to hold items in the shopping cart
  const shoppingCart = [];

  // dynamically appending elements
  $(".links").append(`<li class="login">LOGIN
  <i class="fas fa-angle-down"id="loginArrow"></i>
  </li>`);

  $(".links").append(`
  <li class="register">REGISTER
    <i class="fas fa-angle-down"id="registerArrow"></i>
  </li>
  `);

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
  `);

  $(".links").append(`
  <li class="logout">LOGOUT
    <i class="fas fa-angle-down"></i>
  </li>
  `);

  $('.loginFields').append(`
  <form>
    <fieldset>
      <input type="text" id="usernameL" placeholder="username" />
      <input type="password" id="passwordL" placeholder="password" />
      <button id="login" type="button">Login</button>
    </fieldset>
  </form>
  `);

  // hide elements that need to be shown when events are triggered
  $('.checkout-confirmation').hide();
  $(".logout").hide();
  $(".registerFields").hide();
  $(".loginFields").hide();

  // Display menu items and on click it displays indiviual items
  displayMenuItems();

  // Display user profile on the top left
  displayUserInfoMenu();

  userLoginValidation();

  $("#register").on("click", function(){
    postUserRegistration();
  });

  $(".logout").on("click", function(){

    $(".greeting").hide();
    $(".logout").hide();
    $(".login").show();
    $(".register").show();
    $(".links").show();

  });

   $('#loginArrow').on('click',() => {
    if ($('.loginFields').is(':visible')) {
      $(".loginFields").hide();
    } else {
      $(".loginFields").hide().slideDown('fast');
    }
    })

  $('#registerArrow').on('click',() => {
    if ($('.registerFields').is(':visible')) {
      $(".registerFields").hide();
    } else {
      $('.registerFields').hide().slideDown();
    }
  })

  $.ajax({
    url: "/menu",
    method: "GET",
    success: (data) => {
      const menuItems = data.menuItems;

      menuItems.forEach(item => {
        $(".menu-listed-items").append(`
        <div id="${item.id}" class="menuItems">
          <img src=${item.display_image} style="width:200px;height:160px;"/>${item.name}
        </div>
        `);

        // On click of the menu listed items, a larger indiviual item is appended
        $(`#${item.id}`).click(function(event) {
          $.ajax({
            url: `/menuItem/${item.id}`,
            method: "GET",
            success: (data) => {
              if ($(".individualItem").children().length){
                $(".individualItem").empty();
              }

              $(".individualItem").append(`
              <div id="${item.id}-expanded" class="menuItem"><b>${item.name}</b>
                <img src=${item.display_image} style="width:300px;height:264px;" class="image">
                <div class="menu-text"
                  <br>$${item.price}
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
              `);

              // temporary cart storage until order is finalized in checkout
              $('#add-to-cart').on("click", function(){

                let quantity     = $('#quantity').val();
                const item_id    = item.id;
                const item_price = item.price;
                const item_name  = item.name;

                shoppingCart.push({
                  item_id,
                  quantity,
                  item_price,
                  item_name
                });

                if (shoppingCart.length) {
                  $('.notification').append(`
                    <span class="cart-counter">${shoppingCart.length}</span>
                  `);
                } else {
                  $("#shopping-cart-counter").hide();
                }

                if ($('.confirmation-message').is(':empty')) {
                  $('.confirmation-message').append(`<div class="alert success">
                    <span class="closebtn">&times;</span>
                      <strong>Success!</strong> Added ${quantity}X ${item.name} into cart.
                    </div>
                  `);
                }
              });
            }
          })
        })
      })
    }
  })

  $('body').on("click", function(event){
    const target = $(event.target)
    if (!(target.is("#loginArrow")) && (!(target.is(".loginFields"))) && (!(target.is("#usernameL"))) && (!(target.is("#passwordL")))) {
      $('.loginFields').hide();
    }

    if (!(target.is(".registerFields")) && (!(target.is("#registerArrow"))) && (!(target.is("#usernameR"))) &&(!(target.is("#passwordR")))
    && (!(target.is("#email"))) && (!(target.is("#telephone"))) && (!(target.is("#allergens"))) && (!(target.is("#payment-info")))) {
      $('.registerFields').hide();
    }

    if (!(target.is('#add-to-cart'))) {
      $('.confirmation-message').empty();
      $('.alert.success').hide();
    }

    if (!(target.is(".checkout-confirmation"))&& !(target.is("#checkout"))&& !(target.is(".order-final"))&& !(target.is(".checkout-title"))&& !(target.is(".order-total"))
    && !(target.is(".tax"))&& !(target.is(".sub-total"))) {
      $('.checkout-confirmation').hide();
    }

    if (!(target.is("#shopping-cart"))) {
      $('.shopping-cart-view').hide();
    }

    if (!(target.is("#user-slide-down"))) {
      $('.userInfo').hide();
    }

  })

  $('#shopping-cart').on("click", function(){
    $('.shopping-cart-view').empty();
    $('.checkout-confirmation').empty();

    if (shoppingCart.length !== 0) {
      // for each item added to the shopping cart
      let checkoutTotal = 0;
      let subTotal      = 0;
      let tax           = 0;
      $('.checkout-confirmation').append(`
      <h2 class="checkout-title">Order confirmation</h2>
    `);
      shoppingCart.forEach(element => {

        subTotal += Number(element.item_price) * Number(element.quantity);
        if (element.quantity) {
          $('.shopping-cart-view').append(`
            <li class="${element.item_id}-cart-item">
            <span>${element.quantity} x </span>
            <span>${element.item_name} = </span>
            <span>$${element.item_price * element.quantity}</span>
            <i id="${element.item_id}-remove-item"class="fas fa-times"></i>
          `);

          $(`#${element.item_id}-remove-item`).on('click', function() {

            const removeIndex = shoppingCart.indexOf(element);
            shoppingCart.splice(removeIndex, 1);

            $(".cart-counter").remove();
            if (shoppingCart.length) {
              $('.notification').append(`
                <span class="cart-counter">${shoppingCart.length}</span>
              `);
            }
          })
        }
    });

      $('.shopping-cart-view').append(`<button type="button" id="checkout" class="btn btn-dark">Checkout</button>`)
      $('#checkout').on('click', function() {
        $('.checkout-confirmation').show();
      });
      // rounding to 2 decimal places
      tax           = subTotal * 0.13;
      tax           = Number(tax.toFixed(2));
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
        $('.checkout-confirmation').empty();
        $('.checkout-confirmation').append(`
        <h2 class="thank-you">Thank you for your order! Your order has been placed!</h2>
        `);
        let quantity = $('#quantity').val();
        shoppingCart.forEach(element => {
          const item_id    = element.item_id;
          const item_price = element.item_price;
          const item_name  = element.item_name;

          // Add indiviual items inside order DB
          postCartItems(item_id, item_price, item_name, quantity);

        });

      // Add Orders to DB
      postOrders(shoppingCart);

    $('.cart-counter').hide();

    });
    } else {
      $('.shopping-cart-view').append(`
        <p class="cart-quantity">Please add items to your cart first!</p>
      `);
    }

    if ($('.shopping-cart-view').is(':visible')) {
      $(".shopping-cart-view").hide();
    } else {
      $('.shopping-cart-view').hide().slideDown();
    }
  });

  $(".btn.btn-secondary1").on("click", function(){

    if ($("#quantity").val() > 1 ) {
      let orderValue = Number($("#quantity").val()) - 1;
      $("#quantity").val(orderValue);
    }

  });

  $(".btn.btn-secondary2").on("click", function(){
    let orderValue = Number($("#quantity").val()) + 1;

    $("#quantity").val(orderValue);
  });

  //scroll left
  $(".far.fa-arrow-alt-circle-left").on("click", function(){
    $(".menu-listed-items").animate( { scrollLeft: '-=460' }, 1000);
  });

  //scroll right
  $(".far.fa-arrow-alt-circle-right").on("click", function(){
    $(".menu-listed-items").animate( { scrollLeft: '+=460' }, 1000);
  })

});
