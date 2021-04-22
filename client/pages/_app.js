import '../styles/globals.scss'
import {AuthProvider} from '../firebase/auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
