import React, { useState } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  InputLabel,
  Button,
  TextField,
  Switch,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Avatar,
  Grid,
  Checkbox,
} from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DropzoneComponent from "components/DragAndDrop/DropzoneComponent";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42, //56
  height: 20, //32
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 30,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(18px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 1,
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 18,
    borderRadius: 12,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

function EditUserComponent(props) {
  const { user, values, handleChange } = props;
  const [files, setFiles] = useState([values.perfil]);
  const [isDragActive, setIsDragActive] = useState(false);

  const [expanded, setExpanded] = useState([]);

  const [selectedPermisos, setSelectedPermisos] = useState({});

  // Array de permisos de ejemplo
  const permisos = [
    "Permiso numero 1",
    "Permiso numero 2",
    "Permiso numero 3",
    "Permiso numero 4",
    "Permiso numero 5",
    "Permiso numero 6",
    "Permiso numero 7",
    "Permiso numero 8",
    "Permiso numero 9",
    "Permiso numero 10",
    "Permiso numero 11",
    "Permiso numero 12",
    "Permiso numero 13",
    "Permiso numero 14",
  ];

  const handleChangePermission = (index) => {
    setSelectedPermisos((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre marcado y no marcado
    }));
  };

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const handleOnChange = (event) => {
    setFiles([event.target.files[0]]);
  };
  const handleRemoveImage = (event) => {
    setFiles([]);
  };

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box
        sx={{
          margin: "50px 100px",
          display: "flex",
          flexDirection: "row",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginBottom: "20px" }}>
              <Box
                sx={{
                  border: "2px dotted #007EF6",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <DropzoneComponent
                  setFiles={setFiles}
                  setIsDragActive={setIsDragActive}
                />
                <Box
                  sx={{
                    borderRadius: "50%",
                    minWidth: "200px",
                    minHeight: "200px",
                    backgroundColor: "#D1E8FD",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    border: isDragActive ? "1px solid #007EF6" : "none",
                  }}
                >
                  {isDragActive ? (
                    <Typography>Soltar</Typography>
                  ) : (
                    <>
                      {/** Queda resolver un pequeño bug*/}
                      {files && files.length > 0 ? (
                        <Avatar
                          src={files[0]}
                          alt={files[0].name}
                          sx={{
                            minWidth: "200px",
                            minHeight: "200px",
                          }}
                        />
                      ) : (
                        <>
                          <img
                            src="../assets/perfil_default.svg"
                            style={{
                              backgroundColor: "#FFFFFF",
                              borderRadius: "8px",
                              width: "43px",
                              height: "43px",
                              marginBottom: "20px",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "8px",
                              fontWeight: "500",
                              color: "#1A2132",
                            }}
                          >
                            <Typography variant="span" color={"#004DEF"}>
                              Selecciona
                            </Typography>{" "}
                            o arrastra una imagen
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "8px",
                              color: "#5C5C7C",
                            }}
                          >
                            Formatos compatibles: jpg, jpeg, png
                          </Typography>
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <InputLabel
                htmlFor="textfield"
                sx={{
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#007EF6",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CloudUploadOutlined
                  sx={{
                    color: "#007EF6",
                    width: "15px",
                    marginRight: "10px",
                  }}
                />{" "}
                Subir imagen
              </InputLabel>
              <TextField
                id="textfield"
                sx={{ display: "none" }}
                type="file"
                onChange={handleOnChange}
              />
              {files.length > 0 && (
                <Button
                  variant="text"
                  sx={{
                    color: "#FF7272",
                    textTransform: "capitalize",
                    fontSize: "13px",
                  }}
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={handleRemoveImage}
                >
                  Eliminar imagen
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ width: "150px", marginTop: "50px" }}>
            <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
              <AntSwitch
                name="active"
                checked={values.active}
                onChange={handleChange}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>
                Usuario:{" "}
                {values.active ? (
                  <span style={{ color: "green" }}>Activo</span>
                ) : (
                  <span style={{ color: "red" }}>Inactivo</span>
                )}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "50px" }}
        >
          <Box>
            <Accordion
              expanded={expanded.includes("panel1")}
              onChange={handleChangeExpanded("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "#616161",
                  color: "#fff",
                  height: "60px",
                  "& .MuiAccordionSummary-content": {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <Typography sx={{ minWidth: "300px", flexShrink: 0 }}>
                  {values.fullname} ID {values.id}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "#fff", mr: "10px" }}
                />
                <Typography sx={{ minWidth: "200px" }}>
                  Rol: Usuario de {values.rol}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "#fff", mr: "10px" }}
                />
                <Typography sx={{ width: "450px" }}>
                  Permisos habilitados{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ minHeight: "200px", backgroundColor: "#D9D9D9" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: "300px",
                    }}
                  >
                    <Typography sx={{ marginTop: "20px" }}>
                      {values.email}
                    </Typography>
                    <Typography sx={{ marginTop: "20px" }}>
                      Usuario {values.rol}
                    </Typography>
                    <Typography sx={{ marginTop: "20px" }}>
                      {values.creation_date}
                    </Typography>
                    <Typography sx={{ marginTop: "20px" }}>OMIC</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: "200px",
                    }}
                  >
                    <Typography sx={{ marginTop: "20px", ml: "10px" }}>
                      Usuario Administrador
                    </Typography>
                    <Typography sx={{ marginTop: "20px", ml: "10px" }}>
                      Usuario Municipal
                    </Typography>
                    <Typography sx={{ marginTop: "20px", ml: "10px" }}>
                      Usuario de Soporte
                    </Typography>
                  </Box>
                  <Grid container spacing={2} sx={{ ml: 2 }}>
                    {permisos.map((permiso, index) => (
                      <React.Fragment key={index}>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography>{permiso}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            checked={!!selectedPermisos[index]}
                            onChange={() => handleChangePermission(index)}
                            sx={{
                              "&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                                {
                                  color: "rgba(0, 0, 0, 0.6)",
                                },
                            }}
                          />
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel2")}
              onChange={handleChangeExpanded("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "#616161",
                  color: "#fff",
                  height: "60px",
                }}
              >
                <Typography sx={{ minWidth: "300px", flexShrink: 0 }}>
                  Comentarios
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ minHeight: "200px", backgroundColor: "#D9D9D9" }}
              ></AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          mr: "100px",
          mb: "100px",
        }}
      >
        <Button
          onClick={() => setShowConfirmCreate(!showConfirmCreate)}
          type="submit"
          sx={{
            borderRadius: "2px",
            backgroundColor: "transparent",
            color: "#000",
            border: "1px solid #000",
            padding: "9px 30px",
            fontFamily: "Encode Sans, sans-serif",
            fontWeight: "500",
            ml: "20px",
            textTransform: "uppercase",
            ":hover": {
              color: "#FFF",
              backgroundColor: "#000",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => setShowConfirmCreate(!showConfirmCreate)}
          type="submit"
          sx={{
            borderRadius: "2px",
            backgroundColor: "transparent",
            border: "1px solid #000",
            color: "#000",
            padding: "9px 30px",
            fontFamily: "Encode Sans, sans-serif",
            fontWeight: "500",
            ml: "20px",
            textTransform: "uppercase",
            ":hover": {
              color: "#FFF",
              backgroundColor: "#000",
            },
          }}
        >
          Paso anterior
        </Button>
        <Button
          onClick={() => setShowConfirmCreate(!showConfirmCreate)}
          type="submit"
          sx={{
            borderRadius: "2px",
            backgroundColor: "#000",
            color: "#FFF",
            padding: "9px 30px",
            fontFamily: "Encode Sans, sans-serif",
            fontWeight: "500",
            ml: "20px",
            textTransform: "uppercase",
            ":hover": {
              color: "#FFF",
              backgroundColor: "#000",
            },
          }}
        >
          Continuar
        </Button>
      </Box>
    </Content>
  );
}

export default EditUserComponent;
