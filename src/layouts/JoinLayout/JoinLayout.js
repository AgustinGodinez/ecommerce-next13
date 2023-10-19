'use client'
import Link from "next/link";
import styles from "./JoinLayout.module.scss";
import { Icon, Image } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";

export default function JoinLayout({ children }) {
    const error = console.error;
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };
    const { user } = useAuth()
    const router = useRouter()

    if (user) {
        router.push("/")
        return null
    }

    const logo = "https://static.vecteezy.com/system/resources/previews/002/144/780/non_2x/gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg"
    return (
        <main className={styles.container}>
            <div className={styles.topBar}>
                <Link href="/">
                    {/*<propImage img={"/imagenes/logo.png"} width={60} />*/}
                    <Image src="/imagenes/logo.png" alt="Gaming"  height={50} style={{ borderRadius: '2rem' }} />

                </Link>
                <Link href="/">
                    <Icon name="close" />
                </Link>
            </div>
            <div className={styles.blockLeft}>{children}</div>
            <div className={styles.derechaima}></div>
        </main>
    )
}
