import "./Styles/Fatura.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Barkodi from "./Barkodi";

function Fatura(props) {
  const [perditeso, setPerditeso] = useState("");
  const [vendosFature, setVendosFature] = useState(false);
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);
  const [teDhenat, setTeDhenat] = useState([]);

  const [meShumeSe25, setMeShumeSe25] = useState(false);

  const [produktet, setProduktet] = useState([]);
  const [teDhenatFat, setteDhenatFat] = useState("");

  const [kaAkses, setKaAkses] = useState(true);

  const { nrFatures } = useParams();

  const dataPorosise = new Date(
    teDhenatFat &&
      teDhenatFat &&
      teDhenatFat &&
      teDhenatFat.regjistrimet.dataRegjistrimit
  );
  const dita = dataPorosise.getDate().toString().padStart(2, "0");
  const muaji = (dataPorosise.getMonth() + 1).toString().padStart(2, "0");
  const viti = dataPorosise.getFullYear().toString().slice(-2);
  const dataMberritjes = new Date(
    dataPorosise.setDate(dataPorosise.getDate() + 4)
  );
  const skadimiGarancionit = new Date(
    dataPorosise.setDate(dataPorosise.getDate() + 365)
  );

  const barkodi = `${
    teDhenatFat &&
    teDhenatFat.regjistrimet &&
    teDhenatFat &&
    teDhenatFat &&
    teDhenatFat.regjistrimet.emriBiznesit &&
    teDhenatBiznesit &&
    teDhenatBiznesit.shkurtesaEmritBiznesit
  }-${dita}${muaji}${viti}-${
    teDhenatFat && teDhenatFat && teDhenatFat.regjistrimet.llojiKalkulimit
  }-${nrFatures}`;

  const getID = localStorage.getItem("id");

  const navigate = useNavigate();

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    if (getID) {
      const vendosFature = async () => {
        try {
          const produktet = await axios.get(
            `https://localhost:7285/api/KalkulimiImallit/shfaqTeDhenatKalkulimit?idRegjistrimit=${nrFatures}`,
            authentikimi
          );
          const teDhenat = await axios.get(
            `https://localhost:7285/api/KalkulimiImallit/shfaqRegjistrimetNgaID?id=${nrFatures}`,
            authentikimi
          );

          console.log(teDhenat.data);
          console.log(produktet.data);
          setteDhenatFat(teDhenat.data);
          setProduktet(produktet.data);

          if (produktet.data.length > 25) {
            setMeShumeSe25(true);
          }

          setVendosFature(true);
        } catch (err) {
          console.log(err);
        }
      };

      vendosFature();
    } else {
      navigate("/login");
    }
  }, [perditeso]);

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
  }, [getID]);

  useEffect(() => {
    if (getID) {
      const vendosTeDhenatUserit = async () => {
        try {
          const teDhenatUser = await axios.get(
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`,
            authentikimi
          );
          setTeDhenat(teDhenatUser.data);
          if (!teDhenatUser.data.rolet.includes("Admin", "Menaxher")) {
            setKaAkses(false);
          }
          console.log(teDhenatUser.data);
        } catch (err) {
          console.log(err);
        }
      };

      vendosTeDhenatUserit();
    } else {
      navigate("/login");
    }
  }, [getID]);

  useEffect(() => {
    console.log(teDhenat);
    if (teDhenat) {
      if (!kaAkses) {
        navigate("/dashboard");
      } else {
        if (vendosFature === true) {
          teDhenatFatPerRuajtje();
        }
      }
    }
  }, [vendosFature]);

  function teDhenatFatPerRuajtje() {
    const teDhenatFatRef = document.querySelector(".teDhenatFat");
    const PjesaNenshkrimeveRef = document.querySelector(".PjesaNenshkrimeve");

    html2canvas(teDhenatFatRef, { useCORS: true })
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
          pdf.addImage(invoicePageData, "JPEG", 20, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(
              invoicePageData,
              "JPEG",
              20,
              position,
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

        if (meShumeSe25) {
          html2canvas(PjesaNenshkrimeveRef, { useCORS: true })
            .then((PjesaNenshkrimeveCanvas) => {
              var PjesaNenshkrimeveWidth = PjesaNenshkrimeveCanvas.width;
              var PjesaNenshkrimeveHeight = PjesaNenshkrimeveCanvas.height;
              var PjesaNenshkrimevePageHeight =
                (PjesaNenshkrimeveWidth / 592.28) * 841.89;
              var PjesaNenshkrimeveLeftHeight = PjesaNenshkrimeveHeight;
              var PjesaNenshkrimevePosition = 0;
              var PjesaNenshkrimeveImgWidth = 555.28;
              var PjesaNenshkrimeveImgHeight =
                (PjesaNenshkrimeveImgWidth / PjesaNenshkrimeveWidth) *
                PjesaNenshkrimeveHeight;
              var PjesaNenshkrimevePageData = PjesaNenshkrimeveCanvas.toDataURL(
                "image/jpeg",
                1.0
              );

              if (PjesaNenshkrimeveLeftHeight < PjesaNenshkrimevePageHeight) {
                pdf.addPage();
                pdf.addImage(
                  PjesaNenshkrimevePageData,
                  "JPEG",
                  20,
                  0,
                  PjesaNenshkrimeveImgWidth,
                  PjesaNenshkrimeveImgHeight
                );
              } else {
                while (PjesaNenshkrimeveLeftHeight > 0) {
                  pdf.addPage();
                  pdf.addImage(
                    PjesaNenshkrimevePageData,
                    "JPEG",
                    20,
                    PjesaNenshkrimevePosition,
                    PjesaNenshkrimeveImgWidth,
                    PjesaNenshkrimeveImgHeight
                  );
                  PjesaNenshkrimeveLeftHeight -= PjesaNenshkrimevePageHeight;
                  PjesaNenshkrimevePosition -= 841.89;
                  if (PjesaNenshkrimeveLeftHeight > 0) {
                    pdf.addPage();
                  }
                }
              }

              ruajFaturen(pdf);
            })
            .catch((error) => {
              ruajFaturen(pdf);
            });
        } else {
          ruajFaturen(pdf);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function ruajFaturen(pdf) {
    var klienti =
      teDhenatFat && teDhenatFat.regjistrimet
        ? teDhenatFat &&
          teDhenatFat &&
          teDhenatFat.regjistrimet.emri + " " + teDhenatFat &&
          teDhenatFat &&
          teDhenatFat.regjistrimet.mbiemri
        : "";
    var dataFatures = teDhenat
      ? new Date(
          teDhenatFat &&
            teDhenatFat &&
            teDhenatFat.regjistrimet.dataRegjistrimit
        ).toLocaleDateString("en-GB", {
          dateStyle: "short",
        })
      : "";

    pdf.save(klienti + " - " + barkodi + " - " + dataFatures + ".pdf");
  }

  return (
    <>
      <div className="teDhenatFat">
        <div className="header">
          <div className="teDhenatKompanis">
            <img
              src={`${process.env.PUBLIC_URL}/img/web/${teDhenatBiznesit.logo}`}
              style={{ width: "150px", height: "auto", marginTop: "0.5em" }}
            />
            <h1 style={{ fontSize: "24pt" }}>
              {teDhenatBiznesit && teDhenatBiznesit.emriIbiznesit}
            </h1>
            <p>
              <strong>Adresa: </strong>
              {teDhenatBiznesit && teDhenatBiznesit.adresa}
            </p>
            <p>
              <strong>NUI: </strong>
              {teDhenatBiznesit && teDhenatBiznesit.nui} / <strong>NF: </strong>
              {teDhenatBiznesit && teDhenatBiznesit.nf} /{" "}
              <strong>TVSH: </strong>
              {teDhenatBiznesit && teDhenatBiznesit.nrtvsh}
            </p>

            <p>
              <strong>Kontakti: </strong>
              {teDhenatBiznesit && teDhenatBiznesit.nrKontaktit}-
              {teDhenatBiznesit && teDhenatBiznesit.email}
            </p>
          </div>

          <div className="data">
            <span id="nrFatures">
              <Barkodi value={barkodi} />
            </span>
            <br />
            <br />
            <p></p>
            <p>
              <strong>
                {teDhenatFat && teDhenatFat.regjistrimet.idpartneri} -{" "}
                {teDhenatFat && teDhenatFat.regjistrimet.shkurtesaPartnerit} /{" "}
                {teDhenatFat && teDhenatFat.regjistrimet.emriBiznesit}
              </strong>
            </p>
            <p>
              <strong>NUI: </strong>
              {teDhenatFat && teDhenatFat.regjistrimet.nui} /{" "}
              <strong>NF: </strong>
              {teDhenatFat && teDhenatFat.regjistrimet.nrf} /{" "}
              <strong>TVSH: </strong>
              {teDhenatFat && teDhenatFat.regjistrimet.partneriTVSH}
            </p>
            <p>{teDhenatFat && teDhenatFat.regjistrimet.adresa}</p>
            <p>
              {teDhenatFat && teDhenatFat.regjistrimet.nrKontaktit} -{" "}
              {teDhenatFat && teDhenatFat.regjistrimet.email}
            </p>
          </div>
        </div>

        <br />
        <hr
          style={{
            height: "2px",
            borderWidth: "0",
            color: "gray",
            backgroundColor: "black",
          }}
        />
        <br />
        <br />

        <h1 style={{ textAlign: "center", fontSize: "24pt" }}>
          Detajet e Porosis
        </h1>
        <div className="tabelaETeDhenaveProduktit">
          <table>
            <tr>
              <th>Nr.</th>
              <th>Shifra</th>
              <th>Emertimi</th>
              <th>Njm</th>
              <th>Sasia</th>
              <th>Qmimi pa TVSH</th>
              <th>Rabati %</th>
              <th>T %</th>
              <th>Qmimi me TVSH - Rab</th>
              <th>TVSH €</th>
              <th>Shuma €</th>
            </tr>
            {produktet.map((produkti, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{produkti.kodiProduktit}</td>
                <td>
                  {produkti.emriProduktit} {produkti.barkodi}
                </td>
                <td>{produkti.njesiaMatese1}</td>
                <td>{produkti.sasiaStokut}</td>
                <td>
                  {parseFloat(
                    produkti.qmimiBleres -
                      (produkti.qmimiBleres * produkti.llojiTVSH) / 100
                  ).toFixed(3)}
                </td>
                <td>{produkti.rabati}</td>
                <td>{produkti.llojiTVSH}</td>
                <td>
                  {parseFloat(
                    produkti.qmimiBleres -
                      produkti.qmimiBleres * (produkti.rabati / 100)
                  ).toFixed(3)}
                </td>
                <td>
                  {parseFloat(
                    (produkti.sasiaStokut *
                      (produkti.qmimiBleres -
                        produkti.qmimiBleres * (produkti.rabati / 100)) *
                      ((produkti.llojiTVSH /
                        100 /
                        (1 + produkti.llojiTVSH / 100)) *
                        100)) /
                      100
                  ).toFixed(3)}
                </td>
                <td>
                  {parseFloat(
                    produkti.sasiaStokut * produkti.qmimiBleres -
                      produkti.sasiaStokut *
                        produkti.qmimiBleres *
                        (produkti.rabati / 100)
                  ).toFixed(3)}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <hr></hr>

        <div className="header">
          <div className="teDhenatKompanis">
            <p>
              Gjate pageses ju lutem te shkruani numrin e Fatures:{" "}
              <strong>{barkodi}</strong>
            </p>
            <p>
              Referenti Juaj: {teDhenatFat && teDhenatFat.regjistrimet.username}
            </p>
          </div>

          <div className="data">
            <p>
              <strong>Nentotali: </strong>
              {teDhenatFat &&
                parseFloat(
                  teDhenatFat.totaliMeTVSH + teDhenatFat.rabati
                ).toFixed(2)}{" "}
              €
            </p>
            <p>
              <strong>Rabati: </strong>-{" "}
              {teDhenatFat && parseFloat(teDhenatFat.rabati).toFixed(2)} €
            </p>
            <p>
              <strong>Totali Pa TVSH: </strong>
              {teDhenatFat && parseFloat(teDhenatFat.totaliPaTVSH).toFixed(2)} €
            </p>
            <p>
              <strong>TVSH 8%: </strong>
              {teDhenatFat && parseFloat(teDhenatFat.tvsH8).toFixed(2)} €
            </p>
            <p>
              <strong>TVSH 18%: </strong>
              {teDhenatFat && parseFloat(teDhenatFat.tvsH18).toFixed(2)} €
            </p>
            <p>
              <strong style={{ fontSize: "18pt" }}>Qmimi Total: </strong>

              <strong style={{ fontSize: "18pt" }}>
                {teDhenatFat && parseFloat(teDhenatFat.totaliMeTVSH).toFixed(2)}{" "}
                €
              </strong>
            </p>
          </div>
        </div>

        <br />
        <hr
          style={{
            height: "2px",
            borderWidth: "0",
            color: "gray",
            backgroundColor: "black",
          }}
        />
        <div className="nenshkrimet">
          <div className="nenshkrimi">
            <span>
              _________________________________________________________________
            </span>
            <span>(Emri, Mbiemri, Nenshkrimi & Vula)</span>
            <span>(Personi Përgjegjës)</span>
          </div>
          <div className="nenshkrimi">
            <span>
              _________________________________________________________________
            </span>
            <span>(Emri, Mbiemri, Nenshkrimi)</span>
            <span>(Klienti)</span>
          </div>
        </div>
        <br />
      </div>

      {meShumeSe25 && (
        <div className="PjesaNenshkrimeve">
          <div className="header">
            <div className="teDhenatKompanis">
              <img
                src={`${process.env.PUBLIC_URL}/img/web/${teDhenatBiznesit.logo}`}
                style={{ width: "150px", height: "auto", marginTop: "0.5em" }}
              />
              <h1 style={{ fontSize: "24pt" }}>
                {teDhenatBiznesit && teDhenatBiznesit.emriIbiznesit}
              </h1>
              <p>
                <strong>Adresa: </strong>
                {teDhenatBiznesit && teDhenatBiznesit.adresa}
              </p>
              <p>
                <strong>NUI: </strong>
                {teDhenatBiznesit && teDhenatBiznesit.nui} /{" "}
                <strong>NF: </strong>
                {teDhenatBiznesit && teDhenatBiznesit.nf} /{" "}
                <strong>TVSH: </strong>
                {teDhenatBiznesit && teDhenatBiznesit.nrtvsh}
              </p>

              <p>
                <strong>Kontakti: </strong>
                {teDhenatBiznesit && teDhenatBiznesit.nrKontaktit}-
                {teDhenatBiznesit && teDhenatBiznesit.email}
              </p>
            </div>

            <div className="data">
              <span id="nrFatures">
                <Barkodi value={barkodi} />
              </span>
              <br />
              <br />
              <p></p>
              <p>
                <strong>
                  {teDhenatFat && teDhenatFat.regjistrimet.idpartneri} -{" "}
                  {teDhenatFat && teDhenatFat.regjistrimet.shkurtesaPartnerit} /{" "}
                  {teDhenatFat && teDhenatFat.regjistrimet.emriBiznesit}
                </strong>
              </p>
              <p>
                <strong>NUI: </strong>
                {teDhenatFat && teDhenatFat.regjistrimet.nui} /{" "}
                <strong>NF: </strong>
                {teDhenatFat && teDhenatFat.regjistrimet.nrf} /{" "}
                <strong>TVSH: </strong>
                {teDhenatFat && teDhenatFat.regjistrimet.partneriTVSH}
              </p>
              <p>{teDhenatFat && teDhenatFat.regjistrimet.adresa}</p>
              <p>
                {teDhenatFat && teDhenatFat.regjistrimet.nrKontaktit} -{" "}
                {teDhenatFat && teDhenatFat.regjistrimet.email}
              </p>
            </div>
          </div>
          <div className="nenshkrimet">
            <div className="nenshkrimi">
              <span>
                _________________________________________________________________
              </span>
              <span>(Emri, Mbiemri, Nenshkrimi & Vula)</span>
              <span>(Personi Përgjegjës)</span>
            </div>
            <div className="nenshkrimi">
              <span>
                _________________________________________________________________
              </span>
              <span>(Emri, Mbiemri, Nenshkrimi)</span>
              <span>(Klienti)</span>
            </div>
          </div>
          <br />
          <h3 style={{ fontSize: "18pt" }}>
            Ne rast te pageses me transfer bankar ju lutem kontaktoni me stafin!
          </h3>
          <h3 style={{ fontSize: "18pt" }}>
            Te gjitha produktet ne kete fature kane garancion 1 Vjet!
          </h3>
          <h3 style={{ fontSize: "18pt" }}>
            Garancioni vlene deri me:{" "}
            {skadimiGarancionit.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </h3>
        </div>
      )}
    </>
  );
}

export default Fatura;
