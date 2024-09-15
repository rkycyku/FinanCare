import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal, Row, Col, InputGroup, Tabs, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

function EditoPerdorues(props) {
  const [perdoruesi, setPerdoruesi] = useState(null);
  const [rolet, setRolet] = useState([]);


  const [key, setKey] = useState("kryesore");

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const fetchPerdoruesi = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${props.id}`,
          authentikimi
        );
        setPerdoruesi(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRolet = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7285/api/Authenticate/shfaqRolet`,
          authentikimi
        );
        setRolet(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPerdoruesi();
    fetchRolet();
  }, [props.id]);

  const handleChange = (field, value) => {
    setPerdoruesi((prev) => ({
      ...prev,
      teDhenatPerdoruesit: {
        ...prev.teDhenatPerdoruesit,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://localhost:7285/api/Perdoruesi/update`,
        perdoruesi,
        authentikimi
      );
      props.perditesoTeDhenat();
      props.largo();
      props.setTipiMesazhit("success");
      props.setPershkrimiMesazhit("Aksesi i perdoruesit u perditesua!");
      props.shfaqmesazhin();
    } catch (error) {
      props.perditesoTeDhenat();
      props.largo();
      props.setTipiMesazhit("danger");
      props.setPershkrimiMesazhit("Ndodhi nje gabim gjate perditesimit te aksesit!");
      props.shfaqmesazhin();
    }
  };

  if (!perdoruesi) return <div>Loading...</div>;

  return (
    <Modal size="lg" className="modalEditShto" show={true} onHide={() => props.largo()}>
      <Modal.Header closeButton>
        <Modal.Title>Edito Perdoruesin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="shenime-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="kryesore" title="Shënimet Kryesore">
            <Form>
              <Form.Group className="mb-3" controlId="emriBiznesit">
                <Row>
                  <Col>
                    <Form.Label>Emri</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.emri}
                      onChange={(e) => handleChange('emri', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Mbiemri</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.mbiemri}
                      onChange={(e) => handleChange('mbiemri', e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="adresa">
                <Row>
                  <Col>
                    <Form.Label>Data e fillimit te kontrates</Form.Label>
                    <DatePicker
                      selected={new Date(perdoruesi?.perdoruesi?.teDhenatPerdoruesit.dataFillimitKontrates)}
                      onChange={(date) => handleChange('dataFillimitKontrates', date.toISOString())}
                      dateFormat="dd/MM/yyyy"
                      className="custom-datepicker"
                      popperClassName="custom-datepicker-popper"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Data e mbarimit te kontrates</Form.Label>
                    <DatePicker
                      selected={new Date(perdoruesi?.perdoruesi?.teDhenatPerdoruesit.dataMbarimitKontrates)}
                      onChange={(date) => handleChange('dataMbarimitKontrates', date.toISOString())}
                      dateFormat="dd/MM/yyyy"
                      className="custom-datepicker"
                      popperClassName="custom-datepicker-popper"
                      minDate={new Date(perdoruesi?.perdoruesi?.teDhenatPerdoruesit.dataFillimitKontrates)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="adresa">
                <Row>
                  <Col>
                    <Form.Label>Nr. Leternjoftimit</Form.Label>
                    <Form.Control
                      type="number"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.nrPersonal}
                      onChange={(e) => handleChange('nrPersonal', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Paga Bruto</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.paga}
                        onChange={(e) => handleChange('paga', e.target.value)}
                      />
                      <InputGroup.Text id="basic-addon2">€</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="ndihmese" title="Shënimet Ndihmëse">
            <Form>
              <Form.Group className="mb-3" controlId="nui">
                <Row>
                  <Col>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.adresa}
                      onChange={(e) => handleChange('adresa', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Datelindja</Form.Label>
                    <DatePicker
                      selected={new Date(perdoruesi?.perdoruesi?.teDhenatPerdoruesit.datelindja)}
                      onChange={(date) => handleChange('datelindja', date.toISOString())}
                      dateFormat="dd/MM/yyyy"
                      className="custom-datepicker"
                      popperClassName="custom-datepicker-popper"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="nui">
                <Row>
                  <Col>
                    <Form.Label>Nr. Kontaktit</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.nrKontaktit}
                      onChange={(e) => handleChange('nrKontaktit', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Email Privat</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.emailPrivat}
                      onChange={(e) => handleChange('emailPrivat', e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" controlId="nui">
                <Row>
                  <Col>
                    <Form.Label>Profesioni</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.profesioni}
                      onChange={(e) => handleChange('profesioni', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Specializimi</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.specializimi}
                      onChange={(e) => handleChange('specializimi', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Kualifikimi</Form.Label>
                    <Form.Control
                      type="text"
                      value={perdoruesi?.perdoruesi?.teDhenatPerdoruesit.kualifikimi}
                      onChange={(e) => handleChange('kualifikimi', e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.largo()}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditoPerdorues;
