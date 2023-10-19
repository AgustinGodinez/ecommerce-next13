import { Separator } from '@/components/Shared';
import styles from './StepTwo.module.scss'
import { Addresses } from './Addresses/Addresses';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ENV } from '@/utils';
import { Elements } from '@stripe/react-stripe-js';
import { Payment } from './Payment/Payment';
import { Resume } from './Resume/Resume';

const stripeInit = loadStripe(ENV.STRIPE_TOKEN)

export function StepTwo({ games }) {
    const [addressSelected, setAddressSelected] = useState(null)
    return (
        <Elements stripe={stripeInit} > 
            <div className={styles.stepTwo}>
                <div className={styles.center}>
                    <Addresses
                        addressSelected={addressSelected}
                        setAddressSelected={setAddressSelected}
                    />
                    <Separator height={50} />
                    {addressSelected && <Payment/>}
                </div>

                <div className={styles.right}>
                    <Resume games={games} addressSelected={addressSelected} />
                </div>
            </div>
        </Elements>
    )
}
