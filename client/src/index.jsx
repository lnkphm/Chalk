import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
