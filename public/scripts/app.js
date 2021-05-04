

$( document ).ready(function() {
  const shoppingCart =[];

  $(".navRight").append(`<button type="button" class="login">LOGIN</button>`)
  $(".navRight").append(`<button type="button" class="register">REGISTER</button>`)
  $('.registerFields').append(`<input type="text" id="usernameR" placeholder="username" />
    <input type="password" id="passwordR" placeholder="password" />
    <button id="register" type="button">Register</button>`)
    $('.loginFields').append(`
    <input type="text" id="usernameL" placeholder="username" />
    <input type="password" id="passwordL" placeholder="password" />
    <button id="login" type="button">Login</button>`)
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

  $(".fas").on('click',() => {
    $.ajax({
      url: "/users",
      method: "GET",
      success: (data) => {
        let users = data.users[1];
        $('.userInfo').empty();
        $(".userInfo").append(`<div>${users.name}</div>`)
        $(".userInfo").append(`<div>${users.email}</div>`)
        $(".userInfo").append(`<div>${users.favourites}</div>`)
        $(".userInfo").append(`<div>${users.allergens}</div>`)
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
        $(".login").hide();
        $(".register").hide();
        $('.loginFields').hide();
        $('.registerFields').hide();
        $(".navRight").append(`<div class="greeting">Hello ${data.users[0].name}</div>`)
        $(".navRight").append(`<button type="button" class="logout">Logout</button>`)
       }
      }
    })
  });

  $(document).on("click", ".logout", function(){

    $(".greeting").hide()
    $(".logout").hide()
    $(".login").show();
    $(".register").show();

  });

  $('.login').on('click',() => {
    if ($('.loginFields').is(':visible')) {
      $(".loginFields").hide()
    } else {
        $(".loginFields").show()
        $('.registerFields').hide();
        $(".loginFields").hide().slideDown();
    }
  })


  $('.register').on('click',() => {
    if ($('.registerFields').is(':visible')) {
    $(".registerFields").hide()
    } else {
    $('.loginFields').hide();
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
        <div id="${item.id}" class="menuItem"> <img src=${item.display_image} style="width:100px;height:100px;"/>${item.name}
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
              <div id="${item.id}-expanded" class="menuItem">${item.name}
              <img src=${item.display_image} style="width:100px;height:100px;"/> Price: ${item.price}
                <br>Description: ${item.description} <br>Ingredients: ${item.ingredients}
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary1">-</button>
                  <input type="number" id="quantity" name="quantity" placeholder="0" min="1">
                  <button type="button" class="btn btn-secondary2">+</button>
                </div>
                <button type="button" id="add-to-cart" class="btn btn-dark">Add to cart</button>
              </div>
              `)
              $('#add-to-cart').on("click", function(){
                let quantity = $('#quantity').val();

                // // orders function
                // $(`#${item.id}-btn`).click(function(event) {
                //   console.log('button clicked');
                //  $.ajax({
                //    url: "/orders",
                //    method: "GET",
                //    success: (data) => {
                //      console.log(data);
                //     $(".page-header").append(`<div class="menu-item">${data}</div>`)
                //      let orders = data.orders
                //      console.log(orders);
                //     //  orders.forEach(order => {
                //     //    $(".cart").append(`<div class="menu-item">hello</div>`)
                //     //  })
                //    }
                //   })
                // })
              });
            }
          })
        })
      })
      //  add to cart functionality

    }
  })

  $.ajax({
    url: '/orders/timestamp',
    method: 'GET',
    success: (data) => {
      let timeStamp = Object.values(data.orders[0]['?column?'])
      console.log(Object.values(data.orders[0]['?column?']));
        $('.time').append(`<div>
        ${timeStamp} minutes</div>`)
    }
  })


$(document).on("click", ".btn.btn-secondary1", function(){
  let orderValue = Number($("#quantity").val()) - 1

  $("#quantity").val(orderValue)
});

$(document).on("click", ".btn.btn-secondary2", function(){
  let orderValue = Number($("#quantity").val()) + 1

  $("#quantity").val(orderValue)
});

$(document).on("click", ".btn.btn-dark", function(){
  console.log("test")
});






})





