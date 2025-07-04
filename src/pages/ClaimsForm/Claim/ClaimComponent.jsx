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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ClaimComponent(props) {
  const { setStartForm } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [showInfo,setShowInfo]=useState(false)

  return (
    <Box sx={{ backgroundColor: "#fff", padding: "10px 50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "100px",
            border: "unset",
            color: "#57534E",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&:hover": {
              backgroundColor: "unset",
              border: "unset",
            },
          }}
          onClick={() => navigate("/genera-tu-reclamo")}
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
        <a href="/genera-tu-reclamo">
          <img
            alt="logo"
            src={`../../logo.svg`}
            style={{ height: "70px", marginTop: "20px" }}
          />
        </a>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "3.1rem",
              fontWeight: "700",
              marginTop: "30px",
            }}
          >
            Te brindamos información para que ejerzas{" "}
            <span style={{ color: "#00AEC3" }}>tus derechos</span> como
            consumidor.
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          p: "2.5rem 0rem",
        }}
      >
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "550px",
          }}
        >
          <Box
            sx={{
              borderRadius: "202px 0px",
              background:
                "url(../../assets/claims/img-2.png) lightgray 50% / cover no-repeat",
              mt: "66px",
              height: "408px",
              width: "404px",
            }}
          />
          {/* <Button
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: "50px",
              backgroundColor: "rgba(143, 136, 129, 0.00)",
              color: "#000",
              padding: "9px 30px",
              fontFamily: "Encode Sans",
              fontSize: "1rem",
              border: "1px solid #8F8881",
              fontWeight: "700",
              width: "50%",
              textTransform: "capitalize",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              marginTop: "10px",
              "&:hover": {
                color: "#000",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px #00000040",
              },
            }}
          >
            Volver
          </Button> */}
        </Grid>
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6}}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"center",
            // justifyContent: "space-between",
            height: "550px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "1rem",
                fontWeight: "700",
                mb:"40px"
              }}
            >
              Denuncia de defensa del consumidor
            </Typography>
            <ul>
              <li>
                Este formulario sólo se utiliza para registrar formalmente una denuncia. Si necesitás hacer una consulta, comunicate a la Línea 148 o al correo electrónico infoconsumidor@mp.gba.gov.ar
              </li>
              <li style={{ marginTop: "15px",marginBottom:"30px" }}>
                La autoridad asignada va a recibir tu reclamo para determinar si lo acepta o lo rechaza. Tu denuncia da inicio a una instancia conciliatoria con los proveedores denunciados, en la cual vos vas a formar parte y te vamos a avisar.
              </li>
            </ul>
            </Box>
            <Box sx={{display:"flex",alignItems:"center"}}>
              <Typography
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontWeight: "700",
                  mr:"20px"
                }}
              >
                Cuando no corresponde el reclamo por defensa del consumidor:
              </Typography>
              {!showInfo ? <KeyboardArrowDownIcon sx={{cursor:"pointer"}} onClick={()=>setShowInfo(!showInfo)}/>:<KeyboardArrowUpIcon sx={{cursor:"pointer"}} onClick={()=>setShowInfo(!showInfo)}/>}
            </Box>
            {showInfo &&
            <ul >
              <li>
                En contrataciones entre particulares, donde no interviene un proveedor, una empresa o un comerciante.
              </li>
              <li>
                En servicios brindados por profesionales con título universitario y matrícula habilitante, como médicos, abogados, odontólogos, etc.
              </li>
              <li>
                En cuestiones vinculadas con multas de tránsito, impuestos, tasas, etc.
              </li>
              <li>
                En conflictos entre vecinos.
              </li>
              <li>
                En contrataciones entre comerciantes, que incorporan un producto o servicio de modo directo al proceso comercial (relación entre un comercio y la tarjeta “Visa”, servicio de Posnet, compra de un tractor para trabajar, etc).
              </li>
            </ul>
            }
            
        </Grid>
      </Grid>
      <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "50px",
            }}
          >
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "rgba(143, 136, 129, 0.00)",
                  color: "#000",
                  padding: "9px 30px",
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  border: "1px solid #8F8881",
                  fontWeight: "700",
                  width: "50%",
                  textTransform: "capitalize",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#00AEC3",
                    border: "1px solid #00AEC3",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                }}
              >
                Volver
              </Button>
              </Grid>
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => setStartForm(true)}
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
                  "&:hover": {
                    color: "#FFF",
                    backgroundColor: "#00AEC3",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                }}
              >
                Iniciar reclamo
              </Button>
              </Grid>
              </Grid>
    </Box>
  );
}

export default ClaimComponent;
