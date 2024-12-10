import React ,{ useState }from "react";
import Content from "components/Content";
import { Box, Typography ,useTheme, Divider, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { tokens } from "theme";
import { useNavigate } from "react-router-dom";

function HomeComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate()
  
  return (   
      <Box sx={{ backgroundColor: "#fff", padding: "50px" }}>
        <a href="/">
          <img
            alt="logo"
            src={`../../logo.svg`}
            style={{ height: "70px", marginTop: "20px" }}
          />
        </a>
        <Box sx={{ display: "flex", flexDirection: "column", mb:7}}>
          
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "3rem",
                fontWeight: "700",
                marginTop: "60px",
              }}
            >
              Nuestra misión: Proteger los derechos de las y los consumidores de la Prov de Buenos Aires.
            </Typography>
            <Typography
              sx={{
                minWidth: "60%",
                fontFamily: "Encode Sans",
                fontSize: "1.125rem",
                fontWeight: "400",
                marginTop: "30px",
                whiteSpace: "pre-line",
              }}
            >
                {"Nuestra visión es crear un entorno donde cada reclamo sea escuchado y resuelto de manera eficiente.\nEsperamos empoderar a los ciudadanos y fortalecer la confianza en la defensa del consumidor.\nHace tu reclamo a través de la Ventanilla Única Federal."}

            </Typography>
        </Box>
        <Grid container spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item="true"
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              p: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => navigate("formulario-comun")}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#00AEC3",
                color: "#FFF",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "700",
                width: "100%",
                textTransform: "capitalize",
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
          <Grid
            item="true"
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              p: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => navigate("formulario-ive")}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#A83E83",
                color: "#FFF",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "700",
                width: "100%",
                textTransform: "capitalize",
                "&:hover": {
                  color: "#FFF",
                  backgroundColor: "#A83E83",
                  boxShadow: "0px 4px 4px 0px #00000040",
                },
              }}
            >
              Iniciar reclamo IVE
            </Button>
          </Grid>
        </Grid>
        <Box
            sx={{ height: "400px", width: "100%",mt:7,background:"url(../../assets/claims/img-1.png) lightgray 50% / cover no-repeat",borderRadius: "136px 37px"
            }}
        />
      </Box>
  );
}

export default HomeComponent;
