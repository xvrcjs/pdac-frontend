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
                <Box sx={{width:"600px"}}>
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
                            <Typography sx={{fontWeight:"700",fontSize:"20px"}}>
                            Trazabilidad Garantizada
                            </Typography>
                            <Typography sx={{fontWeight:"400",fontSize:"16px"}}>
                            Sigue cada reclamo desde su inicio hasta su resolución final.
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Typography sx={{fontWeight:"700",fontSize:"20px"}}>
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
                            borderRadius: "1px",
                            color: "#000",
                            padding: "9px 30px",
                            fontFamily: "Encode Sans",
                            fontSize: "16px",
                            marginTop: "100px",
                            textTransform: "capitalize",
                            border: "2px solid #000",
                            backgroundColor: "none",
                            ":hover": {
                            },
                        }}
                        >
                        Aprendé rapidamente como usarlo
                    </Button>
                </Box>
                <Box sx={{width:"500px", backgroundColor:"#aaa"}}>
                    
                </Box>
            </Box>

        </Box>
    </Content>
  );
}

export default HomeComponent;
