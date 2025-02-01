import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
