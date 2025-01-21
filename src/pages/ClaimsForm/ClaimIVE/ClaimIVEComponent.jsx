import React, { useState } from "react";
import { Box, Typography, useTheme, Divider, Button,Link } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tokens } from "theme";
import "./ClaimIVEStyles.scss";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

function ClaimIVEComponent(props) {
  const { setStartForm } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

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
            <span style={{ color: "#00AEC3" }}>tu derecho.</span>
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
                "url(../../assets/claims/ive/img-1.png) lightgray 50% / cover no-repeat",
              mt: "66px",
              height: "408px",
              width: "404px",
            }}
          />
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
              marginTop: "10px",
              "&:hover": {
                color: "#000",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px #00000040",
              },
            }}
          >
            Volver
          </Button>
        </Grid>
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6}}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "550px",
          }}
        >
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              Acceso a la Interrupción Voluntaria del Embarazo IVE - Ley N° 27.610
              Garantiza el derecho de las y los consumidores a acceder a la práctica, en la provincia de Buenos Aires y en todo el país, respetando la privacidad, confidencialidad y decisión.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                >Esta ley obliga a obras sociales y prepagas a incluir en el Programa Médico Obligatorio el conjunto de prácticas y prestaciones que prevé. 
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
              >
              Si te obstaculizan la práctica, dilatan el trámite, no te dan información clara y precisa, incumplen el trato digno y equitativo o bien no se cumple con la derivación de la consulta a la institución que pueda realizar la práctica, tenés derecho a denunciar y el prestador debe cumplir con su obligación dentro de los 10 días de iniciado el reclamo. 
              </Typography>
              <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              Esos incumplimientos van en contrario de los derechos de las y los consumidores incluidos y por eso en Defensa de las y los Consumidores contamos con abogados y abogadas que te podrán orientar, asesorar, dar asistencia técnica y acompañar durante el proceso. 
              </Typography>
              <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              Ante cualquier consulta llamá al 148 o escribí a 
              </Typography>
              <a 
                href={`mailto:infoconsumidor@mp.gba.gov.ar`} 
                style={{ textDecoration: 'underline' }}
              >
                infoconsumidor@mp.gba.gov.ar
              </a>
            <Box sx={{display:"flex",justifyContent:"center"}}>
              <Button
                onClick={() => setStartForm(true)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A83E83",
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
                    backgroundColor: "#A83E83",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                }}
              >
                Iniciar reclamo
              </Button>
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClaimIVEComponent;
