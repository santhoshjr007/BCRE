const express=require("express")
const app =express()
app.use(express.json())
PORT=3000;

const users=[
    {email:"alice@example.com",password:"alice123"}, {email:"bob@example.com",password:"bob123"}, {email:"charlie@example.com",password:"charlie123"}
]

app.get('/',(req,res)=>{
   return  res.send("Server running")
})
app.put('/update-pass',(req,res)=>{
    const {email,password}=req.body
    if(!email){
        return res.send("Email required")
    }
    if(!password){
        return res.send("Password required")
    }
    const user =(u=>users.find(u.email===email))
    if(user){
        user.password=password 
        return res.send({mssage:"User deleted succesfully"})
    }else{
        return res.status(401).send({message:"Email not found"})
    }
})
app.delete("delete-user",(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.send({message:"Email required"})
    }
    const index=users.findIndex(u=>u.email===email)
    if( index!==-1){
        users.splice(index,1)
        return res.status(200).send({message:"User deleted Succesfully "})
    }else{
        return res.status(400).send({message:"Email not found"})
    }
})

app.listen(PORT,()=>{
    console.log(`server running successfully at http://localhost:${PORT}`)
})