import React, { useState } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Divider,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  IconButton
} from "@mui/material";
import { IMaskInput } from 'react-imask';

const DateMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="##/##/####"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const DNIMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="##.###.###"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function ClaimerFormComponent(props) {
  const { values, touched, errors, handleChange, handleBlur, setStep } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
      }}
    >
      <Typography sx={{ fontSize: "1rem", fontWeight: "600", mb: "20px" }}>
        Datos del solicitante
      </Typography>
      <Typography
        sx={{
          fontSize: "1.125rem",
          fontWeight: "400",
          color: "#57534E",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
      >
        NOMBRE COMPLETO
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Maria Luiza Alves"
        className="input-field"
        value={values.fullname}
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
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000 !important",
          },
        }}
        error={Boolean(touched.fullname && errors.fullname)}
        helperText={touched.fullname && errors.fullname ? errors.fullname : ""}
        name="fullname"
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
        DNI
      </Typography>
      <TextField
        variant="outlined"
        placeholder="12.123.123"
        className="input-field"
        value={values.dni}
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
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000 !important",
          },
        }}
        slotProps={{
          input: {
            inputComponent: DNIMaskCustom,
          },
        }}
        error={Boolean(touched.dni && errors.dni)}
        helperText={touched.dni && errors.dni ? errors.dni : ""}
        name="dni"
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
        FECHA DE NACIMIENTO
      </Typography>
      <TextField
        value={values.birthdate}
        onChange={handleChange}
        placeholder="12/12/2012"
        variant="outlined"
        name="birthdate"
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
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000 !important",
          },
        }}
        slotProps={{
          input: {
            inputComponent: DateMaskCustom,
          },
        }}
        error={Boolean(touched.birthdate && errors.birthdate)}
        helperText={touched.birthdate && errors.birthdate ? errors.birthdate : ""}
      />
    </Box>
  );
}
export default ClaimerFormComponent;
