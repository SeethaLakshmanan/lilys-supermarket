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

const initialState = {
    fruits: [],
    vegetables: [],
    cart: [],
    orderStatus: "",
};

function marketReducer(state = initialState, action) {
    if (action.type === FRUITS_LOADED) {
        return Object.assign({}, state, {
            // replacing state.fruits with the list of fruits we get from server
            fruits: action.payload,
        });
    }

    if (action.type === VEGETABLES_LOADED) {
        return Object.assign({}, state, {
            // replacing state.vegetables with the list of vegetables we get from server
            vegetables: action.payload,
        });
    }

    if (action.type === ADD_ITEM) {
        // payload = product
        var cart = [...state.cart];
        var id = action.payload.product.id;

        // loop thru cart
        var cartItemIndex = null;
        for (let i = 0; i < cart.length; i++) {
            // if cartItem, then add quantity
            if (cart[i].id === id) {
                cart[i].quantity += 1;
                cartItemIndex = i;
                break;
            }
        }
        // else add cartItem
        if (cartItemIndex === null) {
            var p = action.payload.product;
            cart.push({ id: id, category: p.category, price: p.price, name: p.name, quantity: 1 });
        }

        return { ...state, cart: cart };
    }

    if (action.type === REMOVE_ITEM) {
        // payload = product
        var cart1 = [...state.cart];
        var id1 = action.payload.id;

        // loop thru cart
        var i = 0;
        for (i = 0; i < cart1.length; i++) {
            // if cartItem, then reduce quantity
            if (cart1[i].id === id1) {
                cart1[i].quantity -= 1;
                break;
            }
        }

        // for the index where cartItem quantity was reduced, check if
        // quantity is now 0, if so, remove from cart
        if (cart1[i].quantity === 0) cart1.splice(i, 1);

        return { ...state, cart: cart1 };
    }

    if (action.type === EMPTY_CART) {
        return { ...state, cart: [] };
    }

    if (action.type === ORDER_PLACED) {
        return { ...state, orderStatus: ORDER_PLACED };
    }

    if (action.type === ERROR) {
        return { ...state, orderStatus: ERROR };
    }

    if (action.type === RESET) {
        return { ...state, cart: [], orderStatus: "" };
    }

    return state;
}

export default marketReducer;
