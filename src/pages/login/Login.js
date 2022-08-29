import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSingin = () => {
        // alert('>>>');
        navigate('/home');
      };
    
    return (
        <div className="App">
            <br /><br />
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
                <Button variant="contained" onClick={handleSingin}>Signin</Button>
            </div>
        </div>
    );
}

export default Login;
