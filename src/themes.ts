import { experimental_extendTheme as extendTheme, createTheme, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

const sharedThemeOptions: ThemeOptions = {
  shape: { borderRadius: 2 },
};

const themeDarkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#282A36',
      paper: '#24344d',
    },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { className: 'variant-centered' },
          style: {
            input: {
              textAlign: 'center',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          input: {
            padding: '7px',
          },
        },
      },
    },
  },
};

const themeDarkVars = extendTheme(themeDarkOptions);

// Background: #202020
// Primary Text: #FFFFFF
// Secondary Text: #A0A0A0
// Accent Color 1: #FFD700
// Accent Color 2: #4B0082
// Accent Color 3: #00FF7F
// Link Color: #6A5ACD
// Error Color: #FF4500
// Warning Color: #FFA500
// Success Color: #32CD32

const themeDarkTheme = createTheme(deepmerge(sharedThemeOptions, themeDarkOptions));

export const themeDark = { theme: themeDarkTheme, vars: themeDarkVars };
