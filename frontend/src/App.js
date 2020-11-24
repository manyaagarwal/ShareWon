import "./App.less";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";
import { useState } from "react";
import { WalletContext } from "./context/WalletContext";

function App() {
  const [walletAddr, setWalletAddr] = useState("");
  return (
    <WalletContext.Provider value={{ walletAddr, setWalletAddr }}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </WalletContext.Provider>
  );
}

export default App;
