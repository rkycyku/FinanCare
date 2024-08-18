import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPenToSquare, faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import EditoKompanin from "../../../Components/Gjenerale/Partneret/Partneri/EditoPartnerin";
import LargoKompanin from "../../../Components/Gjenerale/Partneret/Partneri/LargoPartnerin";
import { TailSpin } from 'react-loader-spinner';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function TabelaEKompanive(props) {
    const [partneret, setPartneret] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [shto, setShto] = useState(false);
    const [edito, setEdito] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    useEffect(() => {
        const shfaqPartneret = async () => {
            try {
                setLoading(true);
                const partneri = await axios.get("https://localhost:7285/api/Partneri/shfaqPartneret", authentikimi);
                setPartneret(partneri.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqPartneret();
    }, [perditeso]);

    const handleEdito = (id) => {
        setEdito(true)
        setId(id)
    };
    const handleEditoMbyll = () => setEdito(false);

    const handleFshij = (id) => {
        setFshij(true)
        setId(id)
    };
    const handleFshijMbyll = () => setFshij(false);

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
                {edito && <EditoKompanin
                    largo={handleEditoMbyll}
                    id={id}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
                    perditesoTeDhenat={() => setPerditeso(Date.now())}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                />}
                {fshij && <LargoKompanin
                    largo={handleFshijMbyll}
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
                        Lista e Kompanive Partnere
                    </h1>

                    <Link to="/Produktet"><MDBBtn className="Butoni">Mbyll Partnerin <FontAwesomeIcon icon={faClose} /></MDBBtn></Link>
                    <Link to='/ShtoPartnerin'><MDBBtn className="mb-3 Butoni" >Shtoni Partnerin <FontAwesomeIcon icon={faPlus} /></MDBBtn></Link>
                    <Link to='/ShtoPagesat'><MDBBtn className="mb-3 Butoni" >Pagesat <FontAwesomeIcon icon={faPlus} /></MDBBtn></Link>

                    <MDBTable align="middle">
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Emri i Partnerit</th>
                                <th scope="col">Shkurtesa</th>
                                <th scope="col">NUI / NF / NRTVSH</th>
                                <th scope="col">NR. Kontaktit</th>
                                <th scope="col">Email</th>
                                <th scope="col">Adresa</th>
                                <th scope="col">Lloji Partnerit</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {partneret.map((p) => (
                                <tr key={p.idpartneri}>
                                    <td>{p.emriBiznesit}</td>
                                    <td>{p.shkurtesaPartnerit}</td>
                                    <td>{p.nui + " / " + p.nrf + " / " + p.tvsh}</td>
                                    <td>{p.nrKontaktit}</td>
                                    <td>{p.email}</td>
                                    <td>{p.adresa !== null && p.adresa.trim() !== '' ? p.adresa : "Nuk Ka Adrese"}</td>
                                    <td>{p.llojiPartnerit}</td>
                                    <td >
                                        <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleEdito(p.idPartneri)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        <Button variant="danger" onClick={() => handleFshij(p.idPartneri)}><FontAwesomeIcon icon={faBan} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </>
                )}
            </div >
        </>
    );
};

export default TabelaEKompanive;
