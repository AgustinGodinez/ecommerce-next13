import { Inter } from 'next/font/google'
import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../scss/global.sass'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContex';
import { useAuth } from '@/hooks'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gamer - Todo en tus manos',
  description: 'Todos los juegos de todas las plataformas',
}

export default function RootLayout({ children }) {

  return (
    <html lang="sass">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
