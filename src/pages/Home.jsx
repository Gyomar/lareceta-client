import React from "react";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IlfornoFondo from "@images/ilforno-fondo-fa864180.webp";
import LogoIlforno from "@images/logo-bdc31858.webp";
import GraficoIlforno from "@images/grafico-f599751d.webp";

const StyleButton = styled(Button)({
  padding: 16,
  textTransform: "none",
  fontSize: 19,
});

const Home = () => {
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
        justifyContent="space-around"
        alignItems="stretch"
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
        <Stack spacing={3} sx={{ px: 8 }}>
          <Link href="https://carta.ilforno.co/">
            <StyleButton variant="contained" fullWidth>
              Ver carta
            </StyleButton>
          </Link>
          <Link href="/satisfaction-survey">
            <StyleButton variant="contained" fullWidth>
              Califica tu experiencia
            </StyleButton>
          </Link>
          <Link href="/digital-bill">
            <StyleButton variant="contained" fullWidth>
              Factura Electronica
            </StyleButton>
          </Link>
        </Stack>
        <Box
          sx={{
            height: "180px",
            width: "100vw",
            backgroundImage: `url(${GraficoIlforno})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        ></Box>
      </Stack>
    </Box>
  );
};

export default Home;
