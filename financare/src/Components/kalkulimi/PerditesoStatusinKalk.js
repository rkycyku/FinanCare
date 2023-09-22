import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";


function PerditesoStatusinKalk(props) {
  const [kalkulimet, setKalkulimet] = useState([]);
  const [kalkulimetEFiltruara, setKalkulimetEFiltruara] = useState([]);

  const [emriBiznesit, setEmriBiznesit] = useState("");
  const [nrFatures, setNrFatures] = useState("");
  const [nrKalkulimit, setNrKalkulimit] = useState("");
  const [dataFatures, setDataFatures] = useState("");
  const [llojiFatures, setLlojiFatures] = useState("");

  const [perditeso, setPerditeso] = useState("");
  const [produktet, setProduktet] = useState([]);
  const [kontrolloProduktin, setKontrolloProduktin] = useState(false);

  useEffect(() => {
    const vendosProduktet = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/Produkti/Products`, authentikimi
        );
        setProduktet(produktet.data);

      } catch (err) {
        console.log(err);
      }
    };

    vendosProduktet();
  }, [perditeso]);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const shfaqKalkulimet = async () => {
      try {
        const kalkulimet = await axios.get(`https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimet`, authentikimi);
        setKalkulimet(kalkulimet.data);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqKalkulimet();
  }, [perditeso]);

  async function ndryshoStatusinKalkulimit() {
    try {
      await axios.put(`https://localhost:7285/api/KalkulimiImallit/ruajKalkulimin/perditesoStatusinKalkulimit?id=${nrKalkulimit}&statusi=false`
        , {}, authentikimi).then(() => {
          setKontrolloProduktin(false);
          setPerditeso(Date.now());
        })

      await axios.get(`https://localhost:7285/api/KalkulimiImallit/shfaqTeDhenatKalkulimit?idRegjistrimit=${nrKalkulimit}`
        , authentikimi).then(async (teDhenat) => {
          console.log(teDhenat);

          for (let p of teDhenat.data) {
            await axios.get(`https://localhost:7285/api/KalkulimiImallit/fshijKalkulimin/perditesoStokunQmimin?idKalkulimi=${p.idRegjistrimit}&idProdukti=${p.idProduktit}&idTeDhenatKalkulimit=${p.id}`, authentikimi);
          }
        });
    } catch (error) {
      console.error(error)
    }
  }

  async function fshijKalkulimin(){

  }

  function detajetRiKonfrimitKalkulimit(emriBiznesit, nrFatures, nrKalkulimit, dataFatures, llojiFatures) {
    setEmriBiznesit(emriBiznesit);
    setNrFatures(nrFatures);
    setNrKalkulimit(nrKalkulimit);
    setDataFatures(dataFatures);
    setLlojiFatures(llojiFatures);

    setKontrolloProduktin(true);
  }

  function filtroKalkulimet(lloji) {
    if (lloji === "hapKalkulimet") {
      const filteredKalkulimet = kalkulimet.filter((k) => k.statusiKalkulimit === "true");
      setKalkulimetEFiltruara(filteredKalkulimet);
    }
    if (lloji === "fshijKalkulimet") {
      const filteredKalkulimet = kalkulimet.filter((k) => k.statusiKalkulimit === "false");
      setKalkulimetEFiltruara(filteredKalkulimet);
    }
  }

  return (
    <>
      {kontrolloProduktin &&
        <Modal show={kontrolloProduktin} style={{ marginTop: "7em" }} onHide={() => setKontrolloProduktin(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Konfirmo Hapjen e Kalkulimit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>
              A jeni te sigurt qe deshironi ta hapni kete kalkulim?
            </strong>
            <hr />
            <span style={{ fontSize: "10pt" }}>
              <strong>Nr. Kalkulimit:</strong> {nrKalkulimit}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Partneri:</strong> {emriBiznesit}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Nr. Fatures:</strong> {nrFatures}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Data Fatures: </strong>{new Date(dataFatures).toLocaleDateString('en-GB', { dateStyle: 'short' })}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Lloji Fatures:</strong> {llojiFatures}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setKontrolloProduktin(false)}>
              Anulo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              onClick={() => { ndryshoStatusinKalkulimit(); }}
            >
              Konfirmo <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal size="lg" style={{ marginTop: "3em" }} show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{kalkulimetEFiltruara.length === 0 ? "Lista e Kalkulimeve" :
            kalkulimet.filter((k) => k.statusiKalkulimit === "true").length === kalkulimetEFiltruara.length ?
              "Lista e Kalkulimeve te Mbyllura" : "Lista e Kalkulimeve te Hapura"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            style={{ marginRight: "0.5em" }}
            variant="success"
            size="sm"
            onClick={() => {
              filtroKalkulimet("hapKalkulimet");
            }}
          >Hap Kalkulimet <FontAwesomeIcon icon={faPenToSquare} /></Button>
          <Button
            style={{ marginRight: "0.5em" }}
            variant="success"
            size="sm"
            onClick={() => {
              filtroKalkulimet("fshijKalkulimet");
            }}
          >Fshij Kalkulimet <FontAwesomeIcon icon={faPenToSquare} /></Button>
          <Button
            style={{ marginRight: "0.5em" }}
            variant="success"
            size="sm"
            onClick={() => {
              setKalkulimetEFiltruara([])
            }}
          >Te gjitha Kalkulimet <FontAwesomeIcon icon={faPenToSquare} /></Button>
          <MDBTable small>
            <MDBTableHead>
              <tr>
                {kalkulimetEFiltruara.length > 0 &&
                  <th scope="col">Nr. Kalkulimit</th>}
                {kalkulimetEFiltruara.length === 0 &&
                  <th scope="col">Nr.</th>
                }
                <th scope="col">Nr. Fatures</th>
                <th scope="col">Partneri</th>
                <th scope="col">Totali Pa TVSH €</th>
                <th scope="col">TVSH €</th>
                <th scope="col">Data e Fatures</th>
                <th scope="col">Lloji Fatures</th>
                {kalkulimetEFiltruara.length === 0 &&
                  <th scope="col">Statusi</th>
                }
                {kalkulimetEFiltruara.length > 0 &&
                  < th scope="col" > Funksione</th>}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {kalkulimetEFiltruara && kalkulimetEFiltruara.map((k) => (
                <tr key={k.idRegjistrimit}>
                  <td>{k.idRegjistrimit}</td>
                  <td>{k.nrFatures}</td>
                  <td>{k.emriBiznesit}</td>
                  <td>{k.totaliPaTvsh.toFixed(2)} €</td>
                  <td>{k.tvsh.toFixed(2)} €</td>
                  <td >{new Date(k.dataRegjistrimit).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                  <td>{k.llojiKalkulimit}</td>
                  <td >
                    {
                      kalkulimet.filter((k) => k.statusiKalkulimit === "true").length === kalkulimetEFiltruara.length ?
                        <Button
                          style={{ marginRight: "0.5em" }}
                          variant="success"
                          size="sm"
                          onClick={() => {
                            detajetRiKonfrimitKalkulimit(k.emriBiznesit, k.nrFatures, k.idRegjistrimit, k.dataRegjistrimit, k.llojiKalkulimit)
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} /></Button>
                        :
                        <Button
                          style={{ marginRight: "0.5em" }}
                          variant="success"
                          size="sm"
                          onClick={() => {
                            detajetRiKonfrimitKalkulimit(k.emriBiznesit, k.nrFatures, k.idRegjistrimit, k.dataRegjistrimit, k.llojiKalkulimit)
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} /></Button>
                    }

                  </td>
                </tr>
              ))}
              {kalkulimetEFiltruara.length === 0 && kalkulimet.map((k) => (
                <tr key={k.idRegjistrimit}>
                  <td>{k.idRegjistrimit}</td>
                  <td>{k.nrFatures}</td>
                  <td>{k.emriBiznesit}</td>
                  <td>{k.totaliPaTvsh.toFixed(2)} €</td>
                  <td>{k.tvsh.toFixed(2)} €</td>
                  <td >{new Date(k.dataRegjistrimit).toLocaleDateString('en-GB', { dateStyle: 'short' })}</td>
                  <td>{k.llojiKalkulimit}</td>
                  <td>{k.statusiKalkulimit === "true" ? "M" : "H"}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </Modal.Body>
      </Modal >
    </>
  )
}

export default PerditesoStatusinKalk;