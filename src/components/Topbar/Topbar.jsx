import { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import "./Topbar.scss";
import { tokens } from "../../theme";
import Navbar from "components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import PersonIcon from "@mui/icons-material/Person";
import { styled, alpha } from "@mui/material/styles";
import SearchBar from "./SearchComponent";
import { MenuData } from "./MenuData.ts";
import ProfileMenuContainer from "components/ProfileMenu";

const Item = ({ title, to, icon, colors, isActive, subItems }) => {
  const iconPath = `../../icons/${icon}.svg`;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const handleTo = () => {
    navigate(to);
  };
  let location = useLocation();
  const currentPath = location.pathname;
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
              handleTo();
              setIsOpen(!isOpen);
            }}
            component={<Link to={to} />}
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
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ fontFamily: "Poppins" }}
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
    const regex = new RegExp(`^${itemPath.replace(/:\w+/, "\\w+")}$`);
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
  const { isNavbarCollapsed, account,setAccount } = props;
  const [menu, setMenu] = useState([]);
  const [navMenuData, setNavMenuData] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <ContactSupportIcon sx={{color:"#159AB5"}} />
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Poppins",
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
                fontFamily: "Poppins",
              }}
              color="#000"
            >
              Bienvenido nuevamente
            </Typography>
            <div style={{cursor:'pointer'}} onClick={()=> setMenuOpen(!isMenuOpen)}>
              <img alt="user-profile" src={`../../assets/examples/user-profile.png`} style={{ width: "50px",height:"35px",borderRadius:"20px" }} />
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
            sx={{ fontSize: "22px", ml:"10px",fontWeight: "600", fontFamily: "Poppins" }}
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
              return (
                <Item
                  key={index}
                  title={elem.title}
                  to={`/${elem.path}`}
                  isActive={isActive}
                  colors={colors}
                  subItems={elem.subItems}
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
            sx={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "22px" }}
          >
            {headerTitle}
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "16px" }}
          >
            {headerSubTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
