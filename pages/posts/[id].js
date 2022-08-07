import { useRouter, } from 'next/router';
import { useEffect, useState } from 'react';
  
export async function getServerSideProps(context) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  const id = context.params.id
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const data = await res.json()

  return { props: {data} }
}
  

const Blogid = ({data}) => {  
  const [post, setPost] = useState(data)

    return (
      <>
        {
          post.id && post.title ? (
          <div className="post">
            <h1>{post.id}. {post.title}</h1>
            <h4>{post.body}</h4>
          </div>) : (
            <h3 className='post'>Loading...</h3>    
          )
        }

        <style jsx>
          {`
            .post{
              padding:20px 50px;
            }  
          `}
        </style>
      </>
    )
}
export default Blogid