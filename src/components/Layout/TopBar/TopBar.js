import Link from 'next/link'
import styles from './TopBar.module.scss'
import { Image } from 'semantic-ui-react'
import { Account, Menu } from '@/components/Layout'


export default function TopBar({ isOpenSearch }) {

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <Link href="/" >
          <Image src="/imagenes/logo.png" alt="Gaming" />
        </Link>
      </div>

      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch} />
      </div>

      <div className={styles.right}>
        <Account />
      </div>
    </div>
  )
}
