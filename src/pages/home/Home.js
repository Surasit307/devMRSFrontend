import { NavLink, withRouter } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';

const Home = () => {    
    const navigate = useNavigate();
    const location = useLocation();

const handleSignin = () => {
        // alert('>>>');
        navigate('/login');
    };

    const handleSignup = () => {
        // alert('>>>');
        navigate('/signup');
    };
    return  (

    <div> 
    <center> 

     <div>
        <br></br>
        <Button variant="contained" onClick={handleSignin}>Sign in</Button>
    </div>

    <div>
        <br></br>
        <Button variant="contained" onClick={handleSignup}>Sign up</Button>
    </div>

     </center>
     </div> 

    );
}

export default Home;
