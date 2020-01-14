let cartFood = [];
let cartPrice = [];
let cartQuantity = [];
const defaultString = `
<p class="text-muted">
    You haven’t added anything to your cart yet!
    <br>
    Start adding your favourite dishes
</p>
`;
document.getElementById('cartPlate').innerHTML = defaultString;
document.getElementById('subTotal').innerHTML = '0.00';
document.getElementById('totalPrice').innerHTML = '0.00';



function addToCart(itemName) {
    const child = document.getElementById(itemName).childNodes;
    let name = child[1].textContent;
    let price = child[5].textContent;

    price = price.split(' ');
    price = parseFloat(price[1]);

    if(cartFood.indexOf(name) === -1) {
        cartFood.push(name);
        cartPrice.push(price);
        cartQuantity.push(1);
    } else {
        let index = cartFood.indexOf(name);
        cartPrice[index] += price;
        cartQuantity[index] += 1;
    }
    cartView();
}

// FOR VIEW
function cartView() {
    if(cartFood.length == 0) {
        document.getElementById('cartPlate').innerHTML = defaultString;
        let subTotal = 0;
        let totalPrice = 0;
        document.getElementById("subTotal").innerHTML = subTotal.toFixed(2);   
        document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);   
    } else {
        document.getElementById('cartPlate').innerHTML = itemView();
        let subTotal = cartPrice.reduce(subTotalFunction);
        const vatPercent = 0.08;
        // const deliveryCharge = 50;
        let totalVat = subTotal * vatPercent;
        let totalPrice = subTotal + totalVat /*+ deliveryCharge*/;
        document.getElementById("subTotal").innerHTML = subTotal.toFixed(2);
        document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);
    }

}

function subTotalFunction(total, num) {
    return total + num;
}

// FOR ITEM VIEW
function itemView() {
    let string = '';
    for(i = 0; i < cartFood.length; i++) {
        string += `<tr>
                        <td class="minus" onclick="minus('${cartFood[i]}')"><i class="fas fa-minus"></i></td>
                        <td>${cartQuantity[i]}</td>
                        <td class="plus" onclick="plus('${cartFood[i]}')"><i class="fas fa-plus"></i></td>
                        <td>${cartFood[i]}</td>
                        <td><span>BDT</span> <span>${cartPrice[i].toFixed(2)}</span></td>
                    </tr>`;
}

    return string;
}

// FOR INCREMENT
function plus(itemName) {
    let index = cartFood.indexOf(itemName);
    cartPrice[index] += cartPrice[index] / cartQuantity[index];
    cartQuantity[index] += 1;
    cartView();
}

// FOR DECREMENT
function minus(itemName) {
    let index = cartFood.indexOf(itemName);
    cartPrice[index] -= cartPrice[index] / cartQuantity[index];
    cartQuantity[index] -= 1;

    for(i = 0; i < cartFood.length; i++) {
        if(cartQuantity[i] == 0) {
            cartFood.splice(index, 1);
            cartPrice.splice(index, 1);
            cartQuantity.splice(index, 1);
        }
    }

    cartView();
}