import { getSession } from "next-auth/react"

const handler=async (req, res)=>{
    const session = await getSession({req})
    if(session){
        res.status(200).json(session)
    }else{
        res.status(401).json({message:"Unauthorized User."})
    }
}

export default handler