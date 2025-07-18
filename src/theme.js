import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'

    primary: {
      main: '#e58785',
    },
    secondary: {
      main: '#684843',
    },
    background: {
      default: '#fbf4ee',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
