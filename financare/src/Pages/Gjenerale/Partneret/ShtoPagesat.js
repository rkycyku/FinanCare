import { useEffect, useState } from "react";
import classes from "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faPenToSquare,
  faArrowLeft,
  faDownload,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useKeyboardNavigation from "../../../Context/useKeyboardNavigation";
import { Helmet } from "react-helmet";
import NavBar from "../../../Components/TeTjera/layout/NavBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ShtoPagesat(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [produktiID, setproduktiID] = useState(0);
  const [kartelaEProduktit, setKartelaEProduktit] = useState([]);
  const [produktet, setProduktet] = useState([]);

  const [teDhenat, setTeDhenat] = useState([]);

  const [pershkrimiPageses, setPershkrimiPageses] = useState("");
  const [shumaPageses, setShumaPageses] = useState(0);
  const [llojiIPageses, setLlojiIPageses] = useState("Cash");

  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(produktet);
  const selectedIndex = useKeyboardNavigation(filteredItems); // Use the custom hook

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
    const vendosProduktet = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/Partneri/shfaqPartneret`,
          authentikimi
        );
        setProduktet(produktet.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosProduktet();
  }, [perditeso]);

  useEffect(() => {
    const kartelaEProduktit = async () => {
      try {
        const kartela = await axios.get(
          `https://localhost:7285/api/Partneri/KartelaFinanciare?id=${produktiID}`,
          authentikimi
        );
        setKartelaEProduktit(kartela.data);
        console.log(kartela.data);
      } catch (err) {
        console.log(err);
      }
    };

    kartelaEProduktit();
  }, [perditeso, produktiID]);

  const handleProduktiChange = async (selectedOption) => {
    setproduktiID(selectedOption?.idPartneri ?? 0);

    setFilteredItems([]);
    setInputValue(
      `${selectedOption?.emriBiznesit ? selectedOption.emriBiznesit : ""}`
    );
  };

  const ndrroField = (e, tjetra) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(tjetra).focus();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        handleProduktiChange(filteredItems[selectedIndex]);
      }

      ndrroField(e, "pershkrimiPageses");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filtered = produktet.filter(
      (item) =>
        item.emriBiznesit.toLowerCase().includes(value) ||
        item.nui.toLowerCase().includes(value) ||
        item.nrf.toLowerCase().includes(value) ||
        item.tvsh.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );

    setFilteredItems(filtered);
  };

  async function handleRegjistroKalkulimin() {
    try {
      await axios
        .post(
          "https://localhost:7285/api/Faturat/ruajKalkulimin",
          {
            stafiID: teDhenat.perdoruesi.userID,
            totaliPaTVSH: shumaPageses,
            idPartneri: produktiID,
            llojiPageses: llojiIPageses,
            pershkrimShtese: pershkrimiPageses,
            llojiKalkulimit: "PAGES",
            statusiKalkulimit: "true",
          },
          authentikimi
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setPerditeso(Date.now());
            setPershkrimiPageses("");
            setShumaPageses(0);
            setLlojiIPageses("Cash");
          } else {
            console.log("gabim");
            setPerditeso(Date.now());
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Pagesat e Fatures | FinanCare</title>
      </Helmet>
      <NavBar />

      <div className="containerDashboardP">
        {shfaqMesazhin && (
          <Mesazhi
            setShfaqMesazhin={setShfaqMesazhin}
            pershkrimi={pershkrimiMesazhit}
            tipi={tipiMesazhit}
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
          <div className="kartela">
            <h1 className="title">Kartela Financiare</h1>

            <Container fluid>
              <Row>
                <Col>
                  <h3>Te dhenat e Partnerit</h3>
                  <Form>
                    <Form.Group controlId="idDheEmri">
                      <Form.Label>Partneri</Form.Label>
                      <Form.Control
                        id={produktiID}
                        type="text"
                        className="form-control styled-input"
                        placeholder="Search"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={handleInputChange}
                      />

                      <div
                        className="container"
                        style={{ position: "relative" }}>
                        <ul className="list-group mt-2 searchBoxi">
                          {filteredItems.map((item, index) => (
                            <li
                              key={item.idPartneri}
                              className={`list-group-item${
                                selectedIndex === index ? " active" : ""
                              }`}
                              onClick={() => handleProduktiChange(item)}>
                              {item.emriBiznesit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Form.Group>
                  </Form>
                  <br />
                  <p>
                    <strong>Totali Hyres :</strong>{" "}
                    {parseFloat(
                      kartelaEProduktit && kartelaEProduktit?.totaliHyrese
                    ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                    €
                  </p>
                  <p>
                    <strong>Totali Dales :</strong>{" "}
                    {parseFloat(
                      kartelaEProduktit && kartelaEProduktit?.totaliDalese
                    ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                    €
                  </p>
                  <p>
                    <strong>Saldo :</strong>{" "}
                    {parseFloat(
                      (kartelaEProduktit && kartelaEProduktit?.totaliDalese) -
                        (kartelaEProduktit && kartelaEProduktit?.totaliHyrese)
                    ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                    €
                  </p>
                </Col>
                <Col>
                  <h3>Pagesa</h3>
                  <Form.Group>
                    <Form.Label>Pershkrimi Pageses</Form.Label>
                    <Form.Control
                      id="pershkrimiPageses"
                      type="text"
                      value={pershkrimiPageses}
                      onChange={(e) => {
                        setPershkrimiPageses(e.target.value);
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
                        ndrroField(e, "shumaPageses");
                      }}>
                      <option defaultValue value={0} key={0} disabled>
                        Zgjedhni Llojin e Pageses
                      </option>
                      <option key={1} value="Cash">
                        Cash
                      </option>
                      <option key={2} value="Banke">
                        Banke
                      </option>
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Shuma Pageses</Form.Label>
                    <Form.Control
                      id="shumaPageses"
                      type="number"
                      value={shumaPageses}
                      onChange={(e) => {
                        setShumaPageses(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <br />
                </Col>
                <Col>
                  <Row>
                    <h3>Funksione</h3>
                    <hr />
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "left",
                      }}>
                      <Link to="/TabelaEPartnereve">
                        <Button className="mb-3 Butoni">Partneret</Button>
                      </Link>

                      <Button
                        className="mb-3 Butoni"
                        onClick={() => handleRegjistroKalkulimin()}>
                        Regjistro <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>NR.</th>
                    <th>Data Fat.</th>
                    <th>Lloji Fat.</th>
                    <th>Nr. Fat.</th>
                    <th>Pershkrimi</th>
                    <th>Faturim</th>
                    <th>Pagese</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {kartelaEProduktit &&
                    kartelaEProduktit.kalkulimet &&
                    (() => {
                      let saldo = 0;
                      return kartelaEProduktit.kalkulimet.map((p, index) => {
                        const qmimiMeTVSHRab = parseFloat(
                          p.qmimiShites -
                            p.qmimiShites * (p.rabati1 / 100) -
                            (p.qmimiShites -
                              p.qmimiShites * (p.rabati1 / 100)) *
                              (p.rabati2 / 100) -
                            (p.qmimiShites -
                              p.qmimiShites * (p.rabati1 / 100) -
                              (p.qmimiShites -
                                p.qmimiShites * (p.rabati1 / 100)) *
                                (p.rabati2 / 100)) *
                              (p.rabati3 / 100)
                        ).toFixed(3);
                        const ShumaToT = parseFloat(
                          qmimiMeTVSHRab * p.sasiaStokut
                        ).toFixed(3);

                        let faturimValue = 0;
                        let vlera =
                          p.totaliPaTVSH + p.tvsh - p.rabati < 0
                            ? (p.totaliPaTVSH + p.tvsh - p.rabati) * -1
                            : p.totaliPaTVSH + p.tvsh - p.rabati;
                        if (
                          p.llojiKalkulimit == "FAT" ||
                          p.llojiKalkulimit == "AS" ||
                          p.llojiKalkulimit == "KMB"
                        ) {
                          faturimValue = parseFloat(vlera).toFixed(2);
                          saldo += parseFloat(faturimValue);
                        } else if (
                          p.llojiKalkulimit == "HYRJE" ||
                          p.llojiKalkulimit == "FL" ||
                          p.llojiKalkulimit == "KMSH" ||
                          p.llojiKalkulimit == "PAGES"
                        ) {
                          faturimValue = parseFloat(vlera).toFixed(2);
                          saldo -= parseFloat(faturimValue);
                        }

                        return (
                          p && (
                            <tr key={p.id}>
                              <td>{index + 1}</td>
                              <td>
                                {new Date(
                                  p.dataRegjistrimit
                                ).toLocaleDateString("en-GB", {
                                  dateStyle: "short",
                                })}
                              </td>
                              <td>{p.llojiKalkulimit}</td>
                              <td>
                                {p.nrRendorFatures === 0
                                  ? "-"
                                  : p.nrRendorFatures}
                              </td>
                              <td>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: p.pershkrimShtese,
                                  }}
                                />
                              </td>
                              <td>
                                {p.llojiKalkulimit === "FAT" ||
                                p.llojiKalkulimit === "AS" ||
                                p.llojiKalkulimit === "KMB"
                                  ? faturimValue < 0
                                    ? (faturimValue * -1).toFixed(2)
                                    : faturimValue
                                  : "-"}
                              </td>
                              <td>
                                {p.llojiKalkulimit === "HYRJE" ||
                                p.llojiKalkulimit === "FL" ||
                                p.llojiKalkulimit === "KMSH" ||
                                p.llojiKalkulimit === "PAGES"
                                  ? faturimValue < 0
                                    ? (faturimValue * -1).toFixed(2) + " €"
                                    : faturimValue + " €"
                                  : "-"}
                              </td>
                              <td>{saldo.toFixed(2) * -1 + " €"}</td>
                            </tr>
                          )
                        );
                      });
                    })()}
                  <tr>
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
                    <td>
                      {(kartelaEProduktit &&
                        kartelaEProduktit?.kalkulimet &&
                        kartelaEProduktit?.kalkulimet.length) ??
                        0}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {parseFloat(
                        kartelaEProduktit && kartelaEProduktit?.totaliHyrese
                      ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                      €
                    </td>
                    <td>
                      {parseFloat(
                        kartelaEProduktit && kartelaEProduktit?.totaliDalese
                      ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                      €
                    </td>
                    <td>
                      {parseFloat(
                        (kartelaEProduktit && kartelaEProduktit?.totaliDalese) -
                          (kartelaEProduktit && kartelaEProduktit?.totaliHyrese)
                      ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                      €
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </div>
        )}
      </div>
    </>
  );
}

export default ShtoPagesat;
