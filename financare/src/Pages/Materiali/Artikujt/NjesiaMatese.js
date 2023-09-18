import NavBar from "../../../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ShtoKategori from "../../../Components/produktet/kategorit/ShtoKategori";
import Mesazhi from "../../../Components/layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPenToSquare, faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import EditoKategorin from "../../../Components/produktet/kategorit/EditoKategorin";
import LargoKategorin from "../../../Components/produktet/kategorit/LargoKategorin";
import { TailSpin } from 'react-loader-spinner';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function TabelaEKategorive(props) {
    const [kategorit, setKategorit] = useState([]);
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
        const shfaqKateogrit = async () => {
            try {
                setLoading(true);
                const kategoria = await axios.get("https://localhost:7285/api/Kategoria/shfaqKategorit", authentikimi);
                setKategorit(kategoria.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqKateogrit();
    }, [perditeso]);

    const handleClose = () => {
        setShto(false);
    }
    const handleShow = () => setShto(true);

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
                {shto && <ShtoKategori
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
                {edito && <EditoKategorin
                    largo={handleEditoMbyll}
                    id={id}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
                    perditesoTeDhenat={() => setPerditeso(Date.now())}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                />}
                {fshij && <LargoKategorin
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
                        Njesite Matese
                    </h1>

                    <Link to="/Produktet"><MDBBtn className="Butoni">Mbyllni Njesine Matese <FontAwesomeIcon icon={faClose} /></MDBBtn></Link>
                    <MDBBtn className="mb-3 Butoni" onClick={handleShow}>Shtoni Njesine Matese <FontAwesomeIcon icon={faPlus} /></MDBBtn>


                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">ID Kategorise</th>
                                <th scope="col">Emri Kategoris</th>
                                <th scope="col">Pershkrimi Kategoris</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>

                        <MDBTableBody>
                            {kategorit.map((k) => (
                                <tr key={k.kategoriaId}>
                                    <td>{k.kategoriaId}</td>
                                    <td>{k.llojiKategoris}</td>
                                    <td >{k.pershkrimiKategoris !== null && k.pershkrimiKategoris.trim() !== '' ? k.pershkrimiKategoris : "Nuk Ka Pershkrim"}</td>
                                    <td >
                                        <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleEdito(k.kategoriaId)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        <Button variant="danger" onClick={() => handleFshij(k.kategoriaId)}><FontAwesomeIcon icon={faBan} /></Button>
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

export default TabelaEKategorive;
