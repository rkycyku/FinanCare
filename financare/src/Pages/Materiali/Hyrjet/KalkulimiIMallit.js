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
import RegjistroFaturen from "../../../Components/Materiali/Hyrjet/KalkulimiIMallit/RegjistroFaturen";
import PerditesoStatusinKalk from "../../../Components/Materiali/Hyrjet/KalkulimiIMallit/PerditesoStatusinKalk";
import TeDhenatKalkulimit from "../../../Components/Materiali/Hyrjet/KalkulimiIMallit/TeDhenatKalkulimit";
import { Helmet } from "react-helmet";
import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

function KalkulimiIMallit(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [partneret, setPartneret] = useState([]);

  const [nrRendorKalkulimit, setNrRendorKalkulimit] = useState(0);
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
  const [dataFundit, setDataFundit] = useState(null);const [filtroStatusi, setFiltroStatusi] = useState("Te Gjitha");

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
        const kalkulimet = kalkulimi.data.filter(
          (item) => item.llojiKalkulimit === "HYRJE"
        );
        setKalkulimet(kalkulimet);
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
          `https://localhost:7285/api/Faturat/getNumriFaturesMeRradhe?llojiKalkulimit=HYRJE`,
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
      await axios
        .post(
          "https://localhost:7285/api/Faturat/ruajKalkulimin",
          {
            dataRegjistrimit: dataEFatures,
            stafiId: teDhenat.perdoruesi.userId,
            totaliPaTvsh: totPaTVSH,
            tvsh: TVSH,
            idpartneri: Partneri,
            statusiPageses: statusiIPageses,
            llojiPageses: llojiIPageses,
            nrFatures: nrFatures,
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
          `https://localhost:7285/api/Faturat/ruajKalkulimin/perditesoStatusinKalkulimit?id=${nrRendorKalkulimit}&statusi=true`,
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

  return (
    <>
      <Helmet>
        <title>Kalkulimi i Mallit | FinanCare</title>
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
              <h1 className="title">Kalkulimi i Mallit</h1>

              <Container fluid>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group controlId="idDheEmri">
                        <Form.Group>
                          <Form.Label>Nr. Rendor i Kalkulimit</Form.Label>
                          <Form.Control
                            id="nrRendorKalkulimit"
                            type="number"
                            value={
                              nrRendorKalkulimit ? nrRendorKalkulimit + 1 : 1
                            }
                            disabled
                          />
                        </Form.Group>
                        <Form.Label>Partneri</Form.Label>
                        <select
                          placeholder="Partneri"
                          id="Partneri"
                          className="form-select"
                          value={Partneri ? Partneri : 0}
                          onChange={(e) => {
                            setPartneri(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            ndrroField(e, "nrFatures");
                          }}
                        >
                          <option defaultValue value={0} key={0} disabled>
                            Zgjedhni Partnerin
                          </option>
                          {partneret.map((item) => {
                            return (
                              <option
                                key={item.idpartneri}
                                value={item.idpartneri}
                              >
                                {item.emriBiznesit}
                              </option>
                            );
                          })}
                        </select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nr. Fatures</Form.Label>
                        <Form.Control
                          id="nrFatures"
                          type="text"
                          value={nrFatures}
                          onChange={(e) => {
                            setNrFatures(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            ndrroField(e, "dataEFatures");
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Data e Fatures</Form.Label>
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
                    <Form.Group>
                      <Form.Label>Statusi i Pageses</Form.Label>
                      <select
                        id="statusiIPageses"
                        placeholder="Statusi i Pageses"
                        className="form-select"
                        value={statusiIPagesesValue}
                        onChange={(e) => {
                          setStatusiIPageses(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          ndrroField(e, "totPaTVSH");
                        }}
                        disabled={llojiIPageses === "Borxh" ? true : false}
                      >
                        <option defaultValue value={0} key={0} disabled>
                          Zgjedhni Statusin e Pageses
                        </option>
                        <option key={1} value="E Paguar">
                          E Paguar
                        </option>
                        <option key={2} value="Borxh">
                          Pa Paguar
                        </option>
                      </select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Totali Pa TVSH</Form.Label>
                      <Form.Control
                        id="totPaTVSH"
                        type="number"
                        value={totPaTVSH}
                        onChange={(e) => {
                          setTotPaTVSH(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          ndrroField(e, "TVSH");
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>TVSH</Form.Label>
                      <Form.Control
                        id="TVSH"
                        type="number"
                        value={TVSH}
                        onChange={(e) => {
                          setTVSH(e.target.value);
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
                <h1 className="title">Lista e Kalkulimeve</h1>
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
                      <th scope="col">Nr. Kalkulimit</th>
                      <th scope="col">Nr. Fatures</th>
                      <th scope="col">Partneri</th>
                      <th scope="col">Totali Pa TVSH €</th>
                      <th scope="col">TVSH €</th>
                      <th scope="col">Data e Fatures</th>
                      <th scope="col">Statusi Pageses</th>
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
                          <td>{k.nrFatures}</td>
                          <td>{k.emriBiznesit}</td>
                          <td>{k.totaliPaTvsh.toFixed(2)} €</td>
                          <td>{k.tvsh.toFixed(2)} €</td>
                          <td>
                            {new Date(k.dataRegjistrimit).toLocaleDateString(
                              "en-GB",
                              { dateStyle: "short" }
                            )}
                          </td>
                          <td>{k.statusiPageses}</td>
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

export default KalkulimiIMallit;
