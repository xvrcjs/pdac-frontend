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
import DataGrid from "./DataGrid"
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
        <div className="swt-table-field-name" style={{textTransform:"uppercase"}}>{params.value && params.value.length > 0 && "Usuario "+params.value[0].name}</div>
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

  const handleFilter = (e) => {
    const text = e.target.value;
    const filteredRows = users.filter((c) => {
      return c.full_name.toLowerCase().includes(text.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleEdit = (id) => {
    navigate(`/gestion-de-usuarios/editar-usuario/${id}`)
  };

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
            justifyContent: "right",
            mb: 5,
            borderRadius: "5px"
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
              borderRadius: "15px",
              border: "1px solid rgba(61, 62, 64, 0.50)",
              background:"#fff",
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
              width: "100%",
              maxWidth: "300px",
            }}
            onChange={handleFilter}
          />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          backgroundColor={"#fff"}
        />
      </div>
    </Content>
  );
}

export default ListUserComponent;