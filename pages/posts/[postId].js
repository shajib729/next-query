import { useRouter } from 'next/router'
import useSWR from 'swr'

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
  const {query:{postId}} = useRouter()
  const {data, error} = useSWR(['post', postId], ()=>getPost(postId))
  
  if (!data) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  else{return (
    <>
      <h2>
        {data.id} {data.title}
      </h2>
      <p>{data.body}</p>
    </>
  )}
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