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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IMaskInput } from 'react-imask';
import { styled } from '@mui/material/styles';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from "@mui/material/Grid2";


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

const CuitTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    borderRadius: "12px",
    p:"30px",
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));



function ClaimerFormComponent(props) {
  const { values, touched, errors, handleChange, handleBlur, setStep } = props;
  const [showGender, setShowGender] = useState(false);
  const genderOptions = [
    { value: "female", label: "Femenino" },
    { value: "male", label: "Masculino" },
    { value: "x", label: "X" },
    { value: "other", label: "Otro" },
    { value: "none", label: "Prefiero no decirlo" },
  ];

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
        value={values.fullname_cl}
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
        error={Boolean(touched.fullname_cl && errors.fullname_cl)}
        helperText={touched.fullname_cl && errors.fullname_cl ? errors.fullname_cl : ""}
        name="fullname_cl"
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
        value={values.dni_cl}
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
        error={Boolean(touched.dni_cl && errors.dni_cl)}
        helperText={touched.dni_cl && errors.dni_cl ? errors.dni_cl : ""}
        name="dni_cl"
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
        CUIL/CUIT
      </Typography>
      <TextField
        value={values.cuit_cl}
        onChange={handleChange}
        placeholder="12-12123123-1"
        variant="outlined"
        name="cuit_cl"
        className="input-field"
        onBlur={handleBlur}
        InputProps={{
          inputComponent: CuitMaskCustom,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="ayuda con el CUIT">
              <CuitTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" sx={{mb:"5px"}}>No sabes tu CUIT o CUIL?</Typography>
                      <em>Ingresa <a href="https://serviciosweb.afip.gob.ar/publico/cuitonline/infopersonal.aspx" target="_blank" style={{color:"#00AEC3"}}>AQUI</a> y te ayudamos</em>
                    </React.Fragment>
                  }
                >
                  <HelpIcon sx={{color:"#00AEC3"}} />
                </CuitTooltip>
              </IconButton>
            </InputAdornment>
          ),
        }}
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
        error={Boolean(touched.cuit_cl && errors.cuit_cl)}
        helperText={touched.cuit_cl && errors.cuit_cl ? errors.cuit_cl : ""}
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
        placeholder="luisitasfr@gmail.com"
        className="input-field"
        value={values.email_cl}
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
        error={Boolean(touched.email_cl && errors.email_cl)}
        helperText={touched.email_cl && errors.email_cl ? errors.email_cl : ""}
        name="email_cl"
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
        GENERO
      </Typography>
      <Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFF",
            color: "#57534E",
            fontFamily: "Encode Sans",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            width: "100%",
            p: "15px 20px",
            justifyContent: "space-between",
            border: "1px solid #000",
            borderRadius: "8px",
          }}
          onClick={() => setShowGender(!showGender)}
          endIcon={
            showGender ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          {values.gender_cl != "" ? genderOptions.find(
            (option) => option.value === values.gender_cl
          ).label :"SELECCIONAR"}   
        </Button>
        {showGender && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: "400px",
              overflow: "scroll",
              p: "10px 20px",
              background: "rgba(0, 174, 195, 0.30)",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "0px 0px 19px 19px",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                value={values.gender_cl}
                name="gender_cl"
                onChange={handleChange}
              >
                <Grid container spacing={1}>
                  {genderOptions.map(({ value, label }) => (
                    <Grid item="true" size={{ xs: 12, sm: 4, md: 4 }} key={value}>
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={label}
                        sx={{
                          "& .MuiRadio-root.Mui-checked": {
                            color: "#000",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default ClaimerFormComponent;
