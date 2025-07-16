const  express = require("express") ;
const app = express() ;
const path = require("path") ; 
const userModel = require("./models/userModel") ;

app.set("view engine" , "ejs") ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(express.static(path.join(__dirname, "public")))

app.get("/" , (req,res)=>{
    res.render("index")
}) ;

app.get("/read" , async (req,res) => {
    const users = await userModel.find() ;
    res.render("read" , {users})
}) ;

app.get("/delete/:id" , async (req,res) => {
    const deletedUser = await userModel.findOneAndDelete({_id : req.params.id}) ;
    res.redirect("/read") ;
})

app.get("/edit/:id" , async (req,res) => {
  const user =   await userModel.findOne({_id : req.params.id}) ;
  res.render("edit" , {user : user})
})

app.post("/update/:id" , async (req,res) => {
    const {email , name , image }  = req.body ;
    await userModel.findOneAndUpdate({_id : req.params.id} , {name , image , email} , {new:true})
    res.redirect("/read")
})


app.post("/create" , async (req, res ) => {
    const {name , email , image } = req.body ;
    
    const createdUser = await userModel.create({
        name ,
        email , 
        image
    })
    res.redirect("read") ;
})



app.listen(3000 , () => {
    console.log("server is running on port 3000")
}) ;