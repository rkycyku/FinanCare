import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ShtoRolin from "../../../Components/Gjenerale/Stafi/users/Rolet/ShtoRolin";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import LargoRolin from "../../../Components/Gjenerale/Stafi/users/Rolet/LargoRolin";
import { TailSpin } from 'react-loader-spinner';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function TabelaEKompanive(props) {
    const [rolet, setRolet] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [shto, setShto] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [emriRolit, setEmriRolit] = useState(0);
    const [loading, setLoading] = useState(false);

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    useEffect(() => {
        const vendosRolet = async () => {
            try {
                setLoading(true);
                const roli = await axios.get("https://localhost:7285/api/Authenticate/shfaqRolet", authentikimi);
                setRolet(roli.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        vendosRolet();
    }, [perditeso]);

    const handleClose = () => {
        setShto(false);
    }
    const handleShow = () => setShto(true);

    const handleFshij = (emri) => {
        setFshij(true)
        setEmriRolit(emri)
    };
    const handleFshijMbyll = () => setFshij(false);

    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />


            <div className="containerDashboardP">
                {shto && <ShtoRolin
                    shfaq={handleShow}
                    largo={handleClose}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
                    perditesoTeDhenat={() => setPerditeso(Date.now())}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                />}
                {shfaqMesazhin && <Mesazhi
                    setShfaqMesazhin={setShfaqMesazhin}
                    pershkrimi={pershkrimiMesazhit}
                    tipi={tipiMesazhit}
                />}
                {fshij && <LargoRolin
                    largo={handleFshijMbyll}
                    emriRolit={emriRolit}
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
                        Lista e Roleve ne Sistem
                    </h1>

                    <MDBBtn className="Butoni"><Link to="/Stafi">Mbyll Rolet <FontAwesomeIcon icon={faClose} /></Link></MDBBtn>
                    <MDBBtn className="mb-3 Butoni" onClick={handleShow}>Shto Rolin <FontAwesomeIcon icon={faPlus} /></MDBBtn>

                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Roli</th>
                                <th scope="col">Totali Perdorueseve ne kete Rol</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {rolet.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.name}</td>
                                    <td >{r.totaliPerdoruesve !== null ? r.totaliPerdoruesve : "Nuk Ka asnje perdorues ne kete role"}</td>
                                    <td >
                                        <Button variant="danger" onClick={() => handleFshij(r.name)}><FontAwesomeIcon icon={faBan} /></Button>
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
