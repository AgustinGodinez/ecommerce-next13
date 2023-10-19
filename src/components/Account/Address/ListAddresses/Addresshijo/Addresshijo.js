
import { Button, Icon } from 'semantic-ui-react'
import styles from './Addresshijo.module.scss'
import { useState } from 'react'
import { BasicModal, Confirme } from '@/components/Shared'
import { AddressForm } from '../../AddressForm/AddressForm'
import { Address } from '@/api'

const addressCtrl = new Address()

export function Addresshijo({ addressId, address, onReload }) {

  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const openCloseEdit = () => setShowEdit(prevSate => !prevSate)
  const openCloseConfirm = () => setShowConfirm(prevSate => !prevSate)

  const onDelete = async ()=>{
    try {
      await addressCtrl.delete(addressId)
      onReload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.address}>
        <div>
          <p className={styles.title}>{address.title}</p>
          <p className={styles.addressInfo}>{address.name}, {address.address}, {address.state}, {address.city},{" "}{address.postal_code}
          </p>
        </div>
        <div className={styles.actions}>

          <Confirme
          open={showConfirm}
          onCancel={openCloseConfirm}
          onConfirm={onDelete}
          content="Estas seguro de que quieres eliminar la direccion?"
           />

          <Button primary icon onClick={openCloseEdit}>
            <Icon name='pencil' />
          </Button>
          <Button primary icon onClick={openCloseConfirm}>
            <Icon name='delete' />
          </Button>
        </div>
      </div>
      <BasicModal show={showEdit} onClose={openCloseEdit} title='Editar direccion' >
        <AddressForm onClose={openCloseEdit} onReload={onReload} addressId={addressId} address={address} />
      </BasicModal>
    </>
  )
}
