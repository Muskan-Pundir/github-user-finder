import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="/profile/:username"
            element={<Profile theme={theme} setTheme={setTheme} />}
          />
          <Route path="*" element={<>404 page not found</>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
