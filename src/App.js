import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home';

const App = () => {

  return (
    < BrowserRouter >
      <div className="container mt-2" style={{ marginTop: 40 }}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
