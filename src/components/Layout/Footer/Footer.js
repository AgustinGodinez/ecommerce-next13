import { Button, Container, Image } from 'semantic-ui-react'
import styles from './Footer.module.scss'
import Link from 'next/link'

export function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.columns} >
                    <div>
                        <Link href="/">
                            <Image src="/imagenes/logo.png" alt="Gaming" />
                        </Link>
                    </div>

                    <div>
                        <ul>
                            <Link href="/">Terminos y condiciones</Link>
                            <Link href="/">Politica de privacidad</Link>
                            <Link href="/">Contacto</Link>
                            <Link href="/">FAQs</Link>
                        </ul>
                    </div>

                    <div className={styles.social}>
                        <Button as="a" href="/" circular color='facebook' icon="facebook" ></Button>
                        <Button as="a" href="/" circular color='twitter' icon="twitter" ></Button>
                        <Button as="a" href="/" circular color='linkedin' icon="linkedin" ></Button>
                        <Button as="a" href="/" circular color='google plus' icon="google" ></Button>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>Copyright &#169; 2023 Agustin Godinez - All rights reserved</span>
                </div>
            </Container>
        </div>
    )
}
