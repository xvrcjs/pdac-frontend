import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import DataGrid from "./DataGrid";

import { tokens } from "../../../theme";

function DataOrganismsComponent(props) {
  const {
    api,
    values,
    omics,
    setOmics,
    setFieldValue,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleOnSubmit,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showCreateOmic, setShowCreateOmic] = useState(false);

  const columns = [
    {
      field: "name",
      headerName: "OMIC",
      flex: 1,
      headerAlign: "center",
      align: "center",
      width: "200px",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "responsible",
      headerName: "RESPONSABLE",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "opening_hours",
      headerName: "HORARIO DE ATENCIÓN",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "TEL",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "address",
      headerName: "DIRECCIÓN",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          {params.value}
        </div>
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


  return (
    <Content className="swt-dashboard" isLoaded="true">
      <div style={{ margin: "20px 100px", height: "calc(100% - 90px)" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mb: 5,
            borderRadius: "5px",
          }}
        >
          <Button
            sx={{
              borderRadius: "5px",
              background: "#E81F76",
              color: "#fff",
              p: "5px 30px",
              fontSize: "18px",
              fontWeight: "400",
              fontFamily: "Encode Sans",
              "& fieldset": {
                borderRadius: "5px",
              },
              "& input": {
                paddingY: "12px",
              },
            }}
            onClick={() => setShowCreateOmic(true)}
          >
            Agregar nueva OMIC
          </Button>
        </Box>

        <ThemeProvider theme={themeTable}>
          <DataGrid
            api={api}
            rows={omics}
            setRows={setOmics}
            columns={columns}
            noDataMessage="No hay OMICs para mostrar en este momento."
            backgroundColor={"#fff"}
          />
        </ThemeProvider>
      </div>
      <Dialog
        open={showCreateOmic}
        onClose={() => setShowCreateOmic(!showCreateOmic)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            maxWidth: "100%",
            width: "70%",
            padding: "20px 20px",
            border: "3px solid #00AEC3",
            borderRadius: "30px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "36px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          Agregar nueva oficina municipal
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Ingresá los datos de la oficina municipal que quieras agregar al
            listado de organismos.
          </DialogContentText>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Datos del solicitante
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              p: "2.5rem 0rem",
            }}
          >
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                NOMBRE OMIC
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.name}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name ? errors.name : ""}
                name="name"
                onChange={handleChange}
              />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                RESPONSABLE
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.responsible}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.responsible && errors.responsible)}
                helperText={
                  touched.responsible && errors.responsible
                    ? errors.responsible
                    : ""
                }
                name="responsible"
                onChange={handleChange}
              />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                HORARIO DE ATENCIÓN
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.opening_hours}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.opening_hours && errors.opening_hours)}
                helperText={
                  touched.opening_hours && errors.opening_hours
                    ? errors.opening_hours
                    : ""
                }
                name="opening_hours"
                onChange={handleChange}
              />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                TELEFONO
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.phone}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone ? errors.phone : ""}
                name="phone"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                DIRECCIÓN
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.address}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.address && errors.address)}
                helperText={
                  touched.address && errors.address ? errors.address : ""
                }
                name="address"
                onChange={handleChange}
              />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                EMAIL
              </Typography>
              <TextField
                variant="outlined"
                placeholder=""
                className="input-field"
                value={values.email}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #E81F76 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E81F76 !important",
                    },
                }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : ""}
                name="email"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px 52px 10px 53px",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              width: "190px",
              border: "1px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
              },
            }}
            onClick={() => setShowCreateOmic(!showCreateOmic)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px 52px 10px 53px",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              border: "1px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
              },
            }}
            onClick={handleOnSubmit}
            autoFocus
          >
            Agregar organismo
          </Button>
        </DialogActions>
      </Dialog>
    </Content>
  );
}

export default DataOrganismsComponent;
