import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Cart from './Pages/Cart';
import Fatura from './Components/Fatura/Fatura'
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1350,
      once: true
    }, [])
  })


  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/Dashboard' element={<Dashboard key={Date.now()}/> } />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Fatura/:nrFatures" element = {<Fatura />} />
      </Routes>
    </div>
  );
}

export default App;
