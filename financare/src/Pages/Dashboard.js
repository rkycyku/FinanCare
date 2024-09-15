import React, { useState, useEffect } from "react";
import NavBar from "../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import "./Styles/Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Tab, Tabs, Form, InputGroup, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [shfaqAdmin, setShfaqAdmin] = useState(false);
  const [teDhenat, setTeDhenat] = useState([]);
  const [perditeso, setPerditeso] = useState("");
  const [loading, setLoading] = useState(true);
  const [shfaqPorosite, setShfaqPorosite] = useState(false);
  const [shfaqDetajet, setShfaqDetajet] = useState(false);
  const [shfaqMesazhet, setShfaqMesazhet] = useState(false);
  const [nrFatures, setNumriFatures] = useState(0);
  const [show, setShow] = useState(false);
  const [edito, setEdito] = useState(false);
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");
  const [nrKontaktit, setNrKontaktit] = useState("");
  const [id, setId] = useState();
  const [mbyllPerditesoTeDhenat, setMbyllPerditesoTeDhenat] = useState(true);
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [key, setKey] = useState("kryesore");
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
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`,
            authentikimi
          );
          setTeDhenat(perdoruesi.data);
          console.log(perdoruesi.data);
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

  return (
    <>
      <Helmet>
        <title>Dashboard | Tech Store</title>
      </Helmet>
      <NavBar />

      <div className="dashboard">
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
          <div class="containerDashboard">
            <h3 class="titulliPershkrim">Te dhenat personale</h3>
            <Tabs
              id="shenime-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3">
              {/* Shënimet Kryesore */}
              <Tab eventKey="kryesore" title="Shënimet Kryesore">
                <Form>
                  <Form.Group className="mb-3" controlId="emriBiznesit">
                    <Row>
                      <Col>
                        <Form.Label>Emri</Form.Label>
                        <Form.Control
                          type="text"
                          value={teDhenat?.perdoruesi?.emri}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Mbiemri</Form.Label>
                        <Form.Control
                          type="text"
                          value={teDhenat?.perdoruesi?.mbiemri}
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="adresa">
                    <Row>
                      <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={teDhenat?.perdoruesi?.email}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={teDhenat?.perdoruesi?.username}
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="adresa">
                    <Row>
                      <Col>
                        <Form.Label>Data e fillimit te kontrates</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.dataFillimitKontrates
                              ? new Date(
                                  teDhenat.perdoruesi.teDhenatPerdoruesit.dataFillimitKontrates
                                ).toLocaleDateString("en-GB")
                              : ""
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Data e mbarimit te kontrates</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.dataMbarimitKontrates
                              ? new Date(
                                  teDhenat.perdoruesi.teDhenatPerdoruesit.dataMbarimitKontrates
                                ).toLocaleDateString("en-GB")
                              : ""
                          }
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="adresa">
                    <Row>
                      <Col>
                        <Form.Label>Nr. Personal</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.nrPersonal
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Paga Bruto</Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control
                            type="text"
                            value={
                              teDhenat?.perdoruesi?.teDhenatPerdoruesit?.paga
                                ? parseFloat(
                                    teDhenat?.perdoruesi?.teDhenatPerdoruesit
                                      ?.paga
                                  ).toFixed(2)
                                : ""
                            }
                            disabled
                          />
                          <InputGroup.Text id="basic-addon2">€</InputGroup.Text>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Tab>

              {/* Shënimet Ndihmëse */}
              <Tab eventKey="ndihmese" title="Shënimet Ndihmëse">
                <Form>
                  <Form.Group className="mb-3" controlId="nui">
                    <Row>
                      <Col>
                        <Form.Label>Adresa</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit?.adresa
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Datelindja</Form.Label>
                        <br />
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.datelindja
                              ? new Date(
                                  teDhenat.perdoruesi.teDhenatPerdoruesit.datelindja
                                ).toLocaleDateString("en-GB")
                              : ""
                          }
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nui">
                    <Row>
                      <Col>
                        <Form.Label>Nr. Kontaktit</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.nrKontaktit
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Email Privat</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.emailPrivat
                          }
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nui">
                    <Row>
                      <Col>
                        <Form.Label>Profesioni</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.profesioni
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Specializimi</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.specializimi
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Kualifikimi</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.kualifikimi
                          }
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nui">
                    <Row>
                      <Col>
                        <Form.Label>Banka</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit?.banka?.emriBankes
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Nr. Llogaris Bankare</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.numriLlogarisBankare
                          }
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Label>Statusi Puntorit</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            teDhenat?.perdoruesi?.teDhenatPerdoruesit
                              ?.eshtePuntorAktive == "true" ? "Aktiv" : "Jo Aktiv" 
                          }
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
