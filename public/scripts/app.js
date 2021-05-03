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

  $(".fas").on('click', () => {
    $.ajax({
      url: "/users",
      method: "GET",
      success: (data) => {
        let users = data.users[1];

          $(".userInfo").append(`<div>${users.name}</div><button id='editUserSettings'>edit</button>`)
          $(".userInfo").append(`<div>${users.email}</div><button id='editUserSettings'>edit</button>`)
          $(".userInfo").append(`<div>${users.favourites}</div><button id='editUserSettings'>edit</button>`)
          $(".userInfo").append(`<div>${users.allergens}</div><button id='editUserSettings'>edit</button>`)
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
        $(".menu").append(`<div class=${item.id}> <img src=${item.display_image} style="width:100px;height:100px;">${item.name}</div>`)
      })
    }
})

  /* $(`.${item.id}`).click(function(event) {
    $.ajax({
      url: "/menu",
      method: "GET",
      success: (data) => {
        let menuItems = data.menuItems
        menuItems.forEach(item => {
          $(".menu").append(`<div>${item.name}</div>`)
        })
      }
    })
  })*/






})

