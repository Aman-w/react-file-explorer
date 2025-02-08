import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyles from "./styles/globalStyles";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App /> {}
  </Provider>
);
