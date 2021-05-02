





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

})

