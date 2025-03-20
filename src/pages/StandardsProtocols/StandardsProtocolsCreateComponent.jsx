import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Pagination,
  PaginationItem,
  Divider,
  IconButton,
  Button,
  TextField,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { tokens } from "../../theme";

function StandardsProtocolsComponent(props) {
  const {
    showCreate,
    setShowCreate,
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
  const [showConfirm,setShowConfirm] = useState(false)

  const extensionMap = {
    docx: "doc",
  };

  const handleFileUpload = (event) => {
    const uploadedFile = Array.from(event.target.files);
    if (uploadedFile.length > 0) {
      const allowedExtensions = ["pdf","doc","docx"];
      const validFile = uploadedFile.filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
      );
      if (validFile.length > 0) {
        setFieldValue("file", [...values.file, ...validFile]);
      } 
    }
  };

  const handleFileDelete = (index) => {
    const updatedFile = values.file.filter((_, i) => i !== index);
    setFieldValue("file", updatedFile);
  };

  return (
    <>
    <Dialog
      open={showCreate}
      onClose={() => setShowCreate(!showCreate)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "&.MuiDialog-root .MuiDialog-paper": {
          padding: "20px 20px",
          borderRadius: "30px",
          width: "960px",
          maxWidth: "1017px",
          minHeight: "80%",
        },
      }}
    >
      <DialogTitle
        sx={{ fontFamily: "Encode Sans", fontSize: "22px", fontWeight: "200" }}
        id="alert-dialog-title"
      >
        Cargar documento
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "16px",
            fontWeight: "300",
            mb: "20px",
          }}
          id="alert-dialog-description"
        >
          Cargue el documento deseado y la descripción del mismo.
        </DialogContentText>
        <Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "5px",
              backgroundColor: "#E81F76",
              height: "47px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                ml: "20px",
                fontWeight: "400",
                fontSize: "20px",
              }}
            >
              Complete la información
            </Typography>
          </Box>
          <Box
            sx={{
              p: "10px",
              border: "1px solid #646464",
              borderRadius: "5px",
              mt: "10px",
            }}
          >
            <TextField
              value={values.title}
              onChange={handleChange}
              placeholder="Titulo del protocolo"
              variant="outlined"
              name="title"
              className="input-field"
              onBlur={handleBlur}
              sx={{
                mt: "5px",
                mb: "10px",
                width: "300px",
                "& .MuiOutlinedInput-notchedOutline":{
                  borderRadius:"15px",
                  borderColor:"#D6D3D1 !important",
                },
                "& .MuiOutlinedInput-root":{
                  fontWeight:"500"
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                  borderColor:"#D6D3D1 !important",
                  borderRadius:"15px",
                },
              }}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title ? errors.title : ""}
            />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#57534E",
              }}
            >
              Descripción del documento
            </Typography>
            <TextField
              maxRows={Infinity}
              minRows={7}
              multiline
              value={values.description}
              onChange={handleChange}
              error={Boolean(touched.description && errors.description)}
              name="description"
              className="swt-user-select-content"
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #D6D3D1",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  p: "0px 10px",
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
                    mt:"10px"
                  }}
                >
                  Adjuntar archivos
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    borderColor: "#D6D3D1",
                    borderStyle: "dashed",
                    display: "flex",
                    flexDirection: "row",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {values.file.length > 0 && (
                      values.file.map((file, index) => (
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
                              minWidth:"180px",
                              p: "0px 10px",
                              justifyContent: "space-between",
                            }}
                          >
                              <img
                                style={{ width: "25px" }}
                                src={`../../icons/file-${extensionMap[file.name.split(".").pop().toLowerCase()] || file.name.split(".").pop().toLowerCase() }.svg`}
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
                      ))
                  )}
                  {values.file.length === 0 && (
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        border: "unset",
                        width:"214px",
                        height:"36px",
                        color: "#000",
                        backgroundColor:"#B9EBF0",
                        fontFamily: "Encode Sans",
                        fontSize: "1rem",
                        fontWeight: "400",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      Subir archivo
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={handleFileUpload}
                      />
                      <img
                        width={25}
                        style={{marginLeft:"15px"}}
                        src="../../icons/cloud-upload.png"
                      />               
                    </Button>
                  )}
                </Box>
              </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            borderRadius: "50px",
            backgroundColor: "#fff",
            color: "#000",
            fontFamily: "Encode Sans",
            border: "2px solid #838383",
            fontSize: "18px",
            fontWeight: "500",
            width: "189px",
            height: "47px",
          }}
          onClick={() => setShowCreate(!showCreate)}
        >
          Cancelar
        </Button>
        <Button
          sx={{
            borderRadius: "50px",
            backgroundColor: "#00AEC3",
            color: "#fff",
            fontFamily: "Encode Sans",
            fontSize: "18px",
            fontWeight: "500",
            ml: "20px",
            width: "251px",
            height: "47px",
            "&.Mui-disabled": {
              backgroundColor: "#8F8881",
              color: "#fff",
            },
          }}
          disabled={(!values.file.length > 0) || (!isValid)}
          onClick={()=>{setShowConfirm(!showConfirm),setShowCreate(!showCreate)}}
        >
          Cargar documento
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
    open={showConfirm}
    onClose={() => setShowConfirm(!showConfirm)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    sx={{
      "&.MuiDialog-root .MuiDialog-paper": {
        padding: "20px 20px",
        borderRadius: "30px",
        width: "960px",
        maxWidth: "1017px",
        minHeight: "300px",
      },
    }}
  >
    <DialogTitle
      sx={{ fontFamily: "Encode Sans", fontSize: "36px", fontWeight: "600" ,mt:"30px"}}
      id="alert-dialog-title"
    >
      ¿Desea confirmar la carga del documento?
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        sx={{
          fontFamily: "Encode Sans",
          fontSize: "16px",
          fontWeight: "300",
        }}
        id="alert-dialog-description"
      >
        En caso de no querer confirmar la resolución, haga click en “cancelar”
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        sx={{
          borderRadius: "50px",
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "Encode Sans",
          border: "2px solid #838383",
          fontSize: "18px",
          fontWeight: "500",
          width: "189px",
          height: "47px",
        }}
        onClick={() => {setShowConfirm(!showConfirm),setShowCreate(!showCreate)}}
      >
        Cancelar
      </Button>
      <Button
        sx={{
          borderRadius: "50px",
          backgroundColor: "#00AEC3",
          color: "#fff",
          fontFamily: "Encode Sans",
          fontSize: "18px",
          fontWeight: "500",
          ml: "20px",
          width: "251px",
          height: "47px",
        }}
        onClick={()=>{setShowConfirm(!showConfirm),handleOnSubmit(values)}}
      >
        Aceptar y cargar
      </Button>
    </DialogActions>
  </Dialog>
  </>
  );
}

export default StandardsProtocolsComponent;
