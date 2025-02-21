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
      <div style={{display:"flex"}}>
        <img
          src={`../../footer.png`} 
          alt="footer"
          style={{width: "100%"}}
        />
      </div>
    </main>
  )
};

export default Layout;