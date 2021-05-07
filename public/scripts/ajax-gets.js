const displayMenuItems = function() {

  $("#menuItemsButton").on('click', function() {
  $.ajax({
    url: "/menu",
    method: "GET",
    success: (data) => {
      const menuItems = data.menuItems;
      menuItems.forEach(item => {
        $(".menu-listed-items").append(`<div class="menu-item">${item.name}</div>`);
      })
    }
  })
})
}

const displayUserInfoMenu = function() {$("#user-slide-down").on('click',() => {
  $.ajax({
    url: "/users",
    method: "GET",
    success: (data) => {
      let users = data.users[0];
      $(".userInfo").empty();
      $(".userInfo").append(`<h5>name</h5><li><a href='#'>${users.name}</a></li>`);
      $(".userInfo").append(`<h5>email</h5><li><a href='#'>${users.email}</a></li>`);
      $(".userInfo").append(`<h5>favourite</h5><li><a href='#'>${users.favourites}</a></li>`);
      $(".userInfo").append(`<h5>allergens</h5><li><a href='#'>${users.allergens}</a></li>`);
      $('.userInfo').toggle('fast');
    }
  })
})
}

const userLoginValidation = function() {$(document).on("click", "#login", function(){
  $.ajax({
    url: '/users',
    method: 'GET',
    success: (data) => {
      if ($('#usernameL').val() === data.users[0].email && $('#passwordL').val() === data.users[0].password) {
        $(".register").hide();
        $(".login").hide();
        $('.loginFields').hide();
        $('.registerFields').hide();
        $(".logout").show();
      }
    }
  })
})
}

const startTimer = () =>{
  $.ajax({
    url: '/orders/timestamp',
    method: 'GET',
    success: (data) => {
      let timeOrdered = Date.parse(data.orders[0].order_time);
      let orderFinish = Date.parse(data.orders[0].finish_time);
      let countDown   = orderFinish - timeOrdered;
      let minutes     = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      let seconds     = Math.floor((countDown % (1000 * 60)) / 1000);

      const intervalID = setInterval(function() {
        if (seconds <= 0) {
          minutes --;
          seconds = 60
        }
        seconds--;
        if (seconds <= 9) {
          $('#seconds').html(`<span class='timeStyle'>${minutes}:0${seconds}</span>`);
        } else {
          $('#seconds').html(`<span class='timeStyle'>${minutes}:${seconds}</span>`);
        }

        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalID);
          $('#time').html(`<div> TIME FOR PICKUP </div>`);
        }
      },1000);
    }
  });
}



