class CartDetails {
    itemId = -1;
    quantity = 0;
    calcPrice = 0;

    constructor(itemId, quantity, calcPrice) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.calcPrice = calcPrice;
    }
}

/**
 * Function to generate cart details from the cart to be stored in the server
 * @param {*} cart - contains the products added to the cart
 * @returns a list of cart items in the format suitable for the server call
 */
export function generateCartDetails(cart) {
    let cartDetails = [];
    for (var i = 0; i < cart.length; i++) {
        cartDetails.push(
            new CartDetails(cart[i].id, cart[i].quantity, cart[i].price * cart[i].quantity)
        );
    }
    return cartDetails;
}

/**
 * Function to fetch the date without the time
 * @param {*} dateString - date containing time
 * @returns date without the time
 */
export function getDate(dateString) {
    var date = new Date(dateString);
    return date.toString().substring(0, 15);
}
