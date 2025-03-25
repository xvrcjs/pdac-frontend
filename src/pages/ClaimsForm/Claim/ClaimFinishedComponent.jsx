import React, { useState } from "react";
import Content from "components/Content";
import { Box, Typography, useTheme, Divider, Button } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormComponent from "./Entities/FormComponent";
import { tokens } from "theme";
import "./ClaimStyles.scss";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

function ClaimFinishedComponent({idCreated}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <>
    <Box sx={{ backgroundColor: "#fff", padding: "10px 50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <img
            alt="logo"
            src={`../../logo.svg`}
            style={{ height: "70px", marginTop: "20px" }}
          />
        <img
            alt="logo"
            src={`../../logo-pba.png`}
            style={{ height: "100px", marginTop: "20px" }}
          />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center" }}>
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "3.1rem",
              fontWeight: "700",
              marginTop: "30px",
            }}
          >
            Su reclamo fue enviado con <span style={{color:"#07A4B4"}}>éxito</span>. 
          </Typography>
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "1.8rem",
              fontWeight: "400",
              marginTop: "50px",
              textAlign: "center",
              width: "60%"
            }}
          >
            Recibirá detalles y actualizaciones de su reclamo a su casilla de correo electrónico bajo el numero de reclamo: {idCreated}. 
          </Typography>
              <Button
                onClick={() => navigate("/genera-tu-reclamo")}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#00AEC3",
                  color: "#FFF",
                  padding: "9px 30px",
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontWeight: "700",
                  width: "100%",
                  textTransform: "capitalize",
                  maxWidth:"590px",
                  mt:"80px",
                  "&:hover": {
                    color: "#FFF",
                    backgroundColor: "#00AEC3",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                }}
              >
                Aceptar
              </Button>
      </Box>
    </Box>
    <div style={{display:"flex"}}>
        <img
          src={`../../footer.png`} 
          alt="footer"
          style={{width: "100%",position:"absolute",bottom: "0"}}
        />
    </div>
    </>
  );
}

export default ClaimFinishedComponent;
