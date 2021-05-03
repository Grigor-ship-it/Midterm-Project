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

  $("#userSettings").click(function(event) {
    $.ajax({
      url: "/users",
      method: "GET",
      success: (data) => {
        let users = data.users
        users.forEach(item => {
          $(".userName").append(`<div>${item.name}</div><button id='editUserSettings'>edit</button>`)
          $(".userEmail").append(`<div>${item.email}</div><button id='editUserSettings'>edit</button>`)
          $(".userFavourites").append(`<div>${item.favourites}</div><button id='editUserSettings'>edit</button>`)
          $(".userAllergens").append(`<div>${item.allergens}</div><button id='editUserSettings'>edit</button>`)
        })
      }
    })
  })

  $('#editUserSettings').click(function(event) {

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

