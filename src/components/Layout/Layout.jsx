import React, { useState,useContext } from "react";
import { Outlet } from 'react-router-dom';
import NavbarLayout from "../Navbar";
import TopbarLayout from "../Topbar";
import "./LayoutStyles.scss";
import { useTheme,Box} from "@mui/material";
import {tokens } from "../../theme";
import { AppContext } from "context/AppContext.js";


function Layout({title}) {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { account,setAccount } = useContext(AppContext);

  return (
    <main className="swt-layout-main">
      <TopbarLayout
        isNavbarCollapsed={isNavbarCollapsed}
        setIsNavbarCollapsed={setIsNavbarCollapsed}
        account={account}
        setAccount={setAccount}
      />    
      <div className={`swt-layout-content ${isNavbarCollapsed ? "collapsed" : ""}`}>
        <Outlet />
      </div>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: { xs: "30px", sm: "40px", md: "50px" },
          width: "100%",
        }}
      />
    </main>
  )
};

export default Layout;