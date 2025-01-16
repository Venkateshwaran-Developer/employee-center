import React, { useContext,useState } from "react";
import { ThemeContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const {
   emp,
   setEmp
  } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [nameerror,setNameError] = useState();
  const [emailerror,setEmailError] = useState();

  const [gendererror,setGenderError] = useState();

  const [doberror,setDobError] = useState();

  const [stateerror,setStateError] = useState();

  const [languageerror,setLanguageError] = useState();

  const [addresserror,setAddressError] = useState();

  const [imageerror,setImageError]=useState();

  const [newUser, setNewUser] = useState([
    {
        name: '',
        email: '',
        gender:'',
        dob:'',
        state:'',
        language:'',
        address:'',         
        image:''       
    }
  ]);
  

const [allchecked,setAllchecked]=useState([]);


// function validateEmail(e){
    
//     const email =e.target.value;
    
//     const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
//     if(regex.test(email)){
//         setNewUser({...newUser, [e.target.name]:e.target.value})
//         setEmailError('')
//         }
//         else if(!regex.test(email)&&email ===""){
//             setEmailError("Email is not valid");
//             }
//             else{
//                 setEmailError('email is not valid')
//             }
    
// }
  
  
function SumbitDetails(e){
  e.preventDefault();
  
  const formData = new FormData();
  
  formData.append('name', newUser.name);
  formData.append('email', newUser.email);
  formData.append('gender', newUser.gender);
  formData.append('dob', newUser.dob);
  formData.append('state', newUser.state);
  formData.append('language',allchecked);
  formData.append('address', newUser.address);
  formData.append('image', newUser.image);
  
  
  
  axios.post('https://employee-center-backend.onrender.com/api/v1/employee',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
      }
  })
  .then(res => {
    console.log(res);
    setEmp([...emp,res.data])
    navigate('/')
  })
  .catch(err => {
    console.log(err);
    if(!newUser.name){
        setNameError('Please enter your name')
    }
    if(!newUser.email){
        setEmailError('Please enter your email')
    }
    if(!newUser.gender){
        setGenderError('Please choose your gender')
    }
    if(!newUser.dob){
        setDobError('Please choose your dob')
    }
    if(!newUser.state){
        setStateError('Please select your state')
    }
    if(!allchecked){
        setLanguageError('Please select your language')
    }
    if(!newUser.address){
        setAddressError('Please enter your address')
    }
    if(!newUser.image){
        setImageError('Please choose your image')
    }
  });
  
  }
  
  const handleCheckInputChange =(e)=> {
  if (e.target.checked) {
    setAllchecked([...allchecked,e.target.value]);
  } else {
    setAllchecked(allchecked.filter((item) => item !== e.target.value));
  }
  }
  
  const handleInputChange = (e) => { setNewUser({...newUser, [e.target.name]:e.target.value}) }
  
  const handleFileChange = (e) => { setNewUser({...newUser, image:e.target.files[0]}) }
  




  return (
    <div className="bg-slate-300">
      <div className="mx-auto max-w-xl ">
        <form onSubmit={SumbitDetails} className="space-y-5" encType='multipart/form-data'>
          <label className="mb-1 block text-sm font-medium text-black">
            {" "}Name{" "}
          </label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="Enter Your Name..."
            onChange={(e)  => handleInputChange(e)}
          />
         <div className="text-red-700">{ nameerror}</div> 

          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Email{" "}
          </label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="you@email.com"
            onChange={(e)  => handleInputChange(e)}
          />
         <div className="text-red-700">{ emailerror}</div> 



          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Gender{" "}
          </label>
          <div className="radio flex gap-10 text-black">
          <label>
            <input type="radio" name="gender" value="Male"  checked={newUser.gender === "Male"} defaultChecked onChange={(e)  => handleInputChange(e)} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={newUser.gender === "Female"} onChange={(e)  => handleInputChange(e)} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="Others" checked={newUser.gender === "Others"} onChange={(e)  => handleInputChange(e)} />
            Others
          </label>
        </div>
        <div className="text-red-700">{ gendererror}</div> 


        <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Date Of Birth{" "}
          </label>
          <input
            type="date"
            name="dob"
            value={newUser.dob}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="Enter Your Phone Number..."
            onChange={(e)  => handleInputChange(e)}
          />
         <div className="text-red-700">{ doberror}</div> 


        <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            State{" "}
          </label>
          <select name="state" onChange={(e)  => handleInputChange(e)} value={newUser.state}  >
            <option selected >Select your State</option>
            
              <option    value="Tamilnadu">
              Tamilnadu
              </option>
              <option    value="Kerala">
              Kerala
              </option>
              <option    value="Karnataka">
               Karnataka
              </option>
              <option    value="Delhi">
               Delhi
              </option>
          </select>
         <div className="text-red-700">{ stateerror}</div> 


            <label className="mb-1 block text-sm  font-medium text-black">
            {" "}
            Language{" "}
          </label>
          <div className="text-black">
          <input
            type="checkbox"
            name="language"
            value="Tamil"
            onChange={(e)  => handleCheckInputChange(e)}
          /><span>Tamil</span>
          <input
            type="checkbox"
            name="language"
            value="English"
            onChange={(e)  => handleCheckInputChange(e)}
          /><span>English</span>
          <input
            type="checkbox"
            name="language"
            value="Malayalam"
            onChange={(e)  => handleCheckInputChange(e)}
          /><span>Malayalam</span>
          <input
            type="checkbox"
            name="language"
            value="Hindi"
            onChange={(e)  => handleCheckInputChange(e)}
          /><span>Hindi</span>
          
          </div>
         <div className="text-red-700">{ languageerror}</div> 

          
         

          <label className="mb-1 block text-sm font-medium text-black">
           <p> Address:</p>
           </label>
            <textarea className="border-2" name="address" value={newUser.address} onChange={ (e)  => handleInputChange(e)}  rows={4} cols={40} />
         <div className="text-red-700">{ addresserror}</div> 
            
        

          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Image{" "}
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            className="cursor-pointer text-black"
            onChange={ (e) => handleFileChange(e)}
          />
         <div className="text-red-700">{ imageerror}</div> 


          <div>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
          >
            Submits
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-700 ml-10 px-5 py-2.5 text-center text-sm font-medium text-white"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          </div>
         
          
        </form>
      </div>
    </div>
  );
}

export default AddUser;
