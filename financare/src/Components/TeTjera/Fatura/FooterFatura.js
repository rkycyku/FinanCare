import "./Styles/Fatura.css";
import axios from "axios";
import { useState, useEffect } from "react";

function FooterFatura(props) {
  const [teDhenatFat, setteDhenatFat] = useState([]);

  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const vendosFature = async () => {
      try {
        const teDhenat = await axios.get(
          `https://localhost:7285/api/Faturat/shfaqRegjistrimetNgaID?id=${
            props.faturaID ?? 61
          }`,
          authentikimi
        );
        setteDhenatFat(teDhenat.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    vendosFature();
  }, [props.faturaID]);

  return (
    <>
      <div className="header">
        <div className="teDhenatKompanis">
          {teDhenatFat &&
            teDhenatFat.regjistrimet &&
            teDhenatFat.regjistrimet.llojiKalkulimit &&
            (teDhenatFat.regjistrimet.llojiKalkulimit === "FAT" ||
              teDhenatFat.regjistrimet.llojiKalkulimit === "FL" ||
              teDhenatFat.regjistrimet.llojiKalkulimit === "KMB" ||
              teDhenatFat.regjistrimet.llojiKalkulimit === "HYRJE") && (
              <>
                <p>
                  Gjate pageses ju lutem te shkruani numrin e Fatures:{" "}
                  <strong>{props.Barkodi}</strong>
                </p>
                <p>
                  <strong>Pagesa duhet te behet ne nje nga llogarit e cekura me poshte:</strong>
                </p>
                <table>
                  <tr>
                    <th>Emri Bankes</th>
                    <th>NR Bankes</th>
                  </tr>
                  <tr key={"a"}>
                    <td>banka 1</td>
                    <td>Numri 1</td>
                  </tr>
                  <tr key={"ab"}>
                    <td>banka 2</td>
                    <td>Numri 2</td>
                  </tr>
                </table>
              </>
            )}
        </div>

        <div className="data">
          <p>
            <strong>Nentotali: </strong>
            {teDhenatFat &&
              parseFloat(teDhenatFat.totaliMeTVSH + teDhenatFat.rabati).toFixed(
                2
              )}{" "}
            €
          </p>
          <p>
            <strong>Rabati: </strong>
            {teDhenatFat && parseFloat(-teDhenatFat.rabati).toFixed(2)} €
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
              {teDhenatFat && parseFloat(teDhenatFat.totaliMeTVSH).toFixed(2)} €
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
          <br />
          <strong>© FinanCare - POS, eOrder & More by Rilind Kycyku</strong>
        </div>
        <div className="nenshkrimi">
          <span>
            _________________________________________________________________
          </span>
          <span>(Emri, Mbiemri, Nenshkrimi)</span>
          <span>(Klienti)</span>
        </div>
      </div>
    </>
  );
}

export default FooterFatura;
