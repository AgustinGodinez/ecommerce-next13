import { useState } from 'react';
import styles from './ListOrder.module.scss'
import { DateTime } from 'luxon';
import { BasicModal } from '@/components/Shared';
import { Image } from 'semantic-ui-react';
import { ENV, fn } from '@/utils';

export function ListOrder({ order }) {
    const [showModal, setShowModal] = useState(false)
    const createAt = new Date(order.attributes.createdAt).toISOString()

    const products = order.attributes.products;
    const address = order.attributes.addressShipping;

    const openCloseModal = () => setShowModal(prevState => !prevState)

    const getTotalProducts = () => {
        let total = 0;
        products.forEach(product => {
            total += product.quantity
        });
        return total
    }

    return (
        <>
            <div className={styles.order} onClick={openCloseModal}>
                <div>
                    <span>{DateTime.fromISO(createAt, { locale: 'es' }).toFormat("dd/MM/yyyy")}</span>
                    <p>{getTotalProducts()} productos</p>
                </div>
                <p>${order.attributes.totalPayment}</p>
            </div>
            <BasicModal
                show={showModal}
                onClose={openCloseModal}
                title="Informacion del pedido"
            >
                {products.map((product) => (
                    <div key={product.id} className={styles.product}>
                        <Image src={`${ENV.IMG}${product.attributes.cover.data.attributes.url}`} />
                        <div>
                            <div className={styles.info}>
                                <div>
                                    <p>{product.attributes.title}</p>
                                    <p>{product.attributes.platform.data.attributes.title}</p>
                                </div>
                            </div>
                            <div className={styles.quantity} >
                                <span>x{product.quantity}</span>
                                <span>
                                    {fn.calcDiscountedPrice(
                                        product.attributes.price,
                                        product.attributes.discount
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={styles.address}>
                    <div>
                        <p className={styles.title}>{address.attributes.title}</p>
                        <p className={styles.addressInfo}>
                            {address.attributes.name}, {address.attributes.address}, {" "}
                            {address.attributes.state}, {address.attributes.city},{" "}
                            {address.attributes.postal_code}
                        </p>
                    </div>
                </div>
                <div className={styles.total} >
                    <p>Total: ${order.attributes.totalPayment}</p>
                </div>
            </BasicModal>
        </>
    )
}
