import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Grid,
  Box,
  Typography,
  useTheme,
  Pagination,
  PaginationItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Navigate, useNavigate } from "react-router-dom";

function TrafficLightSystemTimesComponent(props) {
  const {
    api,
    values,
    setFieldValue,
    touched,
    errors,
    isValid,
    config,
    dirty,
    handleBlur,
    handleChange,
    handleOnSubmit,
  } = props;
  const navigate = useNavigate()
  const [confirmSendInfo,setConfirmSendInfo] = useState(false)
  const [sendInfo,setSendInfo] = useState(false)


  const handleSendConfig = () =>{
    handleOnSubmit(values)
    setConfirmSendInfo(false)
    setSendInfo(true)
  }

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: "100px",mb:"100px" }}
      >
        <Box sx={{ width: "1000px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                alt="timer"
                src="../../assets/config/timer.svg"
                style={{
                  height: "100px",
                  width: "40px",
                  color: "#E81F76",
                  top: "0px",
                }}
              />

              <Typography
                sx={{
                  color: "#262626",
                  fontSize: "2rem",
                  fontWeight: "600",
                  ml: "50px",
                }}
              >
                Configuración de los tiempos del sistema de semáforo
              </Typography>
            </Box>
            <Box sx={{ ml: "100px" }}>
              <Typography sx={{ fontWeight: "300" }}>
                A continuación deberá definir los tiempos para el cambio de
                tiempos del sistema de semáforos, el mismo se aplicará
                automáticamente a todos los reclamos que ingresen luego de
                confirmar los cambios.
              </Typography>
              <Box
                sx={{
                  width: "754px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "234px",
                  backgroundColor: "#000",
                  p: "10px 30px",
                  borderRadius: "30px",
                  mt: "40px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio de verde-amarillo
                  </Typography>
                  <Box sx={{ mr: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#0C8D00" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.greenToYellow} horas`}
                        onChange={handleChange}
                        name="greenToYellow"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow",
                                  value: Math.max(values.greenToYellow - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow",
                                  value: values.greenToYellow + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "24px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio de amarillo-rojo
                  </Typography>
                  <Box sx={{ mr: "30px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#DC2626" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.yellowToRed} horas`}
                        onChange={handleChange}
                        name="yellowToRed"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed",
                                  value: Math.max(values.yellowToRed - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed",
                                  value: values.yellowToRed + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                alt="timer"
                src="../../assets/config/dvr.svg"
                style={{
                  height: "100px",
                  width: "40px",
                  color: "#E81F76",
                  top: "0px",
                }}
              />

              <Typography
                sx={{
                  color: "#262626",
                  fontSize: "2rem",
                  fontWeight: "600",
                  ml: "50px",
                }}
              >
                Historial de cambios de configuración:
              </Typography>
            </Box>
            <Box sx={{ ml: "100px" }}>
              <ul>
                <li style={{color:"#E81F76"}}>Última actualización: <span style={{color:"#000"}}>{config.modified_by}</span></li>
                {/* <li style={{color:"#E81F76"}}>Cambio realizado: <span style={{color:"#000"}}>“Tiempo de cambio de amarillo-rojo”</span></li> */}
                <li style={{color:"#E81F76"}}>Fecha y hora de la modificación: <span style={{color:"#000"}}>{config.modified_at}</span> </li>
              </ul>   
            </Box>
          </Box>
          <Box sx={{display:"flex",flexDirection:"row",justifyContent:"end",mt:"50px"}}>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 30px",
                borderRadius:"50px",
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "500",
                minWidth:"190px",
                border:"1px solid #000",
                textTransform: "capitalize",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              }}
              onClick={()=>navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                backgroundColor: "#00AEC3",
                color: "#000",
                padding: "9px 30px",
                borderRadius:"50px",
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "500",
                minWidth:"250px",
                ml:"40px",
                textTransform: "capitalize",
                ":hover": {
                  color: "#000",
                  backgroundColor: "#00AEC3",
                  borderColor: "#00AEC3",
                },
              }}
              onClick={() => setConfirmSendInfo(!confirmSendInfo)}
            >
              Aplicar cambios
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
          open={confirmSendInfo}
          onClose={() => setConfirmSendInfo(!confirmSendInfo)}
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
            ¿Está seguro de querer modificar los tiempos del Sistema de semáforos?
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
              Al hacerlo, todos los reclamos utilizaran la nueva configuración del semáforo.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: "40px" }}>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#fff",
                border:"1px solid #000",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "#000",
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
                  borderColor: "#000",
                },
              }}
              onClick={() => setConfirmSendInfo(!confirmSendInfo)}
              autoFocus
            >
              Cancelar
            </Button>
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
                  borderColor: "#000",
                },
              }}
              onClick={() => handleSendConfig()}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={sendInfo}
          onClose={() => setSendInfo(!sendInfo)}
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
            Los cambios fueron aplicados exitosamente.
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
             Si desea volver a modificarlos debe hacerlo nuevamente desde “Configuración sistema de semáforo”
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: "40px" }}>
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
                  borderColor: "#000",
                },
              }}
              onClick={() => navigate(0)}
              autoFocus
            >
              Terminar
            </Button>
          </DialogActions>
        </Dialog>
    </Content>
  );
}

export default TrafficLightSystemTimesComponent;
