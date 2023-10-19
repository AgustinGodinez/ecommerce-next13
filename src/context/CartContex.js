'use client'
import { Cart } from "@/api"
import { createContext, useEffect, useState } from "react"

const cartCtrl = new Cart()

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(cartCtrl.count())

    useEffect(() => {
        const response = cartCtrl.getAll()
        setCart(response);
    }, [])

    const addCart = (gameId) => {
        cartCtrl.add(gameId)
        refreshTotalCart()
    }

    const refreshTotalCart = () => {
        setTotal(cartCtrl.count())
        setCart(cartCtrl.getAll())
    }

    const changeQuantityItem = (gameId, quantity) => {
        cartCtrl.changeQuantity(gameId, quantity)
        refreshTotalCart()
    }

    const deleteItem = (gameId) => {
        cartCtrl.delete(gameId)
        refreshTotalCart()
    }

    const deleteAllItems =()=>{
        cartCtrl.deleteAll()
        refreshTotalCart()
    }

    const data = {
        cart,
        addCart,
        total,
        deleteItem,
        deleteAllItems,
        changeQuantityItem,
    }
    return (
        <CartContext.Provider value={data}>{children}</CartContext.Provider>
    )
}
