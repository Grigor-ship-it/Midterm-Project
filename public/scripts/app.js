$( document ).ready(function() {
  const shoppingCart =[];

  $(".links").append(`<li class="login">LOGIN<i class="fas fa-angle-down"></i></li>`)
  $(".links").append(`<li class="register">REGISTER<i class="fas fa-angle-down"></i></li>`)
  $(".links").append(`<li class="logout">LOGOUT<i class="fas fa-angle-down"></i></li>`)
  $(".logout").hide()
  $('.registerFields').append(`
  <form>
    <fieldset>
      <input type="text" id="usernameR" placeholder="name" />
      <input type="password" id="passwordR" placeholder="password" />
      <input type="text" id="email" placeholder="email" />
      <input type="tel" id="telephone" placeholder="telephone" />
      <input type="number" id="payment-info" placeholder="payment info" />
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

  $("#menuItemsButton").click(function(event) {
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
        let users = data.users[1];
        $('.userInfo').empty();
        $(".userInfo").append(`<li><a href='#'>${users.name}</a></li>`)
        $(".userInfo").append(`<li><a href='#'>${users.email}</a></li>`)
        $(".userInfo").append(`<li><a href='#'>${users.favourites}</a></li>`)
        $(".userInfo").append(`<li><a href='#'>${users.allergens}</a></li>`)
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

  $('.login').on('click',() => {
    if ($('.loginFields').is(':visible')) {
      $(".loginFields").hide()
    } else {
        $(".loginFields").show()
        $('.registerFields').hide();
        $(".loginFields").hide().slideDown('fast');
    }
  })

  $('.register').on('click',() => {
    if ($('.registerFields').is(':visible')) {
    $(".registerFields").hide()
    } else {
    $('.loginFields').hide();
    $('.registerFields').hide().slideDown('fast');
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
              });
            }
          })
        })
      })
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

        // for (let i = 0; i < minutes; i--) {
        console.log(minutes);
        console.log(seconds);
        const intervalID = setInterval(function() {
        if (seconds <= 0) {
          minutes --;
          seconds = 60
          console.log(minutes);
          $('#minutes').html(`${minutes} minutes`)
        }
        seconds--;
        $('#seconds').html(`${seconds} seconds`)
        console.log(seconds);

        },1000);

      if (countDown <= 0) {
        clearInterval(intervalID);
        $('#time').html(`<div> TIME FOR PICKUP </div>`)
      }
    }
    timer();
  }
  })

  $('#shopping-cart').on("click", function(){
    $('.shopping-cart-view').empty();

    if (shoppingCart.length !== 0) {
      // for each item added to the shopping cart
      shoppingCart.forEach(element => {

        $('.shopping-cart-view').append(`
          <li class="${element.item_id}-cart-item">
            ${element.quantity} x ${element.item_name} = $${element.item_price * element.quantity}
            <i id="${element.item_id}-remove-item"class="fas fa-times"></i>
          </li>
        `)
          // Remove item from shopping cart functionality to come next push
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

  // $(document).on("click", ".btn.btn-dark", function(){
  //   console.log("test")
  // });

  //scroll left
  $(document).on("click", ".far.fa-arrow-alt-circle-left", function(){
    $(".menu-listed-items").animate( { scrollLeft: '-=460' }, 1000);
  });

  //scroll right
  $(document).on("click", ".far.fa-arrow-alt-circle-right", function(){
    $(".menu-listed-items").animate( { scrollLeft: '+=460' }, 1000);

  })



});

