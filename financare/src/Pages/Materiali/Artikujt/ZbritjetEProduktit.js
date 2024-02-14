import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ProduktiNeZbritje from "../../../Components/Materiali/Artikujt/Zbritjet/ProduktiNeZbritje";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import { TailSpin } from 'react-loader-spinner';
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import FshijZbritjen from '../../../Components/Materiali/Artikujt/Zbritjet/FshijZbritjen';
import { Link } from "react-router-dom";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

function ZbritjetEProduktit(props) {
    const [zbritjet, setZbritjet] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [shtoZbritjen, setShtoZbritjen] = useState(false);
    const [mbyllFature, setMbyllFaturen] = useState(true);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [fshij, setFshij] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    useEffect(() => {
        const shfaqZbritjet = async () => {
            try {
                setLoading(true);
                const zbritja = await axios.get("https://localhost:7285/api/ZbritjaQmimitProduktit/shfaqZbritjet", authentikimi);
                setZbritjet(zbritja.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqZbritjet();
    }, [perditeso]);

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString('en-GB', { dateStyle: 'short' });
        zbritjet.forEach(zbritja => {
            const dataSkadimit = new Date(zbritja.dataSkadimit).toLocaleDateString('en-GB', { dateStyle: 'short' });
            if (dataSkadimit < currentDate) {
                fshijZbritjen(zbritja.produktiID);
            }
        });
    }, [zbritjet])

    const fshijZbritjen = (id) => {
        axios.delete(`https://localhost:7285/api/ZbritjaQmimitProduktit/fshijZbritjenProduktit?id=${id}`, authentikimi)
        setPerditeso(Date.now());
    }

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

                {shfaqMesazhin &&
                    <Mesazhi
                        setShfaqMesazhin={setShfaqMesazhin}
                        pershkrimi={pershkrimiMesazhit}
                        tipi={tipiMesazhit}
                    />
                }
                {fshij && <FshijZbritjen
                    largo={handleFshijMbyll}
                    fshijZbritjen={() => fshijZbritjen(id)}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                    perditeso={() => setPerditeso(Date.now())}
                />}
                {shtoZbritjen && <ProduktiNeZbritje
                    mbyllZbritjen={() => setShtoZbritjen(false)}
                    shfaq={() => setShtoZbritjen(true)}
                    setPerditeso={setPerditeso}
                    setTipiMesazhit={setTipiMesazhit}
                    setPershkrimiMesazhit={setPershkrimiMesazhit}
                    shfaqmesazhin={() => setShfaqMesazhin(true)}
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
                ) : (mbyllFature && <>
                    <h1 className="title">
                        Zbritjet e Produkteve
                    </h1>
                    <MDBBtn className="Butoni"><Link to="/Produktet">Mbyll Zbritjet <FontAwesomeIcon icon={faClose} /></Link></MDBBtn>
                    <MDBBtn className="mb-3 Butoni" onClick={() => setShtoZbritjen(true)}>Shto Zbritjen <FontAwesomeIcon icon={faPlus} /></MDBBtn>

                    <MDBTable align="middle">
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Nr. Zbritjes</th>
                                <th scope="col">ID dhe Emri Produktit</th>
                                <th scope="col">Rabati</th>
                                <th scope="col">Data e Zbritjes</th>
                                <th scope="col">Data e Skadimit</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>

                        <MDBTableBody>
                            {zbritjet.map((z, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{z.produktiID + " - " + z.emriProduktit}</td>
                                    <td >{parseFloat(z.rabati).toFixed(2)} % </td>
                                    <td >{new Date(z.dataZbritjes).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                    <td >{new Date(z.dataSkadimit).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                    <td >
                                        <Button style={{ marginRight: "0.5em" }} variant="danger" onClick={() => handleFshij(z.produktiID)}><FontAwesomeIcon icon={faClose} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </>
                )
                }
            </div >
        </>
    );
};

export default ZbritjetEProduktit;
