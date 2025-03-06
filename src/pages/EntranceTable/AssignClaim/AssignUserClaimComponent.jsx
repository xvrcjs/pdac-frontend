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
          minHeight:"500px",
          contain:"content",
          "& .MuiDataGrid-main": {
            backgroundColor: "#fff",
            border: "unset",
          },
          "& .MuiDataGrid-cell": {
            border: "unset",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "10px",
            border: "1px solid #646464",
            marginTop: "2px !important",
            width: "99%",
            cursor:"pointer"
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
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            fontFamily: "Encode Sans",
            color: "#fff",
            fontSize: "12px",
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
        },
      },
    },
  },
});
function AssignUserClaimComponent(props) {
  const {
    users,
    handleOnSubmit,
    setShowTypeAssignClaim,
    showTypeAssignClaim,
    showTableUser,
    setShowTableUser
  } = props;

  const [userSelected,setUserSelected] = useState("");
  const [showConfirmSendAssignment,setShowConfirmSendAssignment] = useState(false)
  const [rows,setRows] = useState([])

  const columns = [
    {
      field: "full_name",
      headerName: "Nombre y Apellido",
      flex: 1,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
    {
      field: "is_active",
      headerName: "Estado del usuario",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        params.value === true ? "Activo" : "Inactivo"
      ),
    },
    {
      field: "details",
      headerName: "Reclamos asignados",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        params.value.cant_claims_assigned
      ),
    },
    {
      field: "user",
      headerName: "EMAIL",
      flex: 1,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        params.value.email
      ),
    },
  ];

  const handleFilter = (e) => {
    const text = e.target.value;
    const filteredRows = users.filter((c) => {
      return c.full_name.toLowerCase().includes(text.toLowerCase());
    });
    setRows(filteredRows);
  };

  function CustomNoRowsOverlay() {
    return (
      <Box sx={{height:"500px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <p className="swt-manager-filter-empty-title">
          No se encontraron resultados.
          Intenta realizar otra búsqueda.
        </p>
      </Box>
    );
  }  


  useEffect(() => {
      setRows(users);
  }, [users]);

  return (
    <>
      <Dialog
        open={showTableUser}
        onClose={() => setShowTableUser(!showTableUser)}
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
          Asignación Directa a Usuario de Defensa al Consumidor
        </DialogTitle>
        <DialogContent
          sx={{
            "&.MuiDialogContent-root": {
              overflowY: "unset",
            },
          }}
        >
          <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <DialogContentText
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "17px",
                fontWeight: "200",
                mb: "50px",
                width:"auto"
              }}
              id="alert-dialog-description"
            >
              Seleccione el usuario deseado para la asignación del reclamo.
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 5,
                borderRadius: "5px",
              }}
            >
              <TextField
                placeholder="Buscar municipio"
                InputProps={{
                  endAdornment: (
                    <SearchIcon
                      sx={{
                        fill: "#A2A2BD",
                        marginRight: "8px",
                      }}
                    />
                  ),
                }}
                sx={{
                  m: 0,
                  p: 0,
                  fontSize:"16px",
                  backgroundColor: "#FFF",
                  borderRadius: "50px",
                  border: "1px solid #E81F76",
                  "& fieldset": {
                    borderRadius: "5px",
                  },
                  "& input": {
                    paddingY: "12px",
                    fontFamily: "Encode Sans",
                  },
                  "& .MuiOutlinedInput-notchedOutline":{
                    border:"unset !important",
                  },
                  width: "350px",
                }}
                onChange={handleFilter}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "500px",
            }}
          >
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
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => {
              setUserSelected("")
              setShowTableUser(!showTableUser)
              setShowTypeAssignClaim(!showTypeAssignClaim)
            }}
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
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              "&.Mui-disabled": {
                backgroundColor: "#ccc",
                cursor: "not-allowed",
                color: "#fff",
              }
            }}
            disabled={userSelected === ""}
            onClick={() => (setShowTableUser(!showTableUser),setShowConfirmSendAssignment(!showConfirmSendAssignment))}
          >
            Confirmar
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
            padding: "20px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
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
          ¿Desea confirmar la asignación?
          <br />
          <span style={{fontSize:"20px",fontWeight:"500"}}>Al aceptar, los cambios impactaran automáticamente en el sistema.</span>
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
            onClick={() => (setShowTableUser(!showTableUser),setShowConfirmSendAssignment(!showConfirmSendAssignment))}
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
            }}
            onClick={() => handleOnSubmit(userSelected)}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AssignUserClaimComponent;
