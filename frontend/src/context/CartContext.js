import { useContext, createContext, useReducer, useEffect } from "react";

export const cartConnectionContext = createContext()

export const useCartConnectionContext = () => {
    return useContext(cartConnectionContext)
}

export const cartReducer = (state, action) => {
    switch (action.type){
        case 'connect-cart':
           return { cart: action.payload }
        case 'disconnect-cart':
            return { cart: null }
        default: 
            return state
    }
}


export const CartConnectionProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: null
    })
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            dispatch({type: 'connect-cart', payload: cart})
        }
    }, [])
    return (
        <cartConnectionContext.Provider value={{...state, dispatch}}>
            { children }
        </cartConnectionContext.Provider>
    )
}