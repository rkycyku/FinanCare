import { useEffect, useState } from "react";
import classes from "../../../../Pages/Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../../../TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faPenToSquare,
  faArrowLeft,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useKeyboardNavigation from "../../../../Context/useKeyboardNavigation";
import ImportoNgaOferta from "./ImportoNgaOferta";

function RegjistroFaturen(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [produktetNeKalkulim, setProduktetNeKalkulim] = useState([]);
  const [emriProduktit, setEmriProduktit] = useState("");
  const [produktiID, setProduktiID] = useState(0);
  const [produktet, setProduktet] = useState([]);
  const [sasia, setSasia] = useState("");
  const [qmimiShites, setQmimiShites] = useState("");
  const [rabati1, setRabati1] = useState("");
  const [rabati2, setRabati2] = useState("");
  const [rabati3, setRabati3] = useState("");
  const [njesiaMatese, setNjesiaMatese] = useState("Cope");
  const [totProdukteve, setTotProdukteve] = useState(0);
  const [totStokut, setTotStokut] = useState(0);
  const [totQmimi, setTotQmimi] = useState(0);
  const [totFat, setTotFat] = useState(0);
  const [sasiaNeStok, setSasiaNeStok] = useState(0);
  const [qmimiB, setQmimiB] = useState(0);
  const [qmimiSH, setQmimiSH] = useState(0);
  const [qmimiSH2, setQmimiSH2] = useState(0);
  const [sasiaShumices, setSasiaShumices] = useState(0);

  const [idTeDhenatKalk, setIdTeDhenatKalk] = useState(0);

  const [edito, setEdito] = useState(false);
  const [importoNgaOferta, setImportoNgaOferta] = useState(false);
  const [konfirmoMbylljenFatures, setKonfirmoMbylljenFatures] = useState(false);
  const [konfirmoProduktin, setKonfirmoProduktin] = useState(false);

  const [teDhenat, setTeDhenat] = useState([]);
  const [teDhenatFatures, setTeDhenatFatures] = useState([]);

  const [konifirmoProduktinLista, setKonifirmoProduktinLista] = useState([]);

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
    if (props.idKalkulimitEdit != 0) {
      const vendosTeDhenat = async () => {
        try {
          const teDhenatKalkulimit = await axios.get(
            `https://localhost:7285/api/Faturat/shfaqTeDhenatKalkulimit?idRegjistrimit=${props.idKalkulimitEdit}`,
            authentikimi
          );

          const teDhenatFatures = await axios.get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${props.idKalkulimitEdit}`,
            authentikimi
          );

          setProduktetNeKalkulim(teDhenatKalkulimit.data);
          setTeDhenatFatures(teDhenatFatures.data);
          console.log(teDhenatFatures.data);
          console.log(teDhenatKalkulimit.data);
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
    let totalProdukteve = 0;
    let totalStokut = 0;
    let totalQmimi = 0;
    let totalFat = 0;
    produktetNeKalkulim.forEach((produkti) => {
      totalProdukteve += 1;
      totalStokut += produkti.sasiaStokut;
      totalQmimi += produkti.sasiaStokut * produkti.qmimiShites;
      totalFat +=
        produkti.sasiaStokut *
        (produkti.qmimiShites -
          produkti.qmimiShites * (produkti.rabati3 / 100));
    });
    setTotProdukteve(totalProdukteve);
    setTotStokut(totalStokut);
    setTotQmimi(totalQmimi);
    setTotFat(totalFat);
  }, [produktetNeKalkulim]);

  const handleProduktiChange = (selectedOption) => {
    const kontrolloProduktin = produktetNeKalkulim.filter(
      (item) => item.idProduktit === selectedOption.produktiId
    );

    if (kontrolloProduktin.length > 0 && konfirmoProduktin === false) {
      setKonfirmoProduktin(true);

      console.log(selectedOption);

      setKonifirmoProduktinLista([
        {
          produktiID: selectedOption.produktiId,
          emriProduktit: selectedOption.emriProduktit,
          qmimiBleresIVjeter: selectedOption.qmimiBleres,
          qmimiShitesIVjeter: selectedOption.qmimiProduktit,
          qmimiShitesMeShumicIVjeter: selectedOption.qmimiMeShumic,
          sasiaNeStokEVjeter: selectedOption.sasiaNeStok,
          qmimiShites: qmimiShites,
          sasiaNeStok: sasiaNeStok,
          njesiaMatese: selectedOption.njesiaMatese1,
          llojiTVSH: selectedOption.llojiTVSH,
          barkodi: selectedOption.barkodi,
          kodiProduktit: selectedOption.kodiProduktit,
          rabati3: rabati3,
          sasiaShumices: selectedOption.sasiaShumices,
        },
      ]);
    } else {
      setProduktiID(
        selectedOption?.produktiId ?? konifirmoProduktinLista[0].produktiID
      );
      setEmriProduktit(
        selectedOption?.emriProduktit ??
          konifirmoProduktinLista[0].emriProduktit
      );
      setSasiaNeStok(
        selectedOption?.sasiaNeStok ?? konifirmoProduktinLista[0].sasiaNeStok
      );
      setQmimiSH(
        selectedOption?.qmimiProduktit ??
          konifirmoProduktinLista[0].qmimiShitesIVjeter
      );
      setQmimiB(
        selectedOption?.qmimiBleres ??
          konifirmoProduktinLista[0].qmimiBleresIVjeter
      );
      setNjesiaMatese(
        selectedOption?.njesiaMatese1 ?? konifirmoProduktinLista[0].njesiaMatese
      );
      setQmimiSH2(
        selectedOption?.qmimiMeShumic ??
          konifirmoProduktinLista[0].qmimiShitesMeShumicIVjeter
      );
      setSasia(sasia ?? konifirmoProduktinLista[0].sasiaNeStok);
      setRabati3(rabati3 ?? konifirmoProduktinLista[0].rabati3);
      setQmimiShites(qmimiShites ?? konifirmoProduktinLista[0].qmimiShites);
      setSasiaShumices(
        selectedOption.sasiaShumices ?? konifirmoProduktinLista[0].sasiaShumices
      );

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
          `${selectedOption?.barkodi ? selectedOption.barkodi : ""}` ||
          `${
            konifirmoProduktinLista[0]?.emriProduktit
              ? konifirmoProduktinLista[0].emriProduktit + " - "
              : ""
          }` +
            `${
              konifirmoProduktinLista[0]?.kodiProduktit
                ? konifirmoProduktinLista[0].kodiProduktit + " - "
                : ""
            }` +
            `${
              konifirmoProduktinLista[0]?.barkodi
                ? konifirmoProduktinLista[0].barkodi
                : ""
            }`
      );

      setKonfirmoProduktin(false);
    }
  };

  const handleSubmit = async (event) => {
    if (produktiID === 0 || sasia <= 0) {
      event.preventDefault();
      setPershkrimiMesazhit("Ju lutem plotesoni te gjitha te dhenat!");
      setTipiMesazhit("danger");
      setShfaqMesazhin(true);
    } else {
      event.preventDefault();

      await axios
        .post(
          "https://localhost:7285/api/Faturat/ruajKalkulimin/teDhenat",
          {
            idRegjistrimit: props.nrRendorKalkulimit,
            idProduktit: produktiID,
            sasiaStokut: sasia,
            qmimiBleres: qmimiB,
            qmimiShites: qmimiSH,
            qmimiShitesMeShumic: qmimiSH2,
            rabati3: rabati3,
          },
          authentikimi
        )
        .then(async () => {
          setPerditeso(Date.now());
          await axios
            .get(
              `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${props.idKalkulimitEdit}`,
              authentikimi
            )
            .then(async (r) => {
              await axios.put(
                `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${props.nrRendorKalkulimit}`,
                {
                  dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                  stafiId: r.data.regjistrimet.stafiId,
                  totaliPaTvsh: parseFloat(r.data.totaliPaTVSH),
                  tvsh: parseFloat(r.data.tvsH18 + r.data.tvsH8),
                  idpartneri: r.data.regjistrimet.idpartneri,
                  statusiPageses: r.data.statusiPageses,
                  llojiPageses: r.data.regjistrimet.llojiPageses,
                  llojiKalkulimit: r.data.regjistrimet.llojiKalkulimit,
                  nrFatures: r.data.regjistrimet.nrFatures,
                  statusiKalkulimit: r.data.regjistrimet.statusiKalkulimit,
                  pershkrimShtese: r.data.regjistrimet.pershkrimShtese,
                  rabati: parseFloat(r.data.rabati),
                  nrRendorFatures: r.data.regjistrimet.nrRendorFatures,
                },
                authentikimi
              );
            });
        });

      setProduktiID(0);
      setInputValue("");
      setSasia("");
      setSasiaNeStok(0);
      setQmimiB(0);
      setQmimiSH(0);
      setQmimiSH2(0);
      setRabati3(0);
      setQmimiShites(0);
      setPerditeso(Date.now());
    }
  };

  const ndrroField = (e, tjetra) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(tjetra).focus();
    }
  };

  async function handleMbyllFature() {
    try {
      if (produktetNeKalkulim.length === 0) {
        props.setPerditeso();
        props.mbyllPerkohesisht();
      } else {
        for (let produkti of produktetNeKalkulim) {
          console.log(produkti);
          await axios.put(
            `https://localhost:7285/api/Faturat/ruajKalkulimin/asgjesoStokun/perditesoStokunQmimin?id=${produkti.idProduktit}`,
            {
              sasiaNeStok: produkti.sasiaStokut,
            },
            authentikimi
          );
        }

        props.setPerditeso();
        props.mbyllKalkulimin();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFshij(id) {
    await axios
      .delete(
        `https://localhost:7285/api/Faturat/ruajKalkulimin/FshijTeDhenat?idTeDhenat=${id}`,
        authentikimi
      )
      .then(async () => {
        setPerditeso(Date.now());
        await axios
          .get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${props.idKalkulimitEdit}`,
            authentikimi
          )
          .then(async (r) => {
            await axios.put(
              `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${props.nrRendorKalkulimit}`,
              {
                dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                stafiId: r.data.regjistrimet.stafiId,
                totaliPaTvsh: parseFloat(r.data.totaliPaTVSH),
                tvsh: parseFloat(r.data.tvsH18 + r.data.tvsH8),
                idpartneri: r.data.regjistrimet.idpartneri,
                statusiPageses: r.data.statusiPageses,
                llojiPageses: r.data.regjistrimet.llojiPageses,
                llojiKalkulimit: r.data.regjistrimet.llojiKalkulimit,
                nrFatures: r.data.regjistrimet.nrFatures,
                statusiKalkulimit: r.data.regjistrimet.statusiKalkulimit,
                pershkrimShtese: r.data.regjistrimet.pershkrimShtese,
                rabati: parseFloat(r.data.rabati),
                nrRendorFatures: r.data.regjistrimet.nrRendorFatures,
              },
              authentikimi
            );
          });
      });
  }

  async function handleEdit(id, index) {
    await axios
      .get(
        `https://localhost:7285/api/Faturat/ruajKalkulimin/getKalkulimi?idKalkulimit=${id}`,
        authentikimi
      )
      .then((p) => {
        console.log(p.data[0]);
        setPerditeso(Date.now);

        setEdito(true);
        setProduktiID(p.data[0].idProduktit);
        setInputValue(index + 1 + " - " + p.data[0].emriProduktit);
        setEmriProduktit(p.data[0].emriProduktit);
        setSasiaNeStok(p.data[0].sasiaNeStok);
        setSasia(p.data[0].sasiaStokut);
        setQmimiB(p.data[0].qmimiBleres);
        setQmimiSH(p.data[0].qmimiProduktit);
        setQmimiSH2(p.data[0].qmimiShitesMeShumic);
        setQmimiShites(p.data[0].qmimiShites);
        setRabati1(p.data[0].rabati1);
        setRabati2(p.data[0].rabati2);
        setRabati3(p.data[0].rabati3);
      });
  }

  async function handleEdito(id) {
    if (produktiID === 0 || sasia <= 0) {
      setPershkrimiMesazhit("Ju lutem plotesoni te gjitha te dhenat!");
      setTipiMesazhit("danger");
      setShfaqMesazhin(true);
    } else {
      await axios
        .put(
          `https://localhost:7285/api/Faturat/ruajKalkulimin/PerditesoTeDhenat?id=${id}`,
          {
            qmimiBleres: qmimiB,
            qmimiShites: qmimiShites,
            sasiaStokut: sasia,
            qmimiShitesMeShumic: qmimiSH2,
            rabati1: rabati1,
            rabati2: rabati2,
            rabati3: rabati3,
          },
          authentikimi
        )
        .then(async () => {
          setPerditeso(Date.now());
          await axios
            .get(
              `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${props.idKalkulimitEdit}`,
              authentikimi
            )
            .then(async (r) => {
              await axios.put(
                `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${props.nrRendorKalkulimit}`,
                {
                  dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                  stafiId: r.data.regjistrimet.stafiId,
                  totaliPaTvsh: parseFloat(r.data.totaliPaTVSH),
                  tvsh: parseFloat(r.data.tvsH18 + r.data.tvsH8),
                  idpartneri: r.data.regjistrimet.idpartneri,
                  statusiPageses: r.data.statusiPageses,
                  llojiPageses: r.data.regjistrimet.llojiPageses,
                  llojiKalkulimit: r.data.regjistrimet.llojiKalkulimit,
                  nrFatures: r.data.regjistrimet.nrFatures,
                  statusiKalkulimit: r.data.regjistrimet.statusiKalkulimit,
                  pershkrimShtese: r.data.regjistrimet.pershkrimShtese,
                  rabati: parseFloat(r.data.rabati),
                  nrRendorFatures: r.data.regjistrimet.nrRendorFatures,
                },
                authentikimi
              );
            });
        });

      setProduktiID(0);
      setSasia("");
      setInputValue("");
      setSasiaNeStok(0);
      setQmimiB(0);
      setQmimiSH(0);
      setQmimiSH2(0);
      setQmimiShites("");
      setRabati3("");
      setEdito(false);
    }
  }

  function KthehuTekFaturat() {
    props.setPerditeso();
    props.mbyllPerkohesisht();
  }

  function shfaqImportoNgaOferta(shfaq) {
    if (shfaq === true) {
      setImportoNgaOferta(true);
    } else {
      setImportoNgaOferta(false);
    }
    setPerditeso(Date.now());
  }

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

  function kontrolloQmimin(e) {
    setSasia(e.target.value);
  }

  return (
    <div className={classes.containerDashboardP}>
      {shfaqMesazhin && (
        <Mesazhi
          setShfaqMesazhin={setShfaqMesazhin}
          pershkrimi={pershkrimiMesazhit}
          tipi={tipiMesazhit}
        />
      )}
      {konfirmoMbylljenFatures && (
        <Modal
          show={konfirmoMbylljenFatures}
          onHide={() => setKonfirmoMbylljenFatures(false)}>
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
              onClick={() => setKonfirmoMbylljenFatures(false)}>
              Edito Faturen <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant="warning" onClick={handleMbyllFature}>
              Konfirmo <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {konfirmoProduktin && (
        <Modal
          show={konfirmoProduktin}
          onHide={() => setKonfirmoProduktin(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo Prodouktin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>
              Ky produkt eshte shtuar nje her! A jeni te sigurt qe deshironi ta
              shtoni prap?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setKonfirmoProduktin(false)}>
              Jo <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                handleProduktiChange(konifirmoProduktinLista[0].produktiID)
              }>
              Po <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {importoNgaOferta && (
        <ImportoNgaOferta
          show={() => shfaqImportoNgaOferta(true)}
          hide={() => shfaqImportoNgaOferta(false)}
          partneri={
            teDhenatFatures.regjistrimet &&
            teDhenatFatures.regjistrimet.idpartneri
          }
          nrRendorKalkulimit={props.nrRendorKalkulimit}
          setPerditeso={() => setPerditeso(Date.now())}
          setShfaqMesazhin={(e) => setShfaqMesazhin(e)}
          setPershkrimiMesazhit={(e) => setPershkrimiMesazhit(e)}
          setTipiMesazhit={(e) => setTipiMesazhit(e)}
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
        <>
          <h1 className="title">Porosia</h1>

          <Container fluid>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
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

                    <div className="container" style={{ position: "relative" }}>
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
                  <Form.Group>
                    <Form.Label>Sasia - {njesiaMatese}</Form.Label>
                    <Form.Control
                      id="sasia"
                      type="number"
                      placeholder={"0.00 " + njesiaMatese}
                      value={sasia}
                      onChange={(e) => {
                        kontrolloQmimin(e);
                      }}
                      onKeyDown={(e) => {
                        ndrroField(e, "rabati");
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Qmimi Shites €</Form.Label>
                    <Form.Control
                      id="qmimiShites"
                      type="number"
                      placeholder={"0.00 €"}
                      value={qmimiSH}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Rabati %</Form.Label>
                    <Form.Control
                      id="rabati"
                      type="number"
                      placeholder={"0.00 %"}
                      value={rabati3}
                      onChange={(e) => {
                        setRabati3(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <br />
                  <div style={{ display: "flex", gap: "0.3em" }}>
                    <Button variant="success" type="submit" disabled={edito}>
                      Shto Produktin <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {edito && (
                      <Button
                        variant="warning"
                        onClick={() => handleEdito(idTeDhenatKalk)}>
                        Edito Produktin <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                    )}
                  </div>
                </Form>
              </Col>
              <Col>
                <p>
                  <strong>Sasia aktuale ne Stok:</strong> {sasiaNeStok}{" "}
                  {njesiaMatese}
                </p>
                <p>
                  <strong>Qmimi Shites me Pakic + TVSH:</strong>{" "}
                  {parseFloat(qmimiSH).toFixed(2)} €
                </p>
                <p>
                  <strong>Sasia e Shumice :</strong> {sasiaShumices}
                </p>
                <p>
                  <strong>Qmimi Shites me Shumic + TVSH:</strong>{" "}
                  {parseFloat(qmimiSH2).toFixed(2)} €
                </p>
              </Col>
              <Col>
                <Row>
                  <h5>
                    <strong>Nr. Porosise:</strong>{" "}
                    {teDhenatFatures.regjistrimet &&
                      teDhenatFatures.regjistrimet.nrRendorFatures}
                  </h5>
                  <h5>
                    <strong>Partneri:</strong>{" "}
                    {teDhenatFatures.regjistrimet &&
                      teDhenatFatures.regjistrimet.idpartneri}{" "}
                    -{" "}
                    {teDhenatFatures.regjistrimet &&
                      teDhenatFatures.regjistrimet.emriBiznesit}
                  </h5>
                  <h5>
                    <strong>Pershkrim Shtese:</strong>{" "}
                    {teDhenatFatures.regjistrimet &&
                      teDhenatFatures.regjistrimet.pershkrimShtese}
                  </h5>
                  <h5>
                    <strong>Lloji Pageses:</strong>{" "}
                    {teDhenatFatures.regjistrimet &&
                      teDhenatFatures.regjistrimet.llojiPageses}
                  </h5>

                  <hr />
                  <Col>
                    <Button
                      className="mb-3 Butoni"
                      onClick={() => setKonfirmoMbylljenFatures(true)}>
                      Mbyll Faturen <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                      className="mb-3 Butoni"
                      onClick={() => setImportoNgaOferta(true)}>
                      Importo nga Oferta <FontAwesomeIcon icon={faFileImport} />
                    </Button>
                    <Button
                      className="mb-3 Butoni"
                      onClick={() => KthehuTekFaturat()}>
                      <FontAwesomeIcon icon={faArrowLeft} /> Kthehu Mbrapa
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
                  <th>Qmimi Shites</th>
                  <th>Rabati</th>
                  <th>Qmimi Shites - Rabati</th>
                  <th>Totali</th>
                  <th>Funksione</th>
                </tr>
              </thead>
              <tbody>
                {produktetNeKalkulim.map((p, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{p.emriProduktit}</td>
                    <td>{parseFloat(p.sasiaStokut).toFixed(2)}</td>
                    <td>{parseFloat(p.qmimiShites).toFixed(2)} €</td>
                    <td>{parseFloat(p.rabati3).toFixed(2)} %</td>
                    <td>
                      {parseFloat(
                        p.qmimiShites - p.qmimiShites * (p.rabati3 / 100)
                      ).toFixed(2)}{" "}
                      €
                    </td>
                    <td>
                      {parseFloat(
                        p.sasiaStokut *
                          (p.qmimiShites - p.qmimiShites * (p.rabati3 / 100))
                      ).toFixed(2)}{" "}
                      €
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.3em" }}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleFshij(p.id)}>
                          <FontAwesomeIcon icon={faXmark} />
                        </Button>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => {
                            handleEdit(p.id, index);
                            setIdTeDhenatKalk(p.id);
                          }}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
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
                </tr>
                <tr>
                  <td>{totProdukteve}</td>
                  <td>-</td>
                  <td>{parseFloat(totStokut).toFixed(2)}</td>
                  <td>{parseFloat(totQmimi).toFixed(2)} €</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{parseFloat(totFat).toFixed(2)} €</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </div>
  );
}

export default RegjistroFaturen;
