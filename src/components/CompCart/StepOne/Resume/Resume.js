import { usePathname, useRouter, } from 'next/navigation'
import styles from './Resume.module.scss'
import { useEffect, useState } from 'react'
import { fn } from '@/utils'
import { Button } from 'semantic-ui-react'
import Link from 'next/link'

export function Resume({ games }) {
    const router = useRouter()
    const pathname = usePathname()

    const [totals, setTotals] = useState(null)

    useEffect(() => {
        let totals = {
            original: 0,
            discount: 0,
            price: 0,
        }

        games.forEach(game => {
            const price = fn.calcDiscountedPrice(
                game.attributes.price,
                game.attributes.discount,
            )
            totals = {
                original: totals.original + game.attributes.price * game.quantity,
                discount: totals.discount + (game.attributes.price - price) * game.quantity,
                price: totals.price + price * game.quantity,
            }
        });
        setTotals(totals)
    }, [games])

    const goToStepTwo = () => {
        router.replace(`${pathname}?step=2`)
    }

    if (!totals) return null

    console.log(games.length);

    return (
        <div className={styles.resume} >
            <h2>Resume</h2>
            <div className={styles.block}>
                <div className={styles.prices} >
                    <div>
                        <span>Precio oficial</span>
                        <span>${totals.original.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Descuento</span>
                        <span>${totals.discount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>${totals.price.toFixed(2)}</span>
                    </div>
                </div>
                <Button primary fluid onClick={goToStepTwo} disabled={games.length===0}>
                    Proceder con el pago
                </Button>
                <Link href='/' >Continuar Comprando</Link>
            </div>
        </div>
    )
}
