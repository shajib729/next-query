import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const getPost =async (id) => {
  if(id){
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res=>res.json())
    .then(data=>data)
  }else{
    return {}
  }
}

function Post() {
  const {push, query:{postId}} = useRouter()
  const {status} = useSession()
  const {data, isLoading, isError, error} = useQuery(['post', postId], ()=>getPost(postId))

  if(status==='unauthenticated'){
    push('/login')
    return <></>
  }

  if(status==='loading'){
    return <>Loading...</>
  }

  return (
    <>
    {
      isLoading?
      <h1>Loading...</h1>
      :
      isError?
      <h1>Error: {error}</h1>
      :
      <>
        <h2>
          {data.id} {data.title}
        </h2>
        <p>{data.body}</p>
      </>      
    }
    </>
  )
}

export default Post

// export async function getStaticProps(context) {
//   const { params } = context
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params.postId}`
//   )
//   const data = await response.json()

//   if (!data.id) {
//     return {
//       notFound: true
//     }
//   }

//   console.log(`Generating page for /posts/${params.postId}`)
//   return {
//     props: {
//       post: data
//     }
//   }
// }

// export async function getStaticPaths() {
//   // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//   // const data = await response.json()
//   // const paths = data.map(post => {
//   //   return {
//   //     params: { postId: `${post.id}` }
//   //   }
//   // })

//   return {
//     paths : [
//       {params : {postId : '1'}},
//       {params : {postId : '2'}},
//       {params : {postId : '3'}}
//     ],
//     fallback: true
//   }
// }