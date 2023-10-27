import { useEffect, useState } from 'react'
import styles from './Menu.module.scss'
import { Platform } from '@/api'
import Link from 'next/link'
import { Icon, Image, Input } from 'semantic-ui-react'
import classNames from 'classnames';
import { ENV } from '@/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const platformCtrl = new Platform

export function Menu({ isOpenSearch }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [platforms, setPlatforms] = useState([])
    const [showSearch, setShowSearch] = useState(isOpenSearch)
    const [searchText, setSearchText] = useState("")



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
        const url= searchParams.get("s")
        setSearchText(url || '')
    }, [])
    

    const onSearch=(text)=>{
        setSearchText(text)
        router.push(`/search?s=${text}`)
    }

    return (
        <div className={styles.platforms}>
            {platforms.map(platform => (
                <Link key={platform.id} href={`/games/${platform.attributes.slug}`} >
                    <Image src={`${ENV.IMG}${platform.attributes.icon.data.attributes.url}`} />
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
                <Input id="search-games" placeholder="Buscador" className={styles.input} focus={true} value={searchText} onChange={(_, data)=> onSearch(data.value)} />
                <Icon name='close' className={styles.closeInput} onClick={openCloseSearch} />
            </div>
        </div>
    )
}
