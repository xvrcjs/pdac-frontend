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
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { tokens } from "../../theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataGrid from "./DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function EntranceTableComponent(props) {
  const { claims, setClaimSelected, setShowTypeAssignClaim,setShowMessageConfirmReAssign,account,currentPage,setCurrentPage,cantElement,setCantElement} = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);

  const CircularItem = ({ status="none" }) => {
    const statusColors = {
      verde: "green",
      rojo: "red",
      amarillo: "yellow",
      hv_verde: "green",
      hv_rojo: "red",
      hv_amarillo:"yellow",
      ive: "#B31EA4",
    };
    const color = statusColors[status] 
    
    return (
      <>
        {!status.includes("hv_") ? (
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: color,
              margin: "10px auto"
            }}
          />
        ) : (
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "black",
              border: "2px solid #1DBDCD",
              margin: "10px auto",
            }}
          >
            {/* Triángulo */}
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderBottom: `14px solid ${color}`,
                marginLeft: "27%",
                marginTop: "23%"
              }}
            />
          </Box>
        )}
      </>
    );
  };
  const columns = [
    {
      field: "type_of_claim",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      maxWidth: 100,
      style: "background-color:#B1B1B1",
      align: "center",
      renderCell: (params) => (
        <CircularItem status={params.value} />
      ),
    },
    {
      field: "id",
      headerName: "RECLAMO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      maxWidth: 150,
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
      renderCell: (params) => (
        <span style={{textTransform:'uppercase'}}>{params.value}</span>
      ),
    },
    {
      field: "status",
      headerName: "ESTADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span style={{textTransform:'uppercase'}}>{params.value === 'Active' ? 'Activo':'Inactivo'}</span>
      ),
    },
  ];
  const themeTable = createTheme({
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              backgroundColor: "#D9D9D9",
              borderColor: "#D9D9D9",
              "& .MuiDataGrid-main": {
                backgroundColor: "#D9D9D9",
                borderColor: "#D9D9D9",
              },
              // "& .MuiDataGrid-cell": {
              //   backgroundColor: "#D9D9D9",
              //   color: "#000",
              // },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#B1B1B1",
                fontFamily: "Encode Sans",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "18px",
                textAlign: "center",
              },
              "& .MuiDataGrid-toolbarContainer .MuiInput-root": {
                backgroundColor: "#D9D9D9",
                color: "#000",
              },
              "& .MuiDataGrid-gutters": {
                color: "#000",
              },
              "& .Mui-selected": {
                backgroundColor: "#56D2FF !important",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "transparent",
              },
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              color: "#000",
              "& svg": {
                color: "#000",
              },
            },
          },
        },
      },
  });
  useEffect(() => {
    if (claims) {
      setRows(claims);
      setOriginalRows(claims);
    }
  }, [claims, currentPage]);
  
  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box sx={{ margin: "50px 50px" }}>
        <ThemeProvider theme={themeTable}>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ minHeight: "600px" }}
            backgroundColor={"#fff"}
            noDataMessage="No hay reclamos para mostrar en este momento."
            initialState={{
              pagination: {
                paginationModel: {
                  page: currentPage - 1,
                  pageSize: 10,
                },
              },
            }}
            disableColumnMenu
            pageSizeOptions={[10, 15, 30]}
            setClaimSelected={setClaimSelected}
            setShowTypeAssignClaim={setShowTypeAssignClaim}
            setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
            account={account}
            cantElement={cantElement}
            setCantElement={setCantElement}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </ThemeProvider>
      </Box>
    </Content>
  );
}

export default EntranceTableComponent;
