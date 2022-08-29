import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Changepass from './pages/changepass/Changepass';

const App = () => {

  
  return (
    < BrowserRouter >
      <div className="container mt-2" style={{ marginTop: 40 }}>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/changepass" element={<Changepass/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>

      </div>
    </BrowserRouter >

  );
  


  }

  

export default App;
