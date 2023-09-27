import NavBar from "../../../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useState } from "react";
import "../../Styles/DizajniPergjithshem.css";
import "../../Styles/TeDhenatEBiznesit.css";
import axios from "axios";
import Mesazhi from "../../../Components/layout/Mesazhi";
import { TailSpin } from 'react-loader-spinner';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Form, Col } from "react-bootstrap";

function TeDhenatEBiznesit(props) {
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [loading, setLoading] = useState(false);

    const [llojiPartnerit, setLlojiPartnerit] = useState("");

    const [formValue, setFormValue] = useState({
        emriBiznesit: "",
        shkurtesaEmrit: "",
        nui: "",
        nf: "",
        nrtvsh: "",
        adresa: "",
        nrKontaktit: "",
        email: "",
    });

    const getToken = localStorage.getItem("token");

    const authentikimi = {
        headers: {
            Authorization: `Bearer ${getToken}`,
        },
    };

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleLlojiPartneritChange = (event) => {
        setLlojiPartnerit(event.target.value);
    };

    async function handleShtoPartnerin() {
        try {
            axios.post("https://localhost:7285/api/Partneri/shtoPartnerin", {
                "emriBiznesit": formValue.emriBiznesit,
                "nui": formValue.nui,
                "nrf": formValue.nf,
                "tvsh": formValue.nrtvsh,
                "email": formValue.email,
                "adresa": formValue.adresa,
                "nrKontaktit": formValue.nrKontaktit,
                "llojiPartnerit": llojiPartnerit,
                "shkurtesaPartnerit": formValue.shkurtesaEmrit,
            }, authentikimi)

            setFormValue({
                emriBiznesit: "",
                shkurtesaEmrit: "",
                nui: "",
                nf: "",
                nrtvsh: "",
                adresa: "",
                nrKontaktit: "",
                email: "",
            });
            setLlojiPartnerit(0);

            setTipiMesazhit("success");
            setPershkrimiMesazhit("Partneri u shtua me Sukses!");
            setShfaqMesazhin(true)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />

            <div className="containerDashboardP">
                {shfaqMesazhin && <Mesazhi
                    setShfaqMesazhin={setShfaqMesazhin}
                    pershkrimi={pershkrimiMesazhit}
                    tipi={tipiMesazhit}
                />}
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
                ) :
                    (
                        <div className="TeDhenatContainer mb-4">
                            <h1 className="titulliPerditeso mb-4">Shto Partnerin</h1>

                            <MDBRow tag="form" className='g-3'>

                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.emriBiznesit ?? ''}
                                        name='emriBiznesit'
                                        onChange={onChange}
                                        id='validationCustom01'
                                        required
                                        label={<span>Emri i Biznesit / Klientit / Parnerit<span style={{ color: "red" }}>*</span></span>}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.shkurtesaEmrit ?? ''}
                                        name='shkurtesaEmrit'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        required
                                        label={<span>Shkurtesa e Partnerit<span style={{ color: "red" }}>*</span></span>}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.nui ?? ''}
                                        name='nui'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        required
                                        label={<span>Numri Unik Identifikues: NUI<span style={{ color: "red" }}>*</span></span>}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.nf ?? ''}
                                        name='nf'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        label='Numri Fiskal: NF / NRF'
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.nrtvsh ?? ''}
                                        name='nrtvsh'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        label='Numri TVSH: NRTVSH'
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.email ?? ''}
                                        name='email'
                                        onChange={onChange}
                                        id='validationCustom02'
                                        label='Email'
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.adresa ?? ''}
                                        name='adresa'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        required
                                        label={<span>Adresa<span style={{ color: "red" }}>*</span></span>}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.nrKontaktit ?? ''}
                                        name='nrKontaktit'
                                        onChange={onChange}
                                        id='validationCustom05'
                                        label='Numri i Kontaktit'
                                    />
                                </MDBCol>
                                <Form.Group as={Col} className="p-0" controlId="formGridState">
                                    <Form.Select value={llojiPartnerit} onChange={handleLlojiPartneritChange}>
                                        <option hidden disabled value={0}>Zgjedhni Llojin e Partnerit</option>
                                        <option value="B">Bleres</option>
                                        <option value="F">Furnitore</option>
                                        <option value="B/F">Bleres & Furnitore</option>
                                    </Form.Select>
                                    <Form.Label>{<span>Lloji i Partnerit<span style={{ color: "red" }}>*</span></span>}</Form.Label>
                                </Form.Group>
                            </MDBRow>
                            <div>
                                <MDBBtn onClick={() => handleShtoPartnerin()}>
                                    Shto Partnerin <FontAwesomeIcon icon={faPlus} />
                                </MDBBtn>
                                <Link to="/TabelaEPartnereve"><MDBBtn className="Butoni">Anulo <FontAwesomeIcon icon={faClose} /></MDBBtn></Link>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default TeDhenatEBiznesit;
