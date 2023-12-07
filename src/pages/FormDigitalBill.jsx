import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IlfornoFondo from "@images/ilforno-fondo-fa864180.webp";
import LogoIlforno from "@images/logo-bdc31858.webp";
import GraficoIlforno from "@images/grafico-1-542ba601.webp";

const StyleButton = styled(Button)({
  padding: 16,
  textTransform: "none",
  fontSize: 19,
});

const FormDigitalBill = () => {
  const [documenteType, setDocumenteType] = useState("");

  const handleChange = (event) => {
    setDocumenteType(event.target.value);
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
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ height: "100vh" }}
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
            width: "90vw",
          }}
        >
          <Paper
            sx={{
              width: "90vw",
              backgroundColor: "rgb(225, 213, 175, 0.8)",
              position: "relative",
              py: 4,
            }}
            elevation={3}
          >
            <Box
              sx={{
                top: "-24px",
                height: "40vw",
                display: {sm: "none"},
                width: "90vw",
                backgroundImage: `url(${GraficoIlforno})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center",
                position: "absolute",
              }}
            ></Box>
            <Stack
              direction="column"
              justifyContent="space-around"
              alignItems="stretch"
              spacing={3}
              sx={{ px: 4, height: "400px" }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color="secondary"
              >
                Factura electronica
              </Typography>
              <FormControl variant="filled" color="secondary">
                <InputLabel id="demo-simple-select-label">
                  Tipo de documento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={documenteType}
                  label="Tipo de documento"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>NIT</MenuItem>
                  <MenuItem value={2}>Cedula de Ciudadania</MenuItem>
                  <MenuItem value={3}>Cedula de Extranjeria</MenuItem>
                  <MenuItem value={4}>Pasaporte</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="filled-basic"
                label="Numero de documento"
                variant="filled"
                color="secondary"
              />
              <FormControlLabel
                required
                control={<Checkbox color="secondary" />}
                label="Acepto politica de tratamiento de datos"
                color="secondary"
              />
              <Link href="#">
                <StyleButton variant="contained" fullWidth>
                  Enviar Datos
                </StyleButton>
              </Link>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default FormDigitalBill;
