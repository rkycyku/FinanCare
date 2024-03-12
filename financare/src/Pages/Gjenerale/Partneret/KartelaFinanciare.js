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

function KartelaFinanciare(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [produktiID, setproduktiID] = useState(0);
  const [kartelaEProduktit, setKartelaEProduktit] = useState([]);
  const [produktet, setProduktet] = useState([]);

  const [teDhenat, setTeDhenat] = useState([]);

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

      ndrroField(e, "sasia");
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

  function FaturaPerRuajtje() {
    const kartela = document.querySelector(".kartela");
    const kthejButonat = [];

    const largoButonat = kartela.querySelectorAll("button");
    largoButonat.forEach((button) => {
      const parent = button.parentNode;
      const position = Array.from(parent.children).indexOf(button);
      kthejButonat.push({ button, parent, position });
      button.remove();
    });

    html2canvas(kartela, { useCORS: true })
      .then((invoiceCanvas) => {
        var contentWidth = invoiceCanvas.width;
        var contentHeight = invoiceCanvas.height;
        var pageHeight = (contentWidth / 592.28) * 841.89;
        var leftHeight = contentHeight;
        var position = 0;
        var imgWidth = 555.28;
        var imgHeight = (imgWidth / contentWidth) * contentHeight;
        var invoicePageData = invoiceCanvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF("", "pt", "a4");

        if (leftHeight < pageHeight) {
          pdf.addImage(invoicePageData, "JPEG", 20, 20, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(
              invoicePageData,
              "JPEG",
              20,
              position + 5,
              imgWidth,
              imgHeight
            );
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }

        kthejButonat.forEach(({ button, parent, position }) => {
          parent.insertBefore(button, parent.children[position]);
        });

        ruajFaturen(pdf);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function ruajFaturen(pdf) {
    pdf.save(
      "Kartela Financiare - " +
        (kartelaEProduktit && kartelaEProduktit?.emriBiznesit) +
        " - " +
        (kartelaEProduktit && kartelaEProduktit?.nui) +
        ".pdf"
    );
  }

  return (
    <>
      <Helmet>
        <title>Kartela Financiare | FinanCare</title>
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
                    <strong>Shkurtesa:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.shkurtesaPartnerit) ??
                      ""}
                  </p>
                  <p>
                    <strong>Nr. Unik:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.nui) ?? 0}
                  </p>
                  <p>
                    <strong>Lloji Partnerit:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.llojiPartnerit) ??
                      ""}
                  </p>
                </Col>
                <Col>
                  <h3>Te dhenat Ndihmese</h3>
                  <p>
                    <strong>Nr. TVSH:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.tvsh) ?? 0}
                  </p>
                  <p>
                    <strong>Nr. Fiskal:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.nrf) ?? 0}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.sasiaShumices) ??
                      0}
                  </p>
                  <p>
                    <strong>Adresa:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.adresa) ?? ""}
                  </p>
                  <p>
                    <strong>Nr. Kontaktit:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit?.nrKontaktit) ?? 0}
                  </p>
                </Col>
                <Col>
                  <Row>
                    <h3>Financat</h3>
                    <p>
                      <strong>Totali Hyres :</strong>{" "}
                      {(kartelaEProduktit && kartelaEProduktit?.totaliHyrese) ??
                        0}
                    </p>
                    <p>
                      <strong>Totali Dales :</strong>{" "}
                      {(kartelaEProduktit && kartelaEProduktit?.totaliDalese) ??
                        0}
                    </p>
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
                        onClick={() => FaturaPerRuajtje()}>
                        Ruaj Kartelen <FontAwesomeIcon icon={faDownload} />
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
                    kartelaEProduktit.kalkulimet.map((p, index) => (
                      <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(p.dataRegjistrimit).toLocaleDateString(
                            "en-GB",
                            {
                              dateStyle: "short",
                            }
                          )}
                        </td>
                        <td>{p.llojiKalkulimit}</td>
                        <td>{p.nrRendorFatures}</td>
                        <td>{p.pershkrimShtese}</td>
                        <td>
                          {p.llojiKalkulimit === "FAT" ||
                          p.llojiKalkulimit === "AS" ||
                          p.llojiKalkulimit === "KMB"
                            ? parseFloat(
                                p.totaliPaTVSH + p.tvsh - p.rabati
                              ).toFixed(2)
                            : "-"}
                        </td>
                        <td>
                          {p.llojiKalkulimit === "HYRJE" ||
                          p.llojiKalkulimit === "FL" ||
                          p.llojiKalkulimit === "KMSH"
                            ? parseFloat(
                                p.totaliPaTVSH + p.tvsh - p.rabati
                              ).toFixed(2)
                            : "-"}
                        </td>
                        <td>
                          {p.llojiKalkulimit === "HYRJE" ||
                          p.llojiKalkulimit === "FL" ||
                          p.llojiKalkulimit === "KMSH"
                            ? parseFloat(p.qmimiBleres).toFixed(3) + " €"
                            : "-"}
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
                      {(kartelaEProduktit && kartelaEProduktit?.totaliHyrese) ??
                        0}
                    </td>
                    <td>
                      {(kartelaEProduktit && kartelaEProduktit?.totaliDalese) ??
                        0}
                    </td>
                    <td></td>
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

export default KartelaFinanciare;
