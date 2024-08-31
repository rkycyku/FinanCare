import NavBar from "../../../Components/TeTjera/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ProduktiNeZbritje from "../../../Components/Materiali/Artikujt/Zbritjet/ProduktiNeZbritje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import Mesazhi from "../../../Components/TeTjera/layout/Mesazhi";
import FshijZbritjen from "../../../Components/Materiali/Artikujt/Zbritjet/FshijZbritjen";
import { Link } from "react-router-dom";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import Tabela from "../../../Components/TeTjera/Tabela/Tabela";

function ZbritjetEProduktit(props) {
  const [zbritjet, setZbritjet] = useState([]);
  const [perditeso, setPerditeso] = useState("");
  const [shtoZbritjen, setShtoZbritjen] = useState(false);
  const [mbyllFature, setMbyllFaturen] = useState(true);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [fshij, setFshij] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState("");
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const shfaqZbritjet = async () => {
      try {
        setLoading(true);
        const zbritja = await axios.get(
          "https://localhost:7285/api/ZbritjaQmimitProduktit/shfaqZbritjet",
          authentikimi
        );

        console.log(zbritja.data);

        setZbritjet(
          zbritja.data.map((k, index) => ({
            ID: k.produktiID,
            "Nr. Zbritjes": index + 1,
            "Emri Produktit": k.emriProduktit,
            "Qmimi €": parseFloat(k.qmimiProduktit).toFixed(3),
            "Rabati %": parseFloat(k.rabati).toFixed(2),
            "Qmimi - Rab €": parseFloat(
              k.qmimiProduktit - (k.rabati / 100) * k.qmimiProduktit
            ).toFixed(3),
            "Rabati €": parseFloat((k.rabati / 100) * k.qmimiProduktit).toFixed(
              3
            ),
            "Data e Zbritjes": new Date(k.dataZbritjes).toISOString(),
            "Data e Skadimit": new Date(k.dataSkadimit).toISOString(),
          }))
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    shfaqZbritjet();
  }, [perditeso]);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    zbritjet.forEach((zbritja) => {
      const dataSkadimit = new Date(zbritja.dataSkadimit);
      if (dataSkadimit < currentDate) {
        fshijZbritjen(zbritja.produktiID);
      }
      console.log(zbritja);
      console.log(dataSkadimit);
      console.log(currentDate);
    });
  }, [zbritjet]);

  const fshijZbritjen = (id) => {
    axios.delete(
      `https://localhost:7285/api/ZbritjaQmimitProduktit/fshijZbritjenProduktit?id=${id}`,
      authentikimi
    );
    setPerditeso(Date.now());
  };

  const handleFshij = (id) => {
    setFshij(true);
    setId(id);
  };
  const handleFshijMbyll = () => setFshij(false);

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
        {fshij && (
          <FshijZbritjen
            largo={handleFshijMbyll}
            fshijZbritjen={() => fshijZbritjen(id)}
            shfaqmesazhin={() => setShfaqMesazhin(true)}
            setTipiMesazhit={setTipiMesazhit}
            setPershkrimiMesazhit={setPershkrimiMesazhit}
            perditeso={() => setPerditeso(Date.now())}
          />
        )}
        {shtoZbritjen && (
          <ProduktiNeZbritje
            mbyllZbritjen={() => setShtoZbritjen(false)}
            shfaq={() => setShtoZbritjen(true)}
            setPerditeso={setPerditeso}
            setTipiMesazhit={setTipiMesazhit}
            setPershkrimiMesazhit={setPershkrimiMesazhit}
            shfaqmesazhin={() => setShfaqMesazhin(true)}
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
          mbyllFature && (
            <>
              <div className="mt-2">
                <Tabela
                  data={zbritjet}
                  tableName="Lista e Zbritjeve"
                  kaButona={true}
                  funksionButonShto={() => setShtoZbritjen(true)}
                  funksionButonFshij={(e) => {
                    setId(e);
                    handleFshij(e);
                  }}
                  startDateField="Data e Zbritjes"
                  endDateField="Data e Skadimit"
                  mosShfaqID={true}
                />
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default ZbritjetEProduktit;
