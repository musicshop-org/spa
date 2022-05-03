import React, {Component} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/system';

import App from "./App";
import theme from "../inc/theme";

class root extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider>
          <CssBaseline />
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    );
  }
}

export default root;