import Head from 'next/head'
import UploadForm from '../components/UploadForm/UploadForm'
import styles from '../styles/Home.module.scss'
//import Image from 'next/image'

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
        {/* <Image src="/images/Plantiful.png" width={200} height={200} /> */}
        <img src="/images/Plantiful.png"/>
        
      </main>
    </div>
  )
}
