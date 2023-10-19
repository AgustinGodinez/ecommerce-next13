import { Order } from "@/api"
import { useEffect, useState } from "react"
import { NoResult } from "../Shared"
import { useAuth } from "@/hooks"
import { ListOrder } from "./ListOrder/ListOrder"

const orderCtrl = new Order()

export function Orders() {
    const [orders, setOrders] = useState()
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const response = await orderCtrl.getAll(user.id)
                setOrders(response.data)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

    return (
        <div>
            {orders.map((order) => (
                <ListOrder key={order.id} order={order} />
            ))}
        </div>
    )
}
