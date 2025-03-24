import React, { useState, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tokens } from "theme";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import ClaimerFormComponent from "./ClaimerFormComponent";
import ReCAPTCHA from "react-google-recaptcha";
import { VALIDATE_RECAPTCHA } from "constant/endpoints";


function FormComponent(props) {
  const {
    api,
    values,
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

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [alertTypeFile, setAlertTypeFile] = useState(false);
  const captchaRef = useRef(null);
  const [validateCaptcha, setValidateCaptcha] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  
  const [reasons,setReasons] = useState([
    { label: "Me negaron la práctica", value: "me_negaron_la_practica" },
    { label: "El personal de salud no respetó mi libertad en la toma de decisión", value: "libertad_toma_decision" },
    { label: "Me asignan turnos médicos y/o de estudios sin cumplir el plazo de días", value: "turnos_medicos_plazo_dias" },
    { label: "Me obstaculizan la atención médica", value: "obstaculizan_atencion_medica" },
    { label: "No me brindaron acceso a métodos anticonceptivos (posaborto)", value: "sin_acceso_metodos_anticonceptivos" },
    { label: "No me reintegraron la práctica", value: "no_reintegraron_practica" },
    { label: "No me reintegraron los medicamentos", value: "no_reintegraron_medicamentos" },
    { label: "No me suministraron los medicamentos", value: "no_suministraron_medicamentos" },
    { label: "No tuve atención posaborto", value: "sin_atencion_posaborto" },
    { label: "Pasaron más de 10 días sin respuesta desde que solicité la práctica", value: "mas_de_10_dias_sin_respuesta" },
    { label: "Tuve dificultades en el trato con el personal de salud", value: "dificultades_trato_personal" },
    { label: "Otra", value: "otra" }
  ])

  const handleToggleReason = (reason) => {
    setSelectedReasons((prevReasons) => 
      prevReasons.includes(reason)
        ? prevReasons.filter((r) => r !== reason) // Si está, lo elimina
        : [...prevReasons, reason] // Si no está, lo agrega
    );
  };
  
  const handleRecaptcha = async (token) => {
    await api(VALIDATE_RECAPTCHA, {
      method: "POST",
      body: { token: token },
    }).then(({ ok, body }) => {
      if (ok) {
        setValidateCaptcha(true);
        setFieldValue("reasons", selectedReasons);
      } else {
        setValidateCaptcha(false)
      }
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fff", padding: "10px 50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "100px",
            border: "unset",
            color: "#57534E",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&:hover": {
              backgroundColor: "unset",
              border: "unset",
            },
          }}
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
        <a href="/">
          <img
            alt="logo"
            src={`../../logo.svg`}
            style={{ height: "70px", marginTop: "20px" }}
          />
        </a>
      </Box>
      {step === 0 && (
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
                Complete <span style={{ color: "#00AEC3" }}>sus datos</span>{" "}
                para continuar su reclamo.
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
              <ClaimerFormComponent
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setStep={setStep}
              />
            </Grid>
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
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "94.5px 0px",
                    background:
                      "url(../../assets/claims/ive/img-2.png) lightgray 50% / cover no-repeat",
                    mb: "30px",
                    height: "390px",
                    width: "480px",
                  }}
                />

              </Box>
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
                onClick={() => navigate(-1)}
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
                    backgroundColor: "#A83E83",
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
                onClick={() => setStep(1)}
                // disabled={
                //   ['dni', 'fullname', 'birthdate'].some(
                //     (field) => errors[field] || !touched[field]
                //   )
                // }
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A83E83",
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
                    backgroundColor: "#A83E83",
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
      )}
      {step === 1 && (
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
                  fontSize: "3.5rem",
                  fontWeight: "700",
                  marginTop: "55px",
                }}
              >
                Datos de{" "}
                <span style={{ color: "#00AEC3" }}>
                  contacto
                </span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                Es necesario que pueda ingresar los datos solicitados para poder completar y enviar su reclamo.
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
                p: "0rem 2.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                }}
              >
                <Typography sx={{ fontSize: "1rem", fontWeight: "600", mb: "20px" }}>
                  Datos para contactarnos con vos
                </Typography>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                CORREO ELECTRONICO
              </Typography>
              <TextField
                variant="outlined"
                placeholder="luisitasfr@gmail.com"
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
                    borderColor: "#000 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                  },
                }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : ""}
                name="email"
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
                REPETIR CORREO ELECTRONICO
              </Typography>
              <TextField
                variant="outlined"
                placeholder="luisitasfr@gmail.com"
                className="input-field"
                value={values.email_confirm}
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
                
                name="email_confirm"
                onChange={handleChange}
              />
              {touched.email_confirm && errors.email_confirm && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.email_confirm}
                  </Typography>
                )}
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                NUMERO DE TELEFONO MÓVIL
              </Typography>
              <TextField
                variant="outlined"
                placeholder="2214553565"
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
                    borderColor: "#000 !important",
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                  },
                }}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone ? errors.phone : ""}
                name="phone"
                onChange={handleChange}
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
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "94.5px 0px",
                    background:
                      "url(../../assets/claims/ive/img-3.png) lightgray 50% / cover no-repeat",
                    mb: "30px",
                    height: "390px",
                    width: "480px",
                  }}
                />
              </Box>
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
                    backgroundColor: "#A83E83",
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
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A83E83",
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
                    backgroundColor: "#A83E83",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#a6a5a6",
                    color: "#fff",
                  },
                }}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {step === 2 && (
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
                  fontSize: "3.5rem",
                  fontWeight: "700",
                  marginTop: "55px",
                }}
              >
                <span style={{ color: "#00AEC3" }}>Datos</span> del problema.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                Es necesario que ingreses los datos solicitados para completar y enviar tu reclamo.
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={12}
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
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", fontWeight: "400" }}>
                ¿TENÉS OBRA SOCIAL O EMPRESA DE MEDICINA PRIVADA?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="radioButton_2_cl"
                    value={values.radioButton_2_cl}
                    onChange={handleChange}
                    sx={{ flexDirection: "row"}}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio sx={{"&.MuiButtonBase-root.MuiRadio-root.Mui-checked":{color:"#A83E83"}, color:"#A83E83"}} />}
                      label="NO"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio sx={{"&.MuiButtonBase-root.MuiRadio-root.Mui-checked":{color:"#A83E83"}, color:"#A83E83"}}/>}
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              <Typography sx={{ fontSize: "1.125rem", fontWeight: "400" }}>
              ¿QUIÉN CONSIDERAS QUE VULNERÓ TU DERECHO A LA IVE?
              </Typography>
              <FormControlLabel
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  display: "flex",
                }}
                control={
                  <Checkbox
                    onChange={(event) => setFieldValue('checkbox_social_work_or_company', event.target.checked)}
                    checked={values.checkbox_social_work_or_company}
                    name="checkbox_social_work_or_company"
                    sx={{ color:"#A83E83","&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                      {
                        color: "#A83E83",
                      }, }}
                  />
                }
                label="La obra social o Empresa de Medicina privada"
              />
              <TextField
                value={values.social_work_or_company}
                onChange={handleChange}
                disabled={!values.checkbox_social_work_or_company}
                placeholder="La obra social o Empresa de Medicina privada"
                variant="outlined"
                name="social_work_or_company"
                className="input-field"
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    background: !values.checkbox_social_work_or_company && "#E7E5E4"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                    borderRadius: "8px",
                    border: !values.checkbox_social_work_or_company && "unset",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                  },
                }}
              />
              <FormControlLabel
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  display: "flex",
                }}
                control={
                  <Checkbox
                    onChange={(event) => setFieldValue('checkbox_establishment', event.target.checked)}
                    checked={values.checkbox_establishment}
                    name="checkbox_establishment"
                    sx={{ color:"#A83E83","&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                      {
                        color: "#A83E83",
                      }, }}
                  />
                }
                label="El establecimiento donde te atendiste"
              />
              <TextField
                value={values.establishment}
                onChange={handleChange}
                placeholder="El establecimiento donde te atendiste"
                variant="outlined"
                name="establishment"
                className="input-field"
                disabled={!values.checkbox_establishment}
                onBlur={handleBlur}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    background: !values.checkbox_establishment && "#E7E5E4"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                    borderRadius: "8px",
                    border: !values.checkbox_establishment && "unset"
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                  },
                }}
              />
              <FormControlLabel
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  display: "flex",
                }}
                control={
                  <Checkbox
                    onChange={(event) => setFieldValue('checkbox_other', event.target.checked)}
                    checked={values.checkbox_other}
                    name="checkbox_other"
                    sx={{ color:"#A83E83","&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                      {
                        color: "#A83E83",
                      }, }}
                  />
                }
                label="Otro"
              />
              <TextField
                value={values.other}
                onChange={handleChange}
                placeholder="Otro"
                variant="outlined"
                name="other"
                className="input-field"
                onBlur={handleBlur}
                disabled={!values.checkbox_other}
                sx={{
                  mt: "5px",
                  mb: "10px",
                  "& .MuiInputBase-root.MuiOutlinedInput-root": {
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    background: !values.checkbox_other && "#E7E5E4"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                    borderRadius: "8px",
                    border: !values.checkbox_other && "unset",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000 !important",
                  },
                }}
              />
            </Grid>
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", fontWeight: "400" }}>
              ¿CUÁL ES EL MOTIVO DE TU DENUNCIA?
              </Typography>
              {reasons.map((reason, index) => (
                    <FormControlLabel
                      key={reason.value}
                      control={
                        <Checkbox
                          checked={selectedReasons.includes(reason.value)}
                          key={index}
                          onChange={() =>
                            handleToggleReason(reason.value)
                          }
                          sx={{
                            color: "#A83E83",
                            "&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                              {
                                color: "#A83E83",
                              },
                          }}
                        />
                      }
                      label={reason.label}
                      sx={{
                        width: "100%",
                      }}
                    />
                  ))}
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
                onClick={() => setStep(1)}
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
                    backgroundColor: "#A83E83",
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
                onClick={() => setShowConfirmMessage(!showConfirmMessage)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A83E83",
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
                    backgroundColor: "#A83E83",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  },
                }}
              >
                Enviar reclamo
              </Button>
            </Grid>
          </Grid>
          <Dialog
            open={showConfirmMessage}
            onClose={() => setShowConfirmMessage(!showConfirmMessage)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              "&.MuiDialog-root .MuiDialog-paper": {
                padding: "30px 50px",
                border: "2px solid #00AEC3",
                borderRadius: "50px",
                maxWidth: "unset",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "27px",
                fontWeight: "600",
                color: "#262626",
              }}
              id="alert-dialog-title"
            >
              Por favor haga click en el siguiente mensaje reCAPTCHA.
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  fontFamily: "Encode Sans",
                  fontSize: "18px",
                  fontWeight: "300",
                  color: "#262626",
                  height: "100%",
                }}
                id="alert-dialog-description"
              >
                Es una manera de asegurarnos que seas un humano, antes de enviar
                el reclamo..
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                  }}
                >
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6LerH4sqAAAAAFNi26JOZFEs8ZuRl_DPQU6H_EKE"
                    onChange={handleRecaptcha}
                  />
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mt: "20px" }}>
              <Button
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  border: "2px solid #838383",
                  color: "#000",
                  padding: "9px 0px",
                  fontFamily: "Encode Sans",
                  fontSize: "16px",
                  fontWeight: "500",
                  width: "200px",
                  textTransform: "capitalize",
                  ":hover": {
                    color: "#FFF",
                    backgroundColor: "#000",
                  },
                }}
                onClick={() => setShowConfirmMessage(!showConfirmMessage)}
              >
                Cancelar
              </Button>
              {validateCaptcha && (
                <Button
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "#A83E83",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    color: "#fff",
                    padding: "9px 0px",
                    fontFamily: "Encode Sans",
                    fontSize: "16px",
                    fontWeight: "500",
                    ml: "20px",
                    width: "200px",
                    textTransform: "capitalize",
                    ":hover": {
                      color: "#FFF",
                      backgroundColor: "#A83E83",
                      borderColor: "Blue",
                    },
                  }}
                  onClick={() => handleOnSubmit(values)}
                  autoFocus
                >
                  Enviar reclamo
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default FormComponent;
