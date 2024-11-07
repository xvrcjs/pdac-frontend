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

const Item = ({ title, to, icon, colors, isActive, subItems }) => {
  const iconPath = `../../icons/${icon}.svg`;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleTo = () => {
    navigate(to);
  };
  return (
    <>
      <MenuItem
        active={isActive}
        className="swt-navbar-links"
        onClick={() => handleTo()}
        component={<Link to={to} />}
        rel="noopener noreferrer"
      >
        <div className="swt-navbar-links-content">
          {/* <img src={iconPath} alt={title} className="swt-navbar-icon" /> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GridViewIcon sx={{ marginRight: "10px" }} />
            <Typography
              className="swt-navbar-links-title"
              color={isActive ? "#fff" : ""}
            >
              {title}
            </Typography>
          </Box>
          {subItems && (
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          )}
        </div>
      </MenuItem>
      {isOpen && subItems && (
        <Box sx={{ pl: 4 }}>
          {subItems.map((subItem, index) => (
            <MenuItem
              key={index}
              active={subItem.path === to}
              className="swt-navbar-links"
              onClick={() => navigate(subItem.path)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GridViewIcon sx={{ marginRight: "10px" }} />
                <Typography className="swt-navbar-links-title">
                  {subItem.title}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      )}
    </>
  );
};

function Navbar(props) {
  const { navMenuData, setNavMenuData } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isNavbarCollapsed, setIsNavbarCollapsed } = props;
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
          <a href="/" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <img
                alt="logo"
                src={`../../logo.svg`}
                style={{
                  maxWidth: "100%",
                }}
              />
          </a>
        </Box>
        <Menu iconShape="square">
          <Box sx={{ backgroundColor: "#417099" }}>
            {navMenuData.map((elem, index) => {
              const isActive = elem.path.split("/")[0] === currentPath;
              return (
                <Item
                  key={index}
                  title={elem.title}
                  to={`/${elem.path}`}
                  icon={
                    isActive
                      ? mode === "dark"
                        ? elem.icon + "-Active-Dark"
                        : elem.icon + "-Active-Light"
                      : elem.icon + "-Default"
                  }
                  isActive={isActive}
                  colors={colors}
                  subItems={elem.subItems}
                />
              );
            })}
          </Box>
        </Menu>
      </div>
    </>
  );
}

export default Navbar;
