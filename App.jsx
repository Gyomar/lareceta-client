import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import { esES } from '@mui/x-data-grid';
import { esES as pickersEsES } from '@mui/x-date-pickers/locales';
import { esES as coreEsES } from '@mui/material/locale';

import Dosis300woff2 from './src/assets/fonts/dosis-v32-latin-300.woff2';
import Dosis400woff2 from './src/assets/fonts/dosis-v32-latin-regular.woff2';
import Dosis500woff2 from './src/assets/fonts/dosis-v32-latin-500.woff2';
import Dosis600woff2 from './src/assets/fonts/dosis-v32-latin-600.woff2';
import SatisfactionSurvey from './src/pages/SatisfactionSurvey';

const theme = createTheme({
  typography: {
    fontFamily: ['Dosis'],
  },
  palette: {
    primary: {
      main: '#df6129',
    },
    secondary: {
      main: '#a48363',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
			@font-face {
        font-display: swap; 
        font-family: 'Dosis';
        font-style: normal;
        font-weight: 300;
        src: url(${Dosis300woff2}) format('woff2');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Dosis';
        font-style: normal;
        font-weight: 400;
        src: url(${Dosis400woff2}) format('woff2');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Dosis';
        font-style: normal;
        font-weight: 500;
        src: url(${Dosis500woff2}) format('woff2');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Dosis';
        font-style: normal;
        font-weight: 600;
        src: url(${Dosis600woff2}) format('woff2');
      }
      `,
    },
    MuiTypography: {
      defaultProps: {
        fontWeight: 600,
      },
    },
    MuiTextField: {
      defaultProps: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    MuiSelect: {
      defaultProps: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    MuiFormControlLabel: {
      defaultProps: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
  },
  esES,
  pickersEsES,
  coreEsES,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SatisfactionSurvey />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
