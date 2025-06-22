import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Checkbox,
  FormControlLabel,
  Label,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Content from "components/Content";
import DataGrid from "./DataGrid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import es from "dayjs/locale/es";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import {
  claim_access,
  type_of_claim,
  category,
  heading,
  subheading,
  reason,
  omics,
  claim_status,
  gender,
} from "./dataSelect.jsx";

function ReportsComponent({ 
  reportData = null, 
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onGenerateReport,
  isLoading 
}) {
  // Estados para cada filtro
  const [filters, setFilters] = useState({
    status: "Todo",
    company: "Todo",
    municipality: "Todo",
    access: "Todo",
    claimType: "Todo",
    category: "Todo",
    heading: "Todo",
    subheading: "Todo",
  });
  const charts = [
    "Tipos de reclamo",
    "Reclamos por mes",
    "Empresas mas reclamadas por periodo (Anual/Mensual)",
  ];
  const [chartSelected, setChartSelected] = useState(charts[0]);

  const handleChangeChart = (value) => {
    setChartSelected(value);
  };
  // Función para actualizar filtros
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Función para filtrar los datos
  const getFilteredData = () => {
    if (!reportData || !reportData.data || !Array.isArray(reportData.data)) return [];

    return reportData.data.filter((row) => {
      // Si todos los filtros están en "Todo", retornar true
      if (Object.values(filters).every((filter) => filter === "Todo")) {
        return true;
      }

      // Aplicar cada filtro
      const filterChecks = {
        status: filters.status === "Todo" || row.estado === filters.status,
        company: filters.company === "Todo" || row.empresa === filters.company,
        municipality:
          filters.municipality === "Todo" ||
          row.municipio === filters.municipality,
        access: filters.access === "Todo" || row.acceso === filters.access,
        claimType:
          filters.claimType === "Todo" ||
          row.tipo_reclamo === filters.claimType,
        category:
          filters.category === "Todo" || row.categoria === filters.category,
        heading: filters.heading === "Todo" || row.rubro === filters.heading,
        subheading:
          filters.subheading === "Todo" || row.subrubro === filters.subheading,
      };

      // Retornar true solo si todos los filtros aplicables pasan
      return Object.values(filterChecks).every((check) => check);
    });
  };

  // Datos filtrados para la grilla
  const filteredRows = getFilteredData();

  // Datos para el gráfico de torta (ejemplo)
  const pieData = reportData?.data || [];

  // Columnas para la grilla
  const columns = [
    { field: "id", headerName: "NRO DE RECLAMO", flex: 1 },
    { field: "heading", headerName: "RUBRO", flex: 1 },
    { field: "claim_type", headerName: "TIPO DE RECLAMO", flex: 1 ,renderCell: (params) => (
      <Tooltip title={params.value} placement="top-start">
      <div
        style={{
          width: "100px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: "auto",
        }}
      >
        {params.value}
      </div>
    </Tooltip>),
    },
    { field: "suppliers", headerName: "EMPRESAS", flex: 1,width:"80px",renderCell: (params) => (
      <Tooltip title={params.value} placement="top-start">
        <div
          style={{
            width: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "auto",
          }}
        >
          {params.value}
        </div>
      </Tooltip>
    ), },
    { field: "claim_status", headerName: "ESTADO DEL RECLAMO", flex: 1 ,renderCell: (params) => (
      <Tooltip title={params.value} placement="top-start">
      <div
        style={{
          width: "100px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: "auto",
        }}
      >
        {params.value}
      </div>
    </Tooltip>),
    },
  ];
  // Datos para la grilla - usando los datos filtrados
  const rows = filteredRows || [];
  const handleFullScreenChart = () => {};
  const [isChartFull, setIsChartFull] = useState(false);
  const [showPieHv, setShowPieHv] = useState(false);

  const [yearSelected, setYearSelected] = useState(null);
  const [monthSelected, setMonthSelected] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);

  const handleYearChange = (newValue) => {
    setYearSelected(newValue);
  };

  const handleMonthChange = (newValue) => {
    setMonthSelected(newValue);
  };

  const handleCheckboxChange = (event) => {
    setShowMonthPicker(event.target.checked);
    if (!event.target.checked) {
      setMonthSelected(null);
    }
  };
  return (
    <Content className="swt-dashboard" isLoaded="true">
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ margin: "50px 100px" }}>
        <Box>
          <Box sx={{ mb: 4, p: 3, borderRadius: 2,boxShadow:"0px 5px 5px 0px rgba(0, 0, 0, 0.2)" }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: 200, fontSize: "22px" }}
            >
              Indicá el periodo deseado para generar el informe
            </Typography>
            <Grid container spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={3}>
                <Typography variant="body2" mb={2} color="textSecondary">
                  Desde periodo
                </Typography>
                <DatePicker 
                    format="DD/MM/YYYY"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{
                        textField: {
                            placeholder: "dd/mm/yyyy",
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(0, 0, 0, 0.23) !important',
                            borderRadius:'15px'
                        }
                    }}
                />
                                
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" mb={2} color="textSecondary">
                  Hasta periodo
                </Typography>
                <DatePicker 
                    format="DD/MM/YYYY"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{
                        textField: {
                            placeholder: "dd/mm/yyyy",
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(0, 0, 0, 0.23) !important',
                            borderRadius:'15px'
                        }
                    }}
                />
              </Grid>
              </LocalizationProvider>
              <Grid item xs={6} sx={{display:"flex",alignItems:"end"}}>
                <Button 
                    sx={{
                        background:"#00AEC3",
                        borderRadius:"50px",
                        color:"#fff",
                        padding:"8px 50px",
                        fontSize:"18px",
                        fontWeight:"500",
                        mb:"5px",
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        },
                        '&:disabled': {
                            opacity: 0.7,
                            background: '#00AEC3'
                        }
                    }}
                    onClick={() => onGenerateReport(startDate, endDate)}
                    disabled={isLoading || !startDate || !endDate}
                >
                    Generar informe
                </Button>
              </Grid>
            </Grid>
          </Box>

          {isLoading && 
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"calc(100vh - 200px)"}}>
            <CircularProgress
              size={150}
              sx={{
                svg: {
                  circle: {
                    stroke: 'url(#gradient1)',
                  },
                },
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gradient1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E81F76" />
                  <stop offset="100%" stopColor="#00AEC3" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
          }
          {!isLoading && reportData && (
          <Box>
          <Typography
            sx={{ mb: 2, ml: 2, fontSize: "20px", fontWeight: "600" }}
          >
            Visualización de los gráficos solicitados
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }} >
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Estado:
                  </Typography>
                  <Select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      maxWidth: "70%",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {claim_status.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Empresa:
                  </Typography>
                  <Select
                    value={filters.company}
                    onChange={(e) =>
                      handleFilterChange("company", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {type_of_claim.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Municipio:
                  </Typography>
                  <Select
                    value={filters.municipality}
                    onChange={(e) =>
                      handleFilterChange("municipality", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {omics.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Acceso del reclamo:
                  </Typography>
                  <Select
                    value={filters.access}
                    onChange={(e) =>
                      handleFilterChange("access", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {claim_access.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Tipo de reclamo:
                  </Typography>
                  <Select
                    value={filters.claimType}
                    onChange={(e) =>
                      handleFilterChange("claimType", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {type_of_claim.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Categoría del reclamo:
                  </Typography>
                  <Select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {category.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Rubro del reclamo:
                  </Typography>
                  <Select
                    value={filters.heading}
                    onChange={(e) =>
                      handleFilterChange("heading", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {heading.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#00AEC3",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                    p: "5px 15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography color="white" width="100%">
                    Subrubro del reclamo
                  </Typography>
                  <Select
                    value={filters.subheading}
                    onChange={(e) =>
                      handleFilterChange("subheading", e.target.value)
                    }
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          marginTop: "4px",
                        }
                      }
                    }}
                    sx={{
                      background: "#00AEC3",
                      border: "unset",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    {subheading.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
          </Box>

          <Grid container spacing={isChartFull ? 0 : 3}>
            <Grid
              item
              xs={12}
              md={isChartFull ? 12 : 5}
              sx={{
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isChartFull ? "row" : "column",
                  borderRadius: "30px",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  height: "100%",
                  boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25);",
                  position: "relative",
                }}
              >
                <Box sx={{ ml: "20px", mt: "15px", display: "block", position: "absolute",zIndex: 1 }}>
                  <FormControl size="small">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        backgroundColor: "#E81F76",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
                        p: "5px 15px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <Typography color="white" width="100%">
                        Grafico:
                      </Typography>
                      <Select
                        value={chartSelected}
                        onChange={(e) => handleChangeChart(e.target.value)}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          PaperProps: {
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "8px",
                              marginTop: "4px",
                            }
                          }
                        }}
                        sx={{
                          background: "#E81F76",
                          border: "unset",
                          color: "#fff",
                          borderRadius: "8px",
                          fontSize: "13px",
                          "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none !important",
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "unset !important",
                              borderColor: "unset !important",
                            },
                          "& .MuiSvgIcon-root": {
                            color: "#fff",
                          },
                        }}
                      >
                        {charts.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </FormControl>
                </Box>
                {pieData.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {chartSelected === "Tipos de reclamo" &&
                      (!showPieHv ? (
                        <PieChart
                          onClick={(event, itemData) => {
                            const fillColor = event.target.getAttribute("fill");
                            if (fillColor == "#000") {
                              setShowPieHv(!showPieHv);
                            }
                          }}
                          series={[
                            {
                              data: [
                                {
                                  id: 0,
                                  value: 75,
                                  label: "Comun",
                                  color: "#00AEC3",
                                },
                                {
                                  id: 1,
                                  value: 15,
                                  label: "HV",
                                  color: "#000",
                                },
                                {
                                  id: 2,
                                  value: 5,
                                  label: "Sin Asignar",
                                  color: "grey",
                                },
                                {
                                  id: 3,
                                  value: 3,
                                  label: "IVE",
                                  color: "#B31EA4",
                                },
                              ],
                              innerRadius: 0,
                              paddingAngle: 2,
                              cornerRadius: 0,
                              startAngle: 0,
                              endAngle: 360,
                              highlightScope: {
                                fade: "global",
                                highlight: "item",
                              },
                              faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: "gray",
                              },
                            },
                          ]}
                          height={500}
                          width={isChartFull ? 800 : 400}
                          margin={{ top: 80, bottom: 80, left: 10, right: 10 }}
                          slotProps={{
                            legend: {
                              direction: "row",
                              position: {
                                vertical: "bottom",
                                horizontal: "center",
                              },
                              padding: 20,
                              itemMarkWidth: 20,
                              itemMarkHeight: 20,
                              markGap: 10,
                              itemGap: 15,
                            },
                          }}
                        />
                      ) : (
                        <>
                          <Typography sx={{ mt: "80px", fontWeight: "500" }}>
                            Subcategoria de reclamos HV
                          </Typography>
                          <svg
                            style={{
                              width: 0,
                              height: 0,
                              position: "absolute",
                            }}
                          >
                            <defs>
                              <linearGradient
                                id="pieGradient"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#E81F76" />
                                <stop offset="50%" stopColor="#417099" />
                                <stop offset="100%" stopColor="#00AEC3" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <PieChart
                            skipAnimation
                            series={[
                              {
                                data: [
                                  {
                                    id: 0,
                                    value: 75,
                                    label:
                                      "HV - Por afectacion de derechos de NNyA",
                                    color: "grey",
                                  },
                                  {
                                    id: 1,
                                    value: 15,
                                    label: "HV - Jubilados o pensionados",
                                    color: "grey",
                                  },
                                  {
                                    id: 2,
                                    value: 5,
                                    label: "HV - Por estado físico o mental",
                                    color: "grey",
                                  },
                                  {
                                    id: 3,
                                    value: 3,
                                    label: "HV - Por ruralidad",
                                    color: "grey",
                                  },
                                  {
                                    id: 4,
                                    value: 75,
                                    label:
                                      "HV - Por razones, sociales, económicas o culturales",
                                    color: "grey",
                                  },
                                  {
                                    id: 5,
                                    value: 15,
                                    label: "HV - Por turista",
                                    color: "grey",
                                  },
                                  {
                                    id: 6,
                                    value: 5,
                                    label: "HV - Por migrante",
                                    color: "grey",
                                  },
                                  {
                                    id: 7,
                                    value: 3,
                                    label: "HV - Por colectivo LGTB+",
                                    color: "grey",
                                  },
                                  {
                                    id: 8,
                                    value: 75,
                                    label: "HV - Por pueblos originarios",
                                    color: "grey",
                                  },
                                  {
                                    id: 9,
                                    value: 15,
                                    label: "HV - Mayores de 70años",
                                    color: "grey",
                                  },
                                  {
                                    id: 10,
                                    value: 5,
                                    label: "HV - Otro",
                                    color: "grey",
                                  },
                                ],
                                innerRadius: 0,
                                paddingAngle: 2,
                                cornerRadius: 0,
                                startAngle: 0,
                                endAngle: 360,
                                highlightScope: {
                                  fade: "global",
                                  highlight: "item",
                                },
                                highlighted: { color: "url(#pieGradient)" },
                                faded: {
                                  innerRadius: 30,
                                  additionalRadius: -30,
                                  color: "grey",
                                },
                              },
                            ]}
                            height={500}
                            width={isChartFull ? 800 : 400}
                            margin={{
                              top: 0,
                              bottom: 80,
                              left: 10,
                              right: 10,
                            }}
                            slotProps={{
                              legend: {
                                hidden: true,
                              },
                            }}
                          />
                          <Button
                            sx={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              color: "#000",
                              padding: "9px 30px",
                              fontFamily: "Encode Sans",
                              fontSize: "16px",
                              textTransform: "capitalize",
                              border: "1px solid #000",
                              mt: "-50px",
                              ":hover": {
                                color: "#FFF",
                                backgroundColor: "#00AEC3",
                                borderColor: "transparent",
                              },
                            }}
                            onClick={() => setShowPieHv(!showPieHv)}
                          >
                            Volver
                          </Button>
                        </>
                      ))}
                    {chartSelected === "Reclamos por mes" && (
                      <BarChart
                        dataset={[
                          {
                            cantForType: 86,
                            cantClaims: 21,
                            month: "Ene",
                          },
                          {
                            cantForType: 78,
                            cantClaims: 28,
                            month: "Feb",
                          },
                          {
                            cantForType: 106,
                            cantClaims: 41,
                            month: "Mar",
                          },
                          {
                            cantForType: 92,
                            cantClaims: 73,
                            month: "Abr",
                          },
                          {
                            cantForType: 92,
                            cantClaims: 99,
                            month: "May",
                          },
                          {
                            cantForType: 103,
                            cantClaims: 144,
                            month: "Jun",
                          },
                          {
                            cantForType: 105,
                            cantClaims: 319,
                            month: "Jul",
                          },
                          {
                            cantForType: 65,
                            cantClaims: 60,
                            month: "Ago",
                          },
                          {
                            cantForType: 95,
                            cantClaims: 131,
                            month: "Sept",
                          },
                          {
                            cantForType: 97,
                            cantClaims: 55,
                            month: "Oct",
                          },
                          {
                            cantForType: 76,
                            cantClaims: 48,
                            month: "Nov",
                          },
                          {
                            cantForType: 10,
                            cantClaims: 25,
                            month: "Dic",
                          },
                        ]}
                        yAxis={[{ scaleType: "band", dataKey: "month" }]}
                        series={[
                          {
                            dataKey: "cantClaims",
                            label: "Cantidad de reclamos mensuales",
                            color: "#417099",
                          },
                        ]}
                        margin={{ top: 80 }}
                        layout="horizontal"
                        xAxis={[{ label: "Reclamos" }]}
                        height={isChartFull ? 500 : 450}
                        slotProps={{
                          legend: {
                            hidden: true,
                          },
                        }}
                      />
                    )}
                    {chartSelected ===
                      "Empresas mas reclamadas por periodo (Anual/Mensual)" && (
                      <Box display="flex" flexDirection="column" gap={2} width="90%">
                        {!showBarChart ? (
                          <Box
                            display="flex"
                            height="100%"
                            width="100%"
                            gap={2}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              adapterLocale={es}
                            >
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <DatePicker
                                  views={["year"]}
                                  value={yearSelected}
                                  onChange={handleYearChange}
                                  slotProps={{
                                    textField: {
                                      placeholder: "AÑO",
                                    },
                                  }}
                                  sx={{
                                    width: "300px",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor:
                                        "rgba(0, 0, 0, 0.23) !important",
                                      borderRadius: "15px",
                                    },
                                  }}
                                />
                              </FormControl>

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showMonthPicker}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                      color: "#00AEC3",
                                      "&.Mui-checked": {
                                        color: "#00AEC3",
                                      },
                                    }}
                                  />
                                }
                                label="Filtrar por mes"
                              />

                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <DatePicker
                                  views={["month"]}
                                  value={monthSelected}
                                  onChange={handleMonthChange}
                                  disabled={!showMonthPicker}
                                  slotProps={{
                                    textField: {
                                      placeholder: "MES",
                                    },
                                  }}
                                  sx={{
                                    width: "300px",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor:
                                        "rgba(0, 0, 0, 0.23) !important",
                                      borderRadius: "15px",
                                    },
                                  }}
                                />
                              </FormControl>

                              <Button
                                sx={{
                                  borderRadius: "20px",
                                  backgroundColor: "#00AEC3",
                                  color: "#FFF",
                                  padding: "9px 30px",
                                  fontFamily: "Encode Sans",
                                  fontSize: "16px",
                                  textTransform: "capitalize",
                                  mt: 2,
                                  width: "300px",
                                  ":hover": {
                                    backgroundColor: "#417099",
                                    transform: "scale(1.01)",
                                  },
                                }}
                                onClick={() => setShowBarChart(true)}
                                disabled={!yearSelected}
                              >
                                Generar
                              </Button>
                            </LocalizationProvider>
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            mt={8}
                          >
                            <Box
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <Button
                                startIcon={<FilterAltOutlinedIcon />}
                                sx={{
                                  borderRadius: "15px",
                                  backgroundColor: "#fff",
                                  color: "#000",
                                  padding: "9px 10px",
                                  fontFamily: "Encode Sans",
                                  fontSize: "12px",
                                  textTransform: "capitalize",
                                  border: "1px solid #000",
                                  mt: 2,
                                  ":hover": {
                                    backgroundColor: "#00AEC3",
                                    color: "#fff",
                                    borderColor: "transparent",
                                  },
                                }}
                                onClick={() => setShowBarChart(false)}
                              >
                                Filtrar
                              </Button>
                            </Box>
                            <BarChart
                              dataset={[
                                {
                                  cantForType: 86,
                                  cantClaims: 21,
                                  month: "Ene",
                                },
                                {
                                  cantForType: 78,
                                  cantClaims: 28,
                                  month: "Feb",
                                },
                                {
                                  cantForType: 106,
                                  cantClaims: 41,
                                  month: "Mar",
                                },
                                {
                                  cantForType: 92,
                                  cantClaims: 73,
                                  month: "Abr",
                                },
                                {
                                  cantForType: 92,
                                  cantClaims: 99,
                                  month: "May",
                                },
                                {
                                  cantForType: 103,
                                  cantClaims: 144,
                                  month: "Jun",
                                },
                                {
                                  cantForType: 105,
                                  cantClaims: 319,
                                  month: "Jul",
                                },
                                {
                                  cantForType: 65,
                                  cantClaims: 60,
                                  month: "Ago",
                                },
                                {
                                  cantForType: 95,
                                  cantClaims: 131,
                                  month: "Sept",
                                },
                                {
                                  cantForType: 97,
                                  cantClaims: 55,
                                  month: "Oct",
                                },
                                {
                                  cantForType: 76,
                                  cantClaims: 48,
                                  month: "Nov",
                                },
                                {
                                  cantForType: 10,
                                  cantClaims: 25,
                                  month: "Dic",
                                },
                              ]}
                              xAxis={[{ scaleType: "band", dataKey: "month",width: 100 }]}
                              series={[
                                {
                                  dataKey: "cantClaims",
                                  label: "Cantidad de reclamos mensuales",
                                  color: "#417099",
                                },
                              ]}
                              margin={{ top: 10 }}
                              layout="vertical"
                              yAxis={[{ label: "Reclamos"},]}
                              height={isChartFull ? 500 : 450}
                              slotProps={{
                                legend: {
                                  hidden: true,
                                },
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Alert severity="info">
                      No hay datos disponibles para mostrar en el gráfico
                    </Alert>
                  </Box>
                )}
                {!isChartFull && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mr: "20px",
                      mb: "10px",
                    }}
                  >
                    <FullscreenOutlinedIcon
                      onClick={() => setIsChartFull(!isChartFull)}
                      sx={{ cursor: "pointer", width: "30px", height: "30px" }}
                    />
                  </Box>
                )}
                {isChartFull && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "120px",
                      height: "100%",
                      backgroundColor: "#D9D9D9",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25);",
                    }}
                  >
                    <ArrowBackIosNewOutlinedIcon
                      onClick={() => setIsChartFull(!isChartFull)}
                      sx={{ cursor: "pointer", width: "30px", height: "30px" }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={7} sx={{ display: isChartFull && "none" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                noDataMessage="No hay datos disponibles"
                disableSelectionOnClick
                backgroundColor="#fff"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              mt: 6,
              gap: 3,
            }}
          >
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  transform: "scale(1.01)",
                  border: "unset",
                },
              }}
            >
              Realizar otra busqueda
            </Button>
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  transform: "scale(1.01)",
                  border: "unset",
                },
              }}
            >
              Descargar informe .csv
            </Button>
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  transform: "scale(1.01)",
                  border: "unset",
                },
              }}
            >
              Descargar informe .svg
            </Button>
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#00AEC3",
                color: "#fff",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                textTransform: "capitalize",
                ":hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              Descargar grafico PDF{" "}
            </Button>
          </Box>
          </Box>
          )}
        </Box>
      </Box>
    </Box>  
    </Content>
  );
}

export default ReportsComponent;
