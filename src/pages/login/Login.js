import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { Form , message} from "antd";




const Login = () => {
    const navigate = useNavigate();
    //const location = useLocation();
    const handleSignin = (e) => {

        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/login",{
                username : values.username,
                password : values.password,
            
            })
             .then(res => { console.log(res)
            //   alert("Success")
              message.success("Login Success");
              localStorage.setItem("username", values.username);    
            //   navigate('/list_auction');
            //   navigate('/logout');
                     
             })
            .catch(err => {     
                if(err.response.status == 404){
                // alert("Your password is invalid")
                message.error("Username or Password Invalid");
                console.error(err)
            }else if(err.response.status == 500){
                // alert("Your username is invalid ")
                message.error("Username or Password Invalid");
                console.error(err)
            }
            });
                
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
        <Form> 
            <Form.Item>
        <div className="App">
            <center> 
            <br /><br />
                <h1> Login </h1>

            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    placeholder="input username"
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
                    placeholder="input password"
                    onChange={(e) => setValues({...values,password:e.target.value})}
                />
                 <br />
                 <div> 
                 Change your password?<a href = "/changepass"> click here.</a>
                 </div>
            </div>
            <br />
            <div>
                <Button variant="contained" onClick={handleSignin}>Sign in</Button>
                
            </div>
            <div>
                Don't have an account? <a href = "/signup"> Sign up</a>
            </div>
            </center>
        </div>    
                </Form.Item>
        </Form>
    );

}

export default Login;
