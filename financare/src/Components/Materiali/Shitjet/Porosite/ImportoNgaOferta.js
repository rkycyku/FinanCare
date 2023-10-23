import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faXmark,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

function PerditesoStatusinKalk(props) {
  const [kalkulimet, setKalkulimet] = useState([]);
  const [detajetRegjistrimi, setDetajetRegjistrimit] = useState([]);
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);

  const [emriBiznesit, setEmriBiznesit] = useState("");
  const [nrFatures, setNrFatures] = useState("");
  const [referenti, setReferenti] = useState("");
  const [dataFatures, setDataFatures] = useState("");
  const [idPartneri, setIdPartneri] = useState("");

  const [idRegjistrimit, setIdRegjistrimit] = useState(0);

  const [perditeso, setPerditeso] = useState("");
  const [produktet, setProduktet] = useState([]);
  const [importoOfertenKonfirmimi, setImportoOfertenKonfirmimi] =
    useState(false);

  const [produktetPerFletLejim, setProduktetPerFletLejim] = useState([]);
  const [kaFletLejim, setKaFleteLejim] = useState(false);
  const [krijoFletLejimin, setKrijoFleteLejimin] = useState(false);

  const [nrRendorKalkulimit, setNrRendorKalkulimit] = useState(0);

  const [teDhenat, setTeDhenat] = useState([]);

  const [ePara, setEPara] = useState(true);

  const getToken = localStorage.getItem("token");

  const getID = localStorage.getItem("id");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  const dataPorosise = new Date(
    detajetRegjistrimi &&
      detajetRegjistrimi.regjistrimet &&
      detajetRegjistrimi.regjistrimet.dataRegjistrimit
  );
  const dita = dataPorosise.getDate().toString().padStart(2, "0");
  const muaji = (dataPorosise.getMonth() + 1).toString().padStart(2, "0");
  const viti = dataPorosise.getFullYear().toString().slice(-2);

  const barkodi = `${
    teDhenatBiznesit && teDhenatBiznesit.shkurtesaEmritBiznesit
  }-${dita}${muaji}${viti}-${"OFERTE"}-${nrFatures}`;

  useEffect(() => {
    if (getID) {
      const vendosTeDhenat = async () => {
        try {
          const perdoruesi = await axios.get(
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`,
            authentikimi
          );
          const regjistrimi = await axios.get(
            `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${props.nrRendorKalkulimit}`,
            authentikimi
          );
          const teDhenat = await axios.get(
            "https://localhost:7285/api/TeDhenatBiznesit/ShfaqTeDhenat",
            authentikimi
          );
          setTeDhenatBiznesit(teDhenat.data);
          setTeDhenat(perdoruesi.data);
          setDetajetRegjistrimit(regjistrimi.data);
        } catch (err) {
          console.log(err);
        }
      };

      vendosTeDhenat();
    }
  }, [perditeso]);

  useEffect(() => {
    const vendosProduktet = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/Produkti/Products`,
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
    const shfaqKalkulimet = async () => {
      try {
        const kalkulimet = await axios.get(
          `https://localhost:7285/api/Faturat/shfaqRegjistrimet`,
          authentikimi
        );
        const ofertat = kalkulimet.data.filter(
          (item) => item.llojiKalkulimit === "OFERTE"
        );
        const ofertatPerPartnerin = ofertat.filter(
          (item) => item.idpartneri === props.partneri
        );
        setKalkulimet(ofertatPerPartnerin);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqKalkulimet();
  }, [perditeso, importoOfertenKonfirmimi]);

  async function importoOferte(idRegjistrimit) {
    const kalkulimi = await axios.get(
      `https://localhost:7285/api/Faturat/shfaqTeDhenatKalkulimit?idRegjistrimit=${idRegjistrimit}`,
      authentikimi
    );

    await axios.delete(
      `https://localhost:7285/api/Faturat/ruajKalkulimin/FshijTeDhenatNgaIdKalkulimit?idKalkulimi=${props.nrRendorKalkulimit}`,
      authentikimi
    );

    await axios.put(
      `https://localhost:7285/api/Faturat/perditesoFaturen?idKalulimit=${props.nrRendorKalkulimit}`,
      {
        dataRegjistrimit: detajetRegjistrimi.regjistrimet.dataRegjistrimit,
        stafiId: detajetRegjistrimi.regjistrimet.stafiId,
        totaliPaTvsh: parseFloat(detajetRegjistrimi.totaliPaTVSH),
        tvsh: parseFloat(detajetRegjistrimi.tvsH18 + detajetRegjistrimi.tvsH8),
        idpartneri: detajetRegjistrimi.regjistrimet.idpartneri,
        statusiPageses: "Pa Paguar",
        llojiPageses: detajetRegjistrimi.regjistrimet.llojiPageses,
        llojiKalkulimit: detajetRegjistrimi.regjistrimet.llojiKalkulimit,
        nrFatures: detajetRegjistrimi.regjistrimet.nrFatures,
        statusiKalkulimit: detajetRegjistrimi.regjistrimet.statusiKalkulimit,
        pershkrimShtese:
          detajetRegjistrimi.regjistrimet.pershkrimShtese +
          " Referenti: " +
          detajetRegjistrimi.regjistrimet.username +
          ", Nr. Ofertes: " +
          barkodi,
        rabati: parseFloat(detajetRegjistrimi.rabati),
        nrRendorFatures: detajetRegjistrimi.regjistrimet.nrRendorFatures,
      },
      authentikimi
    );

    console.log(detajetRegjistrimi.regjistrimet);

    for (let produktet of kalkulimi.data) {
      await axios
        .post(
          `https://localhost:7285/api/Faturat/ruajKalkulimin/teDhenat`,
          {
            idRegjistrimit: props.nrRendorKalkulimit,
            idProduktit: produktet.idProduktit,
            qmimiBleres: produktet.qmimiBleres,
            qmimiShites: produktet.qmimiShites,
            sasiaStokut: produktet.sasiaStokut,
            qmimiShitesMeShumic: produktet.qmimiShitesMeShumic,
            rabati1: produktet.rabati1,
            rabati2: produktet.rabati2,
            rabati3: produktet.rabati3,
          },
          authentikimi
        )
        .then(() => {
          props.setPerditeso();
          if (produktet.sasiaStokut > produktet.sasiaAktualeNeStok) {
            setProduktetPerFletLejim((prev) => {
              return [...prev, produktet];
            });
            setKaFleteLejim(true);
          }
        });
    }

    setImportoOfertenKonfirmimi(false);
    setEPara(false);
  }

  useEffect(() => {
    if (!ePara) {
      kontrolloFletLejimin();
    }
  }, [kaFletLejim, ePara]);

  function kontrolloFletLejimin() {
    console.log('"a');
    if (kaFletLejim) {
      setImportoOfertenKonfirmimi(false);
      setKrijoFleteLejimin(true);
    } else {
      props.setPerditeso();
      props.hide();
      props.setShfaqMesazhin(true);
      props.setPershkrimiMesazhit("Oferta u importua me Sukses!");
      props.setTipiMesazhit("success");
    }
  }

  useEffect(() => {
    const vendosNrFaturesMeRradhe = async () => {
      try {
        const nrFat = await axios.get(
          `https://localhost:7285/api/Faturat/getNumriFaturesMeRradhe?llojiKalkulimit=FL`,
          authentikimi
        );
        setNrRendorKalkulimit(parseInt(nrFat.data));
      } catch (err) {
        console.log(err);
      }
    };

    vendosNrFaturesMeRradhe();
  }, [perditeso]);

  async function krijoFleteLejimin() {
    await axios
      .post(
        "https://localhost:7285/api/Faturat/ruajKalkulimin",
        {
          stafiId: teDhenat.perdoruesi.userId,
          totaliPaTvsh: 0,
          tvsh: 0,
          idpartneri: idPartneri,
          nrFatures: parseInt(nrRendorKalkulimit + 1).toString(),
          llojiKalkulimit: "FL",
          pershkrimShtese: "Flete Lejimi per munges malli",
          nrRendorFatures: nrRendorKalkulimit + 1,
        },
        authentikimi
      )
      .then(async (response) => {
        if (response.status === 200 || response.status === 201) {
          setPerditeso(Date.now());
          for (let produktet of produktetPerFletLejim) {
            await axios
              .post(
                `https://localhost:7285/api/Faturat/ruajKalkulimin/teDhenat`,
                {
                  idRegjistrimit: response.data.idRegjistrimit,
                  idProduktit: produktet.idProduktit,
                  qmimiBleres: produktet.qmimiBleres,
                  qmimiShites: -produktet.qmimiShites,
                  sasiaStokut: produktet.sasiaStokut,
                  qmimiShitesMeShumic: produktet.qmimiShitesMeShumic,
                  rabati1: produktet.rabati1,
                  rabati2: produktet.rabati2,
                  rabati3: produktet.rabati3,
                },
                authentikimi
              )
              .then(() => {});
          }
        } else {
          console.log("gabim");
          setPerditeso(Date.now());
        }
      })
      .finally(() => {
        props.setPerditeso();
        setKrijoFleteLejimin(false);
        props.hide();
        props.setShfaqMesazhin(true);
        props.setPershkrimiMesazhit(
          "Oferta u importua me Sukses & Flete Lejimi u Krijua me Sukses!"
        );
        props.setTipiMesazhit("success");
      });
  }

  function mbyllKrijoFletLejimin() {
    props.setPerditeso();
    setKrijoFleteLejimin(false);
    props.hide();
    props.setShfaqMesazhin(true);
    props.setPershkrimiMesazhit(
      "Oferta u importua me Sukses ndersa Flete Lejimi u anulua!"
    );
    props.setTipiMesazhit("success");
  }

  return (
    <>
      {importoOfertenKonfirmimi && (
        <Modal
          show={importoOfertenKonfirmimi}
          style={{ marginTop: "7em" }}
          onHide={() => setImportoOfertenKonfirmimi(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Konfirmo Importimin e Ofertes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>
              A jeni te sigurt qe deshironi ta importoni kete Oferte?
            </strong>
            <hr />
            <span style={{ fontSize: "10pt" }}>
              <strong>Partneri:</strong> {emriBiznesit}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Nr. Ofertes:</strong> {nrFatures}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Referenti: </strong> {referenti}
            </span>
            <br />
            <span style={{ fontSize: "10pt" }}>
              <strong>Data Ofertes: </strong>
              {new Date(dataFatures).toLocaleDateString("en-GB", {
                dateStyle: "short",
              })}
            </span>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setImportoOfertenKonfirmimi(false)}>
              Anulo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                importoOferte(idRegjistrimit);
              }}>
              Konfirmo <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {krijoFletLejimin && (
        <Modal
          show={krijoFletLejimin}
          style={{ marginTop: "7em" }}
          onHide={() => setKrijoFleteLejimin(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Krijoni Flete Lejimin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>
              Disa nga produktet jane jashte stokut. A deshironi te krijoni
              fletelejimin?
            </strong>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              Ne rast se e anuloni, Flete Lejimi duhet te punohet manualisht!
            </strong>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => mbyllKrijoFletLejimin()}>
              Anulo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                krijoFleteLejimin();
              }}>
              Konfirmo <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal
        size="lg"
        style={{ marginTop: "3em" }}
        show={props.show}
        onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Lista e Ofertave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTable small>
            <MDBTableHead>
              <tr>
                <th scope="col">Nr. Ofertes</th>
                <th scope="col">Partneri</th>
                <th scope="col">Komercialisti</th>
                <th scope="col">Data e Fatures</th>
                <th scope="col"> Funksione</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {kalkulimet.map((k) => (
                <tr key={k.idRegjistrimit}>
                  <td>{k.nrFatures}</td>
                  <td>{k.emriBiznesit}</td>
                  <td>{k.username}</td>
                  <td>
                    {new Date(k.dataRegjistrimit).toLocaleDateString("en-GB", {
                      dateStyle: "short",
                    })}
                  </td>
                  <td>
                    <Button
                      style={{ marginRight: "0.5em" }}
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setIdRegjistrimit(k.idRegjistrimit);
                        setIdPartneri(k.idpartneri);
                        setNrFatures(k.nrFatures);
                        setEmriBiznesit(k.emriBiznesit);
                        setReferenti(k.username);
                        setDataFatures(k.dataRegjistrimit);
                        setImportoOfertenKonfirmimi(true);
                      }}>
                      <FontAwesomeIcon icon={faFileImport} />
                    </Button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PerditesoStatusinKalk;
