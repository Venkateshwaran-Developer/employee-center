import React, { useContext,useEffect,useState} from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser";
import axios from 'axios';

function EmployeeCard() {

  const {
    emp,
    setEmp
  } = useContext(ThemeContext);

  
const [editId,setEditId]=useState('');
const [isEdit,setIsEdit]=useState('');

const navigate = useNavigate();
  
useEffect(()=>{
  axios.get('http://localhost:8000/api/v1/employee')
  .then((res)=>{
    setEmp(res.data)
   })
},[setEmp]);

  const handleEdit = (emp)=>{    
      setEditId(emp._id);
      setIsEdit(true); 
  
  }
   if(isEdit) return <EditUser isEdit={isEdit} editId={editId} setIsEdit={setIsEdit}/>
  
  function handleDelete(emp_id){

    if(window.confirm("Do you Want to Delete..?")){
  
      console.log(emp_id);
      
      fetch('http://localhost:8000/api/v1/employee/delete/'+emp_id,{
        method:'DELETE'
      }).then(()=>{
        const updatedEmp = emp.filter((emp)=> emp._id !== emp_id)
        setEmp(updatedEmp)
      })
  
    }
  
  }

 

  return (
    <div className="flex flex-col justify-center items-center py-10 w-full min-h-screen">
      <h1 className="text-3xl font-bold pb-10">Employee Management System</h1>
    
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-20 lg:grid-cols-3 place-content-center place-items-center  ">
    <div className="card h-[520px] justify-center items-center flex rounded-3xl w-96 bg-black">
    <div className="flex justify-center  text-[80px] rounded-full  h-20 w-20 items-center  text-white shadow-2xl shadow-white ">
    <button onClick={() => navigate('/adduser')} className="text-center mb-4  ">+</button>
    </div>
        
      </div>

    {emp.map((user) => {
              return (

                
                <div key={user._id}>
                  {
      <div className="card flex flex-col justify-center items-center h-[620px] w-96 bg-black rounded-3xl">
        
          <img
            src={`http://localhost:8000/images/`+user.image}
            className="w-[170px] mt-5 h-60 rounded-full object-cover"
            alt="car!"
          />
        
        <div className="flex flex-col gap-1 text-gray-400 font-bold text-lg justify-center items-start  h-full w-full px-10 ">
          <h2 className="card-title">Name :  {user.name}</h2>
          <h2 className="card-title">Email : {user.email}</h2>
          <h2 className="card-title">Gender : {user.gender}</h2>
          <h2 className="card-title">Dob : {user.dob}</h2>
          <h2 className="card-title">State : {user.state}</h2>
          <h2 className="card-title">Language : {user.language}</h2>
          <h2 className="card-title">Address : {user.address}</h2>
          <div className="card-actions justify-center py-4 space-x-4">
            <button className="btn text-black  bg-white p-2 px-6 rounded-xl " onClick={() => handleEdit(user)}>Edit</button>
            <button className="btn  text-black  bg-red-700 p-2 px-6 rounded-xl  " onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        </div>
      </div>
                  }
                  </div>
                );
              })}
      
    </div>
    </div>
  );
}

export default EmployeeCard;
