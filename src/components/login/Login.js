import logo from './logo.svg';
import './Login.css';
import { Button, TextField } from '@mui/material';

function Login() {
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
                <Button variant="contained">Signin</Button>
            </div>
        </div>
    );
}

export default Login;
