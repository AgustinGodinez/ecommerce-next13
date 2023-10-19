import { Game } from "@/api"
import { GridGames } from "@/components/Shared"
import { useEffect, useState } from "react"

const gameCtrl = new Game()
const limit = 3
const platformId = null
export function LatestGame({title, limit=9, platformId=null}) {
    const [games, setGames] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await gameCtrl.getLatestPublished({
                    limit,
                    platformId,
                })
                setGames(response.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    if(!games) return null

    return (
        <div>
            <h2>{title}</h2>
            <GridGames games ={games}/>
        </div>
    )
}
