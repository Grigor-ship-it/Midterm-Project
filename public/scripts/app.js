$( document ).ready(function() {

   $("#menuItemsButton").click(function(event) {
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

