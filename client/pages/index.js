import Head from 'next/head'
import UploadForm from '../components/UploadForm/UploadForm'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
const Plantiful = require('../public/images/Plantiful.png')

// const withImages=require('next-images')
// withImages({})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plantiful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}>
      </main> */}
      <main>
        HELLO WORLD!
        <UploadForm/>

        <Image src="/images/Plantiful.png" width={200} height={200} />
        {/* <img src={Plantiful}/> */}



        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        <script src="/__/firebase/8.4.1/firebase-app.js"></script>

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries --> */}
        <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

        {/* <!-- Initialize Firebase --> */}
        <script src="/__/firebase/init.js"></script>
        
      </main>
    </div>
  )
}
