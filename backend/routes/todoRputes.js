const express=require("express");
const {getTodo,postTodoList,getSingleItem,updateTodoList, deleteTodo }= require("../controllers.js/todoController");
const router=express.Router();
router.route('/').get(getTodo).post(postTodoList);
router.route('/:id').get(getSingleItem).put(updateTodoList).delete(deleteTodo);
module.exports=router;