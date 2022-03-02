import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import App from "../App/App";
import theme from "../App/Utils/Theme";
import createEmotionCache from "../Server/createEmotionCache";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../Redux/RootReducer";

const cache = createEmotionCache();

function Main() {
  // Create Redux store with state injected by the server
  const store = createStore(rootReducer, window.__PRELOADED_STATE__);

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;

  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector("#root"));
