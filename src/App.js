import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout/index";
import Dashboard from "./scenes/dashboard/index";
import Topics from "./scenes/topics/index";
import Sectors from "./scenes/sectors/index";
import Titles from "./scenes/Titles/index";
import Geography from "./scenes/geography/index";
import Overview from "./scenes/overview/index";
import Monthly from "./scenes/monthly/index";
import Breakdown from "./scenes/breakdown/index";
import Admin from "./scenes/admin/index";
import Performance from "./scenes/perfomance/index";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Topics" element={<Topics />} />
              <Route path="/Sectors" element={<Sectors />} />
              <Route path="/Titles" element={<Titles />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;