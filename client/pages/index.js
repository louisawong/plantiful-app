import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plantiful</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
      </Head>

      {/* <main className={styles.main}>
      </main> */}
      <body>
        HELLO WORLD!
        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        <script src="/__/firebase/8.4.1/firebase-app.js"></script>

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries --> */}
        <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

        {/* <!-- Initialize Firebase --> */}
        <script src="/__/firebase/init.js"></script>
      </body>
    </div>
  )
}
