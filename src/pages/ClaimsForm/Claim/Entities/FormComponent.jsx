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
import SupplierFormComponent from "./SupplierFormComponent";
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
  const [supplierSelected, setSupplierSelected] = useState(-1);
  const [alertTypeFile, setAlertTypeFile] = useState(false);
  const captchaRef = useRef(null);
  const [validateCaptcha, setValidateCaptcha] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [addingNewSupplier,setAddingNewSupplier] = useState(true);

  const [newSupplier, setNewSupplier] = useState({
    cuil_sp: "",
    fullname_sp: "",
    address_sp: "",
    num_address_sp: "",
    city_sp: "",
    zip_code_sp: "",
  });

  const handleAddSupplier = () => {
    setNewSupplier({
      cuil_sp: "",
      fullname_sp: "",
      address_sp: "",
      num_address_sp: "",
      city_sp: "",
      zip_code_sp: "",
    });
    setAddingNewSupplier(true)
  };
  const handleSetSupplierSelected = (index) => {
    if (index === supplierSelected) {
      setSupplierSelected(-1);
    } else {
      setSupplierSelected(index);
    }
  };

  const handleDeleteSupplier = (index) => {
    const suppliers = [...values.suppliers];
    suppliers.splice(index, 1);
    setFieldValue("suppliers", suppliers);
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length > 0) {
      const allowedExtensions = ["jpg", "png", "pdf"];
      const validFiles = uploadedFiles.filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
      );

      if (validFiles.length > 0) {
        setFieldValue("files", [...values.files, ...validFiles]);
      } else {
        setAlertTypeFile(true); // Mostrar alerta si no hay archivos válidos
      }
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = values.files.filter((_, i) => i !== index);
    setFieldValue("files", updatedFiles);
  };

  const handleRecaptcha = async (token) => {
    await api(VALIDATE_RECAPTCHA, {
      method: "POST",
      body: { token: token },
    }).then(({ ok, body }) => {
      if (ok) {
        setValidateCaptcha(true);
      } else {
        setValidateCaptcha(false);
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
                      "url(../../assets/claims/img-3.png) lightgray 50% / cover no-repeat",
                    mb: "30px",
                    height: "190px",
                    width: "480px",
                  }}
                />
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "400" }}>
                  ¿Sos el titular del producto o servicio?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    value={values.radioButton_1_cl}
                    name="radioButton_1_cl"
                    onChange={handleChange}
                    sx={{ flexDirection: "row", m: "10px" }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="NO"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "400" }}>
                  ¿Utilizás el producto o servicio? ¿Sos usuario?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="radioButton_2_cl"
                    value={values.radioButton_2_cl}
                    onChange={handleChange}
                    sx={{ flexDirection: "row", m: "10px" }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="NO"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
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
                onClick={() => setStep(1)}
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
                Complete{" "}
                <span style={{ color: "#00AEC3" }}>
                  los datos del proveedor del producto o servicio
                </span>{" "}
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
              minHeight:"400px"
            }}
          >
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: values.suppliers.length < 3 ? "space-between":"center",
                p: "0rem 2.5rem",
              }}
            >
              {values.suppliers.length > 0 &&
                values.suppliers.map((supplier, index) => (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                      marginBottom: "20px",
                    }}
                    key={index}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography sx={{ mb: "5px" }}>
                        Proveedor {index + 1}
                      </Typography>
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
                        onClick={() => handleSetSupplierSelected(index)}
                        endIcon={
                          index === supplierSelected ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                      >
                        {supplier.fullname_sp}
                      </Button>
                      {index === supplierSelected && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflow: "scroll",
                            background: "rgba(158, 158, 158, 0.10)",
                            borderRadius: "0px 0px 19px 19px",
                            width: "100%",
                          }}
                        >
                          <SupplierFormComponent
                            touched={touched}
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            newSupplier={supplier}
                            setNewSupplier={setNewSupplier}
                            isNew="false"
                          />
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <img
                        src="../../icons/delete.png"
                        alt="delete"
                        style={{
                          marginLeft: "1rem",
                          marginTop: "45px",
                          p: "15px 0px",
                          width: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteSupplier(index)}
                      />
                    </Box>
                  </Box>
                ))}
              {addingNewSupplier &&(
                <SupplierFormComponent
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleBlur={handleBlur}
                  newSupplier={newSupplier}
                  setNewSupplier={setNewSupplier}
                  handleAddSupplier={handleAddSupplier}
                  setAddingNewSupplier={setAddingNewSupplier}
                  setFieldValue={setFieldValue}
                />
              )}
              {(values.suppliers.length < 3 && !addingNewSupplier) &&
              <Button
                onClick={() => handleAddSupplier()}
                disabled={values.suppliers.length === 0}
                sx={{
                  borderRadius: "50px",
                  color: "#E81F76",
                  border:"1px solid #E81F76",
                  mt:"20px",
                  fontFamily: "Encode Sans",
                  width:"294px",
                  p:"12px 50px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  mt:"100px",
                  textTransform: "capitalize",
                  backgroundColor: "#fff",
                  boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#E81F76",
                    transform: "scale(1.01)"
                  },
                }}
              >
                Agregar otro proveedor
              </Button>
              }
            </Grid>
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: "0px 80px",
                minHeight: "400px",
              }}
            >
              <Typography sx={{ mb: 4 }}>
                Esta información la podés sacar de tu factura o ticket
              </Typography>
              <Typography sx={{ mb: 4 }}>
                1 - Carga los datos solicitados para continuar
              </Typography>
              <Typography sx={{ mb: 4 }}>
                2 - Si no conoces el CUIL/CUIT del proveedor hacé click en "no sé el CUIL/CUIT del proveedor" y continua con los siguientes datos.
              </Typography>
              <Typography>
                3 - Validá el proveedor para continuar.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              mb: "50px",
            }}
          >
            <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => setStep(2)}
                disabled={values.suppliers.length === 0}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#00AEC3",
                  color: "#FFF",
                  padding: "9px 30px",
                  fontFamily: "Encode Sans",
                  fontSize: "1rem",
                  fontWeight: "700",
                  width: "70%",
                  textTransform: "capitalize",
                  maxWidth: "590px",
                  "&:hover": {
                    color: "#FFF",
                    backgroundColor: "#00AEC3",
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
                  fontWeight: "700",
                  textTransform: "capitalize",
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
                <span style={{ color: "#00AEC3" }}>Describa</span> el problema.
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
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "400",
                  color: "#57534E",
                }}
              >
                Descripción del problema
              </Typography>
              <TextField
                maxRows={Infinity}
                minRows={7}
                multiline
                value={values.comments}
                onChange={handleChange}
                error={Boolean(touched.comments && errors.comments)}
                name="comments"
                className="swt-user-select-content"
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  border: "1px solid #D6D3D1",

                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    p: "20px",
                    fontFamily: "Encode Sans",
                    overflow: "scroll !important",
                    maxHeight: "150px",
                    height: "150px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                    borderColor: "unset !important",
                  },
                }}
                aria-label="maximum height"
                placeholder="Describa aquí su problema.."
              />
              <Typography
                  sx={{ color: "#B42318", textAlign: "end", mt: "10px" }}
                >
                  *Es necesario que nos des una breve descripcion de tu problema
              </Typography>
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
              <Typography sx={{ mb: 4 }}>
                Relatá los motivos de tu reclamo. Intentá ser breve, informá qué producto compraste o qué servicio contrataste y explicá el problema: los incumplimientos, los proveedores y tu pretensión. 
              </Typography>
              <Typography>
                Si tenés entre 13 y 17 años, o sos adulto mayor, migrante, turista, miembro de comunidades indígenas o del colectivo LGBT+, persona con discapacidad o estás en situación de vulnerabilidad socioeconómica y tu situación fue especialmente vulnerada, por favor especificalo en tu reclamo, para aplicar el protocolo de consumidores hipervulnerables
              </Typography>
            </Grid>
          </Grid>
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
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: "400",
                    marginBottom: "10px",
                    color: "#57534E",
                  }}
                >
                  Adjuntar archivos
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "200px",
                    borderRadius: "8px",
                    borderColor: "#D6D3D1",
                    borderStyle: "dashed",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: values.files.length > 0 ? "start" : "center",
                    justifyContent: "center",
                  }}
                >
                  {values.files.length > 0 && (
                    <Grid
                      container
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      sx={{ minWidth: "80%" }}
                    >
                      {values.files.map((file, index) => (
                        <Grid
                          item="true"
                          key={index}
                          size={{ xs: 12, sm: 8, md: 4 }}
                          sx={{ width: "100%" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "40px",
                              background: "rgba(217, 217, 217, 0.50)",
                              borderRadius: "8px",
                              margin: "5px",
                              width: "auto",
                              p: "0px 10px",
                              justifyContent: "space-between",
                            }}
                          >
                            <img
                              style={{ width: "18px" }}
                              src="../../icons/file-jpg.svg"
                            />
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                width: "100px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                              }}
                            >
                              {file.name}
                            </Typography>
                            <img
                              style={{ width: "13px", cursor: "pointer" }}
                              onClick={() => handleFileDelete(index)}
                              src="../../icons/delete.png"
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {values.files.length !== 10 && (
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        border: "unset",
                        color: "#5E5E5E",
                        fontFamily: "Encode Sans",
                        fontSize: values.files.length > 0 ? "0.65rem" : "1rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        "&:hover": {
                          backgroundColor: "unset",
                          border: "unset",
                        },
                      }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        hidden
                        onChange={handleFileUpload}
                      />
                      <img
                        width={values.files.length > 0 ? 34 : 70}
                        src="../../icons/cloud-upload.png"
                      />
                      {values.files.length > 0
                        ? "Subir archivo"
                        : "Click acá para subir archivos"}
                    </Button>
                  )}
                  <Dialog
                    open={alertTypeFile}
                    onClose={() => setAlertTypeFile(!alertTypeFile)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                      "&.MuiDialog-root .MuiDialog-paper": {
                        padding: "30px 50px",
                        border: "2px solid #B42318",
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
                      El formato del archivo que estás intentando subir, no es
                      válido.
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        sx={{
                          fontFamily: "Encode Sans",
                          fontSize: "18px",
                          fontWeight: "300",
                          color: "#262626",
                        }}
                        id="alert-dialog-description"
                      >
                        Por favor volvé a intentarlo con formatos PDF, JPG, PNG.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ mt: "40px" }}>
                      <Button
                        sx={{
                          borderRadius: "50px",
                          backgroundColor: "#B42318",
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
                            backgroundColor: "#000",
                            borderColor: "Blue",
                          },
                        }}
                        onClick={() => setAlertTypeFile(!alertTypeFile)}
                        autoFocus
                      >
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                {values.files.length === 10 && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Typography>
                      Limite de carga de documentos alcanzado.
                    </Typography>
                  </Box>
                )}
              </Box>
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
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {
                  "Podés adjuntar hasta 10 documentos de tipo pdf, jpg y png.\n• Adjuntá tu DNI, frente y dorso, para agilizar la admisión.\n• Si tenés una factura de compra o de servicios, adjuntala aquí.\n • Incluí toda la documentación relacionada con tu reclamo."
                }
              </Typography>
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
                onClick={() => setShowConfirmMessage(!showConfirmMessage)}
                disabled={values.comments === ""}
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
                    backgroundColor: "#00AEC3",
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
                      backgroundColor: "#000",
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
