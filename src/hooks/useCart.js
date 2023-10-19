import { CartContext } from "@/context/CartContex";
import { useContext } from "react";


export const useCart = () => useContext(CartContext)
