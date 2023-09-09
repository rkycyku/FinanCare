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
import TabelaEKategorive from './Pages/TabelaEKategorive';
import TabelaEKompanive from './Pages/TabelaEKompanive';
import ZbritjetEProduktit from './Pages/ZbritjetEProduktit';
import TabelaEPerdoruesve from './Pages/TabelaEPerdoruesve';
import Rolet from './Pages/Rolet';
import KodiZbritjes from './Pages/KodiZbritjes';
import KalkulimiIMallit from './Pages/KalkulimiIMallit';
import PerditesoTeDhenat from './Pages/PerditesoTeDhenat';

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
        <Route path='/Kategorite' element={<TabelaEKategorive />} />
        <Route path='/Kompanite' element={<TabelaEKompanive />} />
        <Route path='/ZbritjetEProduktit' element={<ZbritjetEProduktit />} />
        <Route path='/Stafi' element={<TabelaEPerdoruesve />} />
        <Route path='/Rolet' element={<Rolet />} />
        <Route path='/KodiZbritjes' element={<KodiZbritjes />} />
        <Route path='/KalkulimiIMallit' element={<KalkulimiIMallit />} />
        <Route path='/PerditesoTeDhenat' element={<PerditesoTeDhenat />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Fatura/:nrFatures" element={<Fatura />} />
      </Routes>
    </div>
  );
}

export default App;
