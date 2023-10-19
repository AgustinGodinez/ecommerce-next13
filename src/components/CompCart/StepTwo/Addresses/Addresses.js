import { Address } from '@/api'
import styles from './Addresses.module.scss'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks'
import classNames from 'classnames'

const addressCtrl = new Address()

export function Addresses({ addressSelected, setAddressSelected }) {
    const [addresses, setAddresses] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const response = await addressCtrl.getAll(user.id)
                setAddresses(response.data)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    if (!addresses) return null

    return (
        <div className={styles.addresses}>
            <h2>Dirrección</h2>
            {addresses.map((address) => (
                <div
                    key={address.id}
                    onClick={() => setAddressSelected(address)}
                    className={classNames(styles.address, {
                        [styles.active]: address.id === addressSelected?.id,
                    })}
                >
                    <p>
                        {address.attributes.name} ({address.attributes.title})
                    </p>
                    <p>
                        {address.attributes.address}, {address.attributes.postal_code},{" "}
                        {address.attributes.state}, {address.attributes.city}
                    </p>
                </div>
            ))}
        </div>
    )
}
