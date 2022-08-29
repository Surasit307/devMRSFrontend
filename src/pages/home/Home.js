import { NavLink, withRouter } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';

const Home = () => {    
    const navigate = useNavigate();
    const location = useLocation();

const handleSingin = () => {
        // alert('>>>');
        navigate('/login');
    };

    const handleSingup = () => {
        // alert('>>>');
        navigate('/signup');
    };
    return  (

    <div> 
    <center> 

     <div>
        <br></br>
        <Button variant="contained" onClick={handleSingin}>Sign in</Button>
    </div>

    <div>
        <br></br>
        <Button variant="contained" onClick={handleSingup}>Sign up</Button>
    </div>

     </center>
     </div> 

    );
}

export default Home;
