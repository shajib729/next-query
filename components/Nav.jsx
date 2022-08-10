import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import styles from '../styles/Nav.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Nav = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    // console.log({ session, status });
    return (
        <div className={`${styles.nav_container}`}>
            <div className={styles.logo}>
                <Link href='/'>NXT</Link>
            </div>
            <div className={styles.nav_items}>
                {
                    status == 'unauthenticated' && (
                        <Link href='/login'>
                            Sign In
                        </Link>
                    )
                }
                {
                    status == 'authenticated' && (
                    <>
                        <a onClick={(e) => {
                            e.preventDefault()
                            router.push('/')
                            signOut()
                        }}>
                            Sign Out
                        </a>
                        {
                            status=='authenticated' &&
                            <div className={styles.profile_wrapper}>
                                <Image src={session?.user?.image} layout='fill' objectFit='cover'/>
                            </div>
                        }
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default Nav