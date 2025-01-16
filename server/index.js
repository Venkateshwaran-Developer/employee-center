const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectdatabase = require('./config/connectdatabase');
dotenv.config({ path: './config/.env' });
const cors = require('cors');
app.use(express.json());
app.use(cors());
const EmployeeModel  = require('./router/router');

connectdatabase();


//static folder
app.use(express.static('public'))

app.use('/api/v1', EmployeeModel);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})