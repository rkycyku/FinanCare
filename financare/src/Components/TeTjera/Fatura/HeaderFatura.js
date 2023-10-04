import "./Styles/Fatura.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Barkodi from "./Barkodi";

function HeaderFatura(props) {
  const [perditeso, setPerditeso] = useState(Date.now());
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);

  const [produktet, setProduktet] = useState([]);
  const [teDhenatFat, setteDhenatFat] = useState([]);

  const dataPorosise = new Date(
    teDhenatFat &&
      teDhenatFat.regjistrimet &&
      teDhenatFat.regjistrimet.dataRegjistrimit
  );
  const dita = dataPorosise.getDate().toString().padStart(2, "0");
  const muaji = (dataPorosise.getMonth() + 1).toString().padStart(2, "0");
  const viti = dataPorosise.getFullYear().toString().slice(-2);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  const barkodi = `${
    teDhenatBiznesit && teDhenatBiznesit.shkurtesaEmritBiznesit
  }-${dita}${muaji}${viti}-${
    teDhenatFat &&
    teDhenatFat.regjistrimet &&
    teDhenatFat.regjistrimet.llojiKalkulimit
  }-${props.faturaID}`;

  useEffect(() => {
    const vendosFature = async () => {
      try {
        const produktet = await axios.get(
          `https://localhost:7285/api/KalkulimiImallit/shfaqTeDhenatKalkulimit?idRegjistrimit=${props.faturaID}`,
          authentikimi
        );
        const teDhenat = await axios.get(
          `https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimetNgaID?id=${props.faturaID}`,
          authentikimi
        );

        console.log(teDhenat.data)

        setteDhenatFat(teDhenat.data);
        setProduktet(produktet.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    vendosFature();
  }, [props.faturaID]);

  useEffect(() => {
    const vendosTeDhenatBiznesit = async () => {
      try {
        const teDhenat = await axios.get(
          "https://localhost:7285/api/TeDhenatBiznesit/ShfaqTeDhenat",
          authentikimi
        );
        setTeDhenatBiznesit(teDhenat.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosTeDhenatBiznesit();
  }, [props.faturaID]);

  return (
    <>
      <div className="header">
        <div className="teDhenatKompanis">
          <img
            src={`${process.env.PUBLIC_URL}/img/web/${teDhenatBiznesit.logo}`}
            style={{ width: "150px", height: "auto", marginTop: "0.5em" }}
          />
          <h2 style={{ fontSize: "24pt" }}>
            {teDhenatBiznesit && teDhenatBiznesit.emriIbiznesit}
          </h2>
          <p>
            <strong>Adresa: </strong>
            {teDhenatBiznesit && teDhenatBiznesit.adresa}
          </p>
          <p>
            <strong>NUI: </strong>
            {teDhenatBiznesit && teDhenatBiznesit.nui} / <strong>NF: </strong>
            {teDhenatBiznesit && teDhenatBiznesit.nf} / <strong>TVSH: </strong>
            {teDhenatBiznesit && teDhenatBiznesit.nrtvsh}
          </p>

          <p>
            <strong>Kontakti: </strong>
            {teDhenatBiznesit && teDhenatBiznesit.nrKontaktit}-
            {teDhenatBiznesit && teDhenatBiznesit.email}
          </p>
          <hr />
          <p>
            <strong>Data e Fatures: </strong>
            {new Date(dataPorosise).toLocaleDateString(
                    "en-GB",
                    { dateStyle: "short" }
                  )}
          </p>
          <p><strong>Shenime Shtese: </strong>
            {teDhenatFat &&
              teDhenatFat.regjistrimet &&
              teDhenatFat.regjistrimet.pershkrimShtese}</p>
        </div>

        <div className="data">
          <div className="barkodi">
            <h1>
              {teDhenatFat &&
              teDhenatFat.regjistrimet &&
              teDhenatFat.regjistrimet.llojiKalkulimit &&
              teDhenatFat.regjistrimet.llojiKalkulimit === "KMB"
                ? "FLETKTHIM"
                : teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.llojiKalkulimit &&
                  teDhenatFat.regjistrimet.llojiKalkulimit === "AS"
                ? "ASGJESIM I STOKUT"
                : teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.llojiKalkulimit &&
                  teDhenatFat.regjistrimet.llojiKalkulimit === "HYRJE"
                ? "KALKULIM I MALLIt"
                : teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.llojiKalkulimit &&
                  teDhenatFat.regjistrimet.llojiKalkulimit === "FL"
                ? "FLETLEJIM"
                : teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.llojiKalkulimit &&
                  teDhenatFat.regjistrimet.llojiKalkulimit === "FAT"
                ? "FATURE"
                : ""}
            </h1>
            <span id="nrFatures">
              <Barkodi value={barkodi} />
            </span>
          </div>
          <div className="teDhenatEKlientit">
            <p>
              <strong>
                {teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.idpartneri}{" "}
                -{" "}
                {teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.shkurtesaPartnerit}{" "}
                /{" "}
                {teDhenatFat &&
                  teDhenatFat.regjistrimet &&
                  teDhenatFat.regjistrimet.emriBiznesit}
              </strong>
            </p>
            <p>
              <strong>NUI: </strong>
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.nui}{" "}
              / <strong>NF: </strong>
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.nrf}{" "}
              / <strong>TVSH: </strong>
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.partneriTVSH}
            </p>
            <p>
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.adresa}
            </p>
            <p>
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.nrKontaktit}{" "}
              -{" "}
              {teDhenatFat &&
                teDhenatFat.regjistrimet &&
                teDhenatFat.regjistrimet.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderFatura;
