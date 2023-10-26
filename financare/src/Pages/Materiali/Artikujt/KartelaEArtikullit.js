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

function KartelaEArtikullit(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [produktiID, setProduktiID] = useState(0);
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
          `https://localhost:7285/api/Produkti/ProduktetPerKalkulim`,
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
          `https://localhost:7285/api/Produkti/KartelaArtikullit?id=${produktiID}`,
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
    setProduktiID(selectedOption?.produktiId ?? 0);

    setFilteredItems([]);
    setInputValue(
      `${
        selectedOption?.emriProduktit
          ? selectedOption.emriProduktit + " - "
          : ""
      }` +
        `${
          selectedOption?.kodiProduktit
            ? selectedOption.kodiProduktit + " - "
            : ""
        }` +
        `${selectedOption?.barkodi ? selectedOption.barkodi : ""}`
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
        item.emriProduktit.toLowerCase().includes(value) ||
        item.barkodi.toLowerCase().includes(value) ||
        item.kodiProduktit.toLowerCase().includes(value)
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
      "Kartela e Produktit - " +
        (kartelaEProduktit && kartelaEProduktit?.produkti?.emriProduktit) +
        " - " +
        (kartelaEProduktit && kartelaEProduktit?.produkti?.kodiProduktit) +
        " - " +
        (kartelaEProduktit && kartelaEProduktit?.produkti?.barkodi) +
        ".pdf"
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Tech Store</title>
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
            <h1 className="title">Kartela e Artikullit</h1>

            <Container fluid>
              <Row>
                <Col>
                  <Form>
                    <Form.Group controlId="idDheEmri">
                      <Form.Label>Produkti</Form.Label>
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
                              key={item.produktiId}
                              className={`list-group-item${
                                selectedIndex === index ? " active" : ""
                              }`}
                              onClick={() => handleProduktiChange(item)}>
                              {item.emriProduktit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Form.Group>
                  </Form>
                  <br />

                  <p>
                    <strong>Njesia Matese:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.njesiaMatese1) ??
                      0}
                  </p>
                  <p>
                    <strong>Prodhuesi:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.emriBiznesit) ??
                      0}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Sasia aktuale ne Stok:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.sasiaNeStok) ??
                      0}{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.njesiaMatese1) ??
                      0}
                  </p>
                  <p>
                    <strong>Qmimi Shites me Pakic + TVSH:</strong>{" "}
                    {parseFloat(
                      (kartelaEProduktit &&
                        kartelaEProduktit?.produkti?.qmimiProduktit) ??
                        0
                    ).toFixed(2)}{" "}
                    €
                  </p>
                  <p>
                    <strong>Sasia e Shumice :</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.sasiaShumices) ??
                      0}
                  </p>
                  <p>
                    <strong>Qmimi Shites me Shumic + TVSH:</strong>{" "}
                    {parseFloat(
                      (kartelaEProduktit &&
                        kartelaEProduktit?.produkti?.qmimiMeShumic) ??
                        0
                    ).toFixed(2)}{" "}
                    €
                  </p>
                </Col>
                <Col>
                  <Row>
                    <h3>Zbritjet e Produktit</h3>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Data e Zbritjes</th>
                          <th>Data e Skadimit</th>
                          <th>Rabati %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kartelaEProduktit &&
                          kartelaEProduktit.zbritjet &&
                          kartelaEProduktit.zbritjet.map((p) => (
                            <tr>
                              <td>
                                {new Date(p.dataZbritjes).toLocaleDateString(
                                  "en-GB",
                                  {
                                    dateStyle: "short",
                                  }
                                )}
                              </td>
                              <td>
                                {new Date(p.dataSkadimit).toLocaleDateString(
                                  "en-GB",
                                  {
                                    dateStyle: "short",
                                  }
                                )}
                              </td>
                              <td>{parseFloat(p.rabati).toFixed(2)}</td>
                            </tr>
                          ))}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                    <hr />
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "left",
                      }}>
                      <Link to="/Produktet">
                        <Button className="mb-3 Butoni">Produktet</Button>
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
                    <th>Partneri</th>
                    <th>Sas. Hyrese</th>
                    <th>Sas. Dalese</th>
                    <th>Qmimi Hyres</th>
                    <th>Qmimi Dales</th>
                    <th>R. 1</th>
                    <th>R. 2</th>
                    <th>R. 3</th>
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
                        <td>{p.emriBiznesit}</td>
                        <td>
                          {p.llojiKalkulimit === "HYRJE" ||
                          p.llojiKalkulimit === "FL" ||
                          p.llojiKalkulimit === "KMSH"
                            ? p.sasiaStokut
                            : "-"}
                        </td>
                        <td>
                          {p.llojiKalkulimit === "FAT" ||
                          p.llojiKalkulimit === "AS" ||
                          p.llojiKalkulimit === "KMB"
                            ? p.sasiaStokut
                            : "-"}
                        </td>
                        <td>
                          {p.llojiKalkulimit === "HYRJE" ||
                          p.llojiKalkulimit === "FL" ||
                          p.llojiKalkulimit === "KMSH"
                            ? parseFloat(p.qmimiBleres).toFixed(3) + " €"
                            : "-"}
                        </td>
                        <td>
                          {p.llojiKalkulimit === "FAT" ||
                          p.llojiKalkulimit === "AS" ||
                          p.llojiKalkulimit === "KMB"
                            ? parseFloat(p.qmimiShites).toFixed(3) + " €"
                            : "-"}
                        </td>
                        <td>{parseFloat(p.rabati1 ?? 0).toFixed(2)} %</td>
                        <td>{parseFloat(p.rabati2 ?? 0).toFixed(2)} %</td>
                        <td>{parseFloat(p.rabati3 ?? 0).toFixed(2)} %</td>
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
                    <td></td>
                    <td></td>
                    <td></td>
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

export default KartelaEArtikullit;
