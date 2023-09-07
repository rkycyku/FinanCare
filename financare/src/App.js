import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Fatura from './Components/Fatura/Fatura'
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import Statistika from './Components/Dashboard/Statistika';
import TeDhenatEBiznesit from './Components/TeDhenatBiznesit/TeDhenatEBiznesit';
import TabelaEPorosive from './Components/Porosite/TabelaEPorosive';
import ProductTables from './Components/produktet/ProductTables';
import TabelaEKategorive from './Components/produktet/kategorit/TabelaEKategorive';
import TabelaEKompanive from './Components/produktet/kompanit/TabelaEKompanive';
import ZbritjetEProduktit from './Components/produktet/Zbritjet/ZbritjetEProduktit';
import TabelaEPerdoruesve from './Components/users/TabelaEPerdoruesve';
import Rolet from './Components/users/Rolet/Rolet';
import KodiZbritjes from './Components/kodiZbritjes/KodiZbritjes';
import KalkulimiIMallit from './Components/kalkulimi/KalkulimiIMallit';
import PerditesoTeDhenat from './Components/Dashboard/PerditesoTeDhenat';

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
