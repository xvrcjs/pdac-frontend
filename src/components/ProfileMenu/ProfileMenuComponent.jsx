import React, {useContext} from "react";
import "./ProfileMenuStyles.scss";
import { Typography , useTheme} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext } from "../../theme";

function ProfileMenuComponent(props) {
  const {
    isMenuOpen,
    handleCloseMenu,
    signout,
    account,
    navigate,
    permissions,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    handleCloseMenu(false);
  };
  
  return (
    <Menu
      onClose={handleClose}
      onClick={handleClose}
      id="account-menu"
      open={isMenuOpen}
      anchorEl={anchorEl}
      sx= {{
        overflow:"hidden",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 3,
        ml: -2,
        "& .MuiPaper-root": {
          minWidth: 180,
          borderRadius: 0,
        },
        "& .MuiAvatar-root": {
          width: '100%',
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        "&:before": {
          display: "block",
          position: "absolute",
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <MenuItem onClick={()=>navigate("/perfil")} >
        {account.full_name}
      </MenuItem>
      <Divider />
      <MenuItem onClick={signout} >
        <ListItemIcon>
          <Logout  fontSize="small" />
        </ListItemIcon>
        Salir
      </MenuItem>
    </Menu>
  );
}
export default ProfileMenuComponent;
