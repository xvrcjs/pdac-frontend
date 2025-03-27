import { useState, useContext, useEffect } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Navbar.scss";
import { AppContext } from "context/AppContext";
import { tokens } from "../../theme";
import Cookies from "js-cookie";
import { MenuData } from "./MenuData.ts";
import GridViewIcon from "@mui/icons-material/GridView";
import CircleIcon from '@mui/icons-material/Circle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import TrafficRoundedIcon from '@mui/icons-material/TrafficRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

const Item = ({ index,title, to, colors, isActive, subItems,isOpen, setOpenSubMenu }) => {
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpenSubMenu(prev => (prev === index ? null : index)); 
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
      "configuracion/sistema-de-semaforos": <TrafficRoundedIcon sx={{ marginRight: "10px" }} />,
      "configuracion/datos-organismos": <ApartmentRoundedIcon sx={{ marginRight: "10px" }} />
    }
    return icons[icon]
  }
  return (
    <>
      <MenuItem
        active={isActive}
        className="swt-navbar-links"
        component={!subItems && <Link to={to} sx={{cursor:"pointer"}} onClick={()=>navigate(to)}/>}
        rel="noopener noreferrer"
      >
        <div className="swt-navbar-links-content">
          <Box sx={{ display: "flex", alignItems: "center" }} >
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
          <Box sx={{background:"#00AEC3",width:"100%",position:"absolute",zIndex:"100",borderRadius:"10px",left:"0",marginTop: "6px"}} >
            {subItems.map((subItem, index) => (
              <MenuItem
                key={index}
                active={location.pathname === `/${subItem.path}`}
                sx={{fontSize:"10px"}}
                className="swt-navbar-sub-links"
                onClick={() => handleNavigation(subItem.path)}
              >
                <Box sx={{ display: "flex", alignItems: "center"}}>
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

function Navbar(props) {
  const { navMenuData, setNavMenuData } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isNavbarCollapsed, setIsNavbarCollapsed } = props;
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { account } = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState("");
  const mode = Cookies.get("theme");

  let location = useLocation();
  useEffect(() => {
    const filteredMenu = MenuData.filter((item) =>
      item.rolesAllowed.includes(account["roles"][0].name)
    );
    setNavMenuData(filteredMenu);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setCurrentPath(currentPath);
  }, [location]);

  return (
    <>
      <div className={`swt-navbar ${isNavbarCollapsed ? "collapsed" : ""}`}>
        <Box className="swt-navbar-logo">
          <a href="/inicio" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <img
                alt="logo"
                src={`../../logo.svg`}
                style={{
                  maxWidth: "100%",
                }}
              />
          </a>
        </Box>
        <Menu iconShape="square" className="swt-navbar-content">
            {navMenuData.map((elem, index) => {
              // const isActive = location.pathname === `/${elem.path}`
              const isActive = location.pathname.startsWith(`/${elem.path}`);
              return (
                <Item
                  key={index}
                  index={index}
                  title={elem.title}
                  to={`/${elem.path}`}
                  isActive={isActive}
                  colors={colors}
                  subItems={elem.subItems}
                  isOpen={openSubMenu === index}
                  setOpenSubMenu={setOpenSubMenu}
                />
              );
            })}
        </Menu>
      </div>
    </>
  );
}

export default Navbar;
