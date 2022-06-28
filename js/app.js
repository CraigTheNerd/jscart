//    ***********************************************************************************    //
//                                         jQuery                                            //
//    ***********************************************************************************    //

$(".add-to-cart").click(function(event){
    //  Prevent the default behaviour of the links
    event.preventDefault();

    //  Collect the name and the price
    //  This is each link
    //  attr() is each attribute of each link

    //  Get the name attribute
    let name = $(this).attr("data-name");

    //  Get the price attribute
    //  Returns the value as a string and we need it as a number
    //  var price = $(this).attr('data-price');

    //  So we wrap this is the Number() function which will convert the string to a number
    let price = Number($(this).attr("data-price"));

    //  Now we can call our addItemToCart() function and pass a count of 1
    //  The name and price comes from the variables above collected in the click event
    //  Generated from the data-attribute in the URL
    //  We pass the count as 1 for each click so that each time you click, 1 of each product
    //  is add to the cart
    shoppingCart.addItemToCart(name, price, 1);
    //  Display the item in the cart
    displayCart();

});

//  Clear Cart
$('#clear-cart').click(function(event){
    shoppingCart.clearCart();
    displayCart();
});

function displayCart() {
    //  Get the array from listCart()
    let cartArray = shoppingCart.listCart();

    //  A string that the cart can display
    //  Empty string
    let output = '';

    if (cartArray.length === 0) {
        output = '<li>Cart Empty</li>';
    } else {
        for(let i in cartArray) {
            //  Append (add to the end of)
            output += "<li>"
                +"<span id=\'eachCount\'>"
                +cartArray[i].count
                +"</span> <span id=\'eachProduct\'>"
                +cartArray[i].name
                +"</span> <span id=\'eachPrice\'>R "
                +cartArray[i].price
                +"</span><span id=\'eachTotal\'>R "
                +cartArray[i].total
                +" <button id='cartItemDelete' data-name='"+cartArray[i].name+"'>delete</button> <button id='cartItemDecrease' data-name='"+cartArray[i].name+"'>-</button> <span id='cartItemNumberInput'><input placeholder='1' class='cartItemNumberInputField' type='number' data-name='"+cartArray[i].name+"' value='"+cartArray[i].count+"' min='1'></span> <button id='cartItemIncrease' data-name='"+cartArray[i].name+"' data-price='"+cartArray[i].price+"'>+</button>"+ "</span></li>";
        }
    }
    // #cartItemNumberInput  .cartItemNumberInput
    //  Output to HTML
    $("#show-cart").html(output);
    $("#total-cart").html(shoppingCart.totalCart().toFixed(2));
    $("#total-cart-vat").html(shoppingCart.vatTotal().toFixed(2));
    $("#total-cart-full").html(shoppingCart.checkoutTotal().toFixed(2));

    if (shoppingCart.countCart() === 0) {
        $("#cart-items").html(shoppingCart.countCart()+" Items");
    } else if (shoppingCart.countCart() === 1) {
        $("#cart-items").html(shoppingCart.countCart()+" Item");
    } else {
        $("#cart-items").html(shoppingCart.countCart()+" Items");
    }
}

$("#show-cart").on("click", "#cartItemDelete", function (event){
    let name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});

$("#show-cart").on("click", "#cartItemDecrease", function (event){
    let name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", "#cartItemIncrease", function (event){
    let name = $(this).attr("data-name");
    let price = $(this).attr("data-price");
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

$("#show-cart").on("change", ".cartItemNumberInputField", function(event){
    let name = $(this).attr("data-name");
    let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});




displayCart();