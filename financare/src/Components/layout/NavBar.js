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
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#009879' }}>
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
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                <Link to='/Statistika'>Statistikat e Dyqanit</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBDropdown >
              <MDBDropdownToggle>Te Dhenat</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link><Link to='/PerditesoTeDhenat'>Perditeso Te Dhenat</Link></MDBDropdownItem>
                <MDBDropdownItem link><Link to='/TeDhenatEBiznesit'>Te Dhenat e Biznesit</Link></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'>

              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'>
                <Link to='/Porosite'>Porosite</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBDropdown >
              <MDBDropdownToggle>Produktet</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link><Link to='/Produktet'>Produktet</Link></MDBDropdownItem>
                <MDBDropdownItem link><Link to='/Kategorite'>Kategorite</Link></MDBDropdownItem>
                <MDBDropdownItem link><Link to='/Kompanite'>Kompanit</Link></MDBDropdownItem>
                <MDBDropdownItem link><Link to='/ZbritjetEProduktit'>Zbritjet e Produkteve</Link></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown >
              <MDBDropdownToggle>Stafi</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link><Link to='/Stafi'>Perdoruesit</Link></MDBDropdownItem>
                <MDBDropdownItem link><Link to='/Rolet'>Rolet</Link></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'>
                <Link to='/KodiZbritjes'>Kodet e Zbritjev</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBNavbarLink active aria-current='page'><Link to='/KalkulimiIMallit'>Kalkulimi i Mallit</Link></MDBNavbarLink>
            </MDBNavbarItem>

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