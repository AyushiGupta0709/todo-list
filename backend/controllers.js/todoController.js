const TodoDatabase=require("../models/todoModel");

const getTodo = async (req,res)=>{
        // res.json({message:"Hello there.. I am ayushi gupta"});
        try {
            const allTodoList = await TodoDatabase.find();
            res.status(200).json({allData:allTodoList,status:"success in getting all data"});
        } catch (error) {
            console.log(error);
        res.json({error:error});
            
        }
       
    }
    const getSingleItem= async (req,res)=>{
        try {
            const singleData= await TodoDatabase.findById(req.params.id);
            res.status(200).json({data:singleData,status:"gettin single data"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Error in getting the data"});
            
        }

    }

const postTodoList = async (req,res)=>{
    const text=req.body;
   try{
    const postData=await TodoDatabase.create(text);
    res.json({ data: text, status: "success in posting the data" });
} catch (err) {
  res.status(500).json({ error: err.message });
}

}
const updateTodoList=async (req,res)=>{
    // const {_id}= req.params.id;
    const {text}=req.body;
    try {
       const newTodo = await TodoDatabase.findByIdAndUpdate(req.params.id,{text},{new:true});
       const updateTodo=await newTodo.save();
       console.log(updateTodo);
       res.status(200).json({data:updateTodo,status:"successfully updated the list"})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
        
    }

}
const deleteTodo=async(req,res)=>{
    // const {_id}=req.params.id;
    // const {text}=req.body;
    try {
        const newTodo= await TodoDatabase.findByIdAndDelete(req.params.id);
        // const deleteTodo = await newTodo.save();
        // console.log(newTodo);
        res.status(200).json({status:"successfully deleted"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error in deleting the list"});
        
    }
}


module.exports={getTodo,postTodoList,getSingleItem,updateTodoList,deleteTodo};