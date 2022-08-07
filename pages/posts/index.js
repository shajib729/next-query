import Head from "next/head"
import styles from './posts.module.css'
import { useEffect,useState } from "react"
import Link from "next/link"
import LoadingPost from '../../components/LoadingPost'
import Post from '../../components/Post'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export const getPosts =async () => {
  await new Promise((res) => setTimeout(res, 1000))
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  return data
}


const posts = () => {
  const { data, isLoading, isError, error } = useQuery(['posts'], getPosts)

  if(isError) {
    return <h1>Error : {error}</h1>
  }
  else{
  return (
    <>
    <Head>
      <title>Blog Page</title>
    </Head>
      
    <div style={{ maxWidth: "700px", padding: "5px 10px", margin: "0 auto" }}>
    <h1 style={{textAlign:'center', fontSize:'3rem', fontWeight:'normal'}}>Infinite Scroll Post</h1>
      
      {
        isLoading?
        [1,2].map((v,i)=><LoadingPost key={i}/>)
        :
        data?.map((post, index) => (
          <div key={index}>
              <Post post={post} />
          </div>
          ))
      }
      </div>
    </>
  )
  }
}
  
export default posts