import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import "../../Styles/ProductTables.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import ShtoProduktin from "../../../Components/Materiali/Artikujt/Produktet/ShtoProduktin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPenToSquare,
  faPlus,
  faXmark,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import EditoProduktin from "../../../Components/Materiali/Artikujt/Produktet/EditoProduktin";
import Modal from "react-bootstrap/Modal";
import { TailSpin } from "react-loader-spinner";
import ZbritjetEProduktit from "./ZbritjetEProduktit";
import TabelaEKategorive from "./NjesiaMatese";
import TabelaEKompanive from "../../Gjenerale/Partneret/TabelaEPartnereve";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Tabela from "../../../Components/TeTjera/Tabela/Tabela";

const ProductTables = () => {
  const [produkti, setProdukti] = useState([]);
  const [id, setId] = useState();
  const [perditeso, setPerditeso] = useState("");
  const [show, setShow] = useState(false);
  const [edito, setEdito] = useState(false);
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const shfaqProduktet = async () => {
      try {
        setLoading(true);
        const produkti = await axios.get(
          "https://localhost:7285/api/Produkti/Products",
          authentikimi
        );
        console.log(produkti.data);
        setProdukti(
          produkti.data.map((k) => ({
            ID: k.produktiID,
            "Barkodi / Kodi Produktit": k.barkodi + " / " + k.kodiProduktit,
            "Emri i Produktit": k.emriProduktit,
            Partneri: k.emriBiznesit,
            "Njesia Matese": k.emriNjesiaMatese,
            "Grupi i Produktit": k.grupiIProduktit,
            "Lloji TVSH %": k.llojiTVSH,
            "Qmimi i Produktit Me Pakic €":
              parseFloat(k.qmimiProduktit)?.toFixed(2) ?? 0,
            "Qmimi i Produktit Me Shumic €":
              parseFloat(k.qmimiMeShumic)?.toFixed(2) ?? 0,
            "Sasia e Shumices": k.sasiaShumices,
          }))
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    shfaqProduktet();
  }, [perditeso]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleEdito = (id) => {
    setId(id);
    setEdito(true);
  };

  const [showD, setShowD] = useState(false);

  const handleCloseD = () => setShowD(false);
  const handleShowD = (id) => {
    setShowD(true);
  };

  const handleEditoMbyll = () => setEdito(false);

  async function handleDelete() {
    try {
      await axios.delete(
        `https://localhost:7285/api/Produkti/` + id,
        authentikimi
      );
      setTipiMesazhit("success");
      setPershkrimiMesazhit("Produkti u fshi me sukses!");
      setPerditeso(Date.now());
      setShfaqMesazhin(true);
      setShowD(false);
    } catch (err) {
      console.error(err);
      setTipiMesazhit("danger");
      setPershkrimiMesazhit("Ndodhi nje gabim gjate fshirjes se produkti!");
      setPerditeso(Date.now());
      setShfaqMesazhin(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Tech Store</title>
      </Helmet>
      <NavBar />

      <div className="containerDashboardP">
        {show && (
          <ShtoProduktin
            show={handleShow}
            hide={handleClose}
            shfaqmesazhin={() => setShfaqMesazhin(true)}
            perditesoTeDhenat={() => setPerditeso(Date.now())}
            setTipiMesazhit={setTipiMesazhit}
            setPershkrimiMesazhit={setPershkrimiMesazhit}
          />
        )}
        {shfaqMesazhin && (
          <Mesazhi
            setShfaqMesazhin={setShfaqMesazhin}
            pershkrimi={pershkrimiMesazhit}
            tipi={tipiMesazhit}
          />
        )}
        {edito && (
          <EditoProduktin
            show={handleShow}
            hide={handleEditoMbyll}
            id={id}
            shfaqmesazhin={() => setShfaqMesazhin(true)}
            perditesoTeDhenat={() => setPerditeso(Date.now())}
            setTipiMesazhit={setTipiMesazhit}
            setPershkrimiMesazhit={setPershkrimiMesazhit}
          />
        )}
        <Modal show={showD} onHide={handleCloseD}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Largo Produktin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>A jeni te sigurt qe deshironi ta fshini kete produkt?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseD}>
              Anulo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Largo Produktin <FontAwesomeIcon icon={faBan} />
            </Button>
          </Modal.Footer>
        </Modal>
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
            <div className="mt-2">
              <Tabela
                data={produkti}
                tableName="Tabela e Produkteve"
                kaButona={true}
                funksionButonShto={handleShow}
                funksionButonEdit={(e) => {
                  setId(e);
                  handleEdito(e);
                }}
                funksionButonFshij={(e) => {
                  setId(e);
                  handleShowD(e);
                }}
                mosShfaqID={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductTables;
