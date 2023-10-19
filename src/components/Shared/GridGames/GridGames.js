import Link from 'next/link';
import styles from './GridGames.module.scss'
import { ENV, fn } from '@/utils';
import { Label } from '../Label';

export function GridGames({ games }) {
    return (
        <div className={styles.gridGames}>
            {games.map((game) => (
                <Link key={game.id} href={`/${game.attributes.slug}`} className={styles.game}>
                    <div>
                        <img src={`${ENV.IMG}${game.attributes.cover.data.attributes.url}`} />
                        {game.attributes.discount > 0 && (
                            <Label.Discount className={styles.discount}>
                                {`-${game.attributes.discount}`}
                            </Label.Discount>
                        )}
                    </div>
                    <div>
                        <span>{game.attributes.title}</span>
                        {game.attributes.discount > 0 ? (
                                <span className={styles.pricen}>
                                   De: ${game.attributes.price.toFixed(2)} A ${fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}
                                </span>
                        ):
                        <span className={styles.pricen}>
                        De: ${game.attributes.price.toFixed(2)}
                     </span>
                        }

                    </div>
                </Link>
            ))}

        </div>
    )
}
