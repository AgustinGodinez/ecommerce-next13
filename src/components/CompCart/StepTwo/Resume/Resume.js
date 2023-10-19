import { useEffect, useState } from 'react'
import styles from './Resume.module.scss'
import { fn } from '@/utils'
import { Button } from 'semantic-ui-react';
import { usePathname, useRouter } from 'next/navigation';
import { Cart } from '@/api';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuth, useCart } from '@/hooks';

const cartCtrl = new Cart();

export function Resume({ games, addressSelected }) {
    const router = useRouter();
    const pathname = usePathname();
    const stripe = useStripe();
    const elements = useElements()
    const { user } = useAuth()
    const {deleteAllItems}= useCart()

    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        let totalTemp = 0
        games.forEach(game => {
            const price = fn.calcDiscountedPrice(
                game.attributes.price,
                game.attributes.discount,
            )
            totalTemp += price * game.quantity
        });
        setTotal(totalTemp.toFixed(2))
    }, [games])

    const onPay = async () => {
        setLoading(true)
        if(!stripe || !elements ){
            setLoading(false)
            return
        }

        const cartElement = elements.getElement(CardElement)
        const result = await stripe.createToken(cartElement)
        if(result.error){
            console.error(result.error.message);
        }else{
            const response = await cartCtrl.paymentCart(
                result.token,
                games,
                user.id,
                addressSelected
            );
            if(response.status ===200){
                setLoading(false)
                deleteAllItems()
                goToStepEnd()
            }else{
                console.error("Error al realizar el pedido");
            }
        }


        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const goToStepEnd = () => {
        router.replace(`${pathname}?step=3`)

    }

    if (!total) return null

    return (
        <div className={styles.resume}>
            <h2>Resume</h2>
            <div className={styles.block}>
                <div className={styles.products} >
                    {games.map((game) => (
                        <div key={game.id} className={styles.product} >
                            <div>
                                <p>{game.attributes.title}</p>
                                <span>{game.attributes.platform.data.attributes.title}</span>
                            </div>
                            <span>
                                {game.quantity > 0 && `${game.quantity}x`}
                                ${fn.calcDiscountedPrice(
                                    game.attributes.price,
                                    game.attributes.discount,
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.blockTotal}>
                <div>
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <Button primary fluid disabled={!addressSelected} onClick={onPay} loading={loading}>
                    Pagar
                </Button>
            </div>
        </div>
    )
}
