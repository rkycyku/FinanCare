import NavBar from "../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import RegjistroFaturen from "../Components/kalkulimi/RegjistroFaturen";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus } from '@fortawesome/free-solid-svg-icons'
import TeDhenatKalkulimit from "../Components/kalkulimi/TeDhenatKalkulimit";
import { TailSpin } from 'react-loader-spinner';
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

function KalkulimiIMallit() {
    const [kalkulimet, setKalkulimet] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [shto, setShto] = useState(false);
    const [shfaqTeDhenat, setShfaqTeDhenat] = useState(false);
    const [mbyllFature, setMbyllFaturen] = useState(true);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    useEffect(() => {
        const shfaqKalkulimet = async () => {
            try {
                setLoading(true);
                const kalkulimi = await axios.get("https://localhost:7285/api/RegjistrimiStokut/shfaqRegjistrimet", authentikimi);
                setKalkulimet(kalkulimi.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqKalkulimet();
    }, [perditeso]);

    const handleRegjistroFatuern = () => {
        setShto(true)
        setMbyllFaturen(false)
    }

    const mbyllFaturen = () => {
        setMbyllFaturen(true);
        setShto(false);
    }

    const handleShfaqTeDhenat = (id) => {
        setShfaqTeDhenat(true);
        setMbyllFaturen(false);
        setId(id);
    };

    const mbyllTeDhenat = () => {
        setMbyllFaturen(true);
        setShfaqTeDhenat(false);
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />
            <div className="containerDashboardP">

                {shto && <RegjistroFaturen
                    setMbyllFaturen={mbyllFaturen}
                    setPerditeso={setPerditeso}
                />}
                {shfaqTeDhenat && <TeDhenatKalkulimit
                    setMbyllTeDhenat={mbyllTeDhenat}
                    id={id}
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
                        Lista e Kalkulimeve
                    </h1>


                    <Button
                        className="mb-3 Butoni"
                        onClick={handleRegjistroFatuern}

                    >
                        Regjistro Faturen <FontAwesomeIcon icon={faPlus} />
                    </Button>

                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Nr. Kalkulimit</th>
                                <th scope="col">Stafi Pergjegjes</th>
                                <th scope="col">Shuma totale e fatures</th>
                                <th scope="col">Totali i Produkteve ne fature</th>
                                <th scope="col">Data Regjistrimit</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>

                        <MDBTableBody>
                            {kalkulimet.map((k) => (
                                <tr key={k.idRegjistrimit}>
                                    <td>{k.idRegjistrimit}</td>
                                    <td>{k.stafiId + " - " + k.username}</td>
                                    <td >{k.shumaTotaleRegjistrimit.toFixed(2)} €
                                    </td>
                                    <td>{k.totaliProdukteveRegjistruara}</td>
                                    <td >{new Date(k.dataRegjistrimit).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                    <td >
                                        <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleShfaqTeDhenat(k.idRegjistrimit)}><FontAwesomeIcon icon={faCircleInfo} /></Button>
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

export default KalkulimiIMallit;
