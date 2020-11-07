import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
