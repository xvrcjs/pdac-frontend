import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const themeTable = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "unset",
          minHeight: "300px",
          contain: "content",
          "& .MuiDataGrid-main": {
            backgroundColor: "#fff",
            border: "unset",
          },
          "& .MuiDataGrid-cell": {
            border: "unset",
            minHeight: "50px",
            fontSize: "15px",
            borderBottom: "0.5px solid #ECEAEA",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiDataGrid-row": {
            color: "#000",
            cursor: "pointer",
            minHeight: "50px !important",
            height: "100%",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#1DBDCD4F",
            minHeight: "50px !important",
          },
          "& .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#00AEC3",
            borderRadius: "50px",
          },
          "& .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader": {
            borderBottom: "unset",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "unset",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00AEC3",
            fontFamily: "Encode Sans",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "18px",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "unset",
          },
          "& .Mui-selected": {
            backgroundColor: "#1DBDCD4F !important",
          },
          "& .MuiDataGrid-filler": {
            "--rowBorderColor:": "unset !important",
          },
        },
      },
    },
  },
});

function AssignTicketComponent(props) {
  const {
    users,
    handleOnSubmit,
    ticketSelected,
    ticketData,
    showAssignTicket,
    setShowAssignTicket
  } = props;

  const [userSelected,setUserSelected] = useState("");
  const [showConfirmSendAssignment,setShowConfirmSendAssignment] = useState(false)
  const [rows,setRows] = useState([])
  const levels = [{"value":"Nivel 1 (N1)","label":"N1"},{"value":"Nivel 2 (N2)","label":"N2"},{"value":"Nivel 3 (N3)","label":"N3"}]
  const [typeLevelSelected,setTypeLevelSelected] = useState("Nivel 1 (N1)")

  const columns = [
    {
      field: "full_name",
      headerName: "Agente",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
    {
      field: "support_level",
      headerName: "Nivel",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        params.value
      ),
    },
    {
      field: "assigned",
      headerName: "Asignados",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        params.value.cant_claims_assigned
      ),
    },
  ];

  function CustomNoRowsOverlay() {
    return (
      <Box sx={{height:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <p className="swt-manager-filter-empty-title">
          No se encontraron resultados.
          Intenta realizar otra búsqueda.
        </p>
      </Box>
    );
  }

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) => user.support_level === typeLevelSelected
    );
    setRows(filteredUsers);
  }, [users, typeLevelSelected]);

  useEffect(() => {
    if (ticketData?.support_level) {
      const level = levels.find(l => l.label.toLowerCase() === ticketData.support_level);
      if (level) {
        setTypeLevelSelected(level.value);
      }
    }
  }, [ticketData]);

  return (
    <>
      <Dialog
        open={showAssignTicket}
        onClose={() => setShowAssignTicket(!showAssignTicket)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            overflow: "unset",
            contain: "content",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "500",
          }}
          id="alert-dialog-title"
        >
          Gestión de tickets de soporte {">"} Asignación
        </DialogTitle>
        <DialogContent>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",background:"#ECEAEA",borderRadius:"5px",p:"25px",mb:"10px"}}>
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "17px",
                fontWeight: "200",
                width:"auto"
              }}
              id="alert-dialog-description"
            >
              Ticket pendiente de asignación:
            </Typography>
            <Typography
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "17px",
                fontWeight: "400",
                width:"auto",
                p:"10px 8px",
                backgroundColor:"#E81F76",
                color:"#fff",
                borderRadius:"5px",
                ml:"10px"
              }}
            >
              Nro de Ticket: <span style={{fontWeight:"500"}}>{ticketSelected}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "500px",
            }}
          >
            <Typography sx={{fontSize:"14px",fontWeight:"200"}}>Selecciona un agente de soporte para asignarle este ticket</Typography>
            <Box sx={{backgroundColor:"#ECEAEA",borderRadius:"5px",p:"10px"}}>
              <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Typography>Listado agentes de soporte</Typography>
                <Box sx={{display:"flex",flexDirection:"row",gap:1}}>
                  {levels.map((level,index)=>(
                    <Typography sx={{borderRadius:"19px 0px 0px 0px",backgroundColor:  level.value === typeLevelSelected ? "#00AEC3":"#D9D9D9",fontWeight:"500",p:"5px 40px",cursor:"pointer",color:level.value === typeLevelSelected ? "#fff":"#000"}} onClick={()=>setTypeLevelSelected(level.value)}>
                      {level.label}
                    </Typography>                
                  ))}
                </Box>
              </Box>
              <ThemeProvider theme={themeTable}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.uuid} // Usamos uuid como id
                  disableColumnMenu
                  disableColumnSorting
                  hideFooter
                  columnHeaderHeight={40}
                  onRowSelectionModelChange={(row)=>setUserSelected(row[0])}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "name", sort: "asc" }],
                    },
                  }}
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                  }}
                  rowHeight={33}
                />
              </ThemeProvider>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{mr:"30px"}}>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "14px",
              fontWeight: "700",
            }}
            onClick={() => {
              setUserSelected("")
              setShowAssignTicket(!showAssignTicket)
            }}
          >
            CANCELAR
          </Button>
          <Button
            sx={{
              borderRadius: "4px",
              backgroundColor: "#E81F76",
              color: "#fff",
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "700",
              p:"10px 19px",
              ml: "20px",
              textTransform: "capitalize",
              cursor: "pointer",
              "&.Mui-disabled": {
                backgroundColor: "#ccc",
                cursor: "not-allowed",
                color: "#fff",
              }
            }}
            disabled={userSelected === ""}
            onClick={() => (setShowAssignTicket(false),setShowConfirmSendAssignment(!showConfirmSendAssignment))}
          >
            ASIGNAR TICKET
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmSendAssignment}
        onClose={() => setShowConfirmSendAssignment(!showConfirmSendAssignment)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¿Desea confirmar la asignación de este ticket?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "200",
              mb: "50px",
              position: "relative",
            }}
            id="alert-dialog-description"
          >
            En caso de no querer confirmar la asignación, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => (setUserSelected(""),setShowConfirmSendAssignment(!showConfirmSendAssignment),setShowAssignTicket(true))}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => handleOnSubmit(userSelected)}
          >
            Asignar ticket
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AssignTicketComponent;
