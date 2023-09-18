import NavBar from "../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Styles/TabelaEPorosive.css";
import "./Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../Components/layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import PerditesoStatusinPorosis from "../Components/Porosite/PerditesoStatusinPorosis";
import { TailSpin } from 'react-loader-spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

function TabelaEPorosive() {
    const [porosite, setPorosite] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [edito, setEdito] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);

    const [shfaqPorosite, setShfaqPorosite] = useState(true);
    const [shfaqDetajet, setShfaqDetajet] = useState(false);
    const [nrFatures, setNumriFatures] = useState(0);

    const [dataFillestare, setDataFillestare] = useState(null);
    const [dataFundit, setDataFundit] = useState(null);

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    useEffect(() => {
        const vendosPorosite = async () => {
            try {
                setLoading(true);
                const porosia = await axios.get("https://localhost:7285/api/Porosia/Porosit", authentikimi);
                setPorosite(porosia.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        vendosPorosite();
    }, [perditeso]);

    const handleEdito = (id) => {
        setEdito(true)
        setId(id)
    };
    const handleEditoMbyll = () => setEdito(false);

    const handleShfaqFaturen = (nrFatures) => {
        setShfaqPorosite(false);
        setNumriFatures(nrFatures);
        setShfaqDetajet(true);
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />

            <div className="containerDashboardP">
                {shfaqMesazhin && <Mesazhi
                    setShfaqMesazhin={setShfaqMesazhin}
                    pershkrimi={pershkrimiMesazhit}
                    tipi={tipiMesazhit}
                />}
                {edito && <PerditesoStatusinPorosis
                    largo={handleEditoMbyll}
                    id={id}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
                    perditesoTeDhenat={() => setPerditeso(Date.now())}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                />}
                {loading ? (
                    <div className="Loader">
                        <TailSpin
                            height="80"
                            width="80"
                            color="#009879"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                ) : (<>
                    <h1 className="title">
                        Porosite e Klienteve
                    </h1>
                    {
                        (dataFillestare && dataFundit) &&
                        <h1 className="title">
                            Porosit e datave: {new Date(dataFillestare).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} deri me {new Date(dataFundit).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </h1>
                    }

                    {shfaqPorosite &&
                        <>
                            <div className="DataPerFiltrim">
                                <div className="datat">
                                    <p>Data Fillimit:</p>
                                    <DatePicker selected={dataFillestare} onChange={date => setDataFillestare(date)} dateFormat="dd/MM/yyyy" maxDate={dataFundit} />
                                </div>
                                <div>
                                    <p>Data Mbarimit:</p>
                                    <DatePicker selected={dataFundit} onChange={date => setDataFundit(date)} dateFormat="dd/MM/yyyy" />
                                </div>
                                <div className="datat">
                                    <p>Reseto:</p>
                                    <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => { setDataFillestare(null); setDataFundit(null) }}>Shfaq Te Gjitha porosite</Button>
                                </div>
                            </div>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th>ID Porosia</th>
                                        <th>Klienti</th>
                                        <th>Totali Produkteve</th>
                                        <th>Totali €</th>
                                        <th>Totali pa TVSH €</th>
                                        <th>TVSH €</th>
                                        <th>Zbritja €</th>
                                        <th>Data e Porosise</th>
                                        <th>Statusi Porosis</th>
                                        <th>Funksione</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {porosite
                                        .filter((p) => {
                                            if (!dataFillestare || !dataFundit) {
                                                return true;
                                            } else {
                                                const dataPorosise = new Date(p.dataPorosis);
                                                return dataPorosise >= dataFillestare && dataPorosise <= dataFundit;
                                            }
                                        })
                                        .map((p) => (
                                            <tr key={p.idPorosia}>
                                                <td>{p.idPorosia}</td>
                                                <td>{p.idKlienti} - {p.emri} {p.mbiemri}</td>
                                                <td>{p.totaliProdukteve}</td>
                                                <td>{parseFloat(p.totaliPorosis).toFixed(2)} €</td>
                                                <td>{parseFloat(p.totaliPorosis - (p.totaliPorosis * 0.152542)).toFixed(2)} €</td>
                                                <td>{parseFloat((p.totaliPorosis * 0.152542)).toFixed(2)} €</td>
                                                <td>{parseFloat(p.zbritja).toFixed(2)} €</td>
                                                <td>{new Date(p.dataPorosis).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                                                <td>{p.statusiPorosis}</td>
                                                <td>
                                                    <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleShfaqFaturen(p.idPorosia)}><FontAwesomeIcon icon={faInfoCircle} /></Button>
                                                    {p.statusiPorosis !== "E Pranuar nga Klienti" &&
                                                        <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleEdito(p.idPorosia)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                </MDBTableBody>
                            </MDBTable>
                        </>
                    }
                </>
                )}
            </div >
        </>
    );
};

export default TabelaEPorosive;
