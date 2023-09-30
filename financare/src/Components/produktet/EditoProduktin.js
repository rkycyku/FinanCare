import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Col, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { MDBRow, MDBCol, MDBInput, MDBTooltip } from "mdb-react-ui-kit";
import useKeyboardNavigation from "../../Context/useKeyboardNavigation";

function EditoProduktin(props) {
  const [produkti, setProdukti] = useState([]);

  const [perditeso, setPerditeso] = useState("");
  const [produktet, setProduktet] = useState([]);
  const [grupetEProduktev, setGrupetEProduktev] = useState([]);
  const [partneret, setPartneret] = useState([]);
  const [njesitMatese, setNjesitMatese] = useState([]);
  const [kontrolloProduktin, setKontrolloProduktin] = useState(false);
  const [konfirmoProduktin, setKonfirmoProduktin] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const [inputGrupiProduktit, setInputGrupiProduktit] = useState('');
  const [inputPartneri, setInputPartneri] = useState('');
  const [inputNjesiaMatese, setInputNjesiaMatese] = useState('');
  const [filtrimiGrupiProduktit, setFiltrimiGrupiProduktit] = useState(produktet);
  const [filtrimiPartneri, setFiltrimiPartneri] = useState(partneret);
  const [filtrimiNjesiaMatese, setFiltrimiNjesiaMatese] = useState(njesitMatese);
  const grupiProduktitZgjedhur = useKeyboardNavigation(filtrimiGrupiProduktit);
  const partneriZgjedhur = useKeyboardNavigation(filtrimiPartneri);
  const njesiaMateseZgjedhur = useKeyboardNavigation(filtrimiNjesiaMatese);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const vendosTeDhenat = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/Produkti/Products`, authentikimi
        );
        const grupetEProduktev = await axios.get(
          `https://localhost:7285/api/GrupiProduktit/shfaqGrupetEProduktit`, authentikimi
        );
        const partneret = await axios.get(
          `https://localhost:7285/api/Partneri/shfaqPartneretFurntiore`, authentikimi
        );
        const njesitMatese = await axios.get(
          `https://localhost:7285/api/NjesiaMatese/shfaqNjesiteMatese`, authentikimi
        );
        setProduktet(produktet.data);
        setGrupetEProduktev(grupetEProduktev.data);
        setPartneret(partneret.data);
        setNjesitMatese(njesitMatese.data);

      } catch (err) {
        console.log(err);
      }
    };

    vendosTeDhenat();
  }, [perditeso]);

  useEffect(() => {
    const shfaqProduktin = async () => {
      try {
        const produkti = await axios.get(`https://localhost:7285/api/Produkti/` + props.id, authentikimi);
        setProdukti(produkti.data);
        setInputGrupiProduktit(produkti.data.grupiIProduktit);
        setInputPartneri(produkti.data.emriBiznesit);
        setInputNjesiaMatese(produkti.data.njesiaMatese1);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqProduktin();
  }, []);

  const onChange = (e) => {
    setProdukti({ ...produkti, [e.target.name]: e.target.value });
  };

  const perditesoProduktin = (e, kat) => {
    console.log(e, kat);
    if (kat === "GrupiProduktit") {
      setProdukti({ ...produkti, idgrupiProdukti: e.idGrupiProduktit });
      setInputGrupiProduktit(e.grupiIProduktit);
      setFiltrimiGrupiProduktit([]);
    }
    if (kat === "Partneri") {

      setProdukti({ ...produkti, idpartneri: e.idPartneri });
      setInputPartneri(e.emriBiznesit);
      setFiltrimiPartneri([]);

      axios.get(`https://localhost:7285/api/Produkti/GetKodiProduktitPerRegjistrim?idPartneri=${e.idpartneri}`, authentikimi)
        .then((response) => {
          setProdukti({ ...produkti, kodiProduktit: response.data });
          console.log(produkti)
        })
    }
    if (kat === "NjesiaMatese") {
      setProdukti({ ...produkti, idnjesiaMatese: e.idNjesiaMatese });
      setInputNjesiaMatese(e.njesiaMatese);
      setFiltrimiNjesiaMatese([]);
    }
  };

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  async function handleSubmit() {
    try {
      console.log(produkti)
      await axios.put(`https://localhost:7285/api/Produkti/` + props.id, produkti, authentikimi)
        .then(x => {

          props.setTipiMesazhit("success");
          props.setPershkrimiMesazhit("Produkti u Perditesua me sukses!")
          props.perditesoTeDhenat();
          props.hide();
          props.shfaqmesazhin();
        })
        .catch(error => {
          console.error('Error saving the product:', error);
          props.setTipiMesazhit("danger");
          props.setPershkrimiMesazhit("Ndodhi nje gabim gjate perditesimit te produktit!")
          props.perditesoTeDhenat();
          props.shfaqmesazhin();
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleKontrolli = () => {
    if (
      isNullOrEmpty(produkti.emriProduktit)
    ) {
      setFushatEZbrazura(true);
    } else {
      if (konfirmoProduktin == false && produktet.filter((item) => item.emriProduktit === produkti.emriProduktit).length !== 0) {
        setKontrolloProduktin(true);
      }
      else {
        handleSubmit();
      }
    }

  }

  const handleInputChange = (e, kat) => {
    const tekstiPerFiltrim = e.target.value.toLowerCase();

    if (kat === "GrupiProduktit") {
      setInputGrupiProduktit(tekstiPerFiltrim);

      const filtrimi = grupetEProduktev.filter((item) =>
        item.grupiIProduktit.toLowerCase().includes(tekstiPerFiltrim)
      );

      setFiltrimiGrupiProduktit(filtrimi);
    }
    if (kat === "Partneri") {
      setInputPartneri(tekstiPerFiltrim);

      console.log(partneret)

      const filtrimi = partneret.filter((item) =>
        item.emriBiznesit.toLowerCase().includes(tekstiPerFiltrim)
      );

      setFiltrimiPartneri(filtrimi);
    }
    if (kat === "NjesiaMatese") {
      setInputNjesiaMatese(tekstiPerFiltrim);

      const filtrimi = njesitMatese.filter((item) =>
        item.njesiaMatese.toLowerCase().includes(tekstiPerFiltrim)
      );

      setFiltrimiNjesiaMatese(filtrimi);
    }

  };

  const handleInputKeyDown = (e, kat) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (kat === "GrupiProduktit") {
        if (filtrimiGrupiProduktit.length > 0) {
          perditesoProduktin(filtrimiGrupiProduktit[grupiProduktitZgjedhur], kat);
        }

        ndrroField(e, "partneri")
      }
      if (kat === "Partneri") {
        if (filtrimiPartneri.length > 0) {
          perditesoProduktin(filtrimiPartneri[partneriZgjedhur], kat);
        }

        ndrroField(e, "njesiaMatese")
      }
      if (kat === "NjesiaMatese") {
        if (filtrimiNjesiaMatese.length > 0) {
          perditesoProduktin(filtrimiNjesiaMatese[njesiaMateseZgjedhur], kat);
        }

        ndrroField(e, "llojiTVSH")
      }
    }
  };

  const ndrroField = (e, tjetra) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById(tjetra).focus();
    }
  }

  return (
    <>
      {fushatEZbrazura &&
        <Modal size="sm" show={fushatEZbrazura} onHide={() => setFushatEZbrazura(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }} as="h6">Ndodhi nje gabim</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>Ju lutemi plotesoni te gjitha fushat me <span style={{ color: "red" }}>*</span></strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="secondary">
              Mbylle <FontAwesomeIcon icon={faXmark} />
            </Button >
          </Modal.Footer>

        </Modal>
      }
      {kontrolloProduktin &&
        <Modal size="sm" show={kontrolloProduktin} onHide={() => setKontrolloProduktin(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              Nje produkt me te njejtin emer ekziston ne sistem!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              A jeni te sigurt qe deshironi te vazhdoni?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setKontrolloProduktin(false)}>
              Korrigjo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => { handleSubmit(); }}
            >
              Vazhdoni
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto" style={{ marginTop: "3em" }} show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Edito Produktin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBRow className='g-3'>
            <MDBCol md="6" >
              <MDBInput
                onChange={onChange}
                value={produkti.barkodi}
                name="barkodi"
                id="barkodi"
                type="text"
                placeholder="Barkodi"
                autoFocus
                onKeyDown={(e) => ndrroField(e, "emriProduktit")}
                label={<span>Barkodi<span style={{ color: "red" }}>*</span></span>}
                autoComplete={false}
              />
            </MDBCol>
            <MDBCol md="6" >
              <MDBInput
                onChange={onChange}
                value={produkti.emriProduktit}
                name="emriProduktit"
                id="emriProduktit"
                type="text"
                placeholder="Emri Produktit"
                onKeyDown={(e) => ndrroField(e, "grupiproduktit")}
                label={<span>Emri Produktit<span style={{ color: "red" }}>*</span></span>}
                autoComplete={false}
              />
            </MDBCol>
            <Form.Group as={Col} controlId="grupiproduktit" md="4" >
              <Form.Control
                type="text"
                name="grupiproduktit"
                className="form-control styled-input"
                placeholder="Grupi i Produktit"
                value={inputGrupiProduktit}
                onChange={(e) => handleInputChange(e, "GrupiProduktit")}
                onKeyDown={(e) => handleInputKeyDown(e, "GrupiProduktit")}
                autoComplete={false}
              />

              <div className="container" style={{ position: 'relative' }}>
                <ul className="list-group mt-2 searchBoxi">
                  {filtrimiGrupiProduktit.map((item, index) => (
                    <li
                      key={item.idGrupiProduktit}
                      className={`list-group-item${grupiProduktitZgjedhur === index ? ' active' : ''}`}
                      onClick={() => perditesoProduktin(item, "GrupiProduktit")}
                    >
                      {item.grupiIProduktit}
                    </li>
                  ))}
                </ul>
              </div>
              <Form.Label>Grupi Produktit<span style={{ color: "red" }}>*</span></Form.Label>
            </Form.Group>

            <Form.Group as={Col} controlId="partneri" md="4" >
              <Form.Control
                type="text"
                className="form-control styled-input" 
                placeholder="Partneri"
                name="partneri"
                value={inputPartneri}
                onChange={(e) => handleInputChange(e, "Partneri")}
                onKeyDown={(e) => handleInputKeyDown(e, "Partneri")}
                autoComplete={false}
              />

              <div className="container" style={{ position: 'relative' }}>
                <ul className="list-group mt-2 searchBoxi">
                  {filtrimiPartneri.map((item, index) => (
                    <li
                      key={item.idpartneri}
                      className={`list-group-item${partneriZgjedhur === index ? ' active' : ''}`} // Add 'active' class to selected item
                      onClick={() => perditesoProduktin(item, "Partneri")} // Handle click event
                    >
                      {item.emriBiznesit}
                    </li>
                  ))}
                </ul>
              </div>

              <Form.Label>Partneri<span style={{ color: "red" }}>*</span></Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="njesiaMatese" md="4" >
              <Form.Control
                type="text"
                className="form-control styled-input" // Add 'styled-input' class
                placeholder="Njesia Matese"
                name="njesiaMatese"
                value={inputNjesiaMatese}
                onChange={(e) => handleInputChange(e, "NjesiaMatese")}
                onKeyDown={(e) => handleInputKeyDown(e, "NjesiaMatese")}
                autoComplete={false}
              />

              <div className="container" style={{ position: 'relative' }}>
                <ul className="list-group mt-2 searchBoxi">
                  {filtrimiNjesiaMatese.map((item, index) => (
                    <li
                      key={item.idNjesiaMatese}
                      className={`list-group-item${njesiaMateseZgjedhur === index ? ' active' : ''}`} // Add 'active' class to selected item
                      onClick={() => perditesoProduktin(item, "NjesiaMatese")} // Handle click event
                    >
                      {item.njesiaMatese}
                    </li>
                  ))}
                </ul>
              </div>

              <Form.Label>Njesia Matese<span style={{ color: "red" }}>*</span></Form.Label>
            </Form.Group>
            <MDBCol md="4" >
              <MDBInput
                onChange={onChange}
                value={produkti.llojiTVSH}
                name="llojiTVSH"
                id="llojiTVSH"
                type="number"
                placeholder="TVSH %"
                onKeyDown={(e) => ndrroField(e, "sasiaShumices")}
                label={<span>TVSH %<span style={{ color: "red" }}>*</span></span>}
                autoComplete={false}
              />
            </MDBCol>
            <MDBCol md="4" >
              <MDBInput
                onChange={onChange}
                name="sasiaShumices"
                id="sasiaShumices"
                value={produkti.sasiaShumices}
                type="text"
                placeholder="Sasia e Shumices"
                label={<span>Sasia e Shumices<span style={{ color: "red" }}>*</span></span>}
                autoComplete={false}
              />
            </MDBCol>
            <MDBCol md="4" id="kodiProduktit">
              <MDBTooltip
                placement="bottom"
                title="Gjenerohet automatikisht pas zgjedhjes se partnerit"
                wrapperClass="mdb-tooltip mdb-tooltip-content"
              >
                <MDBInput
                  onChange={onChange}
                  value={produkti.kodiProduktit}
                  name="kodiProduktit"
                  type="text"
                  placeholder="Kodi Produktit"
                  onKeyDown={(e) => ndrroField(e, "llojiTVSH")}
                  label={<span>Kodi Produktit<span style={{ color: "red" }}>*</span></span>}
                  disabled
                />
              </MDBTooltip>
            </MDBCol>
          </MDBRow>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            style={{ backgroundColor: "#009879", border: "none" }}
            onClick={handleKontrolli}
          >
            Edito Produktin <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditoProduktin;