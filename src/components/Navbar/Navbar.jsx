import { useState, useContext, useEffect } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Navbar.scss";
import { AppContext } from "context/AppContext";
import Grid from "@mui/material/Grid2";
import { MenuDataNav } from "./MenuDataNav.ts";
import { MenuData } from "./MenuData.ts";
import GridViewIcon from "@mui/icons-material/GridView";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import TrafficRoundedIcon from "@mui/icons-material/TrafficRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { CANT_CLAIM_HV_IVE } from "constant/endpoints";

const ItemNav = ({
  index,
  title,
  to,
  isActive,
  subItems,
  isOpen,
  setOpenSubMenu,
}) => {
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpenSubMenu((prev) => (prev === index ? null : index));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpenSubMenu(null);
  };
  const handleIcon = (icon) => {
    const icons = {
      "/inicio": <HomeOutlinedIcon sx={{ marginRight: "10px" }} />,
      "/perfil": <PersonOutlineOutlinedIcon sx={{ marginRight: "10px" }} />,
      "/mesa-de-entrada": <GridViewIcon sx={{ marginRight: "10px" }} />,
      "/archivados": <FolderOutlinedIcon sx={{ marginRight: "10px" }} />,
      "/derivados": <IosShareRoundedIcon sx={{ marginRight: "10px" }} />,
      "/configuracion": <SettingsOutlinedIcon sx={{ marginRight: "10px" }} />,
      "configuracion/sistema-de-semaforos": (
        <TrafficRoundedIcon sx={{ marginRight: "10px" }} />
      ),
      "configuracion/datos-organismos": (
        <ApartmentRoundedIcon sx={{ marginRight: "10px" }} />
      ),
    };
    return icons[icon];
  };

  return (
    <>
      <MenuItem
        active={isActive}
        className="swt-navbar-links"
        component={
          !subItems && (
            <Link
              to={to}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(to)}
            />
          )
        }
        rel="noopener noreferrer"
      >
        <div className="swt-navbar-links-content">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {handleIcon(to)}
            <Typography
              className="swt-navbar-links-title"
              color={isActive ? "#fff" : ""}
            >
              {title}
            </Typography>
          </Box>
          {subItems && (
            <IconButton onClick={handleToggle}>
              {isOpen ? (
                <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          )}
        </div>
        {isOpen && subItems && (
          <Box
            sx={{
              background: "#00AEC3",
              width: "100%",
              position: "absolute",
              zIndex: "100",
              borderRadius: "10px",
              left: "0",
              marginTop: "6px",
            }}
          >
            {subItems.map((subItem, index) => (
              <MenuItem
                key={index}
                active={location.pathname === `/${subItem.path}`}
                sx={{ fontSize: "10px" }}
                className="swt-navbar-sub-links"
                onClick={() => handleNavigation(subItem.path)}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {handleIcon(subItem.path)}
                  <Typography className="swt-navbar-sub-links-title">
                    {subItem.title}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
        )}
      </MenuItem>
    </>
  );
};
const Item = ({ title, to, isActive, subItems, cantClaim }) => {
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
          className={`swt-topbar-links ${
            title === "Reclamos HV" ? "nav-hv" : ""
          }`}
          onClick={() => handleTo()}
          component={<Link to={to} />}
          rel="noopener noreferrer"
        >
          {title === "Reclamos HV" && cantClaim > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                right: "15px",
                background: "#B31EA4",
                width: "24px",
                borderRadius: "50%",
                marginBottom: { xs: "20px", md: "0px" },
                textAlign: "center",
                animation: "blink 0.7s infinite",
                "@keyframes blink": {
                  "100%": { opacity: 1, transform: "scale(1.3)" },
                },
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>{cantClaim}</Typography>
            </Box>
          )}
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
                marginTop: "101px",
                borderRadius: "10px",
                backgroundColor: "#00AEC3",
              }}
            >
              {subItems.map((subItem, index) => {
                const isEditUserRoute = subItem.path.startsWith(
                  "gestion-de-usuarios/editar-usuario"
                );
                return (
                  <MenuItem
                    key={index}
                    active={subItem.path === location.pathname.substring(1)}
                    className="swt-topbar-links-sub-item"
                    onClick={() => {
                      if (!isEditUserRoute) {
                        navigate(subItem.path);
                        setIsOpen(!isOpen);
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
function Navbar(props) {
  const { api, navMenuData, setNavMenuData } = props;
  const [menu, setMenu] = useState([]);
  const [cantClaim, setCantClaim] = useState(0);
  const { isNavbarCollapsed, setIsNavbarCollapsed } = props;
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { account } = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState("");

  let location = useLocation();
  const { headerTitle, headerSubTitle } = getHeaders(
    menu,
    navMenuData,
    location.pathname.substring(1)
  );
  useEffect(() => {
    const filteredMenu = MenuDataNav.filter((item) =>
      item.rolesAllowed.includes(account["roles"][0].name)
    );
    setNavMenuData(filteredMenu);
    const filteredMenuTop = MenuData.filter((item) =>
      item.rolesAllowed.includes(account["roles"][0].name)
    );
    setMenu(filteredMenuTop);
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
    <>
      <Grid
        container
        spacing={1}
        className={`swt-navbar ${isNavbarCollapsed ? "collapsed" : ""}`}
      >
        <Grid item="true" size={{ xs: 12, sm: 3, md: 3 }}>
          <Menu iconShape="square" className="swt-navbar-content">
            {navMenuData.map((elem, index) => {
              const isActive = location.pathname.startsWith(`/${elem.path}`);
              return (
                <ItemNav
                  key={index}
                  index={index}
                  title={elem.title}
                  to={`/${elem.path}`}
                  isActive={isActive}
                  subItems={elem.subItems}
                  isOpen={openSubMenu === index}
                  setOpenSubMenu={setOpenSubMenu}
                />
              );
            })}
          </Menu>
        </Grid>
        <Grid
          item="true"
          size={{ xs: 12, sm: 9, md: 9 }}
          sx={{ height: "auto" }}
        >
          <Grid item="true" size={{ xs: 12, sm: 12, md: 12 }}>
            <Menu iconShape="square">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  gap: "20px",
                }}
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
                      subItems={elem.subItems}
                      cantClaim={cantClaim}
                    />
                  );
                })}
              </Box>
            </Menu>
          </Grid>
          <Grid
            item="true"
            size={{ xs: 12, sm: 12, md: 12 }}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              marginTop: "20px",
              p: "30px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              maxHeight: "155px",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontWeight: "600",
                fontSize: "22px",
              }}
            >
              {headerTitle}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontWeight: "300",
                fontSize: "16px",
              }}
            >
              {headerSubTitle}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Navbar;
