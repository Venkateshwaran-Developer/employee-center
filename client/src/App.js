import React,{createContext, useState} from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import AddUser from './components/AddUser';
import EmployeeCard from './components/EmployeeCard';

export const ThemeContext = createContext();


function App() {

const [emp, setEmp] = useState([]);

return (
    <div>
    <ThemeContext.Provider value={{emp,setEmp}}>

      <BrowserRouter>
      <Routes>
         <Route path="/" element={<EmployeeCard/>} />
         <Route path="/adduser" element={<AddUser/>} /> 
      </Routes>  
      </BrowserRouter>
  </ThemeContext.Provider>
    </div>
  );
}

export default App;
