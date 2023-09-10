import NavBar from "../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import classes from './Styles/TabelaEPerdoruesve.module.css';
import axios from "axios";
import Mesazhi from "../Components/layout/Mesazhi";
import { TailSpin } from 'react-loader-spinner';
import EditoPerdorues from "../Components/users/EditoPerdorues";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import Rolet from "./Rolet"
import { Link } from "react-router-dom";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

function TabelaEPerdoruesve() {
    const [perdoruesit, setPerdoruesit] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [edito, setEdito] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [mbyllRolet, setMbyllRolet] = useState(true);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const shfaqPerdoruesit = async () => {
            try {
                setLoading(true);
                const perdoruesit = await axios.get("https://localhost:7285/api/Perdoruesi/shfaqPerdoruesit", authentikimi);
                setPerdoruesit(perdoruesit.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqPerdoruesit();
    }, [perditeso]);

    const handleEdito = (id) => {
        setEdito(true)
        setId(id)
    };
    const handleEditoMbyll = () => setEdito(false);


    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />
            <div className={classes.containerDashboardP}>

                {mbyllRolet == false &&
                    <Rolet
                        setMbyllRolet={() => setMbyllRolet(true)}
                        setPerditeso={() => setPerditeso(Date.now())}
                    />
                }
                {shfaqMesazhin && <Mesazhi
                    setShfaqMesazhin={setShfaqMesazhin}
                    pershkrimi={pershkrimiMesazhit}
                    tipi={tipiMesazhit}
                />}
                {edito && <EditoPerdorues
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
                ) : (
                    mbyllRolet &&
                    <>
                        <h1 className="title">
                            Lista e Perdoruesve
                        </h1>

                        <Link to={"/Rolet"} ><MDBBtn className="mb-3 Butoni">Menaxho Rolet <FontAwesomeIcon icon={faInfoCircle} /></MDBBtn></Link>
                        <Link to={"/Signup"} ><MDBBtn className="mb-3 Butoni">Krijoni nje Llogari <FontAwesomeIcon icon={faInfoCircle} /></MDBBtn></Link>

                        <MDBTable align="middle">
                            <MDBTableHead>
                                <tr>
                                    <th scope="col">ID User</th>
                                    <th scope="col">Emri & Mbiemri</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Aksesi</th>
                                    <th scope="col">Funksione</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {perdoruesit.map((k) => (
                                    <tr key={k.perdoruesi.userId}>
                                        <td>{k.perdoruesi.userId}</td>
                                        <td>{k.perdoruesi.emri} {k.perdoruesi.mbiemri}</td>
                                        <td > {k.perdoruesi.email} </td>
                                        <td >{k.perdoruesi.username}</td>
                                        <td>{k.rolet.join(', ')}</td>
                                        <td>
                                            <Button
                                                style={{ marginRight: "0.5em" }}
                                                variant="success"
                                                onClick={() => handleEdito(k.perdoruesi.aspNetUserId)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
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

export default TabelaEPerdoruesve;
