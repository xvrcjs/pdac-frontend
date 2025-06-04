import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

function ClaimerUbicationFormComponent(props) {
  const { values, touched, errors, handleChange, handleBlur, setStep } = props;
  const provinceOptions = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán",
    "Ciudad Autónoma de Buenos Aires"
  ];

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "3rem",
              fontWeight: "700",
              marginTop: "55px",
            }}
          >
            Complete <span style={{ color: "#00AEC3" }}>sus datos</span> para
            continuar su reclamo.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "400",
            }}
          >
            Es necesario que pueda ingresar los datos solicitados para poder
            enviar su reclamo.
          </Typography>
        </Box>
      </Box>
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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <Typography
              sx={{ fontSize: "1rem", fontWeight: "600", mb: "20px" }}
            >
              Tú dirección completa
            </Typography>
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: "400",
                color: "#57534E",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Calle
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Calle"
              className="input-field"
              value={values.street_cl}
              onBlur={handleBlur}
              sx={{
                mt: "5px",
                mb: "10px",
                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000 !important",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#000 !important",
                  },
              }}
              error={Boolean(touched.street_cl && errors.street_cl)}
              helperText={
                touched.street_cl && errors.street_cl
                  ? errors.street_cl
                  : ""
              }
              name="street_cl"
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
              Nro
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Nro"
              className="input-field"
              value={values.number_cl}
              onBlur={handleBlur}
              sx={{
                mt: "5px",
                mb: "10px",
                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000 !important",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#000 !important",
                  },
              }}
              error={Boolean(touched.number_cl && errors.number_cl)}
              helperText={touched.number_cl && errors.number_cl ? errors.number_cl : ""}
              name="number_cl"
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
              Entre calles
            </Typography>
            <TextField
              value={values.between_streets_cl}
              onChange={handleChange}
              placeholder="Entre calles"
              variant="outlined"
              name="between_streets_cl"
              className="input-field"
              onBlur={handleBlur}
              sx={{
                mt: "5px",
                mb: "10px",
                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000 !important",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#000 !important",
                  },
              }}
              error={Boolean(touched.between_streets_cl && errors.between_streets_cl)}
              helperText={
                touched.between_streets_cl && errors.between_streets_cl ? errors.between_streets_cl : ""
              }
            />
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: "400",
                color: "#57534E",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Ciudad
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Ciudad"
              className="input-field"
              value={values.city_cl}
              onBlur={handleBlur}
              sx={{
                mt: "5px",
                mb: "10px",
                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000 !important",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#000 !important",
                  },
              }}
              error={Boolean(touched.city_cl && errors.city_cl)}
              helperText={
                touched.city_cl && errors.city_cl ? errors.city_cl : ""
              }
              name="city_cl"
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
              Provincia
            </Typography>
            <Autocomplete
                options={provinceOptions}
                getOptionLabel={(option) => option}
                filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                    )
                }
                noOptionsText={'No se encontre resultado'}
                name="province_cl"
                onChange={(event, newValue) => {
                    handleChange({
                    target: {
                        name: "province_cl",
                        value: newValue,
                    },
                    });
                }}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Provincia" variant="outlined" name="province_cl" sx={{
                    mt: "5px",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        borderRadius: "8px",
                        borderColor: "#000 !important",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                        borderColor: "#000 !important",
                        },
                    "& .Mui-disabled":{
                        borderRadius: "8px",
                        background: "#E7E5E4 "
                    }
                    }}/>
                )}
                renderOption={(props, option) => (
                    <li {...props} key={option}>
                    {option}
                    </li>
                )}
                value={provinceOptions.find((loc) => loc === values.province_cl) || null}
                isOptionEqualToValue={(option, value) => option === value}
            />
          </Box>
        </Grid>
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
            <Box
              sx={{
                borderRadius: "0px 132px 0px 134px",
                background:
                  "url(../../assets/claims/img-4.png) lightgray 50% / cover no-repeat",
                height: "366px",
                width: "471px",
              }}
            />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: "50px",
        }}
      >
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => setStep(0)}
            sx={{
              borderRadius: "50px",
              backgroundColor: "rgba(143, 136, 129, 0.00)",
              color: "#000",
              padding: "9px 30px",
              fontFamily: "Encode Sans",
              fontSize: "1rem",
              border: "1px solid #8F8881",
              fontWeight: "700",
              width: "60%",
              textTransform: "capitalize",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px #00000040",
              },
            }}
          >
            Volver
          </Button>
        </Grid>
        <Grid
          item="true"
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => setStep(2)}
            disabled={
              Object.keys(errors).length !== 0 ||
              Object.keys(touched).length === 0
            }
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#FFF",
              padding: "9px 30px",
              fontFamily: "Encode Sans",
              fontSize: "1rem",
              fontWeight: "700",
              width: "80%",
              textTransform: "capitalize",
              maxWidth: "590px",
              "&:hover": {
                color: "#FFF",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px #00000040",
              },
              "&.Mui-disabled": {
                backgroundColor: "#8F8881",
                color: "#fff",
              },
            }}
          >
            Continuar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
export default ClaimerUbicationFormComponent;
