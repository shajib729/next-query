import Head from "next/head"
import styles from './posts.module.css'
import { useEffect,useState } from "react"
import Link from "next/link"
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export const getPosts =async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  return data
}


const posts = () => {
  const { data, isLoading, isError, error } = useQuery(['posts'], getPosts)

  if(isLoading) {
    return <h1>Loading...</h1>
  }
  if(isError) {
    return <h1>Error : {error}</h1>
  }
  else{
  return (
    <>
    <Head>
      <title>Blog Page</title>
    </Head>
      
      <div className={styles.blogs}>
      <h1>Blog Page!</h1>
      
      {
        data?.map((e) => (
            <Link href={`/posts/${e.id}`} key={e.id}>
              <div className={styles.post} key={e.id}>
                <h3 className={styles.id} key={e.id+1}>{e.id}.</h3>
                <h3 key={e.id+2}>{e.title}</h3>
              </div>
            </Link>
        ))
      }
      </div>
    </>
  )
  }
}
  
export default posts