import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { message } from "antd";
import axios from 'axios';

const Changepass = () => {
    const navigate = useNavigate();
   // const location = useLocation();

    const handleChange = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/newpassword",{
                username : values.username,
                password : values.password,
                newpassword : values.newpassword,
            
            })
             .then(res => { console.log(res)
            //   alert("Success")
              message.success("Change password success")
            //   navigate('/login');
             })
            .catch(err => {  
                // alert("Failed")
                message.error("Change password Failed")
                console.error(err)

            });
                
      };
      

      const [values , setValues] = useState({
        username : "",
        password : "",
        newpasswod : "",
        showPass : false,
        showNewPass : false,

      });
    console.log(values);

    const handlePassVisibility = () => {
        setValues ({
            ...values,
            showPass: !values.showPass,
            showNewPass: !values.showNewPass,
        });

    };


    return (
        
        <div className="App">
            <center> 
            <h1> Change Password </h1>
            <br />
            <div>
                <TextField
                    // required
                    id="outlined-required"
                    label="Username"
                    type = "username"
                    onChange={(e) => setValues({...values,username:e.target.value})}
                />
            </div>
            <br />
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type={values.showNewPass ? "text" :  "password"}
                    autoComplete="current-password"
                    onChange={(e) => setValues({...values,password:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-newpassword-input"
                    label="NewPassword"
                    type={values.showNewPass ? "text" :  "password"}
                    autoComplete="current-newpassword"
                    onChange={(e) => setValues({...values,newpassword:e.target.value})}
                />
            </div>
            <br />
            <div>
                return to login <a href = "/login"> click here.</a>
            </div>

            <br />
            <div>
                <Button variant="contained" onClick={handleChange}>Change</Button>
            </div>
            </center>
        </div>
    );
}

export default Changepass;
