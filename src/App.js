import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import About from "./pages/About";

import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
