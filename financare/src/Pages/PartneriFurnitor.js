import NavBar from "../Components/layout/NavBar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import classes from './Styles/TeDhenatEBiznesit.css';
import axios from "axios";
import Mesazhi from "../Components/layout/Mesazhi";
import { TailSpin } from 'react-loader-spinner';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBRadio,
    MDBBtnGroup
} from 'mdb-react-ui-kit';

function TeDhenatEBiznesit(props) {
    const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);
    const [perditeso, setPerditeso] = useState('');
    const [edito, setEdito] = useState(false);
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [loading, setLoading] = useState(false);
    const [foto, setFoto] = useState(null);

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

    const handleFotoChange = (event) => {
        setFoto(event.target.files[0]);
    };

    useEffect(() => {
        const ShfaqTeDhenat = async () => {
            try {
                setLoading(true);
                const teDhenat = await axios.get("https://localhost:7285/api/TeDhenatBiznesit/ShfaqTeDhenat", authentikimi);
                setTeDhenatBiznesit(teDhenat.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        ShfaqTeDhenat();
    }, [perditeso]);

    const handleEdito = (e) => {
        e.preventDefault();

        setEdito(true)
    };

    async function handleRuaj(e) {
        e.preventDefault();

        if (foto) {
            const formData = new FormData();
            formData.append('foto', foto);

            try {
                await axios.post(`https://localhost:7285/api/VendosFotot/PerditesoTeDhenatBiznesit?logoVjeter=${teDhenatBiznesit.logo}`, formData, authentikimi)
                    .then(async (response) => {
                        axios.put("https://localhost:7285/api/TeDhenatBiznesit/perditesoTeDhenat", {
                            "emriIbiznesit": formValue.emriBiznesit,
                            "nui": formValue.nui,
                            "nf": formValue.nf,
                            "nrtvsh": formValue.nrtvsh,
                            "adresa": formValue.adresa,
                            "nrKontaktit": formValue.nrKontaktit,
                            "email": formValue.email
                        }, authentikimi)
                        setPerditeso(Date.now());

                        setEdito(false);
                    })
            } catch (error) {
                console.error(error);
            }
        } else {
            await axios.put("https://localhost:7285/api/TeDhenatBiznesit/perditesoTeDhenat", {
                "emriIbiznesit": formValue.emriBiznesit,
                "nui": formValue.nui,
                "nf": formValue.nf,
                "nrtvsh": formValue.nrtvsh,
                "adresa": formValue.adresa,
                "nrKontaktit": formValue.nrKontaktit,
                "email": formValue.email,
            }, authentikimi)
            setPerditeso(Date.now());

            setEdito(false);
        }
    }

    useEffect(() => {
        if (teDhenatBiznesit) {
            setFormValue({
                ...formValue,
                emriBiznesit: teDhenatBiznesit.emriIbiznesit,
                nui: teDhenatBiznesit.nui,
                nf: teDhenatBiznesit.nf,
                nrtvsh: teDhenatBiznesit.nrtvsh,
                adresa: teDhenatBiznesit.adresa,
                nrKontaktit: teDhenatBiznesit.nrKontaktit,
                email: teDhenatBiznesit.email
            });
        }
    }, [teDhenatBiznesit]);

    return (
        <>
            <Helmet>
                <title>Dashboard | Tech Store</title>
            </Helmet>
            <NavBar />

            <div className={classes.containerDashboardP}>
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
                            <h1 className="titulliPerditeso mb-4">Shto Partnerin Furnitor</h1>

                            <MDBRow tag="form" className='g-3'>

                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.emriBiznesit ?? ''}
                                        name='emriBiznesit'
                                        onChange={onChange}
                                        id='validationCustom01'
                                        required
                                        label='Emri i Biznesit'
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.nui ?? ''}
                                        name='nui'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        required
                                        label='Numri Unik Identifikues: NUI'
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
                                <MDBCol md="4">
                                    <MDBInput
                                        value={formValue.adresa ?? ''}
                                        name='adresa'
                                        onChange={onChange}
                                        id='validationCustom03'
                                        required
                                        label='Adresa'
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
                                <div className='col-12'>
                                    <MDBBtn>
                                        Shto Partnerin
                                    </MDBBtn>
                                </div>
                            </MDBRow>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default TeDhenatEBiznesit;
