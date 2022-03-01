import { Button, Grid, ThemeProvider } from "@mui/material";
import theme from "./Utils/Theme";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthSignUp } from "../Redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ p: 0, m: 0, color: "secondary.main" }}>
        Hello World
        <Button
          onClick={() => {
            dispatch(AuthSignUp());
          }}
        >
          Click
        </Button>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
