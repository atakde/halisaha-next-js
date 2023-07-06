import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Master Halısaha</title>
        <meta name="description" content="Halısaha takip sistemi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.menuWrapper}>
          <Link href="/yuzuncu-yil">
            <a className="ant-btn ant-btn-primary ant-btn-lg">100. Yıl</a>
          </Link>
          <Link href="/yazilimci-halisahalari">
            <a className="ant-btn ant-btn-primary ant-btn-lg" style={{ background: '#eee', borderColor: '#ddd', color:'#000' }}>Yazılımcı Halısahaları</a>
          </Link>
          <Link href="/jotform">
            <a className="ant-btn ant-btn-primary ant-btn-lg" style={{ background: '#28a745', borderColor: '#28a745' }}>Jotform</a>
          </Link>
        </div>
        <audio controls id="music" autoPlay className={styles.hidden}> 
          <source src="https://goalballlive.com/wp-content/uploads/2021/02/UEFA-Champions-League-Theme-Song-On-Screen.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
      </main>

        <footer className={styles.footer}></footer>
    </div>
  )
}
