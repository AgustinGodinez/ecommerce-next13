'use client'
import { Game } from "@/api"
import { CompCart } from "@/components/CompCart"
import { useCart } from "@/hooks"
import CartLayout from "@/layouts/CartLayout/CartLayout"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"

const gameCtrol = new Game()

export default function page() {
    const searchParams = useSearchParams()
    const currentStep = Number(searchParams.get('step') ?? 1)// default value is "1"

    const [games, setGames] = useState(null)
    const { cart } = useCart()

    useEffect(() => {
        (async () => {
            try {
                const data = [];
                for await (const item of cart) {
                    const response = await gameCtrol.getGameById(item.id)
                    data.push({ ...response.data, quantity: item.quantity })
                }
                setGames(data)
            } catch (error) {
                console.error(error);
            }
        })()

    }, [cart])

    if (!games) return null
    return (
        <CartLayout>
            {currentStep === 1 && <CompCart.StepOne games={games} />}
            {currentStep === 2 && <CompCart.StepTwo games={games} />}
            {currentStep === 3 && <CompCart.StepThree/> }
        </CartLayout>
    )
}
