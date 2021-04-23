import '../styles/globals.scss'
import {AuthProvider} from '../firebase/auth'
import store from '../redux/store';
import {Provider} from 'react-redux';
import Navigation from '../components/navigation/navigation';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Navigation/>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
