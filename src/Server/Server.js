import express from "express";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import App from "../App/App";
import theme from "../App/Utils/Theme";
import createEmotionCache from "./createEmotionCache";
import { createStore } from "redux";
import { Provider } from "react-redux";
import store from "../Redux/Store";

function renderFullPage(html, css, store) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>Atul ssr</title>
        ${css}
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(
            /</g,
            "\\u003c"
          )}
        </script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
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

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss, preloadedState));
}

const app = express();

app.use("/build", express.static("build"));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3009;
app.listen(port);
