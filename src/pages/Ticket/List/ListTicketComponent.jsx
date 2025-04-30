import React, { useState, useEffect } from "react";
import Content from "components/Content";
import { tokens } from "../../../theme";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataGrid from "./DataGrid";
import { useNavigate } from "react-router-dom";

const base_support_level = [
  {
    value: "unassigned",
    label: "S/A",
  },
  { 
    value: "closed", 
    label: "CE" 
  },
];
const admin_support_level = [
  { value: "n1", label: "N1" },
  { value: "n2", label: "N2" },
  { value: "n3", label: "N3" },
]

function ListTicketComponent(props) {
  const { tickets, setTicketSelected, setShowAssignTicket,setShowMessageConfirmReAssign,setShowMessageConfirmReOpen,account } = props;
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const navigate = useNavigate();
  const [selectedSupportLevel, setSelectedSupportLevel] = useState(null);
  const [searchText, setSearchText] = useState("");
  const baseColumns = [
    {
      field: "id",
      headerName: "NRO TICKET",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
          style={{ textTransform: "uppercase" }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "claim",
      headerName: "RECLAMO ASOCIADO",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
    {
      field: "assigned",
      headerName: "ASIGNADO A",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          className="swt-table-field-name"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin:"auto",
            width:"200px",
            height:"100%"
          }}>
            
            {params.value ? params.value.full_name:"S/A"}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "ESTADO DEL TICKET",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
    {
      field: "created_at",
      headerName: "FECHA DE CREACIÓN",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
  ];
  const supportLevelColumn = {
    field: "support_level",
    headerName: "NIVEL DE SOPORTE ACTUAL",
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
            backgroundColor: "#fff",
            color: "#000",
            cursor: "pointer",
          }}
        >
          {support_level.find(item => item.value === params.value)?.label || "Desconocido"}
        </Typography>
      </Box>
    ),
  };
  const columns = account?.roles[0].name === 'Admin' 
    ? [...baseColumns.slice(0, 3), supportLevelColumn, ...baseColumns.slice(3)]
    : baseColumns;


  const support_level = account?.roles[0].name === 'Admin' 
  ? [...base_support_level, ...admin_support_level]
  : base_support_level;

  const handleFilter = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleSupportLevelFilter = (level) => {
    setSelectedSupportLevel(
      (prev) => (prev === level ? null : level) // toggle: si está activo lo desactiva
    );
  };
  const handleEdit = (id) => {
    navigate(`/tickets/${id}`);
  };

  useEffect(() => {
    let filtered = [...tickets];

    if (searchText.trim() !== "") {
      filtered = filtered.filter((ticket) =>
        ticket.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedSupportLevel) {
      if (selectedSupportLevel === "closed") {
        filtered = filtered.filter(
          (ticket) =>
            ticket.status &&
            ticket.status.toLowerCase() === "cerrado"
        );
      } else {
        filtered = filtered.filter(
          (ticket) =>
            ticket.support_level &&
            ticket.support_level.toLowerCase() === selectedSupportLevel.toLowerCase()
        );
      }
    }
    setRows(filtered);
  }, [searchText, selectedSupportLevel, tickets]);

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <div style={{ margin: "30px 100px", height: "calc(100% - 90px)" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: "20px",
              gap: "10px",
            }}
          >
            {support_level.map((filter, index) => (
              <Typography
                key={index}
                onClick={() => handleSupportLevelFilter(filter.value)}
                sx={{
                  p: "10px",
                  borderRadius: "15px",
                  border: "1px solid #E81F76",
                  color:
                    selectedSupportLevel === filter.value ? "#fff" : "#000",
                  backgroundColor:
                    selectedSupportLevel === filter.value ? "#E81F76" : "#fff",
                  width: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {filter.label}
              </Typography>
            ))}
          </Box>
          <Box sx={{ minWidth: "350px" }}>
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
                background: "#fff",
                "& fieldset": {
                  borderRadius: "5px",
                },
                "& input": {
                  paddingY: "12px",
                  fontFamily: "Encode Sans",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "unset !important",
                },
                width: "100%",
                maxWidth: "350px",
              }}
              onChange={handleFilter}
            />
          </Box>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          setTicketSelected={setTicketSelected}
          setShowAssignTicket={setShowAssignTicket}
          setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
          setShowMessageConfirmReOpen={setShowMessageConfirmReOpen}
          backgroundColor={"#fff"}
          account={account}
          noDataMessage="No hay tickets para mostrar en este momento."
        />
      </div>
    </Content>
  );
}

export default ListTicketComponent;
