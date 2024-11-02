import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Grid,
  Box,
  Typography,
  useTheme,
  Pagination,
  PaginationItem,
  Divider,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { tokens } from "../../theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  esES,
  // DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import DataGrid from "components/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ArchivedComponent(props) {
  const { archived } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [showConfirmReOpenClaim, setShowConfirmReOpenClaim] = useState(false);
  const [idClaimSelected, setIdClaimSelected] = useState("");
  // const [showDetails,setShowDetails] = useState(true)

  const CircularItem = ({ status }) => {
    const statusColors = {
      active: "green",
      inactive: "red",
      warning: "yellow",
      error: "black",
    };
    const color = statusColors[status] || "grey"; // Por defecto, gris si el estado no existe

    return (
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          backgroundColor: color,
          margin: "10px auto", // Centrado y espacio entre los items
        }}
      />
    );
  };
  const handleChangeStatus = (id) => {
    setIdClaimSelected(id);
    setShowConfirmReOpenClaim(!showConfirmReOpenClaim);
  };
  const handleSaveClaim = (event) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === idClaimSelected ? { ...row, status: "Reabrir" } : row
      )
    );
    setShowConfirmReOpenClaim(!showConfirmReOpenClaim);
  };
  const columns = [
    {
      field: "status_id",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      width: "70px",
      style: "background-color:#B1B1B1",
      align: "center",
      renderHeader: () => <CircularItem status="error" />,
      renderCell: (params) => <CircularItem status={params.value} />,
    },
    {
      field: "claim_id",
      headerName: "RECLAMO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      width: "200px",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
    {
      field: "assigned",
      headerName: "ASIGNADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "ESTADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            labelId={`select-label-${params.id}`}
            value={params.value}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              ".MuiOutlinedInput-notchedOutline-focused": { border: 0 },
            }}
            onChange={(event) => handleChangeStatus(params.id)}
          >
            <MenuItem value="Archivado">Archivado</MenuItem>
            <MenuItem value="Reabrir">Reabrir</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: "assigned_role",
      headerName: "ROL ASIGNADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      width: "600px",
    },
  ];

  const handleEdit = (id) => {
    console.log("Editando la fila", id);
  };
  useEffect(() => {
    setRows(archived);
    setOriginalRows(archived);
  }, [archived]);

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box sx={{ margin: "50px 50px" }}>
        <DataGrid rows={rows} columns={columns} handleEdit={handleEdit} />
      </Box>
      <Dialog
        open={showConfirmReOpenClaim}
        onClose={() => setShowConfirmReOpenClaim(!showConfirmReOpenClaim)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "&.MuiDialog-root .MuiDialog-paper": { padding: "40px 60px" } }}
      >
        <DialogTitle
          sx={{ fontFamily: "Poppins", fontSize: "22px", fontWeight: "300" }}
          id="alert-dialog-title"
        >
          ¿Está seguro de querer reabrir el reclamo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Al hacerlo, el mismo volverá al circuito de Mesa de entrada general.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#CCCCCC",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={() => setShowConfirmReOpenClaim(!showConfirmReOpenClaim)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#969494",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={handleSaveClaim}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Content>
  );
}

export default ArchivedComponent;

//CONFIGURAR MODELO DE DATOS DE SEMAFORO PARA QUE SEA CONFIGURABLE
// DESDE EL BACKEND Y DESPUES DESDE EL BACKOFFICE
//SIEMPRE EMPIEZA EN VERDE CUANDO SE ASIGNA POR PRIMERA VEZ

// EL CIRCULO FLASHERO ES HIPERVULNERABLE
// EL TRIANGULO DE ADENTRO REPRESENTA EL ESTADO
// COLOR GRIS ESTA ARCHIVADO Y FINALIZA EL SEMAFORO
