import React, { lazy, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IlfornoFondo from "@images/ilforno-fondo-fa864180.webp";
import LogoIlforno from "@images/logo-bdc31858.webp";
import GraficoIlforno from "@images/grafico-1-542ba601.webp";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormGroup from "@mui/material/FormGroup";
import {
  postEncuesta,
  setActiveStep,
  setId,
  setPuntoVenta,
  setCalificaProducto,
  setCalificaServicio,
  setCalificaNps,
  setMejora,
  setNota,
  setNombre,
  setApellido,
  setCedula,
  setCelular,
  setEmail,
} from "@reducers/encues_satis_ilforno.slice";
import { setSnackbar } from "@reducers/ui.slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
    label: "Pesimo",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
    label: "Malo",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
    label: "Buenos",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
    label: "Excelente",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const { v4: uuidv4 } = require("uuid");

const currentDate = dayjs();

const generateUuidV4 = () => {
  return uuidv4();
};

const generarCadenaMejora = (objeto) => {
  let cadenaGeneradaMejora = "";
  for (const key in objeto) {
    if (objeto.hasOwnProperty(key) && objeto[key].estado) {
      cadenaGeneradaMejora += objeto[key].valor + ", ";
    }
  }
  cadenaGeneradaMejora = cadenaGeneradaMejora.trim().slice(0, -1);

  return cadenaGeneradaMejora;
};

const SatisfactionSurvey = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoading = useSelector((state) => state.ui.loading);
  const snackbar = useSelector((state) => state.ui.snackbar);
  const activeStep = useSelector(
    (state) => state.encuesSatisIlforno.activeStep
  );
  const id = useSelector((state) => state.encuesSatisIlforno.id);
  const puntoVenta = useSelector(
    (state) => state.encuesSatisIlforno.puntoVenta
  );
  const calificaProducto = useSelector(
    (state) => state.encuesSatisIlforno.calificaProducto
  );
  const calificaServicio = useSelector(
    (state) => state.encuesSatisIlforno.calificaServicio
  );
  const calificaNps = useSelector(
    (state) => state.encuesSatisIlforno.calificaNps
  );
  const mejora = useSelector((state) => state.encuesSatisIlforno.mejora);
  const nota = useSelector((state) => state.encuesSatisIlforno.nota);
  const nombre = useSelector((state) => state.encuesSatisIlforno.nombre);
  const apellido = useSelector((state) => state.encuesSatisIlforno.apellido);
  const cedula = useSelector((state) => state.encuesSatisIlforno.cedula);
  const celular = useSelector((state) => state.encuesSatisIlforno.celular);
  const email = useSelector((state) => state.encuesSatisIlforno.email);

  const [isNombreValido, setNombreValido] = useState(true);
  const [isApellidoValido, setApellidoValido] = useState(true);
  const [isCedulaValido, setCedulaValido] = useState(true);
  const [isCelularValido, setCelularValido] = useState(true);
  const [isEmailValido, setEmailValido] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    dispatch(setPuntoVenta(searchParams.get("encuesta_key")));
    dispatch(setId(generateUuidV4()));
  }, [location.search]);

  useEffect(() => {
    const isNombreLengthValid = nombre !== "" ? nombre.length >= 2 : true;
    const isApellidoLengthValid = apellido !== "" ? apellido.length >= 2 : true;
    const isCedulaLengthValid =
      cedula !== "" ? cedula.length >= 5 && cedula.length <= 10 : true;
    const isCelularLengthValid = celular !== "" ? celular.length === 10 : true;
    const isEmailLengthValid =
      email !== ""
        ? email.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        : true;
    setNombreValido(isNombreLengthValid);
    setApellidoValido(isApellidoLengthValid);
    setCedulaValido(isCedulaLengthValid);
    setCelularValido(isCelularLengthValid);
    setEmailValido(isEmailLengthValid);
  }, [nombre, apellido, cedula, celular, email]);

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleCloseSnackbar = () => dispatch(setSnackbar(null));

  const handleSend = async () => {
    const errorMessages = {
      isNombreValido: "Nombre no válido",
      isApellidoValido: "Apellido no válido",
      isCedulaValido: "Cédula no válida",
      isCelularValido: "Número de celular no válido",
      isEmailValido: "Correo electrónico no válido",
      calificaProducto: "Calificacion de producto requerida",
      calificaServicio: "Calificación de servicio requerida",
      calificaNps: "Calificación NPS requerida",
    };

    const invalidFields = [];

    if (!isNombreValido) invalidFields.push("isNombreValido");
    if (!isApellidoValido) invalidFields.push("isApellidoValido");
    if (!isCedulaValido) invalidFields.push("isCedulaValido");
    if (!isCelularValido) invalidFields.push("isCelularValido");
    if (!isEmailValido) invalidFields.push("isEmailValido");
    if (calificaProducto === 0) invalidFields.push("calificaProducto");
    if (calificaServicio === 0) invalidFields.push("calificaServicio");
    if (calificaNps === 0) invalidFields.push("calificaNps");

    if (invalidFields.length === 0) {
      await dispatch(
        postEncuesta({
          nuevaEncuesta: {
            fecha: currentDate.format("YYYY-MM-DD HH:mm:ss"),
            id: id,
            puntoVenta: puntoVenta,
            calificaProducto: calificaProducto,
            calificaServicio: calificaServicio,
            calificaNps: calificaNps,
            mejora: generarCadenaMejora(mejora),
            nota: nota,
            nombre: nombre,
            apellido: apellido,
            cedula: parseInt(cedula),
            celular: parseInt(celular),
            email: email,
          },
        })
      );
    } else {
      const errorMessage = invalidFields
        .map((field) => errorMessages[field])
        .join(", ");
      dispatch(setSnackbar({ children: errorMessage, severity: "error" }));
    }
  };

  const handleChangeMejora = (event) => {
    dispatch(
      setMejora({
        ...mejora,
        [event.target.name]: {
          ...mejora[event.target.name],
          estado: event.target.checked,
        },
      })
    );
  };

  const handleChangeCalificaProducto = (event, newValue) => {
    dispatch(setCalificaProducto(newValue));
  };

  const handleChangeCalificaServicio = (event, newValue) => {
    dispatch(setCalificaServicio(newValue));
  };

  const handleChangeCalificaNps = (event, newValue) => {
    dispatch(setCalificaNps(newValue));
  };

  const handleChangeNota = (event) => {
    const carateresValidosNota = /\W/.test(event.target.value);
    if (!carateresValidosNota) {
      dispatch(setNota(event.target.value));
    }
  };

  const handleChangeNombre = (event) => {
    const carateresValidosNombre = /\d/.test(event.target.value);
    if (!carateresValidosNombre) {
      dispatch(setNombre(event.target.value));
    }
  };

  const handleChangeApellido = (event) => {
    const carateresValidosApellido = /\d/.test(event.target.value);
    if (!carateresValidosApellido) {
      dispatch(setApellido(event.target.value));
    }
  };

  const handleChangeCedula = (event) => {
    const carateresValidosCedula = /\D/.test(event.target.value);
    if (!carateresValidosCedula) {
      dispatch(setCedula(event.target.value));
    }
  };

  const handleChangeCelular = (event) => {
    const carateresValidosCelular = /\D/.test(event.target.value);
    if (!carateresValidosCelular) {
      dispatch(setCelular(event.target.value));
    }
  };

  const handleChangeEmail = (event) => {
    dispatch(setEmail(event.target.value));
  };

  return (
    <Box
      sx={{
        objectFit: "cover",
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${IlfornoFondo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pb: 1,
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "145px",
            width: "100vw",
            backgroundImage: `url(${LogoIlforno})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        ></Box>
        <Box
          sx={{
            width: "95vw",
            maxWidth: "600px",
            pb: 1,
          }}
        >
          <Paper
            sx={{
              width: "95vw",
              maxWidth: "600px",
              backgroundColor: "rgb(225, 213, 175, 0.8)",
              position: "relative",
              pt: 2,
            }}
            elevation={3}
          >
            <Box
              sx={{
                top: "-30px",
                height: "180px",
                display: { sm: "none" },
                width: "100%",
                backgroundImage: `url(${GraficoIlforno})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center",
                position: "absolute",
              }}
            ></Box>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={1}
              sx={{ px: 1, pt: 3 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color="secondary"
              >
                Encuesta de satisfaccion
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color="secondary"
              >
                {puntoVenta}
              </Typography>
              {activeStep !== 3 && (
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  sx={{
                    overflowY: "scroll",
                    height: "60vh",
                    maxHeight: "450px",
                    "&::-webkit-scrollbar": {
                      width: "0.5em",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Step key="step-1">
                    <StepLabel color="secondary">
                      Satisfaccion con el producto y servicio
                    </StepLabel>
                    <StepContent sx={{ pr: 4 }}>
                      <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Typography component="legend">
                            1. Califica tu nivel de satisfacción con el producto
                            que consumiste *
                          </Typography>
                          <StyledRating
                            name="highlight-selected-only"
                            IconContainerComponent={IconContainer}
                            getLabelText={(value) => customIcons[value].label}
                            highlightSelectedOnly
                            value={calificaProducto}
                            onChange={handleChangeCalificaProducto}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Typography component="legend">
                            2. ¿Cómo calificas el servicio del restaurante? *
                          </Typography>
                          <StyledRating
                            name="highlight-selected-only"
                            IconContainerComponent={IconContainer}
                            getLabelText={(value) => customIcons[value].label}
                            highlightSelectedOnly
                            value={calificaServicio}
                            onChange={handleChangeCalificaServicio}
                          />
                        </Stack>
                      </Stack>
                    </StepContent>
                  </Step>
                  <Step key="step-2">
                    <StepLabel color="secondary">
                      Satisfaccion con la experiencia
                    </StepLabel>
                    <StepContent sx={{ pr: 4 }}>
                      <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Typography component="legend">
                            3. Basado en esta experiencia de compra ¿Qué tan
                            probable es que recomiendes nuestros restaurantes a
                            un amigo o familiar? *
                          </Typography>
                          <Rating
                            name="customized-10"
                            max={10}
                            value={calificaNps}
                            onChange={handleChangeCalificaNps}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <Typography component="legend">
                            4. Queremos seguir mejorando, si tienes alguna
                            observación selecciona una o varias de las opciones
                            a continuación, por las que consideras que hay una
                            oportunidad de mejora:
                          </Typography>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.presentacionProducto.estado}
                                  onChange={handleChangeMejora}
                                  name="presentacionProducto"
                                />
                              }
                              label="Presentación del producto"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.calidadProducto.estado}
                                  onChange={handleChangeMejora}
                                  name="calidadProducto"
                                />
                              }
                              label="Calidad del producto"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.temperaturaProducto.estado}
                                  onChange={handleChangeMejora}
                                  name="temperaturaProducto"
                                />
                              }
                              label="Temperatura del producto"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.tiempoEspera.estado}
                                  onChange={handleChangeMejora}
                                  name="tiempoEspera"
                                />
                              }
                              label="Tiempos de servicio o espera"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.actitudAsesores.estado}
                                  onChange={handleChangeMejora}
                                  name="actitudAsesores"
                                />
                              }
                              label="Actitud de los asesores"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.variedadMenu.estado}
                                  onChange={handleChangeMejora}
                                  name="variedadMenu"
                                />
                              }
                              label="Variedad del menú"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.ambientes.estado}
                                  onChange={handleChangeMejora}
                                  name="ambientes"
                                />
                              }
                              label="Ambiente de los restaurantes"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={mejora.precios.estado}
                                  onChange={handleChangeMejora}
                                  name="precios"
                                />
                              }
                              label="Precios"
                            />
                          </FormGroup>
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <Typography component="legend">
                            5. Cuéntanos cómo fue tu experiencia y el detalle de
                            los aspectos a mejorar seleccionados en la pregunta
                            anterior.
                          </Typography>
                          <TextField
                            id="filled-basic"
                            label="Tu comentario"
                            variant="filled"
                            color="secondary"
                            multiline
                            maxRows={4}
                            value={nota}
                            onChange={handleChangeNota}
                            inputProps={{
                              maxLength: 600,
                            }}
                          />
                        </Stack>
                      </Stack>
                    </StepContent>
                  </Step>
                  <Step key="step-3">
                    <StepLabel color="secondary">
                      Dejanos tus daros si quieres ser contactado
                    </StepLabel>
                    <StepContent sx={{ pr: 4 }}>
                      <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <TextField
                            id="filled-basic"
                            label="Nombre"
                            variant="filled"
                            color={isNombreValido ? "secondary" : "warning"}
                            type="text"
                            autoComplete="given-name"
                            value={nombre}
                            onChange={handleChangeNombre}
                            inputProps={{
                              maxLength: 30,
                            }}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <TextField
                            id="filled-basic"
                            label="Apellido"
                            variant="filled"
                            color={isApellidoValido ? "secondary" : "warning"}
                            type="text"
                            autoComplete="family-name"
                            value={apellido}
                            onChange={handleChangeApellido}
                            inputProps={{
                              maxLength: 30,
                            }}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <TextField
                            id="filled-basic"
                            label="Cédula"
                            variant="filled"
                            color={isCedulaValido ? "secondary" : "warning"}
                            type="text"
                            autoComplete="identity-document"
                            value={cedula}
                            onChange={handleChangeCedula}
                            inputProps={{
                              maxLength: 11,
                            }}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <TextField
                            id="filled-basic"
                            label="Correo electrónico"
                            variant="filled"
                            color={isEmailValido ? "secondary" : "warning"}
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChangeEmail}
                            inputProps={{
                              maxLength: 40,
                            }}
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          justifyContent="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <TextField
                            id="filled-basic"
                            label="Celular"
                            variant="filled"
                            color={isCelularValido ? "secondary" : "warning"}
                            type="tel"
                            autoComplete="tel"
                            value={celular}
                            onChange={handleChangeCelular}
                            inputProps={{
                              maxLength: 10,
                            }}
                          />
                        </Stack>
                      </Stack>
                    </StepContent>
                  </Step>
                </Stepper>
              )}
              {activeStep !== 3 && (
                <MobileStepper
                  variant="dots"
                  steps={3}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    width: "90vw",
                    maxWidth: "560px",
                    backgroundColor: "transparent",
                  }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={activeStep === 2 ? handleSend : handleNext}
                      disabled={activeStep === 3}
                      color="secondary"
                    >
                      {activeStep === 2 ? "Enviar" : "Continuar"}
                      <KeyboardArrowRight color="secondary" />
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0 || activeStep === 3}
                      color="secondary"
                    >
                      <KeyboardArrowLeft color="secondary" />
                      Regresar
                    </Button>
                  }
                  color="secondary"
                />
              )}
              {activeStep === 3 && (
                <Stack
                  direction="column"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography>Has finalizado la encuesta</Typography>
                  <Link href="/">
                    <Button sx={{ mt: 1, mr: 1 }} color="secondary">
                      Salir
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default SatisfactionSurvey;
