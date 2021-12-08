import React,{ useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState ={
    items : [],
    totalAmount: 0
}
const cartReducer = (state,action) =>{
    if(action == 'ADD'){
        const updatedItems = state.items.concate(state.item);
        const updatedTotalAmount = state.totalAmount + state.item.price * state.item.amount;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    return defaultCartState
}

function CartProvider(props) {
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemToCartHaldler = (item) => {
        dispatchCartAction({action:'Add',item:item});
    } 

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({action:'REMOVE',id:id});
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHaldler,
        removeItem:removeItemFromCartHandler,

    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;