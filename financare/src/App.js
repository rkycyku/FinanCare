import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Fatura from './Components/Fatura/Fatura'
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import Statistika from './Pages/Statistika';
import TeDhenatEBiznesit from './Pages/TeDhenatEBiznesit';
import TabelaEPorosive from './Pages/TabelaEPorosive';
import ProductTables from './Pages/ProductTables';
import NjesiaMatese from './Pages/NjesiaMatese';
import TabelaEPartnereve from './Pages/TabelaEPartnereve';
import ZbritjetEProduktit from './Pages/ZbritjetEProduktit';
import TabelaEPerdoruesve from './Pages/TabelaEPerdoruesve';
import Rolet from './Pages/Rolet';
import KalkulimiIMallit from './Pages/KalkulimiIMallit';
import PerditesoTeDhenat from './Pages/PerditesoTeDhenat';
import KrijoPorosine from './Pages/KrijoPorosine';
import ShtoPartnerin from './Pages/ShtoPartnerin';

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
        <Route path='/Dashboard' element={<Dashboard key={Date.now()} />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Statistika' element={<Statistika />} />
        <Route path='/TeDhenatEBiznesit' element={<TeDhenatEBiznesit />} />
        <Route path='/Porosite' element={<TabelaEPorosive />} />
        <Route path='/Produktet' element={<ProductTables />} />
        <Route path='/NjesiaMatese' element={<NjesiaMatese />} />
        <Route path='/TabelaEPartnereve' element={<TabelaEPartnereve />} />
        <Route path='/ZbritjetEProduktit' element={<ZbritjetEProduktit />} />
        <Route path='/Stafi' element={<TabelaEPerdoruesve />} />
        <Route path='/Rolet' element={<Rolet />} />
        <Route path='/KalkulimiIMallit' element={<KalkulimiIMallit />} />
        <Route path='/PerditesoTeDhenat' element={<PerditesoTeDhenat />} />
        <Route path='/KrijoPorosine' element={<KrijoPorosine />} />
        <Route path='/ShtoPartnerin' element={<ShtoPartnerin />}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Fatura/:nrFatures" element={<Fatura />} />
      </Routes>
    </div>
  );
}

export default App;
