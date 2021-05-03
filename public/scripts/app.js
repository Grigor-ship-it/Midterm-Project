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

