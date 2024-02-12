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
  faArrowRotateForward,
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [filtroStatusi, setFiltroStatusi] = useState("Te Gjitha");

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
          "https://localhost:7285/api/Faturat/shfaqRegjistrimet",
          authentikimi
        );
        const kthimet = kalkulimi.data.filter(
          (item) => item.llojiKalkulimit === "FAT"
        );
        console.log(kthimet);
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
          `https://localhost:7285/api/Partneri/shfaqPartneretBleres`,
          authentikimi
        );
        setPartneret(partneri.data);
        console.log(partneri)
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
          `https://localhost:7285/api/Faturat/getNumriFaturesMeRradhe?llojiKalkulimit=FAT`,
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
          "https://localhost:7285/api/Faturat/ruajKalkulimin",
          {
            dataRegjistrimit: dataEFatures,
            stafiID: teDhenat.perdoruesi.userID,
            totaliPaTvsh: totPaTVSH,
            tvsh: TVSH,
            idPartneri: Partneri,
            statusiPageses: statusiIPageses,
            llojiPageses: llojiIPageses,
            nrFatures: parseInt(nrRendorKalkulimit + 1).toString(),
            llojiKalkulimit: "FAT",
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
          `https://localhost:7285/api/Faturat/ruajKalkulimin/perditesoStatusinKalkulimit?id=${idKalkulimitEdit}&statusi=true`,
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
  }

  return (
    <>
      <Helmet>
        <title>Ofertat | FinanCare</title>
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
                        <Form.Label>Nr. Rendor i Porosise</Form.Label>
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
                    <Form.Group>
                      <Form.Label>Lloji i Pageses</Form.Label>
                      <select
                        id="llojiIPageses"
                        placeholder="LlojiIPageses"
                        className="form-select"
                        value={llojiIPageses ? llojiIPageses : 0}
                        onChange={(e) => {
                          setLlojiIPageses(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          ndrroField(e, "statusiIPageses");
                        }}
                      >
                        <option defaultValue value={0} key={0} disabled>
                          Zgjedhni Llojin e Pageses
                        </option>
                        <option key={1} value="Cash">
                          Cash
                        </option>
                        <option key={2} value="Banke">
                          Banke
                        </option>
                        <option key={3} value="Borxh">
                          Borxh
                        </option>
                      </select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Data e Porosis</Form.Label>
                      <Form.Control
                        id="dataEFatures"
                        type="date"
                        value={dataEFatures}
                        disabled
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
                <h1 className="title">Lista e Porosive</h1>
                <Button className="mb-3 Butoni" onClick={() => setEdito(true)}>
                  Ndrysho Statusin e Fatures{" "}
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <div className="DataPerFiltrim">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateField", "DateField"]}>
                        <DateField
                          label="Data Fillestare"
                          value={dataFillestare}
                          onChange={(date) => setDataFillestare(date)}
                          size="small"
                          format="DD/MM/YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateField", "DateField"]}>
                        <DateField
                          label="Data Fundit"
                          value={dataFundit}
                          onChange={(date) => setDataFundit(date)}
                          size="small"
                          format="DD/MM/YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Statusi i Fatures
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={filtroStatusi}
                          label="Statusi i Fatures"
                          onChange={(e) => {
                            setFiltroStatusi(e.target.value);
                          }}
                        >
                          <MenuItem
                            defaultValue
                            value="Te Gjitha"
                            key="Te Gjitha"
                          >
                            Te Gjitha
                          </MenuItem>
                          <MenuItem key="false" value="false">
                            Te Hapur
                          </MenuItem>
                          <MenuItem key="true" value="true">
                            Te Mbyllur
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="datat">
                    <Button
                      style={{ marginRight: "0.5em" }}
                      variant="success"
                      onClick={() => {
                        setDataFillestare(null);
                        setDataFundit(null);
                        setFiltroStatusi("Te Gjitha");
                      }}
                    >
                      Reseto <FontAwesomeIcon icon={faArrowRotateForward} />
                    </Button>
                  </div>
                </div>
                <MDBTable style={{ width: "100%" }}>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Nr. Ofertes</th>
                      <th scope="col">Partneri</th>
                      <th scope="col">Pershkrimi Shtese</th>
                      <th scope="col">Data e Fatures</th>
                      <th scope="col">Tot - TVSH €</th>
                      <th scope="col">TVSH €</th>
                      <th scope="col">R. €</th>
                      <th scope="col">Totali €</th>
                      <th scope="col">Lloji Pageses</th>
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
                      .filter((p) => {
                        if (filtroStatusi === "Te Gjitha") {
                          return true;
                        } else {
                          return p.statusiKalkulimit === filtroStatusi;
                        }
                      })
                      .map((k) => (
                        <tr key={k.idRegjistrimit}>
                          <td>{k.nrRendorFatures}</td>
                          <td>{k.emriBiznesit}</td>
                          <td>{k.pershkrimShtese}</td>
                          <td>
                            {new Date(k.dataRegjistrimit).toLocaleDateString(
                              "en-GB",
                              { dateStyle: "short" }
                            )}
                          </td>
                          
                          <td>{parseFloat(k.totaliPaTvsh).toFixed(2)}</td>
                          <td>{parseFloat(k.tvsh).toFixed(2)}</td>
                          <td>{parseFloat(k.rabati).toFixed(2)}</td>
                          <td>{parseFloat(k.totaliPaTvsh + k.tvsh).toFixed(2)}</td>
                          <td>{k.llojiPageses}</td>
                          <td>
                            {k.statusiKalkulimit === "true"
                              ? "I Mbyllur"
                              : "I Hapur"}
                          </td>
                          <td>
                            <Button
                              style={{ marginRight: "0.5em" }}
                              variant="success"
                              size="sm"
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
                              variant="warning"
                              size="sm"
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
