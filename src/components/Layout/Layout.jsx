import React, { useState,useContext } from "react";
import { Outlet } from 'react-router-dom';
import NavbarLayout from "../Navbar";
import TopbarLayout from "../Topbar";
import "./LayoutStyles.scss";
import { AppContext } from "context/AppContext.js";


function Layout({title}) {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [navMenuData, setNavMenuData] = useState([]);
  const { account,setAccount,api } = useContext(AppContext);

  return (
    <main className="swt-layout-main">
      <TopbarLayout
        isNavbarCollapsed={isNavbarCollapsed}
        setIsNavbarCollapsed={setIsNavbarCollapsed}
        account={account}
        api={api}
        setAccount={setAccount}
      /> 
      <NavbarLayout 
        api={api} 
        navMenuData={navMenuData} 
        setNavMenuData={setNavMenuData}
      />
      <div className={`swt-layout-content ${isNavbarCollapsed ? "collapsed" : ""}`}>
        <Outlet />
      </div>
      <div style={{display:"flex"}}>
        <img
          src={`../../footer.png`} 
          alt="footer"
          style={{width: "100%",backgroundColor:"#fff"}}
        />
      </div>
    </main>
  )
};

export default Layout;