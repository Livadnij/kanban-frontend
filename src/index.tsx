import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { Provider } from "react-redux";
import { store } from "./store/storeProvider";
import { configAxios } from "./config/axiosConfig";
import { configMSW } from "./config/configMSW";

configAxios();
configMSW();

const baseTheme = extendTheme();

const darkOnlyTheme = extendTheme({
  colorSchemes: {
    light: baseTheme.colorSchemes.dark,
    dark: baseTheme.colorSchemes.dark,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<React.StrictMode>
    <CssVarsProvider theme={darkOnlyTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
