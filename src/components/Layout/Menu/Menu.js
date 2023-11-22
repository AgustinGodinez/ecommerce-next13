import { useEffect, useState } from 'react'
import styles from './Menu.module.scss'
import { Platform, Game } from '@/api'
import Link from 'next/link'
import { Icon, Image, Input } from 'semantic-ui-react'
import classNames from 'classnames';
import { ENV } from '@/utils'
import { SearchComp } from './SearchComp'

const gameCtrl = new Game();
const platformCtrl = new Platform

export function Menu({ isOpenSearch }) {
    const [platforms, setPlatforms] = useState([])
    const [showSearch, setShowSearch] = useState(isOpenSearch)
    const [textSearch, setTextSearch] = useState('')
    const [games, setGames] = useState('')

    const openCloseSearch = () => setShowSearch((prevState) => !prevState)

    useEffect(() => {
        (async () => {
            try {
                const response = await platformCtrl.getAll()
                setPlatforms(response.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const game = await gameCtrl.searchGame(textSearch);
                setGames(game.data)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])


    return (
        <div className={styles.platforms}>
            {platforms.map(platform => (
                <Link key={platform.id} href={`/games/${platform.attributes.slug}`} >
                    <Image src={`${ENV.IMG}${platform.attributes.icon.data.attributes.url}`} style={{ filter: 'brightness(0) invert(1)' }} />
                    {platform.attributes.title}
                </Link>
            ))}

            <button className={styles.search} onClick={openCloseSearch}>
                <Icon name='search' />
            </button>

            <div className={classNames(styles.inputContainer, {
                [styles.active]: showSearch,
            })}
            >
                {/* search */}
                <SearchComp games={games} textSearch={textSearch} setTextSearch={setTextSearch} />
                <Icon name='angle right' className={styles.closeInput} onClick={openCloseSearch} />
            </div>
        </div>
    )
}