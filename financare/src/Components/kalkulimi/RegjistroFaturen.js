import { useEffect, useState } from "react";
import classes from '../../Pages/Styles/DizajniPergjithshem.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../layout/Mesazhi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { TailSpin } from 'react-loader-spinner';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

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
    const [njesiaMatese, setNjesiaMatese] = useState("Cope");
    const [totProdukteve, setTotProdukteve] = useState(0);
    const [totStokut, setTotStokut] = useState(0);
    const [totFaturesShitese, setTotFaturesShitese] = useState(0);
    const [totFaturesBlerese, setTotFaturesBlerese] = useState(0);
    const [mazhaFitimit, setMazhaFitimit] = useState(0);
    const [sasiaNeStok, setSasiaNeStok] = useState(0);
    const [qmimiB, setQmimiB] = useState(0);
    const [qmimiSH, setQmimiSH] = useState(0);

    const [idTeDhenatKalk, setIdTeDhenatKalk] = useState(0);

    const [edito, setEdito] = useState(false);
    const [konfirmoMbylljenFatures, setKonfirmoMbylljenFatures] = useState(false);

    const [teDhenat, setTeDhenat] = useState([]);
    const [teDhenatFatures, setTeDhenatFatures] = useState([]);


    const navigate = useNavigate();

    const getID = localStorage.getItem("id");

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

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
        if (props.idKalkulimitEdit != 0) {
            const vendosTeDhenat = async () => {
                try {
                    const teDhenatKalkulimit = await axios.get(
                        `https://localhost:7285/api/KalkulimiImallit/shfaqTeDhenatKalkulimit?idRegjistrimit=${props.idKalkulimitEdit}`, authentikimi
                    );

                    const teDhenatFatures = await axios.get(
                        `https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimetNgaID?id=${props.idKalkulimitEdit}`, authentikimi
                    );

                    setproduktetNeKalkulim(teDhenatKalkulimit.data);
                    setTeDhenatFatures(teDhenatFatures.data);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            };

            vendosTeDhenat();
        }
    }, [perditeso, produktiID]);

    useEffect(() => {
        const vendosProduktet = async () => {
            try {
                const produktet = await axios.get(
                    `https://localhost:7285/api/Produkti/ProduktetPerKalkulim`, authentikimi
                );
                setProduktet(produktet.data);
            } catch (err) {
                console.log(err);
            }
        };

        vendosProduktet();
    }, [perditeso]);

    const handleSubmit = async (event) => {
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

            await axios.post('https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/teDhenat', {
                idRegjistrimit: props.nrRendorKalkulimit,
                idProduktit: produktiID,
                sasiaStokut: sasia,
                qmimiBleres: qmimiBleres,
                qmimiShites: qmimiShites,
            }, authentikimi).then(() => {
                setPerditeso(Date.now());
            });

            setProduktiID(0);
            setQmimiBleres("");
            setSasia("");
            setQmimiShites("");
            setSasiaNeStok(0);
            setQmimiB(0);
            setQmimiSH(0);
            setPerditeso(Date.now());
        }
    };

    const handleProduktiChange = (value, text, sasia, qmimiB, qmimiSH, njesiaMatese) => {
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
            setNjesiaMatese(njesiaMatese);
        }
    };

    useEffect(() => {
        let totalProdukteve = 0;
        let totalFaturesShitese = 0;
        let totalFaturesBlerese = 0;
        let totalStokut = 0;
        let totalMazhaFitimit = 0;
        produktetNeKalkulim.forEach((produkti) => {
            totalProdukteve += 1;
            totalStokut += produkti.sasiaStokut;
            totalFaturesShitese += produkti.sasiaStokut * produkti.qmimiShites;
            totalFaturesBlerese += produkti.sasiaStokut * produkti.qmimiBleres;
            totalMazhaFitimit += (((produkti.sasiaStokut * produkti.qmimiShites) * (1 - ((18 / 100) / (1 + (18 / 100)))))
                - (produkti.sasiaStokut * produkti.qmimiBleres)) / (produkti.sasiaStokut * produkti.qmimiBleres) * 100
        });
        setTotProdukteve(totalProdukteve);
        setTotFaturesShitese(totalFaturesShitese);
        setTotFaturesBlerese(totalFaturesBlerese);
        setTotStokut(totalStokut);
        setMazhaFitimit(totalMazhaFitimit);
    }, [produktetNeKalkulim]);

    const ndrroField = (e, tjetra) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById(tjetra).focus();
        }
    }

    async function handleMbyllFature() {
        try {
            if (produktetNeKalkulim.length === 0) {
                props.setPerditeso(Date.now());
                props.mbyllPerkohesisht();
            } else {

                for (let produkti of produktetNeKalkulim) {
                    await axios.put(`https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/perditesoStokunQmimin?id=${produkti.idProduktit}`, {
                        qmimiBleres: produkti.qmimiBleres,
                        qmimiProduktit: produkti.qmimiShites,
                        sasiaNeStok: produkti.sasiaStokut
                    }, authentikimi);
                }

                props.setPerditeso();
                props.mbyllKalkulimin();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleFshij(id) {
        await axios.delete(`https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/FshijTeDhenat?idTeDhenat=${id}`, authentikimi)
            .then(() => {
                setPerditeso(Date.now);
            });
    }

    async function handleEdit(id) {
        const produkti = await axios.get(`https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/getKalkulimi?idKalkulimit=${id}`, authentikimi)
            .then((p) => {
                setPerditeso(Date.now);

                setEdito(true);
                setProduktiID(p.data.idProduktit);
                setemriProduktit(p.data.emriProduktit);
                setSasia(p.data.sasiaStokut);
                setQmimiBleres(p.data.qmimiBleres);
                setQmimiShites(p.data.qmimiShites);
            })
    }

    async function handleEdito(id) {
        if (produktiID === 0 ||
            sasia <= 0 ||
            qmimiShites <= 0 ||
            qmimiBleres <= 0) {
            setPershkrimiMesazhit("Ju lutem plotesoni te gjitha te dhenat!");
            setTipiMesazhit("danger");
            setShfaqMesazhin(true);
        } else {
            await axios.put(`https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/PerditesoTeDhenat?id=${id}`, {
                qmimiBleres: qmimiBleres,
                qmimiShites: qmimiShites,
                sasiaStokut: sasia
            }, authentikimi).then(() => {
                setPerditeso(Date.now());
            });

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

    function KthehuTekFaturat() {
        props.setPerditeso();
        props.mbyllPerkohesisht();
    }

    return (
        <div className={classes.containerDashboardP}>
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
                                    <Form.Label>Produkti</Form.Label>
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
                                                e.target.options[e.target.selectedIndex].getAttribute('qmimiShites'),
                                                e.target.options[e.target.selectedIndex].getAttribute('njesiaMatese')
                                            )
                                        }
                                        onKeyDown={(e) => { ndrroField(e, "sasia") }}
                                    >
                                        <option defaultValue value={0} key={0} disabled>
                                            Zgjedhni Produktin
                                        </option>
                                        {produktet.map((item) => {
                                            return (
                                                <option key={item.produktiId}
                                                    value={item.produktiId}
                                                    sasiaNeStok={item.sasiaNeStok}
                                                    qmimiBleres={item.qmimiBleres}
                                                    qmimiShites={item.qmimiProduktit}
                                                    njesiaMatese={item.njesiaMatese1}
                                                >
                                                    {item.produktiId + " - " + item.emriProduktit}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Sasia - {njesiaMatese}</Form.Label>
                                    <Form.Control
                                        id="sasia"
                                        type="number"
                                        placeholder={"0.00 " + njesiaMatese}
                                        value={sasia}
                                        onChange={(e) => {
                                            setSasia(e.target.value);
                                        }}
                                        onKeyDown={(e) => { ndrroField(e, "qmimiBleres") }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Qmimi Bleres €</Form.Label>
                                    <Form.Control
                                        id="qmimiBleres"
                                        type="number"
                                        value={qmimiBleres}
                                        placeholder="0.00 €"
                                        onChange={(e) => {
                                            const qmimbleres = parseFloat(e.target.value); 
                                            setQmimiBleres(qmimbleres); 
                                            const qmimishites = qmimbleres + qmimbleres * 0.18; 
                                            setQmimiShites(qmimishites.toFixed(2)); 
                                        }}
                                        onKeyDown={(e) => { ndrroField(e, "qmimiShites") }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Qmimi Shites €</Form.Label>
                                    <Form.Control
                                        id="qmimiShites"
                                        type="number"
                                        value={qmimiShites}
                                        placeholder="0.00 €"
                                        onChange={(e) => {
                                            const qmimishites = parseFloat(e.target.value); 
                                            setQmimiShites(qmimishites); 
                                        }}
                                    />
                                </Form.Group>

                                <br />
                                <div style={{ display: "flex", gap: "0.3em" }}>
                                    <Button variant="success" type="submit" disabled={edito}>
                                        Shto Produktin <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    {edito &&
                                        <Button variant="warning" onClick={() => handleEdito(idTeDhenatKalk)}>
                                            Edito Produktin <FontAwesomeIcon icon={faPenToSquare} />
                                        </Button>}
                                </div>
                            </Form>
                        </Col>
                        <Col>
                            <p><strong>Qmimi Bleres:</strong> {parseFloat(qmimiB).toFixed(2)} €</p>
                            <p><strong>Qmimi Shites:</strong> {parseFloat(qmimiSH).toFixed(2)} €</p>
                            <p><strong>Sasia aktuale ne Stok:</strong> {sasiaNeStok} copë</p>
                        </Col>
                        <Col>
                            <Row>
                                <h5><strong>Nr. Kalkulimit:</strong> {teDhenatFatures.idRegjistrimit}</h5>
                                <h5><strong>Partneri:</strong> {teDhenatFatures.emriBiznesit}</h5>
                                <h5><strong>Nr. Fat:</strong> {teDhenatFatures.nrFatures}</h5>
                                <h5><strong>Totali Fatures pa TVSH:</strong> {parseFloat(teDhenatFatures.totaliPaTvsh).toFixed(2)} €</h5>
                                <h5><strong>TVSH:</strong> {parseFloat(teDhenatFatures.tvsh).toFixed(2)}  €</h5>
                                <h5><strong>Totali Fatures:</strong> {parseFloat(teDhenatFatures.totaliPaTvsh + teDhenatFatures.tvsh).toFixed(2)} €</h5>

                                <hr />
                                <Col>
                                    <Button
                                        className="mb-3 Butoni"
                                        onClick={() => setKonfirmoMbylljenFatures(true)}
                                    >
                                        Mbyll Faturen <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    <Button
                                        className="mb-3 Butoni"
                                        onClick={() => KthehuTekFaturat()}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />  Kthehu Mbrapa
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <h1 className="title">Tabela e Produkteve te Fatures</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr. Rendor</th>
                                <th>Emri Produktit</th>
                                <th>Sasia</th>
                                <th>Qmimi Bleres</th>
                                <th>Qmimi Shites</th>
                                <th>Totali Bleres</th>
                                <th>Totali Shites</th>
                                <th>Mazha</th>
                                <th>Funksione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produktetNeKalkulim.map((p, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{p.emriProduktit}</td>
                                    <td>{parseFloat(p.sasiaStokut).toFixed(2)}</td>
                                    <td>{parseFloat(p.qmimiBleres).toFixed(2)} €</td>
                                    <td>{parseFloat(p.qmimiShites).toFixed(2)} €</td>
                                    <td>{parseFloat(p.sasiaStokut * p.qmimiBleres).toFixed(2)} €</td>
                                    <td>{parseFloat(p.sasiaStokut * p.qmimiShites).toFixed(2)} €</td>
                                    <td>
                                        {parseFloat(
                                            (((p.sasiaStokut * p.qmimiShites) * (1 - ((18 / 100) / (1 + (18 / 100))))) - (p.sasiaStokut * p.qmimiBleres)) / (p.sasiaStokut * p.qmimiBleres) * 100
                                        ).toFixed(2)} %
                                    </td>

                                    <td>
                                        <div style={{ display: "flex", gap: "0.3em" }}>
                                            <Button size="sm" variant="danger" onClick={() => handleFshij(p.id)}><FontAwesomeIcon icon={faXmark} /></Button>
                                            <Button size="sm" onClick={() => {
                                                handleEdit(p.id);
                                                setIdTeDhenatKalk(p.id);
                                            }}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{totProdukteve}</td>
                                <td>-</td>
                                <td>{parseFloat(totStokut).toFixed(2)}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{parseFloat(totFaturesBlerese).toFixed(2)} €</td>
                                <td>{parseFloat(totFaturesShitese).toFixed(2)} €</td>
                                <td>{parseFloat(mazhaFitimit).toFixed(2)} %</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </>
            )}
        </div >
    );
};

export default RegjistroFaturen;
