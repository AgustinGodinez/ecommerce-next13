import { Icon } from 'semantic-ui-react'
import styles from './WishlistIcon.module.scss'
import classNames from 'classnames'
import { WishList } from '@/api'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks'

const wishListCtrl = new WishList()

export function WishlistIcon({ gameId, className,onReload }) {

  const [hasWishList, setHasWishList] = useState(null)
  const { user } = useAuth()


  useEffect(() => {
    (async () => {
      try {
        const response = await wishListCtrl.check(user.id, gameId)
        setHasWishList(response);
      } catch (error) {
        setHasWishList(false)
        console.log(error);
      }
    })()
  }, [gameId])

  const addWishList = async () => {
    const response = await wishListCtrl.add(user.id, gameId)
    setHasWishList(response)
  }
  const deleteWishList = async () => {
    try {
      await wishListCtrl.delete(hasWishList.id)
      setHasWishList(false)
      if(onReload) onReload()
    } catch (error) {
      console.log(error);
    }
  }

  if (hasWishList === null) return null

  return (
    <Icon name={hasWishList ? 'heart' : 'heart outline'} onClick={hasWishList ? deleteWishList : addWishList} className={classNames(styles.wishlistIcon, {
      [className]: className,
    })} />
  )
}
