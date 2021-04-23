import '../styles/globals.scss'
import {AuthProvider} from '../firebase/auth'
import store from '../redux/store';
import {Provider} from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
