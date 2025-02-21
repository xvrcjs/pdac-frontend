import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "theme";
import "./WelcomeStyles.scss";
import "utils/MainStyles.scss";
import { useNavigate } from "react-router-dom";

function WelcomeComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: "50px",
          width: "100%",
        }}
      ></Box>
      <Box sx={{ backgroundColor: "#fff", padding: "50px",paddingBottom:"0px" }}>
        <a href="/">
          <img
            alt="logo"
            src={`../../logo.svg`}
            style={{ height: "70px", marginTop: "20px" }}
          />
        </a>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "35px",
                fontWeight: "700",
                marginTop: "60px",
              }}
            >
              Te damos la <span style={{ color: "#00AEC3" }}>bienvenida</span>.
            </Typography>
            <Typography
              sx={{
                minWidth: "50%",
                fontFamily: "Encode Sans",
                fontSize: "25px",
                fontWeight: "500",
                marginTop: "70px",
              }}
            >
              Selecciona tu tipo de usuario
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "Encode Sans",
                fontWeight: "300",
                mt: "20px",
                width: "70%",
              }}
            >
              Inicia sesión para acceder a un sistema intuitivo que te permitirá gestionar tus expedientes de manera rápida y efectiva. 
            </Typography>
          </Box>
          <img
            alt="img-1"
            src={`../../assets/login/img-1.png`}
            style={{ height: "480px", width: "634px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              p: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px",
            }}
          >
            <img
              alt="item-1"
              src={`../../assets/login/item-1.svg`}
              style={{ height: "50px", width: "50px" }}
            />
            <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>
              Administrador Dirección Provincia
            </Typography>
            <Typography sx={{ fontWeight: "300", fontSize: "16px" }}>
              Administra los expedientes de manera integral, con seguimiento, asignación, revisión y trazabilidad.
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#666",
                color: "#FFF",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "400",
                width: "180px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  boxShadow: "0px 4px 4px 0px #00000040",
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Box
            sx={{
              p: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px",
            }}
          >
            <img
              alt="item-1"
              src={`../../assets/login/item-2.svg`}
              style={{ height: "50px", width: "50px" }}
            />
            <Typography sx={{ fontWeight: "700", fontSize: "24px" }}>
              Administrador OMIC
            </Typography>
            <Typography sx={{ fontWeight: "300", fontSize: "16px" }}>
              Asegura que cada expediente sea trabajado, de principio a fin, por el responsable adecuado del municipio.
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#666",
                color: "#FFF",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "400",
                width: "180px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  boxShadow: "0px 4px 4px 0px #00000040",
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Box
            sx={{
              p: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px",
            }}
          >
            <img
              alt="item-1"
              src={`../../assets/login/item-3.svg`}
              style={{ height: "50px", width: "50px" }}
            />
            <Typography sx={{ fontWeight: "700", fontSize: "24px" }}>
              Usuario de soporte Dirección Provincial
            </Typography>
            <Typography sx={{ fontWeight: "300", fontSize: "16px" }}>
              Colabora con las consultas técnicas, categorización y dudas de los reclamos.
            </Typography>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#666",
                color: "#FFF",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "400",
                width: "180px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  boxShadow: "0px 4px 4px 0px #00000040",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Box>
      <div style={{display:"flex"}}>
        <img
          src={`../../footer.png`} 
          alt="footer"
          style={{width: "100%"}}
        />
      </div>
    </>
  );
}

export default WelcomeComponent;
