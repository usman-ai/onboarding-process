import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useState } from "react";

export const FormContext = createContext();
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
      textTransform: "none",
    },
  },

  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          height: 0,
        },
      },
    },
  },
});
const App = () => {
  const [formData, setFormData] = useState({});

  return (
    <>
      <FormContext.Provider value={{ formData, setFormData }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Outlet />
        </ThemeProvider>
      </FormContext.Provider>
    </>
  );
};

export default App;
