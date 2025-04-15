import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Button,
} from "@mui/material";
import { IMaskInput } from 'react-imask';
import Grid from "@mui/material/Grid2";
import localidades from "./localidadesAR.json";
import AddIcon from '@mui/icons-material/Add';

const CuitMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="##-########-#"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function SupplierFormComponent(props) {
  const {
    touched,
    values,
    errors,
    handleBlur,
    setStep,
    newSupplier,
    setNewSupplier,
    handleAddSupplier,
    setAddingNewSupplier,
    setFieldValue,
    isNew
  } = props;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSupplier((prev) => {
      if (name === "has_cuil_sp") {
        return {
          ...prev,
          has_cuil_sp: checked,
          cuil_sp: checked ? "No sé el CUIL/CUIT del proveedor" : "",
        };
      }
      if (name === "city_sp"){
        return {
          ...prev,
          city_sp: value.name,
        }
      }
      
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleValidateSupplier = (e) => {
    setFieldValue("suppliers", [...values.suppliers, newSupplier]);
    setAddingNewSupplier(false)
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: "0.8rem 0rem"
      }}
    >
        {!isNew && 
      <Typography sx={{ fontSize: "1rem", fontWeight: "600", mb: "20px" }}>
        Datos del proovedor del producto
      </Typography>
      }
      <Typography
        sx={{
          fontSize: "1.125rem",
          fontWeight: "400",
          color: "#57534E",
        }}
      >
        CUIL/CUIT
      </Typography>
      <TextField
        variant="outlined"
        placeholder="CUIL/CUIT"
        className="input-field"
        disabled={isNew || newSupplier.has_cuil_sp}
        value={newSupplier.cuil_sp}
        onBlur={handleBlur}
        sx={{
          mt: "5px",
          "& .MuiOutlinedInput-notchedOutline": {
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            borderColor: "#AAA !important",
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#AAA !important",
          },
          "& .Mui-disabled":{
            borderRadius: "8px",
            background: "#E7E5E4 "
          }
        }}
        name="cuil_sp"
        error={Boolean(touched.cuil_sp && newSupplier.cuil_sp === "")}
        helperText={Boolean(touched.cuil_sp && newSupplier.cuil_sp === "") && "El campo CUIL/CUIT es requerido"}
        onChange={handleChange}
      />
      {!isNew &&
      <Box 
        sx={{
          display: "flex",
          justifyContent: "end !important"
        }}>
        <FormControlLabel
          sx={{
            color: "#E81F76",
            fontSize: "1rem",
            fontWeight: "400",
          }}
          control={
            <Checkbox
              onChange={handleChange}
              checked={newSupplier.has_cuil_sp}
              name="has_cuil_sp"
              sx={{ "&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                {
                  color: "#E81F76",
                }, }}
            />
          }
          label="No sé el CUIL/CUIT del proveedor"
        />
      </Box>
        }
      <Typography
        sx={{
          fontSize: "1.125rem",
          fontWeight: "400",
          color: "#57534E",
        }}
      >
        NOMBRE
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Nombre"
        disabled={isNew}
        className="input-field"
        value={newSupplier.fullname_sp}
        onBlur={handleBlur}
        sx={{
          mt: "5px",
          "& .MuiOutlinedInput-notchedOutline": {
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            borderColor: "#AAA !important",
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#AAA !important",
          },
          "& .Mui-disabled":{
            borderRadius: "8px",
            background: "#E7E5E4 "
          }
        }}
        error={Boolean(touched.fullname_sp && newSupplier.fullname_sp === "")}
        helperText={Boolean(touched.fullname_sp && newSupplier.fullname_sp === "") && "El campo nombre es requerido"}
        name="fullname_sp"
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        <Grid item="true" size={{ xs: 12, sm: 8, md: 8 }}>
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: "400",
              color: "#57534E",
            }}
          >
            Dirección
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Dirección"
            className="input-field"
            disabled={isNew}
            value={newSupplier.address_sp}
            onBlur={handleBlur}
            sx={{
              mt: "5px",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderColor: "#AAA !important",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#AAA !important",
                },
              "& .Mui-disabled":{
                borderRadius: "8px",
                background: "#E7E5E4 "
              }
            }}
            name="address_sp"
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 4 }}>
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: "400",
              color: "#57534E",
            }}
          >
            Número
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Número"
            className="input-field"
            disabled={isNew}
            value={newSupplier.num_address_sp}
            onBlur={handleBlur}
            sx={{
              mt: "5px",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderColor: "#AAA !important",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#AAA !important",
                },
              "& .Mui-disabled":{
                borderRadius: "8px",
                background: "#E7E5E4 "
              }
            }}
            name="num_address_sp"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item="true" size={{ xs: 12, sm: 8, md: 8 }}>
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: "400",
              color: "#57534E",
            }}
          >
            Ciudad
          </Typography>
          <Autocomplete
            options={localidades}
            disabled={isNew}
            noOptionsText={'No se encontre resultado'}
            getOptionLabel={(option) => option.name}
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option.name.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            name="city_sp"
            onChange={(event, newValue) => {
              handleChange({
                target: {
                  name: "city_sp",
                  value: newValue,
                },
              });
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Ciudad/Provincia" variant="outlined" name="city_sp" sx={{
                mt: "5px",
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderColor: "#AAA !important",
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#AAA !important",
                  },
                "& .Mui-disabled":{
                  borderRadius: "8px",
                  background: "#E7E5E4 "
                }
              }}/>
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            value={localidades.find((loc) => loc.name === newSupplier.city_sp) || null}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 4 }}>
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: "400",
              color: "#57534E",
            }}
          >
            CP
          </Typography>
          <TextField
            variant="outlined"
            placeholder="CP"
            className="input-field"
            disabled={isNew}
            value={newSupplier.zip_code_sp}
            onBlur={handleBlur}
            sx={{
              mt: "5px",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderColor: "#AAA !important",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#AAA !important",
                },
              "& .Mui-disabled":{
                borderRadius: "8px",
                background: "#E7E5E4 "
              }
            }}
            inputProps={{
              maxLength: 5,
            }}
            name="zip_code_sp"
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              handleChange({ target: { name: "zip_code_sp", value: numericValue } });
            }}
          />
        </Grid>
        {(!isNew && values.suppliers.length <3) &&
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <Button
                  onClick={() => handleValidateSupplier()}
                  disabled={!newSupplier.cuil_sp || !newSupplier.fullname_sp}
                  sx={{
                    borderRadius: "50px",
                    color: "#fff",
                    mt:"20px",
                    fontFamily: "Encode Sans",
                    width:"294px",
                    p:"12px 50px",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    backgroundColor: "#E81F76",
                    border: "unset",
                    boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    "&:hover": {
                      color: "#fff",
                      transform: "scale(1.01)"
                    },
                    "&.Mui-disabled": {
                      background:"#fff",
                      border: "1px solid #8F8881",
                      color: "#E81F76",
                    },
                  }}
                >
                Validar proveedor
              </Button>
              
            </Box>
        }
      </Grid>
    </Box>
  );
}

export default SupplierFormComponent;
