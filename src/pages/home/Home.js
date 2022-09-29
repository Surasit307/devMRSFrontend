import { NavLink, withRouter } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import React, { useRef } from "react";
import axios from "axios";

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

    const handleDataTable = () => {
        // alert('>>>');
        navigate('/account');
    };

    const handleListAuction = () => {
        // alert('>>>');
        navigate('/list_auction');
    };

    const inputFile = useRef(null);

    const handleBrowser = (e) => {
        // const Browser = document.getElementById("file").value;
        // const Browser1 = document.getElementById("file").files[0]  ;
      inputFile.current.click();
    //   console.log("Path :" ,Browser);
    //   console.log("Path2 :" ,Browser1);
    };

    const handleFileChange = (event) => {
        const value = event.target.value;
        // this will return C:\fakepath\somefile.ext
        console.log(value);
        const files = event.target.files;
        //this will return an ARRAY of File object
        console.log(files);
    }
    
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

    <div>
        <br></br>
        <Button variant="contained" onClick={handleDataTable}>Data Table</Button>
    </div>

    <div>
        <br></br>
        <Button variant="contained" onClick={handleListAuction}>List Auction</Button>
    </div>

    <div>
    <br></br>

      <input
        type="file"
        id="file"
        name ="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange = {handleFileChange}
      ></input>
      <div></div>
      <Button variant="contained" onClick={handleBrowser}>open file browser</Button>
      </div>

     </center>
     </div> 

    );
}

export default Home;
