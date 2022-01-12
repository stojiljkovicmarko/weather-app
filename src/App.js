import { Provider } from "react-redux";
import store from "./store/store";

import Layout from "./ui/Layout";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
}

export default App;
