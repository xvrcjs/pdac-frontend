import { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme,Avatar } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import "./Topbar.scss";
import { tokens } from "../../theme";
import Navbar from "components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SearchBar from "./SearchComponent";
import { MenuData } from "./MenuData.ts";
import ProfileMenuContainer from "components/ProfileMenu";
import { CANT_CLAIM_HV_IVE } from "constant/endpoints"

const Item = ({ title, to, icon, colors, isActive, subItems,cantClaim }) => {
  const iconPath = `../../icons/${icon}.svg`;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const handleTo = () => {
    navigate(to);
  };
  let location = useLocation();

  return (
    <>
      {!subItems ? (
        <MenuItem
          active={isActive}
          className={`swt-topbar-links ${title === "Reclamos HV" ? "nav-hv":""}`}
          onClick={() => handleTo()}
          component={<Link to={to} />}
          rel="noopener noreferrer"
        >
          {(title === "Reclamos HV") && (cantClaim > 0) && 
            <Box sx={{
              position:"absolute",
              top:"-10px",
              right:"15px",
              background:"#B31EA4", 
              width:"24px",
              borderRadius:"50%",
              textAlign:"center",
              animation: "blink 1.2s infinite",
              "@keyframes blink": {
                "100%": { opacity: 1,transform: "scale(1.3)"  }
              }
            }}>
              <Typography sx={{fontSize:"15px"}} >{cantClaim}</Typography>
            </Box>
          }
          <div className="swt-topbar-links-content">   
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Typography
                className="swt-topbar-links-title"
                color={isActive ? "#fff" : ""}
              >
                {title}
              </Typography>
            </Box>
          </div>
        </MenuItem>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            contain: "layout",
          }}
        >
          <MenuItem
            active={isActive}
            className="swt-topbar-links"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            rel="noopener noreferrer"
          >
            <div className="swt-topbar-links-content">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  className="swt-topbar-links-title"
                  color={isActive ? "#fff" : ""}
                >
                  {title}
                </Typography>
              </Box>
            </div>
          </MenuItem>
          {isOpen && subItems && (
            <Box
              sx={{
                position: "fixed",
                width: "100%",
                marginTop: "100px",
              }}
            >
              {subItems.map((subItem, index) => {
                const isEditUserRoute = subItem.path.startsWith('gestion-de-usuarios/editar-usuario');
                return (
                  <MenuItem
                    key={index}
                    active={subItem.path === location.pathname.substring(1)}
                    className="swt-topbar-links-sub-item"
                    onClick={() => {
                      if (!isEditUserRoute) {
                        navigate(subItem.path);
                        setIsOpen(!isOpen)
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ fontFamily: "Encode Sans" }}
                        className="swt-topbar-links-sub-item-title"
                      >
                        {subItem.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

const getHeaders = (menu, navMenu, path) => {
  const matchRoute = (itemPath, currentPath) => {
    const regex = new RegExp(`^${itemPath.replace(/:\w+/g, "[a-zA-Z0-9-]+")}$`);
    return regex.test(currentPath);
  };

  for (let item of menu) {
    if (matchRoute(item.path, path)) {
      return {
        headerTitle: item.headerTitle || "Título no encontrado",
        headerSubTitle: item.headerSubTitle || "Subtítulo no encontrado",
      };
    }

    if (item.subItems) {
      const foundSubItem = item.subItems.find((subItem) =>
        matchRoute(subItem.path, path)
      );
      if (foundSubItem) {
        return {
          headerTitle: foundSubItem.headerTitle || "Título no encontrado",
          headerSubTitle:
            foundSubItem.headerSubTitle || "Subtítulo no encontrado",
        };
      }
    }
  }

  for (let item of navMenu) {
    if (matchRoute(item.path, path)) {
      return {
        headerTitle: item.headerTitle || "Título no encontrado",
        headerSubTitle: item.headerSubTitle || "Subtítulo no encontrado",
      };
    }

    if (item.subItems) {
      const foundSubItem = item.subItems.find((subItem) =>
        matchRoute(subItem.path, path)
      );
      if (foundSubItem) {
        return {
          headerTitle: foundSubItem.headerTitle || "Título no encontrado",
          headerSubTitle:
            foundSubItem.headerSubTitle || "Subtítulo no encontrado",
        };
      }
    }
  }
  return {
    headerTitle: "Título no encontrado",
    headerSubTitle: "Subtítulo no encontrado",
  };
};

function Topbar(props) {
  const { isNavbarCollapsed, account,setAccount,api } = props;
  const [menu, setMenu] = useState([]);
  const [navMenuData, setNavMenuData] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [cantClaim,setCantClaim] = useState(0)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let location = useLocation();

  const { headerTitle, headerSubTitle } = getHeaders(
    menu,
    navMenuData,
    location.pathname.substring(1)
  );

  const handleSearch = (searchTerm) => {
    console.log("Buscando:", searchTerm);
  };

  useEffect(() => {
    const filteredMenu = MenuData.filter((item) =>
      item.rolesAllowed.includes(account["roles"][0].name)
    );
    setMenu(filteredMenu);
    api(CANT_CLAIM_HV_IVE).then(({ ok, body }) => {
          if (ok) {
            setCantClaim(body.data.total_claims_hv);
          }
        });
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setCurrentPath(currentPath);
  }, [location]);

  return (
    <Box className="swt-topbar">
      <Navbar navMenuData={navMenuData} setNavMenuData={setNavMenuData} />
      <Box sx={{ width: "100%", p: "10px" }}>
        <Box
          sx={{
            justifyContent: "right",
            display: "flex",
            flexDirection: "row",
            mb: "5px"
          }}
        >
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",mr:"20px",cursor:"pointer"}} onClick={()=>navigate('/estandares-y-protocolos')}>
            <img alt="user-profile" src={`../../assets/home/folder-open.svg`} style={{ width: "24px",height:"24px" }} />
            <Typography sx={{fontSize:"14px",fontWeight:"400",ml:"5px"}}>Estándares y protocolos</Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <ContactSupportIcon sx={{color:"#159AB5"}} />
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Encode Sans",
              }}
              color="#000"
            >
              Ayuda
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "50px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                marginRight: "10px",
                fontFamily: "Encode Sans",
              }}
              color="#000"
            >
              Bienvenido nuevamente
            </Typography>
            <div style={{cursor:'pointer'}} onClick={()=> setMenuOpen(!isMenuOpen)}>
              <Avatar
                  src={
                    process.env.REACT_APP_BACKEND_URL_MEDIA+account.profile_image
                  }
                  sx={{
                    width: "50px",
                    height: "35px",
                    borderRadius: "20px",
                  }}
                />
            </div>
            <ProfileMenuContainer isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}/>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
            p: "20px",
            justifyContent: "space-between",
            borderRadius:"15px"
          }}
        >
          <Typography
            sx={{ fontSize: "22px", ml:"10px",fontWeight: "600", fontFamily: "Encode Sans" }}
            color="#fff"
          >
            Tablero de gestión administrativa
          </Typography>
          <SearchBar onSearch={handleSearch} />
        </Box>
        <Menu iconShape="square">
          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            {menu.map((elem, index) => {
              const isActive = elem.path.split("/")[0] === currentPath;
              if (!elem.show) return null;
              return (
                <Item
                  key={index}
                  title={elem.title}
                  to={`/${elem.path}`}
                  isActive={isActive}
                  colors={colors}
                  subItems={elem.subItems}
                  cantClaim={cantClaim}
                />
              );
            })}
          </Box>
        </Menu>
        <Box
          sx={{
            borderRadius: "20px",
            backgroundColor: "#fff",
            marginTop: "20px",
            p: "30px",
          }}
        >
          <Typography
            sx={{ fontFamily: "Encode Sans", fontWeight: "600", fontSize: "22px" }}
          >
            {headerTitle}
          </Typography>
          <Typography
            sx={{ fontFamily: "Encode Sans", fontWeight: "300", fontSize: "16px" }}
          >
            {headerSubTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
