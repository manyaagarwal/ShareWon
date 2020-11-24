import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Buy } from "../components/Buy";
import BuyWrapper from "../components/BuyWrapper";
import { EnterWallet } from "../components/EnterWallet";
import { Login } from "../components/Login";

export default function Index() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={EnterWallet} />
        <AppBar>
          <Route exact path="/buy" component={Buy} />
		  <Route exact path="/buy/checkout" component={BuyWrapper}/>
        </AppBar>
      </Switch>
    </BrowserRouter>
  );
}
