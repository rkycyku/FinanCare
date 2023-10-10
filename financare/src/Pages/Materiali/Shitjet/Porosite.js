import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faPenToSquare,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import RegjistroFaturen from "../../../Components/Materiali/Shitjet/Porosite/RegjistroFaturen";
import PerditesoStatusinKalk from "../../../Components/Materiali/Shitjet/Porosite/PerditesoStatusinKalk";
import TeDhenatKalkulimit from "../../../Components/Materiali/Shitjet/Porosite/TeDhenatKalkulimit";
import { Helmet } from "react-helmet";
import NavBar from "../../../Components/TeTjera/layout/NavBar";
import useKeyboardNavigation from "../../../Context/useKeyboardNavigation";
import DatePicker from "react-datepicker";

function KthimIMallitTeBlere(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [partneret, setPartneret] = useState([]);

  const [nrRendorKalkulimit, setNrRendorKalkulimit] = useState(0);
  const [pershkrimShtese, setPershkrimShtese] = useState("");
  const [Partneri, setPartneri] = useState(0);
  const [nrFatures, setNrFatures] = useState("");
  const today = new Date();
  const initialDate = today.toISOString().split("T")[0]; // Format as 'yyyy-MM-dd'
  const [dataEFatures, setDataEFatures] = useState(initialDate);
  const [llojiIPageses, setLlojiIPageses] = useState("Cash");
  const [statusiIPageses, setStatusiIPageses] = useState("E Paguar");
  const [totPaTVSH, setTotPaTVSH] = useState("0.00");
  const [TVSH, setTVSH] = useState("0.00");

  const [kalkulimet, setKalkulimet] = useState([]);
  const [regjistroKalkulimin, setRegjistroKalkulimin] = useState(false);
  const [shfaqTeDhenat, setShfaqTeDhenat] = useState(false);
  const [mbyllFature, setMbyllFaturen] = useState(true);
  const [id, setId] = useState(0);

  const [idKalkulimitEdit, setIdKalkulimitEdit] = useState(0);

  const [edito, setEdito] = useState(false);
  const [konfirmoMbylljenFatures, setKonfirmoMbylljenFatures] = useState(false);

  const [dataFillestare, setDataFillestare] = useState(null);
  const [dataFundit, setDataFundit] = useState(null);

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
    setId(id);
    setShfaqTeDhenat(true);
    setMbyllFaturen(false);
  };

  useEffect(() => {
    const shfaqKalkulimet = async () => {
      try {
        setLoading(true);
        const kalkulimi = await axios.get(
          "https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimet",
          authentikimi
        );
        const kthimet = kalkulimi.data.filter(
          (item) => item.llojiKalkulimit === "KMB"
        );
        setKalkulimet(kthimet);
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
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`,
            authentikimi
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
          `https://localhost:7285/api/Partneri/shfaqPartneretFurntiore`,
          authentikimi
        );
        setPartneret(partneri.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosPartnerin();
  }, [perditeso]);

  useEffect(() => {
    const vendosNrFaturesMeRradhe = async () => {
      try {
        const nrFat = await axios.get(
          `https://localhost:7285/api/KalkulimiImallit/getNumriFaturesMeRradhe?llojiKalkulimit=KMB`,
          authentikimi
        );
        setNrRendorKalkulimit(parseInt(nrFat.data));
      } catch (err) {
        console.log(err);
      }
    };

    vendosNrFaturesMeRradhe();
  }, [perditeso]);

  const ndrroField = (e, tjetra) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(tjetra).focus();
    }
  };

  async function handleRegjistroKalkulimin() {
    try {
      console.log(nrRendorKalkulimit);
      await axios
        .post(
          "https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin",
          {
            dataRegjistrimit: dataEFatures,
            stafiId: teDhenat.perdoruesi.userId,
            totaliPaTvsh: totPaTVSH,
            tvsh: TVSH,
            idpartneri: Partneri,
            statusiPageses: statusiIPageses,
            llojiPageses: llojiIPageses,
            nrFatures: parseInt(nrRendorKalkulimit + 1).toString(),
            llojiKalkulimit: "KMB",
            pershkrimShtese: pershkrimShtese,
            nrRendorFatures: nrRendorKalkulimit + 1,
          },
          authentikimi
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setPerditeso(Date.now());
            setIdKalkulimitEdit(response.data.idRegjistrimit);
            setRegjistroKalkulimin(true);
          } else {
            console.log("gabim");
            setPerditeso(Date.now());
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  function mbyllKalkulimin() {
    try {
      axios
        .put(
          `https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/perditesoStatusinKalkulimit?id=${nrRendorKalkulimit}&statusi=true`,
          {},
          authentikimi
        )
        .then(() => {
          setRegjistroKalkulimin(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function ndryshoStatusin(shfaq) {
    if (shfaq === true) {
      setEdito(true);
    } else {
      setEdito(false);
    }
    setPerditeso(Date.now());
  }

  const mbyllTeDhenat = () => {
    setMbyllFaturen(true);
    setShfaqTeDhenat(false);
  };

  const [statusiIPagesesValue, setStatusiIPagesesValue] = useState("Borxh");
  useEffect(() => {
    if (llojiIPageses === "Borxh") {
      setStatusiIPagesesValue("Borxh");
    } else {
      setStatusiIPagesesValue(statusiIPageses ? statusiIPageses : 0);
    }
  }, [llojiIPageses, statusiIPageses]);

  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(partneret);
  const selectedIndex = useKeyboardNavigation(filteredItems);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        handleNdryshoPartneri(filteredItems[selectedIndex]);
      }

      ndrroField(e, "pershkrimShtese");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filtered = partneret.filter((item) =>
      item.emriBiznesit.toLowerCase().includes(value)
    );

    setFilteredItems(filtered);
  };

  function handleNdryshoPartneri(partneri) {
    setPartneri(partneri.idpartneri);

    setFilteredItems([]);
    setInputValue(`${partneri?.emriBiznesit ? partneri.emriBiznesit : ""}`);

    console.log(partneri);
  }

  return (
    <>
      <Helmet>
        <title>Porosite | FinanCare</title>
      </Helmet>
      <NavBar />
      <div className="containerDashboardP" style={{ width: "90%" }}>
        {shfaqMesazhin && (
          <Mesazhi
            setShfaqMesazhin={setShfaqMesazhin}
            pershkrimi={pershkrimiMesazhit}
            tipi={tipiMesazhit}
          />
        )}
        {shfaqTeDhenat && (
          <TeDhenatKalkulimit setMbyllTeDhenat={mbyllTeDhenat} id={id} />
        )}
        {regjistroKalkulimin && (
          <RegjistroFaturen
            mbyllKalkulimin={mbyllKalkulimin}
            mbyllPerkohesisht={() => setRegjistroKalkulimin(false)}
            nrRendorKalkulimit={idKalkulimitEdit}
            setPerditeso={() => setPerditeso(Date.now())}
            idKalkulimitEdit={idKalkulimitEdit}
          />
        )}
        {edito && (
          <PerditesoStatusinKalk
            show={() => ndryshoStatusin(true)}
            hide={() => ndryshoStatusin(false)}
          />
        )}
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
          !regjistroKalkulimin &&
          !shfaqTeDhenat && (
            <>
              <h1 className="title">Porosite</h1>

              <Container fluid>
                <Row>
                  <Col>
                    <Form.Group controlId="idDheEmri">
                      <Form.Group>
                        <Form.Label>Nr. Rendor i Kthimit</Form.Label>
                        <Form.Control
                          id="nrRendorKalkulimit"
                          type="number"
                          value={
                            nrRendorKalkulimit ? nrRendorKalkulimit + 1 : 1
                          }
                          disabled
                        />
                      </Form.Group>
                    </Form.Group>
                    <Form.Group controlId="idDheEmri">
                      <Form.Label>Partneri</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control styled-input"
                        placeholder="Zgjedhni Partnerin"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={handleInputChange}
                      />

                      <div
                        className="container"
                        style={{ position: "relative" }}
                      >
                        <ul className="list-group mt-2 searchBoxi">
                          {filteredItems.map((item, index) => (
                            <li
                              key={item.idpartneri}
                              className={`list-group-item${
                                selectedIndex === index ? " active" : ""
                              }`}
                              onClick={() => handleNdryshoPartneri(item)}
                            >
                              {item.emriBiznesit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="pershkrimShtese">
                      <Form.Group>
                        <Form.Label>Pershkrim Shtese</Form.Label>
                        <Form.Control
                          id="pershkrimShtese"
                          type="text"
                          value={pershkrimShtese}
                          onChange={(e) => {
                            setPershkrimShtese(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            ndrroField(e, "dataEFatures");
                          }}
                        />
                      </Form.Group>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Data e Kthimit te Mallit</Form.Label>
                      <Form.Control
                        id="dataEFatures"
                        type="date"
                        value={dataEFatures}
                        onChange={(e) => {
                          setDataEFatures(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          ndrroField(e, "llojiIPageses");
                        }}
                      />
                    </Form.Group>
                    <br />
                    <Button
                      className="mb-3 Butoni"
                      onClick={() => handleRegjistroKalkulimin()}
                    >
                      Regjistro <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                </Row>
                <h1 className="title">Lista e Kthimeve</h1>
                <Button className="mb-3 Butoni" onClick={() => setEdito(true)}>
                  Ndrysho Statusin e Fatures{" "}
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <div className="DataPerFiltrim">
                  <div className="datat">
                    <p>Data Fillimit:</p>
                    <DatePicker
                      selected={dataFillestare}
                      onChange={(date) => setDataFillestare(date)}
                      dateFormat="dd/MM/yyyy"
                      maxDate={dataFundit}
                    />
                  </div>
                  <div>
                    <p>Data Mbarimit:</p>
                    <DatePicker
                      selected={dataFundit}
                      onChange={(date) => setDataFundit(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="datat">
                    <p>Reseto:</p>
                    <Button
                      style={{ marginRight: "0.5em" }}
                      variant="success"
                      onClick={() => {
                        setDataFillestare(null);
                        setDataFundit(null);
                      }}
                    >
                      Shfaq Te Gjitha porosite
                    </Button>
                  </div>
                </div>
                <MDBTable style={{ width: "100%" }}>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Nr. Kthimit</th>
                      <th scope="col">Pershkrimi Shtese</th>
                      <th scope="col">Data e Fatures</th>
                      <th scope="col">Statusi Kalkulimit</th>
                      <th scope="col">Funksione</th>
                    </tr>
                  </MDBTableHead>

                  <MDBTableBody>
                    {kalkulimet
                      .filter((p) => {
                        if (!dataFillestare || !dataFundit) {
                          return true;
                        } else {
                          const dataPorosise = new Date(p.dataRegjistrimit);
                          return (
                            dataPorosise >= dataFillestare &&
                            dataPorosise <= dataFundit
                          );
                        }
                      })
                      .map((k) => (
                        <tr key={k.idRegjistrimit}>
                          <td>{k.nrRendorFatures}</td>
                          <td>{k.pershkrimShtese}</td>
                          <td>
                            {new Date(k.dataRegjistrimit).toLocaleDateString(
                              "en-GB",
                              { dateStyle: "short" }
                            )}
                          </td>
                          <td>
                            {k.statusiKalkulimit === "true"
                              ? "I Mbyllur"
                              : "I Hapur"}
                          </td>
                          <td>
                            <Button
                              style={{ marginRight: "0.5em" }}
                              variant="success"
                              onClick={() =>
                                handleShfaqTeDhenat(k.idRegjistrimit)
                              }
                            >
                              <FontAwesomeIcon icon={faCircleInfo} />
                            </Button>
                            <Button
                              disabled={
                                k.statusiKalkulimit === "true" ? true : false
                              }
                              style={{ marginRight: "0.5em" }}
                              variant="success"
                              onClick={() => {
                                setIdKalkulimitEdit(k.idRegjistrimit);
                                setNrRendorKalkulimit(k.idRegjistrimit);
                                setRegjistroKalkulimin(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </Container>
            </>
          )
        )}
      </div>
    </>
  );
}

export default KthimIMallitTeBlere;
