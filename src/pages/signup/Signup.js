import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';    
import TextArea from "antd/lib/input/TextArea";
import { Select, message } from "antd";
import { height } from "@mui/system";

const Signup = () => {
    const navigate = useNavigate();
    //const location = useLocation();
    const { Option } = Select;
    const handleSignup = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8083/api/v1/createAccount",{
                username : values.username,
                password : values.password,
                firstname : values.firstname,
                lastname : values.lastname,
                gender : values.gender,
                email : values.email,
                address : values.address,
            
            })
             .then(res => { console.log(res)
              message.success("Your account has been created")
            //   navigate('/login');
             })
            .catch(err => {  
                // alert("Failed")
                message.error("Sign Up Failed")
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
                    autoComplete="current-password"
                    type={values.showPass ? "text" :  "password"}
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
                {/* <TextField
                    id="outlined-gender-input"
                    label="Gender"
                    type="gender"
                    autoComplete="current-gender"
                    onChange={(e) => setValues({...values,gender:e.target.value})}
                /> */}

                <Select style={{width:100 ,marginRight:120}} placeholder={'Gender'} onChange={(value) => setValues({...values,gender:value})}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
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
                <TextArea
                    showCount maxLength={100}
                    style={{width: 220 , height:75}}
                    id="outlined-address-input"
                    label="Address"
                    type="address"
                    autoComplete="current-address"
                    placeholder="Input Address"
                    onChange={(e) => setValues({...values,address:e.target.value})}
                />
                {/* <Input.TextArea showCount maxLength={100} /> */}

                
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
