import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            position:'relative',
            padding: '1rem',
            maxWidth: '500px',
            aspectRatio: '5/3',
            width: '100%',
            overflow:'hidden !important',
          }}>
        <Image
          layout='fill'
          objectFit='cover'
          placeholder='blur'
          src='https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80' 
          blurDataURL='https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80' 
          />
          </div>
        <h1 className={styles.title}>
          Simple Next.js demo! See <Link href="/posts">Posts</Link>
        </h1>
        </main>
    </div>
  )
}