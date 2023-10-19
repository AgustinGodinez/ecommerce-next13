'use client'
import { Address, Info, Settings, CompWishlist } from '@/components/Account'
import BasicLayout from '@/layouts'
import styles from './account.module.scss'
import { Tab } from 'semantic-ui-react'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/Shared'
import { useState } from 'react'
import { Orders } from '@/components/Orders/Orders'


export default function page() {
    const [reload, setReload] = useState(false)
    const { logout, user } = useAuth()
    const router = useRouter()

    if (!user) {
        router.push("/join/sign-in")
        return null
    }

    const onReload =()=> setReload(prevState => !prevState)

    const panes = [
        {
            menuItem: 'Mis pedidos',
            render: () => (
                <Tab.Pane attached={false}>
                    <Orders/>
                    <Separator height={90} />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Lista de deseos',
            render: () => (
                <Tab.Pane attached={false}>
                    <CompWishlist/>
                    <Separator height={90} />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Direcciones',
            render: () => (
                <Tab.Pane attached={false}>
                    <Address.AddAddress onReload={onReload}/>
                    <Address.ListAddresses reload={reload} onReload={onReload} />
                    <Separator height={90} />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'ajuste', icon: 'settings', content: 'Ajustes' },
            render: () => (
                <Tab.Pane attached={false}>
                    <Settings.ChangeNameForm />
                    <div className={styles.containerForms}>
                        <Settings.ChangeEmailForm />
                        <Settings.ChangepasswordForm/>
                    </div>
                    <Separator height={90} />
                </Tab.Pane>
            )
        },
        {
            menuItem: {
                key: 'salir',
                icon: 'sign-out',
                content: "Salir",
                onClick: logout
            }
        }

    ]
    return (
        <BasicLayout isContainer relative>
            <Info />
            <Tab menu={{ secondary: true, pointing: true }}
                panes={panes}
                className={styles.tabs}
            />
        </BasicLayout>
    )
}
