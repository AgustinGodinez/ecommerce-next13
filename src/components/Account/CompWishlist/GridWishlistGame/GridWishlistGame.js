import Link from 'next/link';
import styles from './GridWishlistGame.module.scss'
import { ENV, fn } from '@/utils';
import { Label, WishlistIcon } from '@/components/Shared';
import { Image } from 'semantic-ui-react';

export default function GridWishlistGame({ wishlist,onReload }) {
  return (
    <div className={styles.gridGames}>
      {wishlist.map((item) => {
        const game = item.attributes.game.data;
        const cover = game.attributes.cover.data

        return (
          <div key={item.id} className={styles.game}>
            <Link href={`/${game.attributes.slug}`} >
              <div>
                <Image src={`${ENV.IMG}${cover.attributes.url}`} />
                {game.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${game.attributes.discount}%`}
                  </Label.Discount>
                )}
              </div>
              <div>
                <span>{game.attributes.title}</span>
                <span className={styles.price}>
                  ${fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}
                </span>
              </div>
            </Link>
            <WishlistIcon gameId={game.id} className={styles.wishlistIcon} onReload={onReload} />
          </div>
        )
      })}
    </div>
  )
}
