import { Button, Container, Icon, Image } from 'semantic-ui-react'
import styles from './Panel.module.scss'
import { ENV, fn } from '@/utils'
import { WishlistIcon } from '@/components/Shared'
import { useCart } from '@/hooks'
import { useState } from 'react'

export function Panel({ gameId, game }) {
    const { addCart } = useCart()
    const [loading, setLoading] = useState(false)

    const platform = game.platform.data
    const buyPrice = fn.calcDiscountedPrice(game.price, game.discount)

    const addCartWrapper = () => {
        setLoading(true)
        addCart(gameId)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    return (
        <Container className={styles.panel}>
            <div className={styles.imgContainer}>
                <Image src={`${ENV.IMG}${game.cover.data.attributes.url}`} />
            </div>
            <div className={styles.actionsContainer}>
                <div>
                    <h2>{game.title}</h2>
                    <div className={styles.moreIngo}>
                        <span>
                            <Image src={`${ENV.IMG}${platform.attributes.icon.data.attributes.url}`} />
                            {platform.attributes.title}
                        </span>
                        <span>
                            <Icon name='check' />
                            En stock
                        </span>
                    </div>
                    <div className={styles.price}>
                        {game.discount > 0 && (
                            <>
                                <span className={styles.originPrice}>
                                    <Icon name='tag' /> {game.price}
                                </span>
                                <span className={styles.discount}>
                                    -{game.discount}%
                                </span>
                            </>
                        )}
                        <span className={styles.price}>${buyPrice}</span>
                    </div>
                    <Button primary fluid onClick={addCartWrapper} loading={loading}>
                        Agregar Al Carrito
                    </Button>
                    <WishlistIcon gameId={gameId} className={styles.heart} />
                </div>
            </div>
        </Container>
    )
}
