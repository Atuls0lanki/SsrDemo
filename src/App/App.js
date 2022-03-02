import { Button, Grid, ThemeProvider } from "@mui/material";
import theme from "./Utils/Theme";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthSignUp } from "../Redux";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ p: 0, m: 0, color: "secondary.main" }}>
        Hello World
        <Button
          onClick={() => {
            console.log("hello", loggedIn);
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
