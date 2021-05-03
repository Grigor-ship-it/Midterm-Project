$( document ).ready(function() {

  //  $("#menuItemsButton").click(function(event) {
  //   $.ajax({
  //     url: "/menu",
  //     method: "GET",
  //     success: (data) => {
  //       let menuItems = data.menuItems
  //       menuItems.forEach(item => {
  //         $(".menu-listed-items").append(`<div class="menu-item">${item.name}</div>`)
  //       })
  //     }
  //   })
  //  })

   $.ajax({
    url: "/menu",
    method: "GET",
    success: (data) => {
      let menuItems = data.menuItems
      menuItems.forEach(item => {
        $(".menu-listed-items").append(`
        <div id="${item.id}" class="menuItem"> <img src=${item.display_image} style="width:100px;height:100px;"/>${item.name}
        </div>
        <button type="button" id="${item.id}-btn"class="btn btn-primary">
          Add to Cart
        </button>
        `)
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
        // orders function
        $(`#${item.id}-btn`).click(function(event) {
          console.log('button clicked');
         $.ajax({
           url: "/orders",
           method: "GET",
           success: (data) => {
             console.log(data);
            $(".page-header").append(`<div class="menu-item">${data}</div>`)
             let orders = data.orders
             console.log(orders);
            //  orders.forEach(order => {
            //    $(".cart").append(`<div class="menu-item">hello</div>`)
            //  })
           }
          })
        })
      })


    }
 })




})

