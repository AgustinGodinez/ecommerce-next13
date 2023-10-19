'use client'
import { useAuth } from '@/hooks'
import styles from './Info.module.scss'
import { Button, Icon } from 'semantic-ui-react'

export function Info() {
    const { user } = useAuth()
    let fechaNormal = new Date(user.createdAt);
    let opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechaFormateada = fechaNormal.toLocaleDateString('es-ES', opcionesDeFormato);

    return (
        <div className={styles.info}>
            <Button icon className={styles.user}>
                <Icon name="user outline" />
            </Button>
            <h3 className={styles.username}>{user.firstname}</h3>
            <h4 className={styles.email}>{user.email}</h4>
            <p className={styles.createdAt}>creado desde  {fechaFormateada}</p>
        </div>
    )
}
