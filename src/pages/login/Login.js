import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    const handleSignin = (e) => {
        // alert('>>>');
       // navigate('/home');
        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/login",{
                username : values.username,
                password : values.password
            })
             .then(res => console.log(res))
           // .then((values) => localStorage.setItem("token", res.data.token))
            .catch(err => console.error(err));
            
      };
      

      const [values , setValues] = useState({
        username : "",
        password : "",
        showPass : false,

      });
    console.log(values);
    const handlePassVisibility = () => {
        setValues ({
            ...values,
            showPass: !values.showPass,
        });
        
    };

 
    return (
        
        <div className="App">
            <center> 
            <br /><br />
                <h1> Login </h1>

            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                onChange={(e) => setValues({...values,username:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type={values.showPass ? "text" :  "password"}
                    autoComplete="current-password"
                    onChange={(e) => setValues({...values,password:e.target.value})}
                />
            </div>

            <br />
            <div>
                dont have an account? <a href = "/signup"> click here.</a>
            </div>

            <br />
            <div>
                change password? <a href = "/changepass"> click here.</a>
            </div>

            <br />
            <div>
                <Button variant="contained" onClick={handleSignin}>Signin</Button>
                
            </div>
            </center>
        </div>
    );

}

export default Login;
