import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Fatura from './Components/TeTjera/Fatura/Fatura'
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import Statistika from './Pages/Materiali/Shitjet/Statistika';
import TeDhenatEBiznesit from './Pages/Gjenerale/TeDhenat/TeDhenatEBiznesit';
import TabelaEPorosive from './Pages/Materiali/Shitjet/Porosite/TabelaEPorosive';
import ListaEProdukteve from './Pages/Materiali/Artikujt/ListaEProdukteve';
import NjesiaMatese from './Pages/Materiali/Artikujt/NjesiaMatese'
import TabelaEPartnereve from './Pages/Gjenerale/Partneret/TabelaEPartnereve';
import ZbritjetEProduktit from './Pages/Materiali/Artikujt/ZbritjetEProduktit';
import TabelaEPerdoruesve from './Pages/Gjenerale/Stafi/TabelaEPerdoruesve';
import Rolet from './Pages/Gjenerale/Stafi/Rolet';
import KalkulimiIMallit from './Pages/Materiali/Hyrjet/KalkulimiIMallit';
import PerditesoTeDhenat from './Pages/Gjenerale/TeDhenat/PerditesoTeDhenat';
import KrijoPorosine from './Pages/Materiali/Shitjet/Porosite/KrijoPorosine';
import ShtoPartnerin from './Pages/Gjenerale/Partneret/ShtoPartnerin';
import KthimiMallitTeShitur from './Pages/Materiali/Hyrjet/KthimiMallitTeShitur';
import AsgjesimiIStokut from './Pages/Materiali/Shitjet/AsgjesimIStokut'

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
        <Route path='/Produktet' element={<ListaEProdukteve />} />
        <Route path='/NjesiaMatese' element={<NjesiaMatese />} />
        <Route path='/TabelaEPartnereve' element={<TabelaEPartnereve />} />
        <Route path='/ZbritjetEProduktit' element={<ZbritjetEProduktit />} />
        <Route path='/Stafi' element={<TabelaEPerdoruesve />} />
        <Route path='/Rolet' element={<Rolet />} />
        <Route path='/KalkulimiIMallit' element={<KalkulimiIMallit />} />
        <Route path='/PerditesoTeDhenat' element={<PerditesoTeDhenat />} />
        <Route path='/KrijoPorosine' element={<KrijoPorosine />} />
        <Route path='/ShtoPartnerin' element={<ShtoPartnerin />}/>
        <Route path='/KthimiMallitTeShitur' element={<KthimiMallitTeShitur />} />
        <Route path='/AsgjesimiIStokut' element={<AsgjesimiIStokut />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Fatura/:nrFatures" element={<Fatura />} />
      </Routes>
    </div>
  );
}

export default App;
