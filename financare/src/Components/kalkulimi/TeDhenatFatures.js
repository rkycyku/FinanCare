import { useEffect, useState } from "react";
import '../../Pages/Styles/DizajniPergjithshem.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { TailSpin } from 'react-loader-spinner';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

function RegjistroFaturen(props) {
    const [perditeso, setPerditeso] = useState('');
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [loading, setLoading] = useState(false);
    const [produktetNeKalkulim, setproduktetNeKalkulim] = useState([]);
    const [emriProduktit, setemriProduktit] = useState('');
    const [produktiID, setProduktiID] = useState(0);
    const [produktet, setProduktet] = useState([]);
    const [sasia, setSasia] = useState("");
    const [qmimiBleres, setQmimiBleres] = useState("");
    const [qmimiShites, setQmimiShites] = useState("");
    const [totProdukteve, setTotProdukteve] = useState(0);
    const [totFaturesShitese, setTotFaturesShitese] = useState(0);
    const [totFaturesBlerese, setTotFaturesBlerese] = useState(0);
    const [sasiaNeStok, setSasiaNeStok] = useState(0);
    const [qmimiB, setQmimiB] = useState(0);
    const [qmimiSH, setQmimiSH] = useState(0);
    const [nrFatMeRradhe, setNrFaturesMeRradhe] = useState(0);

    const [kalkulimet, setKalkulimet] = useState([]);
    const [shto, setShto] = useState(false);
    const [shfaqTeDhenat, setShfaqTeDhenat] = useState(false);
    const [mbyllFature, setMbyllFaturen] = useState(true);
    const [id, setId] = useState(0);

    const [edito, setEdito] = useState(false);
    const [konfirmoMbylljenFatures, setKonfirmoMbylljenFatures] = useState(false);

    const [teDhenat, setTeDhenat] = useState([]);


    const navigate = useNavigate();

    const getID = localStorage.getItem("id");

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    const handleShfaqTeDhenat = (id) => {
        setShfaqTeDhenat(true);
        setMbyllFaturen(false);
        setId(id);
    };
    useEffect(() => {
        const shfaqKalkulimet = async () => {
            try {
                setLoading(true);
                const kalkulimi = await axios.get("https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimet", authentikimi);
                setKalkulimet(kalkulimi.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqKalkulimet();
    }, [perditeso]);

    useEffect(() => {
        if (getID) {
            const vendosTeDhenat = async () => {
                try {
                    const perdoruesi = await axios.get(
                        `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`, authentikimi
                    );
                    setTeDhenat(perdoruesi.data);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            };

            vendosTeDhenat();
        } else {
            navigate("/login");
        }
    }, [perditeso]);

    useEffect(() => {
        const vendosPartnerin = async () => {
            try {
                const partneri = await axios.get(
                    `https://localhost:7285/api/Partneri/shfaqPartneretSipasLlojit?llojiPartnerit=Furnitor`, authentikimi
                );
                setProduktet(partneri.data);

            } catch (err) {
                console.log(err);
            }
        };

        vendosPartnerin();
    }, [perditeso]);

    useEffect(() => {
        const vendosNrFaturesMeRradhe = async () => {
            try {
                const nrFat = await axios.get(`https://localhost:7285/api/KalkulimiImallit/getNumriFaturesMeRradhe`, authentikimi);
                setNrFaturesMeRradhe(nrFat.data + 1);
            } catch (err) {
                console.log(err);
            }
        }

        vendosNrFaturesMeRradhe();
    }, [perditeso]);

    const handleSubmit = (event) => {
        if (produktiID === 0 ||
            sasia <= 0 ||
            qmimiShites <= 0 ||
            qmimiBleres <= 0) {
            event.preventDefault();
            setPershkrimiMesazhit("Ju lutem plotesoni te gjitha te dhenat!");
            setTipiMesazhit("danger");
            setShfaqMesazhin(true);
        } else {
            event.preventDefault();
            const produkti = {
                emriProduktit: emriProduktit,
                produktiId: produktiID,
                sasia: sasia,
                qmimiBleres: qmimiBleres,
                qmimiShites: qmimiShites,
            };
            setproduktetNeKalkulim([...produktetNeKalkulim, produkti]);
            updateTotals([...produktetNeKalkulim, produkti]);

            setProduktiID(0);
            setQmimiBleres("");
            setSasia("");
            setQmimiShites("");
            setSasiaNeStok(0);
            setQmimiB(0);
            setQmimiSH(0);
        }
    };

    const handleProduktiChange = (value, text, sasia, qmimiB, qmimiSH) => {
        const kontrolloProduktin = produktetNeKalkulim.filter((item) => item.produktiId === value);

        if (kontrolloProduktin.length > 0) {
            setPershkrimiMesazhit("Produkti eshte shtuar nje here! Ju keni mundesi ta editoni ate");
            setTipiMesazhit("danger");
            setShfaqMesazhin(true);
            setProduktiID(0);
        } else {
            setProduktiID(value);
            setemriProduktit(text);
            setSasiaNeStok(sasia);
            setQmimiB(qmimiB);
            setQmimiSH(qmimiSH);
        }
    };

    const updateTotals = (newproduktetNeKalkulim) => {
        let totalProdkteve = 0;
        let totalFaturesShitese = 0;
        let totalFaturesBlerese = 0;
        newproduktetNeKalkulim.forEach((produkti) => {
            totalProdkteve += 1;
            totalFaturesShitese += produkti.sasia * produkti.qmimiShites;
            totalFaturesBlerese += produkti.sasia * produkti.qmimiBleres;
        });
        setTotProdukteve(totalProdkteve);
        setTotFaturesShitese(totalFaturesShitese);
        setTotFaturesBlerese(totalFaturesBlerese);
    };

    const handleSave = () => {
        if (totFaturesShitese > 0) {
            handleMbyllFature();
            props.setMbyllFaturen();
        }
        else {
            props.setMbyllFaturen();
        }
    }

    const ndrroField = (e, tjetra) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById(tjetra).focus();
        }
    }

    async function handleMbyllFature() {
        try {
            await axios.post('https://localhost:7285/api/RegjistrimiStokut/RuajKalkulimin', {
                totaliProdukteveRegjistruara: totProdukteve,
                shumaTotaleRegjistrimit: totFaturesShitese,
                shumaTotaleBlerese: totFaturesBlerese,
                stafiId: teDhenat.perdoruesi.userId
            }, authentikimi).then(async (response) => {

                for (let produkti of produktetNeKalkulim) {
                    await axios.post('https://localhost:7285/api/RegjistrimiStokut/ruajKalkulimin/teDhenat', {
                        idRegjistrimit: response.data.idRegjistrimit,
                        idProduktit: produkti.produktiId,
                        sasiaStokut: produkti.sasia,
                        qmimiBleres: produkti.qmimiBleres,
                        qmimiShites: produkti.qmimiShites,
                    }, authentikimi);
                    await axios.put(`https://localhost:7285/api/RegjistrimiStokut/ruajKalkulimin/perditesoStokunQmimin?id=${produkti.produktiId}`, {
                        produktiId: produkti.produktiId,
                        qmimiBleres: produkti.qmimiBleres,
                        qmimiProduktit: produkti.qmimiShites,
                        sasiaNeStok: produkti.sasia
                    }, authentikimi);
                }

                props.setPerditeso(Date.now());
                props.setMbyllFaturen();
            })


        } catch (error) {
            console.error(error);
        }
    }

    function handleFshij(id) {
        const eReja = produktetNeKalkulim.filter((item) => item.produktiId !== id);

        setproduktetNeKalkulim(eReja);
    }

    function handleEdit(id) {
        setEdito(true);
        const produkti = produktetNeKalkulim.filter((item) => item.produktiId === id);

        setProduktiID(produkti[0].produktiId);
        setemriProduktit(produkti[0].emriProduktit);
        setSasia(produkti[0].sasia);
        setQmimiBleres(produkti[0].qmimiBleres);
        setQmimiShites(produkti[0].qmimiShites);
    }

    function handleEdito(id) {
        if (produktiID === 0 ||
            sasia <= 0 ||
            qmimiShites <= 0 ||
            qmimiBleres <= 0) {
            setPershkrimiMesazhit("Ju lutem plotesoni te gjitha te dhenat!");
            setTipiMesazhit("danger");
            setShfaqMesazhin(true);
        } else {
            const eReja = produktetNeKalkulim.filter((item) => item.produktiId !== id);

            const produkti = {
                emriProduktit: emriProduktit,
                produktiId: produktiID,
                sasia: sasia,
                qmimiBleres: qmimiBleres,
                qmimiShites: qmimiShites,
            };
            setproduktetNeKalkulim([...eReja, produkti]);
            updateTotals([...eReja, produkti]);

            setProduktiID(0);
            setQmimiBleres("");
            setSasia("");
            setQmimiShites("");
            setSasiaNeStok(0);
            setQmimiB(0);
            setQmimiSH(0);
            setEdito(false);
        }
    }



    return (
        <div className="containerDashboardP" style={{ width: "90%", }}>
            {shfaqMesazhin && <Mesazhi
                setShfaqMesazhin={setShfaqMesazhin}
                pershkrimi={pershkrimiMesazhit}
                tipi={tipiMesazhit}
            />}
            {konfirmoMbylljenFatures &&
                <Modal show={konfirmoMbylljenFatures} onHide={() => setKonfirmoMbylljenFatures(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h6">Konfirmo Mbylljen e Fatures</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <strong style={{ fontSize: "10pt" }}>
                            A jeni te sigurt qe deshironi ta mbyllni Faturen?
                        </strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setKonfirmoMbylljenFatures(false)}
                        >
                            Edito Faturen <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            variant="warning"
                            onClick={handleMbyllFature}
                        >
                            Konfirmo <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
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
                    Kalkulimi i Mallit
                </h1>


                <Container fluid>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="idDheEmri">
                                    <Form.Group>
                                        <Form.Label>Nr. Rendor i Fatures</Form.Label>
                                        <Form.Control
                                            id="sasia"
                                            type="number"
                                            value={nrFatMeRradhe}
                                            onChange={(e) => {
                                                setSasia(e.target.value);
                                            }}
                                            onKeyDown={(e) => { ndrroField(e, "qmimiBleres") }}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Label>Partneri</Form.Label>
                                    <select
                                        placeholder="Produkti"
                                        className="form-select"
                                        value={produktiID ? produktiID : 0}
                                        disabled={edito}
                                        onChange={(e) =>
                                            handleProduktiChange(e.target.value,
                                                e.target.options[e.target.selectedIndex].text,
                                                e.target.options[e.target.selectedIndex].getAttribute('sasiaNeStok'),
                                                e.target.options[e.target.selectedIndex].getAttribute('qmimiBleres'),
                                                e.target.options[e.target.selectedIndex].getAttribute('qmimiShites')
                                            )
                                        }
                                        onKeyDown={(e) => { ndrroField(e, "sasia") }}
                                    >
                                        <option defaultValue value={0} key={0} disabled>
                                            Zgjedhni Partnerin
                                        </option>
                                        {produktet.map((item) => {
                                            return (
                                                <option key={item.produktiId}
                                                    value={item.produktiId}
                                                    sasiaNeStok={item.sasiaNeStok}
                                                    qmimiBleres={item.qmimiBleres}
                                                    qmimiShites={item.qmimiProduktit}
                                                >
                                                    {item.idpartneri + " - " + item.emriBiznesit}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nr. Fatures</Form.Label>
                                    <Form.Control
                                        id="qmimiBleres"
                                        type="number"
                                        value={qmimiBleres}
                                        onChange={(e) => {
                                            setQmimiBleres(e.target.value);
                                        }}
                                        onKeyDown={(e) => { ndrroField(e, "qmimiShites") }}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Data e Fatures</Form.Label>
                                <Form.Control
                                    id="qmimiShites"
                                    type="date"
                                    value={qmimiShites}
                                    onChange={(e) => {
                                        setQmimiShites(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Lloji i Pageses</Form.Label>
                                <select
                                    placeholder="Produkti"
                                    className="form-select"
                                    value={produktiID ? produktiID : 0}
                                    disabled={edito}
                                    onChange={(e) =>
                                        handleProduktiChange(e.target.value,
                                            e.target.options[e.target.selectedIndex].text,
                                            e.target.options[e.target.selectedIndex].getAttribute('sasiaNeStok'),
                                            e.target.options[e.target.selectedIndex].getAttribute('qmimiBleres'),
                                            e.target.options[e.target.selectedIndex].getAttribute('qmimiShites')
                                        )
                                    }
                                    onKeyDown={(e) => { ndrroField(e, "sasia") }}
                                >
                                    <option defaultValue value={0} key={0} disabled>
                                        Zgjedhni Llojin e Pageses
                                    </option>
                                    <option key={1} value="E Paguar">Cash</option>
                                    <option key={2} value="Borxh">Banke</option>
                                    <option key={3} value="E Paguar">Borxh</option>
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Statusi i Pageses</Form.Label>
                                <select
                                    placeholder="Statusi i Pageses"
                                    className="form-select"
                                    value={produktiID ? produktiID : 0}
                                    disabled={edito}
                                    onChange={(e) =>
                                        handleProduktiChange(e.target.value,
                                            e.target.options[e.target.selectedIndex].text,
                                            e.target.options[e.target.selectedIndex].getAttribute('sasiaNeStok'),
                                            e.target.options[e.target.selectedIndex].getAttribute('qmimiBleres'),
                                            e.target.options[e.target.selectedIndex].getAttribute('qmimiShites')
                                        )
                                    }
                                    onKeyDown={(e) => { ndrroField(e, "sasia") }}
                                >
                                    <option defaultValue value={0} key={0} disabled>
                                        Zgjedhni Statusin e Pageses
                                    </option>
                                    <option key={1} value="E Paguar">E Paguar</option>
                                    <option key={2} value="Borxh">Pa Paguar</option>
                                </select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Totali Pa TVSH</Form.Label>
                                <Form.Control
                                    id="qmimiShites"
                                    type="number"
                                    value={qmimiShites}
                                    onChange={(e) => {
                                        setQmimiBleres(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>TVSH</Form.Label>
                                <Form.Control
                                    id="qmimiShites"
                                    type="number"
                                    value={qmimiShites}
                                    onChange={(e) => {
                                        setQmimiShites(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <br />
                            <Button
                                className="mb-3 Butoni"
                                onClick={() => setKonfirmoMbylljenFatures(true)}
                            >
                                Regjistro Faturen <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Row>
                    <h1 className="title">Lista e Kalkulimeve</h1>
                    <MDBTable style={{ width: "100%", }}>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Nr. Kalkulimit</th>
                                <th scope="col">Nr. Fatures</th>
                                <th scope="col">Partneri</th>
                                <th scope="col">Totali Pa TVSH</th>
                                <th scope="col">TVSH</th>
                                <th scope="col">Data e Fatures</th>
                                <th scope="col">Lloji Fatures</th>
                                <th scope="col">Statusi Pageses</th>
                                <th scope="col">Lloji Pageses</th>
                                <th scope="col">Funksione</th>
                            </tr>
                        </MDBTableHead>

                        <MDBTableBody>
                            {kalkulimet.map((k) => (
                                <tr key={k.idRegjistrimit}>
                                    <td>{k.idRegjistrimit}</td>
                                    <td>{k.nrFatures}</td>
                                    <td>{k.emriBiznesit}</td>
                                    <td>{k.totaliPaTvsh.toFixed(2)} €</td>
                                    <td>{k.tvsh.toFixed(2)} €</td>
                                    <td >{new Date(k.dataRegjistrimit).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                                    <td>{k.llojiKalkulimit}</td>
                                    <td>{k.statusiPageses}</td>
                                    <td>{k.llojiPageses}</td>
                                    <td >
                                        <Button style={{ marginRight: "0.5em" }} variant="success" onClick={() => handleShfaqTeDhenat(k.idRegjistrimit)}><FontAwesomeIcon icon={faCircleInfo} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </Container>
            </>
            )
            }
        </div >
    );
};

export default RegjistroFaturen;
