import { useEffect, useState } from 'react'
import styles from './ListAddresses.module.scss'
import { Address } from '@/api'
import { useAuth } from '@/hooks'
import { Addresshijo } from './Addresshijo/Addresshijo'

const addressCtrl = new Address()

export function ListAddresses({reload, onReload}) {

    const [addresses, setAddresses] = useState(null)
    const { user } = useAuth()
    useEffect(() => {
        (async () => {
            try {
                const response = await addressCtrl.getAll(user.id)
                setAddresses(response.data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [reload])

    if (!addresses) return null

    return (
        <div className={styles.addresses}>
            {addresses.map((address)=>(
                <Addresshijo key={address.id} addressId={address.id} address={address.attributes} onReload={onReload} />
            ))}
        </div>
    )
}
