import {
    FRUITS_LOADED,
    VEGETABLES_LOADED,
    ADD_ITEM,
    REMOVE_ITEM,
    EMPTY_CART,
    ORDER_PLACED,
    ERROR,
    RESET,
} from "../constants/index";
import { generateCartDetails } from "../utils/index";

/**
 * Action creator that uses redux-thunk to fetch the fruits
 * @returns an action to save the fruits in the store
 */
export function getFruits() {
    return function (dispatch) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        return fetch("http://127.0.0.1:8000/shopping_api/loadFruits", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                dispatch({ type: FRUITS_LOADED, payload: jsonResponse });
            });
    };
}

/**
 * Action creator that uses redux-thunk to fetch the vegetables
 * @returns an action to save the vegetables in the store
 */
export function getVeggies() {
    return function (dispatch) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        return fetch("http://127.0.0.1:8000/shopping_api/loadVeggies", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                dispatch({ type: VEGETABLES_LOADED, payload: jsonResponse });
            });
    };
}

/**
 * Action creator to trigger adding item to the cart
 * @param {*} payload - contains the item to be added
 * @returns an action to add
 */
export function addItem(payload) {
    return { type: ADD_ITEM, payload };
}

/**
 * Action creator to trigger removing item from the cart
 * @param {*} payload - contains the item to be removed
 * @returns an action to remove
 */
export function removeItem(payload) {
    //payload should be just product Id
    return { type: REMOVE_ITEM, payload };
}

/**
 * Action creator to empty the cart
 * @returns an action notifying the reducer to empty the cart in the store
 */
export function emptyCart() {
    return { type: EMPTY_CART };
}

/**
 * Action creator that uses redux-thunk to place an order
 * @param {*} payload - consists of the order details
 * @returns an action informing the reducer that the order is placed or an error occured
 */
export function placeOrder(payload) {
    // payload = {userId, cart, total}
    var cartDetails = generateCartDetails(payload.cart);

    return function (dispatch) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: payload.userId,
                total: payload.total,
                cart_details: cartDetails,
            }),
        };

        return fetch("http://127.0.0.1:8000/shopping_api/saveOrder", requestOptions).then(
            (jsonResponse) => {
                if (jsonResponse.status === 200) dispatch({ type: ORDER_PLACED });
                else dispatch({ type: ERROR });
            }
        );
    };
}

/**
 * Action creator to reset the cart and order status after placing an order
 * @returns an action notifying the reducer to reset the cart in the store
 */
export function reset() {
    return { type: RESET };
}
