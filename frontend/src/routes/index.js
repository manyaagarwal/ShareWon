import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { EnterWallet } from "../components/EnterWallet";
import { Login } from "../components/Login";


export default function Index(){ 
	return(
		<BrowserRouter> 
			<Switch> 
					<Route exact path="/login" component={EnterWallet} />
					<AppBar> 
						
					</AppBar>
			</Switch>
		</BrowserRouter>
	);
} 
