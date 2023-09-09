import NavBar from "../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import classes from './Styles/Rolet.module.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import ShtoRolin from "../Components/users/Rolet/ShtoRolin";
import Mesazhi from "../Components/layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import LargoRolin from "../Components/users/Rolet/LargoRolin";
import { TailSpin } from 'react-loader-spinner';
import { MDBBtn } from "mdb-react-ui-kit";
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


            <div className={classes.containerDashboardP}>
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

                    <table style={{ whiteSpace: "unset", }}>
                        <tr>
                            <th>Roli</th>
                            <th>Totali Perdorueseve ne kete Rol</th>
                            <th>Funksione</th>
                        </tr>

                        {rolet.map((r) => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td >{r.totaliPerdoruesve !== null ? r.totaliPerdoruesve : "Nuk Ka asnje perdorues ne kete role"}</td>
                                <td >
                                    <Button variant="danger" onClick={() => handleFshij(r.name)}><FontAwesomeIcon icon={faBan} /></Button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </>
                )}
            </div >
        </>
    );
};

export default TabelaEKompanive;
