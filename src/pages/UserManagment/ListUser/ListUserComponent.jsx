import React, { useState,useEffect } from "react";
import Content from "components/Content";
import { tokens } from "../../../theme";
import { Box, TextField, useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
 } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  GridRow,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import DataGrid from "components/DataGrid"
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from "react-router-dom";

function ListUserComponent(props) {
  const { users } = props;
  const [rows,setRows] = useState([])
  const [originalRows, setOriginalRows] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const navigate = useNavigate()

  const columns = [
    {
      field: "full_name",
      headerName: "NOMBRE",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name" style={{textTransform:"uppercase"}}>{params.value}</div>
      ),
    },
    {
      field: "roles",
      headerName: "ROL",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name" style={{textTransform:"uppercase"}}>{params.value && params.value.length > 0 ? "Usuario "+params.value[0].name : "Sin rol"}</div>
      ),
    },
    {
      field: "is_active",
      headerName: "ESTADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name" style={{textTransform:"uppercase"}}>{params.value === true ? "Activo":"Desactivado"}</div>
      ),
    },
    {
      field: "user",
      headerName: "EMAIL",
      flex: 1,
      headerAlign: "center",
      align: "center",
      width: "500px",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value?.email}</div>
      ),
    },
  ];

  const themeTable = createTheme(
    {
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
              }
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
    },
  );


  const handleFilter = (e) => {
    const text = e.target.value;
    const filteredRows = users.filter((c) => {
      return c.full_name.toLowerCase().includes(text.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleExpandClick = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };
  
  const handleEdit = (id) => {
    navigate(`/gestion-de-usuarios/editar-usuario/${id}`)
  };


  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        sx={{marginRight: '40px'}}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple sx={{"&.MuiButtonBase-root":{
          backgroundColor:'#FFF',
          boxShadow: '0px 1px 5px 0px #0000001F',
          boxShadow: '0px 2px 2px 0px #00000024',
          boxShadow: '0px 3px 1px -2px #00000033',

        },
        "&.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected":{
          backgroundColor: '#626262 !important',
          color: "#FFF",
        }}} />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }
  

  useEffect(() => {
    setRows(users);
    setOriginalRows(users);
  }, [users]);

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <div style={{ margin: "20px 100px", height: "calc(100% - 90px)" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 5,
            borderRadius: "5px",
          }}
        >
          <TextField
            placeholder="Buscar..."
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
              backgroundColor: "#FFF",
              borderRadius: "5px",
              border: "1px solid rgba(61, 62, 64, 0.50)",
              background:"#fff",
              boxShadow: "0px 4px 4px 0px #00AEC3",
              "& fieldset": {
                borderRadius: "5px",
              },
              "& input": {
                paddingY: "12px",
                fontFamily: "Encode Sans",
              },
              width: "100%",
              maxWidth: "500px",
            }}
            onChange={handleFilter}
          />
        </Box>

        <ThemeProvider theme={themeTable}>
          <DataGrid
            rows={rows}
            columns={columns}
            handleEdit={handleEdit}
          />
        </ThemeProvider>
      </div>
    </Content>
  );
}

export default ListUserComponent;