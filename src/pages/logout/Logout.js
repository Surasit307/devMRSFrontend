import { NavLink, withRouter } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const Home = () => {    
    const navigate = useNavigate();
    const location = useLocation();

const handleLogout = (e) => {
        // alert('>>>');
        //navigate('/home');

        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/logout",{
                // username : values.username,
                username : values.response.data.username,
            })
             .then(res => { console.log(res)
              navigate('/home');
             })
            .catch(err => {  
                 console.error(err)
            });
                
      };
      
      const [values , setValues] = useState({
        username : ''
      });

    console.log(values);
    


    return (
    <div> 
    <center> 

     <div>
        <br></br>
        <Button variant="contained" onClick={handleLogout} 
         onChange={(e) => setValues({...values,username:e.target.value})}> Logout</Button>

    </div>

     </center>
     </div> 

    );
}

export default Home;
