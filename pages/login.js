import React, { useEffect, useState } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

const login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const { status } = useSession()
    const router = useRouter()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // if (status == 'loading') {
    //     return <h1>Loading...</h1>
    // }
    // else if (status === 'authenticated') {
    //     router.push('/posts')
    //     return <></>
    // }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_wrapper}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type='email' onChange={handleChange} className={styles.text_input} placeholder='Your Email' name='email' value={data.email} />
                    <input type='password' onChange={handleChange} className={styles.text_input} placeholder='Your Passwrod' name='password' value={data.password} />
                    <input type='submit' value='Login' />
                </form>
                <a
                    className={`${styles.github_button} ${styles.provider_button}`}
                    onClick={() => signIn('github')}
                >
                    Login with Github
                </a>
                <a
                    className={`${styles.google_button} ${styles.provider_button}`}
                    onClick={() => signIn('google')}
                >
                    Login with Google
                </a>
            </div>
        </div>
    )
}

export default login

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    
    if (session) {
        return { redirect: { destination: '/posts', permanent: false } }
    }

    return {
        props: {

        }
    }
}