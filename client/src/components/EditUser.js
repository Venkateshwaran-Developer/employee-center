import React,{useContext,useEffect,useState} from 'react';
import { ThemeContext } from "../App";
import axios from 'axios';

function EditUsers({editId,setIsEdit}) {
  
const [allEditchecked,setAllEditchecked]=useState([]);




    const {
        emp,
        setEmp
      } = useContext(ThemeContext);

      const [editUser, seteditUser] = useState([
        {
            name: '',
            email: '',
            gender:'',
            dob:'',
            state: '',
            language:'',
            address:'',        
            image:''
        }
      ]);

     
    
console.log(editId);

        useEffect(()=>{       
          const fetchSingleData = ()=>{
            axios.get('https://employee-center-backend.onrender.com/api/v1/employee/'+editId)
             .then((editEmployee)=>{
               seteditUser({
               name:editEmployee.data.name,
               email:editEmployee.data.email,
               gender:editEmployee.data.gender,
               dob:editEmployee.data.dob,
               state:editEmployee.data.state,
               language:editEmployee.data.language,
               address:editEmployee.data.address,
               image:editEmployee.data.image,
                            
             })
           })
           }
           
           fetchSingleData();
           
       },[editId])

      function handleCancelEdit(){
        setIsEdit(false);
      }

      
      function handleUpdate(e){
        e.preventDefault();
        const formData = new FormData();
       console.log(editUser);
       
        console.log(editId);
          
        
        formData.append('name', editUser.name);
        formData.append('email', editUser.email);
        formData.append('gender',editUser.gender);
        formData.append('dob', editUser.dob);
        formData.append('state', editUser.state);
        formData.append('language',allEditchecked);
        formData.append('address', editUser.address);
        formData.append('image', editUser.image);
      
        fetch(`https://employee-center-backend.onrender.com/api/v1/employee/update/${editId}`, {
          method: 'PUT',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          // Handle success (e.g., update UI, show notification)
      })
      .catch((error) => {
          console.error('Error:', error);
          // Handle error (e.g., show error message)
      });
        axios.put('https://employee-center-backend.onrender.com/api/v1/employee/update/' + editId, formData)
          .then((res) => {
            
              setEmp(emp.map((user) => {
                  if (user._id === editId) {
                      return res.data;
                  }
                  else{
                    return user;
                  }
              }));
              setIsEdit(false);
          })
          .catch((error) => {
              console.error(error);
          })
        
      }

        const handleEditInputChange =(e)=> {
          if (e.target.checked) {
            setAllEditchecked([...allEditchecked,e.target.value]);
          } else {
            setAllEditchecked(allEditchecked.filter((item) => item !== e.target.value));
          }
          }
          
          const handleEditFileChange = (e) => { seteditUser({...editUser, image:e.target.files[0]}) }
          
          const handleEditUserChange = (e) => { seteditUser({...editUser,[e.target.name]:e.target.value}) }
          
          

  return (
    <div className='bg-white'>
      <div className="mx-auto max-w-xl">
        <form onSubmit={(e)=>handleUpdate(e)} className="space-y-5" >
          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Name{" "}
          </label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="Enter Your Name..."
            onChange={(e)  => handleEditUserChange(e)}
          />

          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Email{" "}
          </label>
          <input
            type="text"
            name="email"
            value={editUser.email}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="you@email.com"
            onChange={(e)  => handleEditUserChange(e)}
          />


<label className="mb-1 flex text-sm font-medium text-black">
            {" "}
            Gender{" "}
          </label>
          <div className="radio flex gap-8 text-black">
          <label>
            <input type="radio" name="gender" value="Male" checked={editUser.gender === "Male"} onChange={(e)  => handleEditUserChange(e)} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={editUser.gender === "Female"} onChange={(e)  => handleEditUserChange(e)} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="Others" checked={editUser.gender === "Others"} onChange={(e)  => handleEditUserChange(e)} />
            Others
          </label>
        </div>


        <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Date Of Birth{" "}
          </label>
          <input
            type="date"
            name="dob"
            value={editUser.dob}
            className="block w-full h-10 border-2 p-2 rounded-md shadow-sm "
            placeholder="Enter Your Phone Number..."
            onChange={(e)  => handleEditUserChange(e)}
          />

        <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            State{" "}
          </label>
          <select name="state" onChange={(e)  => handleEditUserChange(e)} value={editUser.state}  >
            <option defaultValue >Select your State</option>
            
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

          <label className="mb-1 block text-sm  font-medium text-black">
            {" "}
            Language{" "}
          </label>
          <div className='text-black' >
          <input
            type="checkbox"
            name="language"
            value="Tamil"
            onChange={(e)  => handleEditInputChange(e)}
          /><span>Tamil</span>
          <input
            type="checkbox"
            name="language"
            value="English"
            onChange={(e)  => handleEditInputChange(e)}
          /><span>English</span>
          <input
            type="checkbox"
            name="language"
            value="Malayalam"
            onChange={(e)  => handleEditInputChange(e)}
          /><span>Malayalam</span>
          <input
            type="checkbox"
            name="language"
            value="Hindi"
            onChange={(e)  => handleEditInputChange(e)}
          /><span>Hindi</span>
          
          </div>

         
          <label className="mb-1 block text-sm font-medium text-black">
           <p> Address:</p>
           </label>
            <textarea className="border-2" name="address" value={editUser.address} onChange={ (e)  => handleEditUserChange(e)}  rows={4} cols={40} />
            


          <label className="mb-1 block text-sm font-medium text-black">
            {" "}
            Image{" "}
          </label>
          
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            className="cursor-pointer text-black"
            onChange={ (e) => handleEditFileChange(e)}
          />

          
        <div>
        <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
          >
            Update
          </button>
          <button
            type="button"
            className="rounded-lg bg-red-700 ml-20 px-5 py-2.5 text-center text-sm font-medium text-white"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>

        </div>
          
          
        </form>
      </div>
    </div>
  )
}

export default EditUsers
