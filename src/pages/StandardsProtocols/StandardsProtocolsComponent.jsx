import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Pagination,
  PaginationItem,
  Divider,
  IconButton,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { tokens } from "../../theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataGrid from "./DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";

function StandardsProtocolsComponent(props) {
  const { data, showCreate, setShowCreate, handleDelete, handleDownloadZip } =
    props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);

  const columns = [
    {
      field: "uuid",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={rowsSelected.includes(params.value)}
            onChange={(event) => handleChangeCheckbox(event, params.value)}
            sx={{
              width: "18px",
              "&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked": {
                color: "#027A48",
              },
            }}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "TITULO",
      flex: 1,
      headerAlign: "center",
      maxWidth: 100,
      align: "center",
      sortered: true,
    },
    {
      field: "description",
      headerName: "DESCRIPCIÓN",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            width: "150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "auto",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "type_file",
      headerName: "TIPO DE ARCHIVO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              width: "65px",
              height: "27px",
              border: "1px solid #E81F76",
              borderRadius: "10px",
              backgroundColor: rowsSelected.includes(params.id)
                ? "#E81F76"
                : "#fff",
              color: rowsSelected.includes(params.id) ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "last_modified",
      headerName: "ULTIMA ACTUALIZACIÓN",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
  ];
  const handleFilter = (e) => {
    const text = e.target.value;
    const filteredRows = data.filter((c) => {
      return c.title.toLowerCase().includes(text.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleChangeCheckbox = (event, uuid) => {
    setRowsSelected((prevSelected) =>
      event.target.checked
        ? [...prevSelected, uuid]
        : prevSelected.filter((rowUuid) => rowUuid !== uuid)
    );
  };
  
  useEffect(() => {
    setRows(data);
    setRowsSelected([]);
  }, [data]);

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box sx={{ margin: "50px 50px" }}>
        <Grid
          container
          spacing={2}
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 5,
            borderRadius: "5px",
          }}
        >
          <Button
            sx={{
              borderRadius: "5px",
              backgroundColor: "#E81F76",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              width: "251px",
              height: "47px",
              transition: "0.2s ease-in-out",
              ":hover": {
                transform: "scale(1.03)",
              },
            }}
            onClick={() => setShowCreate(!showCreate)}
          >
            Subir documento
          </Button>
          <TextField
            placeholder="Buscar protocolo"
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
              border: "1px solid #D4D4D4",
              "& fieldset": {
                borderRadius: "15px",
                border: "unset",
              },
              "& input": {
                paddingY: "12px",
                fontFamily: "Encode Sans",
                fontWeight: "500",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset !important",
              },
              width: "100%",
              maxWidth: "350px",
            }}
            onChange={handleFilter}
          />
        </Grid>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ minHeight: "600px" }}
          backgroundColor={"#fff"}
          noDataMessage="No hay protocolos para mostrar en este momento."
          handleDelete={handleDelete}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "right",
          }}
        >
          <Button
            sx={{
              borderRadius: "5px",
              backgroundColor: "#E81F76",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              height: "47px",
              "&.Mui-disabled": {
                backgroundColor: "#8F8881",
                color: "#fff",
              },
            }}
            onClick={()=>handleDownloadZip(rowsSelected)}
            disabled={rowsSelected.length === 0}
          >
            Descargar seleccionados
          </Button>
        </Box>
        
      </Box>
    </Content>
  );
}

export default StandardsProtocolsComponent;
