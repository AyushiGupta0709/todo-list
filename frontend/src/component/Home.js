import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";

const Home = () => {
  const [searchValue,setSearchValue]=useState('');
  const [allData,setAllData]=useState([]);
  const [updating,setUpdating]=useState(false);
  const [id,setId]=useState();
  const addItems=(e)=>{
    setSearchValue(e.target.value);
  }
const postItem = async ()=>{
  console.log(searchValue);
 const data= await axios.post("http://localhost:5000",{text:searchValue});
 console.log(data);
 setSearchValue("");
  displayAllItems();

}
  const displayAllItems= async ()=>{
    try {
      const data=  await axios.get("http://localhost:5000");
      setAllData(data.data.allData);
      // console.log(data.data.allData);
      
    } catch (error) {
      console.log(error);
      
    }
  

  }
  const editItem= async (_id)=>{
    try {
      const singleData= await axios.get(`http://localhost:5000/${_id}`);
      // console.log(singleData.data.data.text);
      setSearchValue(singleData.data.data.text); 
      setUpdating(true); 
      setId(_id);    
    } catch (error) {
      console.log(error);
  }
  }
  const updateTodo= async ()=>{
    try {
      const data = await axios.put(`http://localhost:5000/${id}`,{_id:id,text:searchValue});
      displayAllItems();
      setSearchValue("");
      setUpdating(false);
      // displayAllItems();
      
    } catch (error) {
      console.log(error);
      
    }

  }
  const deleteItem= async (_id)=>{
    try {
      const data=await axios.delete(`http://localhost:5000/${_id}`);
    } catch (error) {
      console.log(error);      
    }
    displayAllItems();
  }
  useEffect(()=>{
    displayAllItems();
  },[]);
  // console.log(allData);
  return (
    <div>
      <div className='main-container'>
        <div className='todo-container'>
            <h3>ADD YOUR ITENS HERE</h3>
            <input type='text' className='search-input' placeholder='add items' value={searchValue}  onChange={(e)=>addItems(e)}/>
            <button className='add' onClick={updating? ()=>updateTodo():()=>postItem()}>{updating ? "Update" : "Add"}</button>
            <div className='all-items'>
          
                  {
                    allData?.map((item,key)=>{
                      const {_id,text}=item;
                      return (
                        <>
                        <div className='single-item'>
                        <li>{text}</li>
                        <button className='edit-button' onClick={()=>editItem(_id)}>EDIT</button>
                        <button className='delete-button' onClick={()=>deleteItem(_id)}>DELETE</button>
                        </div>
                          
                        </>
                      )
                    
                    })
                  }

                                
      
            </div>
        </div>
      </div>

    </div>
  )
}

export default Home;


