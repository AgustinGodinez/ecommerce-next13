import { useState } from 'react'
import styles from './AddAddress.module.scss'
import { Button } from 'semantic-ui-react';
import { BasicModal } from '@/components/Shared';
import { AddressForm } from '../AddressForm/AddressForm';

export function AddAddress({onReload}) {
    const [show, setShow] = useState(false)
    const onOpenClose = () => setShow((prevState) => !prevState)
    return (
        <>
            <Button primary className={styles.addbtn} onClick={onOpenClose} >Crear</Button>
            <BasicModal show={show} onClose={onOpenClose} title='nueva direccion' >
                <AddressForm  onClose={onOpenClose} onReload={onReload} />
            </BasicModal>
        </>
    )
}
