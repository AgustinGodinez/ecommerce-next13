import JoinLayout from "@/layouts/JoinLayout/JoinLayout";
import styles from "./page.mudule.scss"
import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm/LoginForm";

export const metadata = {
    title: 'Inicar sesion',
    description: 'Inicar sesion en la plataforma',
}

export default function page() {
    return (
        <JoinLayout>
            <div className={styles.signIn}>
                <h3>Inicio de Sesion</h3>
                <LoginForm></LoginForm>
                <div className={styles.actions}>
                    <Link href="/join/sign-up">No tienes una cuenta?</Link>
                </div>
            </div>
        </JoinLayout>
    )
}
