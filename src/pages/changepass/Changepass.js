import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';

const Changepass = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = () => {
        // alert('>>>');
        navigate('/login');
      };
    
    return (
        
        <div className="App">
            <center> 
            <br /><br />
                <h1> Change Password </h1>
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
                    id="outlined-newpassword-input"
                    label="New Password"
                    type="newpassword"
                    autoComplete="current-newpassword"
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
