//requiring all neccesary packages before it u need to install it by npm
const express= require("express")
const mongoose=require("mongoose")
const app=express()

//this path package will be usefull for maintaining all resources in public folder and all ejs 
const path=require("path")
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//connecting to our database you can change the url if u want to change db
async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/login");
}
main()
.then((res)=>{
    console.log("connection success")
})
.catch((err)=>{
    console.log(err)
})

//our database schema
const taskschema=new mongoose.Schema({
    taskname:{
        type:String
    },
    taskdescription:{
        type:String
    },
    taskstatus:{
        type:Boolean
    }
    ,
    taskdate:{
        type:String
    }
})

//this will be our object which we to perform any operation on database
const data=mongoose.model("task",taskschema)


//index route
app.get("/",async (req,res)=>{
    //creating a array of all tasks present in our db
    try{
    let arr;
    await data.find()
    .then((res)=>{
        console.log(res)
        arr=[...res]
    
    
    })
    //rendering our ejs file and passing the tasks array with it
    res.render("index.ejs",{taskarr:arr})
    }
    catch(err)
    {
        console.log(err)
    }
    
})


//route for adding tasks 
app.post('/addtask',async (req,res)=>{
    try{
    //getting the info which was passed by the form from front end
    let {name,description,date}=req.body

    //inserting to our db
    await data.insertMany({taskname:name,taskdescription:description,taskdate:date,taskstatus:false})
    .then((re)=>{
        res.redirect('/')
    })
    }
    catch(err)
    {
        console.log(err)
    }
})

//route for deleting the tasks
app.get("/delete",async (req,res)=>{
    try{
    console.log(req.query.name)
    //this will delete the task from db.here we are getting the taskname using query strings
    await data.deleteOne({taskname:req.query.name})
    .then((re)=>{
        res.redirect('/')
    })
    }
    catch(err)
    {
        console.log(err)
    }
})

//route for updating the tasks
app.post('/update',async (req,res)=>{
    try{
    //here we are checking so that the req we are recieving is from the task updation
    if(req.body.newtaskname)
    {
        await data.updateOne({taskname:req.body.ref},{$set:{taskname:req.body.newtaskname,taskdescription:req.body.newtaskdesc,taskdate:req.body.newdate}})
    }
 
    //if it is not then definetly req is coming from the task completion updation
    else
    await data.updateOne({taskname:req.body.ref},{$set: {taskstatus:req.body.taskstatus}})
    .then((re)=>{
       //sending the success response to front end
        res.json({status:"success"})
    })
    .catch((err)=>{
        //sending failure response
        res.json({status:"failure"})
    })
    }
    catch(err)
    {
        console.log(err)
    }
})



//listening to the port 7000
app.listen("7000",()=>{
    console.log("listening")
})