import Link from 'next/link'
import styles from './HeaderCart.module.scss'
import { Icon, Image } from 'semantic-ui-react'
import { useSearchParams } from 'next/navigation'
import classNames from 'classnames'


export function HeaderCart() {
    const searchParams = useSearchParams()
    const currentStep = searchParams.get('step') ?? 1;// default value is "1"

    const steps = [
        { number: 1, title: 'Cesta' },
        { number: 2, title: 'Pago' },
        { number: 3, title: 'Confirmacion' },
    ]


    return (
        <div className={styles.headerCart}>
            <div className={styles.left}>
                <Link href="/">
                    <Image src="/imagenes/logo.png" alt="Gaming" />
                </Link>
            </div>
            <div className={styles.center}>
                {steps.map((step) => (
                    <div key={step.number} className={classNames({
                        [styles.active]: step.number === Number(currentStep),
                        [styles.success]: step.number < Number(currentStep),
                    })}
                    >
                        <span className={styles.number}  >
                            <Icon name='check' />
                            {step.number}
                        </span>
                        <span>{step.title}</span>
                        <span className={styles.space} />
                    </div>
                ))}
            </div>

            <div className={styles.right}>
                <Icon name='lock' />
                <div>
                    <span>Pago seguro</span>
                    <span>256-bit SSL Secure</span>
                </div>
            </div>
        </div>
    )
}
