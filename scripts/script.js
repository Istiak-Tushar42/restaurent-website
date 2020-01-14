$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

function increment(itemWithOutSpace) {
  let value = document.getElementById(itemWithOutSpace).innerHTML;
  value = Number(value);
  value++;
  document.getElementById(itemWithOutSpace).innerHTML = value;
}

function decrement(itemWithOutSpace) {
  let value = document.getElementById(itemWithOutSpace).innerHTML;
  value = Number(value);
  value--;

  if(value == 0) {
    document.getElementById('single_order').style.visibility = 'hidden';
    document.getElementById('order_plate').innerHTML = 'You haven’t added anything to your cart yet! Start adding your favourite dishes';
  } else {
    document.getElementById(itemWithOutSpace).innerHTML = value;
  }
}

var orderFunctionCounter = 0;
function order(name, price) {
  orderFunctionCounter++;
  let itemName = document.getElementById(name).textContent;
  let itemPrice = document.getElementById(price).textContent;
  let itemWithOutSpace = itemName.replace(/\s/g,'');
  let saperator = `
                <div class="d-flex justify-content-between py-3" id="single_order">
                  <div class="text-danger">
                    <i class="fas fa-minus" id="minus" onclick="decrement('${itemWithOutSpace}')"></i>
                    <span id="${itemWithOutSpace}">1</span>
                    <i class="fas fa-plus" id="plus" onclick="increment('${itemWithOutSpace}')"></i> <span>${itemName}</span>
                  </div>
                  <div class="text-primary">
                    BDT ${itemPrice}
                  </div>
              </div>
  `;
  let defaultText = 'You haven\’t added anything to your cart yet! Start adding your favourite dishes';
  let orderPlateText = document.getElementById('order_plate').innerHTML;

  if(defaultText == orderPlateText || orderFunctionCounter == 1) {
    console.log(true);
    document.getElementById('order_plate').innerHTML = saperator;
  } else {
    console.log(false)
    document.getElementById('order_plate').innerHTML += saperator;
  }
}