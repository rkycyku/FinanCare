import "./Styles/ModalDheTabela.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faRightFromBracket,
  faRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../Context/StateProvider";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar(props) {
  const navigate = useNavigate();

  const [{ cart }, dispatch] = useStateValue();
  const token = localStorage.getItem("token");
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);
  const [perditeso, setPerditeso] = useState("");

  const [teDhenat, setTeDhenat] = useState([]);

  const [showNav, setShowNav] = useState(false);

  const getID = localStorage.getItem("id");
  const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const ShfaqTeDhenat = async () => {
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

    ShfaqTeDhenat();
  }, [perditeso]);

  useEffect(() => {
    if (getID) {
      const vendosTeDhenat = async () => {
        try {
          const perdoruesi = await axios.get(
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`,
            authentikimi
          );
          setTeDhenat(perdoruesi.data);
        } catch (err) {
          console.log(err);
        }
      };

      vendosTeDhenat();
    } else {
      navigate("/login");
    }
  }, [perditeso]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const kohaAktive = new Date(decodedToken.exp * 1000);
      const kohaTanishme = new Date();
      const id = localStorage.getItem("id");

      if (kohaAktive < kohaTanishme) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/LogIn");
      }

      if (id !== decodedToken.id) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/LogIn");
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  return (
    <MDBNavbar sticky expand="lg" light style={{ backgroundColor: "#009879" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/web/d144a4e21cb54a7fb9c5a21d4eebdd50.svg`}
            height="30"
            alt=""
            loading="lazy"
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}>
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav className="d-flex mr-auto">
            {token && (
              <>
                <MDBDropdown>
                  <MDBDropdownToggle className="btnNav btnNav-primary">
                    Materiali
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Artikujt
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/Produktet">
                          <MDBDropdownItem link>
                            Lista e Produkteve
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/NjesiaMatese">
                          <MDBDropdownItem link>Njesia Matese</MDBDropdownItem>
                        </Link>
                        <Link to="/GrupetEProduktit">
                          <MDBDropdownItem link>
                            Grupet e Produktit
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/KartelaEArtikullit">
                          <MDBDropdownItem link>
                            Kartela e Artikullit
                          </MDBDropdownItem>
                        </Link>
                        <MDBDropdownItem divider />
                        <Link to="/ZbritjetEProduktit">
                          {" "}
                          <MDBDropdownItem link>
                            Zbritjet e Produkteve
                          </MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Hyrjet
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/KalkulimiIMallit">
                          <MDBDropdownItem link>
                            Kalkulimi i Mallit
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/KthimiMallitTeShitur">
                          <MDBDropdownItem link>
                            Kthim i Mallit te Shitur
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/FleteLejimet">
                          <MDBDropdownItem link>Flete Lejimet</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Shitjet
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/Porosite">
                          <MDBDropdownItem link>Porosite</MDBDropdownItem>
                        </Link>
                        <Link to="/Ofertat">
                          <MDBDropdownItem link>Ofertat</MDBDropdownItem>
                        </Link>
                        <Link to="/AsgjesimiIStokut">
                          <MDBDropdownItem link>
                            Asgjesimi i Stokut
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/KthimIMallitTeBlere">
                          <MDBDropdownItem link>
                            Kthimi i Mallit te Blere{" "}
                          </MDBDropdownItem>
                        </Link>
                        <MDBDropdownItem divider />
                        <Link to="/Statistika">
                          <MDBDropdownItem link>
                            Statistikat e Dyqanit
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/ListaShitjeveMeParagon">
                          <MDBDropdownItem link>
                            Lista e shitjeve me Paragon
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/POS">
                          <MDBDropdownItem link>POS</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBDropdown>
                  <MDBDropdownToggle className="btnNav btnNav-primary">
                    Gjenerale
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Te Dhenat
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/PerditesoTeDhenat">
                          <MDBDropdownItem link>
                            Perditeso Te Dhenat
                          </MDBDropdownItem>
                        </Link>

                        <Link to="/TeDhenatEBiznesit">
                          <MDBDropdownItem link>
                            Te Dhenat e Biznesit
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/Bankat">
                          <MDBDropdownItem link>Bankat</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Stafi
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/Stafi">
                          <MDBDropdownItem link>Perdoruesit</MDBDropdownItem>
                        </Link>
                        <Link to="/Rolet">
                          <MDBDropdownItem link>Rolet</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group className="btnNav-group">
                      <MDBDropdownToggle className="btnNav btnNav-primary">
                        Partneret
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/TabelaEPartnereve">
                          <MDBDropdownItem link>
                            Lista e Partnereve
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/ShtoPartnerin">
                          <MDBDropdownItem link>
                            Shtoni Partnerin
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/KartelaFinanciare">
                          <MDBDropdownItem link>
                            Kartela Financiare
                          </MDBDropdownItem>
                        </Link>
                        
                        <MDBDropdownItem divider />
                        <Link to="/ShtoPagesat">
                          <MDBDropdownItem link>
                            Shto Pagesat e Fatures
                          </MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </>
            )}
            <MDBNavbarNav
              right={showNav ? false : true}
              fullWidth={false}
              className="mb-2 mb-lg-0">
              {token && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to="/Dashboard">
                        Miresevini,{" "}
                        <strong>
                          {teDhenat.perdoruesi && teDhenat.perdoruesi.emri}
                        </strong>
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to="/" onClick={handleSignOut}>
                        Sign out <FontAwesomeIcon icon={faRightFromBracket} />
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
              {!token && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to="/LogIn">
                        Sign in <FontAwesomeIcon icon={faRightToBracket} />
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to="/SignUp">
                        Sign up <FontAwesomeIcon icon={faUserPlus} />
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
