//    ***********************************************************************************    //
//                                    Module Structure                                       //
//    ***********************************************************************************    //
//         //  Closures
//         let fn = function () {
//             let cart = [];
//             let obj = {};
//             obj.publicMethod = function() {
//                 console.log(cart.length);
//             }
//             return obj;
//         }

//    ***********************************************************************************    //
//                                 Shopping Cart Functions                                   //
//    ***********************************************************************************    //

//  Main Shopping Cart Object - which is a function

//  Actually, it's a Closure

//  This means that we can protect our code and not expose all our methods and properties publicly

//  This will be our module
//  The parenthesis around function(){} and after the curly braces {} means that the variable
//  shoppingCart is a self executing function.
//  It's like a bootstrap or runtime function that executes itself when Javascript first loads.
let shoppingCart = (function () {
//    ***********************************************************************************    //
//                                         PRIVATE                                           //
//    ***********************************************************************************    //
    //  cart    :   Array
    //  Main Cart Array - Starts as empty array
    //  This is defined as a private property since it does not have the shoppingCart variable,
    //  before it.
    //  Yes the outer closure function can access it but, the outer function returns an object.
    //  In the obj we can decide what we want to pass to it!
    //  Everything defined as a variable with let or const will be private!
    let cart = [];

    //  Item    :   Object/Class
    //  New Cart Item class
    function Item(name, price, count) {
        //  Item Properties
        this.name = name
        this.price = price
        this.count = count
    }

    //  saveCart                :   Function
    //  Save the cart to local storage
    function saveCart() {
        //  Convert cart array to JSON string
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    //  loadCart                :   Function
    //  Load the cart from local storage
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    loadCart();


//    ***********************************************************************************    //
//                                         PUBLIC                                            //
//    ***********************************************************************************    //
    //  This is the public object that the closure returns.
    //  We can define what we call on from the private properties and methods and what is
    //  publicly accessible.
    //  Everything attached to obj will be public
    let obj = {};

    //  addItemToCart           :   Function
    //  Add item to cart
    //  Public Method
    obj.addItemToCart = function(name, price, count) {
        //  Get all items in the cart
        for (let i in cart) {
            //  If the new item is in the cart
            if (cart[i].name === name) {
                //  Do not add the item as a new item rather increase the item count
                cart[i].count += count;
                //  saveCart() is a private method
                saveCart();
                //  Exit the code block
                return;
            }
        }
        //  If the item is not in the cart create the new item
        //  Refers to our Private Class
        let item = new Item(name, price, count);

        //  Add the item to the cart
        if(cart === null) {
            localStorage.setItem('shoppingCart', JSON.stringify(cart = []));
            cart.push(item);
            //  saveCart() is a private method
            saveCart();
        } else {
            cart.push(item);
            //  saveCart() is a private method
            saveCart();
        }
    };

    obj.setCountForItem = function(name, count) {
        //  Loop over cart
        for (let i in cart) {
            //  If we find a match on name
            if (cart[i].name === name) {
                //  Set the count to count
                cart[i].count = count;
                //  Stop looping since a name was matched and the count was set
                break;
            }
        }
        //  Save the cart once the loop has done it's work
        saveCart();
    };

    //  removeItemFromCart      :   Function
    //  Remove ONE counts of a single item from the cart
    obj.removeItemFromCart = function(name) {
        //  Get all the items currently in the cart
        for (let i in cart) {
            //  If the requested item is in the cart
            if (cart[i].name === name) {
                //  Remove one of the item
                cart[i].count --;
                //  Once the item has been removed, we can stop looping

                //  If the item count is 1
                //  Remove the item from the cart completely
                if (cart[i].count === 0) {
                    //
                    cart.splice(i, 1);
                    // removeItemFromCartAll(name);
                }
                break;
            }
        }
        saveCart();
    };

    //  removeItemFromCartAll   :   Function
    //  Remove all counts of a certain item from the cart
    obj.removeItemFromCartAll = function(name) {
        //  Check what we have in the cart
        for (let i in cart) {
            //  Check what is being requested to be removed
            if (cart[i].name === name) {
                cart.splice(i, 1);
                //  Once removed stop the operation as task has been completed!
                break;
            }
        }
        saveCart();
    };

    //  clearCart               :   Function
    //  Clears the Cart of all counts of all items
    obj.clearCart = function() {
        cart = [];
        saveCart();
    };

    //  countCart               :   Function
    //  Check the total number of items in the cart
    obj.countCart = function() {
        //  First initialise the count
        let totalCount = 0;

        //  Check the items in the cart
        for (let i in cart) {
            //  Keep adding to the value of the total count
            totalCount += cart[i].count;
        }

        //  Return the value of the total number of items
        return totalCount;
    };

    //  totalCart               :   Function
    //  Get the total cost of all items in the cart
    obj.totalCart = function() {
        //  First initialise the cost as 0
        let totalCost = 0;

        //  Check the items in the cart
        for (let i in cart) {
            //  Keep adding to the value of the total count
            totalCost += cart[i].price * cart[i].count;
        }

        //  Return the value of the total number of items
        return totalCost;
    };

    //  listCart                :   Function
    //  List the items in the cart
    obj.listCart = function() {
        //  Original cart
        //  We do not want to return this
        //  We want to copy the cart with all objects

        //  New empty array
        let cartCopy = [];

        //  Loop over cart array to get each object in the cart array
        for (let i in cart) {
            //  Save each object in the cart as item using the variable i
            //  i is each product object
            //  Global variable - not in shoppingCart object
            let item = cart[i];

            //  Create a new empty object
            //  Global variable - not in shoppingCart object
            let itemCopy = {};

            //  Loop over each product object in the cart array to obtain each object's properties
            //  p is each property of each object
            //  Global variable - not in shoppingCart object
            for (let p in item) {
                //  item[p] is each property of each object
                //  itemCopy is a copy of each one of those properties
                //  These items here are global variables
                //  They should not be referred to with 'this.'
                itemCopy[p] = item[p];
            }
            //  New Property
            //  We're creating a new property called total
            //  Which is a new property on each copy of the items in the cart
            //  We're simply multiplying the price * the count to get the total
            itemCopy.total = (item.price * item.count).toFixed(2);

            //  Push each copied item object with properties into the new cartCopy array
            //  This time we're pushing it with our new total property
            cartCopy.push(itemCopy);
        }
        //  Return the new copied array and work with that
        //  Original cart array stays in tact
        //  Here we then return the cart with our new total property
        return cartCopy;
    };

    //  vatTotal                :   Function
    obj.vatTotal = function() {
        //  Calculate the sub total plus VAT to get a full checkout total
        let vat = 0;
        let vatRate = 0.15;
        vat = this.totalCart() * vatRate;
        return vat;
    };

    //  checkoutTotal           :   Function
    obj.checkoutTotal = function() {
        let finalTotal = 0;
        finalTotal = this.totalCart() + this.vatTotal();
        return finalTotal;
    };

//    ***********************************************************************************    //
//                                         RETURN                                            //
//    ***********************************************************************************    //
    return obj;
})();