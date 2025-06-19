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
  CircularProgress,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { tokens } from "../../theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  // DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import DataGrid from "components/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "dayjs/locale/es";

function ReportsComponent(props) {
  const { onGenerateReport, isLoading, startDate,setStartDate, endDate,setEndDate } = props;
  
  const [activeButtons, setActiveButtons] = useState([]);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [error, setError] = useState(null);

  const handleButtonClick = (text) => {
    setActiveButtons(prev => {
      const isActive = prev.includes(text);
      if (isActive) {
        setSelectedTexts(prev => prev.filter(t => t !== text));
        return prev.filter(t => t !== text);
      } else {
        setSelectedTexts(prev => [...prev, text]);
        return [...prev, text];
      }
    });
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


  return (
    <Content className="swt-dashboard" isLoaded="true">
        <Box sx={{margin:"50px 200px"}}>
            <Box sx={{padding:"40px",borderRadius:"20px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.1)"}}>
                <Typography sx={{fontSize:"20px",fontWeight:"500",mb:"30px"}}>Indicá el periodo deseado para generar el informe</Typography>
                <Box sx={{display: "flex", flexDirection: "row", gap:"100px"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
                        <Box sx={{display: "flex", flexDirection: "column",height:"100px",justifyContent:"space-between"}}>
                            <Typography sx={{fontSize:"16px",fontWeight:"500"}}>Desde periodo mes/año</Typography>
                            <DatePicker 
                                format="DD/MM/YYYY"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                slotProps={{
                                    textField: {
                                        placeholder: "dd/mm/yyyy",
                                        error: error && !startDate
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgba(0, 0, 0, 0.23) !important',
                                        borderRadius:'15px'
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column",height:"100px",justifyContent:"space-between"}}>
                            <Typography sx={{fontSize:"16px",fontWeight:"500"}}>Hasta periodo mes/año</Typography>
                            <DatePicker 
                                format="DD/MM/YYYY"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                slotProps={{
                                    textField: {
                                        placeholder: "dd/mm/yyyy",
                                        error: error && !endDate
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgba(0, 0, 0, 0.23) !important',
                                        borderRadius:'15px'
                                    }
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{mt:"40px",padding:"40px",borderRadius:"20px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.1)"}}>
                <Typography sx={{fontSize:"20px",fontWeight:"500",mb:"30px"}}>Seleccioná la información deseada para generar el informe de este periodo</Typography>
                <Grid container spacing={2} sx={{
                    "& .MuiButton-root": {
                        background:"#fff",
                        color:"#000",
                        borderRadius:"15px",
                        textTransform:"none",
                        fontWeight:"500",
                        border:"1px solid #979696",
                        width: "100%",
                        "&.active": {
                            background:"#00AEC3",
                            color:"#fff",
                            border:"unset"
                        }
                    }
                }}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Reportes mensuales') ? 'active' : ''}
                            onClick={() => handleButtonClick('Reportes mensuales')}
                        >Reportes mensuales sdasdasdasdsadad</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Reportes por genero') ? 'active' : ''}
                            onClick={() => handleButtonClick('Reportes por genero')}
                        >Reportes por genero</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Reportes sin resolver') ? 'active' : ''}
                            onClick={() => handleButtonClick('Reportes sin resolver')}
                        >Reportes sin resolver</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Información general') ? 'active' : ''}
                            onClick={() => handleButtonClick('Información general')}
                        >Información general</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Reportes por área') ? 'active' : ''}
                            onClick={() => handleButtonClick('Reportes por área')}
                        >Reportes por área</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className={activeButtons.includes('Reportes por estado') ? 'active' : ''}
                            onClick={() => handleButtonClick('Reportes por estado')}
                        >Reportes por estado</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt:"20px",display:"flex",justifyContent:"flex-end", gap: 2, alignItems: "center"}}>
                {error && (
                    <Typography color="error" sx={{fontSize: "14px"}}>
                        {error}
                    </Typography>
                )}
                <Button 
                    sx={{
                        background:"#00AEC3",
                        borderRadius:"50px",
                        color:"#fff",
                        padding:"8px 50px",
                        fontSize:"18px",
                        fontWeight:"500",
                        '&:disabled': {
                            opacity: 0.7,
                            background: '#00AEC3'
                        }
                    }}
                    onClick={() => {
                        if (!startDate || !endDate) {
                            setError('Por favor seleccione ambas fechas');
                            return;
                        }
                        if (selectedTexts.length === 0) {
                            setError('Por favor seleccione al menos un tipo de reporte');
                            return;
                        }
                        setError(null);
                        onGenerateReport(startDate, endDate, selectedTexts);
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Generar informe'
                    )}
                </Button>
            </Box>
        </Box>
        {/* {reports } */}
    </Content>
  );
}

export default ReportsComponent;
