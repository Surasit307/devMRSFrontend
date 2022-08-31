import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';    

const Signup = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/account",{
                username : values.username,
                password : values.password,
                firstname : values.firstname,
                lastname : values.lastname,
                gender : values.gender,
                email : values.email,
                address : values.address,
            
            })
             .then(res => { console.log(res)
              alert("Success")
              navigate('/login');
             })
            .catch(err => {  
                alert("Failed")
                console.error(err)

            });
                
        };
      
      const [values , setValues] = useState({
        username : "",
        password : "",
        firstname : "",
        lastname : "",
        gender : "",
        email : "",
        address : "",
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
            <h1> Sign Up</h1>
           
            <div>
                <TextField
                    // required
                    id="outlined-required"
                    label="Username"
                    type="username"
                    onChange={(e) => setValues({...values,username:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setValues({...values,password:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-fisrtname-input"
                    label="Firstname"
                    type="firstname"
                    autoComplete="current-firstname"
                    onChange={(e) => setValues({...values,firstname:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-lastname-input"
                    label="Lastname"
                    type="lastname"
                    autoComplete="current-lastname"
                    onChange={(e) => setValues({...values,lastname:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-gender-input"
                    label="Gender"
                    type="gender"
                    autoComplete="current-gender"
                    onChange={(e) => setValues({...values,gender    :e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    onChange={(e) => setValues({...values,email:e.target.value})}
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-address-input"
                    label="Address"
                    type="address"
                    autoComplete="current-address"
                    onChange={(e) => setValues({...values,address:e.target.value})}
                />
            </div>

            <br />
            <div>
                Have an account? <a href = "/login"> click here.</a>
            </div>

            <br />
            <div>
                <Button variant="contained" onClick={handleSignup}>Sign up</Button>
            </div>
            </center>
        </div>
    );
}

export default Signup;
