import { useEffect, useState } from "react";
import { Box, IconButton, Typography,Avatar } from "@mui/material";
import "./Topbar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ProfileMenuContainer from "components/ProfileMenu";
import Grid from "@mui/material/Grid2";


function Topbar(props) {
  const { isNavbarCollapsed, account,setAccount,api } = props;
  const [currentPath, setCurrentPath] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setCurrentPath(currentPath);
  }, [location]);

  return (
    <Grid 
    container 
    spacing={2} 
    className="swt-topbar">
      <Grid 
      item="true" 
      size={{ xs: 12, sm: 3, md: 3 }}
      sx={{p:"10px",display: "flex",flexDirection: "column",alignItems: "center",justifyContent:"end"}}
      >
        <a href="/inicio" >
            <img
              alt="logo"
              src={`../../logo.svg`}
              style={{
                width:"100%",
                maxHeight:"140px",
              }}
            />
        </a>
        </Grid>
      <Grid 
      item="true"  
      size={{ xs: 12, sm: 9, md: 9 }}
      sx={{ width: "100%", p: "10px" }}>
        <Box
          sx={{
            justifyContent: "right",
            display: "flex",
            flexDirection: "row",
            mb: "5px"
          }}
        >
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",mr:"20px",cursor:"pointer"}} onClick={()=>navigate('/estandares-y-protocolos')}>
            <img alt="user-profile" src={`../../icons/folder.svg`} style={{ width: "24px",height:"24px" }} />
            <Typography sx={{fontSize:"14px",fontWeight:"400",ml:"5px"}}>Biblioteca</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                marginRight: "10px",
                fontFamily: "Encode Sans",
              }}
              color="#000"
            >
              Bienvenido nuevamente
            </Typography>
            <div style={{cursor:'pointer'}} onClick={()=> setMenuOpen(!isMenuOpen)}>
              <Avatar
                  src={
                    process.env.REACT_APP_BACKEND_URL_MEDIA+account.profile_image
                  }
                  sx={{
                    width: "50px",
                    height: "35px",
                    borderRadius: "20px",
                  }}
                />
            </div>
            <ProfileMenuContainer isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}/>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
            p: "20px",
            justifyContent: "space-between",
            borderRadius:"15px"
          }}
        >
          <Typography
            sx={{ fontSize: "22px", ml:"10px",fontWeight: "600", fontFamily: "Encode Sans" }}
            color="#fff"
          >
            Tablero de gestión administrativa
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Topbar;
