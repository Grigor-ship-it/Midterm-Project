$( document ).ready(function() {

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
  $('.login').on('click',() => {
    $.ajax({
      url: "/users",
      method: 'GET',
      success: (data) => {
        $('.loginFields').empty();
        $('.loginFields').append(`
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" placeholder="password" />
        <button id="login" type="button" onclick="login()">Login</button>`)
        $('.loginFields').toggle('fast');


        const login = () => {
          if ($("#username").val() == "admin" && $("#password").val() == "admin") {
            alert("You are a valid user");
          } else {
            alert("You are not a valid user");
          }
        }
      }
    })
  })

  $('.register').on('click',() => {
    $('.registerFields').empty('');
    $('.registerFields').append(`<input type="text" id="username" placeholder="username" />
    <input type="password" id="password" placeholder="password" />
    <button id="login" type="button" onclick="register()">Register</button>`)
    $('.registerFields').toggle('fast');
    $.ajax({
      url: "/users",
      method: 'GET',
      success: (data) => {

      }
    })
  })

    $.ajax({
    url: "/menu",
    method: "GET",
    success: (data) => {
      let menuItems = data.menuItems
      menuItems.forEach(item => {
        $(".menu-listed-items").append(`<div id="${item.id}" class="menuItem"> <img src=${item.display_image} style="width:100px;height:100px;"/>${item.name}</div>`)
        $(`#${item.id}`).click(function(event) {
          $.ajax({
            url: `/menuItem/${item.id}`,
            method: "GET",
            success: (data) => {
              if ($(".individualItem").children().length){

              $(".individualItem").empty()
              }

              $(".individualItem").append(`<div id="${item.id}" class="menuItem"> ${item.name}<img src=${item.display_image} style="width:100px;height:100px;"/> Price: ${item.price} <br>Description: ${item.description} <br>Ingredients: ${item.ingredients}<div class="btn-group" role="group">
              <button type="button" class="btn btn-secondary1">-</button>
              <input type="number" id="quantity" name="quantity" placeholder="0" min="1">
              <button type="button" class="btn btn-secondary2">+</button>
              </div>
              <button type="button" class="btn btn-dark">Add to cart</button>
              </div>`)

            }

          })

        })
      })
    }
 })

 $(document).on("click", ".btn.btn-secondary1", function(){

 });

 $(document).on("click", ".btn.btn-secondary2", function(){
   let orderValue = $("#quantity").val()

  console.log(orderValue)
 });

 $(document).on("click", ".btn.btn-dark", function(){
  console.log("test")
 });

})









