import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSave = () => {
        // alert('>>>');
        navigate('/login');
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
                // defaultValue="Hello World"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-fisrtname-input"
                    label="Firstname"
                    type="firstname"
                    autoComplete="current-firstname"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-lastname-input"
                    label="Lastname"
                    type="lastname"
                    autoComplete="current-lastname"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-gender-input"
                    label="Gender"
                    type="gender"
                    autoComplete="current-gender"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-address-input"
                    label="Address"
                    type="address"
                    autoComplete="current-address"
                />
            </div>

            <br />
            <div>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                />
            </div>

            <br />
            <div>
                Have an account? <a href = "/login"> click here.</a>
            </div>

            <br />
            <div>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </div>
            </center>
        </div>
    );
}

export default Signup;
