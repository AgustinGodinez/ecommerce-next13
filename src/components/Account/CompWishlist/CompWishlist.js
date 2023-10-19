import { WishList } from "@/api"
import { NoResult } from "@/components/Shared"
import { useAuth } from "@/hooks"
import { useEffect, useState } from "react"
import GridWishlistGame from "./GridWishlistGame/GridWishlistGame"

const wishlistCtrl = new WishList()

export function CompWishlist() {
  const [wishlist, setWishlist] = useState(null)
  const [reload, setReload] = useState(null)
  const { user } = useAuth()

  const onReload =()=>setReload((prevState)=>!prevState)

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.getAll(user.id)
        setWishlist(response);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [reload])

  if (!wishlist) return null

  return (wishlist.length ===0) ?(
    <NoResult text="No tienes ningun juego en la lista de deseos" />
  ):(
    <GridWishlistGame wishlist={wishlist}  onReload={onReload}/>
  )


}
