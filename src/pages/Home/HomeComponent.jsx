import React ,{ useState }from "react";
import Content from "components/Content";
import { Grid, Box, Typography ,useTheme, Divider, Button} from "@mui/material";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { tokens } from "../../theme";

function HomeComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (    
    <Content className="swt-dashboard" isLoaded="true">
        <Box sx={{margin:"100px 200px"}}>
            <Typography sx={{fontWeight:"700",fontSize:"48px"}}>
                Gestiona los reclamos de manera más eficiente y rapida.
            </Typography>
            <Divider></Divider>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:"space-between",marginTop:'30px'}}>
                <Box sx={{width:"60%",pr:"30px"}}>
                    <Typography sx={{fontWeight:"600",fontSize:"15px",}}>
                       Eficiencia
                    </Typography>
                    <Typography sx={{fontWeight:"700",fontSize:"48px",margin:"30px 0px"}}>
                        Beneficios del CRM para ciudadanos y administradores
                    </Typography>
                    <Typography sx={{fontWeight:"400",fontSize:"18px"}}>
                        Nuestro ERP mejora la trazabilidad de los reclamos, garantizando un seguimiento claro y efectivo. Además, optimiza la resolución de problemas, facilitando la comunicación entre usuarios.
                    </Typography>
                    <Box sx={{display:'flex',flexDirection:'row', margin:"30px 0px"}}>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <img src="../../assets/home/item-1.svg" alt="item-1" style={{width:"44px"}}/>
                            <Typography sx={{fontWeight:"700",fontSize:"20px",mt:"20px"}}>
                            Trazabilidad Garantizada
                            </Typography>
                            <Typography sx={{fontWeight:"400",fontSize:"16px"}}>
                            Sigue cada reclamo desde su inicio hasta su resolución final.
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <img src="../../assets/home/item-2.svg" alt="item-2" style={{width:"44px"}}/>
                            <Typography sx={{fontWeight:"700",fontSize:"20px",mt:"20px"}}>
                            Resolución Eficiente
                            </Typography>
                            <Typography sx={{fontWeight:"400",fontSize:"16px"}}>
                            Reduce los tiempos de espera y mejora la satisfacción del ciudadano.
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        sx={{
                            borderRadius: "50px",
                            color: "#000",
                            padding: "9px 30px",
                            fontFamily: "Encode Sans",
                            fontSize: "16px",
                            textTransform: "none",
                            border: "1px solid #E81F76",
                            backgroundColor: "none",
                            ":hover": {
                            },
                        }}
                        >
                        Aprendé rapidamente como usarlo
                    </Button>
                </Box>
                <Box width={{width:"50%",height:"640px",background: 'url("../../assets/home/img-1.png") lightgray 50% / cover no-repeat'}}>
                </Box>
            </Box>

        </Box>
    </Content>
  );
}

export default HomeComponent;
