import './Styles/ModalDheTabela.css';
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
  MDBDropdownToggle
} from 'mdb-react-ui-kit';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faRightToBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useStateValue } from '../../Context/StateProvider';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function NavBar(props) {
  const navigate = useNavigate();

  const [{ cart }, dispatch] = useStateValue();
  const token = localStorage.getItem("token");
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);
  const [perditeso, setPerditeso] = useState('');

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
        const teDhenat = await axios.get("https://localhost:7285/api/TeDhenatBiznesit/ShfaqTeDhenat", authentikimi);
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
            `https://localhost:7285/api/Perdoruesi/shfaqSipasID?idUserAspNet=${getID}`, authentikimi
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
  }


  const kontrolloProduktet = () => {
    const produktet = JSON.parse(localStorage.getItem("cart"));

    produktet && produktet.forEach(produkti => {
      axios.get(`https://localhost:7285/api/Produkti/${produkti.id}`, authentikimi)
        .then(response => {
          const prd = response.data;

          if (
            produkti.foto !== prd.fotoProduktit ||
            produkti.emri !== prd.emriProduktit ||
            (produkti.cmimi !== prd.qmimiProduktit && produkti.cmimi !== prd.qmimiMeZbritjeProduktit) ||
            produkti.sasia > prd.sasiaNeStok
          ) {
            const updatedCart = produktet.filter(item => item.id !== produkti.id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }

        })
        .catch(error => {
          console.error('Error fetching item:', error);
        });
    });
  }


  return (
    <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#009879' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          <img
            src={`${process.env.PUBLIC_URL}/img/web/d144a4e21cb54a7fb9c5a21d4eebdd50.svg`}
            height='30'
            alt=''
            loading='lazy'
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav className='d-flex mr-auto' >
            {token &&
              <>
                <MDBDropdown >
                  <MDBDropdownToggle>Materiali</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Artikujt</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to='/Produktet'><MDBDropdownItem link>Lista e Produkteve</MDBDropdownItem></Link>
                        <Link to='/Kategorite'><MDBDropdownItem link>Kategorite</MDBDropdownItem></Link>
                        <Link to='/Kompanite'><MDBDropdownItem link>Kompanit</MDBDropdownItem></Link>
                        <MDBDropdownItem divider />
                        <MDBDropdown dropright group>
                          <MDBDropdownToggle>Zbritjet</MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <Link to='/ZbritjetEProduktit'> <MDBDropdownItem link>Zbritjet e Produkteve</MDBDropdownItem></Link>
                            <Link to='/KodiZbritjes'><MDBDropdownItem link>Kodet e Zbritjev</MDBDropdownItem></Link>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Hyrjet</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to='/KalkulimiIMallit'><MDBDropdownItem link>Kalkulimi i Mallit</MDBDropdownItem></Link>
                        <Link to='#'><MDBDropdownItem link>Kthim i Mallit te Shitur #</MDBDropdownItem></Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Shitjet</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdown dropright group>
                          <MDBDropdownToggle>Porosite</MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <Link to='/Porosite'><MDBDropdownItem link>Lista e Porosive</MDBDropdownItem></Link>
                            <Link to='/KrijoPorosine'><MDBDropdownItem link>Krijo Porosine</MDBDropdownItem></Link>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                        <Link to='/Statistika'><MDBDropdownItem link>Statistikat e Dyqanit</MDBDropdownItem></Link>
                        <Link to='#'><MDBDropdownItem link>Asgjesimi i Stokut #</MDBDropdownItem></Link>
                        <Link to='#'><MDBDropdownItem link>Kthimi i Mallit te blere #</MDBDropdownItem></Link>
                        <Link to='#'><MDBDropdownItem link>POS #</MDBDropdownItem></Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBDropdown >
                  <MDBDropdownToggle>Gjenerale</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Te Dhenat</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to='/PerditesoTeDhenat'><MDBDropdownItem link>Perditeso Te Dhenat</MDBDropdownItem></Link>
                        <MDBDropdownItem link><Link to='/TeDhenatEBiznesit'>Te Dhenat e Biznesit</Link></MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Stafi</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to='/Stafi'><MDBDropdownItem link>Perdoruesit</MDBDropdownItem></Link>
                        <Link to='/Rolet'><MDBDropdownItem link>Rolet</MDBDropdownItem></Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown dropright group>
                      <MDBDropdownToggle>Partneret</MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdown dropright group>
                          <MDBDropdownToggle>Partneri Bleres</MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <Link to='/PartneriBleres'><MDBDropdownItem link>Lista e Partnereve Bleres</MDBDropdownItem></Link>
                            <Link to='#'><MDBDropdownItem link>Shtoni Partnerin Bleres</MDBDropdownItem></Link>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                        <MDBDropdown dropright group>
                          <MDBDropdownToggle>Partneri Furnitor</MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <Link to='/PartneriFurnitor'><MDBDropdownItem link>Lista e Partnereve Furnitor</MDBDropdownItem></Link>
                            <Link to='#'><MDBDropdownItem link>Shtoni Partnerin Furnitor </MDBDropdownItem></Link>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </>}
            <MDBNavbarNav right={showNav ? false : true} fullWidth={false} className='mb-2 mb-lg-0'>
              {token &&
                <>
                  <MDBNavbarItem >
                    <MDBNavbarLink>
                      <Link to='/Dashboard'>Miresevini, <strong>{teDhenat.perdoruesi && teDhenat.perdoruesi.emri}</strong></Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to='/' onClick={handleSignOut}>Sign out <FontAwesomeIcon icon={faRightFromBracket} /></Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              }
              {!token &&
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to='/LogIn'>Sign in <FontAwesomeIcon icon={faRightToBracket} /></Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <Link to='/SignUp'>Sign up <FontAwesomeIcon icon={faUserPlus} /></Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                </>
              }
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>


      </MDBContainer>
    </MDBNavbar >
  );
}

export default NavBar;