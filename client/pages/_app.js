import '../styles/globals.scss'
import {AuthProvider} from '../firebase/auth'
import store from '../redux/store';
import {Provider} from 'react-redux';
import Navigation from '../components/navigation/navigation';
import Add from '../components/Add/Add';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigation/>
          <div className="mainContainer">
            <Component {...pageProps} />
          </div>
        <Add/>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
