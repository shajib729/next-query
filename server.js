const app = require('express')()
const port = process.env.PORT || 8000
require('dotenv').config()

app.get('/',(req,res)=>{
    res.json({message:"Hello World from server"})
})

app.listen(8000, ()=>console.log(`Server is running.`))