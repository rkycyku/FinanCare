import { useEffect, useState } from "react";
import classes from "../../../Pages/Styles/DizajniPergjithshem.css";
import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faPenToSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import { Table, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useKeyboardNavigation from "../../../Context/useKeyboardNavigation";
import Select from "react-select";

function POS(props) {
  const [perditeso, setPerditeso] = useState("");
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);
  const [produktetNeKalkulim, setproduktetNeKalkulim] = useState([]);
  const [emriProduktit, setEmriProduktit] = useState("");
  const [produktiID, setproduktiID] = useState(0);
  const [produktet, setProduktet] = useState([]);
  const [sasia, setSasia] = useState("1");
  const [qmimiShites, setQmimiShites] = useState("");
  const [qmimiShitesMePakic, setQmimiShitesMePakic] = useState("");
  const [rabati1, setRabati1] = useState("");
  const [rabati2, setRabati2] = useState("");
  const [rabati3, setRabati3] = useState(0);
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

  const [nrFatures, setNrFatures] = useState(0);
  const [idRegjistrimit, setIdRegjistrimit] = useState(0);
  const [llojiPageses, setLlojiPageses] = useState("Cash");
  const [shumaPageses, setShumaPageses] = useState(0);
  const [kusuri, setKusuri] = useState(0);
  const [qmimiTotal, setQmimiTotal] = useState(0);
  const [totaliTVSH, setTotaliTVSH] = useState(0);
  const [kalkEditID, setKalkEditID] = useState(0);

  const [perditesoFat, setPerditesoFat] = useState("");

  const [barkodi, setBarkodi] = useState(0);

  const [idTeDhenatKalk, setIdTeDhenatKalk] = useState(0);

  const [edito, setEdito] = useState(false);
  const [konfirmoMbylljenFatures, setKonfirmoMbylljenFatures] = useState(false);

  const [konfirmoBarkodin, setKonfirmoBarkodin] = useState(false);

  const [teDhenat, setTeDhenat] = useState([]);
  const [teDhenatFatures, setTeDhenatFatures] = useState([]);

  const [konifirmoProduktinLista, setKonifirmoProduktinLista] = useState([]);

  const [inputValueBarkodi, setInputValueBarkodi] = useState("");
  const [filteredItemsBarkodi, setFilteredItemsBarkodi] = useState(produktet);
  const selectedIndexBarkodi = useKeyboardNavigation(filteredItemsBarkodi); // Use the custom hook^

  const [inputValuProdukti, setInputValueProdukti] = useState("");

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

          const nrRendor = await axios.get(
            `https://localhost:7285/api/Faturat/ShfaqNumrinRendorFatures?stafiID=${perdoruesi.data.perdoruesi.userID}`,
            authentikimi
          );
          setNrFatures(nrRendor.data.nrFat);
          setIdRegjistrimit(nrRendor.data.idRegjistrimit);
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
    const vendosTeDhenat = async () => {
      try {
        const teDhenatKalkulimit = await axios.get(
          `https://localhost:7285/api/Faturat/shfaqTeDhenatKalkulimit?idRegjistrimit=${idRegjistrimit}`,
          authentikimi
        );

        const teDhenatFatures = await axios.get(
          `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${idRegjistrimit}`,
          authentikimi
        );

        setproduktetNeKalkulim(teDhenatKalkulimit.data);
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
  }, [perditesoFat, produktiID]);

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
    let totalQmimiPaTVSH = 0;
    let totalTVSH = 0;

    produktetNeKalkulim.forEach((produkti) => {
      const qmimiShitesPasRabatit =
        produkti.qmimiShites -
        produkti.qmimiShites * (produkti.rabati1 / 100) -
        (produkti.qmimiShites -
          produkti.qmimiShites * (produkti.rabati1 / 100)) *
          (produkti.rabati2 / 100) -
        (produkti.qmimiShites -
          produkti.qmimiShites * (produkti.rabati1 / 100) -
          (produkti.qmimiShites -
            produkti.qmimiShites * (produkti.rabati1 / 100)) *
            (produkti.rabati2 / 100)) *
          (produkti.rabati3 / 100);

      const qmimiPaTVSH =
        qmimiShitesPasRabatit / (1 + produkti.llojiTVSH / 100);
      const qmimiTVSH = qmimiPaTVSH * (produkti.llojiTVSH / 100);

      totalQmimiPaTVSH += qmimiPaTVSH * produkti.sasiaStokut;
      totalTVSH += qmimiTVSH * produkti.sasiaStokut;
    });

    setTotQmimi(totalQmimiPaTVSH);
    setTotaliTVSH(totalTVSH);
    setQmimiTotal(totalQmimiPaTVSH + totalTVSH);
  }, [produktetNeKalkulim]);

  const handleBarkodiChange = (selectedOption) => {
    setFilteredItemsBarkodi([]);
    setInputValueBarkodi(selectedOption.barkodi || "");
    setInputValueProdukti(
      selectedOption.emriProduktit ? selectedOption.emriProduktit + " - " : ""
    );

    handleSubmit(
      selectedOption.produktiID,
      selectedOption.qmimiProduktit,
      selectedOption.qmimiMeShumic,
      0
    );

    document.getElementById("barkodi").focus();
  };

  const handleSubmit = async (
    idProduktit,
    qmimiShites,
    qmimiShitesMeShumic,
    rabati1
  ) => {
    await axios
      .post(
        "https://localhost:7285/api/Faturat/ruajKalkulimin/teDhenat",
        {
          idRegjistrimit: idRegjistrimit,
          idProduktit: idProduktit,
          sasiaStokut: 1,
          qmimiShites: qmimiShites,
          qmimiShitesMeShumic: qmimiShitesMeShumic,
          rabati1: rabati1,
        },
        authentikimi
      )
      .then(async () => {
        await axios
          .get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${idRegjistrimit}`,
            authentikimi
          )
          .then(async (r) => {
            await axios.put(
              `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${idRegjistrimit}`,
              {
                dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                stafiID: r.data.regjistrimet.stafiID,
                totaliPaTVSH: parseFloat(r.data.totaliPaTVSH),
                tvsh: parseFloat(r.data.tvsH8 + r.data.tvsH18),
                idPartneri: r.data.regjistrimet.idPartneri,
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

    setproduktiID(0);
    setInputValueBarkodi("");
    setSasia("");
    setSasiaNeStok(0);
    setSasiaShumices(0);
    setQmimiB(0);
    setQmimiSH(0);
    setQmimiShitesMePakic(0);
    setQmimiSH2(0);
    setRabati3(0);
    setQmimiShites(0);
    setInputValueBarkodi("");
    setInputValueProdukti("");
    setPerditesoFat(Date.now());
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
        document.getElementById("barkodi").focus();
      } else {
        setPerditeso(Date.now());
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
        await axios
          .get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${idRegjistrimit}`,
            authentikimi
          )
          .then(async (r) => {
            await axios.put(
              `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${idRegjistrimit}`,
              {
                dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                stafiID: r.data.regjistrimet.stafiID,
                totaliPaTVSH: parseFloat(r.data.totaliPaTVSH),
                tvsh: parseFloat(r.data.tvsH18 + r.data.tvsH8),
                idPartneri: r.data.regjistrimet.idPartneri,
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

    setPerditesoFat(Date.now());
  }

  

  async function handleEdit(id, index) {
    document.getElementById("sasia").focus();
     
    await axios
      .get(
        `https://localhost:7285/api/Faturat/ruajKalkulimin/getKalkulimi?idKalkulimit=${id}`,
        authentikimi
      )
      .then((p) => {
        console.log(p.data[0]);

        setEdito(true);
        setproduktiID(p.data[0].idProduktit);
        setInputValueBarkodi(p.data[0].barkodi);
        setInputValueProdukti(p.data[0].emriProduktit);
        setSasia(p.data[0].sasiaStokut);
        setSasiaShumices(p.data[0].sasiaShumices);
        setQmimiSH(p.data[0].qmimiShites);
        setQmimiSH2(p.data[0].qmimiShitesMeShumic);
        setRabati1(p.data[0].rabati1);
        setRabati2(p.data[0].rabati2);
        setRabati3(p.data[0].rabati3);
        setKalkEditID(p.data[0].id);
      });
  }

  async function handleEdito(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      await axios
        .put(
          `https://localhost:7285/api/Faturat/ruajKalkulimin/PerditesoTeDhenat?id=${kalkEditID}`,
          {
            sasiaStokut: sasia,
            qmimiShites: qmimiSH,
            qmimiShitesMeShumic: qmimiSH2,
            rabati1: rabati1,
          },
          authentikimi
        )
        .then(async () => {
          await axios
            .get(
              `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${idRegjistrimit}`,
              authentikimi
            )
            .then(async (r) => {
              await axios.put(
                `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${idRegjistrimit}`,
                {
                  dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                  stafiID: r.data.regjistrimet.stafiID,
                  totaliPaTVSH: parseFloat(r.data.totaliPaTVSH),
                  tvsh: parseFloat(r.data.tvsH18 + r.data.tvsH8),
                  idPartneri: r.data.regjistrimet.idPartneri,
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

      setproduktiID(0);
      setSasia("");
      setInputValueBarkodi("");
      setInputValueProdukti("");
      setQmimiSH(0);
      setSelectedOption(null);
      setEdito(false);
      setPerditesoFat(Date.now());
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItemsBarkodi.length > 0) {
        handleBarkodiChange(filteredItemsBarkodi[selectedIndexBarkodi]);
      }
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValueBarkodi(value);

    const filtered = produktet.filter(
      (item) =>
        item.emriProduktit.toLowerCase().includes(value) ||
        item.barkodi.toLowerCase().includes(value) ||
        item.kodiProduktit.toLowerCase().includes(value)
    );

    setFilteredItemsBarkodi(filtered);
  };

  function kontrolloQmimin(e) {
    setSasia(e.target.value);

    console.log(e.target);

    if (e.target.value % sasiaShumices === 0) {
      setQmimiSH(qmimiSH2);
    } else {
      setQmimiSH(qmimiSH);
    }
  }

  const currentDate = new Date().toLocaleDateString("en-GB", {
    dateStyle: "short",
  });

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Simulate setting an initial value for editing
    const initialSelectedOption = options.find(option => option.value === selectedOption);
    setSelectedOption(initialSelectedOption);
    document.getElementById("sasia").focus();
  }, [edito]);

  useEffect(() => {
    // Replace with your API endpoint
    axios
      .get("https://localhost:7285/api/Produkti/ProduktetPerKalkulim")
      .then((response) => {
        // Assuming the response data is an array of objects with `value` and `label` properties
        const fetchedOptions = response.data.map((item) => ({
          value: item.produktiID,
          label: item.barkodi,
          qmimiProduktit: item.qmimiProduktit,
          qmimiMeShumic: item.qmimiMeShumic,
          rabati: item.rabati,
        }));
        setOptions(fetchedOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected option:", selectedOption);

    await axios
      .post(
        "https://localhost:7285/api/Faturat/ruajKalkulimin/teDhenat",
        {
          idRegjistrimit: idRegjistrimit,
          idProduktit: selectedOption.value,
          sasiaStokut: 1,
          qmimiShites: selectedOption.qmimiProduktit,
          qmimiShitesMeShumic: selectedOption.qmimiMeShumic,
          rabati1: selectedOption.rabati,
        },
        authentikimi
      )
      .then(async () => {
        await axios
          .get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${idRegjistrimit}`,
            authentikimi
          )
          .then(async (r) => {
            await axios.put(
              `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${idRegjistrimit}`,
              {
                dataRegjistrimit: r.data.regjistrimet.dataRegjistrimit,
                stafiID: r.data.regjistrimet.stafiID,
                totaliPaTVSH: parseFloat(r.data.totaliPaTVSH),
                tvsh: parseFloat(r.data.tvsH8 + r.data.tvsH18),
                idPartneri: r.data.regjistrimet.idPartneri,
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

    setproduktiID(0);
    setInputValueBarkodi("");
    setSasia("");
    setSasiaNeStok(0);
    setSasiaShumices(0);
    setQmimiB(0);
    setQmimiSH(0);
    setQmimiShitesMePakic(0);
    setQmimiSH2(0);
    setRabati3(0);
    setQmimiShites(0);
    setInputValueBarkodi("");
    setInputValueProdukti("");
    setSelectedOption("");
    setPerditesoFat(Date.now());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("flavor-select-input").focus();
    }, 100);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [options, selectedOption]);

 

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
        {konfirmoBarkodin && (
          <Modal
            show={konfirmoBarkodin}
            onHide={() => setKonfirmoBarkodin(false)}>
            <Modal.Header closeButton>
              <Modal.Title as="h6">Konfirmo Prodouktin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong style={{ fontSize: "10pt" }}>
                Ky produkt eshte shtuar nje her! A jeni te sigurt qe deshironi
                ta shtoni prap?
              </strong>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setKonfirmoBarkodin(false)}>
                Jo <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                variant="warning"
                onClick={() =>
                  handleBarkodiChange(konifirmoProduktinLista[0].produktiID)
                }>
                Po <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Modal.Footer>
          </Modal>
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
            <h1 className="title">POS</h1>

            <Container fluid>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nr. Fatures</Form.Label>
                    <Form.Control
                      id="nrFatures"
                      type="number"
                      placeholder={nrFatures}
                      value={nrFatures}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                      id="qmimiShites"
                      type="text"
                      value={currentDate}
                      disabled
                    />
                  </Form.Group>
                  <br />
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Lloji i Pageses</Form.Label>
                    <select
                      id="llojiIPageses"
                      placeholder="LlojiIPageses"
                      className="form-select"
                      value={llojiPageses ? llojiPageses : 0}
                      onChange={(e) => {
                        setLlojiPageses(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        ndrroField(e, "statusiIPageses");
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
                      <option key={3} value="Borxh">
                        Borxh
                      </option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mt-1">
                    <Form.Label>Shuma Pageses</Form.Label>
                  </Form.Group>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="shumaPageses"
                      type="number"
                      placeholder={shumaPageses}
                      value={shumaPageses}
                      onChange={(e) => {
                        setShumaPageses(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        ndrroField(e, "rabati");
                      }}
                    />
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup>
                  <h5 className="mt-1">
                    <strong>Kusuri:</strong>{" "}
                    {parseFloat(shumaPageses - qmimiTotal).toFixed(2)} €
                  </h5>
                  <br />
                </Col>
                <Col>
                  <h1>{parseFloat(qmimiTotal).toFixed(2)} €</h1>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="idDheEmri">
                    <Form.Label>Barkodi</Form.Label>
                    <Form.Control
                      id="barkodi"
                      type="text"
                      className="form-control styled-input"
                      placeholder="Search"
                      value={inputValueBarkodi}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      disabled={edito}
                    />
                    <div className="container" style={{ position: "relative" }}>
                      <ul className="list-group mt-2 searchBoxi">
                        {filteredItemsBarkodi.map((item, index) => (
                          <li
                            key={item.produktiID}
                            className={`list-group-item${
                              selectedIndexBarkodi === index ? " active" : ""
                            }`}
                            onClick={() => handleBarkodiChange(item)}>
                            {item.barkodi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="idDheEmri">
                    <Form.Label>Barkodi</Form.Label>
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                      id="flavor-select" // Setting the id attribute
                      inputId="flavor-select-input" // Setting the input id attribute
                      isDisabled={edito}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="idDheEmri">
                    <Form.Label>Produkti</Form.Label>
                    <Form.Control
                      id="produkti"
                      type="text"
                      className="form-control styled-input"
                      placeholder="Search"
                      value={inputValuProdukti}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      onFocus={handleInputChange}
                      disabled={edito}
                    />

                    <div className="container" style={{ position: "relative" }}>
                      <ul className="list-group mt-2 searchBoxi">
                        {filteredItemsBarkodi.map((item, index) => (
                          <li
                            key={item.produktiID}
                            className={`list-group-item${
                              selectedIndexBarkodi === index ? " active" : ""
                            }`}
                            onClick={() => handleBarkodiChange(item)}>
                            {item.emriProduktit} - {item.barkodi} -{" "}
                            {item.kodiProduktit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={3}>
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
                        handleEdito(e);
                      }}
                      disabled={!edito}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
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
                    <th>Totali</th>
                    <th>Funksione</th>
                  </tr>
                </thead>
                <tbody>
                  {produktetNeKalkulim.map((p, index) => {
                    const qmimiMeTVSHRab = parseFloat(
                      p.qmimiShites -
                        p.qmimiShites * (p.rabati1 / 100) -
                        (p.qmimiShites - p.qmimiShites * (p.rabati1 / 100)) *
                          (p.rabati2 / 100) -
                        (p.qmimiShites -
                          p.qmimiShites * (p.rabati1 / 100) -
                          (p.qmimiShites - p.qmimiShites * (p.rabati1 / 100)) *
                            (p.rabati2 / 100)) *
                          (p.rabati3 / 100)
                    ).toFixed(3);
                    const ShumaToT = parseFloat(
                      qmimiMeTVSHRab * p.sasiaStokut
                    ).toFixed(3);

                    return (
                      p && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{p.emriProduktit}</td>
                          <td>{parseFloat(p.sasiaStokut).toFixed(2)}</td>
                          <td>{parseFloat(qmimiMeTVSHRab).toFixed(2)} €</td>
                          <td>{parseFloat(ShumaToT).toFixed(2)} €</td>
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
                                  setSelectedOption(p.id);
                                }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

export default POS;
