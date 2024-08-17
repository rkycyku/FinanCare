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
import Select from "react-select";

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

  const [options, setOptions] = useState([]);
  const [optionsSelected, setOptionsSelected] = useState(null);
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 1050, // Ensure this is higher than the z-index of the thead
    }),
  };
  useEffect(() => {
    axios
      .get("https://localhost:7285/api/Partneri/shfaqPartneret")
      .then((response) => {
        const fetchedoptions = response.data.map((item) => ({
          value: item.idPartneri,
          label: item.emriBiznesit,
        }));
        setOptions(fetchedoptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleChange = async (partneri) => {
    setproduktiID(partneri.value);
    setOptionsSelected(partneri);
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
                      <Select
                        value={optionsSelected}
                        onChange={handleChange}
                        options={options}
                        id="produktiSelect" // Setting the id attribute
                        inputId="produktiSelect-input" // Setting the input id attribute
                        styles={customStyles}
                      />
                    </Form.Group>
                  </Form>
                  <br />

                  <p>
                    <strong>Shkurtesa:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit.partneri?.shkurtesaPartnerit) ??
                      ""}
                  </p>
                  <p>
                    <strong>Nr. Unik:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit.partneri?.nui) ??
                      0}
                  </p>
                  <p>
                    <strong>Lloji Partnerit:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit.partneri?.llojiPartnerit) ??
                      ""}
                  </p>
                </Col>
                <Col>
                  <h3>Te dhenat Ndihmese</h3>
                  <p>
                    <strong>Nr. TVSH:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit.partneri?.tvsh) ??
                      0}
                  </p>
                  <p>
                    <strong>Nr. Fiskal:</strong>{" "}
                    {(kartelaEProduktit && kartelaEProduktit.partneri?.nrf) ??
                      0}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit?.produkti?.email) ??
                      0}
                  </p>
                  <p>
                    <strong>Adresa:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit.partneri?.adresa) ??
                      ""}
                  </p>
                  <p>
                    <strong>Nr. Kontaktit:</strong>{" "}
                    {(kartelaEProduktit &&
                      kartelaEProduktit.partneri?.nrKontaktit) ??
                      0}
                  </p>
                </Col>
                <Col>
                  <Row>
                    <h3>Financat</h3>
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
                          p.llojiKalkulimit == "KMSH"||
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
                              <td>{p.nrRendorFatures}</td>
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
                                p.llojiKalkulimit === "KMSH"||
                          p.llojiKalkulimit == "PAGES"
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
                    <td>{parseFloat((
                        kartelaEProduktit && kartelaEProduktit?.totaliDalese) - (kartelaEProduktit && kartelaEProduktit?.totaliHyrese)
                      ).toFixed(2) ?? parseFloat(0).toFixed(2)}{" "}
                      €</td>
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
