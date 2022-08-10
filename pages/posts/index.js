import Head from "next/head"
import Post from '../../components/Post'
import LoadingPost from '../../components/LoadingPost'
import { useEffect, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getPosts = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`)
  const data = await res.json()

  return data
}


const posts = () => {
  const {status} = useSession()
  const router = useRouter()
  const { data, isError, isLoading, error, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(['posts'], getPosts,
    {
      getNextPageParam: (_, pages) => pages.length < 10 ? pages.length + 1 : undefined
    })

  useEffect(() => {
    // after scrolling to the bottom of the page, fetch the next page
    const onScroll = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement
      if (scrollHeight - scrollTop <= clientHeight * 1.3 && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [isFetching])

  if (isError) {
    return <h1>Error : {error}</h1>
  }

  if(status=='unauthenticated'){
    router.push('/login')
    return <></>
  }

  if(status=='loading'){
    return <>Loading...</>
  }

  return (
    <>
      <Head>
        <title>Blog Page</title>
      </Head>

      <div style={{ maxWidth: "700px", padding: "5px 10px", margin: "0 auto" }}>

        <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'normal' }}>Infinite Scroll Post</h1><br /><br />
        {
          isLoading ?
            [1, 2].map((v, i) => <LoadingPost key={i} />)
            :
            data?.pages?.map((page, i) => {
              return (
                <div key={i}>
                  {page?.map((post, index) => (
                    <div key={index}>
                      <Post post={post} />
                    </div>
                  ))}
                </div>
              )
            })
        }

        {isFetching && hasNextPage ? <LoadingPost /> : null}
      </div>
    </>
  )
}

export default posts