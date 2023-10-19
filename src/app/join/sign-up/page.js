import JoinLayout from "@/layouts/JoinLayout/JoinLayout"
import RegisterForm from "@/components/Auth/RegisterForm/RegisterForm"
import styles from "./sign-up.module.scss"
import Link from "next/link"

export const metadata = {
  title: 'Registro de cuenta',
  description: 'Registro de cuenta en la plataforma',
}

function page() {
  return (
    <JoinLayout>
      <div className={styles.signIn}>
        <h3>Crear Cuenta en la pagina</h3>
        <RegisterForm></RegisterForm>
        <div className={styles.actions}>
          <Link href="/join/sign-in">Atras</Link>
        </div>
      </div>
    </JoinLayout>
  )
}

export default page