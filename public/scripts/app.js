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
    console.log('i clicked');
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
        if ($('.userInfo:hidden').length) {
          $('.userInfo').slideDown();
      } else $('.userInfo').slideUp();
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
            <button id="login" type="button" onclick="login()">Login</button>
        `)
        if ($('.loginFields:hidden').length) {
          $('.loginFields').slideDown();
      } else $('.loginFields').slideUp();
        // $('.loginFields').slideDown('fast');


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
    $('.registerFields').append(`
      <input type="text" id="username" placeholder="username" />
      <input type="password" id="password" placeholder="password" />
      <button id="login" type="button" onclick="register()">Register</button>
      `)
    if ($('.registerFields:hidden').length) {
      $('.registerFields').slideDown();
  } else $('.registerFields').slideUp();
  $.ajax({
    url: "/users",
    method: 'GET',
    success: (data) => {
    // $('.registerFields').slideDown('fast');
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
                console.log("hello")
              $(".individualItem").empty()
              }
              $(".individualItem").append(`<div id="${item.id}" class="menuItem"> ${item.name} Price: ${item.price} Description: ${item.description} Ingredients: ${item.ingredients}<img src=${item.display_image} style="width:100px;height:100px;"/></div>`)
            }
          })
        })
      })
    }
})







})

